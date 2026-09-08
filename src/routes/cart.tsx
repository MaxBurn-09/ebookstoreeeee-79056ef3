import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Download,
  Lock,
} from "lucide-react";
import { formatPrice, books } from "@/data/catalog";
import { useStore } from "@/lib/store";
import { BookGrid } from "@/components/site/BookGrid";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — Future Grow Academy" },
      {
        name: "description",
        content:
          "Review the ebooks in your bag and check out. Instant PDF download, no shipping charges.",
      },
      { property: "og:title", content: "Your Bag — Future Grow Academy" },
      {
        property: "og:description",
        content: "Review your ebooks and check out at Future Grow Academy.",
      },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lineBooks, setQty, removeFromCart, cartSubtotal } = useStore();
  const total = cartSubtotal;
  const saved = lineBooks.reduce((s, l) => s + (l.book.oldPrice - l.book.price) * l.qty, 0);
  const suggestions = books.filter((b) => !lineBooks.some((l) => l.book.id === b.id)).slice(0, 4);

  return (
    <div className="container-page py-10 sm:py-14">
      <Reveal>
        <SectionHeader
          eyebrow="Almost yours"
          title="Your bag"
          subtitle={
            lineBooks.length
              ? `${lineBooks.length} ebook${lineBooks.length === 1 ? "" : "s"} ready to download.`
              : "Nothing here yet."
          }
        />
      </Reveal>

      {lineBooks.length === 0 ? (
        <Reveal className="rounded-2xl border border-dashed border-border py-20 text-center">
          <ShoppingBag className="mx-auto h-9 w-9 text-taupe" aria-hidden />
          <p className="mt-4 text-sm text-muted-foreground">
            Your bag is empty. Every ebook is just $2.97 today.
          </p>
          <Link
            to="/books"
            preload="intent"
            className="press mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-7 text-sm font-semibold text-background hover:bg-foreground/90"
          >
            Browse ebooks <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      ) : (
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-12">
          <ul className="divide-y divide-border border-y border-border">
            {lineBooks.map(({ book, qty }, i) => (
              <li key={book.id}>
                <Reveal delay={Math.min(i * 70, 350)}>
                  <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 py-6 sm:flex sm:items-start">
                    <Link
                      to="/book/$slug"
                      params={{ slug: book.slug }}
                      preload="intent"
                      className="cover-plate h-32 w-[5.5rem] shrink-0"
                    >
                      <img
                        src={book.cover}
                        alt={`Cover of ${book.title}`}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </Link>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h2 className="text-base leading-snug font-semibold">
                            <Link
                              to="/book/$slug"
                              params={{ slug: book.slug }}
                              preload="intent"
                              className="link-sweep hover:text-primary"
                            >
                              {book.title}
                            </Link>
                          </h2>
                          <p className="mt-1 text-xs text-muted-foreground">
                            PDF · {book.category} · instant download
                          </p>
                        </div>
                        <p className="shrink-0 text-base font-semibold tabular-nums">
                          {formatPrice(book.price * qty)}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-4">
                        <div className="flex items-center rounded-full border border-border">
                          <button
                            type="button"
                            aria-label={`Decrease quantity of ${book.title}`}
                            onClick={() => setQty(book.id, qty - 1)}
                            className="press grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-muted"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm tabular-nums">{qty}</span>
                          <button
                            type="button"
                            aria-label={`Increase quantity of ${book.title}`}
                            onClick={() => setQty(book.id, qty + 1)}
                            className="press grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-muted"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(book.id)}
                          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={120}>
            <aside className="sticky top-28 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h2 className="text-lg font-semibold">Order summary</h2>
              <dl className="mt-5 space-y-3 text-sm">
                <Row label="Subtotal" value={formatPrice(cartSubtotal)} />
                <Row label="Delivery" value="Instant download" />
                {saved > 0 ? <Row label="You save" value={`− ${formatPrice(saved)}`} accent /> : null}
                <div className="flex items-baseline justify-between border-t border-border pt-3">
                  <dt className="text-sm font-medium">Total</dt>
                  <dd className="text-2xl font-semibold tabular-nums">{formatPrice(total)}</dd>
                </div>
              </dl>
              <button
                type="button"
                onClick={() => toast.success("Checkout is coming next — your bag is saved.")}
                className="press group mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
              >
                <Lock className="h-4 w-4" aria-hidden />
                Secure checkout
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <ul className="mt-6 space-y-3 border-t border-border pt-5 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Download className="h-4 w-4 text-forest" aria-hidden /> No shipping — instant PDF
                  download
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-forest" aria-hidden /> Cards accepted
                  worldwide
                </li>
              </ul>
            </aside>
          </Reveal>
        </div>
      )}

      {suggestions.length ? (
        <section className="mt-20">
          <Reveal>
            <SectionHeader eyebrow="One more?" title="Readers also downloaded" />
          </Reveal>
          <BookGrid items={suggestions} />
        </section>
      ) : null}
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={accent ? "tabular-nums text-primary" : "tabular-nums"}>{value}</dd>
    </div>
  );
}
