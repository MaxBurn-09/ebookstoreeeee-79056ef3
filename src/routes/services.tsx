import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search,
  Share2,
  PenLine,
  Megaphone,
  Mail,
  BarChart3,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { storeConfig } from "@/data/catalog";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () =>
    pageHead({
      title: "Digital Marketing Services — Future Grow Academy",
      description:
        "SEO, social media, content, paid ads, email marketing and analytics services from Future Grow Academy. Working with brands in the USA, Europe, the Middle East and India.",
      path: "/services",
    }),
  component: ServicesPage,
});

const services = [
  {
    icon: Search,
    title: "Search engine optimisation",
    note: "Technical fixes, keyword strategy, on-page work and content planning so the right people find you organically.",
  },
  {
    icon: Share2,
    title: "Social media management",
    note: "Planning, design and publishing across Instagram, Facebook, LinkedIn, Pinterest and YouTube, with a consistent brand voice.",
  },
  {
    icon: PenLine,
    title: "Content & copywriting",
    note: "Blogs, landing pages, product copy and email sequences written to inform first and convert second.",
  },
  {
    icon: Megaphone,
    title: "Paid advertising",
    note: "Google and Meta campaigns built around clear offers, tight audiences and budgets that stay accountable.",
  },
  {
    icon: Mail,
    title: "Email marketing & funnels",
    note: "Welcome flows, follow-ups and offer campaigns that keep your audience engaged long after the first visit.",
  },
  {
    icon: BarChart3,
    title: "Analytics & reporting",
    note: "Tracking set up properly, plus plain-language monthly reporting on what actually moved the numbers.",
  },
];

const steps = [
  { title: "Discovery call", note: "We understand your business, audience and goals." },
  { title: "Strategy", note: "A clear plan with priorities, timelines and what success looks like." },
  { title: "Execution", note: "We build, publish and optimise — you stay informed throughout." },
  { title: "Review & scale", note: "Monthly reporting, then we double down on what works." },
];

function ServicesPage() {
  const wa = `https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent(
    "Hi Future Grow Academy, I'd like to know more about your digital marketing services.",
  )}`;

  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeader
        eyebrow="Work with us"
        title="Digital marketing services"
        subtitle="Beyond our eBooks, we help brands grow online — strategy, search, content and campaigns delivered by a small, hands-on team."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ icon: Icon, title, note }, i) => (
          <Reveal key={title} delay={i * 70} className="h-full">
            <div className="hover-lift h-full rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <span
                className="grid h-11 w-11 place-items-center rounded-xl"
                style={{
                  background:
                    "linear-gradient(160deg, color-mix(in oklab, var(--brand-amber) 20%, var(--card)) 0%, color-mix(in oklab, var(--brand-orange) 12%, var(--card)) 100%)",
                }}
              >
                <Icon className="h-5 w-5 text-[var(--brand-red)]" strokeWidth={1.5} aria-hidden />
              </span>
              <h2 className="mt-4 text-[1.02rem] font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{note}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="mt-14 rounded-2xl border border-border bg-secondary/50 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">How we work</h2>
          <ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className="text-[0.66rem] font-semibold tracking-[0.2em] text-[var(--brand-red)] uppercase">
                  Step {i + 1}
                </span>
                <h3 className="mt-1.5 text-[0.98rem] font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      <Reveal delay={160}>
        <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="text-xl font-semibold">Tell us what you need</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Share your goals and we will reply within 24 – 48 hours with a plan and pricing.
            </p>
          </div>
          <div className="flex w-full flex-wrap gap-3 sm:w-auto">
            <Link
              to="/contact"
              className="press inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background hover:bg-foreground/90 sm:flex-none"
            >
              Contact us <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat with us on WhatsApp"
              className="press inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-border px-6 text-sm font-semibold hover:bg-muted sm:flex-none"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden /> WhatsApp
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
