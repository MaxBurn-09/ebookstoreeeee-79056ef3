import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { books, categories } from "@/data/catalog";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Browse Categories — Future Grow Academy" },
      {
        name: "description",
        content:
          "Find your next ebook by topic: relationships, money, self-care, health and parenting.",
      },
      { property: "og:title", content: "Browse Categories — Future Grow Academy" },
      {
        property: "og:description",
        content: "Find your next ebook by topic at Future Grow Academy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeader
        eyebrow="Browse by goal"
        title="Categories"
        subtitle="Five focused collections for real-life change."
      />
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {categories.map((c, i) => {
          const matches = books.filter((book) => book.category === c.name);
          return (
          <Reveal key={c.slug} delay={Math.min(i * 80, 480)}>
            <Link
              to="/books"
              search={{ category: c.name, q: undefined }}
              preload="intent"
              className="group hover-lift relative block overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-gloss)]"
            >
              <div className="relative flex h-44 items-end justify-center overflow-hidden bg-secondary px-4 pt-5 sm:h-52">
                <span aria-hidden className="absolute bottom-0 h-8 w-3/4 rounded-[50%] bg-primary/10 blur-xl" />
                {matches.slice(0, 3).map((book, index, shown) => (
                  <div key={book.id} className="cover-plate relative mb-4 aspect-[2/3] w-[27%] max-w-28 shrink-0 shadow-[var(--shadow-raised)] transition-transform duration-300 group-hover:-translate-y-1" style={{ transform: `rotate(${(index - (shown.length - 1) / 2) * 5}deg)` }}>
                    <img src={book.cover} alt="" loading="lazy" decoding="async" width={160} height={240} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex items-end justify-between gap-3 p-5">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{c.tagline}</p>
                  <h2 className="mt-1 text-xl font-semibold text-foreground sm:text-2xl">{c.name}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">{matches.length} eBooks</p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </div>
            </Link>
          </Reveal>
          );
        })}
      </div>
    </div>
  );
}
