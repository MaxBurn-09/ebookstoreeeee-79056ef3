import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { programs, authors } from "@/data/academy";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/authors")({
  head: () => ({
    meta: [
      { title: "Programmes & faculty — Future Grow Academy" },
      {
        name: "description",
        content:
          "Six Future Grow Academy programmes and the faculty who write them: mindset, relationships, money, health and parenting.",
      },
    ],
  }),
  component: AuthorsLayout,
});

function AuthorsLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/authors") return <Outlet />;
  return <AuthorsPage />;
}

function AuthorsPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeader
        eyebrow="Programmes"
        title="Courses, not a generic authors wall"
        subtitle="The old bookstore authors page is now the academy catalogue: sequenced programmes plus the faculty who teach them."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {programs.map((program, i) => (
          <Reveal key={program.slug} delay={Math.min(i * 60, 360)}>
            <Link
              to="/program/$slug"
              params={{ slug: program.slug }}
              className="hover-lift flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8"
            >
              <p className="eyebrow">{program.category}</p>
              <h2 className="mt-2 text-2xl font-semibold">{program.title}</h2>
              <p className="mt-2 text-xs text-muted-foreground">
                {program.duration} · {program.format}
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{program.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                Open programme <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <section className="mt-20">
        <SectionHeader eyebrow="Faculty" title="Who writes the work" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {authors.map((author, i) => (
            <Reveal key={author.id} delay={i * 70}>
              <Link
                to="/authors/$slug"
                params={{ slug: author.slug }}
                className="hover-lift block h-full rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                {author.photo ? (
                  <img
                    src={author.photo}
                    alt=""
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-foreground text-sm font-semibold text-background">
                    {author.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                )}
                <h3 className="mt-4 text-base font-semibold">{author.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{author.role}</p>
                <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted-foreground">{author.bio}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
