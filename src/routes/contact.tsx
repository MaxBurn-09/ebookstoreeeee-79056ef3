import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { storeConfig } from "@/data/catalog";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Connect With Us — Future Grow Academy",
      description:
        "Questions about your eBook download, an order or our digital marketing services? Message the Future Grow Academy team by email or WhatsApp — we reply within 24 – 48 hours.",
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  const wa = `https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent(
    "Hi Future Grow Academy, I have a question.",
  )}`;

  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeader
        eyebrow="We're here"
        title="Connect with us"
        subtitle="Have a question, need support, or want to learn more about our services? Don't hesitate to contact us. Our team is here to help."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: Mail,
            title: "Email us",
            value: storeConfig.email,
            href: `mailto:${storeConfig.email}`,
          },
          {
            icon: MessageCircle,
            title: "WhatsApp",
            value: "Chat with us instantly",
            href: wa,
            external: true,
          },
          { icon: MapPin, title: "Our office", value: storeConfig.address },
          { icon: Clock, title: "Response time", value: "We'll get back to you within 24 – 48 hours" },
        ].map(({ icon: Icon, title, value, href, external }, i) => (
          <Reveal key={title} delay={i * 80} className="h-full">
            <div className="hover-lift h-full rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-colors hover:border-foreground/25">
              <Icon
                className={`h-6 w-6 ${title === "WhatsApp" ? "text-[#25D366]" : "text-[var(--brand-red)]"}`}
              />
              <h2 className="mt-4 text-[0.68rem] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                {title}
              </h2>
              {href ? (
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="link-sweep mt-2 block text-sm font-medium hover:text-primary"
                >
                  {value}
                </a>
              ) : (
                <p className="mt-2 text-sm leading-relaxed">{value}</p>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <ContactForm />
        </Reveal>

        <Reveal delay={120}>
          <div className="h-full rounded-2xl border border-border bg-secondary/50 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">Good to know</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{storeConfig.note}</p>
            <h3 className="mt-6 text-[0.68rem] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              Follow us
            </h3>
            <div className="mt-3 flex flex-wrap gap-3">
              {storeConfig.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="press inline-flex h-10 items-center rounded-full border border-border px-5 text-xs font-semibold transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function ContactForm() {
  const [sending, setSending] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const subject = String(data.get("subject") ?? "Website enquiry");
    const message = String(data.get("message") ?? "");
    setSending(true);
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${encodeURIComponent(message)}`;
    window.location.href = `mailto:${storeConfig.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
    toast.success("Opening your email app with the message ready to send.");
    setSending(false);
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8"
    >
      <h2 className="text-2xl font-semibold">Send us a message</h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Fill in the form and we will reply within 24 – 48 hours.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Your name" name="name" placeholder="Jane Cooper" required />
        <Field label="Email address" name="email" type="email" placeholder="you@email.com" required />
      </div>
      <div className="mt-4">
        <Field label="Subject" name="subject" placeholder="Order help, services, feedback…" />
      </div>
      <div className="mt-4">
        <label className="block text-[0.72rem] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
          Message
          <textarea
            name="message"
            rows={5}
            required
            placeholder="Tell us how we can help."
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-normal tracking-normal normal-case outline-none focus:border-foreground/40"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="press mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-semibold text-background hover:bg-foreground/90 disabled:opacity-60 sm:w-auto sm:px-8"
      >
        <Send className="h-4 w-4" aria-hidden /> Send message
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-[0.72rem] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm font-normal tracking-normal normal-case outline-none focus:border-foreground/40"
      />
    </label>
  );
}
