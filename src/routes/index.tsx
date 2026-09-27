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
import { organizationLd, pageHead, websiteLd } from "@/lib/seo";
import logo from "@/assets/fga-logo.png.asset.json";

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
      <Bookshelf />
      <BundleShowcase />
      <BestSelling />
      <Reviews />
      <Newsletter />
    </>
  );
}

/* ------------------------------------------------------------------ hero */

function Hero() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

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
              <AutoBookStack />
            </Tilt>
          </Parallax>

          <p className="mt-5 text-center text-xs tracking-wide text-muted-foreground sm:mt-8">
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
              className="press grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-primary-foreground"
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
            const picks = books.filter((b) => b.category === c.name).slice(0, 3);
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
                          className={
                            j === 1
                              ? "relative z-[3] w-[37%] rounded-[5px] shadow-[0_12px_26px_-10px_rgb(11_22_51/45%)]"
                              : "relative z-[2] -ml-[13%] w-[33%] first:ml-0 rounded-[5px] shadow-[0_12px_26px_-12px_rgb(11_22_51/40%)]"
                          }
                          style={{
                            transform: `rotate(${(j - 1) * 8}deg) translateY(${j === 1 ? 0 : 6}px)`,
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

/* ----------------------------------------------------------- story band */

/* --------------------------------------------------------- opening book */

function OpenBook() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setOpen(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="[perspective:1600px]"
      onMouseEnter={() => setOpen(true)}
    >
      <div className="float-slow relative h-[19rem] w-[min(27rem,80vw)] sm:h-[22rem] [transform:rotateX(10deg)_rotateZ(-2deg)] [transform-style:preserve-3d]">
        {/* back cover (right board) */}
        <div className="absolute inset-y-0 right-0 w-1/2 rounded-r-md rounded-l-[2px] bg-[#6b3d20] shadow-[0_50px_90px_-38px_rgba(0,0,0,0.85)]" />
        {/* page edges on the right side */}
        <div className="absolute inset-y-[3px] right-[3px] w-[calc(50%-6px)] rounded-r-[3px] bg-[repeating-linear-gradient(to_right,#fdfaf3_0_2px,#ece3d2_2px_3px)]" />
        {/* spine shadow */}
        <div className="absolute inset-y-0 left-1/2 w-10 -translate-x-1/2 bg-[radial-gradient(50%_100%_at_50%_50%,rgba(0,0,0,0.28),transparent_70%)]" />

        {/* left inner page — tagline reveal */}
        <div className="absolute inset-y-[3px] left-[3px] grid w-[calc(50%-6px)] place-items-center rounded-l-[3px] bg-[#fbf7ee] p-5 text-foreground sm:p-6">
          <div className="text-center">
            <p className="font-display text-xl leading-snug font-medium sm:text-2xl">
              Small Books.
              <br />
              <span className="text-brand">Big Changes.</span>
            </p>
            <svg
              viewBox="0 0 120 12"
              aria-hidden
              className="mx-auto mt-3 h-2.5 w-24 text-brand-orange"
            >
              <path
                d="M3 9 Q 60 -4 117 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Practical wisdom you can use today — in minutes, not months.
            </p>
          </div>
        </div>

        {/* right inner page — text lines + quote */}
        <div className="absolute inset-y-[3px] right-[3px] w-[calc(50%-6px)] rounded-r-[3px] bg-[#fbf7ee] p-5 text-foreground sm:p-6">
          <div className="space-y-2 pt-1" aria-hidden>
            {[100, 88, 96, 74, 100, 82].map((w, i) => (
              <span
                key={i}
                className="block h-1.5 rounded-full bg-foreground/10"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
          <p className="mt-5 font-display text-sm font-medium tracking-wide text-foreground/80 sm:text-base">
            Read. Apply. <span className="text-brand">Transform.</span>
          </p>
        </div>

        {/* front cover — hinged at the spine, swings open */}
        <div
          className={cn(
            "absolute inset-y-0 left-0 w-1/2 [transform-style:preserve-3d] [transform-origin:left_center] transition-transform duration-[1700ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
            open && "[transform:rotateY(-162deg)]",
          )}
        >
          {/* cover front — real book cover art */}
          <img
            src="/covers/your-why-changes-everything.webp"
            alt="Your WHY Changes Everything — eBook cover"
            loading="lazy"
            className="absolute inset-0 h-full w-full rounded-l-md rounded-r-[2px] object-cover shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] [backface-visibility:hidden]"
          />
          {/* cover inside (seen while opening) */}
          <div className="absolute inset-0 rounded-r-md rounded-l-[2px] bg-[#f3ede3] [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_0%_50%,rgba(0,0,0,0.10),transparent_55%)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

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
          <p className="text-xs tracking-wide text-background/70">
            Knowledge creates real change
          </p>
          <h2 className="mt-5 font-display text-[2.2rem] leading-[1.08] font-medium sm:text-[2.9rem]">
            More Than
            <br />
            Just Books
          </h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-background/75">
            {storeConfig.name} is built to help you learn, grow and evolve with practical knowledge
            you can apply in real life.
          </p>
          <Link
            to="/about"
            className="press mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-primary-foreground"
          >
            Our Story <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <Reveal delay={120} className="flex justify-center">
          <Parallax speed={0.06}>
            <OpenBook />
          </Parallax>
        </Reveal>

        <Reveal
          delay={200}
          as="ul"
          className="grid grid-cols-3 overflow-hidden rounded-lg border border-background/15 bg-background/5 lg:grid-cols-1"
        >
          {steps.map((s, i) => (
            <li
              key={s}
              className="flex min-w-24 items-center gap-3 border-background/15 px-4 py-4 not-last:border-r lg:border-r-0 lg:not-last:border-b"
            >
              <span className="h-px w-5 bg-background/40" aria-hidden />
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
