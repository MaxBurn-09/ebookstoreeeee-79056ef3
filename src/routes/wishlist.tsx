import { createFileRoute, Link } from "@tanstack/react-router";
import { books } from "@/data/catalog";
import { BookCard } from "@/components/site/BookCard";
import { SectionHeader } from "@/components/site/SectionHeader";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — Page & Pine Bookshop" },
      { name: "description", content: "The titles you've saved for later at Page & Pine." },
      { property: "og:title", content: "Your Wishlist — Page & Pine Bookshop" },
      { property: "og:description", content: "The titles you've saved for later at Page & Pine." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useStore();
  const saved = books.filter((b) => wishlist.includes(b.id));

  return (
    <div className="container py-14">
      <SectionHeader eyebrow="Saved for later" title="Your wishlist" />
      {saved.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm text-muted-foreground">Nothing saved yet.</p>
          <Link
            to="/books"
            className="mt-5 inline-block rounded-sm bg-forest px-6 py-3 text-[0.7rem] font-semibold tracking-[0.16em] text-forest-foreground uppercase"
          >
            Browse books
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {saved.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      )}
    </div>
  );
}
