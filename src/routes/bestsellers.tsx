import { createFileRoute } from "@tanstack/react-router";
import { pickBestsellers } from "@/data/catalog";
import { BookGrid } from "@/components/site/BookGrid";
import { SectionHeader } from "@/components/site/SectionHeader";
import { useCatalog } from "@/lib/catalog-store";

export const Route = createFileRoute("/bestsellers")({
  head: () => ({
    meta: [
      { title: "Bestsellers — Future Grow Academy" },
      {
        name: "description",
        content: "Our most downloaded ebooks, ranked by readers around the world.",
      },
      { property: "og:title", content: "Bestsellers — Future Grow Academy" },
      {
        property: "og:description",
        content: "Our most downloaded ebooks, ranked by readers around the world.",
      },
    ],
  }),
  component: BestsellersPage,
});

function BestsellersPage() {
  const { books } = useCatalog();
  const bestsellers = pickBestsellers(books, 12);
  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeader
        eyebrow="Reader favourites"
        title="Bestselling ebooks"
        subtitle="The titles readers download the most, worldwide."
      />
      <BookGrid items={bestsellers} />
    </div>
  );
}
