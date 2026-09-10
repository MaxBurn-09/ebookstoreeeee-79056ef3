import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { StoreProvider } from "../lib/store";
import { CatalogProvider } from "../lib/catalog-store";
import { Header } from "../components/site/Header";
import { Footer } from "../components/site/Footer";
import { CartDrawer } from "../components/site/CartDrawer";
import { Toaster } from "../components/ui/sonner";
import { PageTransition } from "../components/site/PageTransition";
import { SearchDialog } from "../components/site/SearchDialog";
import { MobileTabBar } from "../components/site/MobileTabBar";
import { storeConfig } from "../data/catalog";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Future Grow Academy — Premium Self-Growth eBooks Worldwide" },
      {
        name: "description",
        content:
          "Future Grow Academy publishes practical ebooks on mindset, money, relationships, parenting and health. Instant PDF download worldwide in USD from $2.97.",
      },
      { name: "author", content: "Future Grow Academy" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#1a1f33" },
      { property: "og:site_name", content: "Future Grow Academy" },
      { property: "og:locale", content: "en_US" },
      { property: "og:title", content: "Future Grow Academy — Premium Self-Growth eBooks Worldwide" },
      {
        property: "og:description",
        content:
          "Practical self-growth ebooks. Instant download, no shipping, USD pricing for readers worldwide.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `${storeConfig.siteUrl}/logo-fga.png` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@AcademyFGA" },
      { name: "twitter:image", content: `${storeConfig.siteUrl}/logo-fga.png` },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/logo-fga.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/logo-fga.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: storeConfig.name,
        url: storeConfig.siteUrl,
        logo: `${storeConfig.siteUrl}/logo-fga.png`,
        email: storeConfig.email,
        telephone: storeConfig.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: "134, Sector 105",
          addressLocality: "Gurgaon",
          addressCountry: "IN",
        },
        sameAs: storeConfig.socials.map((s) => s.href),
      },
      {
        "@type": "WebSite",
        name: storeConfig.name,
        url: storeConfig.siteUrl,
        inLanguage: "en",
        potentialAction: {
          "@type": "SearchAction",
          target: `${storeConfig.siteUrl}/books?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing =
        el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
      if (typing) return;
      if (e.key === "/" || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CatalogProvider>
      <StoreProvider>
        <div className="flex min-h-screen flex-col">
          <Header onSearch={() => setSearchOpen(true)} />
          <main id="main" className="flex-1 pb-14 md:pb-0">
            <PageTransition>
              {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
              <Outlet />
            </PageTransition>
          </main>
          <Footer />
        </div>
        <MobileTabBar onSearch={() => setSearchOpen(true)} />
        <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
        <CartDrawer />
        <Toaster />
      </StoreProvider>
      </CatalogProvider>
    </QueryClientProvider>
  );
}
