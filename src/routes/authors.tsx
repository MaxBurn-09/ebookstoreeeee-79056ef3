import { createFileRoute } from "@tanstack/react-router";
import { authors } from "@/data/catalog";
import { SectionHeader } from "@/components/site/SectionHeader";
import { AuthorCard } from "@/components/site/AuthorCard";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/authors")({
  head: () => ({
    meta: [
      { title: "Featured Authors — Page & Pine Bookshop" },
      {
        name: "description",
        content: "Meet the writers we keep recommending — novelists, essayists and memoirists.",
      },
      { property: "og:title", content: "Featured Authors — Page & Pine Bookshop" },
      {
        property: "og:description",
        content: "Meet the writers we keep recommending at Page & Pine.",
      },
    ],
  }),
  component: AuthorsPage,
});

function AuthorsPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeader
        eyebrow="In conversation"
        title="Authors we love"
        subtitle="The voices behind our most-recommended shelves."
      />
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
        {authors.map((a, i) => (
          <Reveal key={a.slug} delay={Math.min(i * 90, 500)}>
            <AuthorCard author={a} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
