import { createFileRoute } from "@tanstack/react-router";
import { books } from "@/data/catalog";
import { BookCard } from "@/components/site/BookCard";
import { SectionHeader } from "@/components/site/SectionHeader";

type BooksSearch = { q?: string | undefined; category?: string | undefined };

export const Route = createFileRoute("/books")({
  validateSearch: (search: Record<string, unknown>): BooksSearch => ({
    q: typeof search.q === "string" && search.q ? search.q : undefined,
    category:
      typeof search.category === "string" && search.category ? search.category : undefined,
  }),
  head: () => ({
    meta: [
      { title: "All Books — Page & Pine Bookshop" },
      {
        name: "description",
        content:
          "Browse the full Page & Pine shelf: fiction, non-fiction, self-help, romance, mystery and classics, hand-picked by our booksellers.",
      },
      { property: "og:title", content: "All Books — Page & Pine Bookshop" },
      {
        property: "og:description",
        content: "Browse every title on the Page & Pine shelf, hand-picked by our booksellers.",
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
      b.author.toLowerCase().includes(needle) ||
      b.category.toLowerCase().includes(needle);
    return matchesCategory && matchesQuery;
  });

  const cats = ["All", ...Array.from(new Set(books.map((b) => b.category)))];

  return (
    <div className="container py-14">
      <SectionHeader
        eyebrow="The shelf"
        title={q ? `Results for “${q}”` : category ? category : "All books"}
        subtitle={`${filtered.length} title${filtered.length === 1 ? "" : "s"} available`}
      />

      <div className="mb-8 flex flex-wrap gap-2">
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
              className={`rounded-full border px-4 py-2 text-[0.68rem] font-semibold tracking-[0.14em] uppercase transition-colors ${
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
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      )}
    </div>
  );
}
