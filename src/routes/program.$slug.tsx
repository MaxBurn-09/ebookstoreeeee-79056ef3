import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { programs, authors } from "@/data/academy";
import { books } from "@/data/catalog";
import { useCatalog } from "@/lib/catalog-store";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/data/catalog";
import { SectionHeader } from "@/components/site/SectionHeader";
import { BookCard } from "@/components/site/BookCard";
import { toast } from "sonner";

export const Route = createFileRoute("/program/$slug")({
  loader: ({ params }) => {
    const program = programs.find((p) => p.slug === params.slug);
    if (!program) throw notFound();
    return { program };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.program.title} — Future Grow Academy`
          : "Programme — Future Grow Academy",
      },
      {
        name: "description",
        content: loaderData?.program.summary ?? "A Future Grow Academy programme.",
      },
    ],
  }),
  component: ProgramPage,
});

function ProgramPage() {
  const { program } = Route.useLoaderData();
  const { books: liveBooks, authors: liveAuthors } = useCatalog();
  const { addToCart } = useStore();
  const faculty = liveAuthors.find((a) => a.id === program.facultyId) ?? authors.find((a) => a.id === program.facultyId);
  const titles = program.bookSlugs
    .map((slug) => liveBooks.find((b) => b.slug === slug) ?? books.find((b) => b.slug === slug))
    .filter(Boolean);

  const addAll = () => {
    titles.forEach((book) => addToCart(book!.id));
    toast.success("Programme ebooks added to your bag.");
  };

  return (
    <div className="container-page py-10 sm:py-14">
      <p className="text-xs text-muted-foreground">
        <Link to="/authors" className="hover:text-foreground">
          Programmes
        </Link>{" "}
        / {program.category}
      </p>
      <SectionHeader
        eyebrow={program.duration}
        title={program.title}
        subtitle={program.format}
      />
      <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{program.description}</p>

      <ul className="mt-8 grid gap-3 sm:grid-cols-3">
        {program.outcomes.map((item) => (
          <li key={item} className="flex gap-2 rounded-xl border border-border bg-card p-4 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {item}
          </li>
        ))}
      </ul>

      {faculty ? (
        <p className="mt-8 text-sm">
          Led by{" "}
          <Link to="/authors/$slug" params={{ slug: faculty.slug }} className="link-sweep font-semibold">
            {faculty.name}
          </Link>
          <span className="text-muted-foreground"> · {faculty.role}</span>
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={addAll}
          className="press inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background"
        >
          Add all ebooks to bag
        </button>
        <Link
          to="/contact"
          className="press inline-flex h-12 items-center rounded-full border border-border px-6 text-sm font-semibold"
        >
          Ask about this programme
        </Link>
      </div>

      <section className="mt-14">
        <h2 className="text-xl font-semibold">Included ebooks</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {titles.length} titles · from {formatPrice(2.97)} each
        </p>
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {titles.map((book) => (
            <BookCard key={book!.id} book={book!} />
          ))}
        </div>
      </section>

      <Link to="/authors" className="link-sweep mt-12 inline-flex items-center gap-2 text-sm font-semibold">
        All programmes <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
