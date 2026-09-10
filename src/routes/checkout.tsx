import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Lock, MapPin, CreditCard, ShieldCheck } from "lucide-react";
import { formatPrice } from "@/data/catalog";
import { useStore } from "@/lib/store";
import { createCheckout } from "@/lib/checkout.functions";
import { paymentLabel, saveOrder, type PaymentMethod, type ShippingAddress } from "@/lib/orders";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>): { canceled?: true } =>
    search["canceled"] === "1" || search["canceled"] === true ? { canceled: true } : {},
  head: () => ({
    meta: [
      { title: "Checkout — Future Grow Academy" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Complete your Future Grow Academy ebook order." },
    ],
  }),
  component: CheckoutPage,
});

const emptyAddress: ShippingAddress = {
  fullName: "",
  email: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
};

function CheckoutPage() {
  const { canceled } = Route.useSearch();
  const { lineBooks, cartSubtotal, clearCart } = useStore();
  const [step, setStep] = useState<"address" | "payment">(canceled ? "payment" : "address");
  const [address, setAddress] = useState<ShippingAddress>(emptyAddress);
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [busy, setBusy] = useState(false);

  const items = useMemo(
    () =>
      lineBooks.map(({ book, qty }) => ({
        id: book.id,
        title: book.title,
        slug: book.slug,
        cover: book.cover,
        qty,
        price: book.price,
      })),
    [lineBooks],
  );

  const saved = lineBooks.reduce((sum, l) => sum + (l.book.oldPrice - l.book.price) * l.qty, 0);

  if (lineBooks.length === 0) {
    return (
      <div className="container-page py-16 text-center">
        <SectionHeader eyebrow="Checkout" title="Your bag is empty" />
        <Link
          to="/books"
          className="press mt-4 inline-flex h-12 items-center rounded-full bg-foreground px-7 text-sm font-semibold text-background"
        >
          Browse ebooks
        </Link>
      </div>
    );
  }

  const onAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const pay = async () => {
    setBusy(true);
    try {
      const result = await createCheckout({
        data: {
          origin: window.location.origin,
          paymentMethod: method,
          address,
          items,
        },
      });

      if (result.mode === "stripe") {
        sessionStorage.setItem(
          "fga_checkout_draft",
          JSON.stringify({
            orderId: result.orderId,
            address,
            items,
            paymentMethod: method,
          }),
        );
        window.location.href = result.url;
        return;
      }

      saveOrder({
        id: result.orderId,
        createdAt: new Date().toISOString(),
        status: "paid",
        paymentMethod: method,
        paymentLabel: result.paymentLabel,
        gateway: result.gateway,
        emailSent: result.emailSent,
        address,
        items,
        subtotal: cartSubtotal,
        total: result.total,
        receiptHtml: result.receiptHtml,
      });
      clearCart();
      toast.success(result.emailSent ? "Receipt emailed." : "Order paid — receipt is on the next page.");
      window.location.assign(`/order/${encodeURIComponent(result.orderId)}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Payment did not go through.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container-page py-10 sm:py-14">
      <Reveal>
        <SectionHeader
          eyebrow="Secure checkout"
          title={step === "address" ? "Shipping & billing" : "Payment"}
          subtitle="Digital delivery worldwide. We still collect an address for your receipt and invoice."
        />
      </Reveal>

      {canceled ? (
        <p className="mb-6 rounded-lg border border-border bg-secondary/60 px-4 py-3 text-sm">
          Stripe checkout was canceled. Your bag is still here — choose a payment method to try again.
        </p>
      ) : null}

      <ol className="mb-8 flex gap-4 text-[0.72rem] font-semibold tracking-[0.14em] uppercase">
        <li className={step === "address" ? "text-foreground" : "text-muted-foreground"}>1 · Address</li>
        <li className={step === "payment" ? "text-foreground" : "text-muted-foreground"}>2 · Payment</li>
        <li className="text-muted-foreground">3 · Confirmation</li>
      </ol>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {step === "address" ? (
          <form onSubmit={onAddress} className="space-y-4 rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <MapPin className="h-4 w-4" /> Shipping address
            </div>
            <Field
              label="Full name"
              required
              value={address.fullName}
              onChange={(v) => setAddress({ ...address, fullName: v })}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Email"
                type="email"
                required
                value={address.email}
                onChange={(v) => setAddress({ ...address, email: v })}
              />
              <Field
                label="Mobile"
                type="tel"
                required
                value={address.phone}
                onChange={(v) => setAddress({ ...address, phone: v })}
              />
            </div>
            <Field
              label="Address"
              required
              value={address.line1}
              onChange={(v) => setAddress({ ...address, line1: v })}
            />
            <Field
              label="Apartment / suite (optional)"
              value={address.line2 ?? ""}
              onChange={(v) => setAddress({ ...address, line2: v })}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="City" required value={address.city} onChange={(v) => setAddress({ ...address, city: v })} />
              <Field
                label="State"
                required
                value={address.state}
                onChange={(v) => setAddress({ ...address, state: v })}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="PIN / ZIP"
                required
                value={address.postalCode}
                onChange={(v) => setAddress({ ...address, postalCode: v })}
              />
              <Field
                label="Country"
                required
                value={address.country}
                onChange={(v) => setAddress({ ...address, country: v })}
              />
            </div>
            <button
              type="submit"
              className="press mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-semibold text-background hover:bg-foreground/90"
            >
              Continue to payment <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        ) : (
          <div className="space-y-5 rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <CreditCard className="h-4 w-4" /> Payment method
            </div>
            <div className="space-y-2">
              {(
                [
                  ["card", "Card · Visa, Mastercard, Amex"],
                  ["upi", "UPI"],
                  ["wallet", "Wallets"],
                ] as const
              ).map(([id, label]) => (
                <label
                  key={id}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm ${
                    method === id ? "border-foreground bg-secondary/50" : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="method"
                    checked={method === id}
                    onChange={() => setMethod(id)}
                    className="accent-foreground"
                  />
                  {label}
                </label>
              ))}
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Card payments use Stripe Checkout when <code>STRIPE_SECRET_KEY</code> is set. Otherwise Academy Pay
              captures the order on our server, emails a receipt when Resend is configured, and unlocks instant PDF
              delivery.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setStep("address")}
                className="press h-12 rounded-full border border-border px-6 text-sm font-semibold hover:bg-muted"
              >
                Back
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => void pay()}
                className="press inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background hover:bg-foreground/90 disabled:opacity-60"
              >
                <Lock className="h-4 w-4" />
                {busy ? "Processing…" : `Pay ${formatPrice(cartSubtotal)} with ${paymentLabel(method)}`}
              </button>
            </div>
          </div>
        )}

        <aside className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <ul className="mt-4 divide-y divide-border">
            {lineBooks.map(({ book, qty }) => (
              <li key={book.id} className="flex gap-3 py-3">
                <img src={book.cover} alt="" className="h-16 w-11 rounded-[3px] object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{book.title}</p>
                  <p className="text-xs text-muted-foreground">Qty {qty}</p>
                </div>
                <p className="text-sm tabular-nums">{formatPrice(book.price * qty)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="tabular-nums">{formatPrice(cartSubtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Delivery</dt>
              <dd>Instant PDF</dd>
            </div>
            {saved > 0 ? (
              <div className="flex justify-between text-primary">
                <dt>You save</dt>
                <dd className="tabular-nums">− {formatPrice(saved)}</dd>
              </div>
            ) : null}
            <div className="flex items-baseline justify-between border-t border-border pt-3">
              <dt className="font-medium">Total</dt>
              <dd className="text-2xl font-semibold tabular-nums">{formatPrice(cartSubtotal)}</dd>
            </div>
          </dl>
          <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-forest" /> Encrypted checkout · cards worldwide
          </p>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-[0.72rem] font-medium text-muted-foreground">{label}</span>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-foreground/40"
      />
    </label>
  );
}
