import { createFileRoute, Link } from "@tanstack/react-router";
import { authors } from "@/data/catalog";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/authors")({
  head: () => ({
    meta: [
      { title: "Featured Authors — Page & Pine Bookshop" },
      {
        name: "description",
        content: "Meet the writers we keep recommending — novelists, essayists and memoirists.",
      },
      { property: "og:title", content: "Featured Authors — Page & Pine Bookshop" },
      {
        property: "og:description",
        content: "Meet the writers we keep recommending at Page & Pine.",
      },
    ],
  }),
  component: AuthorsPage,
});

function AuthorsPage() {
  return (
    <div className="container py-14">
      <SectionHeader
        eyebrow="In conversation"
        title="Authors we love"
        subtitle="The voices behind our most-recommended shelves."
      />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {authors.map((a) => (
          <article key={a.slug} className="text-center">
            <img
              src={a.portrait}
              alt={`Portrait of ${a.name}`}
              loading="lazy"
              className="mx-auto h-40 w-40 rounded-full object-cover"
            />
            <h2 className="mt-5 font-serif text-xl">{a.name}</h2>
            <p className="mt-1 text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
              {a.books} books
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{a.note}</p>
            <Link
              to="/books"
              search={{ q: a.name, category: undefined }}
              className="mt-4 inline-block text-[0.68rem] font-semibold tracking-[0.16em] text-forest uppercase hover:text-primary"
            >
              View titles
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
