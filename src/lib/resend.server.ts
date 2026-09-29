const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";
export const RESEND_FROM = "Future Grow Academy <hello@futuregrowacademy.co>";
export const ADMIN_EMAILS = ["help@futuregrowacademy.co", "shreejii.websolutions@gmail.com"];

function headers() {
  const lovable = process.env["LOVABLE_API_KEY"];
  const resend = process.env["RESEND_API_KEY"];
  if (!lovable || !resend) throw new Error("Email service is not configured.");
  return { "Content-Type": "application/json", Authorization: `Bearer ${lovable}`, "X-Connection-Api-Key": resend };
}

export type ResendEmail = { from: string; to: string[]; subject: string; html: string; text?: string; reply_to?: string };

export async function resendSend(email: ResendEmail) {
  const res = await fetch(`${GATEWAY_URL}/emails`, { method: "POST", headers: headers(), body: JSON.stringify(email) });
  if (!res.ok) throw new Error(`Resend failed [${res.status}]: ${await res.text()}`);
}

/** Up to 100 emails per call. */
export async function resendBatch(emails: ResendEmail[]) {
  const res = await fetch(`${GATEWAY_URL}/emails/batch`, { method: "POST", headers: headers(), body: JSON.stringify(emails) });
  if (!res.ok) throw new Error(`Resend failed [${res.status}]: ${await res.text()}`);
}

export const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
