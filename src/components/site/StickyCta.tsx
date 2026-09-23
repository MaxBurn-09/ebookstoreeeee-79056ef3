import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/** Thin reading-progress line, shown at the very bottom edge of the header. */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden className="h-[2px] w-full bg-transparent">
      <div
        className="h-full origin-left bg-primary transition-[transform] duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

/**
 * Floating call-to-action that slides in once the visitor scrolls past the hero.
 * Sits above the mobile tab bar and hides on checkout-style routes.
 */
export function StickyCta() {
  const [shown, setShown] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    let previous = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      setShown(current > 760);
      setScrollingDown(current > previous && current - previous > 3);
      previous = current;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hidden = ["/cart", "/checkout", "/auth", "/admin"].some((p) => pathname.startsWith(p));
  if (hidden) return null;

  return (
    <div
      className={cn(
        "fixed right-4 bottom-[calc(env(safe-area-inset-bottom)+4.75rem)] z-40 flex items-center gap-2 transition-all duration-500 md:bottom-6 md:right-6",
        shown && !scrollingDown
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="press grid h-10 w-10 place-items-center rounded-full border border-border bg-background/95 text-foreground shadow-[var(--shadow-card)] backdrop-blur-md hover:bg-muted"
      >
        <ArrowUp className="h-4 w-4" aria-hidden />
      </button>
      <Link
        to="/books"
        className="press hidden h-10 items-center gap-2 rounded-full bg-foreground px-4 text-xs font-semibold text-background shadow-[var(--shadow-card)] hover:bg-foreground/90 sm:inline-flex"
      >
        Browse eBooks
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}
