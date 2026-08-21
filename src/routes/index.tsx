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
import { Reveal } from "@/components/site/Reveal";
import { Parallax, Tilt, CountUp } from "@/components/site/Motion";
import { Marquee } from "@/components/site/Marquee";
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
      <Marquee
        items={[
          "Hand-picked by booksellers",
          "Free shipping over ₹999",
          "Signed first editions",
          "7-day easy returns",
          "New arrivals every Friday",
        ]}
      />
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
    <section className="grain relative overflow-hidden bg-cream">
      <div
        aria-hidden
        className="float-slow pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gold/15 blur-3xl"
      />
      <div
        aria-hidden
        className="float-slow pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-forest/10 blur-3xl"
        style={{ animationDelay: "1.5s" }}
      />
      <div className="container-page relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="eyebrow reveal" style={{ animationDelay: "80ms" }}>
            Independent since 2014
          </p>
          <h1 className="mt-4 text-4xl leading-[1.05] md:text-6xl">
            {["Find the book", "you'll reread"].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <span
                  className="reveal block"
                  style={{ animationDelay: `${160 + i * 120}ms` }}
                >
                  {line}
                </span>
              </span>
            ))}
            <span className="block overflow-hidden">
              <span
                className="reveal text-gold-shimmer block italic"
                style={{ animationDelay: "400ms" }}
              >
                for years.
              </span>
            </span>
          </h1>
          <p
            className="reveal mt-6 max-w-md text-sm leading-relaxed text-muted-foreground"
            style={{ animationDelay: "520ms" }}
          >
            A small shop with a big table in the middle. Every title on these shelves has been read,
            argued over and recommended by someone on our team.
          </p>
          <div className="reveal mt-8 flex flex-wrap gap-3" style={{ animationDelay: "620ms" }}>
            <Link
              to="/books"
              className="press group inline-flex items-center gap-2 overflow-hidden rounded-sm bg-forest px-7 py-3.5 text-[0.7rem] font-semibold tracking-[0.16em] text-forest-foreground uppercase shadow-lg shadow-forest/20 transition-all hover:bg-charcoal hover:shadow-xl hover:shadow-forest/30"
            >
              Shop all books
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
            <Link
              to="/bestsellers"
              className="press inline-flex items-center gap-2 rounded-sm border border-forest px-7 py-3.5 text-[0.7rem] font-semibold tracking-[0.16em] text-forest uppercase transition-colors hover:bg-forest hover:text-forest-foreground"
            >
              Bestsellers
            </Link>
          </div>
          <dl className="reveal mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-taupe pt-6" style={{ animationDelay: "720ms" }}>
            <div>
              <dt className="font-serif text-2xl">
                <CountUp value={12} suffix="k+" />
              </dt>
              <dd className="text-[0.62rem] tracking-[0.18em] text-muted-foreground uppercase">
                Titles
              </dd>
            </div>
            <div>
              <dt className="font-serif text-2xl">
                <CountUp value={48} suffix="k" />
              </dt>
              <dd className="text-[0.62rem] tracking-[0.18em] text-muted-foreground uppercase">
                Orders
              </dd>
            </div>
            <div>
              <dt className="font-serif text-2xl">
                <CountUp value={4.8} suffix="★" />
              </dt>
              <dd className="text-[0.62rem] tracking-[0.18em] text-muted-foreground uppercase">
                Rating
              </dd>
            </div>
          </dl>
        </div>

        <Parallax speed={0.06}>
          <Tilt className="relative" max={7}>
            <div className="shine relative overflow-hidden rounded-lg">
              <img
                src={heroBooks}
                alt="A stack of hardcover books on a warm cream backdrop"
                className="w-full rounded-lg object-cover shadow-2xl"
                width={1024}
                height={1024}
              />
            </div>
            <div className="float-slow absolute bottom-5 left-5 hidden rounded-md bg-background/95 p-4 shadow-md backdrop-blur sm:block">
              <p className="text-[0.6rem] tracking-[0.18em] text-muted-foreground uppercase">
                Staff pick
              </p>
              <p className="mt-1 font-serif text-lg">{bookOfTheMonth.title}</p>
              <div className="mt-1 flex items-center gap-2">
                <Stars rating={bookOfTheMonth.rating} />
                <span className="text-xs text-muted-foreground">
                  {formatPrice(bookOfTheMonth.price)}
                </span>
              </div>
            </div>
          </Tilt>
        </Parallax>
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
    <section className="border-b border-border bg-background">
      <div className="container-page grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, note }, i) => (
          <Reveal key={title} delay={i * 90}>
            <div className="group flex items-center gap-3">
              <Icon className="h-6 w-6 shrink-0 text-forest transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110 group-hover:text-gold" />
              <div>
                <p className="text-sm font-medium">{title}</p>
                <p className="text-xs text-muted-foreground">{note}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="container-page py-16">
      <Reveal>
        <SectionHeader
          eyebrow="Browse by mood"
          title="Shop by category"
          subtitle="Six shelves, endlessly restocked."
          linkLabel="All categories"
          linkTo="/categories"
        />
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c, i) => (
          <Reveal key={c.slug} delay={i * 80}>
            <Link
              to="/books"
              search={{ category: c.name, q: undefined }}
              className="shine hover-lift group relative block overflow-hidden rounded-lg border border-border"
            >
              <img
                src={c.image}
                alt={`${c.name} books`}
                loading="lazy"
                className="h-56 w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent transition-opacity duration-500 group-hover:from-forest/90" />
              <div className="absolute bottom-4 left-5 text-cream transition-transform duration-500 group-hover:-translate-y-1">
                <p className="text-[0.6rem] tracking-[0.2em] uppercase opacity-80">{c.tagline}</p>
                <h3 className="mt-1 font-serif text-2xl">{c.name}</h3>
                <span className="mt-2 flex items-center gap-2 text-[0.6rem] tracking-[0.2em] uppercase opacity-0 transition-all duration-500 group-hover:opacity-90">
                  Browse shelf <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Bestsellers() {
  return (
    <section className="bg-cream py-16">
      <div className="container-page">
        <Reveal>
          <SectionHeader
            eyebrow="Reader favourites"
            title="Bestsellers this season"
            subtitle="What's leaving our shelves fastest."
            linkLabel="View all"
            linkTo="/bestsellers"
          />
        </Reveal>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
          {bestsellers.map((b, i) => (
            <Reveal key={b.id} delay={i * 60}>
              <BookCard book={b} />
            </Reveal>
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
    <section className="container-page py-16">
      <Reveal>
        <SectionHeader
          eyebrow="Just landed"
          title="New arrivals"
          linkLabel="See everything"
          linkTo="/new-arrivals"
        />
      </Reveal>
      <Reveal>
        <div className="mb-8 flex flex-wrap gap-2">
          {newArrivalFilters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`press rounded-full border px-4 py-2 text-[0.66rem] font-semibold tracking-[0.14em] uppercase transition-all duration-300 ${
                filter === f
                  ? "border-forest bg-forest text-forest-foreground shadow-md shadow-forest/25"
                  : "border-border text-muted-foreground hover:-translate-y-0.5 hover:border-forest hover:text-forest"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </Reveal>
      {shown.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          Nothing new in this shelf yet — check back next week.
        </p>
      ) : (
        <div
          key={filter}
          className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-6"
        >
          {shown.map((b, i) => (
            <div
              key={b.id}
              className="reveal"
              style={{ animationDelay: `${Math.min(i * 60, 400)}ms` }}
            >
              <BookCard book={b} />
            </div>
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
    <section className="grain relative overflow-hidden bg-forest text-forest-foreground">
      <div
        aria-hidden
        className="float-slow pointer-events-none absolute top-1/3 -left-16 h-72 w-72 rounded-full bg-gold/15 blur-3xl"
      />
      <div className="container-page relative grid items-center gap-10 py-16 lg:grid-cols-2">
        <Reveal>
          <Tilt max={6}>
            <div className="shine overflow-hidden rounded-lg">
              <img
                src={editorial}
                alt={`Editorial photograph of ${book.title}`}
                loading="lazy"
                className="w-full object-cover transition-transform duration-[900ms] hover:scale-105"
              />
            </div>
          </Tilt>
        </Reveal>
        <Reveal delay={120}>
          <div>
            <p className="text-[0.62rem] tracking-[0.24em] uppercase opacity-70">
              Book of the month
            </p>
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
                className="press rounded-sm bg-cream px-7 py-3.5 text-[0.7rem] font-semibold tracking-[0.16em] text-charcoal uppercase transition-all hover:-translate-y-0.5 hover:bg-gold"
              >
                Add to cart
              </button>
              <Link
                to="/book/$slug"
                params={{ slug: book.slug }}
                className="press rounded-sm border border-forest-foreground/40 px-7 py-3.5 text-[0.7rem] font-semibold tracking-[0.16em] uppercase transition-colors hover:bg-forest-foreground/10"
              >
                Read more
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Authors() {
  return (
    <section className="container-page py-16">
      <Reveal>
        <SectionHeader
          eyebrow="In conversation"
          title="Authors we love"
          linkLabel="All authors"
          linkTo="/authors"
        />
      </Reveal>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {authors.map((a, i) => (
          <Reveal key={a.slug} delay={i * 100}>
            <article className="group text-center">
              <div className="relative mx-auto h-36 w-36">
                <span className="absolute inset-0 scale-90 rounded-full border border-gold/0 transition-all duration-500 group-hover:scale-110 group-hover:border-gold/60" />
                <img
                  src={a.portrait}
                  alt={`Portrait of ${a.name}`}
                  loading="lazy"
                  className="h-36 w-36 rounded-full object-cover transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl"
                />
              </div>
              <h3 className="mt-5 font-serif text-xl transition-colors group-hover:text-forest">
                {a.name}
              </h3>
              <p className="mt-1 text-[0.62rem] tracking-[0.18em] text-muted-foreground uppercase">
                {a.books} books
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{a.note}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Promo() {
  return (
    <section className="container-page pb-16">
      <Reveal>
        <div className="grid items-center gap-0 overflow-hidden rounded-lg border border-border lg:grid-cols-2">
          <div className="shine h-full overflow-hidden">
            <img
              src={promo}
              alt="A reader with a book and coffee in a warm bookshop corner"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105"
            />
          </div>
          <div className="bg-cream p-10 lg:p-14">
            <p className="eyebrow">Members read more</p>
            <h2 className="mt-4 text-3xl md:text-4xl">Join the Pine Circle</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Ten percent off every order, early access to signed editions and one handwritten
              recommendation a month from a bookseller who knows your shelf.
            </p>
            <Link
              to="/about"
              className="press group mt-8 inline-flex items-center gap-2 rounded-sm bg-forest px-7 py-3.5 text-[0.7rem] font-semibold tracking-[0.16em] text-forest-foreground uppercase transition-all hover:-translate-y-0.5 hover:bg-charcoal"
            >
              Learn more
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <section className="border-t border-border bg-background py-16">
      <Reveal className="container-page max-w-2xl text-center">
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
          <div className="flex flex-1 items-center gap-2 rounded-sm border border-border bg-card px-4 py-3 transition-colors focus-within:border-forest">
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
            className="press rounded-sm bg-forest px-7 py-3.5 text-[0.7rem] font-semibold tracking-[0.16em] text-forest-foreground uppercase transition-all hover:-translate-y-0.5 hover:bg-charcoal"
          >
            Subscribe
          </button>
        </form>
      </Reveal>
    </section>
  );
}
