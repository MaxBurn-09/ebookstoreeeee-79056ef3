import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Clock, Share2, Link2 } from "lucide-react";
import {
  postBySlug,
  authorBySlug,
  categoryBySlug,
  relatedPosts,
  headingId,
  tagSlug,
} from "@/data/blog";
import { bySlug } from "@/data/catalog";
import { BookGrid } from "@/components/site/BookGrid";
import { Reveal } from "@/components/site/Reveal";
import { pageHead, breadcrumbLd, SITE_URL, SITE_NAME } from "@/lib/seo";
import { toast } from "sonner";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = postBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    const p = loaderData?.post;
    if (!p) return {};
    return pageHead({
      title: `${p.title} | ${SITE_NAME}`,
      description: p.excerpt,
      path: `/blog/${params.slug}`,
      type: "article",
      jsonLd: [
        breadcrumbLd([
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: p.title, href: `/blog/${p.slug}` },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: p.title,
          description: p.excerpt,
          datePublished: p.date,
          dateModified: p.date,
          keywords: p.tags.join(", "),
          author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          mainEntityOfPage: `${SITE_URL}/blog/${p.slug}`,
        },
      ],
    });
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const author = authorBySlug(post.author);
  const category = categoryBySlug(post.category);
  const related = relatedPosts(post);
  const relatedBooks = post.relatedBooks.map(bySlug).filter(Boolean) as NonNullable<
    ReturnType<typeof bySlug>
  >[];
  const progress = useReadingProgress();

  const share = async () => {
    const url = `${SITE_URL}/blog/${post.slug}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: post.title, url });
        return;
      } catch {
        /* dismissed */
      }
    }
    await navigator.clipboard?.writeText(url);
    toast.success("Link copied");
  };

  return (
    <div className="pb-20">
      <div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-primary"
        style={{ transform: `scaleX(${progress})` }}
      />

      <article>
        <header className="border-b border-border bg-secondary/40 py-12 md:py-16">
          <div className="container-page">
            <nav aria-label="Breadcrumb" className="text-[0.75rem] text-muted-foreground">
              <Link to="/" className="hover:text-foreground">
                Home
              </Link>
              <span className="px-2">/</span>
              <Link to="/blog" className="hover:text-foreground">
                Blog
              </Link>
              <span className="px-2">/</span>
              <span className="text-foreground">{category?.name}</span>
            </nav>
            <p className="eyebrow mt-8">{category?.name}</p>
            <h1 className="mt-3 max-w-3xl text-3xl leading-[1.1] sm:text-[2.6rem]">{post.title}</h1>
            <p className="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.78rem] text-muted-foreground">
              <span>{author?.name}</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden />
                {post.readingMinutes} min read
              </span>
              <button
                type="button"
                onClick={share}
                className="press inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 hover:text-foreground"
              >
                <Share2 className="h-3.5 w-3.5" aria-hidden />
                Share
              </button>
            </div>
          </div>
        </header>

        <div className="container-page grid gap-12 pt-12 lg:grid-cols-[1fr_260px]">
          <div className="max-w-2xl">
            {post.sections.map((s) => (
              <section key={s.heading} className="mt-10 first:mt-0 scroll-mt-28" id={headingId(s.heading)}>
                <h2 className="text-xl sm:text-2xl">{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p} className="mt-4 text-[0.94rem] leading-[1.75] text-muted-foreground">
                    {p}
                  </p>
                ))}
                {s.list ? (
                  <ul className="mt-4 space-y-2">
                    {s.list.map((li) => (
                      <li
                        key={li}
                        className="flex gap-2.5 text-[0.9rem] leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
                        {li}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <ul className="mt-12 flex flex-wrap gap-2 rule-top pt-8">
              {post.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-border px-3 py-1 text-[0.74rem] text-muted-foreground"
                >
                  #{tagSlug(t)}
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:sticky lg:top-28 lg:h-max">
            <nav aria-label="Table of contents" className="rounded-xl border border-border bg-card p-5">
              <h2 className="eyebrow">On this page</h2>
              <ol className="mt-3 space-y-2">
                {post.sections.map((s) => (
                  <li key={s.heading}>
                    <a
                      href={`#${headingId(s.heading)}`}
                      className="text-[0.8rem] leading-snug text-muted-foreground hover:text-foreground"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="mt-5 rounded-xl border border-border bg-card p-5">
              <h2 className="text-[0.9rem] font-semibold">Read the full programme</h2>
              <p className="mt-2 text-[0.8rem] leading-relaxed text-muted-foreground">
                Every ebook is $2.97 with instant PDF download.
              </p>
              <Link
                to="/books"
                className="press mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-[0.8rem] font-medium text-primary-foreground"
              >
                Browse ebooks
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </article>

      {relatedBooks.length > 0 ? (
        <section className="section-y">
          <div className="container-page">
            <h2 className="text-2xl">Ebooks mentioned in this article</h2>
            <BookGrid items={relatedBooks} className="mt-8" />
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="border-t border-border bg-secondary/40 section-y">
          <div className="container-page">
            <h2 className="text-2xl">Keep reading</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 60} className="h-full">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    preload="intent"
                    className="hover-lift group flex h-full flex-col rounded-xl border border-border bg-card p-6"
                  >
                    <h3 className="text-[1rem] leading-snug font-semibold">{p.title}</h3>
                    <p className="mt-3 line-clamp-3 text-[0.83rem] leading-relaxed text-muted-foreground">
                      {p.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[0.76rem] text-primary">
                      <Link2 className="h-3.5 w-3.5" aria-hidden />
                      {p.readingMinutes} min read
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function useReadingProgress() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setValue(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return value;
}
