import { createFileRoute } from "@tanstack/react-router";
import { newArrivals } from "@/data/catalog";
import { BookGrid } from "@/components/site/BookGrid";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/new-arrivals")({
  head: () => ({
    meta: [
      { title: "New Arrivals — Future Grow Academy" },
      {
        name: "description",
        content: "Fresh off the press: the newest titles to land on the Future Grow Academy table.",
      },
      { property: "og:title", content: "New Arrivals — Future Grow Academy" },
      {
        property: "og:description",
        content: "Fresh off the press: the newest titles to land on the Future Grow Academy table.",
      },
    ],
  }),
  component: NewArrivalsPage,
});

function NewArrivalsPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeader
        eyebrow="Just landed"
        title="New arrivals"
        subtitle="Freshly unpacked and shelved this week."
      />
      <BookGrid items={newArrivals} />
    </div>
  );
}
