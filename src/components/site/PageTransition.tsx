import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Restrained route change: the outgoing view settles, the incoming one
 * rises 12px and fades in. No curtains, no flashes.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [key, setKey] = useState(pathname);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setKey(pathname);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <div key={key} className="animate-[fade-up_0.4s_cubic-bezier(0.22,1,0.36,1)_both]">
      {children}
    </div>
  );
}
