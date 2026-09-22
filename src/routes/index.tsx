import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Baby,
  Coins,
  Download,
  Dumbbell,
  HeartHandshake,
  Infinity as InfinityIcon,
  Quote,
  Search,
  ShieldCheck,
  Smartphone,
  Sprout,
  Star,
} from "lucide-react";
import {
  books,
  mostPopular,
  categories,
  testimonials,
  storeConfig,
} from "@/data/catalog";
import { BookCard } from "@/components/site/BookCard";
import { Reveal } from "@/components/site/Reveal";
import { CountUp, Parallax, Tilt } from "@/components/site/Motion";
import { cn } from "@/lib/utils";
import { organizationLd, pageHead, websiteLd } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Learn Today. Grow Tomorrow. | Future Grow Academy eBooks",
      description:
        "Practical eBooks on self-care, money, relationships, health and parenting. Instant PDF download, lifetime access, every title just $2.97.",
      path: "/",
      jsonLd: [organizationLd, websiteLd],
    }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CategoryBand />
      <StoryBand />
      <BestSelling />
      <OfferBanner />
      <Founder />
      <Reviews />
      <Newsletter />
    </>
  );
}

/* ------------------------------------------------------------------ hero */

function Hero() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const stack = [books[11], books[0], books[4]].filter(Boolean) as typeof books;

  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="container-page grid items-center gap-x-10 gap-y-6 py-8 sm:py-12 lg:min-h-[calc(100svh-6rem)] lg:grid-cols-[0.92fr_1.08fr] lg:grid-rows-[auto_auto_auto] lg:gap-y-7 lg:py-16">
        <Reveal className="order-1 max-w-xl lg:self-end">
          <p className="eyebrow">Digital books for a brighter you</p>

          <h1 className="mt-4 font-display text-[2.75rem] leading-[0.98] font-medium sm:text-6xl lg:text-[4.45rem]">
            Learn Today
            <span className="block">
              <span className="text-brand">Grow</span> Tomorrow
            </span>
          </h1>
        </Reveal>

        <Reveal delay={120} className="relative order-4 mt-2 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:mt-0">
          <div
            aria-hidden
            className="glow-breathe absolute top-1/2 left-1/2 -z-10 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[30rem] sm:w-[30rem] lg:h-[38rem] lg:w-[38rem]"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--brand-amber) 52%, transparent) 0%, color-mix(in oklab, var(--brand-orange) 24%, transparent) 42%, transparent 69%)",
            }}
          />
          <Parallax speed={0.045}>
            <Tilt max={5} className="mx-auto max-w-[28rem] sm:max-w-[32rem]">
              <div className="flex items-end justify-center gap-2.5 sm:gap-5">
                {stack.map((book, i) => (
                  <Link
                    key={book.id}
                    to="/book/$slug"
                    params={{ slug: book.slug }}
                    preload="intent"
                    className={cn(
                      "cover-plate block w-[25%] shrink-0 transition-all duration-500 hover:-translate-y-3",
                      i === 1 ? "w-[40%] -translate-y-3 sm:-translate-y-6" : "translate-y-3 opacity-95",
                      i === 0 && "-rotate-3",
                      i === 2 && "rotate-3",
                    )}
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
            </Tilt>
          </Parallax>

          <p className="mt-5 text-center text-[0.62rem] tracking-[0.14em] text-muted-foreground uppercase sm:mt-8 sm:text-xs">
            Instant PDF download · Lifetime access
          </p>
        </Reveal>

        <Reveal delay={70} className="order-2 max-w-xl lg:self-start">
          <p className="max-w-md text-[0.94rem] leading-relaxed text-muted-foreground">
            Discover practical eBooks on self-care, money, relationships, health and parenting.
            Read anytime, anywhere, and take a step towards a better tomorrow.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:items-center">
            <Link
              to="/books"
              className="press inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-12px_var(--brand-red)]"
            >
              Browse Books <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/blog"
              className="press inline-flex h-12 items-center justify-center rounded-full border border-border bg-card px-6 text-center text-sm font-semibold hover:border-foreground/25"
            >
              Read Free Articles
            </Link>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/books", search: { q: q || undefined, category: undefined } });
            }}
            className="mt-5 flex h-13 max-w-md items-center gap-2 rounded-full border border-border bg-card pr-1.5 pl-4 shadow-[var(--shadow-card)] transition-colors focus-within:border-foreground/25"
          >
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            <label htmlFor="hero-search" className="sr-only">
              Search books
            </label>
            <input
              id="hero-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search books, topics or authors..."
              className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              aria-label="Search"
              className="press grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-white"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

        </Reveal>

        <Reveal delay={120} className="order-3 max-w-md lg:self-start">
          <dl className="grid grid-cols-3 gap-3 border-t border-border pt-5 sm:gap-4 sm:pt-7">
            <Stat label="Happy readers">
              <CountUp value={6000} suffix="+" />
            </Stat>
            <Stat label="eBooks available">
              <CountUp value={books.length} />
            </Stat>
            <Stat label="Categories">
              <CountUp value={categories.length} />
            </Stat>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dd className="font-display text-xl font-medium sm:text-[1.75rem]">{children}</dd>
      <dt className="mt-1 text-[0.62rem] leading-snug tracking-[0.08em] text-muted-foreground uppercase sm:text-[0.72rem]">
        {label}
      </dt>
    </div>
  );
}

