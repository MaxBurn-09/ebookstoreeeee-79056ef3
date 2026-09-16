import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, FolderTree, Mail, Newspaper, ReceiptText, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AdminHeading, Loading, Panel } from "@/components/admin/ui";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminOverview,
});

type Counts = {
  books: number;
  published: number;
  categories: number;
  posts: number;
  reviews: number;
  orders: number;
  revenue: number;
  subscribers: number;
};

function AdminOverview() {
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    let alive = true;
    void (async () => {
      const count = { count: "exact" as const, head: true };
      const [books, published, categories, posts, reviews, subscribers, orders] = await Promise.all([
        supabase.from("books").select("id", count),
        supabase.from("books").select("id", count).eq("published", true),
        supabase.from("categories").select("id", count),
        supabase.from("blog_posts").select("id", count),
        supabase.from("reviews").select("id", count),
        supabase.from("newsletter_subscribers").select("id", count),
        supabase.from("orders").select("total,status"),
      ]);
      if (!alive) return;
      const paid = (orders.data ?? []).filter((o) => o.status === "paid");
      setCounts({
        books: books.count ?? 0,
        published: published.count ?? 0,
        categories: categories.count ?? 0,
        posts: posts.count ?? 0,
        reviews: reviews.count ?? 0,
        subscribers: subscribers.count ?? 0,
        orders: paid.length,
        revenue: paid.reduce((sum, o) => sum + Number(o.total ?? 0), 0),
      });
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (!counts) return <Loading />;

  const stats = [
    { label: "Ebooks", value: `${counts.books}`, hint: `${counts.published} published`, to: "/admin/books", icon: BookOpen },
    { label: "Categories", value: `${counts.categories}`, hint: "Store sections", to: "/admin/categories", icon: FolderTree },
    { label: "Articles", value: `${counts.posts}`, hint: "Blog posts", to: "/admin/blog", icon: Newspaper },
    { label: "Reviews", value: `${counts.reviews}`, hint: "Reader quotes", to: "/admin/reviews", icon: Star },
    { label: "Paid orders", value: `${counts.orders}`, hint: `$${counts.revenue.toFixed(2)} total`, to: "/admin/orders", icon: ReceiptText },
    { label: "Subscribers", value: `${counts.subscribers}`, hint: "Newsletter list", to: "/admin/subscribers", icon: Mail },
  ] as const;

  return (
    <div className="grid gap-6">
      <AdminHeading
        title="Overview"
        description="A quick read on your catalogue, content and sales."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            className="press group rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                {s.label}
              </span>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-3 font-display text-3xl font-medium">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.hint}</p>
          </Link>
        ))}
      </div>

      <Panel title="Quick actions" description="Jump straight to the thing you need to update.">
        <div className="flex flex-wrap gap-2">
          <Link to="/admin/books" className="press inline-flex h-10 items-center rounded-full bg-foreground px-5 text-xs font-semibold text-background">
            Add an ebook
          </Link>
          <Link to="/admin/blog" className="press inline-flex h-10 items-center rounded-full border border-border px-5 text-xs font-semibold hover:bg-muted">
            Write an article
          </Link>
          <Link to="/admin/reviews" className="press inline-flex h-10 items-center rounded-full border border-border px-5 text-xs font-semibold hover:bg-muted">
            Add a reader review
          </Link>
        </div>
      </Panel>
    </div>
  );
}
