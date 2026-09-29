import { getAnalyticsMeasurementId } from "./analytics.functions";

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

let initialized = false;

/** Loads gtag.js once with the project's measurement ID. Safe to call repeatedly. */
export function initAnalytics(measurementId: string) {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  const gtag: GtagFn = (...args: unknown[]) => {
    window.dataLayer!.push(args);
  };
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", measurementId, { send_page_view: false });
}

/** Sends a page view for the current path (call on SPA route changes). */
export function trackPageView(path: string) {
  window.gtag?.("event", "page_view", { page_path: path });
}

/** Fetches the measurement ID from the server and starts analytics. */
export async function startAnalytics() {
  try {
    const measurementId = await getAnalyticsMeasurementId();
    if (measurementId) initAnalytics(measurementId);
  } catch {
    // Analytics must never break the app.
  }
}
