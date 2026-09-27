import { createContext, useContext } from "react";
import type { Book } from "@/data/catalog";
import type { BundleMatch } from "@/lib/bundle-pricing";

export type CartLine = { id: string; qty: number };

export type StoreValue = {
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

export const StoreContext = createContext<StoreValue | null>(null);

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
