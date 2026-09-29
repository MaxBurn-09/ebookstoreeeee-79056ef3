import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Clock, Loader2 } from "lucide-react";
import { getMyOrders } from "@/lib/orders.functions";
import { LibraryActions } from "@/components/site/LibraryActions";
import { formatPrice } from "@/data/catalog";

export const Route = createFileRoute("/_authenticated/order/$id")({
  head: () => ({
    meta: [
      { title: "Order confirmed — Future Grow Academy" },
      { name: "description", content: "Your Future Grow Academy order details and ebook downloads." },
      { property: "og:title", content: "Order confirmed — Future Grow Academy" },
      { property: "og:description", content: "Your order details and ebook downloads." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderPage,
});

function OrderPage() {
  const { id } = Route.useParams();
  const fetchOrders = useServerFn(getMyOrders);
  const { data, isLoading } = useQuery({ queryKey: ["my-orders"], queryFn: () => fetchOrders() });
  const order = data?.find((o) => o.id === id);

  if (isLoading) return <div className="section-y flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  if (!order) return <section className="section-y"><div className="container-page text-center"><h1 className="text-2xl font-semibold">Order not found</h1><Link to="/dashboard" className="mt-4 inline-flex text-sm font-semibold text-primary underline">Go to my library</Link></div></section>;

  const paid = order.status === "paid";
  return (
    <section className="section-y">
      <div className="container-page max-w-3xl">
        <div className="glass rounded-2xl border border-border p-6 text-center sm:p-10">
          {paid ? <CheckCircle2 className="mx-auto h-12 w-12 text-primary" /> : <Clock className="mx-auto h-12 w-12 text-muted-foreground" />}
          <h1 className="mt-4 text-3xl font-semibold">{paid ? "Thank you — order confirmed" : "Payment pending"}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Order #{order.id.slice(0, 8).toUpperCase()} · {new Date(order.created_at).toLocaleDateString()} · {(order.currency === "INR" ? `₹${Number(order.total).toLocaleString("en-IN")}` : formatPrice(Number(order.total)))}</p>
        </div>
        <ul className="mt-6 space-y-3">
          {order.order_items.map((i) => (
            <li key={i.id} className="glass flex items-center gap-4 rounded-xl border border-border p-4">
              {i.cover_url ? <img src={i.cover_url} alt="" className="h-20 w-14 rounded-md object-cover" /> : null}
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm font-semibold">{i.title}</p>
                <p className="text-xs text-muted-foreground">PDF · {formatPrice(Number(i.price))}</p>
                {paid ? <div className="mt-2 flex flex-wrap gap-2"><LibraryActions slug={i.book_slug} title={i.title} /></div> : null}
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center"><Link to="/dashboard" className="press btn-gloss inline-flex h-12 items-center rounded-full bg-brand px-6 text-sm font-semibold text-primary-foreground">View all orders</Link></div>
      </div>
    </section>
  );
}
