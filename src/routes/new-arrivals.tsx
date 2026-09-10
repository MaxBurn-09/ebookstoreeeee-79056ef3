import { createFileRoute } from "@tanstack/react-router";
import { pickNewArrivals } from "@/data/catalog";
import { BookGrid } from "@/components/site/BookGrid";
import { PageHero } from "@/components/site/PageHero";
import { useCatalog } from "@/lib/catalog-store";

export const Route = createFileRoute("/new-arrivals")({
  head: () => ({
    meta: [
      { title: "New Additions — Future Grow Academy" },
      {
        name: "description",
        content: "The newest Future Grow Academy ebooks, ready for instant download.",
      },
      { property: "og:title", content: "New Additions — Future Grow Academy" },
      {
        property: "og:description",
        content: "The newest Future Grow Academy ebooks, ready for instant download.",
      },
    ],
  }),
  component: NewArrivalsPage,
});

function NewArrivalsPage() {
  const { books } = useCatalog();
  const newArrivals = pickNewArrivals(books, 12);
  return (
    <>
      <PageHero
        eyebrow="Just published"
        title="New additions"
        subtitle="Just published and ready to download worldwide."
      />
      <div className="container-page py-10 sm:py-14">
        <BookGrid items={newArrivals} />
      </div>
    </>
  );
}
