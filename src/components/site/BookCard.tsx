import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { formatPrice, type Book } from "@/data/catalog";
import { useStore } from "@/lib/store";
import { Stars } from "./Stars";
import { cn } from "@/lib/utils";

export function BookCard({ book }: { book: Book }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wished = isWishlisted(book.id);

  return (
    <article className="group flex h-full flex-col">
      <div className="shine hover-lift relative overflow-hidden rounded-md border border-border bg-muted">
        <Link
          to="/book/$slug"
          params={{ slug: book.slug }}
          className="block focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <img
            src={book.cover}
            alt={`Cover of ${book.title} by ${book.author}`}
            loading="lazy"
            width={640}
            height={960}
            className="aspect-[2/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </Link>

        {book.badge ? (
          <span className="absolute top-2 left-2 rounded-sm bg-forest px-2 py-1 text-[0.6rem] font-semibold tracking-[0.14em] text-forest-foreground uppercase">
            {book.badge}
          </span>
        ) : null}

        <button
          type="button"
          onClick={() => toggleWishlist(book.id)}
          aria-label={wished ? `Remove ${book.title} from wishlist` : `Save ${book.title} to wishlist`}
          aria-pressed={wished}
          className="absolute top-2 right-2 grid h-9 w-9 place-items-center rounded-full bg-card/90 text-foreground shadow-sm transition-colors hover:bg-card"
        >
          <Heart className={cn("h-4 w-4 transition-all", wished && "fill-destructive text-destructive")} />
        </button>

        <div className="pointer-events-none absolute inset-x-2 bottom-2 translate-y-2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => addToCart(book.id)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-forest px-3 py-2.5 text-[0.68rem] font-semibold tracking-[0.14em] text-forest-foreground uppercase transition-colors hover:bg-charcoal"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Add to cart
          </button>
        </div>
      </div>

      <div className="mt-3 flex min-w-0 flex-1 flex-col">
        <h3 className="line-clamp-2 font-sans text-sm leading-snug font-medium">
          <Link
            to="/book/$slug"
            params={{ slug: book.slug }}
            className="link-sweep hover:text-primary"
          >
            {book.title}
          </Link>
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">{book.author}</p>
        <div className="mt-1.5 flex items-center gap-1.5">
          <Stars rating={book.rating} />
          <span className="text-[0.7rem] text-muted-foreground">
            ({book.reviews.toLocaleString("en-IN")})
          </span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-sm font-semibold">{formatPrice(book.price)}</span>
          {book.oldPrice ? (
            <span className="text-xs text-muted-foreground line-through">{formatPrice(book.oldPrice)}</span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => addToCart(book.id)}
          className="mt-3 inline-flex items-center justify-center gap-2 rounded-sm border border-forest px-3 py-2 text-[0.68rem] font-semibold tracking-[0.14em] text-forest uppercase transition-colors hover:bg-forest hover:text-forest-foreground sm:hidden"
        >
          <ShoppingBag className="h-3.5 w-3.5" /> Add to cart
        </button>
      </div>
    </article>
  );
}
