import { bundles, bundleBooks, type Bundle } from "@/data/catalog";

export type PricedLine = { slug: string; qty: number; price: number };

export type BundleMatch = { bundle: Bundle; saving: number };

/**
 * Automatically applies combo pricing: whenever a cart contains every ebook of a
 * bundle, that group is charged at the bundle price instead of item prices.
 * Bundles are matched greedily, largest saving first, and each copy is used once.
 */
export function matchBundles(lines: PricedLine[]): { matches: BundleMatch[]; discount: number } {
  const pool = new Map<string, number>();
  for (const l of lines) pool.set(l.slug, (pool.get(l.slug) ?? 0) + l.qty);
  const priceOf = new Map(lines.map((l) => [l.slug, l.price]));

  const candidates = bundles
    .map((bundle) => {
      const slugs = bundleBooks(bundle).map((b) => b.slug);
      const listed = slugs.reduce((sum, s) => sum + (priceOf.get(s) ?? 0), 0);
      return { bundle, slugs, saving: listed - bundle.price };
    })
    .filter((c) => c.slugs.length > 1 && c.saving > 0)
    .sort((a, b) => b.saving - a.saving);

  const matches: BundleMatch[] = [];
  let discount = 0;

  for (const c of candidates) {
    // A bundle can apply more than once if the cart holds multiple copies.
    for (;;) {
      const complete = c.slugs.every((s) => (pool.get(s) ?? 0) > 0);
      if (!complete) break;
      for (const s of c.slugs) pool.set(s, (pool.get(s) ?? 0) - 1);
      matches.push({ bundle: c.bundle, saving: c.saving });
      discount += c.saving;
    }
  }

  return { matches, discount: Math.round(discount * 100) / 100 };
}
