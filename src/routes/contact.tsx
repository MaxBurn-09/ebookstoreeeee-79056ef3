import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Clock } from "lucide-react";
import { storeConfig } from "@/data/catalog";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Connect With Us — Future Grow Academy" },
      {
        name: "description",
        content:
          "Questions about your ebook download or order? Reach the Future Grow Academy support team by email — readers welcome from the USA, Europe, India and worldwide.",
      },
      { property: "og:title", content: "Connect With Us — Future Grow Academy" },
      {
        property: "og:description",
        content: "Reach the Future Grow Academy support team about your ebook order or download.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeader
        eyebrow="We're here"
        title="Connect with us"
        subtitle="Digital products, human support. We reply to every message."
      />

      <div className="grid gap-6 sm:grid-cols-3">
        {[
          { icon: Mail, title: "Email us", value: storeConfig.email, href: `mailto:${storeConfig.email}` },
          { icon: MapPin, title: "Our office", value: storeConfig.address },
          { icon: Clock, title: "Response time", value: "Within 24 hours, every day" },
        ].map(({ icon: Icon, title, value, href }, i) => (
          <Reveal key={title} delay={i * 90}>
            <div className="hover-lift h-full rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-colors hover:border-forest">
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

      <Reveal delay={140}>
        <div className="mt-10 rounded-2xl border border-border bg-secondary/50 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">Good to know</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {storeConfig.note}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
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
  );
}
