import { createFileRoute } from "@tanstack/react-router";
import { books, categories } from "@/data/catalog";
import { locations } from "@/data/locations";
import { blogPosts } from "@/data/blog";

const SITE = "https://ebookstoreeeee.lovable.app";

function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const staticPaths = [
    "/",
    "/books",
    "/categories",
    "/new-arrivals",
    "/blog",
    "/locations",
    "/about",
    "/contact",
    "/wishlist",
    "/cart",
  ];

  const urls = [
    ...staticPaths.map((p) => ({ loc: `${SITE}${p}`, priority: p === "/" ? "1.0" : "0.8" })),
    ...books.map((b) => ({ loc: `${SITE}/book/${b.slug}`, priority: "0.7" })),
    ...categories.map((c) => ({ loc: `${SITE}/books?category=${c.slug}`, priority: "0.6" })),
    ...locations.map((l) => ({ loc: `${SITE}/locations/${l.slug}`, priority: "0.6" })),
    ...blogPosts.map((p) => ({ loc: `${SITE}/blog/${p.slug}`, priority: "0.6" })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${u.loc.replace(/&/g, "&amp;")}</loc><lastmod>${today}</lastmod><priority>${u.priority}</priority></url>`,
  )
  .join("\n")}
</urlset>`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});
