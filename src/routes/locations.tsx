import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe2, MapPin } from "lucide-react";
import { locations, usaLocations, indiaLocations, type Location } from "@/data/locations";
import { Reveal } from "@/components/site/Reveal";
import { pageHead, breadcrumbLd, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/locations")({
  head: () =>
    pageHead({
      title: "eBooks for Readers in the USA & India | Future Grow Academy",
      description:
        "Instant-download self-growth ebooks for readers in New York, Los Angeles, Chicago, Delhi, Mumbai, Bangalore and 12 more cities. $2.97 per title, no shipping.",
      path: "/locations",
      jsonLd: [
        breadcrumbLd([
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Future Grow Academy service areas",
          itemListElement: locations.map((l, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `${l.city} ebooks`,
            url: `${SITE_URL}/locations/${l.slug}`,
          })),
        },
      ],
    }),
  component: LocationsPage,
});

function LocationsPage() {
  return (
    <div className="section-y">
      <div className="container-page">
        <nav aria-label="Breadcrumb" className="text-[0.75rem] text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="px-2">/</span>
          <span className="text-foreground">Locations</span>
        </nav>

        <Reveal>
          <p className="eyebrow mt-8">Where our readers are</p>
          <h1 className="mt-3 max-w-3xl text-3xl leading-[1.08] sm:text-5xl">
            Self-growth ebooks delivered instantly across America and India
          </h1>
          <p className="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground">
            Everything we publish is a digital PDF, so there is no shipping, no customs and no
            waiting — wherever you read from. These pages cover the cities our readers order from
            most, with the titles and questions that come up locally.
          </p>
        </Reveal>

        <Group title="United States" icon={<Globe2 className="h-4 w-4" />} items={usaLocations} />
        <Group title="India" icon={<MapPin className="h-4 w-4" />} items={indiaLocations} />

        <Reveal className="mt-16 block rule-top pt-10">
          <p className="max-w-2xl text-[0.9rem] leading-relaxed text-muted-foreground">
            Not on the list? Every ebook downloads worldwide the moment your payment clears —
            readers in more than 40 countries use the same checkout.{" "}
            <Link to="/books" className="link-sweep text-foreground">
              Browse all ebooks
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </div>
  );
}

function Group({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: Location[];
}) {
  return (
    <section className="mt-14">
      <h2 className="flex items-center gap-2 text-lg">
        <span className="text-primary" aria-hidden>
          {icon}
        </span>
        {title}
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((l, i) => (
          <Reveal key={l.slug} delay={Math.min(i * 50, 350)} className="h-full">
            <Link
              to="/locations/$slug"
              params={{ slug: l.slug }}
              preload="intent"
              className="hover-lift group flex h-full flex-col rounded-xl border border-border bg-card p-5"
            >
              <span className="eyebrow">{l.region}</span>
              <span className="mt-1.5 text-[1.05rem] font-semibold">{l.city}</span>
              <span className="mt-2 line-clamp-3 text-[0.82rem] leading-relaxed text-muted-foreground">
                Instant access to English-language ebooks on {l.focus.join(", ")}, available online
                throughout {l.city} and {l.region}.
              </span>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[0.78rem] font-medium text-primary">
                Read more
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
