import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, BookOpenText, Loader2 } from "lucide-react";
import { recommendBooks, type Recommendation } from "@/lib/recommend.functions";
import { books, formatPrice } from "@/data/catalog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/book-finder")({
  head: () => ({
    meta: [
      { title: "Find Your Next eBook — Personal Picks | Future Grow Academy" },
      { name: "description", content: "Tell us your mood or what you want to work on, and get personalised eBook picks from the Future Grow Academy library." },
      { property: "og:title", content: "Find Your Next eBook — Future Grow Academy" },
      { property: "og:description", content: "Share your reading mood and get three personal eBook recommendations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BookFinder,
});

const moods = [
  "I feel stuck and want a fresh start",
  "Healing after a breakup",
  "I want to earn money online",
  "Calmer, more patient parenting",
  "Get fit without spending hours",
  "Our marriage needs work",
];

function BookFinder() {
  const ask = useServerFn(recommendBooks);
  const { addToCart } = useStore();
  const [mood, setMood] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [res, setRes] = useState<{ intro: string; picks: Recommendation[] } | null>(null);

  async function run(text: string) {
    if (text.trim().length < 3 || busy) return;
    setBusy(true);
    setError("");
    setRes(null);
    try {
      setRes(await ask({ data: { mood: text } }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="section-y">
      <div className="container-page max-w-3xl">
        <p className="eyebrow">Personal book finder</p>
        <h1 className="mt-2 text-3xl sm:text-5xl">What are you in the mood to read?</h1>
        <p className="mt-3 text-base text-muted-foreground">
          Tell us how you feel or what you want to change — we'll pick three eBooks from our library for you.
        </p>

        <form
          onSubmit={(e) => { e.preventDefault(); run(mood); }}
          className="glass mt-8 rounded-2xl border border-border p-4 sm:p-5"
        >
          <label htmlFor="mood" className="text-sm font-semibold">Your mood or goal</label>
          <textarea
            id="mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            rows={3}
            maxLength={600}
            placeholder="e.g. I'm overwhelmed at work and want to feel calm and focused again"
            className="mt-2 w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-base outline-none focus:border-foreground/40"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {moods.map((m) => (
              <button key={m} type="button" onClick={() => { setMood(m); run(m); }}
                className="press rounded-full border border-border bg-card px-3 py-1.5 text-xs hover:border-foreground/30">
                {m}
              </button>
            ))}
          </div>
          <button type="submit" disabled={busy || mood.trim().length < 3}
            className="press btn-gloss mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand text-sm font-semibold text-primary-foreground disabled:opacity-60 sm:w-auto sm:px-8">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <BookOpenText className="h-4 w-4" />}
            {busy ? "Finding your books…" : "Recommend books"}
          </button>
        </form>

        <div aria-live="polite" className="mt-8">
          {error ? <p className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{error}</p> : null}
          {res ? (
            <>
              {res.intro ? <p className="text-base">{res.intro}</p> : null}
              <ul className="mt-5 grid gap-4">
                {res.picks.map((p) => {
                  const b = books.find((x) => x.slug === p.slug)!;
                  return (
                    <li key={p.slug} className="glass flex gap-4 rounded-2xl border border-border p-4">
                      <Link to="/book/$slug" params={{ slug: b.slug }} className="cover-plate h-32 w-[5.5rem] shrink-0">
                        <img src={b.cover} alt={`Cover of ${b.title}`} className="h-full w-full object-cover" />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-muted-foreground">{b.category}</p>
                        <h2 className="text-base font-semibold leading-snug">
                          <Link to="/book/$slug" params={{ slug: b.slug }} className="hover:text-primary">{b.title}</Link>
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">{p.reason}</p>
                        <div className="mt-3 flex items-center gap-3">
                          <span className="font-semibold tabular-nums">{formatPrice(b.price)}</span>
                          <button type="button" onClick={() => addToCart(b.id)}
                            className="press btn-gloss inline-flex h-9 items-center gap-1.5 rounded-full bg-brand px-4 text-xs font-semibold text-primary-foreground">
                            Add to cart <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
