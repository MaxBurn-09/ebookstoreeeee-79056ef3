import { Link } from "@tanstack/react-router";
import { BookOpen, Instagram, Twitter, Facebook } from "lucide-react";
import { storeConfig, categories } from "@/data/catalog";

export function Footer() {
  return (
    <footer className="mt-20 bg-forest text-forest-foreground">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <span className="font-serif text-xl">{storeConfig.name}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm opacity-80">
            An independent bookshop for slow readers — curated shelves, honest recommendations and
            beautifully made editions.
          </p>
          <div className="mt-5 flex gap-3">
            {[Instagram, Twitter, Facebook].map((Icon, i) => (
              <span
                key={i}
                className="grid h-9 w-9 place-items-center rounded-full border border-forest-foreground/25"
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[0.7rem] tracking-[0.2em] uppercase opacity-70">Shop</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {storeConfig.nav.slice(1).map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="opacity-80 hover:opacity-100">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[0.7rem] tracking-[0.2em] uppercase opacity-70">Categories</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/books"
                  search={{ category: c.name, q: undefined }}
                  className="opacity-80 hover:opacity-100"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[0.7rem] tracking-[0.2em] uppercase opacity-70">Visit us</h3>
          <p className="mt-4 text-sm opacity-80">
            14 Linden Lane, Bandra West
            <br />
            Mumbai 400050, India
          </p>
          <p className="mt-3 text-sm opacity-80">Mon–Sat · 10am – 8pm</p>
          <p className="mt-3 text-sm opacity-80">hello@pageandpine.in</p>
        </div>
      </div>

      <div className="border-t border-forest-foreground/15">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs opacity-70 sm:flex-row">
          <p>© {new Date().getFullYear()} {storeConfig.name}. All rights reserved.</p>
          <p>Secure payments · Easy 7-day returns</p>
        </div>
      </div>
    </footer>
  );
}
