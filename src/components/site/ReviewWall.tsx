import { Quote, Star } from "lucide-react";
import { testimonials, type Testimonial } from "@/data/catalog";
import { cn } from "@/lib/utils";

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="flex w-[19rem] shrink-0 flex-col self-start rounded-lg bg-card p-6 shadow-[var(--shadow-card)] sm:w-[22rem]">
      <Quote className="h-5 w-5 text-primary" aria-hidden />
      <blockquote className="mt-3 text-sm leading-relaxed text-foreground/85">
        {t.quote}
      </blockquote>
      <figcaption className="mt-4 flex flex-col gap-1.5">
        <span className="flex gap-0.5" aria-label={`${t.rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, s) => (
            <Star
              key={s}
              className={cn(
                "h-3 w-3",
                s < Math.round(t.rating)
                  ? "fill-gold text-gold"
                  : "text-border",
              )}
              aria-hidden
            />
          ))}
        </span>
        <span>
          <span className="block text-sm font-semibold">{t.name}</span>
          <span className="block text-xs text-muted-foreground">{t.location}</span>
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
  return (
    <Row items={testimonials} seconds={120} />
  );
}
