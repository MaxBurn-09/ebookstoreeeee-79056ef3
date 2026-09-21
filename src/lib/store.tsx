import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { books, bundles, bundleBooks, type Book } from "@/data/catalog";
import { matchBundles, type BundleMatch } from "@/lib/bundle-pricing";

export type CartLine = { id: string; qty: number };

type StoreValue = {
  cart: CartLine[];
  wishlist: string[];
  cartCount: number;
  /** Sum of item prices, before any bundle saving. */
  cartListTotal: number;
  /** Payable amount once bundle combos are applied. */
  cartSubtotal: number;
  bundleDiscount: number;
  appliedBundles: BundleMatch[];
  addBundleToCart: (slug: string) => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  lineBooks: { book: Book; qty: number }[];
};

const StoreContext = createContext<StoreValue | null>(null);

const read = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setCart(read<CartLine[]>("pp_cart", []));
    setWishlist(read<string[]>("pp_wishlist", []));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") window.localStorage.setItem("pp_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (typeof window !== "undefined")
      window.localStorage.setItem("pp_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = useCallback((id: string, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((l) => l.id === id);
      return found
        ? prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l))
        : [...prev, { id, qty }];
    });
    setDrawerOpen(true);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => {
      const has = prev.includes(id);
      toast(has ? "Removed from wishlist" : "Saved to your wishlist");
      return has ? prev.filter((w) => w !== id) : [...prev, id];
    });
  }, []);

  const addBundleToCart = useCallback((slug: string) => {
    const bundle = bundles.find((b) => b.slug === slug);
    if (!bundle) return;
    const ids = bundleBooks(bundle).map((b) => b.id);
    setCart((prev) => {
      const next = [...prev];
      for (const id of ids) {
        const found = next.find((l) => l.id === id);
        if (!found) next.push({ id, qty: 1 });
      }
      return next;
    });
    toast.success(`${bundle.name} added — bundle price applied`);
    setDrawerOpen(true);
  }, []);

  const value = useMemo<StoreValue>(() => {
    const lineBooks = cart
      .map((line) => {
        const book = books.find((b) => b.id === line.id);
        return book ? { book, qty: line.qty } : null;
      })
      .filter(Boolean) as { book: Book; qty: number }[];

    const cartListTotal = lineBooks.reduce((sum, l) => sum + l.book.price * l.qty, 0);
    const { matches, discount } = matchBundles(
      lineBooks.map((l) => ({ slug: l.book.slug, qty: l.qty, price: l.book.price })),
    );

    return {
      cart,
      wishlist,
      drawerOpen,
      setDrawerOpen,
      addToCart,
      addBundleToCart,
      setQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      isWishlisted: (id: string) => wishlist.includes(id),
      cartCount: cart.reduce((sum, l) => sum + l.qty, 0),
      cartListTotal,
      bundleDiscount: discount,
      appliedBundles: matches,
      cartSubtotal: Math.max(0, Math.round((cartListTotal - discount) * 100) / 100),
      lineBooks,
    };
  }, [
    cart,
    wishlist,
    drawerOpen,
    addToCart,
    addBundleToCart,
    setQty,
    removeFromCart,
    clearCart,
    toggleWishlist,
  ]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
