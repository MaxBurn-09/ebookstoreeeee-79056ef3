import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Cinematic intro: a book cover opens, the counter fills, then the two
 * cream panels part like curtains to reveal the shop. Shown once per session.
 */
export function SiteOpener() {
  const [phase, setPhase] = useState<"loading" | "opening" | "done">("done");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("pp-opener-seen")) return;
    sessionStorage.setItem("pp-opener-seen", "1");
    setPhase("loading");
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const duration = 1900;
    let frame = requestAnimationFrame(function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      setCount(Math.round(t * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
      else setPhase("opening");
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (phase !== "opening") return;
    const id = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, 1200);
    return () => clearTimeout(id);
  }, [phase]);

  if (phase === "done") return null;
  const opening = phase === "opening";

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden" role="presentation" aria-hidden>
      {/* Curtain panels */}
      <div
        className={cn(
          "absolute inset-y-0 left-0 w-1/2 bg-forest transition-transform duration-[1100ms] ease-[cubic-bezier(0.76,0,0.24,1)]",
          opening && "-translate-x-full",
        )}
      />
      <div
        className={cn(
          "absolute inset-y-0 right-0 w-1/2 bg-forest transition-transform duration-[1100ms] ease-[cubic-bezier(0.76,0,0.24,1)]",
          opening && "translate-x-full",
        )}
      />

      {/* Centre stage */}
      <div
        className={cn(
          "absolute inset-0 grid place-items-center transition-all duration-500",
          opening && "scale-105 opacity-0",
        )}
      >
        <div className="flex flex-col items-center gap-8">
          {/* Opening book */}
          <div className="[perspective:1000px]">
            <div className="relative h-24 w-20 [transform-style:preserve-3d]">
              <div className="absolute inset-0 rounded-r-sm bg-cream/25" />
              <div
                className="absolute inset-0 origin-left rounded-r-sm border border-gold/50 bg-gold/80 [transform-style:preserve-3d]"
                style={{ animation: "book-open 1.9s cubic-bezier(0.65,0,0.35,1) forwards" }}
              />
              <span className="absolute -left-1 inset-y-0 w-1 rounded-full bg-gold [animation:spine-glow_1.6s_ease-in-out_infinite]" />
            </div>
          </div>

          <div className="text-center">
            <p className="font-serif text-2xl text-forest-foreground">Page &amp; Pine</p>
            <p className="mt-2 text-[0.6rem] tracking-[0.36em] text-forest-foreground/60 uppercase">
              Opening the shop
            </p>
          </div>

          <div className="w-56">
            <div className="h-px w-full overflow-hidden bg-forest-foreground/20">
              <div
                className="h-full origin-left bg-gold"
                style={{ transform: `scaleX(${count / 100})` }}
              />
            </div>
            <p className="mt-3 text-center font-serif text-sm text-forest-foreground/70 tabular-nums">
              {count}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
