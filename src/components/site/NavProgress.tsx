import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

/** Thin top bar shown only while a page is loading, so clicks always feel acknowledged. */
export function NavProgress() {
  const loading = useRouterState({ select: (s) => s.status === "pending" });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (loading) {
      const t = setTimeout(() => setVisible(true), 120);
      return () => clearTimeout(t);
    }
    setVisible(false);
    return undefined;
  }, [loading]);

  return (
    <div
      aria-hidden
      className={`nav-progress ${visible ? "is-active" : ""}`}
    />
  );
}
