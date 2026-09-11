export const SITE_URL = "https://ebookstoreeeee.lovable.app";
export const SITE_NAME = "Future Grow Academy";

type HeadOpts = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "product";
  image?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

/** Builds a complete, self-referencing head() payload for a route. */
export function pageHead({ title, description, path, type = "website", image, noindex, jsonLd }: HeadOpts) {
  const url = `${SITE_URL}${path}`;
  const meta: Record<string, string>[] = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { name: "twitter:card", content: image ? "summary_large_image" : "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
  if (image) {
    meta.push({ property: "og:image", content: image }, { name: "twitter:image", content: image });
  }
  if (noindex) meta.push({ name: "robots", content: "noindex, nofollow" });

  const scripts = jsonLd
    ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map((data) => ({
        type: "application/ld+json",
        children: JSON.stringify(data),
      }))
    : undefined;

  return {
    meta,
    links: [{ rel: "canonical", href: url }],
    ...(scripts ? { scripts } : {}),
  };
}

export type Crumb = { label: string; href: string };

export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${SITE_URL}${c.href}`,
    })),
  };
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  email: "help@futuregrowacademy.co",
  address: {
    "@type": "PostalAddress",
    streetAddress: "134, Sector 105",
    addressLocality: "Gurgaon",
    addressRegion: "Haryana",
    addressCountry: "IN",
  },
  areaServed: ["US", "IN", "GB", "CA", "AU", "AE", "SG", "DE"],
  sameAs: [
    "http://facebook.com/AcademyFGA",
    "http://twitter.com/AcademyFGA",
    "http://instagram.com/futuregrowacademy",
    "https://www.youtube.com/@FutureGrowAcademy",
    "https://www.pinterest.com/FutureGrowAcademy/",
    "http://linkedin.com/company/futuregrowacademy",
  ],
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/books?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};
