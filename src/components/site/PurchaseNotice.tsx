import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { books } from "@/data/catalog";

type Notice = { title: string; slug: string; cover: string };

const pick = <T,>(list: readonly T[]): T => list[Math.floor(Math.random() * list.length)] as T;

const HIDDEN = ["/checkout", "/auth", "/admin", "/cart"];

const DISMISSED_KEY = "fga-purchase-notice-dismissed";

/** A quiet, factual book discovery hint — never an invented purchase alert. */
export function PurchaseNotice() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [notice, setNotice] = useState<Notice | null>(null);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setDismissed(window.sessionStorage.getItem(DISMISSED_KEY) === "1");
  }, []);

  useEffect(() => {
    if (dismissed) return;
    let hideTimer: ReturnType<typeof setTimeout>;

    const show = () => {
      const book = pick(books);
      setNotice({ title: book.title, slug: book.slug, cover: book.cover });
      hideTimer = setTimeout(() => setNotice(null), 5500);
    };

    const first = setTimeout(show, 45000);
    const loop = setInterval(show, 150000);
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
      className="fixed bottom-20 left-3 z-40 flex w-[min(16.5rem,calc(100vw-5.5rem))] items-center gap-2.5 rounded-lg border border-border bg-card/95 p-2 shadow-[var(--shadow-card)] backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300 sm:bottom-5 sm:left-5"
    >
      <img
        src={notice.cover}
        alt=""
        loading="lazy"
        className="h-12 w-9 shrink-0 rounded-sm object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1 text-xs font-semibold text-foreground">
          <BookOpen className="h-3 w-3" aria-hidden /> Explore an eBook
        </p>
        <Link
          to="/book/$slug"
          params={{ slug: notice.slug }}
          className="mt-0.5 block line-clamp-2 text-xs leading-snug text-muted-foreground hover:text-foreground"
        >
          {notice.title}
        </Link>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => {
          window.sessionStorage.setItem(DISMISSED_KEY, "1");
          setDismissed(true);
        }}
        aria-label="Dismiss book suggestions"
        className="h-7 w-7 shrink-0 rounded-full text-muted-foreground"
      >
        <X className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
