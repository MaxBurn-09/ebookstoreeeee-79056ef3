import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Baby,
  Coins,
  Download,
  Dumbbell,
  Gift,
  HeartHandshake,
  Infinity as InfinityIcon,
  Layers,
  Search,
  ShieldCheck,
  Smartphone,
  Sprout,
} from "lucide-react";
import {
  books,
  mostPopular,
  categories,
  bundles,
  bundleBooks,
  formatPrice,
} from "@/data/catalog";
import { useStore } from "@/lib/store";
import { BookCard } from "@/components/site/BookCard";
import { Bookshelf } from "@/components/site/Bookshelf";
import { Reveal } from "@/components/site/Reveal";
import { ReviewWall } from "@/components/site/ReviewWall";
import { CountUp, Parallax, Tilt } from "@/components/site/Motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { organizationLd, pageHead, websiteLd } from "@/lib/seo";
import logo from "@/assets/fga-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Learn Today. Grow Tomorrow. | Future Grow Academy eBooks",
      description:
        "Practical eBooks on self-care, money, relationships, health and parenting. Explore the complete ebook collection and curated bundles.",
      path: "/",
      image: "https://futuregrowacademy.co/covers/your-why-changes-everything.webp",
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
      <Bookshelf />
      <BestSelling />
      <BundleShowcase />
      <Reviews />
      <Newsletter />
    </>
  );
}

/* ------------------------------------------------------------------ hero */

