import { createFileRoute } from "@tanstack/react-router";
import { pickBestsellers } from "@/data/catalog";
import { BookGrid } from "@/components/site/BookGrid";
import { PageHero } from "@/components/site/PageHero";
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
    <>
      <PageHero
        eyebrow="Reader favourites"
        title="Bestselling ebooks"
        subtitle="The titles readers download the most, worldwide."
      />
      <div className="container-page py-10 sm:py-14">
        <BookGrid items={bestsellers} />
      </div>
    </>
  );
}
