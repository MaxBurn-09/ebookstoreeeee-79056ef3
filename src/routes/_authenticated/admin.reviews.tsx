import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Plus, Star } from "lucide-react";
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
} from "@/components/admin/ui";

export const Route = createFileRoute("/_authenticated/admin/reviews")({
  component: ReviewsAdmin,
});

type Row = {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
  approved: boolean;
};

function ReviewsAdmin() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [draft, setDraft] = useState({ name: "", location: "", rating: 5, quote: "", approved: true });
  const [busy, setBusy] = useState(false);

  async function load() {
    const { data, error } = await supabase
      .from("reviews")
      .select("id,name,location,rating,quote,approved")
      .order("created_at", { ascending: false });
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
      <AdminHeading title="Reader reviews" description="Quotes shown on the storefront and city pages." />

      <Panel title="Add a review">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} />
          <Field label="Location" value={draft.location} onChange={(v) => setDraft({ ...draft, location: v })} />
          <Field label="Rating (1-5)" value={String(draft.rating)} onChange={(v) => setDraft({ ...draft, rating: Number(v) || 5 })} />
          <Toggle label="Approved" checked={draft.approved} onChange={(v) => setDraft({ ...draft, approved: v })} />
          <TextArea className="sm:col-span-2" label="Quote" value={draft.quote} onChange={(v) => setDraft({ ...draft, quote: v })} rows={3} />
        </div>
        <div className="mt-5">
          <PrimaryButton
            busy={busy}
            onClick={async () => {
              if (!draft.name || !draft.quote) return toast.error("Name and quote are required.");
              setBusy(true);
              const { error } = await supabase.from("reviews").insert(draft);
              setBusy(false);
              if (error) {
      toast.error(error.message);
      return;
    }
              toast.success("Review added.");
              setDraft({ name: "", location: "", rating: 5, quote: "", approved: true });
              void load();
            }}
          >
            <Plus className="h-4 w-4" /> Add review
          </PrimaryButton>
        </div>
      </Panel>

      <Panel title={`All reviews (${rows.length})`}>
        {rows.length === 0 ? <EmptyState>No reviews yet.</EmptyState> : null}
        <div className="grid gap-4">
          {rows.map((row) => (
            <div key={row.id} className="rounded-xl border border-border p-4">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold">{row.name}</span>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {row.rating}
                </span>
                {row.approved ? <Badge tone="good">Approved</Badge> : <Badge tone="warn">Hidden</Badge>}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" value={row.name} onChange={(v) => patch(row.id, { name: v })} />
                <Field label="Location" value={row.location} onChange={(v) => patch(row.id, { location: v })} />
                <Field label="Rating" value={String(row.rating)} onChange={(v) => patch(row.id, { rating: Number(v) || 5 })} />
                <Toggle label="Approved" checked={row.approved} onChange={(v) => patch(row.id, { approved: v })} />
                <TextArea className="sm:col-span-2" label="Quote" value={row.quote} onChange={(v) => patch(row.id, { quote: v })} rows={3} />
              </div>
              <div className="mt-4">
                <RowActions
                  onSave={async () => {
                    const { id, ...rest } = row;
                    const { error } = await supabase.from("reviews").update(rest).eq("id", id);
                    if (error) {
      toast.error(error.message);
      return;
    }
                    toast.success("Saved.");
                  }}
                  onDelete={async () => {
                    const { error } = await supabase.from("reviews").delete().eq("id", row.id);
                    if (error) {
      toast.error(error.message);
      return;
    }
                    setRows((p) => (p ?? []).filter((r) => r.id !== row.id));
                    toast.success("Review deleted.");
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
