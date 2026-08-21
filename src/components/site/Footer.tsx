import { Link } from "@tanstack/react-router";
import { BookOpen, Instagram, Twitter, Facebook } from "lucide-react";
import { storeConfig, categories } from "@/data/catalog";
import { Reveal } from "./Reveal";

const socials = [
  { Icon: Instagram, label: "Instagram" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Facebook, label: "Facebook" },
];

export function Footer() {
  return (
    <footer className="grain relative mt-20 overflow-hidden bg-forest text-forest-foreground">
      <div
        aria-hidden
        className="float-slow pointer-events-none absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
      />
      <div className="container-page relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal>
          <div className="group flex items-center gap-2">
            <BookOpen className="h-6 w-6 transition-transform duration-500 group-hover:-rotate-6" />
            <span className="font-serif text-xl">{storeConfig.name}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed opacity-80">
            An independent bookshop for slow readers — curated shelves, honest recommendations and
            beautifully made editions.
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-forest-foreground/25 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-gold-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={90}>
          <h3 className="text-[0.7rem] tracking-[0.2em] uppercase opacity-70">Shop</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {storeConfig.nav.slice(1).map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  preload="intent"
                  className="link-sweep inline-block opacity-80 transition-all duration-300 hover:translate-x-1 hover:text-gold hover:opacity-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={180}>
          <h3 className="text-[0.7rem] tracking-[0.2em] uppercase opacity-70">Categories</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/books"
                  search={{ category: c.name, q: undefined }}
                  className="link-sweep inline-block opacity-80 transition-all duration-300 hover:translate-x-1 hover:text-gold hover:opacity-100"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={270}>
          <h3 className="text-[0.7rem] tracking-[0.2em] uppercase opacity-70">Visit us</h3>
          <p className="mt-4 text-sm leading-relaxed opacity-80">
            14 Linden Lane, Bandra West
            <br />
            Mumbai 400050, India
          </p>
          <p className="mt-3 text-sm opacity-80">Mon–Sat · 10am – 8pm</p>
          <a
            href="mailto:hello@pageandpine.in"
            className="link-sweep mt-3 inline-block text-sm opacity-80 hover:text-gold hover:opacity-100"
          >
            hello@pageandpine.in
          </a>
        </Reveal>
      </div>

      <div className="relative border-t border-forest-foreground/15">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs opacity-70 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {storeConfig.name}. Built by hand in Mumbai.
          </p>
          <p>Secure payments · Easy 7-day returns</p>
        </div>
      </div>
    </footer>
  );
}
