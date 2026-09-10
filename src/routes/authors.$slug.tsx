import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { authors } from "@/data/academy";
import { books, formatPrice } from "@/data/catalog";
import { useCatalog } from "@/lib/catalog-store";
import { SectionHeader } from "@/components/site/SectionHeader";
import { BookGrid } from "@/components/site/BookGrid";

export const Route = createFileRoute("/authors/$slug")({
  loader: ({ params }) => {
    const author = authors.find((a) => a.slug === params.slug);
    if (!author) throw notFound();
    return { author };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.author.name} — Future Grow Academy faculty`
          : "Faculty — Future Grow Academy",
      },
    ],
  }),
  component: AuthorDetail,
});

function AuthorDetail() {
  const { author: seed } = Route.useLoaderData();
  const catalog = useCatalog();
  const author = catalog.authors.find((a) => a.slug === seed.slug) ?? seed;
  const titles = catalog.books.filter((b) => (b.authorId ?? "a-ankit") === author.id);

  return (
    <div className="container-page py-10 sm:py-14">
      <p className="text-xs text-muted-foreground">
        <Link to="/authors" className="hover:text-foreground">
          Programmes
        </Link>{" "}
        / Faculty
      </p>
      <SectionHeader eyebrow={author.role} title={author.name} subtitle={`${author.location} · ${author.focus.join(" · ")}`} />
      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{author.bio}</p>
      <section className="mt-12">
        <h2 className="text-xl font-semibold">Ebooks</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {titles.length} title{titles.length === 1 ? "" : "s"} from {formatPrice(2.97)}.
        </p>
        <div className="mt-8">
          <BookGrid items={titles.length ? titles : books.filter((b) => b.authorId === author.id)} />
        </div>
      </section>
    </div>
  );
}
