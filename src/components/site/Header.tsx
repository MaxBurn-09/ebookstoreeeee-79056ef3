import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, Heart, X, BookOpen } from "lucide-react";
import { storeConfig } from "@/data/catalog";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Header() {
  const { cartCount, wishlist, setDrawerOpen } = useStore();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 220 && y > lastY.current);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/books", search: { q: q.trim() || undefined, category: undefined } });
    setOpen(false);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        hidden && !open && "-translate-y-full",
      )}
    >
      {/* announcement rail — collapses away once you start reading */}
      <div
        className={cn(
          "overflow-hidden bg-forest text-forest-foreground transition-all duration-500",
          scrolled ? "h-0 opacity-0" : "h-9 opacity-100",
        )}
      >
        <div className="container-page flex h-9 items-center justify-center gap-3 text-[0.66rem] tracking-[0.18em] uppercase">
          <span>{storeConfig.announcement}</span>
          <span className="hidden opacity-70 sm:inline">•</span>
          <span className="hidden opacity-70 sm:inline">{storeConfig.announcementSecondary}</span>
        </div>
      </div>

      <div
        className={cn(
          "border-b bg-background/85 backdrop-blur-md transition-all duration-500",
          scrolled ? "border-border/80 shadow-[0_10px_30px_-24px_var(--charcoal)]" : "border-border",
        )}
      >
        <div
          className={cn(
            "container-page flex items-center gap-4 transition-[height] duration-500",
            scrolled ? "h-14" : "h-16",
          )}
        >
          <button
            type="button"
            className="press grid h-10 w-10 place-items-center rounded-sm transition-colors hover:text-primary lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link to="/" className="group flex shrink-0 items-center gap-2">
            <BookOpen className="h-6 w-6 text-forest transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" />
            <span className="font-serif text-xl leading-none">
              {storeConfig.name}
              <span className="block text-[0.55rem] tracking-[0.3em] text-muted-foreground uppercase transition-colors group-hover:text-gold">
                {storeConfig.tagline}
              </span>
            </span>
          </Link>

          <nav className="mx-auto hidden items-center gap-7 lg:flex">
            {storeConfig.nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                preload="intent"
                activeProps={{ className: "text-primary" }}
                className="link-sweep text-[0.72rem] font-medium tracking-[0.14em] uppercase transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <form onSubmit={submit} className="ml-auto hidden max-w-xs flex-1 items-center md:flex">
            <div className="flex w-full items-center gap-2 rounded-sm border border-border bg-card px-3 py-2 transition-all duration-300 focus-within:border-forest focus-within:shadow-[0_0_0_3px_color-mix(in_oklab,var(--forest)_10%,transparent)]">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search books, authors…"
                aria-label="Search books"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </form>

          <div className="ml-auto flex items-center gap-1 md:ml-0">
            <Link
              to="/wishlist"
              preload="intent"
              aria-label="Wishlist"
              className="press group relative grid h-10 w-10 place-items-center rounded-sm hover:text-primary"
            >
              <Heart className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              {wishlist.length > 0 ? <Badge>{wishlist.length}</Badge> : null}
            </Link>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open cart"
              className="press group relative grid h-10 w-10 place-items-center rounded-sm hover:text-primary"
            >
              <ShoppingBag className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
              {cartCount > 0 ? <Badge>{cartCount}</Badge> : null}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 animate-[fade-in_0.3s_ease-out_both] bg-charcoal/55 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[84%] max-w-sm animate-[slide-right_0.45s_cubic-bezier(0.22,1,0.36,1)_both] flex-col bg-background p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="font-serif text-lg">{storeConfig.name}</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="press"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form
              onSubmit={submit}
              className="mt-5 flex items-center gap-2 rounded-sm border border-border px-3 py-2 focus-within:border-forest"
            >
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search books…"
                aria-label="Search books"
                className="w-full bg-transparent text-sm outline-none"
              />
            </form>
            <nav className="mt-6 flex flex-col">
              {storeConfig.nav.map((item, i) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  style={{ animationDelay: `${120 + i * 55}ms` }}
                  className="animate-[slide-right_0.5s_cubic-bezier(0.22,1,0.36,1)_both] border-b border-border py-3 text-sm tracking-[0.1em] uppercase transition-[padding,color] duration-300 hover:pl-2 hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <p className="mt-auto pt-8 text-xs leading-relaxed text-muted-foreground">
              14 Linden Lane, Bandra West
              <br />
              Mon–Sat · 10am – 8pm
            </p>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      key={String(children)}
      className="absolute top-1 right-0.5 grid h-4 min-w-4 animate-[zoom-in-soft_0.35s_cubic-bezier(0.34,1.56,0.64,1)_both] place-items-center rounded-full bg-gold px-1 text-[0.6rem] font-semibold text-gold-foreground"
    >
      {children}
    </span>
  );
}
