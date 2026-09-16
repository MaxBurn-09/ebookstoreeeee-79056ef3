import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Download, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AdminHeading, EmptyState, Loading, Panel } from "@/components/admin/ui";

export const Route = createFileRoute("/_authenticated/admin/subscribers")({
  component: SubscribersAdmin,
});

type Row = { id: string; email: string; source: string | null; created_at: string };

function SubscribersAdmin() {
  const [rows, setRows] = useState<Row[] | null>(null);

  useEffect(() => {
    void (async () => {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("id,email,source,created_at")
        .order("created_at", { ascending: false });
      if (error) toast.error(error.message);
      setRows((data ?? []) as Row[]);
    })();
  }, []);

  if (!rows) return <Loading />;

  function exportCsv() {
    const csv = ["email,source,signed_up"]
      .concat((rows ?? []).map((r) => `${r.email},${r.source ?? ""},${r.created_at}`))
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "fga-subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-6">
      <AdminHeading
        title="Subscribers"
        description={`${rows.length} people on the newsletter list.`}
        action={
          <button
            type="button"
            onClick={exportCsv}
            className="press inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-semibold hover:bg-muted"
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>
        }
      />

      <Panel>
        {rows.length === 0 ? <EmptyState>No subscribers yet.</EmptyState> : null}
        <ul className="grid gap-2">
          {rows.map((r) => (
            <li key={r.id} className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{r.email}</p>
                <p className="text-xs text-muted-foreground">
                  {r.source ?? "website"} · {new Date(r.created_at).toLocaleDateString()}
                </p>
              </div>
              <button
                type="button"
                onClick={async () => {
                  const { error } = await supabase.from("newsletter_subscribers").delete().eq("id", r.id);
                  if (error) return toast.error(error.message);
                  setRows((p) => (p ?? []).filter((x) => x.id !== r.id));
                  toast.success("Removed.");
                }}
                className="press inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-destructive hover:bg-muted"
                aria-label={`Remove ${r.email}`}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
