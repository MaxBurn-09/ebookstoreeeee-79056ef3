import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Check, Plus } from "lucide-react";
import { formatPrice, type Book } from "@/data/catalog";
import { useStore } from "@/lib/store";
import { Stars } from "./Stars";
import { cn } from "@/lib/utils";

export function BookCard({ book, priority = false }: { book: Book; priority?: boolean }) {
  const { addToCart, toggleWishlist, isWishlisted, cart } = useStore();
  const wished = isWishlisted(book.id);
  const inCart = cart.some((l) => l.id === book.id);
  const [loaded, setLoaded] = useState(false);
  const off = Math.round((1 - book.price / book.oldPrice) * 100);

  return (
    <article className="group relative flex h-full flex-col">
      <div className="cover-plate relative">
        {!loaded ? <span className="skeleton absolute inset-0" aria-hidden /> : null}
        <Link
          to="/book/$slug"
          params={{ slug: book.slug }}
          preload="intent"
          tabIndex={-1}
          aria-hidden
          className="block"
        >
          <img
            src={book.cover}
            alt=""
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            width={640}
            height={960}
            onLoad={() => setLoaded(true)}
            className={cn(
              "aspect-[2/3] w-full object-cover transition-[transform,opacity] duration-500 ease-out group-hover:scale-[1.02]",
              loaded ? "opacity-100" : "opacity-0",
            )}
          />
        </Link>

        {off > 0 ? (
          <span className="absolute top-2 left-2 rounded-[3px] bg-foreground/90 px-1.5 py-1 text-[0.6rem] font-semibold tracking-wide text-background">
            −{off}%
          </span>
        ) : null}

        <button
          type="button"
          onClick={() => toggleWishlist(book.id)}
          aria-label={wished ? `Remove ${book.title} from saved` : `Save ${book.title}`}
          aria-pressed={wished}
          className="press absolute top-2 right-2 z-10 grid h-9 w-9 place-items-center rounded-full bg-card/92 text-foreground shadow-[var(--shadow-card)] backdrop-blur-sm hover:bg-card focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100"
        >
          <Heart className={cn("h-4 w-4", wished && "fill-destructive text-destructive")} />
        </button>
      </div>

      <div className="mt-3 flex min-w-0 flex-1 flex-col">
        <p className="eyebrow truncate">{book.category}</p>
        <h3 className="mt-1.5 text-[0.9rem] leading-snug font-semibold tracking-[-0.015em]">
          <Link
            to="/book/$slug"
            params={{ slug: book.slug }}
            preload="intent"
            className="line-clamp-2 transition-colors before:absolute before:inset-0 before:content-[''] hover:text-primary"
          >
            {book.title}
          </Link>
        </h3>

        <div className="mt-2 flex items-center gap-1.5">
          <Stars rating={book.rating} />
          <span className="text-[0.7rem] text-muted-foreground">
            {book.rating.toFixed(1)} ({book.reviews.toLocaleString("en-US")})
          </span>
        </div>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-x-2 gap-y-2 pt-3">
          <div className="flex min-w-0 items-baseline gap-1.5">
            <span className="text-[0.95rem] font-semibold">{formatPrice(book.price)}</span>
            <span className="text-[0.72rem] text-muted-foreground line-through">
              {formatPrice(book.oldPrice)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => addToCart(book.id)}
            aria-label={`Add ${book.title} to bag`}
            className={cn(
              "press relative z-10 inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-[0.72rem] font-semibold",
              inCart
                ? "border-primary/30 bg-primary/8 text-primary"
                : "border-border hover:border-foreground/30 hover:bg-foreground hover:text-background",
            )}
          >
            {inCart ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            {inCart ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </article>
  );
}
