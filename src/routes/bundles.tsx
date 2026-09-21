import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Package, ArrowRight } from "lucide-react";
import { bundles, bundleBooks, formatPrice, type Bundle } from "@/data/catalog";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";
import { useStore } from "@/lib/store";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/bundles")({
  head: () =>
    pageHead({
      title: "eBook Bundles & Combo Offers — Future Grow Academy",
      description:
        "Save more with curated eBook bundles: self-transformation, emotional healing, relationships and parenting, money skills, health and mental strength — from $9.97 with instant PDF download.",
      path: "/bundles",
    }),
  component: BundlesPage,
});

function BundlesPage() {
  const featured = bundles.filter((b) => b.featured);
  const more = bundles.filter((b) => !b.featured);

  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeader
        eyebrow="Combo offers"
        title="eBook bundles"
        subtitle="Grouped titles at one discounted price. Add a bundle and the combo price is applied automatically at checkout."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {featured.map((bundle, i) => (
          <Reveal key={bundle.slug} delay={i * 80} className="h-full">
            <BundleCard bundle={bundle} highlight />
          </Reveal>
        ))}
      </div>

      <h2 className="mt-14 text-2xl font-semibold">More bundles</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {more.map((bundle, i) => (
          <Reveal key={bundle.slug} delay={i * 70} className="h-full">
            <BundleCard bundle={bundle} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function BundleCard({ bundle, highlight = false }: { bundle: Bundle; highlight?: boolean }) {
  const { addBundleToCart } = useStore();
  const items = bundleBooks(bundle);
  const listed = items.reduce((sum, b) => sum + b.price, 0);
  const saving = Math.max(0, listed - bundle.price);

  return (
    <article
      className={`flex h-full flex-col rounded-2xl border bg-card p-6 shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1.5 ${
        highlight ? "border-brand" : "border-border"
      }`}
    >
      <div className="flex items-center gap-2 text-[var(--brand-red)]">
        <Package className="h-4 w-4" aria-hidden />
        <span className="text-[0.66rem] font-semibold tracking-[0.18em] uppercase">
          {items.length} eBooks
        </span>
      </div>

      <h3 className="mt-3 text-xl font-semibold">{bundle.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{bundle.description}</p>

      <ul className="mt-4 space-y-2">
        {items.map((b) => (
          <li key={b.id} className="flex gap-2 text-[0.82rem]">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--brand-orange)]" aria-hidden />
            <Link
              to="/book/$slug"
              params={{ slug: b.slug }}
              className="transition-colors hover:text-primary"
            >
              {b.title}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold">{formatPrice(bundle.price)}</span>
          {saving > 0 ? (
            <span className="text-sm text-muted-foreground line-through">{formatPrice(listed)}</span>
          ) : null}
        </div>
        {saving > 0 ? (
          <p className="mt-1 text-xs font-medium text-[var(--brand-red)]">
            You save {formatPrice(saving)}
          </p>
        ) : null}

        <button
          type="button"
          onClick={() => addBundleToCart(bundle.slug)}
          className="press mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-semibold text-background hover:bg-foreground/90"
        >
          Get this bundle
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </article>
  );
}
