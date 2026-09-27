import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Package, ArrowRight } from "lucide-react";
import { bundles, bundleBooks, formatPrice, type Bundle } from "@/data/catalog";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";
import { useStore } from "@/lib/store";
import { pageHead } from "@/lib/seo";
import { Button } from "@/components/ui/button";

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
        subtitle="Thoughtful collections of real titles. See every book and review the price before checkout."
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
  const navigate = useNavigate();
  const items = bundleBooks(bundle);
  const listed = items.reduce((sum, b) => sum + b.price, 0);
  const payable = Math.min(listed, bundle.price);
  const saving = Math.max(0, listed - payable);

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-lg border bg-card shadow-[var(--shadow-gloss)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-raised)] ${highlight ? "border-primary/30" : "border-border"}`}
    >
      <div className="relative flex h-44 items-end justify-center overflow-hidden border-b border-border bg-secondary px-5 pt-5 sm:h-48">
        <div aria-hidden className="absolute inset-x-6 bottom-2 h-8 rounded-[50%] bg-primary/10 blur-xl" />
        {items.slice(0, 5).map((book, i, shown) => (
          <Link key={book.id} to="/book/$slug" params={{ slug: book.slug }} preload="intent" aria-label={`View ${book.title}`} className="cover-plate relative mb-3 block aspect-[2/3] w-[22%] max-w-24 shrink-0 transition-transform duration-300 hover:z-10 hover:-translate-y-2" style={{ transform: `rotate(${(i - (shown.length - 1) / 2) * 3}deg)` }}>
            <img src={book.cover} alt={book.title} loading="lazy" decoding="async" width={160} height={240} className="h-full w-full object-cover" />
          </Link>
        ))}
        {items.length > 5 && <span className="absolute bottom-3 right-3 rounded-full border border-border bg-card px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm">+{items.length - 5} more</span>}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-primary"><Package className="h-4 w-4" aria-hidden /> {items.length} eBooks</div>
        <h3 className="mt-3 text-xl font-semibold text-foreground">{bundle.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{bundle.description}</p>
        <div className="mt-5 border-t border-border pt-4">
          <p className="text-xs font-semibold uppercase text-muted-foreground">Included titles</p>
          <ul className="mt-2 max-h-32 space-y-1.5 overflow-y-auto pr-2 text-sm">
            {items.map((b) => (
              <li key={b.id}><Link to="/book/$slug" params={{ slug: b.slug }} className="transition-colors hover:text-primary hover:underline">{b.title}</Link></li>
            ))}
          </ul>
        </div>
        <div className="mt-auto pt-6">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold tabular-nums">{formatPrice(payable)}</span>
          {saving > 0 ? (
            <span className="text-sm text-muted-foreground line-through">{formatPrice(listed)}</span>
          ) : null}
          </div>
          {saving > 0 && <p className="mt-1 text-xs font-medium text-primary">Save {formatPrice(saving)} compared with individual prices</p>}
          <Button type="button" onClick={() => { addBundleToCart(bundle.slug); navigate({ to: "/cart" }); }} className="press btn-gloss mt-5 h-12 w-full rounded-full bg-brand font-semibold text-primary-foreground"><span>Review bundle</span><ArrowRight aria-hidden /></Button>
        </div>
      </div>
    </article>
  );
}
