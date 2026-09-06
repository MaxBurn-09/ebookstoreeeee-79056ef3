import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Download, Smartphone, BadgeCheck, Wallet } from "lucide-react";
import heroBooks from "@/assets/hero-books.jpg";
import promo from "@/assets/promo-reading.jpg";
import {
  books,
  bestsellers,
  newArrivals,
  newArrivalFilters,
  categories,
  benefits,
  whyUs,
  testimonials,
  bookOfTheMonth,
  storeConfig,
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
      { title: "Future Grow Academy — Premium Self-Growth eBooks, Instant Download" },
      {
        name: "description",
        content:
          "Download premium ebooks on mindset, money, relationships, parenting and health. Instant PDF delivery worldwide, no shipping, just $2.97 each.",
      },
      {
        property: "og:title",
        content: "Future Grow Academy — Premium Self-Growth eBooks, Instant Download",
      },
      {
        property: "og:description",
        content:
          "Premium ebooks for real life change. Instant PDF download, readable on any device, worldwide.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Store",
          name: storeConfig.name,
          description: storeConfig.tagline,
          email: storeConfig.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: "134, Sector 105",
            addressLocality: "Gurgaon",
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
          "100% digital — no shipping charges",
          "Instant PDF download",
          "Readable on phone, tablet and laptop",
          "Loved by readers in the USA, UK, Europe and India",
          "80% off every ebook",
        ]}
      />
      <Benefits />
      <Categories />
      <Bestsellers />
      <NewArrivals />
      <FeaturedRead />
      <WhyUs />
      <Testimonials />
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
      <div className="container-page relative grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="eyebrow reveal" style={{ animationDelay: "80ms" }}>
            {storeConfig.offer.label} · {storeConfig.offer.headline}
          </p>
          <h1 className="mt-4 text-3xl leading-[1.05] sm:text-4xl md:text-6xl">
            {["Transform your future", "with powerful"].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <span className="reveal block" style={{ animationDelay: `${160 + i * 120}ms` }}>
                  {line}
                </span>
              </span>
            ))}
            <span className="block overflow-hidden">
              <span
                className="reveal text-gold-shimmer block italic"
                style={{ animationDelay: "400ms" }}
              >
                eBooks.
              </span>
            </span>
          </h1>
          <p
            className="reveal mt-6 max-w-md text-sm leading-relaxed text-muted-foreground"
            style={{ animationDelay: "520ms" }}
          >
            {storeConfig.heroSubtitle}
          </p>
          <div className="reveal mt-8 flex flex-wrap gap-3" style={{ animationDelay: "620ms" }}>
            <Link
              to="/books"
              className="press group inline-flex items-center gap-2 overflow-hidden rounded-sm bg-forest px-7 py-3.5 text-[0.7rem] font-semibold tracking-[0.16em] text-forest-foreground uppercase shadow-lg shadow-forest/20 transition-all hover:bg-charcoal hover:shadow-xl hover:shadow-forest/30"
            >
              Shop all ebooks
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
            <Link
              to="/bestsellers"
              className="press inline-flex items-center gap-2 rounded-sm border border-forest px-7 py-3.5 text-[0.7rem] font-semibold tracking-[0.16em] text-forest uppercase transition-colors hover:bg-forest hover:text-forest-foreground"
            >
              Bestsellers
            </Link>
          </div>
          <dl
            className="reveal mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-taupe pt-6"
            style={{ animationDelay: "720ms" }}
          >
            <div>
              <dt className="font-serif text-2xl">
                <CountUp value={books.length} suffix="" />
              </dt>
              <dd className="text-[0.62rem] tracking-[0.18em] text-muted-foreground uppercase">
                eBooks
              </dd>
            </div>
            <div>
              <dt className="font-serif text-2xl">
                <CountUp value={9} suffix="k+" />
              </dt>
              <dd className="text-[0.62rem] tracking-[0.18em] text-muted-foreground uppercase">
                Readers
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
                alt="Premium self-growth ebooks displayed on a warm cream backdrop"
                className="w-full rounded-lg object-cover shadow-2xl"
                width={1024}
                height={1024}
              />
            </div>
            <div className="float-slow absolute bottom-5 left-5 hidden rounded-md bg-background/95 p-4 shadow-md backdrop-blur sm:block">
              <p className="text-[0.6rem] tracking-[0.18em] text-muted-foreground uppercase">
                Reader favourite
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

const benefitIcons = [Wallet, Download, BadgeCheck, Smartphone];

