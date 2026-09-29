import { createServerFn } from "@tanstack/react-start";

/**
 * Returns the Google Analytics 4 measurement ID (e.g. "G-XXXXXXXXXX").
 * The value is not a secret — it is visible in every visitor's browser —
 * but it is stored server-side as a project secret, so it is read here.
 */
export const getAnalyticsMeasurementId = createServerFn({ method: "GET" }).handler(
  async () => {
    return process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID ?? null;
  },
);
