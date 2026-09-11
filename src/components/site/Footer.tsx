import { Link } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";
import { storeConfig, categories } from "@/data/catalog";

export function Footer() {
  const year = 2026;

  return (
    <footer className="border-t border-border bg-secondary/60">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" aria-label="Future Grow Academy — home" className="inline-block">
            <img
              src={logo.url}
              alt="Future Grow Academy"
              loading="lazy"
              className="h-11 w-auto"
            />
          </Link>
          <p className="mt-4 max-w-xs text-[0.85rem] leading-relaxed text-muted-foreground">
            {storeConfig.tagline}
          </p>
          <p className="mt-5 flex items-start gap-2 text-[0.82rem] text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {storeConfig.address}
          </p>
          <a
            href={`mailto:${storeConfig.email}`}
            className="link-sweep mt-2 inline-flex items-center gap-2 text-[0.82rem] text-muted-foreground hover:text-foreground"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {storeConfig.email}
          </a>
        </div>

        <nav aria-label="Shop">
          <h2 className="eyebrow">Shop</h2>
          <ul className="mt-4 space-y-2.5">
            {storeConfig.nav.slice(1).map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-[0.85rem] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Categories">
          <h2 className="eyebrow">Categories</h2>
          <ul className="mt-4 space-y-2.5">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/books"
                  search={{ q: undefined, category: c.slug }}
                  className="text-[0.85rem] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow">Follow</h2>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5">
            {storeConfig.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-sweep text-[0.85rem] text-muted-foreground hover:text-foreground"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <h2 className="eyebrow mt-8">Policies</h2>
          <ul className="mt-4 space-y-2.5">
            {storeConfig.legal.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[0.85rem] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-5 text-[0.75rem] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {storeConfig.name}. All rights reserved.
          </p>
          <p>Digital products · Instant download · Delivered worldwide</p>
        </div>
      </div>
    </footer>
  );
}
