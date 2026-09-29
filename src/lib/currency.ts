export type Currency = "USD" | "INR";
export const USD_TO_INR = 84;

/** Converts a USD total to a clean rupee price ending in 9 (e.g. ₹249). */
export function toINR(usd: number): number {
  return Math.max(49, Math.round((usd * USD_TO_INR) / 10) * 10 - 1);
}

export function formatMoney(usd: number, currency: Currency): string {
  return currency === "INR" ? `₹${toINR(usd).toLocaleString("en-IN")}` : `$${usd.toFixed(2)}`;
}

export function detectCurrency(): Currency {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return tz === "Asia/Kolkata" || tz === "Asia/Calcutta" ? "INR" : "USD";
  } catch {
    return "USD";
  }
}
