import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AdminHeading, Badge, EmptyState, Loading, Panel } from "@/components/admin/ui";

export const Route = createFileRoute("/_authenticated/admin/orders")({
  component: OrdersAdmin,
});

type Item = { id: string; title: string; price: number; quantity: number };
type Order = {
  id: string;
  email: string;
  full_name: string | null;
  total: number;
  currency: string;
  status: string;
  provider: string | null;
  created_at: string;
  order_items: Item[];
};

function OrdersAdmin() {
  const [rows, setRows] = useState<Order[] | null>(null);

  useEffect(() => {
    void (async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("id,email,full_name,total,currency,status,provider,created_at,order_items(id,title,price,quantity)")
        .order("created_at", { ascending: false });
      if (error) toast.error(error.message);
      setRows((data ?? []) as Order[]);
    })();
  }, []);

  if (!rows) return <Loading />;

  const revenue = rows
    .filter((o) => o.status === "paid")
    .reduce((sum, o) => sum + Number(o.total ?? 0), 0);

  return (
    <div className="grid gap-6">
      <AdminHeading
        title="Orders"
        description={`${rows.length} orders · $${revenue.toFixed(2)} collected from paid orders.`}
      />

      <Panel>
        {rows.length === 0 ? <EmptyState>No orders yet.</EmptyState> : null}
        <div className="grid gap-3">
          {rows.map((o) => (
            <article key={o.id} className="rounded-xl border border-border p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{o.full_name || o.email}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {o.email} · {new Date(o.created_at).toLocaleString()} · {o.provider ?? "—"}
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  {o.status === "paid" ? <Badge tone="good">Paid</Badge> : <Badge tone="warn">{o.status}</Badge>}
                  <span className="text-sm font-semibold">
                    {o.currency} {Number(o.total).toFixed(2)}
                  </span>
                </div>
              </div>
              <ul className="mt-3 grid gap-1 border-t border-border pt-3 text-xs text-muted-foreground">
                {(o.order_items ?? []).map((i) => (
                  <li key={i.id} className="flex justify-between gap-3">
                    <span className="truncate">
                      {i.title} × {i.quantity}
                    </span>
                    <span>${Number(i.price).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Panel>
    </div>
  );
}
