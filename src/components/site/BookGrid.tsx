import type { Book } from "@/data/catalog";
import { BookCard } from "./BookCard";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/** Responsive, scroll-revealed grid of book cards used across storefront pages. */
export function BookGrid({ items, className }: { items: Book[]; className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-5 sm:gap-y-11 md:grid-cols-3 lg:grid-cols-4",
        className,
      )}
    >
      {items.map((b, i) => (
        <Reveal key={b.id} delay={Math.min((i % 8) * 70, 500)} className="h-full">
          <BookCard book={b} />
        </Reveal>
      ))}
    </div>
  );
}
