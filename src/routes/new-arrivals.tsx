import { createFileRoute } from "@tanstack/react-router";
import { newArrivals } from "@/data/catalog";
import { BookGrid } from "@/components/site/BookGrid";
import { SectionHeader } from "@/components/site/SectionHeader";

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
  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeader
        eyebrow="Just published"
        title="New additions"
        subtitle="Just published and ready to download."
      />
      <BookGrid items={newArrivals} />
    </div>
  );
}
