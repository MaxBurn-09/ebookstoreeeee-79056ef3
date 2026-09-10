import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MapPin, Clock, Phone } from "lucide-react";
import { storeConfig } from "@/data/catalog";
import { programs } from "@/data/academy";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Connect — enrol in a Future Grow Academy programme" },
      {
        name: "description",
        content:
          "Ask about Future Grow Academy programmes, ebook downloads or an order. Gurgaon office, worldwide readers.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
    <PageHero
      eyebrow="Connect"
      title="Talk to the academy about a programme"
      subtitle="Questions about a cohort, a download, or which path to start — we reply within a day."
    />
    <div className="container-page py-10 sm:py-14">

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Mail, title: "Email", value: storeConfig.email, href: `mailto:${storeConfig.email}` },
          { icon: Phone, title: "Phone", value: storeConfig.phone, href: storeConfig.phoneHref },
          { icon: MapPin, title: "Studio", value: storeConfig.address },
          { icon: Clock, title: "Response", value: "Within 24 hours, every day" },
        ].map(({ icon: Icon, title, value, href }, i) => (
          <Reveal key={title} delay={i * 70}>
            <div className="hover-lift h-full rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <Icon className="h-6 w-6 text-forest" />
              <h2 className="mt-4 text-[0.68rem] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                {title}
              </h2>
              {href ? (
                <a href={href} className="link-sweep mt-2 block text-sm font-medium hover:text-primary">
                  {value}
                </a>
              ) : (
                <p className="mt-2 text-sm leading-relaxed">{value}</p>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Reveal>
          <form
            className="rounded-2xl border border-border bg-card p-6 sm:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              toast.success("Message received — we will reply by email.");
            }}
          >
            <h2 className="text-xl font-semibold">Programme enquiry</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tell us what you want to work on. We will point you to the right programme and ebooks.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-sm sm:col-span-1">
                <span className="mb-1.5 block text-xs text-muted-foreground">Name</span>
                <input required className="h-11 w-full rounded-lg border border-border px-3 text-sm" />
              </label>
              <label className="text-sm">
                <span className="mb-1.5 block text-xs text-muted-foreground">Email</span>
                <input type="email" required className="h-11 w-full rounded-lg border border-border px-3 text-sm" />
              </label>
            </div>
            <label className="mt-4 block text-sm">
              <span className="mb-1.5 block text-xs text-muted-foreground">Programme</span>
              <select className="h-11 w-full rounded-lg border border-border px-3 text-sm">
                <option value="">Not sure yet</option>
                {programs.map((p) => (
                  <option key={p.slug}>{p.title}</option>
                ))}
              </select>
            </label>
            <label className="mt-4 block text-sm">
              <span className="mb-1.5 block text-xs text-muted-foreground">Message</span>
              <textarea required rows={5} className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
            </label>
            <button
              type="submit"
              disabled={sent}
              className="press mt-5 h-12 rounded-full bg-foreground px-7 text-sm font-semibold text-background disabled:opacity-60"
            >
              {sent ? "Sent" : "Send message"}
            </button>
          </form>
        </Reveal>
        <Reveal delay={100}>
          <div>
            <h2 className="text-xl font-semibold">Browse programmes</h2>
            <ul className="mt-4 space-y-3">
              {programs.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/program/$slug"
                    params={{ slug: p.slug }}
                    className="link-sweep text-sm font-medium hover:text-primary"
                  >
                    {p.title}
                    <span className="block text-xs font-normal text-muted-foreground">{p.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              {storeConfig.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="press inline-flex h-10 items-center rounded-full border border-border px-5 text-xs font-semibold hover:bg-foreground hover:text-background"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
    </>
  );
}