function Hero() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [showDownloadNote, setShowDownloadNote] = useState(true);

  useEffect(() => {
    const updateDownloadNote = () => setShowDownloadNote(window.scrollY < 60);
    updateDownloadNote();
    window.addEventListener("scroll", updateDownloadNote, { passive: true });
    return () => window.removeEventListener("scroll", updateDownloadNote);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="container-page grid items-center gap-x-10 gap-y-6 py-8 sm:py-12 lg:min-h-[calc(100svh-6rem)] lg:grid-cols-[0.92fr_1.08fr] lg:grid-rows-[auto_auto_auto] lg:gap-y-7 lg:py-16">
        <Reveal className="order-1 max-w-xl lg:self-end">
          <p className="eyebrow normal-case tracking-normal text-sm">Digital books for a brighter you</p>

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
              <AutoBookStack />
            </Tilt>
          </Parallax>

          <p
            className={cn(
              "mt-5 text-center text-xs tracking-wide text-muted-foreground sm:mt-8 motion-safe:transition-opacity motion-safe:duration-300",
              !showDownloadNote && "opacity-0",
            )}
          >
            Instant PDF download · Lifetime access
          </p>
        </Reveal>

        <Reveal delay={70} className="order-2 max-w-xl lg:self-start">
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
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
            className="mt-9 flex h-13 max-w-md items-center gap-2 rounded-full border border-border bg-card pr-1.5 pl-4 shadow-[var(--shadow-card)] transition-colors focus-within:border-foreground/25"
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
              className="press grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-card text-foreground hover:border-foreground/25"
            >
              <Search className="h-4 w-4" />
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

function AutoBookStack() {
  const [activeIndex, setActiveIndex] = useState(11);
  const [paused, setPaused] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const didSwipe = useRef(false);

  const move = (direction: 1 | -1) => {
    setActiveIndex((current) => (current + direction + books.length) % books.length);
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduceMotion || books.length < 4) return;

    const timer = window.setInterval(() => move(1), 3800);
    return () => window.clearInterval(timer);
  }, [paused]);

  const stack = Array.from({ length: Math.min(3, books.length) }, (_, offset) =>
    books[(activeIndex + offset) % books.length],
  ).filter((book) => book !== undefined);

  return (
    <div
      className="touch-pan-y select-none"
      aria-label="Featured ebooks carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onPointerDown={(event) => {
        pointerStart.current = event.clientX;
        didSwipe.current = false;
        setPaused(true);
      }}
      onPointerUp={(event) => {
        if (pointerStart.current === null) return;
        const distance = event.clientX - pointerStart.current;
        pointerStart.current = null;
        if (Math.abs(distance) < 42) {
          setPaused(false);
          return;
        }
        didSwipe.current = true;
        move(distance < 0 ? 1 : -1);
        window.setTimeout(() => setPaused(false), 900);
      }}
      onPointerCancel={() => {
        pointerStart.current = null;
        setPaused(false);
      }}
      onClickCapture={(event) => {
        if (!didSwipe.current) return;
        event.preventDefault();
        event.stopPropagation();
        didSwipe.current = false;
      }}
    >
      <div
        key={activeIndex}
        className="book-stack-enter flex min-h-[min(63vw,30rem)] items-end justify-center gap-2.5 sm:min-h-[30rem] sm:gap-5"
      >
        {stack.map((book, i) => (
          <Link
            key={book.id}
            to="/book/$slug"
            params={{ slug: book.slug }}
            preload="intent"
            draggable={false}
            className={cn(
               "cover-plate block w-[25%] shrink-0 transition-[transform,opacity,box-shadow] duration-500 ease-out hover:-translate-y-3",
              i === 1 ? "w-[33%] -translate-y-3 sm:-translate-y-5" : "translate-y-3 opacity-95",
              i === 0 && "-rotate-3",
              i === 2 && "rotate-3",
            )}
          >
            <img
              src={book.cover}
              alt={`${book.title} ebook cover`}
              width={640}
              height={960}
              draggable={false}
              className="aspect-[2/3] w-full object-cover"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dd className="font-display text-xl font-medium sm:text-3xl">{children}</dd>
      <dt className="mt-1 text-xs leading-snug tracking-wide text-muted-foreground">
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
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-accent text-primary transition-transform duration-300 group-hover:-translate-y-0.5">
              <t.icon className="h-5 w-5" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold">{t.title}</span>
              <span className="block text-xs text-muted-foreground">{t.note}</span>
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
        <h2 className="font-display text-3xl font-medium sm:text-4xl">
          {title}
        </h2>
        {note ? <p className="mt-2 max-w-xl text-sm text-muted-foreground">{note}</p> : null}
      </div>
      {to ? (
        <Link
          to={to}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
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
            const picks = books.filter((b) => b.category === c.name).slice(0, 2);
            return (
              <Reveal key={c.slug} delay={i * 60}>
                <Link
                  to="/books"
                  search={{ q: undefined, category: c.slug }}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-500 hover:-translate-y-3 hover:shadow-[var(--shadow-raised)]"
                >
                  <span
                    className="relative block aspect-[4/3] overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(160deg, color-mix(in oklab, var(--brand-amber) 16%, var(--card)) 0%, color-mix(in oklab, var(--brand-orange) 9%, var(--card)) 100%)",
                    }}
                  >
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-1/2"
                      style={{
                        background:
                          "radial-gradient(62% 95% at 50% 100%, color-mix(in oklab, var(--brand-amber) 24%, transparent) 0%, transparent 72%)",
                      }}
                    />
                    <span
                      aria-hidden
                      className="absolute inset-x-5 bottom-0 h-2.5 rounded-[50%] bg-foreground/10 blur-[3px]"
                    />
                    <span className="absolute inset-x-0 bottom-[-8px] flex items-end justify-center transition-transform duration-500 group-hover:-translate-y-1.5">
                      {picks.map((b, j) => (
                        <img
                          key={b.id}
                          src={b.cover}
                          alt=""
                          loading="lazy"
                          className={cn(
                            "relative w-[36%] rounded-[5px] shadow-[0_12px_26px_-12px_rgb(11_22_51/40%)]",
                            j === 1 ? "z-[3] -ml-[8%]" : "z-[2]",
                          )}
                          style={{
                            transform: `rotate(${j === 0 ? -6 : 6}deg) translateY(${j === 0 ? 4 : 0}px)`,
                          }}
                        />
                      ))}
                    </span>
                    <span className="absolute left-3 top-3 z-[4] grid h-8 w-8 place-items-center rounded-full border border-white/50 bg-card/80 shadow-gloss backdrop-blur-sm">
                      <Icon className="h-4 w-4 text-primary" strokeWidth={1.75} aria-hidden />
                    </span>
                  </span>
                  <span className="flex flex-1 items-end justify-between gap-3 p-4">
                    <span>
                      <span className="block text-base font-semibold">{c.name}</span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {c.tagline}
                      </span>
                    </span>
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
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

/* ------------------------------------------------------- bundle showcase */

function BundleShowcase() {
  const { addBundleToCart } = useStore();
  const navigate = useNavigate();
  const bundle = bundles.find((b) => b.slug === "complete-ebook-collection");
  if (!bundle) return null;

  const items = bundleBooks(bundle);
  const value = items.reduce((sum, b) => sum + b.price, 0);
  const payable = Math.min(value, bundle.price);
  const off = value > payable ? Math.round((1 - payable / value) * 100) : 0;
  const sides = ["30-days-to-digital-wealth", "find-your-purpose-in-30-days", "parenting-without-yelling", "passive-profits-with-ai"]
    .map((slug) => books.find((b) => b.slug === slug))
    .filter((b) => b !== undefined);

  const features = [
    { icon: Layers, title: `${items.length} eBooks`, note: "Complete collection" },
    { icon: Gift, title: "Curated Titles", note: "Every published eBook" },
    { icon: InfinityIcon, title: "Lifetime Access", note: "Read anytime" },
    { icon: Download, title: "Instant Download", note: "Start learning now" },
  ];

  const sideLayout = [
    { rotate: -6, lift: 12, w: "w-[17%]" },
    { rotate: -3, lift: 4, w: "w-[20%]" },
    { rotate: 3, lift: 4, w: "w-[20%]" },
    { rotate: 6, lift: 12, w: "w-[17%]" },
  ];

  return (
    <section className="section-y" aria-labelledby="bundle-heading">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-forest text-forest-foreground shadow-[var(--shadow-raised)]">
            {/* ambient accent glows */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(78% 95% at 78% 16%, color-mix(in oklab, var(--brand-amber) 17%, transparent) 0%, transparent 58%), radial-gradient(52% 66% at 2% 94%, color-mix(in oklab, var(--brand-crimson) 24%, transparent) 0%, transparent 62%)",
              }}
            />
            {/* gloss top edge */}
            <div
              aria-hidden
              className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-forest-foreground/40 to-transparent"
            />

            <div className="relative grid gap-10 px-6 py-12 sm:px-10 sm:py-14 lg:grid-cols-[46fr_54fr] lg:items-center lg:gap-6 lg:px-14 lg:py-16">
              {/* left — content */}
              <div className="max-w-xl">
                <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] uppercase text-forest-foreground/75">
                  <span
                    aria-hidden
                    className="h-0.5 w-8 rounded-full"
                    style={{ background: "var(--brand-amber)" }}
                  />
                  Premium Bundle Collection
                </p>

                <h2
                  id="bundle-heading"
                  className="mt-5 font-display text-4xl leading-[1.04] font-medium sm:text-5xl"
                >
                  The Complete
                  <span
                    className="block bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(92deg, var(--brand-crimson) 0%, var(--brand-red) 34%, var(--brand-orange) 66%, var(--brand-amber) 100%)",
                    }}
                  >
                    Growth Bundle
                  </span>
                </h2>

                <p className="mt-5 max-w-md text-base leading-relaxed text-forest-foreground/75">
                  Every life-changing eBook we publish, in one bundle at a special price.
                  Learn, grow and build a brighter tomorrow with practical knowledge.
                </p>

                <ul className="mt-8 grid grid-cols-2 gap-3">
                  {features.map((f) => (
                    <li
                      key={f.title}
                      className="flex items-center gap-3 rounded-lg border border-forest-foreground/10 bg-forest-foreground/[0.06] px-3.5 py-3"
                    >
                      <f.icon
                        className="h-4.5 w-4.5 shrink-0"
                        style={{ color: "var(--brand-amber)" }}
                        strokeWidth={1.75}
                        aria-hidden
                      />
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold">{f.title}</span>
                        <span className="block text-xs text-forest-foreground/65">{f.note}</span>
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-end gap-x-4 gap-y-2">
                  <span className="font-display text-4xl font-medium sm:text-5xl">
                    {formatPrice(payable)}
                  </span>
                  {off > 0 && <span className="pb-1 text-lg text-forest-foreground/55 line-through">
                    {formatPrice(value)}
                  </span>}
                  {off > 0 && <span
                    className="mb-1.5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      background: "color-mix(in oklab, var(--brand-amber) 20%, transparent)",
                      color: "var(--brand-amber)",
                    }}
                  >
                    <Gift className="h-3.5 w-3.5" aria-hidden /> Save {off}% vs individual prices
                  </span>}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <Button
                    type="button"
                    onClick={() => { addBundleToCart(bundle.slug); navigate({ to: "/cart" }); }}
                    className="press btn-gloss inline-flex h-13 items-center gap-2 rounded-full bg-brand px-8 text-sm font-semibold text-primary-foreground shadow-[0_14px_34px_-14px_var(--brand-red)] transition-transform duration-300 hover:-translate-y-1"
                  >
                    Review bundle <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Link
                    to="/bundles"
                    className="group inline-flex items-center gap-1.5 text-sm font-semibold text-forest-foreground/85 transition-colors hover:text-forest-foreground"
                  >
                    See all bundles
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                <p className="mt-6 flex items-center gap-2 text-xs text-forest-foreground/60">
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  Digital PDF collection · Lifetime access after purchase
                </p>
              </div>

              {/* right — 3D bundle display */}
              <Reveal delay={140} className="relative lg:min-h-[30rem]">
                <div
                  aria-hidden
                  className="glow-breathe absolute top-[6%] left-1/2 h-[19rem] w-[19rem] -translate-x-1/2 rounded-full sm:h-[26rem] sm:w-[26rem]"
                  style={{
                    background:
                      "radial-gradient(circle, color-mix(in oklab, var(--brand-amber) 42%, transparent) 0%, color-mix(in oklab, var(--brand-orange) 18%, transparent) 45%, transparent 70%)",
                  }}
                />

                {/* floating OFF badge */}
                {off > 0 && <div
                  aria-hidden
                  className="float-slow absolute top-0 right-[4%] z-20 grid h-16 w-16 place-items-center rounded-full text-center sm:h-20 sm:w-20"
                  style={{
                    background:
                      "radial-gradient(circle at 32% 26%, #ff6a55, var(--brand-crimson) 72%)",
                    boxShadow:
                      "0 0 0 6px color-mix(in oklab, var(--brand-amber) 34%, transparent), 0 18px 40px -14px color-mix(in oklab, var(--brand-crimson) 65%, transparent)",
                  }}
                >
                  <span className="font-display text-xl leading-none font-semibold text-forest-foreground sm:text-2xl">
                    {off}%
                    <span className="mt-0.5 block font-sans text-[0.75rem] font-bold tracking-[0.2em]">
                      OFF
                    </span>
                  </span>
                </div>}

                {/* books on the pedestal */}
                <div className="relative z-10 mx-auto flex w-full max-w-[32rem] items-end justify-center gap-1 px-2 sm:max-w-[36rem] sm:gap-2.5">
                  {/* left pair */}
                  {sides.slice(0, 2).map((book, i) => (
                    <BookOnStand key={book.id} book={book} layout={sideLayout[i]!} />
                  ))}

                  {/* center — the bundle */}
                  <div className="relative z-[5] w-[25%] shrink-0 sm:w-[27%]">
                    <div className="relative aspect-[2/3] overflow-hidden rounded-[6px] bg-card shadow-[0_34px_64px_-24px_rgb(0_0_0/60%)] ring-1 ring-forest-foreground/20 transition-transform duration-300 hover:-translate-y-2">
                      {/* page edge */}
                      <span
                        aria-hidden
                        className="absolute inset-y-[2px] right-0 w-1.5 rounded-r-[4px]"
                        style={{
                          background:
                            "repeating-linear-gradient(to right, #f5f0e7 0 2px, #e4dccc 2px 3px)",
                        }}
                      />
                      {/* top sheen */}
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-transparent"
                      />
                      <div className="relative flex h-full flex-col items-center justify-between px-[9%] py-[9%] text-center">
                        <img src={logo.url} alt="" className="h-6 w-auto sm:h-8" />
                        <div>
                          <p className="text-[0.75rem] font-bold tracking-[0.2em] text-muted-foreground">
                            THE
                          </p>
                          <p className="font-display text-base leading-tight font-semibold text-foreground sm:text-[1.35rem]">
                            COMPLETE
                          </p>
                          <p
                            className="bg-clip-text font-display text-base leading-tight font-semibold text-transparent sm:text-[1.35rem]"
                            style={{
                              backgroundImage:
                                "linear-gradient(92deg, var(--brand-crimson), var(--brand-orange) 70%, var(--brand-amber))",
                            }}
                          >
                            GROWTH
                          </p>
                          <p className="font-display text-base leading-tight font-semibold text-foreground sm:text-[1.35rem]">
                            BUNDLE
                          </p>
                          <span aria-hidden className="mx-auto mt-1.5 block h-px w-10 bg-brand-orange/70" />
                          <p className="mt-2 text-[0.75rem] leading-snug text-muted-foreground">
                            {items.length} Life-Changing eBooks
                            <br />
                            for a Brighter You
                          </p>
                        </div>
                        <p className="text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-foreground/75">
                          Learn Today. Grow Tomorrow.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* right pair */}
                  {sides.slice(2, 4).map((book, i) => (
                    <BookOnStand key={book.id} book={book} layout={sideLayout[i + 2]!} />
                  ))}
                </div>

                {/* marble pedestal */}
                <div aria-hidden className="relative z-0 mx-auto -mt-2 w-[76%] max-w-md">
                  <div className="mx-1 h-3.5 rounded-[50%] bg-[linear-gradient(180deg,#f8f3ea,#e7ddcb)] shadow-[0_12px_30px_-14px_rgba(0,0,0,0.5)]" />
                  <div className="mx-3 h-8 rounded-b-[1.3rem] rounded-t-sm bg-[linear-gradient(180deg,#f0e8d9,#ded2ba)]" />
                  <div
                    className="mx-8 h-7 rounded-[50%] blur-md"
                    style={{
                      background:
                        "radial-gradient(50% 100% at 50% 50%, color-mix(in oklab, var(--brand-amber) 36%, transparent) 0%, transparent 72%)",
                    }}
                  />
                </div>

                {/* marble sphere */}
                <div
                  aria-hidden
                  className="absolute right-[7%] bottom-[6%] hidden h-11 w-11 rounded-full sm:block"
                  style={{
                    background:
                      "radial-gradient(circle at 32% 26%, #ffffff, #eae2d2 55%, #cdc1aa 100%)",
                    boxShadow: "0 16px 26px -12px rgba(0,0,0,0.4)",
                  }}
                />

                {/* soft floor reflection */}
                <div
                  aria-hidden
                  className="mx-auto h-10 w-[70%] max-w-md rounded-[50%] bg-forest-foreground/10 blur-lg"
                />

                <p className="relative z-10 mt-4 text-center text-xs text-forest-foreground/55">
                  All {items.length} eBooks included — nothing else to buy
                </p>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BookOnStand({
  book,
  layout,
}: {
  book: (typeof books)[number];
  layout: { rotate: number; lift: number; w: string };
}) {
  return (
    <div
      className={cn("shrink-0", layout.w)}
      style={{ transform: `rotate(${layout.rotate}deg) translateY(${layout.lift}px)` }}
    >
      <Link
        to="/book/$slug"
        params={{ slug: book.slug }}
        preload="intent"
        draggable={false}
        className="block aspect-[2/3] overflow-hidden rounded-[5px] shadow-[0_26px_50px_-22px_rgb(11_22_51/45%)] ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-2"
      >
        <img
          src={book.cover}
          alt={`${book.title} ebook cover`}
          width={640}
          height={960}
          loading="lazy"
          draggable={false}
          className="h-full w-full object-cover"
        />
      </Link>
    </div>
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

/* ------------------------------------------------------------- reviews */

function Reviews() {
  return (
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
        <div className="grid items-center gap-6 rounded-lg bg-brand px-7 py-10 text-primary-foreground sm:px-12 lg:grid-cols-2">
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
             className="flex h-14 items-center gap-2 rounded-full bg-card pr-2 pl-5 lg:justify-self-end lg:w-full"
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
              className="press grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-primary-foreground disabled:opacity-60"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
          {done ? (
            <p className="text-xs text-primary-foreground/90 lg:col-span-2">Thanks — you're on the list.</p>
          ) : null}
        </div>
      </Reveal>
    </section>
  );
}
