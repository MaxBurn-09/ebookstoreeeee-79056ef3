import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const placeOrderSchema = z.object({
  fullName: z.string().min(1).max(120),
  email: z.string().email(),
  provider: z.enum(["razorpay", "paypal"]),
  items: z
    .array(
      z.object({
        slug: z.string().min(1),
        quantity: z.number().int().min(1).max(20),
      }),
    )
    .min(1)
    .max(30),
});

export const placeOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => placeOrderSchema.parse(data))
  .handler(async ({ data, context }) => {
    const supabase = context.supabase;
    const slugs = data.items.map((i) => i.slug);

    const { data: books, error: booksError } = await supabase
      .from("books")
      .select("slug,title,cover_url,file_url,price")
      .in("slug", slugs)
      .eq("published", true);
    if (booksError) throw new Error(booksError.message);
    if (!books || books.length === 0) throw new Error("These ebooks are no longer available.");

    const lines = data.items
      .map((item) => {
        const book = books.find((b) => b.slug === item.slug);
        return book ? { book, quantity: item.quantity } : null;
      })
      .filter(Boolean) as { book: (typeof books)[number]; quantity: number }[];

    if (lines.length === 0) throw new Error("These ebooks are no longer available.");

    const total = lines.reduce((sum, l) => sum + Number(l.book.price) * l.quantity, 0);

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: context.userId,
        email: data.email,
        full_name: data.fullName,
        total,
        currency: "USD",
        status: "paid",
        provider: data.provider,
      })
      .select("id")
      .single();
    if (orderError || !order) throw new Error(orderError?.message ?? "Could not create the order.");

    const { error: itemsError } = await supabase.from("order_items").insert(
      lines.map((l) => ({
        order_id: order.id,
        book_slug: l.book.slug,
        title: l.book.title,
        cover_url: l.book.cover_url,
        file_url: l.book.file_url,
        price: Number(l.book.price),
        quantity: l.quantity,
      })),
    );
    if (itemsError) throw new Error(itemsError.message);

    return { orderId: order.id, total };
  });

export const getMyOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("orders")
      .select(
        "id,total,currency,status,provider,created_at,order_items(id,book_slug,title,cover_url,file_url,price,quantity)",
      )
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });
