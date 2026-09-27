import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { books, bundles, bundleBooks, type Book } from "@/data/catalog";
import { matchBundles } from "@/lib/bundle-pricing";
import { StoreContext, type StoreValue, type CartLine } from "@/lib/store";

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
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    setCart(read<CartLine[]>("pp_cart", []));
    setWishlist(read<string[]>("pp_wishlist", []));
    setRestored(true);
  }, []);

  useEffect(() => {
    if (restored && typeof window !== "undefined") window.localStorage.setItem("pp_cart", JSON.stringify(cart));
  }, [cart, restored]);

  useEffect(() => {
    if (restored && typeof window !== "undefined")
      window.localStorage.setItem("pp_wishlist", JSON.stringify(wishlist));
  }, [wishlist, restored]);

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
    setDrawerOpen(false);
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

