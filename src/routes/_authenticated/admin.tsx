import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import {
  BookOpen,
  FolderTree,
  LayoutDashboard,
  Mail,
  Newspaper,
  ReceiptText,
  Star,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Loading } from "@/components/admin/ui";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Store admin — Future Grow Academy" },
      {
        name: "description",
        content: "Manage ebooks, categories, articles, reviews and orders for Future Grow Academy.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

const nav = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/books", label: "Ebooks", icon: BookOpen },
  { to: "/admin/categories", label: "Categories", icon: FolderTree },
  { to: "/admin/blog", label: "Articles", icon: Newspaper },
  { to: "/admin/reviews", label: "Reviews", icon: Star },
  { to: "/admin/orders", label: "Orders", icon: ReceiptText },
  { to: "/admin/subscribers", label: "Subscribers", icon: Mail },
] as const;

function AdminLayout() {
  const { isAdmin, loading } = useAuth();

  if (loading) return <Loading />;

  if (!isAdmin) {
    return (
      <section className="section-y">
        <div className="container-page max-w-md text-center">
          <h1 className="text-2xl font-semibold">Admin access only</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This area is limited to store administrators.
          </p>
          <Link
            to="/dashboard"
            className="press mt-6 inline-flex h-12 items-center rounded-full bg-foreground px-6 text-sm font-semibold text-background hover:bg-foreground/90"
          >
            Back to my library
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-10">
      <div className="container-page">
        <p className="eyebrow">Future Grow Academy</p>
        <h1 className="mt-1.5 font-display text-2xl font-medium sm:text-3xl">Store control room</h1>

        <div className="mt-7 grid gap-6 lg:grid-cols-[15rem_1fr] lg:items-start">
          <nav className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 lg:sticky lg:top-24 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: "exact" in item ? item.exact : false }}
                activeProps={{ className: "border-foreground bg-foreground text-background" }}
                inactiveProps={{ className: "border-border text-muted-foreground hover:bg-muted" }}
                className="press inline-flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-semibold transition-colors lg:w-full"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}
