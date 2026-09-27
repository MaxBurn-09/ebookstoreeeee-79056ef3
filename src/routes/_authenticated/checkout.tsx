import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { CreditCard, Download, Landmark, Loader2, Lock, Smartphone } from "lucide-react";
import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { formatPrice } from "@/data/catalog";
import { createPaymentOrder, verifyPayment } from "@/lib/orders.functions";

export const Route = createFileRoute("/_authenticated/checkout")({
  head: () => ({
    meta: [
      { title: "Secure checkout — Future Grow Academy" },
      { name: "description", content: "Pay securely by card, net banking or UPI and get instant access to your ebooks." },
      { property: "og:title", content: "Secure checkout — Future Grow Academy" },
      { property: "og:description", content: "Pay securely and download your ebooks instantly." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

type RzpResponse = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };
declare global {
  interface Window {
    Razorpay?: new (opts: Record<string, unknown>) => { open: () => void; on: (e: string, cb: (r: unknown) => void) => void };
  }
}

function loadRazorpay() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

const methods = [
  { icon: CreditCard, label: "Credit / debit card" },
  { icon: Landmark, label: "Net banking" },
  { icon: Smartphone, label: "UPI" },
];

function CheckoutPage() {
  const { cart, lineBooks, cartSubtotal, cartListTotal, bundleDiscount, appliedBundles, clearCart } = useStore();
  const { user } = useAuth();
  const navigate = useNavigate();
  const createOrder = useServerFn(createPaymentOrder);
  const verify = useServerFn(verifyPayment);
  const [name, setName] = useState((user?.user_metadata?.["full_name"] as string) ?? "");
  const [busy, setBusy] = useState(false);

  const pay = async () => {
    if (name.trim().length < 2) { toast.error("Please enter your full name."); return; }
    setBusy(true);
    try {
      const ok = await loadRazorpay();
      if (!ok || !window.Razorpay) throw new Error("Could not load the payment window. Check your connection.");
      const o = await createOrder({ data: { fullName: name.trim(), items: cart.map((l) => ({ id: l.id, qty: l.qty })) } });
      const rzp = new window.Razorpay({
        key: o.keyId,
        amount: o.amount,
        currency: o.currency,
        order_id: o.razorpayOrderId,
        name: "Future Grow Academy",
        description: "eBook order",
        prefill: { name: name.trim(), email: o.email },
        theme: { color: "#D1002C" },
        handler: async (r: RzpResponse) => {
          try {
            await verify({ data: { orderId: o.orderId, ...r } });
            clearCart();
            navigate({ to: "/order/$id", params: { id: o.orderId } });
          } catch (e) {
            toast.error(e instanceof Error ? e.message : "Payment could not be verified.");
          }
        },
        modal: { ondismiss: () => setBusy(false) },
      });
      rzp.on("payment.failed", () => toast.error("Payment failed. No money was taken — please try again."));
      rzp.open();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not start payment.");
      setBusy(false);
    }
  };

  if (lineBooks.length === 0) {
    return (
      <section className="section-y">
        <div className="container-page text-center">
          <h1 className="text-2xl font-semibold">Your bag is empty</h1>
          <p className="mt-2 text-sm text-muted-foreground">Add an ebook to your bag to continue to checkout.</p>
          <Link to="/books" className="press btn-gloss mt-6 inline-flex h-12 items-center rounded-full bg-brand px-6 text-sm font-semibold text-primary-foreground">Browse the library</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section-y">
      <div className="container-page">
        <p className="eyebrow">Secure checkout</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Complete your order</h1>

        <div className="mt-9 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="glass h-fit rounded-lg border border-border p-6 sm:p-8">
            <h2 className="text-lg font-semibold">Your details</h2>
            <label className="mt-4 block text-sm font-medium" htmlFor="fullName">Full name</label>
            <input id="fullName" value={name} onChange={(e) => setName(e.target.value)} maxLength={120} className="mt-1.5 h-12 w-full rounded-lg border border-border bg-background px-4 text-base outline-none focus:ring-2 focus:ring-primary/30" />
            <p className="mt-3 text-sm text-muted-foreground">Receipt and library access for <span className="font-medium text-foreground">{user?.email}</span></p>

            <h2 className="mt-8 text-lg font-semibold">Payment methods</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {methods.map((m) => (
                <div key={m.label} className="flex items-center gap-2.5 rounded-lg border border-border bg-card/70 p-3.5 text-sm font-medium">
                  <m.icon className="h-5 w-5 text-primary" aria-hidden /> {m.label}
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Choose your method in the secure Razorpay window. Availability of UPI and net banking depends on your bank and country.</p>

            <button type="button" onClick={pay} disabled={busy} className="press btn-gloss mt-7 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-base font-semibold text-primary-foreground disabled:opacity-60">
              {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Lock className="h-5 w-5" />} Pay {formatPrice(cartSubtotal)}
            </button>
          </div>

          <aside className="glass h-fit rounded-lg border border-border p-6 lg:sticky lg:top-28">
            <h2 className="text-base font-semibold">Order summary</h2>
            <ul className="mt-5 space-y-4">
              {lineBooks.map(({ book, qty }) => (
                <li key={book.id} className="flex gap-3">
                  <img src={book.cover} alt="" loading="lazy" className="h-20 w-14 rounded-md object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-medium">{book.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">PDF · Qty {qty}</p>
                  </div>
                  <span className="text-sm font-semibold tabular-nums">{formatPrice(book.price * qty)}</span>
                </li>
              ))}
            </ul>
            {appliedBundles.length > 0 && (
              <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
                {appliedBundles.map(({ bundle }, i) => (
                  <p key={`${bundle.slug}-${i}`} className="flex justify-between gap-3"><span>{bundle.name}</span><span className="font-medium text-primary">Bundle applied</span></p>
                ))}
                <p className="flex justify-between gap-3 text-muted-foreground"><span>Individual prices</span><span className="tabular-nums">{formatPrice(cartListTotal)}</span></p>
                <p className="flex justify-between gap-3 text-primary"><span>Bundle savings</span><span className="tabular-nums">−{formatPrice(bundleDiscount)}</span></p>
              </div>
            )}
            <div className="mt-5 flex items-baseline justify-between border-t border-border pt-4">
              <span className="text-sm font-medium">Total</span>
              <span className="text-2xl font-semibold tabular-nums">{formatPrice(cartSubtotal)}</span>
            </div>
            <p className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
              <Download className="h-4 w-4 text-forest" aria-hidden /> Instant PDF access in your library after payment
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
