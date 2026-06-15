export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

export function isAnalyticsEnabled(): boolean {
  return GA_MEASUREMENT_ID.startsWith("G-");
}

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js",
      targetId: string | Date,
      config?: Record<string, string>,
    ) => void;
    dataLayer?: unknown[];
  }
}

export function pageview(url: string): void {
  if (!isAnalyticsEnabled() || typeof window.gtag !== "function") return;
  window.gtag("config", GA_MEASUREMENT_ID, { page_path: url });
}
