import { useEffect } from 'react';
import { trackEvent } from './analytics';

// One delegated, capture-phase click listener for every tel: and mailto: link.
// Sends click_to_call / email_click with link_location and page_path only.
// Never send the number, address, or href.
//
// Cloudflare email obfuscation rewrites mailto links in the served HTML to
// /cdn-cgi/l/email-protection#<hash>; hydration or a re-render may restore the
// real mailto. The href is read at click time, so both forms count as email.
//
// link_location: walk up from the link; the nearest ancestor that matches wins.
// At each ancestor the checks run in this order:
//   1. role="dialog" or aria-modal="true"  -> 'modal'
//   2. <footer>                             -> 'footer'
//   3. <header> or <nav>                    -> 'header'
//   4. any id (except the #root mount node) -> that id
// Nothing matched -> 'unknown'.

function linkLocation(anchor: Element): string {
  for (let el: Element | null = anchor.parentElement; el; el = el.parentElement) {
    if (el.getAttribute('role') === 'dialog' || el.getAttribute('aria-modal') === 'true') return 'modal';
    const tag = el.tagName;
    if (tag === 'FOOTER') return 'footer';
    if (tag === 'HEADER' || tag === 'NAV') return 'header';
    if (el.id && el.id !== 'root') return el.id;
  }
  return 'unknown';
}

function handleClick(e: MouseEvent): void {
  const target = e.target;
  if (!(target instanceof Element)) return;
  const anchor = target.closest('a');
  if (!anchor) return;
  const href = anchor.getAttribute('href') || '';
  let name: string;
  if (/^tel:/i.test(href)) name = 'click_to_call';
  else if (/^mailto:/i.test(href) || href.includes('/cdn-cgi/l/email-protection')) name = 'email_click';
  else return;
  trackEvent(name, { link_location: linkLocation(anchor), page_path: window.location.pathname });
}

// Runs only in the browser (effects do not run during prerendering). The cleanup
// removes the listener, so StrictMode's mount/unmount/mount leaves exactly one.
export function useContactClickTracking(): void {
  useEffect(() => {
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);
}
