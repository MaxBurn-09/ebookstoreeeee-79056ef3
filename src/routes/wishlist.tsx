import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
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
        <Reveal className="rounded-2xl border border-dashed border-border py-16 text-center">
          <Heart className="mx-auto h-9 w-9 text-taupe" aria-hidden />
          <p className="mt-4 text-sm text-muted-foreground">
            Nothing saved yet — tap the heart on any ebook to keep it here.
          </p>
          <Link
            to="/books"
            preload="intent"
            className="press mt-6 inline-flex h-12 items-center rounded-full bg-foreground px-7 text-sm font-semibold text-background hover:bg-foreground/90"
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