function Benefits() {
  return (
    <section className="border-b border-border bg-background">
      <div className="container-page grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((b, i) => {
          const Icon = benefitIcons[i] ?? Download;
          return (
            <Reveal key={b.title} delay={i * 90}>
              <div className="group flex items-center gap-3">
                <Icon className="h-6 w-6 shrink-0 text-forest transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110 group-hover:text-gold" />
                <div>
                  <p className="text-sm font-medium">{b.title}</p>
                  <p className="text-xs text-muted-foreground">{b.note}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="container-page py-14 sm:py-16">
      <Reveal>
        <SectionHeader
          eyebrow="Find your focus"
          title="Shop by category"
          subtitle="Five growth shelves — pick where you want change first."
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
                src={c.cover}
                alt={`${c.name} ebooks`}
                loading="lazy"
                className="h-56 w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent transition-opacity duration-500 group-hover:from-forest/90" />
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
    <section className="bg-cream py-14 sm:py-16">
      <div className="container-page">
        <Reveal>
          <SectionHeader
            eyebrow="Reader favourites"
            title="Bestselling ebooks"
            subtitle="The titles downloaded most this month."
            linkLabel="View all"
            linkTo="/bestsellers"
          />
        </Reveal>
        <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-6">
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
    <section className="container-page py-14 sm:py-16">
      <Reveal>
        <SectionHeader
          eyebrow="Just published"
          title="New additions"
          linkLabel="See everything"
          linkTo="/new-arrivals"
        />
      </Reveal>
      <Reveal>
        <div className="mb-8 -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {newArrivalFilters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`press shrink-0 snap-start rounded-full border px-4 py-2 text-[0.66rem] font-semibold tracking-[0.14em] uppercase transition-all duration-300 ${
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
          Nothing new on this shelf yet — check back soon.
        </p>
      ) : (
        <div
          key={filter}
          className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-6"
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

function FeaturedRead() {
  const { addToCart } = useStore();
  const book = bookOfTheMonth;
  return (
    <section className="grain relative overflow-hidden bg-forest text-forest-foreground">
      <div
        aria-hidden
        className="float-slow pointer-events-none absolute top-1/3 -left-16 h-72 w-72 rounded-full bg-gold/15 blur-3xl"
      />
      <div className="container-page relative grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <Reveal>
          <Tilt max={6}>
            <div className="shine overflow-hidden rounded-lg">
              <img
                src={book.cover}
                alt={`Cover of ${book.title}`}
                loading="lazy"
                className="mx-auto w-full max-w-xs object-cover shadow-2xl transition-transform duration-[900ms] hover:scale-105"
              />
            </div>
          </Tilt>
        </Reveal>
        <Reveal delay={120}>
          <div>
            <p className="text-[0.62rem] tracking-[0.24em] uppercase opacity-70">
              Featured this month
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl">{book.title}</h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed opacity-85">{book.blurb}</p>
            <p className="mt-6 font-serif text-2xl">
              {formatPrice(book.price)}
              <span className="ml-3 text-sm line-through opacity-60">
                {formatPrice(book.oldPrice)}
              </span>
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

function WhyUs() {
  return (
    <section className="container-page py-14 sm:py-16">
      <Reveal>
        <SectionHeader eyebrow="Why readers choose us" title="Growth you can actually apply" />
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {whyUs.map((w, i) => (
          <Reveal key={w.title} delay={i * 90}>
            <div className="hover-lift h-full rounded-lg border border-border bg-cream p-6 transition-colors hover:border-forest">
              <span className="text-2xl">{w.emoji}</span>
              <h3 className="mt-4 font-serif text-xl">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.note}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-cream py-14 sm:py-16">
      <div className="container-page">
        <Reveal>
          <SectionHeader
            eyebrow="Loved worldwide"
            title="What readers say"
            subtitle="From New York to Berlin, Singapore to São Paulo."
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <figure className="hover-lift h-full rounded-lg border border-border bg-background p-6">
                <Stars rating={t.rating} />
                <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 text-sm font-medium">
                  {t.name}
                  <span className="block text-[0.62rem] tracking-[0.18em] text-muted-foreground uppercase">
                    {t.location}
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

function Promo() {
  return (
    <section className="container-page py-14 sm:py-16">
      <Reveal>
        <div className="grid items-center gap-0 overflow-hidden rounded-lg border border-border lg:grid-cols-2">
          <div className="shine h-full overflow-hidden">
            <img
              src={promo}
              alt="A reader studying an ebook on a tablet with a warm cup of coffee"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105"
            />
          </div>
          <div className="bg-cream p-8 sm:p-10 lg:p-14">
            <p className="eyebrow">{storeConfig.offer.label}</p>
            <h2 className="mt-4 text-3xl md:text-4xl">
              {storeConfig.offer.headline} {storeConfig.offer.sub}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              {storeConfig.offer.note}
            </p>
            <Link
              to="/books"
              className="press group mt-8 inline-flex items-center gap-2 rounded-sm bg-forest px-7 py-3.5 text-[0.7rem] font-semibold tracking-[0.16em] text-forest-foreground uppercase transition-all hover:-translate-y-0.5 hover:bg-charcoal"
            >
              Claim the offer
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
    <section className="border-t border-border bg-background py-14 sm:py-16">
      <Reveal className="container-page max-w-2xl text-center">
        <p className="eyebrow">Stay in the loop</p>
        <h2 className="mt-3 text-3xl md:text-4xl">New ebooks, straight to your inbox</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          One short email when we publish something new, plus reader-only discounts.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setEmail("");
            toast.success("You're on the list — check your inbox.");
          }}
          className="mt-7 flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            aria-label="Email address"
            className="flex-1 rounded-sm border border-border bg-card px-4 py-3 text-sm outline-none transition-all focus:border-forest"
          />
          <button
            type="submit"
            className="press rounded-sm bg-forest px-7 py-3 text-[0.7rem] font-semibold tracking-[0.16em] text-forest-foreground uppercase transition-colors hover:bg-charcoal"
          >
            Subscribe
          </button>
        </form>
      </Reveal>
    </section>
  );
}
