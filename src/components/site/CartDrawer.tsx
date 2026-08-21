import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, X, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/data/catalog";
import { useStore } from "@/lib/store";

export function CartDrawer() {
  const { drawerOpen, setDrawerOpen, lineBooks, setQty, removeFromCart, cartSubtotal } = useStore();
  if (!drawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-charcoal/50" onClick={() => setDrawerOpen(false)} />
      <aside
        role="dialog"
        aria-label="Shopping cart"
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-background shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-serif text-xl">Your bag</h2>
          <button type="button" aria-label="Close cart" onClick={() => setDrawerOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {lineBooks.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="h-10 w-10 text-taupe" />
            <p className="text-sm text-muted-foreground">Your bag is empty — go find a good story.</p>
            <Link
              to="/books"
              onClick={() => setDrawerOpen(false)}
              className="mt-2 rounded-sm bg-forest px-5 py-2.5 text-[0.7rem] font-semibold tracking-[0.16em] text-forest-foreground uppercase"
            >
              Browse books
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              {lineBooks.map(({ book, qty }) => (
                <div key={book.id} className="flex gap-3">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="h-24 w-16 rounded-sm object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{book.title}</p>
                    <p className="text-xs text-muted-foreground">{book.author}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center rounded-sm border border-border">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          className="grid h-7 w-7 place-items-center"
                          onClick={() => setQty(book.id, qty - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-xs">{qty}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          className="grid h-7 w-7 place-items-center"
                          onClick={() => setQty(book.id, qty + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${book.title}`}
                        onClick={() => removeFromCart(book.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-semibold">{formatPrice(book.price * qty)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-border px-5 py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">{formatPrice(cartSubtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
              <button
                type="button"
                className="mt-4 w-full rounded-sm bg-forest px-5 py-3 text-[0.7rem] font-semibold tracking-[0.16em] text-forest-foreground uppercase hover:bg-charcoal"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
