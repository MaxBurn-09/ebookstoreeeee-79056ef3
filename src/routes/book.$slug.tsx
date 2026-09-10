import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Heart,
  Check,
  Download,
  ShieldCheck,
  Smartphone,
  ChevronRight,
  Star,
} from "lucide-react";
import { books, formatPrice, storeConfig } from "@/data/catalog";
import { Stars } from "@/components/site/Stars";
import { BookCard } from "@/components/site/BookCard";
import { Reveal } from "@/components/site/Reveal";
import { useStore } from "@/lib/store";
import { useCatalog } from "@/lib/catalog-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/book/$slug")({
  loader: ({ params }) => {
    const book = books.find((b) => b.slug === params.slug);
    return { slug: params.slug, book: book ?? null };
  },
  head: ({ loaderData }) => {
    const book = loaderData?.book;
    if (!book) {
      return {
        meta: [
          { title: "Ebook not found — Future Grow Academy" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${book.title} — Future Grow Academy eBook`;
    return {
      meta: [
        { title },
        { name: "description", content: book.blurb.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: book.blurb.slice(0, 155) },
        { property: "og:type", content: "product" },
      ],
    };
  },
  component: BookDetail,
});

function BookDetail() {
  const { slug, book: seed } = Route.useLoaderData();
  const { books: liveBooks, reviews: liveReviews, authors } = useCatalog();
  const book = liveBooks.find((b) => b.slug === slug) ?? seed;
  const { addToCart, toggleWishlist, isWishlisted, cart } = useStore();
  const [view, setView] = useState<"cover" | "contents" | "sample">("cover");

  if (!book) throw notFound();

  const saved = isWishlisted(book.id);
  const inCart = cart.some((l) => l.id === book.id);
  const off = Math.round((1 - book.price / book.oldPrice) * 100);
  const author = authors.find((a) => a.id === book.authorId);

  const related = liveBooks.filter((b) => b.id !== book.id && b.category === book.category);
  const more = (related.length ? related : liveBooks.filter((b) => b.id !== book.id)).slice(0, 4);
  const reviews = liveReviews.filter((r) => r.bookId === book.id && r.status === "published").slice(0, 6);

  return (
    <div className="pb-20">
      <div className="container-page pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" aria-hidden />
          <Link
            to="/books"
            search={{ q: undefined, category: book.category }}
            className="hover:text-foreground"
          >
            {book.category}
          </Link>
          <ChevronRight className="h-3 w-3" aria-hidden />
          <span className="truncate text-foreground">{book.title}</span>
        </nav>
      </div>

      <div className="container-page mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14">
        {/* ---------------- left column ---------------- */}
        <div className="min-w-0">
          <div className="grid gap-6 sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-8">
            <div>
              <div className="cover-plate">
                {view === "cover" ? (
                  <img
                    src={book.cover}
                    alt={`Cover of ${book.title}`}
                    width={640}
                    height={960}
                    className="aspect-[2/3] w-full object-cover"
                  />
                ) : (
                  <div className="aspect-[2/3] w-full overflow-y-auto bg-card p-5">
                    <p className="eyebrow">
                      {view === "contents" ? "Table of contents" : "Inside the book"}
                    </p>
                    {view === "contents" ? (
                      <ol className="mt-3 space-y-2.5 text-[0.72rem] leading-snug">
                        {book.bullets.map((b, i) => (
                          <li key={b} className="flex gap-2 border-b border-border pb-2">
                            <span className="text-muted-foreground">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p className="mt-3 text-[0.72rem] leading-relaxed text-muted-foreground">
                        {book.description[0]}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2" role="tablist" aria-label="Preview">
                {(["cover", "contents", "sample"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    role="tab"
                    aria-selected={view === v}
                    onClick={() => setView(v)}
                    className={cn(
                      "press rounded-md border px-2 py-2 text-[0.66rem] font-semibold capitalize",
                      view === v
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="min-w-0">
              <p className="eyebrow">{book.category}</p>
              <h1 className="mt-2 text-[1.7rem] leading-tight font-semibold sm:text-4xl">
                {book.title}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {author ? (
                  <>
                    By{" "}
                    <Link to="/authors/$slug" params={{ slug: author.slug }} className="hover:text-foreground">
                      {author.name}
                    </Link>
                    {" · "}
                  </>
                ) : null}
                Published by {storeConfig.name}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                <Stars rating={book.rating} />
                <span className="font-medium">{book.rating.toFixed(1)}</span>
                <a href="#reviews" className="text-muted-foreground hover:text-foreground">
                  {book.reviews.toLocaleString("en-US")} reviews
                </a>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">
                  {book.bought.toLocaleString("en-US")} downloads
                </span>
              </div>

              <p className="mt-6 leading-relaxed text-foreground/90">{book.blurb}</p>

              <h2 className="mt-8 text-base font-semibold">What you'll learn</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {book.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-[0.88rem] text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>

              <h2 className="mt-10 text-base font-semibold">About this ebook</h2>
              <div className="mt-3 space-y-4 leading-relaxed text-muted-foreground">
                {book.description.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>

              <div className="mt-8 rounded-lg border border-border bg-secondary/50 p-5 text-[0.82rem] leading-relaxed text-muted-foreground">
                {storeConfig.note}
              </div>
            </div>
          </div>

          {/* reviews */}
          <section id="reviews" className="mt-14 scroll-mt-24">
            <h2 className="text-xl font-semibold sm:text-2xl">Reader reviews</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {reviews.length ? (
                reviews.map((r) => (
                  <Reveal key={r.id}>
                    <figure className="flex h-full flex-col rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                      <span className="inline-flex items-center gap-1 text-[0.78rem] font-medium">
                        <Star className="h-3.5 w-3.5 fill-gold text-gold" aria-hidden />
                        {r.rating}
                      </span>
                      <blockquote className="mt-3 flex-1 text-[0.86rem] leading-relaxed text-foreground/90">
                        {r.quote}
                      </blockquote>
                      <figcaption className="mt-4 text-[0.75rem] text-muted-foreground">
                        {r.name} · {r.location}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No published reviews yet for this title.</p>
              )}
            </div>
          </section>

          <section className="mt-14">
            <h2 className="text-xl font-semibold sm:text-2xl">Readers also picked up</h2>
            <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
              {more.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </section>
        </div>

        {/* ---------------- sticky purchase panel ---------------- */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl font-semibold tracking-[-0.02em]">
                {formatPrice(book.price)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(book.oldPrice)}
              </span>
              {off > 0 ? (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[0.68rem] font-semibold text-primary">
                  Save {off}%
                </span>
              ) : null}
            </div>

            <fieldset className="mt-5">
              <legend className="eyebrow">Format</legend>
              <div className="mt-2 space-y-2">
                <span className="flex items-center justify-between rounded-lg border border-foreground bg-secondary/60 px-4 py-3 text-sm font-medium">
                  PDF — instant download
                  <Check className="h-4 w-4" aria-hidden />
                </span>
                <button
                  type="button"
                  disabled
                  className="flex w-full cursor-not-allowed items-center justify-between rounded-lg border border-border px-4 py-3 text-sm text-muted-foreground opacity-60"
                >
                  Paperback
                  <span className="text-[0.7rem]">Not available</span>
                </button>
              </div>
            </fieldset>

            <button
              type="button"
              onClick={() => addToCart(book.id)}
              className="press mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-semibold text-background hover:bg-foreground/90"
            >
              <Download className="h-4 w-4" />
              {inCart ? "Add another copy" : "Add to bag"}
            </button>
            <Link
              to="/checkout"
              onClick={() => {
                if (!inCart) addToCart(book.id);
              }}
              className="press mt-2.5 inline-flex h-12 w-full items-center justify-center rounded-full border border-border text-sm font-semibold hover:border-foreground/30 hover:bg-muted"
            >
              Buy now
            </Link>
            <button
              type="button"
              onClick={() => toggleWishlist(book.id)}
              aria-pressed={saved}
              className="press mt-2.5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border text-sm font-semibold hover:border-foreground/30 hover:bg-muted"
            >
              <Heart className={cn("h-4 w-4", saved && "fill-destructive text-destructive")} />
              {saved ? "Saved" : "Save for later"}
            </button>

            <ul className="mt-6 space-y-3 border-t border-border pt-5 text-[0.8rem] text-muted-foreground">
              <li className="flex gap-2.5">
                <Download className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                Delivered instantly after payment — no shipping.
              </li>
              <li className="flex gap-2.5">
                <Smartphone className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                Reads on phone, tablet, laptop or e-reader.
              </li>
              <li className="flex gap-2.5">
                <ShieldCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                Secure checkout, cards accepted worldwide.
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
