import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Cinematic route change: a thin gold curtain wipes across, the outgoing page
 * dips away and the incoming one rises back with a soft blur.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  const [key, setKey] = useState(pathname);
  const [state, setState] = useState<"idle" | "out" | "in">("idle");
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      setKey(pathname);
      return;
    }
    setState("out");
    const swap = setTimeout(() => {
      setKey(pathname);
      setState("in");
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 220);
    const settle = setTimeout(() => setState("idle"), 800);
    return () => {
      clearTimeout(swap);
      clearTimeout(settle);
    };
  }, [pathname]);

  return (
    <>
      <div
        aria-hidden
        className={[
          "pointer-events-none fixed inset-0 z-[70] origin-bottom bg-forest transition-transform duration-[420ms]",
          state === "out"
            ? "scale-y-100 ease-[cubic-bezier(0.76,0,0.24,1)]"
            : "scale-y-0 ease-[cubic-bezier(0.22,1,0.36,1)]",
        ].join(" ")}
        style={{ transformOrigin: state === "out" ? "bottom" : "top" }}
      />
      {isLoading ? (
        <span className="fixed top-3 right-4 z-[71] h-2 w-2 animate-ping rounded-full bg-gold" />
      ) : null}
      <div
        key={key}
        className={
          state === "out"
            ? "translate-y-2 opacity-0 blur-[3px] transition-all duration-200"
            : "animate-[fade-up_0.65s_cubic-bezier(0.22,1,0.36,1)_both]"
        }
      >
        {children}
      </div>
    </>
  );
}
