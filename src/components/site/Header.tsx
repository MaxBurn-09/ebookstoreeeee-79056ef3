import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, Heart, X } from "lucide-react";
import { storeConfig } from "@/data/catalog";
import logo from "@/assets/fga-logo.png.asset.json";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

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

      <div className="bg-foreground text-background">
        <div className="container-page flex h-8 items-center justify-center gap-3 text-[0.66rem] tracking-[0.1em]">
          <span>{storeConfig.announcement}</span>
          <span className="hidden opacity-50 sm:inline">·</span>
          <span className="hidden opacity-70 sm:inline">{storeConfig.announcementSecondary}</span>
        </div>
      </div>

      <div
        className={cn(
          "border-b bg-background/88 backdrop-blur-md transition-shadow duration-300",
          scrolled ? "border-border shadow-[0_1px_0_var(--border)]" : "border-transparent",
        )}
      >
        <div className="container-page flex h-16 items-center gap-4">
          <button
            type="button"
            className="press -ml-2 grid h-11 w-11 place-items-center rounded-md text-foreground hover:bg-muted lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link
            to="/"
            className="group flex shrink-0 items-center"
            aria-label="Future Grow Academy — home"
          >
            <img
              src={logo.url}
              alt="Future Grow Academy"
              width={480}
              height={160}
              className="h-9 w-auto transition-opacity duration-200 group-hover:opacity-85 sm:h-10"
            />
          </Link>

          <nav aria-label="Main" className="mx-auto hidden items-center gap-1 lg:flex">
            {storeConfig.nav.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  preload="intent"
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-[0.82rem] font-medium transition-colors hover:text-foreground",
                    active ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-px origin-left bg-foreground transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              onClick={onSearch}
              className="press hidden h-10 items-center gap-2 rounded-full border border-border px-3.5 text-[0.8rem] text-muted-foreground hover:border-foreground/25 hover:text-foreground md:flex"
            >
              <Search className="h-4 w-4" />
              <span className="pr-6">Search ebooks</span>
              <kbd className="grid h-5 place-items-center rounded border border-border bg-muted px-1.5 font-sans text-[0.62rem]">
                /
              </kbd>
            </button>
            <button
              type="button"
              onClick={onSearch}
              aria-label="Search"
              className="press grid h-11 w-11 place-items-center rounded-md hover:bg-muted md:hidden"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              to="/wishlist"
              preload="intent"
              aria-label={`Saved ebooks (${wishlist.length})`}
              className="press relative hidden h-11 w-11 place-items-center rounded-md hover:bg-muted md:grid"
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 ? <Badge>{wishlist.length}</Badge> : null}
            </Link>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label={`Open bag (${cartCount} items)`}
              className="press relative hidden h-11 w-11 place-items-center rounded-md hover:bg-muted md:grid"
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
            className="absolute inset-0 animate-[fade-in_0.2s_ease-out_both] bg-charcoal/45"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm animate-[slide-right_0.28s_cubic-bezier(0.22,1,0.36,1)_both] flex-col bg-background p-5 shadow-[var(--shadow-overlay)]"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-base font-semibold">{storeConfig.name}</span>
              <button
                ref={closeRef}
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="press grid h-10 w-10 place-items-center rounded-md hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-6 flex flex-col">
              {storeConfig.nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "border-b border-border py-3.5 text-[0.95rem] font-medium transition-colors",
                    pathname === item.to ? "text-primary" : "hover:text-primary",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <p className="mt-auto pt-8 text-xs leading-relaxed text-muted-foreground">
              {storeConfig.address}
              <br />
              {storeConfig.email}
            </p>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function Mark() {
  return (
    <span
      aria-hidden
      className="grid h-9 w-9 place-items-center rounded-[7px] bg-foreground text-background"
    >
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor">
        <path d="M4 5.5h6a2 2 0 0 1 2 2V19a2 2 0 0 0-2-2H4z" strokeWidth="1.6" />
        <path d="M20 5.5h-6a2 2 0 0 0-2 2V19a2 2 0 0 1 2-2h6z" strokeWidth="1.6" />
      </svg>
    </span>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute top-1.5 right-1.5 grid h-4 min-w-4 animate-[zoom-in-soft_0.25s_ease-out_both] place-items-center rounded-full bg-primary px-1 text-[0.58rem] font-semibold text-primary-foreground">
      {children}
    </span>
  );
}
