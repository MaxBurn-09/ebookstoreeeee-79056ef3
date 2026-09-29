import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Admin-only: emails a newsletter to every signed-up customer via Resend. */
export const sendNewsletter = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({ subject: z.string().trim().min(3).max(150), body: z.string().trim().min(10).max(20000), testOnly: z.boolean().default(false) }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (!isAdmin) throw new Error("Forbidden");
    const { resendBatch, RESEND_FROM, escapeHtml } = await import("./resend.server");

    let recipients: string[];
    if (data.testOnly) {
      const email = (context.claims as { email?: string }).email;
      if (!email) throw new Error("Your account has no email.");
      recipients = [email];
    } else {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data: rows, error } = await supabaseAdmin.from("profiles").select("email").not("email", "is", null);
      if (error) throw new Error("Could not load recipients.");
      recipients = [...new Set((rows ?? []).map((r) => (r.email ?? "").trim().toLowerCase()).filter((e) => e.includes("@")))];
    }

    const paragraphs = data.body.split(/\n{2,}/).map((p) => `<p style="margin:0 0 16px;line-height:1.6">${escapeHtml(p).replace(/\n/g, "<br/>")}</p>`).join("");
    const html = `<div style="background:#fff;font-family:Inter,Arial,sans-serif;color:#0B1633"><div style="max-width:560px;margin:0 auto;padding:32px 24px">
<p style="color:#D1002C;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin:0 0 16px">Future Grow Academy</p>
<h1 style="font-family:Georgia,serif;font-size:24px;margin:0 0 20px">${escapeHtml(data.subject)}</h1>${paragraphs}
<p style="margin:24px 0"><a href="https://futuregrowacademy.co/books" style="background:#D1002C;color:#fff;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:600">Browse ebooks</a></p>
<hr style="border:none;border-top:1px solid #E9E5DF;margin:24px 0"/>
<p style="font-size:12px;color:#5E6472">You're receiving this because you have an account at futuregrowacademy.co. To stop these emails, reply with "unsubscribe".</p></div></div>`;

    for (let i = 0; i < recipients.length; i += 100) {
      await resendBatch(recipients.slice(i, i + 100).map((to) => ({ from: RESEND_FROM, to: [to], subject: data.subject, html, reply_to: "help@futuregrowacademy.co" })));
    }
    return { sent: recipients.length };
  });
