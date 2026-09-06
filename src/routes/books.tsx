import { createFileRoute } from "@tanstack/react-router";
import { books } from "@/data/catalog";
import { BookGrid } from "@/components/site/BookGrid";
import { SectionHeader } from "@/components/site/SectionHeader";

type BooksSearch = { q?: string | undefined; category?: string | undefined };

export const Route = createFileRoute("/books")({
  validateSearch: (search: Record<string, unknown>): BooksSearch => ({
    q: typeof search["q"] === "string" && search["q"] ? search["q"] : undefined,
    category:
      typeof search["category"] === "string" && search["category"]
        ? search["category"]
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: "All eBooks — Future Grow Academy" },
      {
        name: "description",
        content:
          "Browse every Future Grow Academy ebook: mindset, money, relationships, parenting and health. Instant PDF download worldwide for $2.97.",
      },
      { property: "og:title", content: "All eBooks — Future Grow Academy" },
      {
        property: "og:description",
        content: "Every Future Grow Academy ebook, instantly downloadable for $2.97.",
      },
    ],
  }),
  component: BooksPage,
});

function BooksPage() {
  const { q, category } = Route.useSearch();
  const navigate = Route.useNavigate();

  const filtered = books.filter((b) => {
    const matchesCategory = !category || b.category === category;
    const needle = q?.toLowerCase();
    const matchesQuery =
      !needle ||
      b.title.toLowerCase().includes(needle) ||
      b.blurb.toLowerCase().includes(needle) ||
      b.category.toLowerCase().includes(needle);
    return matchesCategory && matchesQuery;
  });

  const cats = ["All", ...Array.from(new Set(books.map((b) => b.category)))];

  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeader
        eyebrow="The library"
        title={q ? `Results for “${q}”` : category ? category : "All ebooks"}
        subtitle={`${filtered.length} ebook${filtered.length === 1 ? "" : "s"} available for instant download`}
      />

      <div className="mb-8 -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        {cats.map((c) => {
          const active = c === "All" ? !category : category === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() =>
                navigate({
                  to: ".",
                  search: (prev) => ({ ...prev, category: c === "All" ? undefined : c }),
                })
              }
              className={`shrink-0 snap-start rounded-full border px-4 py-2 text-[0.68rem] font-semibold tracking-[0.14em] uppercase transition-colors ${
                active
                  ? "border-forest bg-forest text-forest-foreground"
                  : "border-border text-muted-foreground hover:border-forest hover:text-forest"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted-foreground">
          No books matched. Try another search.
        </p>
      ) : (
        <BookGrid items={filtered} />
      )}
    </div>
  );
}
