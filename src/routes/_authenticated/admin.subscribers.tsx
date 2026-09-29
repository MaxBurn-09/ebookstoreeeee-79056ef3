import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Download, Loader2, Send, Trash2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { sendNewsletter } from "@/lib/newsletter.functions";
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

      <NewsletterComposer />

      <Panel title="Footer sign-ups">
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
                  if (error) {
      toast.error(error.message);
      return;
    }
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

function NewsletterComposer() {
  const send = useServerFn(sendNewsletter);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState<null | "test" | "all">(null);
  const go = async (testOnly: boolean) => {
    if (!testOnly && !window.confirm("Send this newsletter to every registered customer?")) return;
    setBusy(testOnly ? "test" : "all");
    try {
      const r = await send({ data: { subject, body, testOnly } });
      toast.success(testOnly ? "Test sent to your inbox." : `Newsletter sent to ${r.sent} customers.`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not send.");
    } finally {
      setBusy(null);
    }
  };
  const ready = subject.trim().length >= 3 && body.trim().length >= 10;
  return (
    <Panel title="Send newsletter" description="Emails every customer who has created an account. Send a test to yourself first.">
      <label className="block text-sm font-medium" htmlFor="nl-subject">Subject</label>
      <input id="nl-subject" value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={150} className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
      <label className="mt-4 block text-sm font-medium" htmlFor="nl-body">Message</label>
      <textarea id="nl-body" value={body} onChange={(e) => setBody(e.target.value)} rows={8} maxLength={20000} placeholder="Leave a blank line between paragraphs." className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" disabled={!ready || !!busy} onClick={() => go(true)} className="press inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-semibold hover:bg-muted disabled:opacity-50">
          {busy === "test" ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Send test to me
        </button>
        <button type="button" disabled={!ready || !!busy} onClick={() => go(false)} className="press inline-flex h-11 items-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-primary-foreground disabled:opacity-50">
          {busy === "all" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Send to all customers
        </button>
      </div>
    </Panel>
  );
}
