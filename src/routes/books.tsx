import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SlidersHorizontal, X } from "lucide-react";
import { books, categories } from "@/data/catalog";
import { BookCard } from "@/components/site/BookCard";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

type BooksSearch = { q?: string | undefined; category?: string | undefined };

const SORTS = [
  { id: "popular", label: "Most popular" },
  { id: "rating", label: "Top rated" },
  { id: "new", label: "Newest" },
  { id: "price-asc", label: "Price: low to high" },
] as const;

const PER_PAGE = 8;

export const Route = createFileRoute("/books")({
  validateSearch: (search: Record<string, unknown>): BooksSearch => ({
    q: typeof search["q"] === "string" && search["q"] ? search["q"] : undefined,
    category:
      typeof search["category"] === "string" && search["category"] ? search["category"] : undefined,
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

const norm = (value: string) => value.toLowerCase().replace(/\s+/g, "-");

function BooksPage() {
  const { q, category } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [sort, setSort] = useState<(typeof SORTS)[number]["id"]>("popular");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const needle = q?.toLowerCase();
    const list = books.filter((b) => {
      const matchesCategory = !category || norm(b.category) === norm(category);
      const matchesQuery =
        !needle ||
        b.title.toLowerCase().includes(needle) ||
        b.blurb.toLowerCase().includes(needle) ||
        b.category.toLowerCase().includes(needle);
      return matchesCategory && matchesQuery;
    });
    const sorted = [...list];
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    else if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "new") sorted.reverse();
    else sorted.sort((a, b) => b.bought - a.bought);
    return sorted;
  }, [q, category, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pages);
  const visible = filtered.slice(0, current * PER_PAGE);
  const activeCategory = categories.find((c) => norm(c.name) === norm(category ?? ""));

  return (
    <div className="pb-16">
      <header className="border-b border-border bg-secondary/50">
        <div className="container-page py-10 sm:py-14">
          <p className="eyebrow">The library</p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-[2.4rem]">
            {q ? `Results for “${q}”` : (activeCategory?.name ?? "All ebooks")}
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            {activeCategory?.tagline ??
              "Every title is a practical, illustrated PDF you can download the moment you buy."}
          </p>
        </div>
      </header>

      <div className="container-page sticky top-24 z-30 -mx-0 bg-background/92 py-4 backdrop-blur-md">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="no-scrollbar -mx-1 flex snap-x gap-2 overflow-x-auto px-1">
            <Chip
              active={!category}
              onClick={() => navigate({ to: ".", search: (p) => ({ ...p, category: undefined }) })}
            >
              All
            </Chip>
            {categories.map((c) => (
              <Chip
                key={c.slug}
                active={norm(category ?? "") === c.slug}
                onClick={() => {
                  setPage(1);
                  navigate({ to: ".", search: (p) => ({ ...p, category: c.slug }) });
                }}
              >
                {c.name}
              </Chip>
            ))}
          </div>

          <label className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            <span className="sr-only sm:not-sr-only">Sort</span>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value as typeof sort);
                setPage(1);
              }}
              className="h-10 rounded-full border border-border bg-card px-3 text-xs font-medium text-foreground outline-none hover:border-foreground/30"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {q ? (
          <button
            type="button"
            onClick={() => navigate({ to: ".", search: (p) => ({ ...p, q: undefined }) })}
            className="press mt-3 inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-[0.72rem] font-medium"
          >
            “{q}” <X className="h-3 w-3" />
          </button>
        ) : null}
      </div>

      <div className="container-page pt-6">
        <p className="text-xs text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "ebook" : "ebooks"}
        </p>

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="text-lg font-semibold">Nothing matched that search</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              Try a broader word, or start from one of our shelves below.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  to="/books"
                  search={{ q: undefined, category: c.slug }}
                  className="press rounded-full border border-border px-4 py-2 text-xs font-medium hover:bg-muted"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
              {visible.map((book, i) => (
                <Reveal key={book.id} delay={Math.min((i % 4) * 60, 180)}>
                  <BookCard book={book} priority={i < 4} />
                </Reveal>
              ))}
            </div>

            {current < pages ? (
              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={() => setPage(current + 1)}
                  className="press h-12 rounded-full border border-border px-8 text-sm font-semibold hover:border-foreground/30 hover:bg-muted"
                >
                  Load more ({filtered.length - visible.length} left)
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "press h-10 shrink-0 snap-start rounded-full border px-4 text-xs font-semibold",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
