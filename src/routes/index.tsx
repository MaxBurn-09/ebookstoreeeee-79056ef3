import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, RotateCcw, ShieldCheck, Headphones, Search } from "lucide-react";
import heroBooks from "@/assets/hero-books.jpg";
import editorial from "@/assets/editorial-book.jpg";
import promo from "@/assets/promo-reading.jpg";
import {
  bestsellers,
  newArrivals,
  newArrivalFilters,
  categories,
  authors,
  bookOfTheMonth,
  formatPrice,
} from "@/data/catalog";
import { BookCard } from "@/components/site/BookCard";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Stars } from "@/components/site/Stars";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Page & Pine — Independent Bookshop for Slow Readers" },
      {
        name: "description",
        content:
          "Curated fiction, non-fiction and classics from an independent bookshop. Free shipping over ₹999, 7-day returns and hand-picked recommendations.",
      },
      { property: "og:title", content: "Page & Pine — Independent Bookshop for Slow Readers" },
      {
        property: "og:description",
        content:
          "Curated fiction, non-fiction and classics, hand-picked by booksellers. Free shipping over ₹999.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BookStore",
          name: "Page & Pine",
          description: "Independent bookshop with curated fiction, non-fiction and classics.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "14 Linden Lane, Bandra West",
            addressLocality: "Mumbai",
            postalCode: "400050",
            addressCountry: "IN",
          },
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <Categories />
      <Bestsellers />
      <NewArrivals />
      <BookOfTheMonth />
      <Authors />
      <Promo />
      <Newsletter />
    </>
  );
}

