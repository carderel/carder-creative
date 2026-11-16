// GA4 events via the Google tag that GTM (GTM-MX359SZ) loads. The tag reads
// gtag() commands (Arguments objects) from the dataLayer, so no GTM change is
// needed. GTM does not route a bare event to the tag, so send_to names the GA4
// stream explicitly. Never pass personal data (name, email, phone, company, free text).

const GA4_ID = 'G-WSB6MEPDF7';

// Visiting any page with ?ga_debug=1 marks this tab's session, and every event
// after that carries debug_mode so it shows in GA4 DebugView. Storage can throw
// (private mode, blocked site data); then only the current URL counts.
const DEBUG_KEY = 'ga_debug';

function isDebugSession(): boolean {
  const fromUrl = new URLSearchParams(window.location.search).get('ga_debug') === '1';
  try {
    if (fromUrl) window.sessionStorage.setItem(DEBUG_KEY, '1');
    return fromUrl || window.sessionStorage.getItem(DEBUG_KEY) === '1';
  } catch {
    return fromUrl;
  }
}

// Record the flag on first load too, so it survives client-side navigation
// that drops the query string before any event fires.
if (typeof window !== 'undefined') isDebugSession();

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
  gtag('event', name, { ...params, ...(isDebugSession() ? { debug_mode: true } : {}), send_to: GA4_ID });
}
