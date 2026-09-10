import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { storeConfig } from "@/data/catalog";

const AddressSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  line1: z.string().min(3),
  line2: z.string().optional(),
  city: z.string().min(2),
  state: z.string().min(2),
  postalCode: z.string().min(3),
  country: z.string().min(2),
});

const ItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  cover: z.string(),
  qty: z.number().int().positive(),
  price: z.number().positive(),
});

const CheckoutSchema = z.object({
  origin: z.string().url(),
  paymentMethod: z.enum(["card", "upi", "wallet"]),
  address: AddressSchema,
  items: z.array(ItemSchema).min(1),
});

export type CheckoutPayload = z.infer<typeof CheckoutSchema>;

function money(value: number) {
  return `$${value.toFixed(2)}`;
}

export function buildReceiptHtml(input: {
  orderId: string;
  address: z.infer<typeof AddressSchema>;
  items: z.infer<typeof ItemSchema>[];
  total: number;
  paymentLabel: string;
  gateway: string;
}) {
  const rows = input.items
    .map(
      (item) =>
        `<tr><td style="padding:8px 0;border-bottom:1px solid #e9ddc9">${item.title} × ${item.qty}</td><td style="text-align:right;padding:8px 0;border-bottom:1px solid #e9ddc9">${money(item.price * item.qty)}</td></tr>`,
    )
    .join("");

  return `<!doctype html>
<html>
<body style="font-family:Georgia,serif;background:#fcfaf6;color:#22201d;padding:24px">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e9ddc9;padding:28px">
    <p style="letter-spacing:.18em;font-size:11px;text-transform:uppercase;color:#6b645c">Future Grow Academy</p>
    <h1 style="font-size:22px;margin:8px 0 4px">Payment confirmed</h1>
    <p style="color:#6b645c;font-size:14px">Order ${input.orderId}</p>
    <p style="font-size:14px;line-height:1.6">Hi ${input.address.fullName}, thank you for your purchase. Your ebooks are ready — this is your receipt and download confirmation.</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:16px">${rows}</table>
    <p style="text-align:right;font-size:16px;margin-top:12px"><strong>Total ${money(input.total)}</strong></p>
    <p style="font-size:13px;color:#6b645c">Paid via ${input.paymentLabel} · ${input.gateway}<br/>
    Ship-to / billing: ${input.address.line1}, ${input.address.city}, ${input.address.state} ${input.address.postalCode}, ${input.address.country}</p>
    <p style="font-size:13px;line-height:1.6">${storeConfig.note}</p>
    <p style="font-size:12px;color:#6b645c">Questions? ${storeConfig.email}</p>
  </div>
</body>
</html>`;
}

async function sendReceiptEmail(to: string, subject: string, html: string) {
  const key = process.env["RESEND_API_KEY"];
  if (!key) return { sent: false as const };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Future Grow Academy <help@futuregrowacademy.co>",
      to,
      subject,
      html,
    }),
  });

  return { sent: response.ok };
}

function paymentLabel(method: "card" | "upi" | "wallet") {
  if (method === "upi") return "UPI";
  if (method === "wallet") return "Digital wallet";
  return "Card";
}

function encodeStripeBody(entries: Record<string, string>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(entries)) params.append(key, value);
  return params;
}

export const createCheckout = createServerFn({ method: "POST" })
  .validator(CheckoutSchema)
  .handler(async ({ data }) => {
    const orderId = `FGA-${Date.now().toString(36).toUpperCase()}`;
    const total = data.items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const stripeKey = process.env["STRIPE_SECRET_KEY"];
    const label = paymentLabel(data.paymentMethod);

    if (stripeKey && data.paymentMethod === "card") {
      const body: Record<string, string> = {
        mode: "payment",
        success_url: `${data.origin}/order/${encodeURIComponent(orderId)}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${data.origin}/checkout?canceled=1`,
        customer_email: data.address.email,
        "metadata[orderId]": orderId,
        "metadata[paymentMethod]": data.paymentMethod,
      };

      data.items.forEach((item, index) => {
        body[`line_items[${index}][quantity]`] = String(item.qty);
        body[`line_items[${index}][price_data][currency]`] = "usd";
        body[`line_items[${index}][price_data][unit_amount]`] = String(Math.round(item.price * 100));
        body[`line_items[${index}][price_data][product_data][name]`] = item.title;
      });

      const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${stripeKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: encodeStripeBody(body),
      });

      const session = (await response.json()) as { id?: string; url?: string; error?: { message?: string } };
      if (!response.ok || !session.url) {
        throw new Error(session.error?.message ?? "Stripe checkout could not start.");
      }

      return {
        mode: "stripe" as const,
        orderId,
        url: session.url,
        stripeSessionId: session.id,
        total,
        paymentLabel: label,
      };
    }

    const receiptHtml = buildReceiptHtml({
      orderId,
      address: data.address,
      items: data.items,
      total,
      paymentLabel: label,
      gateway: "Academy Pay",
    });

    const email = await sendReceiptEmail(
      data.address.email,
      `Your Future Grow Academy receipt (${orderId})`,
      receiptHtml,
    );

    return {
      mode: "academy" as const,
      orderId,
      total,
      paymentLabel: label,
      gateway: "academy-pay" as const,
      emailSent: email.sent,
      receiptHtml,
      status: "paid" as const,
    };
  });

export const finalizeStripeCheckout = createServerFn({ method: "POST" })
  .validator(
    z.object({
      orderId: z.string(),
      sessionId: z.string(),
      address: AddressSchema,
      items: z.array(ItemSchema).min(1),
      paymentMethod: z.enum(["card", "upi", "wallet"]),
    }),
  )
  .handler(async ({ data }) => {
    const stripeKey = process.env["STRIPE_SECRET_KEY"];
    if (!stripeKey) throw new Error("Stripe is not configured.");

    const response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${data.sessionId}`, {
      headers: { Authorization: `Bearer ${stripeKey}` },
    });
    const session = (await response.json()) as {
      payment_status?: string;
      amount_total?: number;
      error?: { message?: string };
    };

    if (!response.ok) throw new Error(session.error?.message ?? "Could not verify Stripe payment.");
    if (session.payment_status !== "paid") throw new Error("Payment is not complete yet.");

    const total = data.items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const label = paymentLabel(data.paymentMethod);
    const receiptHtml = buildReceiptHtml({
      orderId: data.orderId,
      address: data.address,
      items: data.items,
      total,
      paymentLabel: label,
      gateway: "Stripe",
    });

    const email = await sendReceiptEmail(
      data.address.email,
      `Your Future Grow Academy receipt (${data.orderId})`,
      receiptHtml,
    );

    return {
      orderId: data.orderId,
      status: "paid" as const,
      total,
      paymentLabel: label,
      gateway: "stripe" as const,
      emailSent: email.sent,
      receiptHtml,
    };
  });