/* ----------------------------------------------------------- trust strip */

const trust = [
  { icon: Download, title: "Instant Download", note: "Get your eBooks immediately" },
  { icon: InfinityIcon, title: "Lifetime Access", note: "Read anytime, anywhere" },
  { icon: ShieldCheck, title: "Secure Checkout", note: "Your information is safe" },
  { icon: Smartphone, title: "Mobile Friendly", note: "Read on any device" },
];

function TrustStrip() {
  return (
    <section aria-label="Why buy here" className="border-b border-border bg-card">
      <ul className="container-page grid gap-x-6 gap-y-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {trust.map((t, i) => (
          <Reveal key={t.title} as="li" delay={i * 70} className="group flex items-center gap-3.5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[color-mix(in_oklab,var(--brand-orange)_12%,transparent)] text-[var(--brand-red)] transition-transform duration-300 group-hover:-translate-y-0.5">
              <t.icon className="h-5 w-5" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block text-[0.88rem] font-semibold">{t.title}</span>
              <span className="block text-[0.78rem] text-muted-foreground">{t.note}</span>
            </span>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/* ---------------------------------------------------------- section head */

function Head({
  title,
  to,
  cta,
  note,
}: {
  title: string;
  to?: "/books" | "/categories" | "/blog";
  cta?: string;
  note?: string;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
      <div className="min-w-0">
        <h2 className="font-display text-[1.65rem] font-medium tracking-[-0.01em] sm:text-[2.1rem]">
          {title}
        </h2>
        {note ? <p className="mt-2 max-w-xl text-sm text-muted-foreground">{note}</p> : null}
      </div>
      {to ? (
        <Link
          to={to}
          className="group inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-[var(--brand-red)]"
        >
          {cta ?? "View All"}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------ categories */

const categoryIcons: Record<string, typeof Sprout> = {
  "self-care": Sprout,
  money: Coins,
  relationship: HeartHandshake,
  health: Dumbbell,
  parenting: Baby,
};

function CategoryBand() {
  return (
    <section className="section-y">
      <div className="container-page">
        <Head title="Explore Our Categories" to="/categories" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((c, i) => {
            const Icon = categoryIcons[c.slug] ?? Sprout;
            const count = books.filter((b) => b.category === c.name).length;
            return (
              <Reveal key={c.slug} delay={i * 60}>
                <Link
                  to="/books"
                  search={{ q: undefined, category: c.slug }}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_24px_50px_-24px_rgba(11,22,51,0.35)]"
                >
                  <span
                    className="grid aspect-[4/3] place-items-center"
                    style={{
                      background:
                        "linear-gradient(160deg, color-mix(in oklab, var(--brand-amber) 16%, var(--card)) 0%, color-mix(in oklab, var(--brand-orange) 9%, var(--card)) 100%)",
                    }}
                  >
                    <Icon
                      className="h-11 w-11 text-[var(--brand-red)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[6deg]"
                      strokeWidth={1.25}
                      aria-hidden
                    />
                  </span>
                  <span className="flex flex-1 items-end justify-between gap-3 p-4">
                    <span>
                      <span className="block text-[0.92rem] font-semibold">{c.name}</span>
                      <span className="mt-1 block text-[0.75rem] text-muted-foreground">
                        {c.tagline}
                      </span>
                    </span>
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-[var(--brand-red)] transition-colors group-hover:bg-brand group-hover:text-white">
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
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

/* ----------------------------------------------------------- story band */

function StoryBand() {
  const steps = ["Learn", "Grow", "Evolve"];
  return (
    <section className="relative overflow-hidden border-y border-border bg-foreground text-background">
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(120% 90% at 78% 40%, color-mix(in oklab, var(--brand-orange) 45%, transparent) 0%, transparent 60%), radial-gradient(90% 80% at 15% 90%, color-mix(in oklab, var(--brand-crimson) 40%, transparent) 0%, transparent 65%)",
        }}
      />
      <div className="relative container-page grid items-center gap-12 py-16 lg:grid-cols-[1fr_1.1fr_auto] lg:gap-10 lg:py-24">
        <Reveal>
          <p className="text-[0.7rem] tracking-[0.22em] text-background/60 uppercase">
            Knowledge creates real change
          </p>
          <h2 className="mt-5 font-display text-[2.2rem] leading-[1.08] font-medium sm:text-[2.9rem]">
            More Than
            <br />
            Just Books
          </h2>
          <p className="mt-5 max-w-sm text-[0.92rem] leading-relaxed text-background/75">
            {storeConfig.name} is built to help you learn, grow and evolve with practical knowledge
            you can apply in real life.
          </p>
          <Link
            to="/about"
            className="press mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white"
          >
            Our Story <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <Reveal delay={120} className="flex justify-center">
          <Parallax speed={0.06}>
            <div className="[perspective:1400px]">
              <div className="float-slow grid w-[min(30rem,82vw)] grid-cols-2 rounded-md bg-[#f6f1e7] text-foreground shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] [transform:rotateX(14deg)_rotateZ(-2deg)] [transform-style:preserve-3d]">
                <div className="border-r border-black/10 p-7 [transform:rotateY(6deg)] [transform-origin:right]">
                  <div className="space-y-2" aria-hidden>
                    {[92, 100, 84, 96, 70, 100, 88].map((w, i) => (
                      <span
                        key={i}
                        className="block h-1.5 rounded-full bg-foreground/10"
                        style={{ width: `${w}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="grid place-items-center p-7 [transform:rotateY(-6deg)] [transform-origin:left]">
                  <p className="text-center font-display text-xl leading-snug font-medium sm:text-2xl">
                    A Brighter You
                    <br />
                    <span className="text-brand">Starts Here</span>
                  </p>
                </div>
              </div>
            </div>
          </Parallax>
        </Reveal>

        <Reveal delay={200} as="ul" className="flex gap-8 lg:flex-col lg:gap-10">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-3">
              <span className="h-px w-8 bg-background/35 lg:w-10" aria-hidden />
              <span className="font-display text-lg font-medium sm:text-2xl">{s}</span>
              <span className="sr-only">step {i + 1}</span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- best selling */

function BestSelling() {
  return (
    <section className="section-y">
      <div className="container-page">
        <Head title="Best Selling eBooks" to="/books" />
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
          {mostPopular.slice(0, 5).map((book, i) => (
            <Reveal key={book.id} delay={i * 60}>
              <BookCard book={book} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- offer banner */

function OfferBanner() {
  return (
    <section className="container-page pb-4 [overflow-x:clip]">
      <Reveal>
        <div className="glow-breathe relative overflow-hidden rounded-3xl bg-brand px-7 py-10 text-white sm:px-12 sm:py-12">
          <div
            aria-hidden
            className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-background/10 blur-2xl"
          />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_auto]">
            <div>
              <p className="text-[0.7rem] tracking-[0.22em] text-white/75 uppercase">
                Limited time offer
              </p>
              <h2 className="mt-4 font-display text-[2.1rem] leading-[1.1] font-medium sm:text-[2.8rem]">
                Get 80% OFF
                <br />
                On Every eBook
              </h2>
              <p className="mt-4 text-sm text-white/85">
                Every title $2.97 instead of $7.50 · instant PDF download
              </p>
              <Link
                to="/books"
                className="press mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-[var(--brand-crimson)]"
              >
                Shop All Deals <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="hidden justify-end lg:flex">
              <div className="float-slow relative w-40 rotate-3">
                <div className="cover-plate">
                  <img
                    src={books[0]!.cover}
                    alt=""
                    loading="lazy"
                    className="aspect-[2/3] w-full object-cover"
                  />
                </div>
                <span className="absolute -top-5 -right-5 grid h-16 w-16 place-items-center rounded-full bg-white text-center text-[0.72rem] leading-tight font-bold text-[var(--brand-crimson)]">
                  80%
                  <br />
                  OFF
                </span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------- founder */

function Founder() {
  return (
    <section className="section-y">
      <div className="container-page grid items-center gap-10 rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)] sm:p-12 lg:grid-cols-[auto_1fr_auto]">
        <Reveal className="flex justify-center">
          <span
            className="grid h-32 w-32 place-items-center rounded-2xl font-display text-4xl font-medium text-white"
            style={{ background: "var(--gradient-brand)" }}
            aria-hidden
          >
            AS
          </span>
        </Reveal>
        <Reveal delay={90}>
          <blockquote className="font-display text-[1.3rem] leading-[1.5] font-medium sm:text-[1.55rem]">
            “Knowledge has the power to transform lives. My mission is to make practical learning
            accessible to everyone, everywhere.”
          </blockquote>
          <p className="mt-6 text-[0.92rem] font-semibold">Dr. Ankit Sharma</p>
          <p className="text-[0.8rem] text-muted-foreground">Founder, {storeConfig.name}</p>
        </Reveal>
        <Reveal delay={160} className="hidden text-right lg:block">
          <p className="font-display text-[1.4rem] leading-tight text-brand italic">
            A Brighter
            <br />
            Tomorrow
          </p>
          <p className="mt-6 font-display text-lg italic">Dr. Ankit Sharma</p>
          <span className="mt-2 block h-px w-40 bg-foreground/25" aria-hidden />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- reviews */

function Reviews() {
  return (
    <section className="pb-14 sm:pb-20">
      <div className="container-page">
    <section className="pb-14 sm:pb-20">
      <div className="container-page">
        <Head title="What Our Readers Say" to="/books" cta="Browse eBooks" />
      </div>
      <ReviewWall />
    </section>
  );
}

/* ---------------------------------------------------------- newsletter */

function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="container-page pb-16 sm:pb-24">
      <Reveal>
        <div className="grid items-center gap-6 rounded-3xl bg-brand px-7 py-10 text-white sm:px-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-[1.7rem] font-medium sm:text-[2.1rem]">
              Join Our Newsletter
            </h2>
            <p className="mt-3 max-w-md text-sm text-white/85">
              Get the latest book releases, exclusive offers and life-changing tips.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
            className="flex h-14 items-center gap-2 rounded-full bg-white pr-2 pl-5 lg:justify-self-end lg:w-full"
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
              placeholder="Enter your email address..."
              className="h-full min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              disabled={done}
              aria-label="Subscribe"
              className="press grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-white disabled:opacity-60"
            >
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>
          {done ? (
            <p className="text-xs text-white/90 lg:col-span-2">Thanks — you're on the list.</p>
          ) : null}
        </div>
      </Reveal>
    </section>
  );
}
