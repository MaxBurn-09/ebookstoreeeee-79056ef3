import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Truck, RotateCcw, ShieldCheck, Headphones, Mail, Star } from "lucide-react";
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
  publishers,
  testimonials,
  formatPrice,
} from "@/data/catalog";
import { BookCard } from "@/components/site/BookCard";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Stars } from "@/components/site/Stars";
import { Reveal } from "@/components/site/Reveal";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Page & Pine — Premium Books, Delivered Beautifully" },
      {
        name: "description",
        content:
          "A premium independent bookshop: curated fiction, non-fiction and classics. Free shipping over ₹999, 7-day returns and hand-picked recommendations.",
      },
      { property: "og:title", content: "Page & Pine — Premium Books, Delivered Beautifully" },
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

const btnPrimary =
  "inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-[0.72rem] font-semibold tracking-[0.14em] text-primary-foreground uppercase shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated";
const btnAccent =
  "inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[0.72rem] font-semibold tracking-[0.14em] text-accent-foreground uppercase transition-all hover:-translate-y-0.5 hover:bg-accent/90";
const btnGhost =
  "inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-[0.72rem] font-semibold tracking-[0.14em] uppercase transition-colors hover:border-accent hover:text-accent";

function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <Categories />
      <Bestsellers />
      <FlashSale />
      <NewArrivals />
      <BookOfTheMonth />
      <Publishers />
      <Authors />
      <Testimonials />
      <Promo />
      <Newsletter />
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 70]);

  return (
    <section ref={ref} className="bg-hero-gradient relative overflow-hidden">
      <div className="container-page grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow"
          >
            Independent since 2014
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-4xl leading-[1.05] font-semibold md:text-6xl"
          >
            Find the book
            <br />
            you&apos;ll reread
            <br />
            <span className="text-gradient-accent">for years.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground"
          >
            A small shop with a big table in the middle. Every title on these shelves has been read,
            argued over and recommended by someone on our team.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link to="/books" className={btnPrimary}>
              Shop all books <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/bestsellers" className={btnGhost}>
              Bestsellers
            </Link>
          </motion.div>
          <dl className="mt-14 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
            {[
              ["12k+", "Titles"],
              ["48k", "Orders"],
              ["4.8★", "Rating"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-display text-2xl font-semibold">{v}</dt>
                <dd className="text-[0.62rem] tracking-[0.18em] text-muted-foreground uppercase">
                  {l}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <motion.div style={{ y }} className="relative">
          <img
            src={heroBooks}
            alt="A stack of hardcover books on a soft neutral backdrop"
            className="w-full rounded-3xl object-cover shadow-elevated"
            width={1024}
            height={1024}
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="surface-glass absolute bottom-6 left-6 hidden rounded-2xl p-4 shadow-soft sm:block"
          >
            <p className="text-[0.6rem] tracking-[0.18em] text-muted-foreground uppercase">
              Staff pick
            </p>
            <p className="mt-1 font-display text-lg font-semibold">{bookOfTheMonth.title}</p>
            <div className="mt-1 flex items-center gap-2">
              <Stars rating={bookOfTheMonth.rating} />
              <span className="text-xs text-muted-foreground">
                {formatPrice(bookOfTheMonth.price)}
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="surface-glass absolute top-6 right-6 hidden rounded-2xl px-4 py-3 shadow-soft md:block"
          >
            <p className="text-[0.6rem] tracking-[0.18em] text-muted-foreground uppercase">
              Free shipping
            </p>
            <p className="mt-1 text-sm font-semibold">On orders over ₹999</p>
          </motion.div>
        </motion.div>
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
    <section className="border-y border-border bg-secondary">
      <div className="container-page grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, note }, i) => (
          <Reveal key={title} delay={i * 0.06}>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">{title}</p>
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
    <section className="container-page py-20">
      <SectionHeader
        eyebrow="Browse by mood"
        title="Shop by category"
        subtitle="Six shelves, endlessly restocked."
        linkLabel="All categories"
        linkTo="/categories"
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.05}>
            <Link
              to="/books"
              search={{ category: c.name, q: undefined }}
              className="group relative block overflow-hidden rounded-3xl border border-border shadow-soft transition-shadow hover:shadow-elevated"
            >
              <img
                src={c.image}
                alt={`${c.name} books`}
                loading="lazy"
                className="h-60 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent" />
              <div className="absolute bottom-5 left-6 text-primary-foreground">
                <p className="text-[0.6rem] tracking-[0.2em] uppercase opacity-80">{c.tagline}</p>
                <h3 className="mt-1 font-display text-2xl font-semibold">{c.name}</h3>
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
    <section className="bg-secondary py-20">
      <div className="container-page">
        <SectionHeader
          eyebrow="Reader favourites"
          title="Bestsellers this season"
          subtitle="What's leaving our shelves fastest."
          linkLabel="View all"
          linkTo="/bestsellers"
        />
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
          {bestsellers.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.04}>
              <BookCard book={b} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function useCountdown(hoursAhead: number) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const end = Date.now() + hoursAhead * 3600_000;
    const tick = () => setLeft(Math.max(0, end - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [hoursAhead]);
  return left;
}

function FlashSale() {
  const left = useCountdown(11.5);
  const parts = useMemo(() => {
    if (left === null) return null;
    const s = Math.floor(left / 1000);
    return [
      ["Hrs", String(Math.floor(s / 3600)).padStart(2, "0")],
      ["Min", String(Math.floor((s % 3600) / 60)).padStart(2, "0")],
      ["Sec", String(s % 60).padStart(2, "0")],
    ] as const;
  }, [left]);

  const deal = bestsellers[0];

  return (
    <section className="container-page py-20">
      <Reveal>
        <div className="grid items-center gap-10 overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground shadow-elevated lg:grid-cols-[1.2fr_1fr] lg:p-14">
          <div>
            <p className="text-[0.62rem] tracking-[0.24em] text-accent-foreground/80 uppercase">
              <span className="rounded-full bg-accent px-3 py-1">Flash sale</span>
            </p>
            <h2 className="mt-5 font-display text-3xl font-semibold md:text-4xl">
              Up to 40% off hardcovers
            </h2>
            <p className="mt-3 max-w-md text-sm opacity-80">
              A short window on our most-loved editions. When the timer stops, prices go back.
            </p>
            <div className="mt-8 flex gap-3" aria-live="polite">
              {(parts ?? [["Hrs", "--"], ["Min", "--"], ["Sec", "--"]]).map(([label, value]) => (
                <div
                  key={label}
                  className="w-20 rounded-2xl bg-primary-foreground/10 py-3 text-center"
                >
                  <p className="font-display text-2xl font-semibold tabular-nums">{value}</p>
                  <p className="text-[0.58rem] tracking-[0.2em] uppercase opacity-70">{label}</p>
                </div>
              ))}
            </div>
            <Link to="/bestsellers" className={`${btnAccent} mt-8`}>
              Shop the sale <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {deal ? (
            <Link
              to="/book/$slug"
              params={{ slug: deal.slug }}
              className="group flex items-center gap-5 rounded-3xl bg-primary-foreground/8 p-5 backdrop-blur"
            >
              <img
                src={deal.cover}
                alt={deal.title}
                loading="lazy"
                className="h-40 w-28 rounded-xl object-cover shadow-elevated transition-transform duration-500 group-hover:-translate-y-1"
              />
              <div>
                <p className="text-[0.6rem] tracking-[0.2em] uppercase opacity-70">Deal of the day</p>
                <p className="mt-2 font-display text-xl font-semibold">{deal.title}</p>
                <p className="text-sm opacity-75">by {deal.author}</p>
                <p className="mt-3 font-display text-lg font-semibold">
                  {formatPrice(deal.price)}
                  {deal.oldPrice ? (
                    <span className="ml-2 text-sm line-through opacity-60">
                      {formatPrice(deal.oldPrice)}
                    </span>
                  ) : null}
                </p>
              </div>
            </Link>
          ) : null}
        </div>
      </Reveal>
    </section>
  );
}

function NewArrivals() {
  const [filter, setFilter] = useState<string>("All");
  const shown = newArrivals.filter((b) => filter === "All" || b.category === filter);

  return (
    <section className="container-page pb-20">
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
            aria-pressed={filter === f}
            className={`rounded-full border px-4 py-2 text-[0.66rem] font-semibold tracking-[0.14em] uppercase transition-colors ${
              filter === f
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border text-muted-foreground hover:border-accent hover:text-accent"
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
          {shown.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.04}>
              <BookCard book={b} />
            </Reveal>
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
      <div className="container-page grid items-center gap-12 py-20 lg:grid-cols-2">
        <Reveal>
          <img
            src={editorial}
            alt={`Editorial photograph of ${book.title}`}
            loading="lazy"
            className="w-full rounded-3xl object-cover shadow-elevated"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[0.62rem] tracking-[0.24em] uppercase opacity-70">Book of the month</p>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">{book.title}</h2>
          <p className="mt-3 text-sm opacity-80">by {book.author}</p>
          <p className="mt-6 max-w-md text-sm leading-relaxed opacity-85">{book.blurb}</p>
          <p className="mt-6 font-display text-2xl font-semibold">
            {formatPrice(book.price)}
            {book.oldPrice ? (
              <span className="ml-3 text-sm line-through opacity-60">
                {formatPrice(book.oldPrice)}
              </span>
            ) : null}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={() => addToCart(book.id)} className={btnAccent}>
              Add to cart
            </button>
            <Link
              to="/book/$slug"
              params={{ slug: book.slug }}
              className="inline-flex items-center gap-2 rounded-full border border-forest-foreground/35 px-7 py-3.5 text-[0.72rem] font-semibold tracking-[0.14em] uppercase transition-colors hover:bg-forest-foreground/10"
            >
              Read more
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Publishers() {
  return (
    <section className="border-b border-border bg-secondary py-14">
      <div className="container-page">
        <p className="text-center text-[0.62rem] tracking-[0.22em] text-muted-foreground uppercase">
          Stocked from the houses we trust
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {publishers.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.04}>
              <div className="rounded-2xl border border-border bg-card px-4 py-6 text-center transition-colors hover:border-accent/50">
                <p className="font-display text-base font-semibold">{p.name}</p>
                <p className="mt-1 text-[0.62rem] tracking-[0.14em] text-muted-foreground uppercase">
                  {p.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Authors() {
  return (
    <section className="container-page py-20">
      <SectionHeader
        eyebrow="In conversation"
        title="Authors we love"
        linkLabel="All authors"
        linkTo="/authors"
      />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {authors.map((a, i) => (
          <Reveal key={a.slug} delay={i * 0.06}>
            <article className="rounded-3xl border border-border bg-card p-8 text-center shadow-soft transition-transform hover:-translate-y-1">
              <img
                src={a.portrait}
                alt={`Portrait of ${a.name}`}
                loading="lazy"
                className="mx-auto h-32 w-32 rounded-full object-cover"
              />
              <h3 className="mt-5 font-display text-xl font-semibold">{a.name}</h3>
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

function Testimonials() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);
  const t = testimonials[index]!;

  return (
    <section className="bg-secondary py-20">
      <div className="container-page max-w-3xl text-center">
        <p className="eyebrow">Kind words</p>
        <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
          Loved by 48,000 readers
        </h2>
        <motion.blockquote
          key={index}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10 rounded-3xl border border-border bg-card p-10 shadow-soft"
        >
          <div className="flex justify-center gap-1 text-accent">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <p className="mt-6 font-display text-lg leading-relaxed font-medium">“{t.quote}”</p>
          <footer className="mt-6 text-sm text-muted-foreground">
            {t.name} · {t.city}
          </footer>
        </motion.blockquote>
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((item, i) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Show review from ${item.name}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-8 bg-accent" : "w-2 bg-border hover:bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Promo() {
  return (
    <section className="container-page py-20">
      <Reveal>
        <div className="grid items-center gap-0 overflow-hidden rounded-3xl border border-border shadow-soft lg:grid-cols-2">
          <img
            src={promo}
            alt="A reader with a book and coffee in a quiet bookshop corner"
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="bg-card p-10 lg:p-14">
            <p className="eyebrow">Members read more</p>
            <h2 className="mt-4 font-display text-3xl font-semibold md:text-4xl">
              Join the Pine Circle
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Ten percent off every order, early access to signed editions and one handwritten
              recommendation a month from a bookseller who knows your shelf.
            </p>
            <Link to="/about" className={`${btnPrimary} mt-8`}>
              Learn more <ArrowRight className="h-4 w-4" />
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
    <section className="border-t border-border bg-background py-20">
      <div className="container-page max-w-2xl text-center">
        <p className="eyebrow">Letters from the shop</p>
        <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
          One good book, every Friday
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          No spam, no algorithms — just a short note about what we&apos;re reading.
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
          <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-5 py-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
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
          <button type="submit" className={btnPrimary}>
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
