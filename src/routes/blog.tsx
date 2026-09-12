import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import {
  sortedPosts,
  blogCategories,
  blogAuthors,
  allTags,
  tagSlug,
  type BlogPost,
} from "@/data/blog";
import { Reveal } from "@/components/site/Reveal";
import { pageHead, breadcrumbLd, SITE_URL } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/blog")({
  head: () =>
    pageHead({
      title: "Self-Growth Blog — Mindset, Money, Relationships | Future Grow Academy",
      description:
        "Practical guides on purpose, habits, online income, parenting and relationships, written for readers in the USA and India by the Future Grow Academy team.",
      path: "/blog",
      jsonLd: [
        breadcrumbLd([
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Future Grow Academy Blog",
          url: `${SITE_URL}/blog`,
          blogPost: sortedPosts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            datePublished: p.date,
            url: `${SITE_URL}/blog/${p.slug}`,
          })),
        },
      ],
    }),
  component: BlogIndex,
});

function BlogIndex() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [tag, setTag] = useState<string>("all");

  const posts = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return sortedPosts.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (tag !== "all" && !p.tags.some((t) => tagSlug(t) === tag)) return false;
      if (!needle) return true;
      return (
        p.title.toLowerCase().includes(needle) ||
        p.excerpt.toLowerCase().includes(needle) ||
        p.tags.some((t) => t.toLowerCase().includes(needle))
      );
    });
  }, [q, cat, tag]);

  const featured = sortedPosts.find((p) => p.featured) ?? sortedPosts[0];

  return (
    <div className="pb-20">
      <section className="border-b border-border bg-secondary/40 py-14 md:py-20">
        <div className="container-page">
          <nav aria-label="Breadcrumb" className="text-[0.75rem] text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="px-2">/</span>
            <span className="text-foreground">Blog</span>
          </nav>
          <Reveal>
            <p className="eyebrow mt-8">Ideas you can act on today</p>
            <h1 className="mt-3 max-w-3xl text-3xl leading-[1.08] sm:text-5xl">
              The Future Grow Academy blog
            </h1>
            <p className="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground">
              Short, structured articles on purpose, habits, money, relationships and parenting —
              written by the same team behind our 15 ebooks.
            </p>
          </Reveal>
        </div>
      </section>

      {featured ? (
        <section className="container-page pt-12">
          <Reveal>
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              preload="intent"
              className="hover-lift group block rounded-2xl border border-border bg-card p-7 sm:p-10"
            >
              <span className="eyebrow">Featured</span>
              <h2 className="mt-3 max-w-3xl text-2xl leading-snug sm:text-3xl">{featured.title}</h2>
              <p className="mt-4 max-w-2xl text-[0.9rem] leading-relaxed text-muted-foreground">
                {featured.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-primary">
                Read the article
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        </section>
      ) : null}

      <section className="container-page pt-12">
        <div className="flex flex-col gap-4 rule-top pt-8 md:flex-row md:items-center md:justify-between">
          <label className="relative flex w-full max-w-sm items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground" aria-hidden />
            <span className="sr-only">Search articles</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search articles"
              className="h-11 w-full rounded-full border border-border bg-background pl-10 pr-4 text-[0.85rem] outline-none focus-visible:border-foreground/30"
            />
          </label>

          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
            <Chip active={cat === "all"} onClick={() => setCat("all")}>
              All topics
            </Chip>
            {blogCategories.map((c) => (
              <Chip key={c.slug} active={cat === c.slug} onClick={() => setCat(c.slug)}>
                {c.name}
              </Chip>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-1">Tags</span>
          <Chip active={tag === "all"} onClick={() => setTag("all")}>
            All
          </Chip>
          {allTags.map((t) => (
            <Chip key={t} active={tag === tagSlug(t)} onClick={() => setTag(tagSlug(t))}>
              {t}
            </Chip>
          ))}
        </div>

        {posts.length === 0 ? (
          <p className="mt-14 text-[0.9rem] text-muted-foreground">
            No articles match that search yet.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={Math.min(i * 50, 300)} className="h-full">
                <PostCard post={p} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <section className="container-page mt-16 rule-top pt-10">
        <h2 className="eyebrow">Written by</h2>
        {blogAuthors.map((a) => (
          <div key={a.slug} className="mt-4 max-w-2xl">
            <p className="text-[0.95rem] font-semibold">{a.name}</p>
            <p className="text-[0.78rem] text-muted-foreground">{a.role}</p>
            <p className="mt-2 text-[0.86rem] leading-relaxed text-muted-foreground">{a.bio}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "press shrink-0 rounded-full border px-3.5 py-1.5 text-[0.76rem] font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

export function PostCard({ post }: { post: BlogPost }) {
  const cat = blogCategories.find((c) => c.slug === post.category);
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      preload="intent"
      className="hover-lift group flex h-full flex-col rounded-xl border border-border bg-card p-6"
    >
      <span className="eyebrow">{cat?.name ?? post.category}</span>
      <h3 className="mt-2.5 text-[1.05rem] leading-snug font-semibold">{post.title}</h3>
      <p className="mt-3 line-clamp-3 text-[0.84rem] leading-relaxed text-muted-foreground">
        {post.excerpt}
      </p>
      <span className="mt-5 flex items-center justify-between text-[0.74rem] text-muted-foreground">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </time>
        <span>{post.readingMinutes} min read</span>
      </span>
    </Link>
  );
}
