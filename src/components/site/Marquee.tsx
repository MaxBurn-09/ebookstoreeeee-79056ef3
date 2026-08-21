import { BookOpen } from "lucide-react";

/** Infinite scrolling editorial strip. Pauses on hover. */
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-border bg-charcoal py-4 text-cream select-none">
      <div className="marquee-track gap-10">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-10 text-[0.68rem] font-semibold tracking-[0.24em] uppercase"
          >
            {item}
            <BookOpen className="h-3.5 w-3.5 text-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}
