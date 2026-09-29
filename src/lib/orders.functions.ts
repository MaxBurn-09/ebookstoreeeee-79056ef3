import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { books } from "@/data/catalog";
import { matchBundles } from "@/lib/bundle-pricing";
import { toINR } from "@/lib/currency";

function rzpAuth() {
  const id = process.env["RAZORPAY_KEY_ID"];
  const secret = process.env["RAZORPAY_KEY_SECRET"];
  if (!id || !secret) throw new Error("Payments are not configured yet. Please try again later.");
  return { id, secret, header: "Basic " + btoa(`${id}:${secret}`) };
}

/** Prices the cart server-side, creates a pending order and a Razorpay order. */
export const createPaymentOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z
      .object({
        fullName: z.string().trim().min(2).max(120),
        currency: z.enum(["USD", "INR"]).default("USD"),
        items: z.array(z.object({ id: z.string().max(40), qty: z.number().int().min(1).max(10) })).min(1).max(50),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const lines = data.items.map((l) => {
      const book = books.find((b) => b.id === l.id);
      if (!book) throw new Error("An item in your bag is no longer available.");
      return { book, qty: l.qty };
    });
    const listed = lines.reduce((s, l) => s + l.book.price * l.qty, 0);
    const { discount } = matchBundles(lines.map((l) => ({ slug: l.book.slug, qty: l.qty, price: l.book.price })));
    const usdTotal = Math.round((listed - discount) * 100) / 100;
    const currency = data.currency;
    const total = currency === "INR" ? toINR(usdTotal) : usdTotal;
    const email = (context.claims as { email?: string }).email ?? "";

    const auth = rzpAuth();
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: { Authorization: auth.header, "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Math.round(total * 100), currency, receipt: `fga_${Date.now()}` }),
    });
    if (!res.ok) {
      console.error("Razorpay order failed", res.status, await res.text());
      throw new Error("Could not start payment. Please try again.");
    }
    const rzp = (await res.json()) as { id: string; amount: number };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .insert({ user_id: context.userId, email, full_name: data.fullName, total, currency, status: "pending", provider: "razorpay", provider_ref: rzp.id })
      .select("id")
      .single();
    if (error || !order) throw new Error("Could not create your order.");
    const { error: itemErr } = await supabaseAdmin.from("order_items").insert(
      lines.map((l) => ({ order_id: order.id, book_slug: l.book.slug, title: l.book.title, cover_url: l.book.cover, file_url: `${l.book.slug}.pdf`, price: currency === "INR" ? toINR(l.book.price) : l.book.price, quantity: l.qty })),
    );
    if (itemErr) throw new Error("Could not create your order.");

    return { orderId: order.id, razorpayOrderId: rzp.id, amount: rzp.amount, currency, keyId: auth.id, email, total };
  });

/** Verifies the Razorpay signature and the captured amount before marking an order paid. */
export const verifyPayment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z
      .object({
        orderId: z.string().uuid(),
        razorpay_order_id: z.string().max(80),
        razorpay_payment_id: z.string().max(80),
        razorpay_signature: z.string().max(200),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const auth = rzpAuth();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: order } = await supabaseAdmin
      .from("orders")
      .select("id,user_id,email,full_name,total,currency,provider_ref,status,order_items(title,book_slug,file_url)")
      .eq("id", data.orderId)
      .maybeSingle();
    if (!order || order.user_id !== context.userId || order.provider_ref !== data.razorpay_order_id) {
      throw new Error("Order not found.");
    }
    if (order.status === "paid") return { ok: true };

    const { createHmac, timingSafeEqual } = await import("crypto");
    const expected = createHmac("sha256", auth.secret).update(`${data.razorpay_order_id}|${data.razorpay_payment_id}`).digest("hex");
    const a = Buffer.from(expected);
    const b = Buffer.from(data.razorpay_signature);
    if (a.length !== b.length || !timingSafeEqual(a, b)) throw new Error("Payment could not be verified.");

    const res = await fetch(`https://api.razorpay.com/v1/payments/${data.razorpay_payment_id}`, { headers: { Authorization: auth.header } });
    const pay = (await res.json()) as { status?: string; order_id?: string; amount?: number };
    if (!res.ok || pay.order_id !== data.razorpay_order_id || pay.amount !== Math.round(Number(order.total) * 100)) {
      throw new Error("Payment could not be verified.");
    }
    if (pay.status === "authorized") {
      await fetch(`https://api.razorpay.com/v1/payments/${data.razorpay_payment_id}/capture`, {
        method: "POST",
        headers: { Authorization: auth.header, "Content-Type": "application/json" },
        body: JSON.stringify({ amount: pay.amount, currency: order.currency }),
      });
    } else if (pay.status !== "captured") {
      throw new Error("Payment was not completed.");
    }

    await supabaseAdmin.from("orders").update({ status: "paid" }).eq("id", order.id);
    if (order.email) {
      try {
        const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
        const items = (order.order_items ?? []) as { title: string; book_slug: string; file_url: string | null }[];
        const links = await Promise.all(
          items.map(async (i) => {
            const path = (i.file_url ?? `${i.book_slug}.pdf`).replace(/^ebooks\//, "");
            const { data: s } = await supabaseAdmin.storage.from("ebooks").createSignedUrl(path, 60 * 60 * 24 * 7, { download: `${i.book_slug}.pdf` });
            return { title: i.title, url: s?.signedUrl };
          }),
        );
        await sendTemplateEmail("order-ready", order.email, {
          templateData: {
            name: order.full_name,
            orderId: order.id,
            total: `${order.currency === "INR" ? "₹" : "$"}${Number(order.total).toFixed(2)}`,
            books: items.map((i) => i.title),
            downloads: links,
            orderUrl: `https://futuregrowacademy.co/order/${order.id}`,
          },
          idempotencyKey: `order-ready-${order.id}`,
        });
      } catch (e) {
        console.error("Order email failed", e);
      }
    }
    try {
      const { resendSend, RESEND_FROM, ADMIN_EMAILS, escapeHtml } = await import("@/lib/resend.server");
      const items = ((order.order_items ?? []) as { title: string }[]).map((i) => `<li>${escapeHtml(i.title)}</li>`).join("");
      const amount = `${order.currency === "INR" ? "₹" : "$"}${Number(order.total).toFixed(2)}`;
      await resendSend({
        from: RESEND_FROM,
        to: ADMIN_EMAILS,
        subject: `New order ${amount} — ${order.email}`,
        html: `<div style="font-family:Arial,sans-serif;color:#0B1633"><h2>New paid order</h2><p><b>Customer:</b> ${escapeHtml(order.full_name ?? "")} (${escapeHtml(order.email)})<br/><b>Total:</b> ${amount}<br/><b>Order:</b> ${order.id}</p><ul>${items}</ul><p><a href="https://futuregrowacademy.co/admin/orders">Open orders in admin</a></p></div>`,
      });
    } catch (e) {
      console.error("Admin notify failed", e);
    }
    return { ok: true };
  });

export const getMyOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("orders")
      .select("id,total,currency,status,provider,provider_ref,created_at,order_items(id,book_slug,title,cover_url,file_url,price,quantity)")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });
