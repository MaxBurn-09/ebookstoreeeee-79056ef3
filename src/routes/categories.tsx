import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/catalog";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Browse Categories — Future Grow Academy" },
      {
        name: "description",
        content:
          "Find your next read by genre: fiction, non-fiction, self-help, romance, children's books and classics.",
      },
      { property: "og:title", content: "Browse Categories — Future Grow Academy" },
      {
        property: "og:description",
        content: "Find your next read by genre at Future Grow Academy.",
      },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeader
        eyebrow="Browse by mood"
        title="Categories"
        subtitle="Six shelves, endlessly restocked."
      />
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {categories.map((c, i) => (
          <Reveal key={c.slug} delay={Math.min(i * 80, 480)}>
            <Link
              to="/books"
              search={{ category: c.name, q: undefined }}
              preload="intent"
              className="group shine hover-lift relative block overflow-hidden rounded-lg border border-border"
            >
              <img
                src={c.cover}
                alt={`${c.name} books`}
                loading="lazy"
                className="h-52 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 sm:h-60 lg:h-64"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 text-cream">
                <p className="text-[0.6rem] tracking-[0.2em] uppercase opacity-80">{c.tagline}</p>
                <h2 className="mt-1 font-serif text-xl sm:text-2xl">{c.name}</h2>
                <span className="mt-1 inline-flex translate-y-2 items-center gap-1.5 text-[0.62rem] font-semibold tracking-[0.18em] text-gold uppercase opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  Browse shelf <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
