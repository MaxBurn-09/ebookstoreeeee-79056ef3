import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { formatPrice, type Book } from "@/data/catalog";
import { useStore } from "@/lib/store";
import { Stars } from "./Stars";
import { Tilt } from "./Motion";
import { cn } from "@/lib/utils";

export function BookCard({ book }: { book: Book }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wished = isWishlisted(book.id);

  return (
    <article className="group flex h-full flex-col">
      <Tilt max={6} className="w-full">
        <div className="shine hover-lift relative overflow-hidden rounded-md border border-border bg-muted shadow-[0_10px_30px_-24px_color-mix(in_oklab,var(--forest)_70%,transparent)]">
          <Link
            to="/book/$slug"
            params={{ slug: book.slug }}
            preload="intent"
            className="block focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <img
              src={book.cover}
              alt={`Cover of ${book.title} by ${book.author}`}
              loading="lazy"
              width={640}
              height={960}
              className="aspect-[2/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
            <span className="pointer-events-none absolute inset-y-0 left-0 w-[6%] bg-gradient-to-r from-charcoal/35 to-transparent" />
          </Link>

          {book.badge ? (
            <span className="absolute top-2 left-2 rounded-sm bg-forest px-2 py-1 text-[0.55rem] font-semibold tracking-[0.14em] text-forest-foreground uppercase sm:text-[0.6rem]">
              {book.badge}
            </span>
          ) : null}

          <button
            type="button"
            onClick={() => toggleWishlist(book.id)}
            aria-label={
              wished ? `Remove ${book.title} from wishlist` : `Save ${book.title} to wishlist`
            }
            aria-pressed={wished}
            className="press absolute top-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-card/90 text-foreground shadow-sm backdrop-blur transition-all hover:scale-110 hover:bg-card sm:h-9 sm:w-9"
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-all",
                wished && "scale-110 fill-destructive text-destructive",
              )}
            />
          </button>

          <div className="pointer-events-none absolute inset-x-2 bottom-2 hidden translate-y-3 opacity-0 transition-all duration-500 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 sm:block">
            <button
              type="button"
              onClick={() => addToCart(book.id)}
              className="press inline-flex w-full items-center justify-center gap-2 rounded-sm bg-forest px-3 py-2.5 text-[0.66rem] font-semibold tracking-[0.14em] text-forest-foreground uppercase transition-colors hover:bg-forest/90"
            >
              <ShoppingBag className="h-3.5 w-3.5" /> Add to cart
            </button>
          </div>
        </div>
      </Tilt>

      <div className="mt-3 flex min-w-0 flex-1 flex-col sm:mt-4">
        <h3 className="line-clamp-2 font-sans text-[0.82rem] leading-snug font-medium tracking-[-0.01em] text-foreground sm:text-sm">
          <Link
            to="/book/$slug"
            params={{ slug: book.slug }}
            preload="intent"
            className="link-sweep transition-colors hover:text-primary"
          >
            {book.title}
          </Link>
        </h3>
        <p className="mt-1 truncate text-[0.7rem] text-muted-foreground sm:text-xs">
          {book.author}
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <Stars rating={book.rating} />
          <span className="text-[0.68rem] text-muted-foreground">
            ({book.reviews.toLocaleString("en-IN")})
          </span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-[0.9rem] font-semibold sm:text-base">
            {formatPrice(book.price)}
          </span>
          {book.oldPrice ? (
            <span className="text-[0.72rem] text-muted-foreground line-through">
              {formatPrice(book.oldPrice)}
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => addToCart(book.id)}
          className="press mt-3 inline-flex items-center justify-center gap-2 rounded-sm border border-forest px-3 py-2.5 text-[0.65rem] font-semibold tracking-[0.14em] text-forest uppercase transition-colors hover:bg-forest hover:text-forest-foreground sm:hidden"
        >
          <ShoppingBag className="h-3.5 w-3.5" /> Add to cart
        </button>
      </div>
    </article>
  );
}
