import { Link, useRouterState } from "@tanstack/react-router";
import { Home, LibraryBig, Heart, ShoppingBag, Search } from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/books", label: "Shop", icon: LibraryBig },
  { to: "/wishlist", label: "Saved", icon: Heart },
] as const;

export function MobileTabBar({ onSearch }: { onSearch: () => void }) {
  const { cartCount, wishlist, setDrawerOpen } = useStore();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[oklch(0.16_0.02_250)/96] pb-[env(safe-area-inset-bottom)] text-white backdrop-blur-md md:hidden"
    >
      <ul className="grid grid-cols-5">
        {tabs.map((tab) => {
          const active = pathname === tab.to;
          const Icon = tab.icon;
          return (
            <li key={tab.to}>
              <Link
                to={tab.to}
                preload="intent"
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-14 flex-col items-center justify-center gap-1 text-[0.62rem] font-medium transition-colors",
                  active ? "text-white" : "text-white/55",
                )}
              >
                <span className="relative">
                  <Icon className="h-5 w-5" strokeWidth={active ? 2.2 : 1.7} />
                  {tab.to === "/wishlist" && wishlist.length > 0 ? <Dot /> : null}
                </span>
                {tab.label}
              </Link>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            onClick={onSearch}
            className="flex h-14 w-full flex-col items-center justify-center gap-1 text-[0.62rem] font-medium text-white/55 transition-colors"
          >
            <Search className="h-5 w-5" strokeWidth={1.7} />
            Search
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="flex h-14 w-full flex-col items-center justify-center gap-1 text-[0.62rem] font-medium text-white/55 transition-colors"
          >
            <span className="relative">
              <ShoppingBag className="h-5 w-5" strokeWidth={1.7} />
              {cartCount > 0 ? <Dot /> : null}
            </span>
            Bag
          </button>
        </li>
      </ul>
    </nav>
  );
}

function Dot() {
  return (
    <span className="absolute -top-0.5 -right-1 h-2 w-2 rounded-full bg-[linear-gradient(135deg,#ff3b1f,#ff8a00)] ring-2 ring-[oklch(0.16_0.02_250)]" />
  );
}
