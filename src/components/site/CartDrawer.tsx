import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, X, ShoppingBag, ArrowRight } from "lucide-react";
import { formatPrice, storeConfig } from "@/data/catalog";
import { useStore } from "@/lib/store";

const FREE_SHIPPING = 999;

export function CartDrawer() {
  const { drawerOpen, setDrawerOpen, lineBooks, setQty, removeFromCart, cartSubtotal } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!drawerOpen) return;
    const raf = requestAnimationFrame(() => setMounted(true));
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      setMounted(false);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen, setDrawerOpen]);

  if (!drawerOpen) return null;

  const remaining = Math.max(0, FREE_SHIPPING - cartSubtotal);
  const progress = Math.min(1, cartSubtotal / FREE_SHIPPING);

  return (
    <div className="fixed inset-0 z-[60]">
      <div
        className={`absolute inset-0 bg-charcoal/50 backdrop-blur-sm transition-opacity duration-500 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setDrawerOpen(false)}
      />
      <aside
        role="dialog"
        aria-label="Shopping cart"
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          mounted ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="font-serif text-xl">Your bag</h2>
            <p className="text-[0.62rem] tracking-[0.18em] text-muted-foreground uppercase">
              {lineBooks.length} {lineBooks.length === 1 ? "title" : "titles"}
            </p>
          </div>
          <button
            type="button"
            aria-label="Close cart"
            onClick={() => setDrawerOpen(false)}
            className="press grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {lineBooks.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="float-slow h-10 w-10 text-taupe" />
            <p className="text-sm text-muted-foreground">
              Your bag is empty — go find a good story.
            </p>
            <Link
              to="/books"
              onClick={() => setDrawerOpen(false)}
              className="press mt-2 rounded-sm bg-forest px-5 py-2.5 text-[0.7rem] font-semibold tracking-[0.16em] text-forest-foreground uppercase hover:bg-charcoal"
            >
              Browse books
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b border-border px-5 py-3">
              <p className="text-xs text-muted-foreground">
                {remaining > 0 ? (
                  <>
                    Add <span className="font-semibold text-foreground">{formatPrice(remaining)}</span>{" "}
                    more for free shipping
                  </>
                ) : (
                  <span className="font-medium text-forest">
                    Free shipping unlocked — nicely done.
                  </span>
                )}
              </p>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full origin-left rounded-full bg-gold transition-transform duration-700 ease-out"
                  style={{ transform: `scaleX(${progress})` }}
                />
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              {lineBooks.map(({ book, qty }, i) => (
                <div
                  key={book.id}
                  style={{ animationDelay: `${100 + i * 70}ms` }}
                  className="flex animate-[slide-right_0.5s_cubic-bezier(0.22,1,0.36,1)_both] gap-3"
                >
                  <Link to="/book/$slug" params={{ slug: book.slug }} onClick={() => setDrawerOpen(false)}>
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="h-24 w-16 rounded-sm object-cover shadow-sm transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm leading-snug font-medium">{book.title}</p>
                    <p className="text-xs text-muted-foreground">{book.category}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center rounded-sm border border-border">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          className="grid h-7 w-7 place-items-center transition-colors hover:bg-muted"
                          onClick={() => setQty(book.id, qty - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-xs tabular-nums">{qty}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          className="grid h-7 w-7 place-items-center transition-colors hover:bg-muted"
                          onClick={() => setQty(book.id, qty + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${book.title}`}
                        onClick={() => removeFromCart(book.id)}
                        className="text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-semibold tabular-nums">
                    {formatPrice(book.price * qty)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-border px-5 py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold tabular-nums">{formatPrice(cartSubtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
              <Link
                to="/cart"
                onClick={() => setDrawerOpen(false)}
                className="press group mt-4 flex w-full items-center justify-center gap-2 rounded-sm bg-forest px-5 py-3 text-[0.7rem] font-semibold tracking-[0.16em] text-forest-foreground uppercase transition-colors hover:bg-charcoal"
              >
                Review bag
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <p className="mt-3 text-center text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase">
                {storeConfig.announcementSecondary}
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
