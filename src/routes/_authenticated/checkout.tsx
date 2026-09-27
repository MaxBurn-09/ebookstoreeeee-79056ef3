import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Lock } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/data/catalog";

export const Route = createFileRoute("/_authenticated/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Future Grow Academy" },
      {
        name: "description",
        content:
          "Review the ebooks and bundle prices in your bag before purchasing.",
      },
      { property: "og:title", content: "Checkout — Future Grow Academy" },
      {
        property: "og:description",
        content: "Review your selected ebooks and discounted bundles.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { lineBooks, cartSubtotal, cartListTotal, bundleDiscount, appliedBundles } = useStore();

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
            className="press mt-6 inline-flex h-12 items-center btn-gloss rounded-full bg-brand px-6 text-sm font-semibold text-primary-foreground"
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
        <p className="eyebrow">Order review</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Review your order</h1>

        <div className="mt-9 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="glass h-fit rounded-lg border border-border p-6 sm:p-8" role="status">
            <Lock className="h-6 w-6 text-primary" aria-hidden />
            <h2 className="mt-4 text-xl font-semibold">Payments are not available yet</h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">Your selections remain in your bag. No charge will be made and no ebooks will be marked as purchased until payment is available.</p>
            <Link to="/cart" className="mt-6 inline-flex text-sm font-semibold text-primary underline underline-offset-4">Back to bag</Link>
          </div>

          <aside className="glass h-fit rounded-lg border border-border p-6 lg:sticky lg:top-28">
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
                    <p className="line-clamp-2 text-sm font-medium">{book.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">PDF · Qty {qty}</p>
                  </div>
                  <span className="text-sm font-semibold tabular-nums">
                    {formatPrice(book.price * qty)}
                  </span>
                </li>
              ))}
            </ul>
            {appliedBundles.length > 0 && <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
              {appliedBundles.map(({ bundle }, index) => <p key={`${bundle.slug}-${index}`} className="flex justify-between gap-3"><span>{bundle.name}</span><span className="font-medium text-primary">Bundle applied</span></p>)}
              <p className="flex justify-between gap-3 text-muted-foreground"><span>Individual prices</span><span className="tabular-nums">{formatPrice(cartListTotal)}</span></p>
              <p className="flex justify-between gap-3 text-primary"><span>Bundle savings</span><span className="tabular-nums">−{formatPrice(bundleDiscount)}</span></p>
            </div>}
            <div className="mt-5 flex items-baseline justify-between border-t border-border pt-4">
              <span className="text-sm font-medium">Total</span>
              <span className="text-2xl font-semibold tabular-nums">
                {formatPrice(cartSubtotal)}
              </span>
            </div>
            <ul className="mt-5 space-y-3 border-t border-border pt-4 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <Download className="h-4 w-4 text-forest" aria-hidden /> Digital PDFs after purchase
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
