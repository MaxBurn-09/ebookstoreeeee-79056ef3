import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { ChevronDown, Plus, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  AdminHeading,
  Badge,
  EmptyState,
  Field,
  Loading,
  Panel,
  PrimaryButton,
  RowActions,
  TextArea,
  Toggle,
  slugify,
} from "@/components/admin/ui";

export const Route = createFileRoute("/_authenticated/admin/books")({
  component: BooksAdmin,
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
  rating: number;
  published: boolean;
};

const empty = {
  slug: "",
  title: "",
  category: "",
  blurb: "",
  price: 2.97,
  old_price: 7.5,
  cover_url: "",
  file_url: "",
  rating: 4.8,
  published: true,
};

function BooksAdmin() {
  const [rows, setRows] = useState<BookRow[] | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [draft, setDraft] = useState(empty);
  const [busy, setBusy] = useState(false);

  async function load() {
    const [books, cats] = await Promise.all([
      supabase
        .from("books")
        .select("id,slug,title,category,blurb,price,old_price,cover_url,file_url,rating,published")
        .order("title"),
      supabase.from("categories").select("slug").order("sort_order"),
    ]);
    if (books.error) toast.error(books.error.message);
    setRows((books.data ?? []) as BookRow[]);
    setCategories((cats.data ?? []).map((c) => c.slug));
  }

  useEffect(() => {
    void load();
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (rows ?? []).filter((r) => {
      const matchQ = !q || r.title.toLowerCase().includes(q) || r.slug.includes(q);
      const matchC = filter === "all" || r.category === filter;
      return matchQ && matchC;
    });
  }, [rows, query, filter]);

  const patch = (id: string, next: Partial<BookRow>) =>
    setRows((p) => (p ?? []).map((r) => (r.id === id ? { ...r, ...next } : r)));

  async function create() {
    const slug = draft.slug || slugify(draft.title);
    if (!draft.title || !slug) {
      toast.error("A title is required.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.from("books").insert({ ...draft, slug });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Ebook added.");
    setDraft(empty);
    setShowNew(false);
    void load();
  }

  async function save(row: BookRow) {
    const { id, ...rest } = row;
    const { error } = await supabase.from("books").update(rest).eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Saved.");
  }

  async function remove(id: string) {
    const { error } = await supabase.from("books").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setRows((p) => (p ?? []).filter((r) => r.id !== id));
    toast.success("Ebook deleted.");
  }

  if (!rows) return <Loading />;

  return (
    <div className="grid gap-6">
      <AdminHeading
        title="Ebooks"
        description={`${rows.length} titles in your catalogue.`}
        action={
          <PrimaryButton onClick={() => setShowNew((v) => !v)}>
            <Plus className="h-4 w-4" /> New ebook
          </PrimaryButton>
        }
      />

      {showNew ? (
        <Panel title="Add a new ebook" description="Slug is generated from the title if you leave it blank.">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Title" value={draft.title} onChange={(v) => setDraft({ ...draft, title: v })} />
            <Field label="Slug" value={draft.slug} onChange={(v) => setDraft({ ...draft, slug: v })} placeholder={slugify(draft.title)} />
            <Field label="Category slug" value={draft.category} onChange={(v) => setDraft({ ...draft, category: v })} hint={categories.join(", ")} />
            <Field label="Rating" value={String(draft.rating)} onChange={(v) => setDraft({ ...draft, rating: Number(v) || 0 })} />
            <Field label="Price (USD)" value={String(draft.price)} onChange={(v) => setDraft({ ...draft, price: Number(v) || 0 })} />
            <Field label="Old price (USD)" value={String(draft.old_price)} onChange={(v) => setDraft({ ...draft, old_price: Number(v) || 0 })} />
            <Field label="Cover image path" value={draft.cover_url} onChange={(v) => setDraft({ ...draft, cover_url: v })} hint="e.g. /covers/my-book.webp" />
            <Field label="PDF file name" value={draft.file_url} onChange={(v) => setDraft({ ...draft, file_url: v })} hint="File stored in the ebooks library, e.g. my-book.pdf" />
            <TextArea className="sm:col-span-2" label="Short description" value={draft.blurb} onChange={(v) => setDraft({ ...draft, blurb: v })} />
            <Toggle label="Published" checked={draft.published} onChange={(v) => setDraft({ ...draft, published: v })} />
          </div>
          <div className="mt-5">
            <PrimaryButton onClick={create} busy={busy}>
              <Plus className="h-4 w-4" /> Add ebook
            </PrimaryButton>
          </div>
        </Panel>
      ) : null}

      <Panel>
        <div className="flex flex-wrap items-center gap-3">
          <label className="relative flex-1 min-w-[12rem]">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or slug"
              className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-3 text-sm outline-none focus:border-foreground/40"
            />
          </label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="h-11 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-foreground/40"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5 grid gap-2.5">
          {visible.length === 0 ? <EmptyState>No ebooks match that search.</EmptyState> : null}

          {visible.map((row) => {
            const open = openId === row.id;
            return (
              <article key={row.id} className="overflow-hidden rounded-xl border border-border bg-background">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : row.id)}
                  className="flex w-full items-center gap-4 px-3 py-3 text-left transition-colors hover:bg-muted/60"
                >
                  <img
                    src={row.cover_url || "/favicon.png"}
                    alt=""
                    loading="lazy"
                    className="h-16 w-12 shrink-0 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{row.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {row.category || "uncategorised"} · ${Number(row.price).toFixed(2)}
                    </p>
                  </div>
                  <div className="hidden sm:block">
                    {row.published ? <Badge tone="good">Live</Badge> : <Badge tone="warn">Draft</Badge>}
                  </div>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
                </button>

                {open ? (
                  <div className="border-t border-border p-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Title" value={row.title} onChange={(v) => patch(row.id, { title: v })} />
                      <Field label="Slug" value={row.slug} onChange={(v) => patch(row.id, { slug: v })} />
                      <Field label="Category slug" value={row.category} onChange={(v) => patch(row.id, { category: v })} />
                      <Field label="Rating" value={String(row.rating)} onChange={(v) => patch(row.id, { rating: Number(v) || 0 })} />
                      <Field label="Price (USD)" value={String(row.price)} onChange={(v) => patch(row.id, { price: Number(v) || 0 })} />
                      <Field label="Old price (USD)" value={String(row.old_price)} onChange={(v) => patch(row.id, { old_price: Number(v) || 0 })} />
                      <Field label="Cover image path" value={row.cover_url ?? ""} onChange={(v) => patch(row.id, { cover_url: v })} />
                      <Field label="PDF file name" value={row.file_url ?? ""} onChange={(v) => patch(row.id, { file_url: v })} />
                      <TextArea className="sm:col-span-2" label="Short description" value={row.blurb} onChange={(v) => patch(row.id, { blurb: v })} />
                      <Toggle label="Published" checked={row.published} onChange={(v) => patch(row.id, { published: v })} />
                    </div>
                    <div className="mt-5">
                      <RowActions onSave={() => save(row)} onDelete={() => remove(row.id)} />
                    </div>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}
