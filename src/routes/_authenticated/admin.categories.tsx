import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  AdminHeading,
  EmptyState,
  Field,
  Loading,
  Panel,
  PrimaryButton,
  RowActions,
  slugify,
} from "@/components/admin/ui";

export const Route = createFileRoute("/_authenticated/admin/categories")({
  component: CategoriesAdmin,
});

type Row = { id: string; slug: string; name: string; tagline: string; sort_order: number };

function CategoriesAdmin() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [draft, setDraft] = useState({ slug: "", name: "", tagline: "", sort_order: 0 });
  const [busy, setBusy] = useState(false);

  async function load() {
    const { data, error } = await supabase
      .from("categories")
      .select("id,slug,name,tagline,sort_order")
      .order("sort_order");
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
      <AdminHeading title="Categories" description="The sections readers browse across the store." />

      <Panel title="Add a category">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} />
          <Field label="Slug" value={draft.slug} onChange={(v) => setDraft({ ...draft, slug: v })} placeholder={slugify(draft.name)} />
          <Field label="Tagline" value={draft.tagline} onChange={(v) => setDraft({ ...draft, tagline: v })} className="sm:col-span-2" />
          <Field label="Sort order" value={String(draft.sort_order)} onChange={(v) => setDraft({ ...draft, sort_order: Number(v) || 0 })} />
        </div>
        <div className="mt-5">
          <PrimaryButton
            busy={busy}
            onClick={async () => {
              const slug = draft.slug || slugify(draft.name);
              if (!draft.name || !slug) return toast.error("A name is required.");
              setBusy(true);
              const { error } = await supabase.from("categories").insert({ ...draft, slug });
              setBusy(false);
              if (error) {
      toast.error(error.message);
      return;
    }
              toast.success("Category added.");
              setDraft({ slug: "", name: "", tagline: "", sort_order: 0 });
              void load();
            }}
          >
            <Plus className="h-4 w-4" /> Add category
          </PrimaryButton>
        </div>
      </Panel>

      <Panel title={`All categories (${rows.length})`}>
        {rows.length === 0 ? <EmptyState>No categories yet.</EmptyState> : null}
        <div className="grid gap-4">
          {rows.map((row) => (
            <div key={row.id} className="rounded-xl border border-border p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" value={row.name} onChange={(v) => patch(row.id, { name: v })} />
                <Field label="Slug" value={row.slug} onChange={(v) => patch(row.id, { slug: v })} />
                <Field label="Tagline" value={row.tagline} onChange={(v) => patch(row.id, { tagline: v })} className="sm:col-span-2" />
                <Field label="Sort order" value={String(row.sort_order)} onChange={(v) => patch(row.id, { sort_order: Number(v) || 0 })} />
              </div>
              <div className="mt-4">
                <RowActions
                  onSave={async () => {
                    const { id, ...rest } = row;
                    const { error } = await supabase.from("categories").update(rest).eq("id", id);
                    if (error) {
      toast.error(error.message);
      return;
    }
                    toast.success("Saved.");
                  }}
                  onDelete={async () => {
                    const { error } = await supabase.from("categories").delete().eq("id", row.id);
                    if (error) {
      toast.error(error.message);
      return;
    }
                    setRows((p) => (p ?? []).filter((r) => r.id !== row.id));
                    toast.success("Category deleted.");
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
