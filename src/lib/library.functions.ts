import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * Returns a short-lived signed download link for an ebook PDF, but only when the
 * signed-in reader actually owns a paid copy of that book.
 */
export const getEbookLink = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ slug: z.string().min(1).max(160) }).parse(data))
  .handler(async ({ data, context }) => {
    const { data: owned, error } = await context.supabase
      .from("order_items")
      .select("book_slug,file_url,orders!inner(user_id,status)")
      .eq("book_slug", data.slug)
      .eq("orders.user_id", context.userId)
      .eq("orders.status", "paid")
      .limit(1)
      .maybeSingle();

    if (error) throw new Error(error.message);
    if (!owned) throw new Error("You do not own this ebook yet.");

    const path = owned.file_url ?? `${data.slug}.pdf`;
    if (!path) throw new Error("This ebook file is not available yet.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: signed, error: signError } = await supabaseAdmin.storage
      .from("ebooks")
      .createSignedUrl(path.replace(/^ebooks\//, ""), 60 * 60);

    if (signError || !signed) throw new Error(signError?.message ?? "Could not prepare the file.");
    return { url: signed.signedUrl };
  });
