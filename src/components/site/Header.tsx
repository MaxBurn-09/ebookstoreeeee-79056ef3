import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, Heart, X, BookOpen } from "lucide-react";
import { storeConfig } from "@/data/catalog";
import { useStore } from "@/lib/store";

export function Header() {
  const { cartCount, wishlist, setDrawerOpen } = useStore();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/books", search: { q: q.trim() || undefined, category: undefined } });
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-forest text-forest-foreground">
        <div className="container flex h-9 items-center justify-center gap-3 text-[0.66rem] tracking-[0.18em] uppercase">
          <span>{storeConfig.announcement}</span>
          <span className="hidden opacity-70 sm:inline">•</span>
          <span className="hidden opacity-70 sm:inline">{storeConfig.announcementSecondary}</span>
        </div>
      </div>

      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center gap-4">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-sm lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link to="/" className="flex shrink-0 items-center gap-2">
            <BookOpen className="h-6 w-6 text-forest" />
            <span className="font-serif text-xl leading-none">
              {storeConfig.name}
              <span className="block text-[0.55rem] tracking-[0.3em] text-muted-foreground uppercase">
                {storeConfig.tagline}
              </span>
            </span>
          </Link>

          <nav className="mx-auto hidden items-center gap-6 lg:flex">
            {storeConfig.nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeProps={{ className: "text-primary" }}
                className="text-[0.72rem] font-medium tracking-[0.14em] uppercase transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <form onSubmit={submit} className="ml-auto hidden max-w-xs flex-1 items-center md:flex">
            <div className="flex w-full items-center gap-2 rounded-sm border border-border bg-card px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
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
              aria-label="Wishlist"
              className="relative grid h-10 w-10 place-items-center rounded-sm hover:text-primary"
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 ? <Badge>{wishlist.length}</Badge> : null}
            </Link>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open cart"
              className="relative grid h-10 w-10 place-items-center rounded-sm hover:text-primary"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 ? <Badge>{cartCount}</Badge> : null}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-charcoal/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[82%] max-w-sm flex-col bg-background p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="font-serif text-lg">{storeConfig.name}</span>
              <button type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={submit} className="mt-5 flex items-center gap-2 rounded-sm border border-border px-3 py-2">
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
              {storeConfig.nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-3 text-sm tracking-[0.1em] uppercase"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute top-1 right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[0.6rem] font-semibold text-gold-foreground">
      {children}
    </span>
  );
}
