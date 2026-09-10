import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, Download, Star, Quote } from "lucide-react";
import {
  books,
  bestsellers,
  newArrivals,
  categories,
  benefits,
  whyUs,
  testimonials,
  featuredBook,
  storeConfig,
  formatPrice,
} from "@/data/catalog";
import { BookCard } from "@/components/site/BookCard";
import { Stars } from "@/components/site/Stars";
import { Reveal } from "@/components/site/Reveal";
import { useStore } from "@/lib/store";
import editorial from "@/assets/editorial-book.jpg";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Future Grow Academy — Premium Self-Growth eBooks from $2.97" },
      {
        name: "description",
        content:
          "Read practical ebooks on mindset, money, relationships, parenting and health. Instant PDF download worldwide, no shipping, just $2.97 each.",
      },
      { property: "og:title", content: "Future Grow Academy — Premium Self-Growth eBooks" },
      {
        property: "og:description",
        content:
          "15 practical self-growth ebooks. Instant download on any device, worldwide, from $2.97.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Bestsellers />
      <CategoryBand />
      <NewArrivals />
      <FeaturedEbook />
      <Publisher />
      <Collections />
      <Reviews />
      <Newsletter />
    </>
  );
}

/* ------------------------------------------------------------------ hero */

function Hero() {
  const stack = [books[2], books[0], books[11]].filter(Boolean) as typeof books;
  const rating = (books.reduce((s, b) => s + b.rating, 0) / books.length).toFixed(1);

  return (
    <section className="border-b border-border bg-background">
      <div className="container-page grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
        <div className="max-w-xl">
          <p className="eyebrow">Digital reading library · Worldwide</p>
          <h1 className="mt-4 text-[2.1rem] leading-[1.08] font-semibold sm:text-5xl lg:text-[3.4rem]">
            {storeConfig.heroTitle}
          </h1>
          <p className="mt-5 text-[0.98rem] leading-relaxed text-muted-foreground sm:text-base">
            {storeConfig.heroSubtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/books"
              className="press inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background hover:bg-foreground/90"
            >
              Browse the library <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/bestsellers"
              className="press inline-flex h-12 items-center rounded-full border border-border px-6 text-sm font-semibold hover:border-foreground/30 hover:bg-muted"
            >
              See bestsellers
            </Link>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
            <Stat label="Ebooks" value={`${books.length}`} />
            <Stat label="Avg. rating" value={rating} />
            <Stat label="Every title" value="$2.97" />
          </dl>
        </div>

        <Reveal className="relative">
          <div className="flex items-end justify-center gap-4 sm:gap-6">
            {stack.map((book, i) => (
              <Link
                key={book.id}
                to="/book/$slug"
                params={{ slug: book.slug }}
                preload="intent"
                className={cn(
                  "cover-plate block w-[28%] transition-transform duration-500 hover:-translate-y-2 sm:w-[30%]",
                  i === 1 && "w-[38%] sm:w-[40%]",
                )}
                style={{ transform: i === 1 ? undefined : "translateY(6%)" }}
              >
                <img
                  src={book.cover}
                  alt={`${book.title} ebook cover`}
                  width={640}
                  height={960}
                  className="aspect-[2/3] w-full object-cover"
                />
              </Link>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Instant PDF download · Read on phone, tablet or laptop
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="eyebrow">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold tracking-[-0.02em]">{value}</dd>
    </div>
  );
}

/* ----------------------------------------------------------- trust strip */

function TrustStrip() {
  return (
    <section aria-label="Why buy here" className="border-b border-border bg-secondary/60">
      <ul className="container-page grid gap-x-8 gap-y-5 py-6 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((b) => (
          <li key={b.title} className="flex items-start gap-3">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            <span className="min-w-0">
              <span className="block text-[0.82rem] font-semibold">{b.title}</span>
              <span className="block text-[0.75rem] text-muted-foreground">{b.note}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------------------------------------------------- section head */

function Head({
  eyebrow,
  title,
  note,
  to,
  cta,
}: {
  eyebrow: string;
  title: string;
  note?: string;
  to?: "/books" | "/bestsellers" | "/new-arrivals" | "/categories";
  cta?: string;
}) {
  return (
    <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:mb-10">
      <div className="min-w-0">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-semibold sm:text-[2rem]">{title}</h2>
        {note ? (
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">{note}</p>
        ) : null}
      </div>
      {to ? (
        <Link
          to={to}
          className="link-sweep shrink-0 pb-1 text-[0.8rem] font-semibold whitespace-nowrap"
        >
          {cta ?? "View all"}
        </Link>
      ) : null}
    </div>
  );
}

/* ----------------------------------------------------------- bestsellers */

function Bestsellers() {
  return (
    <section className="section-y">
      <div className="container-page">
        <Head
          eyebrow="Most read this month"
          title="Bestselling ebooks"
          note="The titles readers finish, apply and come back to recommend."
          to="/bestsellers"
        />
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {bestsellers.slice(0, 4).map((book, i) => (
            <Reveal key={book.id} delay={i * 60}>
              <BookCard book={book} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ categories */

function CategoryBand() {
  return (
    <section className="border-y border-border bg-secondary/50 section-y">
      <div className="container-page">
        <Head
          eyebrow="Browse by need"
          title="Reading categories"
          note="Five focused shelves — pick the one that matches what you're working on right now."
          to="/categories"
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((c, i) => {
            const count = books.filter((b) => b.category === c.name).length;
            return (
              <Reveal key={c.slug} delay={i * 50}>
                <Link
                  to="/books"
                  search={{ q: undefined, category: c.slug }}
                  className="group hover-lift block overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-card)]"
                >
                  <img
                    src={c.cover}
                    alt=""
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="p-4">
                    <h3 className="text-[0.9rem] font-semibold">{c.name}</h3>
                    <p className="mt-1 text-[0.75rem] text-muted-foreground">{c.tagline}</p>
                    <p className="mt-3 text-[0.7rem] font-medium text-muted-foreground">
                      {count} {count === 1 ? "title" : "titles"}
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- new arrivals */

function NewArrivals() {
  return (
    <section className="section-y">
      <div className="container-page">
        <Head
          eyebrow="Fresh on the shelf"
          title="New additions"
          note="Recently published guides, added to the library this season."
          to="/new-arrivals"
        />
      </div>
      <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-10">
        {newArrivals.map((book) => (
          <div key={book.id} className="w-[46%] shrink-0 snap-start sm:w-[30%] lg:w-[19%]">
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------- featured book */

function FeaturedEbook() {
  const { addToCart } = useStore();
  const book = featuredBook;

  return (
    <section className="border-y border-border bg-foreground text-background section-y">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
        <Reveal className="mx-auto w-2/3 max-w-xs lg:w-full">
          <div className="cover-plate">
            <img
              src={book.cover}
              alt={`${book.title} ebook cover`}
              loading="lazy"
              width={640}
              height={960}
              className="aspect-[2/3] w-full object-cover"
            />
          </div>
        </Reveal>

        <div>
          <p className="eyebrow text-background/60">Editor's pick</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{book.title}</h2>
          <div className="mt-3 flex items-center gap-2 text-sm text-background/70">
            <Stars rating={book.rating} />
            {book.rating.toFixed(1)} · {book.reviews.toLocaleString("en-US")} reviews
          </div>
          <p className="mt-5 max-w-xl leading-relaxed text-background/80">{book.blurb}</p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {book.bullets.slice(0, 4).map((b) => (
              <li key={b} className="flex gap-2 text-sm text-background/80">
                <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => addToCart(book.id)}
              className="press inline-flex h-12 items-center gap-2 rounded-full bg-background px-6 text-sm font-semibold text-foreground hover:bg-background/90"
            >
              <Download className="h-4 w-4" /> Add for {formatPrice(book.price)}
            </button>
            <Link
              to="/book/$slug"
              params={{ slug: book.slug }}
              className="link-sweep text-sm font-semibold"
            >
              Read the details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- publisher */

function Publisher() {
  return (
    <section className="section-y">
      <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-lg border border-border">
            <img
              src={editorial}
              alt="Reading a Future Grow Academy ebook"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </Reveal>
        <div className="order-1 lg:order-2">
          <p className="eyebrow">The people behind the books</p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-[2rem]">{storeConfig.name}</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{storeConfig.tagline}</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {whyUs.map((w) => (
              <div key={w.title}>
                <h3 className="text-[0.92rem] font-semibold">{w.title}</h3>
                <p className="mt-1.5 text-[0.85rem] leading-relaxed text-muted-foreground">
                  {w.note}
                </p>
              </div>
            ))}
          </div>
          <Link to="/authors" className="link-sweep mt-8 inline-block text-sm font-semibold">
            Explore programmes
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- collections */

function Collections() {
  const sets = [
    {
      title: "Rebuild after a breakup",
      note: "Detach, heal and rebuild self-worth in a structured 30 days.",
      slugs: ["Relationship", "Self-Care"],
      category: "relationship",
    },
    {
      title: "Calmer home, calmer kids",
      note: "Two parenting guides for households that shout less and listen more.",
      slugs: ["Parenting"],
      category: "parenting",
    },
    {
      title: "Earn online this quarter",
      note: "Digital income playbooks you can start with a laptop and a plan.",
      slugs: ["Money"],
      category: "money",
    },
  ];

  return (
    <section className="border-y border-border bg-secondary/50 section-y">
      <div className="container-page">
        <Head
          eyebrow="Curated sets"
          title="Reading collections"
          note="Short, purposeful reading paths instead of an endless catalogue."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {sets.map((set, i) => {
            const items = books.filter((b) => set.slugs.includes(b.category)).slice(0, 3);
            return (
              <Reveal key={set.title} delay={i * 60}>
                <Link
                  to="/books"
                  search={{ q: undefined, category: set.category }}
                  className="group hover-lift flex h-full flex-col rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-card)]"
                >
                  <div className="flex -space-x-4">
                    {items.map((b) => (
                      <img
                        key={b.id}
                        src={b.cover}
                        alt=""
                        loading="lazy"
                        className="h-24 w-16 rounded-[3px] border border-border object-cover shadow-[var(--shadow-card)] transition-transform duration-500 group-hover:-translate-y-1"
                      />
                    ))}
                  </div>
                  <h3 className="mt-5 text-[1.05rem] font-semibold">{set.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{set.note}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[0.8rem] font-semibold">
                    Open collection
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- reviews */

function Reviews() {
  return (
    <section className="section-y">
      <div className="container-page">
        <Head
          eyebrow="Readers worldwide"
          title="What readers say"
          note="From New York to Berlin — feedback from people who finished the books."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 60}>
              <figure className="flex h-full flex-col rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                <Quote className="h-5 w-5 text-taupe" aria-hidden />
                <blockquote className="mt-4 flex-1 text-[0.9rem] leading-relaxed text-foreground/90">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <span>
                    <span className="block text-[0.85rem] font-semibold">{t.name}</span>
                    <span className="block text-[0.75rem] text-muted-foreground">{t.location}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-[0.78rem] font-medium">
                    <Star className="h-3.5 w-3.5 fill-gold text-gold" aria-hidden />
                    {t.rating}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- newsletter */

function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="border-t border-border bg-secondary/60 section-y">
      <div className="container-page max-w-2xl text-center">
        <p className="eyebrow">Stay in the loop</p>
        <h2 className="mt-2 text-2xl font-semibold sm:text-[2rem]">
          New ebooks and offers, once a month
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          No noise — just new releases and the occasional discount. Unsubscribe anytime.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
          className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="h-12 flex-1 rounded-full border border-border bg-card px-5 text-sm outline-none transition-colors focus:border-foreground/30"
          />
          <button
            type="submit"
            disabled={done}
            className="press h-12 rounded-full bg-foreground px-6 text-sm font-semibold text-background hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {done ? "Subscribed" : "Subscribe"}
          </button>
        </form>
        {done ? (
          <p className="mt-3 text-xs text-primary">Thanks — you're on the list.</p>
        ) : null}
      </div>
    </section>
  );
}
