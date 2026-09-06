import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Truck } from "lucide-react";
import { formatPrice, books } from "@/data/catalog";
import { useStore } from "@/lib/store";
import { BookCard } from "@/components/site/BookCard";
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
  const shipping = 0;
  const tax = 0;
  const total = cartSubtotal + shipping + tax;
  const suggestions = books.filter((b) => !lineBooks.some((l) => l.book.id === b.id)).slice(0, 4);

  return (
    <div className="container-page py-14">
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
        <Reveal className="rounded-lg border border-dashed border-taupe py-20 text-center">
          <ShoppingBag className="float-slow mx-auto h-10 w-10 text-taupe" />
          <p className="mt-4 text-sm text-muted-foreground">
            Your bag is empty. Every ebook is just $2.97 today.
          </p>
          <Link
            to="/books"
            className="press mt-6 inline-flex items-center gap-2 rounded-sm bg-forest px-6 py-3 text-[0.7rem] font-semibold tracking-[0.16em] text-forest-foreground uppercase hover:bg-charcoal"
          >
            Browse the shelf <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      ) : (
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div className="divide-y divide-border border-y border-border">
            {lineBooks.map(({ book, qty }, i) => (
              <Reveal key={book.id} delay={i * 70}>
                <div className="flex gap-4 py-5">
                  <Link
                    to="/book/$slug"
                    params={{ slug: book.slug }}
                    className="shine shrink-0 overflow-hidden rounded-sm"
                  >
                    <img
                      src={book.cover}
                      alt={`Cover of ${book.title}`}
                      loading="lazy"
                      className="h-36 w-24 object-cover shadow-sm transition-transform duration-700 hover:scale-105"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-serif text-lg leading-snug">
                      <Link
                        to="/book/$slug"
                        params={{ slug: book.slug }}
                        className="link-sweep hover:text-primary"
                      >
                        {book.title}
                      </Link>
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground">{book.category}</p>
                    <p className="mt-1 text-[0.62rem] tracking-[0.18em] text-muted-foreground uppercase">
                      {book.category}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <div className="flex items-center rounded-sm border border-border">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => setQty(book.id, qty - 1)}
                          className="grid h-9 w-9 place-items-center transition-colors hover:bg-muted"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm tabular-nums">{qty}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => setQty(book.id, qty + 1)}
                          className="grid h-9 w-9 place-items-center transition-colors hover:bg-muted"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(book.id)}
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                  <p className="font-serif text-lg tabular-nums">{formatPrice(book.price * qty)}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <aside className="sticky top-28 rounded-lg border border-border bg-cream p-6">
              <h2 className="font-serif text-xl">Order summary</h2>
              <dl className="mt-5 space-y-3 text-sm">
                <Row label="Subtotal" value={formatPrice(cartSubtotal)} />
                <Row label="Delivery" value="Instant download" />
                
                <div className="flex items-baseline justify-between border-t border-taupe pt-3">
                  <dt className="text-sm font-medium">Total</dt>
                  <dd className="font-serif text-2xl tabular-nums">{formatPrice(total)}</dd>
                </div>
              </dl>
              <button
                type="button"
                onClick={() => toast.success("Checkout is coming next — your bag is saved.")}
                className="press group mt-6 flex w-full items-center justify-center gap-2 rounded-sm bg-forest px-5 py-3.5 text-[0.7rem] font-semibold tracking-[0.16em] text-forest-foreground uppercase transition-all hover:-translate-y-0.5 hover:bg-charcoal"
              >
                Checkout
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <ul className="mt-6 space-y-3 border-t border-taupe pt-5 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-forest" /> No shipping — instant PDF download
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-forest" /> Secure checkout, cards accepted worldwide
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
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
            {suggestions.map((b, i) => (
              <Reveal key={b.id} delay={i * 70}>
                <BookCard book={b} />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  );
}
