import { createFileRoute, Link } from "@tanstack/react-router";
import { categories } from "@/data/catalog";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Browse Categories — Page & Pine Bookshop" },
      {
        name: "description",
        content:
          "Find your next read by genre: fiction, non-fiction, self-help, romance, children's books and classics.",
      },
      { property: "og:title", content: "Browse Categories — Page & Pine Bookshop" },
      {
        property: "og:description",
        content: "Find your next read by genre at Page & Pine.",
      },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="container py-14">
      <SectionHeader
        eyebrow="Browse by mood"
        title="Categories"
        subtitle="Six shelves, endlessly restocked."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.slug}
            to="/books"
            search={{ category: c.name, q: undefined }}
            className="group relative overflow-hidden rounded-lg border border-border"
          >
            <img
              src={c.image}
              alt={`${c.name} books`}
              loading="lazy"
              className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
            <div className="absolute bottom-5 left-5 text-cream">
              <p className="text-[0.62rem] tracking-[0.2em] uppercase opacity-80">{c.tagline}</p>
              <h2 className="mt-1 font-serif text-2xl">{c.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
