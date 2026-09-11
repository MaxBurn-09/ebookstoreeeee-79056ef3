import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Download, Loader2, Lock, ShieldCheck } from "lucide-react";
import { placeOrder } from "@/lib/orders.functions";
import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { formatPrice } from "@/data/catalog";

export const Route = createFileRoute("/_authenticated/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Future Grow Academy" },
      {
        name: "description",
        content:
          "Complete your purchase and get instant access to your ebooks in your reading library.",
      },
      { property: "og:title", content: "Checkout — Future Grow Academy" },
      {
        property: "og:description",
        content: "Secure checkout with instant PDF delivery to your account.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { lineBooks, cartSubtotal, clearCart } = useStore();
  const submit = useServerFn(placeOrder);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(user?.email ?? "");
  const [provider, setProvider] = useState<"razorpay" | "paypal">("paypal");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (lineBooks.length === 0) return;
    setBusy(true);
    try {
      await submit({
        data: {
          fullName,
          email,
          provider,
          items: lineBooks.map((l) => ({ slug: l.book.slug, quantity: l.qty })),
        },
      });
      clearCart();
      toast.success("Order confirmed — your ebooks are in your library.");
      navigate({ to: "/dashboard" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Checkout failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (lineBooks.length === 0) {
    return (
      <section className="section-y">
        <div className="container-page text-center">
          <h1 className="text-2xl font-semibold">Your bag is empty</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Add an ebook to your bag to continue to checkout.
          </p>
          <Link
            to="/books"
            className="press mt-6 inline-flex h-12 items-center rounded-full bg-foreground px-6 text-sm font-semibold text-background hover:bg-foreground/90"
          >
            Browse the library
          </Link>
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
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8"
          >
            <h2 className="text-base font-semibold">Billing details</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Ebooks are delivered digitally — no shipping address needed.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" value={fullName} onChange={setFullName} type="text" />
              <Field label="Email for delivery" value={email} onChange={setEmail} type="email" />
            </div>

            <h2 className="mt-8 text-base font-semibold">Payment method</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Method
                label="PayPal"
                note="Cards & PayPal · worldwide"
                active={provider === "paypal"}
                onClick={() => setProvider("paypal")}
              />
              <Method
                label="Razorpay"
                note="UPI, cards & netbanking · India"
                active={provider === "razorpay"}
                onClick={() => setProvider("razorpay")}
              />
            </div>

            <button
              type="submit"
              disabled={busy}
              className="press mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-semibold text-background hover:bg-foreground/90 disabled:opacity-60"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
              Place order · {formatPrice(cartSubtotal)}
            </button>
          </form>

          <aside className="h-fit rounded-2xl border border-border bg-secondary/40 p-6 shadow-[var(--shadow-card)]">
            <h2 className="text-base font-semibold">Order summary</h2>
            <ul className="mt-5 space-y-4">
              {lineBooks.map(({ book, qty }) => (
                <li key={book.id} className="flex gap-3">
                  <img
                    src={book.cover}
                    alt=""
                    loading="lazy"
                    className="h-20 w-14 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-[0.82rem] font-medium">{book.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">PDF · Qty {qty}</p>
                  </div>
                  <span className="text-sm font-semibold tabular-nums">
                    {formatPrice(book.price * qty)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-baseline justify-between border-t border-border pt-4">
              <span className="text-sm font-medium">Total</span>
              <span className="text-2xl font-semibold tabular-nums">
                {formatPrice(cartSubtotal)}
              </span>
            </div>
            <ul className="mt-5 space-y-3 border-t border-border pt-4 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <Download className="h-4 w-4 text-forest" aria-hidden /> Instant access in your
                library
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-forest" aria-hidden /> Secure payment
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Method({
  label,
  note,
  active,
  onClick,
}: {
  label: string;
  note: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`press rounded-xl border p-4 text-left transition-colors ${
        active ? "border-foreground bg-muted" : "border-border hover:border-foreground/30"
      }`}
    >
      <span className="block text-sm font-semibold">{label}</span>
      <span className="mt-0.5 block text-xs text-muted-foreground">{note}</span>
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  type,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[0.78rem] font-semibold">{label}</span>
      <input
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-foreground/40"
      />
    </label>
  );
}