function Hero() {
  return (
    <section className="bg-cream">
      <div className="container grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="eyebrow">Independent since 2014</p>
          <h1 className="mt-4 text-4xl leading-[1.05] md:text-6xl">
            Find the book
            <br />
            you'll reread
            <br />
            <span className="italic text-forest">for years.</span>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            A small shop with a big table in the middle. Every title on these shelves has been read,
            argued over and recommended by someone on our team.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/books"
              className="inline-flex items-center gap-2 rounded-sm bg-forest px-7 py-3.5 text-[0.7rem] font-semibold tracking-[0.16em] text-forest-foreground uppercase hover:bg-charcoal"
            >
              Shop all books <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/bestsellers"
              className="inline-flex items-center gap-2 rounded-sm border border-forest px-7 py-3.5 text-[0.7rem] font-semibold tracking-[0.16em] text-forest uppercase hover:bg-forest hover:text-forest-foreground"
            >
              Bestsellers
            </Link>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-taupe pt-6">
            {[
              ["12k+", "Titles"],
              ["48k", "Orders"],
              ["4.8★", "Rating"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-serif text-2xl">{v}</dt>
                <dd className="text-[0.62rem] tracking-[0.18em] text-muted-foreground uppercase">
                  {l}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <img
            src={heroBooks}
            alt="A stack of hardcover books on a warm cream backdrop"
            className="w-full rounded-lg object-cover shadow-lg"
            width={1024}
            height={1024}
          />
          <div className="absolute bottom-5 left-5 hidden rounded-md bg-background/95 p-4 shadow-md backdrop-blur sm:block">
            <p className="text-[0.6rem] tracking-[0.18em] text-muted-foreground uppercase">
              Staff pick
            </p>
            <p className="mt-1 font-serif text-lg">{bookOfTheMonth.title}</p>
            <div className="mt-1 flex items-center gap-2">
              <Stars rating={bookOfTheMonth.rating} />
              <span className="text-xs text-muted-foreground">{formatPrice(bookOfTheMonth.price)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const items = [
    { icon: Truck, title: "Free shipping", note: "On orders over ₹999" },
    { icon: RotateCcw, title: "7-day returns", note: "No questions asked" },
    { icon: ShieldCheck, title: "Secure payments", note: "UPI, cards, netbanking" },
    { icon: Headphones, title: "Bookseller help", note: "Mon–Sat, 10am–8pm" },
  ];
  return (
    <section className="border-y border-border bg-background">
      <div className="container grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, note }) => (
          <div key={title} className="flex items-center gap-3">
            <Icon className="h-6 w-6 shrink-0 text-forest" />
            <div>
              <p className="text-sm font-medium">{title}</p>
              <p className="text-xs text-muted-foreground">{note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="container py-16">
      <SectionHeader
        eyebrow="Browse by mood"
        title="Shop by category"
        subtitle="Six shelves, endlessly restocked."
        linkLabel="All categories"
        linkTo="/categories"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.slug}
            to="/books"
            search={{ category: c.name, q: undefined }}
            className="group relative overflow-hidden rounded-lg border border-border"
          >
            <img
              src={c.image}
              alt={`${c.name} books`}
              loading="lazy"
              className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
            <div className="absolute bottom-4 left-5 text-cream">
              <p className="text-[0.6rem] tracking-[0.2em] uppercase opacity-80">{c.tagline}</p>
              <h3 className="mt-1 font-serif text-2xl">{c.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Bestsellers() {
  return (
    <section className="bg-cream py-16">
      <div className="container">
        <SectionHeader
          eyebrow="Reader favourites"
          title="Bestsellers this season"
          subtitle="What's leaving our shelves fastest."
          linkLabel="View all"
          linkTo="/bestsellers"
        />
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
          {bestsellers.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      </div>
    </section>
  );
}

function NewArrivals() {
  const [filter, setFilter] = useState<string>("All");
  const shown = newArrivals.filter((b) => filter === "All" || b.category === filter);

  return (
    <section className="container py-16">
      <SectionHeader
        eyebrow="Just landed"
        title="New arrivals"
        linkLabel="See everything"
        linkTo="/new-arrivals"
      />
      <div className="mb-8 flex flex-wrap gap-2">
        {newArrivalFilters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-2 text-[0.66rem] font-semibold tracking-[0.14em] uppercase transition-colors ${
              filter === f
                ? "border-forest bg-forest text-forest-foreground"
                : "border-border text-muted-foreground hover:border-forest hover:text-forest"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      {shown.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          Nothing new in this shelf yet — check back next week.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
          {shown.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      )}
    </section>
  );
}

function BookOfTheMonth() {
  const { addToCart } = useStore();
  const book = bookOfTheMonth;
  return (
    <section className="bg-forest text-forest-foreground">
      <div className="container grid items-center gap-10 py-16 lg:grid-cols-2">
        <img
          src={editorial}
          alt={`Editorial photograph of ${book.title}`}
          loading="lazy"
          className="w-full rounded-lg object-cover"
        />
        <div>
          <p className="text-[0.62rem] tracking-[0.24em] uppercase opacity-70">Book of the month</p>
          <h2 className="mt-4 font-serif text-3xl md:text-5xl">{book.title}</h2>
          <p className="mt-3 text-sm opacity-80">by {book.author}</p>
          <p className="mt-6 max-w-md text-sm leading-relaxed opacity-85">{book.blurb}</p>
          <p className="mt-6 font-serif text-2xl">
            {formatPrice(book.price)}
            {book.oldPrice ? (
              <span className="ml-3 text-sm line-through opacity-60">
                {formatPrice(book.oldPrice)}
              </span>
            ) : null}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => addToCart(book.id)}
              className="rounded-sm bg-cream px-7 py-3.5 text-[0.7rem] font-semibold tracking-[0.16em] text-charcoal uppercase hover:bg-background"
            >
              Add to cart
            </button>
            <Link
              to="/book/$slug"
              params={{ slug: book.slug }}
              className="rounded-sm border border-forest-foreground/40 px-7 py-3.5 text-[0.7rem] font-semibold tracking-[0.16em] uppercase hover:bg-forest-foreground/10"
            >
              Read more
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Authors() {
  return (
    <section className="container py-16">
      <SectionHeader
        eyebrow="In conversation"
        title="Authors we love"
        linkLabel="All authors"
        linkTo="/authors"
      />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {authors.map((a) => (
          <article key={a.slug} className="text-center">
            <img
              src={a.portrait}
              alt={`Portrait of ${a.name}`}
              loading="lazy"
              className="mx-auto h-36 w-36 rounded-full object-cover"
            />
            <h3 className="mt-5 font-serif text-xl">{a.name}</h3>
            <p className="mt-1 text-[0.62rem] tracking-[0.18em] text-muted-foreground uppercase">
              {a.books} books
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{a.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Promo() {
  return (
    <section className="container pb-16">
      <div className="grid items-center gap-0 overflow-hidden rounded-lg border border-border lg:grid-cols-2">
        <img
          src={promo}
          alt="A reader with a book and coffee in a warm bookshop corner"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="bg-cream p-10 lg:p-14">
          <p className="eyebrow">Members read more</p>
          <h2 className="mt-4 text-3xl md:text-4xl">Join the Pine Circle</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Ten percent off every order, early access to signed editions and one handwritten
            recommendation a month from a bookseller who knows your shelf.
          </p>
          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-forest px-7 py-3.5 text-[0.7rem] font-semibold tracking-[0.16em] text-forest-foreground uppercase hover:bg-charcoal"
          >
            Learn more <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <section className="border-t border-border bg-background py-16">
      <div className="container max-w-2xl text-center">
        <p className="eyebrow">Letters from the shop</p>
        <h2 className="mt-3 text-3xl md:text-4xl">One good book, every Friday</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          No spam, no algorithms — just a short note about what we're reading.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("You're on the list — see you Friday.");
            setEmail("");
          }}
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <div className="flex flex-1 items-center gap-2 rounded-sm border border-border bg-card px-4 py-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
          <button
            type="submit"
            className="rounded-sm bg-forest px-7 py-3.5 text-[0.7rem] font-semibold tracking-[0.16em] text-forest-foreground uppercase hover:bg-charcoal"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
