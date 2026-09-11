import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Store admin — Future Grow Academy" },
      {
        name: "description",
        content: "Add, edit and remove ebooks, categories and reader reviews for the store.",
      },
      { property: "og:title", content: "Store admin — Future Grow Academy" },
      { property: "og:description", content: "Manage the Future Grow Academy ebook store." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminPage,
});

type BookRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
  blurb: string;
  price: number;
  old_price: number;
  cover_url: string | null;
  file_url: string | null;
  published: boolean;
};

type CategoryRow = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  sort_order: number;
};

type ReviewRow = {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
  approved: boolean;
};

const emptyBook: Omit<BookRow, "id"> = {
  slug: "",
  title: "",
  category: "",
  blurb: "",
  price: 2.97,
  old_price: 7.5,
  cover_url: "",
  file_url: "",
  published: true,
};

function AdminPage() {
  const { isAdmin, loading } = useAuth();
  const [tab, setTab] = useState<"books" | "categories" | "reviews">("books");

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

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
    <section className="section-y">
      <div className="container-page">
        <p className="eyebrow">Store admin</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Manage your store</h1>

        <div className="mt-7 flex gap-2">
          {(["books", "categories", "reviews"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`press h-10 rounded-full border px-5 text-sm font-semibold capitalize transition-colors ${
                tab === t ? "border-foreground bg-foreground text-background" : "border-border hover:bg-muted"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "books" ? <BooksPanel /> : null}
          {tab === "categories" ? <CategoriesPanel /> : null}
          {tab === "reviews" ? <ReviewsPanel /> : null}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ books */

function BooksPanel() {
  const [rows, setRows] = useState<BookRow[]>([]);
  const [draft, setDraft] = useState<Omit<BookRow, "id">>(emptyBook);
  const [busy, setBusy] = useState(false);

  async function load() {
    const { data, error } = await supabase
      .from("books")
      .select("id,slug,title,category,blurb,price,old_price,cover_url,file_url,published")
      .order("title");
    if (error) toast.error(error.message);
    else setRows((data ?? []) as BookRow[]);
  }

  useEffect(() => {
    void load();
  }, []);

  async function create() {
    if (!draft.slug || !draft.title) {
      toast.error("Title and slug are required.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.from("books").insert(draft);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Ebook added.");
    setDraft(emptyBook);
    void load();
  }

  async function save(row: BookRow) {
    const { id, ...rest } = row;
    const { error } = await supabase.from("books").update(rest).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Saved.");
  }

  async function remove(id: string) {
    const { error } = await supabase.from("books").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Ebook deleted.");
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="grid gap-6">
      <Card title="Add a new ebook">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Title" value={draft.title} onChange={(v) => setDraft({ ...draft, title: v })} />
          <Input label="Slug" value={draft.slug} onChange={(v) => setDraft({ ...draft, slug: v })} />
          <Input
            label="Category"
            value={draft.category}
            onChange={(v) => setDraft({ ...draft, category: v })}
          />
          <Input
            label="Price (USD)"
            value={String(draft.price)}
            onChange={(v) => setDraft({ ...draft, price: Number(v) || 0 })}
          />
          <Input
            label="Old price (USD)"
            value={String(draft.old_price)}
            onChange={(v) => setDraft({ ...draft, old_price: Number(v) || 0 })}
          />
          <Input
            label="Cover image URL"
            value={draft.cover_url ?? ""}
            onChange={(v) => setDraft({ ...draft, cover_url: v })}
          />
          <Input
            label="PDF file URL"
            value={draft.file_url ?? ""}
            onChange={(v) => setDraft({ ...draft, file_url: v })}
          />
          <Input
            label="Short description"
            value={draft.blurb}
            onChange={(v) => setDraft({ ...draft, blurb: v })}
          />
        </div>
        <button
          type="button"
          onClick={create}
          disabled={busy}
          className="press mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background hover:bg-foreground/90 disabled:opacity-60"
        >
          <Plus className="h-4 w-4" /> Add ebook
        </button>
      </Card>

      <div className="grid gap-4">
        {rows.map((row) => (
          <Card key={row.id} title={row.title}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Title"
                value={row.title}
                onChange={(v) => setRows((p) => p.map((r) => (r.id === row.id ? { ...r, title: v } : r)))}
              />
              <Input
                label="Category"
                value={row.category}
                onChange={(v) =>
                  setRows((p) => p.map((r) => (r.id === row.id ? { ...r, category: v } : r)))
                }
              />
              <Input
                label="Price"
                value={String(row.price)}
                onChange={(v) =>
                  setRows((p) =>
                    p.map((r) => (r.id === row.id ? { ...r, price: Number(v) || 0 } : r)),
                  )
                }
              />
              <Input
                label="PDF file URL"
                value={row.file_url ?? ""}
                onChange={(v) =>
                  setRows((p) => p.map((r) => (r.id === row.id ? { ...r, file_url: v } : r)))
                }
              />
              <Input
                label="Cover image URL"
                value={row.cover_url ?? ""}
                onChange={(v) =>
                  setRows((p) => p.map((r) => (r.id === row.id ? { ...r, cover_url: v } : r)))
                }
              />
              <label className="flex items-end gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={row.published}
                  onChange={(e) =>
                    setRows((p) =>
                      p.map((r) => (r.id === row.id ? { ...r, published: e.target.checked } : r)),
                    )
                  }
                  className="h-4 w-4"
                />
                Published
              </label>
            </div>
            <Actions onSave={() => save(row)} onDelete={() => remove(row.id)} />
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- categories */

function CategoriesPanel() {
  const [rows, setRows] = useState<CategoryRow[]>([]);
  const [draft, setDraft] = useState({ slug: "", name: "", tagline: "", sort_order: 0 });

  async function load() {
    const { data, error } = await supabase
      .from("categories")
      .select("id,slug,name,tagline,sort_order")
      .order("sort_order");
    if (error) toast.error(error.message);
    else setRows((data ?? []) as CategoryRow[]);
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <div className="grid gap-6">
      <Card title="Add a category">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Name" value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} />
          <Input label="Slug" value={draft.slug} onChange={(v) => setDraft({ ...draft, slug: v })} />
          <Input
            label="Tagline"
            value={draft.tagline}
            onChange={(v) => setDraft({ ...draft, tagline: v })}
          />
          <Input
            label="Sort order"
            value={String(draft.sort_order)}
            onChange={(v) => setDraft({ ...draft, sort_order: Number(v) || 0 })}
          />
        </div>
        <button
          type="button"
          onClick={async () => {
            const { error } = await supabase.from("categories").insert(draft);
            if (error) return toast.error(error.message);
            toast.success("Category added.");
            setDraft({ slug: "", name: "", tagline: "", sort_order: 0 });
            void load();
          }}
          className="press mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background hover:bg-foreground/90"
        >
          <Plus className="h-4 w-4" /> Add category
        </button>
      </Card>

      {rows.map((row) => (
        <Card key={row.id} title={row.name}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Name"
              value={row.name}
              onChange={(v) => setRows((p) => p.map((r) => (r.id === row.id ? { ...r, name: v } : r)))}
            />
            <Input
              label="Tagline"
              value={row.tagline}
              onChange={(v) =>
                setRows((p) => p.map((r) => (r.id === row.id ? { ...r, tagline: v } : r)))
              }
            />
          </div>
          <Actions
            onSave={async () => {
              const { error } = await supabase
                .from("categories")
                .update({ name: row.name, tagline: row.tagline })
                .eq("id", row.id);
              if (error) return toast.error(error.message);
              toast.success("Saved.");
            }}
            onDelete={async () => {
              const { error } = await supabase.from("categories").delete().eq("id", row.id);
              if (error) return toast.error(error.message);
              setRows((p) => p.filter((r) => r.id !== row.id));
              toast.success("Category deleted.");
            }}
          />
        </Card>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- reviews */

function ReviewsPanel() {
  const [rows, setRows] = useState<ReviewRow[]>([]);
  const [draft, setDraft] = useState({ name: "", location: "", rating: 5, quote: "", approved: true });

  async function load() {
    const { data, error } = await supabase
      .from("reviews")
      .select("id,name,location,rating,quote,approved")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setRows((data ?? []) as ReviewRow[]);
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <div className="grid gap-6">
      <Card title="Add a reader review">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Name" value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} />
          <Input
            label="Location"
            value={draft.location}
            onChange={(v) => setDraft({ ...draft, location: v })}
          />
          <Input
            label="Rating"
            value={String(draft.rating)}
            onChange={(v) => setDraft({ ...draft, rating: Number(v) || 5 })}
          />
          <Input label="Quote" value={draft.quote} onChange={(v) => setDraft({ ...draft, quote: v })} />
        </div>
        <button
          type="button"
          onClick={async () => {
            const { error } = await supabase.from("reviews").insert(draft);
            if (error) return toast.error(error.message);
            toast.success("Review added.");
            setDraft({ name: "", location: "", rating: 5, quote: "", approved: true });
            void load();
          }}
          className="press mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background hover:bg-foreground/90"
        >
          <Plus className="h-4 w-4" /> Add review
        </button>
      </Card>

      {rows.map((row) => (
        <Card key={row.id} title={`${row.name} · ${row.rating}★`}>
          <Input
            label="Quote"
            value={row.quote}
            onChange={(v) => setRows((p) => p.map((r) => (r.id === row.id ? { ...r, quote: v } : r)))}
          />
          <Actions
            onSave={async () => {
              const { error } = await supabase
                .from("reviews")
                .update({ quote: row.quote })
                .eq("id", row.id);
              if (error) return toast.error(error.message);
              toast.success("Saved.");
            }}
            onDelete={async () => {
              const { error } = await supabase.from("reviews").delete().eq("id", row.id);
              if (error) return toast.error(error.message);
              setRows((p) => p.filter((r) => r.id !== row.id));
              toast.success("Review deleted.");
            }}
          />
        </Card>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------- bits */

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <h2 className="mb-5 text-base font-semibold">{title}</h2>
      {children}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[0.78rem] font-semibold">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-foreground/40"
      />
    </label>
  );
}

function Actions({ onSave, onDelete }: { onSave: () => void; onDelete: () => void }) {
  return (
    <div className="mt-5 flex gap-2">
      <button
        type="button"
        onClick={onSave}
        className="press inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-5 text-xs font-semibold text-background hover:bg-foreground/90"
      >
        <Save className="h-3.5 w-3.5" /> Save
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="press inline-flex h-10 items-center gap-2 rounded-full border border-border px-5 text-xs font-semibold text-destructive hover:bg-muted"
      >
        <Trash2 className="h-3.5 w-3.5" /> Delete
      </button>
    </div>
  );
}
