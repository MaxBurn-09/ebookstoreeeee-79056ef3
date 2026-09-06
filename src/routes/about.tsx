import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import promo from "@/assets/promo-reading.jpg";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";
import { whyUs, benefits, storeConfig } from "@/data/catalog";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Future Grow Academy — Practical Self-Growth eBooks" },
      {
        name: "description",
        content:
          "Future Grow Academy creates practical, premium ebooks on mindset, money, relationships, parenting and health for readers in the USA and around the world.",
      },
      { property: "og:title", content: "About Future Grow Academy" },
      {
        property: "og:description",
        content:
          "Clarity-driven growth for real life, real change and lasting confidence — instant PDF ebooks read worldwide.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeader eyebrow="Our story" title="Growth made practical" subtitle={storeConfig.tagline} />

      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <img
            src={promo}
            alt="A reader working through a Future Grow Academy ebook on a tablet"
            className="hover-lift rounded-lg object-cover"
            loading="lazy"
          />
        </Reveal>
        <Reveal delay={120}>
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Future Grow Academy exists for people who want real change, not more theory. Every
              title is written as a short, structured programme you can finish and actually apply —
              guided exercises, clear frameworks and daily action steps.
            </p>
            <p>
              Our readers are in the United States, Europe, the Middle East, Asia and beyond. Because
              every book is a digital PDF, there is no shipping and no waiting: you pay, you
              download, you start the same day on your phone, tablet or laptop.
            </p>
            <p>{storeConfig.note}</p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                ["15", "Premium ebooks"],
                ["$2.97", "Every title today"],
                ["4.8", "Average reader rating"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="font-serif text-2xl text-foreground sm:text-3xl">{value}</p>
                  <p className="text-[0.62rem] tracking-[0.16em] uppercase">{label}</p>
                </div>
              ))}
            </div>
            <Link
              to="/books"
              preload="intent"
              className="press group mt-2 inline-flex items-center gap-2 rounded-sm bg-forest px-6 py-3 text-[0.7rem] font-semibold tracking-[0.16em] text-forest-foreground uppercase transition-all hover:-translate-y-0.5 hover:bg-charcoal"
            >
              Browse the library
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>

      <section className="mt-20">
        <SectionHeader eyebrow="Why readers choose us" title="What you get every time" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((w, i) => (
            <Reveal key={w.title} delay={Math.min(i * 90, 400)}>
              <div className="hover-lift h-full rounded-lg border border-border bg-card p-6">
                <span className="text-2xl">{w.emoji}</span>
                <h3 className="mt-3 font-serif text-lg">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((b, i) => (
          <Reveal key={b.title} delay={Math.min(i * 80, 360)}>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-cream p-5">
              <span className="text-xl">{b.emoji}</span>
              <div>
                <p className="text-sm font-semibold">{b.title}</p>
                <p className="text-xs text-muted-foreground">{b.note}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
