import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import promo from "@/assets/promo-reading.jpg";
import { programs, authors } from "@/data/academy";
import { storeConfig } from "@/data/catalog";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The Academy — Future Grow Academy courses & programmes" },
      {
        name: "description",
        content:
          "Future Grow Academy programmes: mindset, relationships, digital wealth, health and calm parenting. Structured ebooks you finish and apply.",
      },
      { property: "og:title", content: "The Academy — Future Grow Academy" },
      {
        property: "og:description",
        content: "Six focused programmes built from the academy’s practical ebooks.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeader
        eyebrow="The academy"
        title="Courses built as programmes you can finish"
        subtitle="Future Grow Academy exists for people who want real change, not more theory. Every title is a short, structured programme — guided exercises, clear frameworks and daily action steps."
      />

      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <img
            src={promo}
            alt="Working through a Future Grow Academy programme"
            className="hover-lift w-full rounded-2xl object-cover"
            loading="lazy"
          />
        </Reveal>
        <Reveal delay={120}>
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Founded in 2021 in Gurgaon, the academy publishes digital programmes on mindset, career, money,
              relationships, parenting and health. Readers in the United States, Europe, the Middle East and Asia
              download a PDF and start the same day — no shipping, no waiting.
            </p>
            <p>
              The work is led by Dr. Ankit Sharma with faculty for relationships, parenting and health. You can
              buy a single ebook, or follow a sequenced programme that stacks two or three titles into a 21- to
              60-day sprint.
            </p>
            <p>{storeConfig.note}</p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                [String(programs.length), "Programmes"],
                [String(authors.length), "Faculty"],
                ["$2.97", "Per ebook today"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="text-2xl font-semibold text-foreground sm:text-3xl">{value}</p>
                  <p className="text-[0.62rem] tracking-[0.16em] uppercase">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <section className="mt-20">
        <SectionHeader
          eyebrow="How it works"
          title="Pick a programme, then buy the ebooks"
          subtitle="Each programme is a recommended reading path. Checkout is the same as the shop — instant PDF after payment."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, i) => (
            <Reveal key={program.slug} delay={Math.min(i * 70, 400)}>
              <Link
                to="/program/$slug"
                params={{ slug: program.slug }}
                className="hover-lift flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <p className="eyebrow">{program.category}</p>
                <h3 className="mt-2 text-lg font-semibold">{program.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  {program.duration} · {program.format}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{program.summary}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                  View programme <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
