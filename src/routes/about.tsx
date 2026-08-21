import { createFileRoute } from "@tanstack/react-router";
import promo from "@/assets/promo-reading.jpg";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Page & Pine — Independent Bookshop" },
      {
        name: "description",
        content:
          "Page & Pine is an independent bookshop in Mumbai for slow readers: curated shelves, honest recommendations and beautifully made editions.",
      },
      { property: "og:title", content: "About Page & Pine — Independent Bookshop" },
      {
        property: "og:description",
        content: "An independent Mumbai bookshop for slow readers, curated by hand since 2014.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="container py-14">
      <SectionHeader eyebrow="Our story" title="A bookshop for slow readers" />
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <img
          src={promo}
          alt="A reader with a book and coffee in a warm bookshop corner"
          className="rounded-lg object-cover"
          loading="lazy"
        />
        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Page &amp; Pine began in 2014 as a single shelf in a Bandra café. Today it's a small shop
            with a big table in the middle, where booksellers press their favourites into your hands
            and nobody rushes you out.
          </p>
          <p>
            We stock what we've read. Every title on this site has been shelved, argued over and
            recommended by someone on our team — no algorithms, no paid placements.
          </p>
          <p>
            Orders are wrapped in recycled paper, sent within a day, and returnable for a week. If a
            book isn't right for you, it will be right for someone else.
          </p>
          <dl className="grid grid-cols-3 gap-4 pt-4">
            {[
              ["12k+", "Titles shelved"],
              ["48k", "Orders wrapped"],
              ["4.8", "Average rating"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-serif text-3xl text-foreground">{value}</dt>
                <dd className="text-[0.65rem] tracking-[0.16em] uppercase">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
