import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { books, type Book } from "@/data/catalog";

export type CartLine = { id: string; qty: number };

type StoreValue = {
  cart: CartLine[];
  wishlist: string[];
  cartCount: number;
  cartSubtotal: number;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
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

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => {
      const has = prev.includes(id);
      toast(has ? "Removed from wishlist" : "Saved to your wishlist");
      return has ? prev.filter((w) => w !== id) : [...prev, id];
    });
  }, []);

  const value = useMemo<StoreValue>(() => {
    const lineBooks = cart
      .map((line) => {
        const book = books.find((b) => b.id === line.id);
        return book ? { book, qty: line.qty } : null;
      })
      .filter(Boolean) as { book: Book; qty: number }[];

    return {
      cart,
      wishlist,
      drawerOpen,
      setDrawerOpen,
      addToCart,
      setQty,
      removeFromCart,
      toggleWishlist,
      isWishlisted: (id: string) => wishlist.includes(id),
      cartCount: cart.reduce((sum, l) => sum + l.qty, 0),
      cartSubtotal: lineBooks.reduce((sum, l) => sum + l.book.price * l.qty, 0),
      lineBooks,
    };
  }, [cart, wishlist, drawerOpen, addToCart, setQty, removeFromCart, toggleWishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
