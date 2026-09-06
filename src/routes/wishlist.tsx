import { createFileRoute, Link } from "@tanstack/react-router";
import { books } from "@/data/catalog";
import { BookGrid } from "@/components/site/BookGrid";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — Future Grow Academy" },
      { name: "description", content: "The ebooks you've saved for later at Future Grow Academy." },
      { property: "og:title", content: "Your Wishlist — Future Grow Academy" },
      { property: "og:description", content: "The ebooks you've saved for later at Future Grow Academy." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useStore();
  const saved = books.filter((b) => wishlist.includes(b.id));

  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeader eyebrow="Saved for later" title="Your wishlist" />
      {saved.length === 0 ? (
        <Reveal className="py-16 text-center">
          <p className="text-sm text-muted-foreground">Nothing saved yet — start with a bestseller.</p>
          <Link
            to="/books"
            preload="intent"
            className="press mt-5 inline-block rounded-sm bg-forest px-6 py-3 text-[0.7rem] font-semibold tracking-[0.16em] text-forest-foreground uppercase transition-colors hover:bg-forest/90"
          >
            Browse ebooks
          </Link>
        </Reveal>
      ) : (
        <BookGrid items={saved} />
      )}
    </div>
  );
}
