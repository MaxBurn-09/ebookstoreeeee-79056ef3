import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag, X } from "lucide-react";
import { books, buyerCities, buyerNames } from "@/data/catalog";

type Notice = { name: string; city: string; title: string; slug: string; cover: string };

const pick = <T,>(list: readonly T[]): T => list[Math.floor(Math.random() * list.length)] as T;

const HIDDEN = ["/checkout", "/auth", "/admin", "/cart"];

/** Subtle social-proof popup: a recent reader purchase, every ~25s. */
export function PurchaseNotice() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [notice, setNotice] = useState<Notice | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    let hideTimer: ReturnType<typeof setTimeout>;

    const show = () => {
      const book = pick(books);
      setNotice({
        name: pick(buyerNames),
        city: pick(buyerCities),
        title: book.title,
        slug: book.slug,
        cover: book.cover,
      });
      hideTimer = setTimeout(() => setNotice(null), 7000);
    };

    const first = setTimeout(show, 9000);
    const loop = setInterval(show, 25000);
    return () => {
      clearTimeout(first);
      clearTimeout(hideTimer);
      clearInterval(loop);
    };
  }, [dismissed]);

  if (!notice || dismissed || HIDDEN.some((p) => pathname.startsWith(p))) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-in fade-in slide-in-from-bottom-4 fixed bottom-20 left-3 z-40 flex w-[19rem] items-center gap-3 rounded-2xl border border-border bg-card/95 p-3 shadow-[var(--shadow-card)] backdrop-blur duration-500 sm:bottom-6 sm:left-6"
    >
      <img
        src={notice.cover}
        alt=""
        loading="lazy"
        className="h-14 w-10 shrink-0 rounded-md object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1 text-[0.68rem] font-semibold tracking-wide text-[var(--brand-orange)] uppercase">
          <ShoppingBag className="h-3 w-3" aria-hidden /> Recent purchase
        </p>
        <p className="mt-0.5 truncate text-[0.78rem] font-medium">
          {notice.name} · {notice.city}
        </p>
        <Link
          to="/book/$slug"
          params={{ slug: notice.slug }}
          className="line-clamp-1 text-[0.74rem] text-muted-foreground hover:text-foreground"
        >
          bought {notice.title}
        </Link>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss purchase notifications"
        className="press grid h-7 w-7 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
