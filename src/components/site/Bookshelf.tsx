import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { books } from "@/data/catalog";
import { cn } from "@/lib/utils";

const PER_SHELF = 5;
const SHUFFLE_MS = 4200;

/** Natural per-book variation so the row never looks machine-aligned. */
const variations = [
  { tilt: -1.6, lift: 0, w: 1 },
  { tilt: 0.8, lift: 2, w: 0.94 },
  { tilt: -0.5, lift: 0, w: 1.05 },
  { tilt: 1.4, lift: 3, w: 0.9 },
  { tilt: -1.1, lift: 1, w: 0.98 },
];

function ShelfBook({
  slug,
  title,
  index,
  entered,
}: {
  slug: string;
  title: string;
  index: number;
  entered: boolean;
}) {
  const v = variations[index % variations.length] ?? variations[0]!;
  return (
    <Link
      to="/book/$slug"
      params={{ slug }}
      aria-label={title}
      className={cn(
        "group relative block shrink-0 cursor-pointer transition-all duration-500 ease-out",
        entered ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      )}
      style={{
        transitionDelay: entered ? `${180 + index * 90}ms` : "0ms",
        transform: entered
          ? `rotate(${v.tilt}deg) translateY(${-v.lift}px)`
          : undefined,
        width: `calc(clamp(3.3rem, 14.5vw, 6.4rem) * ${v.w})`,
      }}
    >
      <span
        className="block overflow-hidden rounded-[3px] shadow-[0_10px_18px_-8px_rgba(8,26,56,0.45)] transition-all duration-500 ease-out group-hover:-translate-y-2.5 group-hover:rotate-2 group-hover:shadow-[0_22px_34px_-12px_rgba(8,26,56,0.55)]"
        style={{ aspectRatio: "5 / 7.4" }}
      >
        <img
          src={`/covers/${slug}.webp`}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        {/* spine + sheen */}
        <span className="pointer-events-none absolute inset-0 rounded-[3px] bg-gradient-to-r from-black/25 via-transparent to-white/10" />
        <span className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-black/30" />
      </span>
      {/* hover glow ring in brand gradient */}
      <span className="pointer-events-none absolute -inset-1 rounded-md bg-brand opacity-0 blur-[6px] transition-opacity duration-500 group-hover:opacity-40" />
    </Link>
  );
}

function WoodShelf({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      {/* LED glow under shelf */}
      <div className="absolute -bottom-4 left-[6%] right-[6%] h-6 rounded-full bg-[#FFCC80]/50 blur-xl" />
      {/* walnut plank */}
      <div
        className="h-3.5 rounded-full sm:h-4"
        style={{
          background:
            "linear-gradient(180deg,#8a5630 0%,#7A4A28 45%,#5e3620 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -2px 3px rgba(0,0,0,0.35), 0 10px 22px -10px rgba(8,26,56,0.4)",
        }}
      />
      {/* wood grain hint */}
      <div
        className="pointer-events-none absolute inset-x-2 top-1 h-px opacity-30"
        style={{
          background:
            "repeating-linear-gradient(90deg, rgba(0,0,0,0.5) 0 14px, transparent 14px 26px)",
        }}
      />
    </div>
  );
}

