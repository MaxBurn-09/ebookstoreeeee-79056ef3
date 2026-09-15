import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { BookOpen, Download, Loader2, LogOut, ShieldCheck } from "lucide-react";
import { getMyOrders } from "@/lib/orders.functions";
import { getEbookLink } from "@/lib/library.functions";
import { useAuth } from "@/lib/auth";
import { formatPrice } from "@/data/catalog";

/** Read / download buttons that fetch a fresh signed link for an owned ebook. */
function LibraryActions({ slug, title }: { slug: string; title: string }) {
  const fetchLink = useServerFn(getEbookLink);
  const [busy, setBusy] = useState<"read" | "download" | null>(null);

  const open = async (mode: "read" | "download") => {
    setBusy(mode);
    try {
      const { url } = await fetchLink({ data: { slug } });
      if (mode === "read") {
        window.open(url, "_blank", "noopener");
      } else {
        const a = document.createElement("a");
        a.href = url;
        a.download = `${title}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not open this ebook.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => open("read")}
        disabled={busy !== null}
        className="press inline-flex h-9 items-center gap-1.5 rounded-full bg-foreground px-4 text-xs font-semibold text-background hover:bg-foreground/90 disabled:opacity-60"
      >
        {busy === "read" ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <BookOpen className="h-3.5 w-3.5" />
        )}
        Read
      </button>
      <button
        type="button"
        onClick={() => open("download")}
        disabled={busy !== null}
        className="press inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-4 text-xs font-semibold hover:bg-muted disabled:opacity-60"
      >
        {busy === "download" ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Download className="h-3.5 w-3.5" />
        )}
        Download
      </button>
    </>
  );
}

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "My library — Future Grow Academy" },
      {
        name: "description",
        content: "Read and download every ebook you have purchased from Future Grow Academy.",
      },
      { property: "og:title", content: "My library — Future Grow Academy" },
      {
        property: "og:description",
        content: "Your purchased ebooks, ready to read or download on any device.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user, isAdmin, signOut } = useAuth();
  const fetchOrders = useServerFn(getMyOrders);
  const { data: orders, isLoading } = useQuery({
    queryKey: ["my-orders"],
    queryFn: () => fetchOrders(),
  });

  const items = (orders ?? []).flatMap((o) =>
    (o.order_items ?? []).map((i) => ({ ...i, orderDate: o.created_at })),
  );

  return (
    <section className="section-y">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Your account</p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">My library</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Signed in as {user?.email}. Your ebooks stay here forever.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isAdmin ? (
              <Link
                to="/admin"
                className="press inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-semibold hover:bg-muted"
              >
                <ShieldCheck className="h-4 w-4" /> Admin panel
              </Link>
            ) : null}
            <button
              type="button"
              onClick={() => signOut()}
              className="press inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-semibold hover:bg-muted"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="mt-14 flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : items.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-border bg-card p-10 text-center shadow-[var(--shadow-card)]">
            <BookOpen className="mx-auto h-8 w-8 text-taupe" aria-hidden />
            <h2 className="mt-4 text-lg font-semibold">No ebooks yet</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              Once you buy an ebook it appears here — read it online or download the PDF any time.
            </p>
            <Link
              to="/books"
              className="press mt-6 inline-flex h-12 items-center rounded-full bg-foreground px-6 text-sm font-semibold text-background hover:bg-foreground/90"
            >
              Browse the library
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.id}
                className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]"
              >
                <div className="cover-plate h-32 w-22 shrink-0 overflow-hidden rounded-md">
                  {item.cover_url ? (
                    <img
                      src={item.cover_url}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="line-clamp-2 text-sm font-semibold">{item.title}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    PDF · {formatPrice(Number(item.price))}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.file_url ? (
                      <LibraryActions slug={item.book_slug} title={item.title} />
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        The PDF file is being added — you will get an email as soon as it is ready.
                      </p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
