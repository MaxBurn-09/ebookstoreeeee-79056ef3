import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, X, ShoppingBag, ArrowRight, Download } from "lucide-react";
import { formatPrice } from "@/data/catalog";
import { useStore } from "@/lib/store";

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

  const saved = lineBooks.reduce((sum, l) => sum + (l.book.oldPrice - l.book.price) * l.qty, 0);

  return (
    <div className="fixed inset-0 z-[60]">
      <div
        className={`absolute inset-0 bg-charcoal/45 transition-opacity duration-300 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your bag"
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-background shadow-[var(--shadow-overlay)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          mounted ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="text-base font-semibold">Your bag</h2>
            <p className="text-xs text-muted-foreground">
              {lineBooks.length} {lineBooks.length === 1 ? "ebook" : "ebooks"}
            </p>
          </div>
          <button
            type="button"
            aria-label="Close bag"
            onClick={() => setDrawerOpen(false)}
            className="press grid h-10 w-10 place-items-center rounded-md hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {lineBooks.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="h-9 w-9 text-taupe" aria-hidden />
            <p className="text-sm text-muted-foreground">Your bag is empty.</p>
            <Link
              to="/books"
              onClick={() => setDrawerOpen(false)}
              className="press mt-2 inline-flex h-11 items-center rounded-full bg-foreground px-6 text-sm font-semibold text-background hover:bg-foreground/90"
            >
              Browse ebooks
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
              {lineBooks.map(({ book, qty }) => (
                <div key={book.id} className="flex gap-3.5">
                  <Link
                    to="/book/$slug"
                    params={{ slug: book.slug }}
                    onClick={() => setDrawerOpen(false)}
                    className="cover-plate h-24 w-16 shrink-0"
                  >
                    <img
                      src={book.cover}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-[0.85rem] leading-snug font-medium">
                      {book.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">PDF · {book.category}</p>
                    <div className="mt-2.5 flex items-center gap-3">
                      <div className="flex items-center rounded-full border border-border">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${book.title}`}
                          className="press grid h-8 w-8 place-items-center rounded-full hover:bg-muted"
                          onClick={() => setQty(book.id, qty - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-xs tabular-nums">{qty}</span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${book.title}`}
                          className="press grid h-8 w-8 place-items-center rounded-full hover:bg-muted"
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

            <div className="border-t border-border px-5 py-5">
              {saved > 0 ? (
                <div className="mb-3 flex items-center justify-between text-xs text-primary">
                  <span>You save</span>
                  <span className="font-semibold tabular-nums">{formatPrice(saved)}</span>
                </div>
              ) : null}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-lg font-semibold tabular-nums">
                  {formatPrice(cartSubtotal)}
                </span>
              </div>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Download className="h-3.5 w-3.5" aria-hidden />
                Digital delivery — no shipping charges.
              </p>
              <Link
                to="/checkout"
                onClick={() => setDrawerOpen(false)}
                className="press group mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-semibold text-background hover:bg-foreground/90"
              >
                Checkout
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/cart"
                onClick={() => setDrawerOpen(false)}
                className="press mt-2 flex h-11 w-full items-center justify-center rounded-full border border-border text-sm font-semibold hover:bg-muted"
              >
                Review bag
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
