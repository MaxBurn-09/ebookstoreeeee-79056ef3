import type { ComponentType, SVGProps } from "react";
import { Link } from "@tanstack/react-router";
import { Facebook, Globe, Instagram, Linkedin, Mail, MapPin, Youtube, type LucideIcon } from "lucide-react";
import { storeConfig, categories } from "@/data/catalog";
import logo from "@/assets/fga-logo.png.asset.json";
import { Reveal } from "@/components/site/Reveal";

type IconProps = SVGProps<SVGSVGElement>;

function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

function PinterestIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.739.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.966 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12Z" />
    </svg>
  );
}

const socialIcons: Record<string, LucideIcon | ComponentType<IconProps>> = {
  Facebook,
  X: XIcon,
  Instagram,
  YouTube: Youtube,
  Pinterest: PinterestIcon,
  LinkedIn: Linkedin,
};

const linkClass =
  "text-sm text-muted-foreground transition-colors hover:text-foreground";

export function Footer() {
  const year = 2026;

  return (
    <footer className="border-t border-border bg-card">
      <div className="container-page grid gap-7 py-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-9 sm:py-14 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12">
        <Reveal>
          <Link to="/" aria-label="Future Grow Academy — home" className="inline-block">
            <img src={logo.url} alt="Future Grow Academy" loading="lazy" className="h-11 w-auto" />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            eBooks for a brighter tomorrow. {storeConfig.tagline}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2.5" aria-label="Follow Future Grow Academy">
            {storeConfig.socials.map((s) => {
              const Icon = socialIcons[s.label] ?? Globe;
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={s.label}
                    title={s.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground hover:bg-foreground hover:text-background"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                </li>
              );
            })}
          </ul>

          <p className="mt-7 flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {storeConfig.address}
          </p>
          <a
            href={`mailto:${storeConfig.email}`}
            className="link-sweep mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {storeConfig.email}
          </a>
        </Reveal>

        <Reveal as="nav" aria-label="Quick links" delay={60}>
          <h2 className="eyebrow">Quick Links</h2>
          <ul className="mt-4 space-y-2.5">
            {storeConfig.nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="nav" aria-label="Categories" delay={120}>
          <h2 className="eyebrow">Categories</h2>
          <ul className="mt-4 space-y-2.5">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to="/books" search={{ q: undefined, category: c.slug }} className={linkClass}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="nav" aria-label="Legal" delay={180}>
          <h2 className="eyebrow">Legal</h2>
          <ul className="mt-4 space-y-2.5">
            {storeConfig.legal.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={linkClass}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {storeConfig.name}. All rights reserved.
          </p>
          <p>Digital products · Instant download · Delivered worldwide</p>
        </div>
      </div>
    </footer>
  );
}
