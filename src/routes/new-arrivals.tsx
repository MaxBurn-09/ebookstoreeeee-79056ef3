import { createFileRoute } from "@tanstack/react-router";
import { newArrivals } from "@/data/catalog";
import { BookCard } from "@/components/site/BookCard";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/new-arrivals")({
  head: () => ({
    meta: [
      { title: "New Arrivals — Page & Pine Bookshop" },
      {
        name: "description",
        content: "Fresh off the press: the newest titles to land on the Page & Pine table.",
      },
      { property: "og:title", content: "New Arrivals — Page & Pine Bookshop" },
      {
        property: "og:description",
        content: "Fresh off the press: the newest titles to land on the Page & Pine table.",
      },
    ],
  }),
  component: NewArrivalsPage,
});

function NewArrivalsPage() {
  return (
    <div className="container py-14">
      <SectionHeader
        eyebrow="Just landed"
        title="New arrivals"
        subtitle="Freshly unpacked and shelved this week."
      />
      <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {newArrivals.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>
    </div>
  );
}
