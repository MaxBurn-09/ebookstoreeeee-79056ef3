import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { ChevronDown, Plus } from "lucide-react";
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

export const Route = createFileRoute("/_authenticated/admin/blog")({
  component: BlogAdmin,
});

type Row = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  tags: string[];
  cover_url: string | null;
  author: string;
  reading_minutes: number;
  featured: boolean;
  published: boolean;
  published_at: string;
};

const empty = {
  slug: "",
  title: "",
  excerpt: "",
  body: "",
  category: "mindset",
  tags: [] as string[],
  cover_url: "",
  author: "Future Grow Academy Editorial Team",
  reading_minutes: 5,
  featured: false,
  published: true,
};

function BlogAdmin() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [draft, setDraft] = useState(empty);
  const [tagText, setTagText] = useState("");
  const [busy, setBusy] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  async function load() {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("published_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data ?? []) as Row[]);
  }

  useEffect(() => {
    void load();
  }, []);

  const patch = (id: string, next: Partial<Row>) =>
    setRows((p) => (p ?? []).map((r) => (r.id === id ? { ...r, ...next } : r)));

  if (!rows) return <Loading />;

  return (
    <div className="grid gap-6">
      <AdminHeading
        title="Articles"
        description={`${rows.length} posts written from the admin panel. Older editorial guides stay in the site's built-in library.`}
        action={
          <PrimaryButton onClick={() => setShowNew((v) => !v)}>
            <Plus className="h-4 w-4" /> New article
          </PrimaryButton>
        }
      />

      {showNew ? (
        <Panel title="Write an article" description="Body text supports plain paragraphs — leave a blank line between them.">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Title" value={draft.title} onChange={(v) => setDraft({ ...draft, title: v })} />
            <Field label="Slug" value={draft.slug} onChange={(v) => setDraft({ ...draft, slug: v })} placeholder={slugify(draft.title)} />
            <Field label="Category slug" value={draft.category} onChange={(v) => setDraft({ ...draft, category: v })} hint="mindset, money, relationships, parenting, health, guides" />
            <Field label="Reading minutes" value={String(draft.reading_minutes)} onChange={(v) => setDraft({ ...draft, reading_minutes: Number(v) || 5 })} />
            <Field label="Author" value={draft.author} onChange={(v) => setDraft({ ...draft, author: v })} />
            <Field label="Cover image path" value={draft.cover_url} onChange={(v) => setDraft({ ...draft, cover_url: v })} />
            <Field label="Tags" value={tagText} onChange={setTagText} hint="Comma separated" className="sm:col-span-2" />
            <TextArea className="sm:col-span-2" label="Excerpt" value={draft.excerpt} onChange={(v) => setDraft({ ...draft, excerpt: v })} rows={3} />
            <TextArea className="sm:col-span-2" label="Body" value={draft.body} onChange={(v) => setDraft({ ...draft, body: v })} rows={12} />
            <Toggle label="Featured" checked={draft.featured} onChange={(v) => setDraft({ ...draft, featured: v })} />
            <Toggle label="Published" checked={draft.published} onChange={(v) => setDraft({ ...draft, published: v })} />
          </div>
          <div className="mt-5">
            <PrimaryButton
              busy={busy}
              onClick={async () => {
                const slug = draft.slug || slugify(draft.title);
                if (!draft.title || !slug) return toast.error("A title is required.");
                setBusy(true);
                const tags = tagText.split(",").map((t) => t.trim()).filter(Boolean);
                const { error } = await supabase.from("blog_posts").insert({ ...draft, slug, tags });
                setBusy(false);
                if (error) {
      toast.error(error.message);
      return;
    }
                toast.success("Article published.");
                setDraft(empty);
                setTagText("");
                setShowNew(false);
                void load();
              }}
            >
              <Plus className="h-4 w-4" /> Save article
            </PrimaryButton>
          </div>
        </Panel>
      ) : null}

      <Panel title="All articles">
        {rows.length === 0 ? <EmptyState>No articles written yet.</EmptyState> : null}
        <div className="grid gap-2.5">
          {rows.map((row) => {
            const open = openId === row.id;
            return (
              <article key={row.id} className="overflow-hidden rounded-xl border border-border bg-background">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : row.id)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/60"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{row.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {row.category} · {new Date(row.published_at).toLocaleDateString()}
                    </p>
                  </div>
                  {row.published ? <Badge tone="good">Live</Badge> : <Badge tone="warn">Draft</Badge>}
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
                </button>

                {open ? (
                  <div className="border-t border-border p-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Title" value={row.title} onChange={(v) => patch(row.id, { title: v })} />
                      <Field label="Slug" value={row.slug} onChange={(v) => patch(row.id, { slug: v })} />
                      <Field label="Category slug" value={row.category} onChange={(v) => patch(row.id, { category: v })} />
                      <Field label="Reading minutes" value={String(row.reading_minutes)} onChange={(v) => patch(row.id, { reading_minutes: Number(v) || 5 })} />
                      <Field label="Author" value={row.author} onChange={(v) => patch(row.id, { author: v })} />
                      <Field label="Cover image path" value={row.cover_url ?? ""} onChange={(v) => patch(row.id, { cover_url: v })} />
                      <Field label="Tags" value={row.tags.join(", ")} onChange={(v) => patch(row.id, { tags: v.split(",").map((t) => t.trim()).filter(Boolean) })} className="sm:col-span-2" />
                      <TextArea className="sm:col-span-2" label="Excerpt" value={row.excerpt} onChange={(v) => patch(row.id, { excerpt: v })} rows={3} />
                      <TextArea className="sm:col-span-2" label="Body" value={row.body} onChange={(v) => patch(row.id, { body: v })} rows={12} />
                      <Toggle label="Featured" checked={row.featured} onChange={(v) => patch(row.id, { featured: v })} />
                      <Toggle label="Published" checked={row.published} onChange={(v) => patch(row.id, { published: v })} />
                    </div>
                    <div className="mt-5">
                      <RowActions
                        onSave={async () => {
                          const { id, ...rest } = row;
                          const { error } = await supabase.from("blog_posts").update(rest).eq("id", id);
                          if (error) {
      toast.error(error.message);
      return;
    }
                          toast.success("Saved.");
                        }}
                        onDelete={async () => {
                          const { error } = await supabase.from("blog_posts").delete().eq("id", row.id);
                          if (error) {
      toast.error(error.message);
      return;
    }
                          setRows((p) => (p ?? []).filter((r) => r.id !== row.id));
                          toast.success("Article deleted.");
                        }}
                      />
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
