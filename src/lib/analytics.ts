// GA4 events via the Google tag that GTM (GTM-MX359SZ) loads. The tag reads
// gtag() commands (Arguments objects) from the dataLayer, so no GTM change is
// needed. GTM does not route a bare event to the tag, so send_to names the GA4
// stream explicitly. Never pass personal data (name, email, phone, company, free text).

const GA4_ID = 'G-WSB6MEPDF7';

type EventParams = Record<string, string>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  // gtag must push the Arguments object itself, not an array.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function gtag(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  }
  gtag('event', name, { ...params, send_to: GA4_ID });
}