export function Bookshelf() {
  const ref = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const [offset, setOffset] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!entered || paused || books.length <= PER_SHELF * 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setOffset((o) => (o + 1) % books.length), SHUFFLE_MS);
    return () => window.clearInterval(t);
  }, [entered, paused]);

  const pick = (start: number) =>
    Array.from({ length: PER_SHELF }, (_, i) => books[(offset + start + i) % books.length]!);
  const topShelf = pick(0);
  const bottomShelf = pick(PER_SHELF);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries[0]?.isIntersecting && setEntered(true),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty("--px", x.toFixed(3));
    e.currentTarget.style.setProperty("--py", y.toFixed(3));
  };

  return (
    <section aria-label="Curated bookshelf" className="relative overflow-hidden py-16 sm:py-24">
      {/* ambient brand wash, very subtle */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-brand opacity-[0.07] blur-3xl" />

      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className={cn(
          "relative mx-auto w-[94%] max-w-4xl xl:max-w-5xl 2xl:max-w-6xl transition-all duration-1000 ease-out",
          entered ? "scale-100 opacity-100" : "scale-[0.96] opacity-0",
        )}
        style={{ ["--px" as string]: 0, ["--py" as string]: 0 }}
      >
        {/* morning sunlight from the right */}
        <div className="pointer-events-none absolute -right-24 -top-16 h-72 w-72 rounded-full bg-[#FFCC80]/35 blur-3xl" />

        {/* arch */}
        <div
          className="relative rounded-t-[10rem] px-3 pb-10 pt-12 sm:rounded-t-[14rem] sm:px-12 sm:pt-16 lg:rounded-t-[20rem] lg:px-20 lg:pt-20"
          style={{
            background:
              "linear-gradient(180deg,#F3EDE3 0%,#efe7da 60%,#e9e0d2 100%)",
            boxShadow:
              "inset 0 2px 0 rgba(255,255,255,0.7), inset 0 -18px 40px rgba(8,26,56,0.06), 0 30px 60px -30px rgba(8,26,56,0.25)",
          }}
        >
          {/* hidden LED following the arch curve */}
          <div className="pointer-events-none absolute inset-x-10 top-3 h-24 rounded-t-full bg-[#FFCC80]/40 blur-2xl sm:inset-x-16" />

          {/* quote */}
          <div className="relative mx-auto mb-8 max-w-xs text-center sm:mb-10">
            <p className="font-display text-2xl leading-snug text-foreground sm:text-3xl lg:text-4xl">
              Small Books
              <br />
              Big Changes
            </p>
            <svg
              viewBox="0 0 120 12"
              className="mx-auto mt-2 h-3 w-24 text-[#FF6A1A]"
              fill="none"
              aria-hidden
            >
              <path
                d="M4 8 C 30 2, 90 2, 116 7"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* hanging pothos, left */}
          <div
            className="pointer-events-none absolute -left-2 top-10 hidden sm:block"
            style={{
              transform: `translate(calc(var(--px) * -10px), calc(var(--py) * -6px))`,
              animation: "sway 7s ease-in-out infinite",
            }}
            aria-hidden
          >
            <div className="mx-auto h-10 w-12 rounded-b-full rounded-t-sm bg-gradient-to-b from-[#7A4A28] to-[#5e3620] shadow-md" />
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="mx-auto mt-0.5 w-1.5 rounded-full bg-gradient-to-b from-emerald-700 to-emerald-900"
                style={{ height: `${34 + i * 22}px`, width: 6 - i }}
              />
            ))}
          </div>

          {/* vase + stone sphere, right */}
          <div
            className="pointer-events-none absolute -right-1 bottom-24 hidden sm:block"
            style={{
              transform: `translate(calc(var(--px) * 8px), calc(var(--py) * 5px))`,
            }}
            aria-hidden
          >
            <div className="mx-auto mb-2 h-7 w-7 rounded-full bg-gradient-to-br from-stone-300 to-stone-500 shadow-inner" />
            <div className="h-12 w-9 rounded-b-2xl rounded-t-md bg-gradient-to-b from-[#faf6ef] to-[#ddd2c0] shadow-md" />
          </div>

          {/* shelves */}
          <div
            className="relative space-y-12 sm:space-y-16 lg:space-y-20"
            style={{
              transform: `translate(calc(var(--px) * 6px), calc(var(--py) * 4px))`,
            }}
          >
            <div>
              <div className="flex items-end justify-center gap-1.5 px-1 sm:gap-3 sm:px-2 lg:gap-4">
                {topShelf.map((b, i) => (
                  <ShelfBook key={`${i}-${b.slug}`} slug={b.slug} title={b.title} index={i} entered={entered} />
                ))}
              </div>
              <WoodShelf className="mt-1" />
            </div>
            <div>
              <div className="flex items-end justify-center gap-1.5 px-1 sm:gap-3 sm:px-2 lg:gap-4">
                {bottomShelf.map((b, i) => (
                  <ShelfBook key={`${i}-${b.slug}`} slug={b.slug} title={b.title} index={i + 2} entered={entered} />
                ))}
              </div>
              <WoodShelf className="mt-1" />
            </div>
          </div>
        </div>

        {/* marble pedestal */}
        <div className="relative mx-auto -mt-1 w-[86%]">
          <div
            className="h-6 rounded-b-2xl rounded-t-sm sm:h-7"
            style={{
              background:
                "linear-gradient(180deg,#F6F1EA 0%,#eee5d7 70%,#e2d6c4 100%)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.8), 0 18px 30px -14px rgba(8,26,56,0.35)",
            }}
          />
          {/* underglow + floor reflection */}
          <div className="mx-auto mt-1 h-5 w-3/4 rounded-full bg-[#FFCC80]/30 blur-lg" />
          <div className="mx-auto h-8 w-2/3 rounded-[50%] bg-foreground/5 blur-md" />
        </div>

        {/* dust particles */}
        {[
          { l: "18%", t: "22%", d: "0s" },
          { l: "72%", t: "18%", d: "1.4s" },
          { l: "48%", t: "38%", d: "2.6s" },
        ].map((p, i) => (
          <span
            key={i}
            className="pointer-events-none absolute h-1 w-1 rounded-full bg-[#FFCC80]/70"
            style={{ left: p.l, top: p.t, animation: `drift 9s ease-in-out ${p.d} infinite` }}
            aria-hidden
          />
        ))}
      </div>
    </section>
  );
}
