import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, Heart, X, Globe } from "lucide-react";
import { storeConfig } from "@/data/catalog";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/site/BrandLogo";

export function Header({ onSearch }: { onSearch: () => void }) {
  const { cartCount, wishlist, setDrawerOpen } = useStore();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-sm focus:text-background"
      >
        Skip to content
      </a>

      <div className="bg-[oklch(0.18_0.04_25)] text-white">
        <div className="container-page flex h-8 items-center justify-center gap-3 text-[0.65rem] font-medium tracking-[0.12em] uppercase">
          <Globe className="hidden h-3 w-3 opacity-80 sm:block" aria-hidden />
          <span>{storeConfig.announcement}</span>
          <span className="hidden opacity-40 sm:inline">·</span>
          <span className="hidden opacity-80 sm:inline">{storeConfig.announcementSecondary}</span>
        </div>
      </div>

      <div
        className={cn(
          "border-b border-white/8 bg-[oklch(0.16_0.02_250)] text-white transition-[box-shadow,background-color] duration-300",
          scrolled ? "bg-[oklch(0.16_0.02_250)/92] shadow-[0_12px_40px_-24px_oklch(0.12_0.03_250/80%)] backdrop-blur-xl" : "",
        )}
      >
        <div className="container-page flex h-16 items-center gap-3 overflow-hidden lg:h-[4.75rem] lg:gap-5">
          <button
            type="button"
            className="press -ml-2 grid h-11 w-11 shrink-0 place-items-center rounded-md text-white/90 hover:bg-white/8 lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link
            to="/"
            className="group flex min-w-0 max-w-[58%] shrink items-center overflow-hidden sm:max-w-none"
            aria-label="Future Grow Academy home"
          >
            <BrandLogo />
          </Link>

          <nav aria-label="Main" className="mx-auto hidden items-center gap-0.5 lg:flex">
            {storeConfig.nav.map((item) => {
              const active =
                pathname === item.to ||
                (item.to !== "/" && pathname.startsWith(`${item.to}/`)) ||
                (item.to === "/authors" && pathname.startsWith("/program/"));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  preload="intent"
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[0.8rem] font-medium tracking-[0.01em] transition-colors",
                    active ? "text-white" : "text-white/62 hover:text-white",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute inset-x-4 -bottom-0.5 h-[2px] origin-left rounded-full bg-[linear-gradient(90deg,#ff3b1f,#ffb020)] transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={onSearch}
              className="press hidden h-10 items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 text-[0.8rem] text-white/70 hover:border-white/25 hover:text-white md:flex"
            >
              <Search className="h-4 w-4" />
              <span className="pr-5">Search the library</span>
              <kbd className="grid h-5 place-items-center rounded border border-white/15 bg-white/8 px-1.5 font-sans text-[0.62rem] text-white/70">
                /
              </kbd>
            </button>
            <button
              type="button"
              onClick={onSearch}
              aria-label="Search"
              className="press grid h-11 w-11 place-items-center rounded-md hover:bg-white/8 md:hidden"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              to="/wishlist"
              preload="intent"
              aria-label={`Saved ebooks (${wishlist.length})`}
              className="press relative hidden h-11 w-11 place-items-center rounded-md hover:bg-white/8 md:grid"
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 ? <Badge>{wishlist.length}</Badge> : null}
            </Link>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label={`Open bag (${cartCount} items)`}
              className="press relative hidden h-11 w-11 place-items-center rounded-md hover:bg-white/8 md:grid"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 ? <Badge>{cartCount}</Badge> : null}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 animate-[fade-in_0.2s_ease-out_both] bg-black/55"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="absolute inset-y-0 left-0 flex w-[88%] max-w-sm animate-[slide-right_0.28s_cubic-bezier(0.22,1,0.36,1)_both] flex-col bg-[oklch(0.16_0.02_250)] p-5 text-white shadow-[var(--shadow-overlay)]"
          >
            <div className="flex items-center justify-between gap-3">
              <BrandLogo size="sm" />
              <button
                ref={closeRef}
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="press grid h-10 w-10 place-items-center rounded-md hover:bg-white/8"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-8 flex flex-col">
              {storeConfig.nav.map((item) => {
                const active =
                  pathname === item.to ||
                  (item.to !== "/" && pathname.startsWith(`${item.to}/`)) ||
                  (item.to === "/authors" && pathname.startsWith("/program/"));
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "border-b border-white/8 py-3.5 text-[0.98rem] font-medium transition-colors",
                      active ? "text-white" : "text-white/70 hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <p className="mt-auto pt-8 text-xs leading-relaxed text-white/50">
              Digital library · Instant PDF worldwide
              <br />
              {storeConfig.email}
            </p>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute top-1.5 right-1.5 grid h-4 min-w-4 animate-[zoom-in-soft_0.25s_ease-out_both] place-items-center rounded-full bg-[linear-gradient(135deg,#ff3b1f,#ff8a00)] px-1 text-[0.58rem] font-semibold text-white">
      {children}
    </span>
  );
}
