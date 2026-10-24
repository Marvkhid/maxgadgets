type Gtag = (command: "event", name: string, params?: Record<string, string | number>) => void;

/** Sends a Google Analytics event. Does nothing unless the visitor accepted analytics. */
export function trackEvent(name: string, params?: Record<string, string | number>): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", name, params);
}
