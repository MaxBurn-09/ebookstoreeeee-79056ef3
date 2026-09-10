import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Globe, Phone } from "lucide-react";
import { storeConfig } from "@/data/catalog";
import { useCatalog } from "@/lib/catalog-store";
import { BrandLogo } from "@/components/site/BrandLogo";

export function Footer() {
  const year = 2026;
  const { categories } = useCatalog();

  return (
    <footer className="bg-[oklch(0.14_0.02_250)] text-white">
      <div className="border-b border-white/8 bg-[linear-gradient(90deg,oklch(0.45_0.18_30/18%),transparent_40%,oklch(0.7_0.15_70/12%))]">
        <div className="container-page flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-[0.8rem] text-white/75">
            <Globe className="h-4 w-4 shrink-0 text-[#ff8a00]" aria-hidden />
            Trusted by readers in the USA, UK, EU, UAE, India and worldwide
          </p>
          <p className="text-[0.78rem] text-white/50">USD pricing · Instant PDF · No shipping wait</p>
        </div>
      </div>

      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link to="/" aria-label="Future Grow Academy home" className="inline-block">
            <BrandLogo size="lg" />
          </Link>
          <p className="mt-5 max-w-sm text-[0.9rem] leading-relaxed text-white/62">
            {storeConfig.tagline} Practical ebooks you can finish and apply — downloaded instantly on any device.
          </p>
          <p className="mt-6 flex items-start gap-2 text-[0.82rem] text-white/55">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {storeConfig.address}
          </p>
          <a
            href={`mailto:${storeConfig.email}`}
            className="mt-2 inline-flex items-center gap-2 text-[0.82rem] text-white/55 hover:text-white"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {storeConfig.email}
          </a>
          <a
            href={storeConfig.phoneHref}
            className="mt-2 flex items-center gap-2 text-[0.82rem] text-white/55 hover:text-white"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {storeConfig.phone}
          </a>
        </div>

        <nav aria-label="Explore" className="lg:col-span-2">
          <h2 className="text-[0.68rem] font-semibold tracking-[0.18em] text-white/45 uppercase">Explore</h2>
          <ul className="mt-4 space-y-2.5">
            {storeConfig.nav.slice(1).map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-[0.88rem] text-white/70 transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Categories" className="lg:col-span-2">
          <h2 className="text-[0.68rem] font-semibold tracking-[0.18em] text-white/45 uppercase">Categories</h2>
          <ul className="mt-4 space-y-2.5">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/books"
                  search={{ q: undefined, category: c.slug }}
                  className="text-[0.88rem] text-white/70 transition-colors hover:text-white"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <h2 className="text-[0.68rem] font-semibold tracking-[0.18em] text-white/45 uppercase">Follow</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {storeConfig.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-9 items-center rounded-full border border-white/12 px-3.5 text-[0.75rem] font-medium text-white/75 transition-colors hover:border-white/35 hover:bg-white/8 hover:text-white"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <h2 className="mt-8 text-[0.68rem] font-semibold tracking-[0.18em] text-white/45 uppercase">Policies</h2>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            {storeConfig.legal.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[0.8rem] text-white/50 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Link to="/admin" className="text-[0.8rem] text-white/35 hover:text-white/70">
                Store admin
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="container-page flex flex-col gap-2 py-5 text-[0.75rem] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {storeConfig.name}. All rights reserved.
          </p>
          <p>Cards · UPI · Wallets · Secure checkout worldwide</p>
        </div>
      </div>
    </footer>
  );
}
