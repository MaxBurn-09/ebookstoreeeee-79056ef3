import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, Download, MapPin } from "lucide-react";
import { locationBySlug, locations } from "@/data/locations";
import { books, testimonials, storeConfig } from "@/data/catalog";
import { BookGrid } from "@/components/site/BookGrid";
import { Reveal } from "@/components/site/Reveal";
import { pageHead, breadcrumbLd, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/locations/$slug")({
  loader: ({ params }) => {
    const location = locationBySlug(params.slug);
    if (!location) throw notFound();
    return { location };
  },
  head: ({ loaderData, params }) => {
    const l = loaderData?.location;
    if (!l) return {};
    const title = `Self-Growth eBooks in ${l.city} | Instant PDF Download — $2.97`;
    const description = `${l.city} readers get practical ebooks on ${l.focus.join(", ")} for $2.97 each. Instant PDF download, no shipping, read on any device.`;
    return pageHead({
      title,
      description,
      path: `/locations/${params.slug}`,
      jsonLd: [
        breadcrumbLd([
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: l.city, href: `/locations/${l.slug}` },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Digital self-growth ebooks for ${l.city}`,
          provider: { "@type": "Organization", name: storeConfig.name, url: SITE_URL },
          areaServed: {
            "@type": "City",
            name: l.city,
            containedInPlace: { "@type": "AdministrativeArea", name: l.region },
          },
          serviceType: "Digital ebook download",
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: l.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ],
    });
  },
  component: LocationPage,
});

function LocationPage() {
  const { location: l } = Route.useLoaderData();
  const picks = books
    .filter((b) => l.focus.includes(b.category.toLowerCase()))
    .sort(
      (a, z) =>
        l.focus.indexOf(a.category.toLowerCase()) - l.focus.indexOf(z.category.toLowerCase()),
    )
    .slice(0, 8);
  const quotes = testimonials.slice(0, 2);
  const others = locations.filter((x) => x.country === l.country && x.slug !== l.slug).slice(0, 6);

  return (
    <div className="pb-20">
      <section className="border-b border-border bg-secondary/40 py-14 md:py-20">
        <div className="container-page">
          <nav aria-label="Breadcrumb" className="text-[0.75rem] text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="px-2">/</span>
            <Link to="/locations" className="hover:text-foreground">
              Locations
            </Link>
            <span className="px-2">/</span>
            <span className="text-foreground">{l.city}</span>
          </nav>

          <Reveal>
            <p className="eyebrow mt-8 flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {l.region}, {l.country}
            </p>
            <h1 className="mt-3 max-w-3xl text-3xl leading-[1.08] sm:text-5xl">
              Self-growth ebooks for readers in {l.city}
            </h1>
            <p className="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground">
              {l.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/books"
                className="press inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-[0.85rem] font-medium text-primary-foreground"
              >
                Browse all ebooks
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/categories"
                className="press inline-flex h-11 items-center rounded-full border border-border px-6 text-[0.85rem] font-medium hover:border-foreground/30"
              >
                Reading categories
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <h2 className="text-2xl">What {l.city} readers pick up most</h2>
            <p className="mt-3 text-[0.92rem] leading-relaxed text-muted-foreground">{l.angle}</p>
            <ul className="mt-6 space-y-2.5">
              {[
                `Instant PDF delivery — nothing ships to ${l.city}`,
                `Readable on phone, tablet and laptop, offline`,
                `$2.97 per ebook, regular price $7.50`,
                `Email support answered within 24 hours (${l.timezone})`,
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[0.88rem]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80}>
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-[0.95rem] font-semibold">Service areas around {l.city}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {l.neighbourhoods.map((n) => (
                  <li
                    key={n}
                    className="rounded-full border border-border px-3 py-1 text-[0.75rem] text-muted-foreground"
                  >
                    {n}
                  </li>
                ))}
              </ul>
              <p className="mt-5 flex items-start gap-2 text-[0.8rem] leading-relaxed text-muted-foreground">
                <Download className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                Delivery is digital, so every address in and around {l.city} gets the same instant
                access.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {picks.length > 0 ? (
        <section className="border-y border-border bg-secondary/40 section-y">
          <div className="container-page">
            <h2 className="text-2xl">Recommended for {l.city}</h2>
            <p className="mt-2 text-[0.88rem] text-muted-foreground">
              Chosen from the shelves {l.city} readers open most often.
            </p>
            <BookGrid items={picks} className="mt-8" />
          </div>
        </section>
      ) : null}

      <section className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl">Questions from {l.city}</h2>
            <dl className="mt-6 divide-y divide-border rule-top">
              {l.faq.map((f) => (
                <div key={f.q} className="py-5">
                  <dt className="text-[0.92rem] font-semibold">{f.q}</dt>
                  <dd className="mt-2 text-[0.86rem] leading-relaxed text-muted-foreground">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="text-2xl">What readers say</h2>
            <div className="mt-6 space-y-4">
              {quotes.map((t) => (
                <figure key={t.name} className="rounded-xl border border-border bg-card p-6">
                  <blockquote className="text-[0.9rem] leading-relaxed">“{t.quote}”</blockquote>
                  <figcaption className="mt-4 text-[0.78rem] text-muted-foreground">
                    {t.name} · {t.location}
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-4 text-[0.75rem] text-muted-foreground">
              Reviews are from verified Future Grow Academy readers worldwide.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page rule-top pt-10">
        <h2 className="eyebrow">More {l.country} cities</h2>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link
                to="/locations/$slug"
                params={{ slug: o.slug }}
                className="link-sweep text-[0.85rem] text-muted-foreground hover:text-foreground"
              >
                {o.city}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
