import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, ShoppingBag, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { books, formatPrice } from "@/data/catalog";
import { Stars } from "@/components/site/Stars";
import { BookGrid } from "@/components/site/BookGrid";
import { Reveal } from "@/components/site/Reveal";
import { Tilt } from "@/components/site/Motion";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/book/$slug")({
  loader: ({ params }) => {
    const book = books.find((b) => b.slug === params.slug);
    if (!book) throw notFound();
    return { book };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Book not found — Future Grow Academy" }, { name: "robots", content: "noindex" }],
      };
    }
    const { book } = loaderData;
    const title = `${book.title} by Future Grow Academy — Future Grow Academy`;
    return {
      meta: [
        { title },
        { name: "description", content: book.blurb },
        { property: "og:title", content: title },
        { property: "og:description", content: book.blurb },
      ],
    };
  },
  component: BookDetail,
});

function BookDetail() {
  const { book } = Route.useLoaderData();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const related = books.filter((b) => b.id !== book.id && b.category === book.category).slice(0, 4);
  const more = related.length ? related : books.filter((b) => b.id !== book.id).slice(0, 4);

  return (
    <div className="container-page py-8 sm:py-12">
      <nav className="mb-8 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="px-2">/</span>
        <Link to="/books" search={{ q: undefined, category: book.category }} className="hover:text-primary">
          {book.category}
        </Link>
        <span className="px-2">/</span>
        <span className="text-foreground">{book.title}</span>
      </nav>

      <div className="grid gap-8 sm:gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Reveal>
          <Tilt max={7}>
            <div className="shine group rounded-lg border border-border bg-cream p-5 sm:p-8">
              <img
                src={book.cover}
                alt={`Cover of ${book.title} by Future Grow Academy`}
                className="mx-auto aspect-[2/3] w-full max-w-[16rem] rounded-sm object-cover shadow-xl transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:max-w-sm"
              />
            </div>
          </Tilt>
        </Reveal>

        <Reveal delay={120}>
          {book.badge ? <p className="eyebrow">{book.badge}</p> : null}
          <h1 className="mt-2 text-2xl leading-tight sm:text-3xl md:text-5xl">{book.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">by {book.category}</p>

          <div className="mt-4 flex items-center gap-2">
            <Stars rating={book.rating} />
            <span className="text-xs text-muted-foreground">
              {book.rating} · {book.reviews.toLocaleString("en-IN")} reviews
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-serif text-3xl">{formatPrice(book.price)}</span>
            {book.oldPrice ? (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(book.oldPrice)}
                </span>
                <span className="rounded-sm bg-gold px-2 py-1 text-[0.6rem] font-semibold tracking-[0.14em] text-gold-foreground uppercase">
                  Save {Math.round((1 - book.price / book.oldPrice) * 100)}%
                </span>
              </>
            ) : null}
          </div>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">{book.blurb}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => addToCart(book.id)}
              className="press inline-flex flex-1 items-center justify-center gap-2 rounded-sm bg-forest px-7 transition-colors sm:flex-none py-3.5 text-[0.7rem] font-semibold tracking-[0.16em] text-forest-foreground uppercase hover:bg-charcoal"
            >
              <ShoppingBag className="h-4 w-4" /> Add to cart
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(book.id)}
              className="press inline-flex flex-1 items-center justify-center gap-2 rounded-sm border border-forest px-7 transition-colors sm:flex-none py-3.5 text-[0.7rem] font-semibold tracking-[0.16em] text-forest uppercase hover:bg-forest hover:text-forest-foreground"
            >
              <Heart className={isWishlisted(book.id) ? "h-4 w-4 fill-current" : "h-4 w-4"} />
              {isWishlisted(book.id) ? "Saved" : "Wishlist"}
            </button>
          </div>

          <dl className="mt-10 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
            {[
              { icon: Truck, label: "No shipping", note: "100% digital delivery" },
              { icon: RotateCcw, label: "Instant access", note: "Download right after payment" },
              { icon: ShieldCheck, label: "Secure payment", note: "Cards accepted worldwide" },
            ].map(({ icon: Icon, label, note }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon className="mt-0.5 h-5 w-5 text-forest" />
                <div>
                  <dt className="text-xs font-semibold">{label}</dt>
                  <dd className="text-xs text-muted-foreground">{note}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <section className="mt-16 sm:mt-20">
        <Reveal>
          <h2 className="mb-8 text-2xl md:text-3xl">You may also like</h2>
        </Reveal>
        <BookGrid items={more} />
      </section>
    </div>
  );
}
