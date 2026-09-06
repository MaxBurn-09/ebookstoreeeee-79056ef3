import { createFileRoute } from "@tanstack/react-router";
import { bestsellers } from "@/data/catalog";
import { BookGrid } from "@/components/site/BookGrid";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/bestsellers")({
  head: () => ({
    meta: [
      { title: "Bestsellers — Future Grow Academy" },
      {
        name: "description",
        content: "The most-loved books on our shelves this season, ranked by our readers.",
      },
      { property: "og:title", content: "Bestsellers — Future Grow Academy" },
      {
        property: "og:description",
        content: "The most-loved books on our shelves this season, ranked by our readers.",
      },
    ],
  }),
  component: BestsellersPage,
});

function BestsellersPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeader
        eyebrow="Reader favourites"
        title="Bestsellers this season"
        subtitle="Ranked by what's leaving our shelves fastest."
      />
      <BookGrid items={bestsellers} />
    </div>
  );
}
