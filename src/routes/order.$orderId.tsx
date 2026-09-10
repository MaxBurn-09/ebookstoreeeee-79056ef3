import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Download, Mail } from "lucide-react";
import { formatPrice } from "@/data/catalog";
import { finalizeStripeCheckout } from "@/lib/checkout.functions";
import { getOrder, saveOrder, type Order, type PaymentMethod, type ShippingAddress } from "@/lib/orders";
import { useStore } from "@/lib/store";
import { SectionHeader } from "@/components/site/SectionHeader";

type Draft = {
  orderId: string;
  address: ShippingAddress;
  items: Order["items"];
  paymentMethod: PaymentMethod;
};

export const Route = createFileRoute("/order/$orderId")({
  validateSearch: (search: Record<string, unknown>): { session_id?: string } => {
    if (typeof search["session_id"] === "string") return { session_id: search["session_id"] };
    return {};
  },
  head: ({ params }) => ({
    meta: [
      { title: `Order ${params.orderId} — Future Grow Academy` },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const { orderId } = Route.useParams();
  const { session_id: sessionId } = Route.useSearch();
  const { clearCart } = useStore();
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const existing = getOrder(orderId);
      if (existing) {
        if (!cancelled) setOrder(existing);
        return;
      }

      if (sessionId) {
        try {
          const raw = sessionStorage.getItem("fga_checkout_draft");
          const draft = raw ? (JSON.parse(raw) as Draft) : null;
          if (!draft) throw new Error("Checkout session expired. Contact support with your Stripe receipt.");
          const result = await finalizeStripeCheckout({
            data: {
              orderId: draft.orderId,
              sessionId,
              address: draft.address,
              items: draft.items,
              paymentMethod: draft.paymentMethod,
            },
          });
          const paid: Order = {
            id: result.orderId,
            createdAt: new Date().toISOString(),
            status: "paid",
            paymentMethod: draft.paymentMethod,
            paymentLabel: result.paymentLabel,
            gateway: result.gateway,
            stripeSessionId: sessionId,
            emailSent: result.emailSent,
            address: draft.address,
            items: draft.items,
            subtotal: result.total,
            total: result.total,
            receiptHtml: result.receiptHtml,
          };
          saveOrder(paid);
          clearCart();
          sessionStorage.removeItem("fga_checkout_draft");
          if (!cancelled) setOrder(paid);
        } catch (err) {
          if (!cancelled) setError(err instanceof Error ? err.message : "Could not confirm payment.");
        }
        return;
      }

      if (!cancelled) setError("We could not find that order.");
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [orderId, sessionId, clearCart]);

  if (error) {
    return (
      <div className="container-page py-16 text-center">
        <SectionHeader eyebrow="Checkout" title="Payment needs a look" subtitle={error} />
        <Link
          to="/cart"
          className="press mt-4 inline-flex h-12 items-center rounded-full bg-foreground px-7 text-sm font-semibold text-background"
        >
          Return to bag
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container-page py-16 text-center">
        <p className="text-sm text-muted-foreground">Confirming your payment…</p>
      </div>
    );
  }

  const downloadReceipt = () => {
    const blob = new Blob([order.receiptHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${order.id}-receipt.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container-page max-w-2xl py-10 sm:py-14">
      <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
          <Check className="h-6 w-6" />
        </span>
        <h1 className="mt-5 text-3xl font-semibold">You&apos;re in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Order <span className="font-medium text-foreground">{order.id}</span> is paid. Instant PDF access is unlocked
          for every title below.
        </p>

        <ul className="mt-6 divide-y divide-border border-y border-border">
          {order.items.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-4 py-3 text-sm">
              <span>
                {item.title} × {item.qty}
              </span>
              <span className="tabular-nums">{formatPrice(item.price * item.qty)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-right text-lg font-semibold">Total {formatPrice(order.total)}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          {order.paymentLabel} · {order.gateway === "stripe" ? "Stripe" : "Academy Pay"} · {order.address.email}
        </p>

        <div className="mt-6 rounded-lg border border-border bg-secondary/50 p-4 text-sm">
          <p className="flex items-center gap-2 font-medium">
            <Mail className="h-4 w-4" />
            {order.emailSent
              ? `Receipt emailed to ${order.address.email}`
              : `Receipt ready for ${order.address.email}`}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {order.emailSent
              ? "Check your inbox (and spam) for the HTML receipt and download note."
              : "Live email sending uses RESEND_API_KEY. Download the receipt below — it is the same letter we send when mail is configured."}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={downloadReceipt}
            className="press inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-semibold hover:bg-muted"
          >
            <Download className="h-4 w-4" /> Download receipt
          </button>
          <Link
            to="/books"
            className="press inline-flex h-11 items-center rounded-full bg-foreground px-5 text-sm font-semibold text-background"
          >
            Continue browsing
          </Link>
        </div>
      </div>
    </div>
  );
}
