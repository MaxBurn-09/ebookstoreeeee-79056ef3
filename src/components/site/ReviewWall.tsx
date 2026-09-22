import { Quote, Star } from "lucide-react";
import { testimonials, type Testimonial } from "@/data/catalog";
import { cn } from "@/lib/utils";

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="flex w-[19rem] shrink-0 flex-col rounded-2xl bg-card p-6 shadow-[var(--shadow-card)] sm:w-[22rem]">
      <Quote className="h-5 w-5 text-[var(--brand-orange)]" aria-hidden />
      <blockquote className="mt-3 flex-1 text-[0.86rem] leading-relaxed text-foreground/85">
        {t.quote}
      </blockquote>
      <figcaption className="mt-5 flex items-center justify-between gap-3">
        <span>
          <span className="block text-[0.82rem] font-semibold">{t.name}</span>
          <span className="block text-[0.72rem] text-muted-foreground">{t.location}</span>
        </span>
        <span className="flex gap-0.5" aria-label={`${t.rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, s) => (
            <Star
              key={s}
              className={cn(
                "h-3 w-3",
                s < Math.round(t.rating)
                  ? "fill-[var(--brand-amber)] text-[var(--brand-amber)]"
                  : "text-border",
              )}
              aria-hidden
            />
          ))}
        </span>
      </figcaption>
    </figure>
  );
}

function Row({ items, reverse, seconds }: { items: Testimonial[]; reverse?: boolean; seconds: number }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
      <div
        className="marquee-track gap-5 py-2"
        style={{
          animationDuration: `${seconds}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {row.map((t, i) => (
          <Card key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

/** Auto-scrolling wall of verified reader reviews. Pauses on hover. */
export function ReviewWall() {
  const half = Math.ceil(testimonials.length / 2);
  return (
    <div className="space-y-4">
      <Row items={testimonials.slice(0, half)} seconds={90} />
      <Row items={testimonials.slice(half)} seconds={105} reverse />
    </div>
  );
}
