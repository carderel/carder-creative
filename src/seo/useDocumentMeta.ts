import { useEffect } from 'react';
import { canonicalForPath, metaForPath } from './siteMeta';

// Keeps the document <head> in sync with the active route during client-side
// navigation. Runs only in the browser (inside useEffect), so it is SSR-safe.
// It updates the tags the prerender step already injected (selected by a stable
// selector) rather than appending new ones, so no duplicates are created.

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function useDocumentMeta(pathname: string): void {
  useEffect(() => {
    const meta = metaForPath(pathname);
    const canonical = canonicalForPath(pathname);

    document.title = meta.title;
    setMeta('meta[name="description"]', 'name', 'description', meta.description);
    setCanonical(canonical);

    setMeta('meta[property="og:title"]', 'property', 'og:title', meta.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', meta.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
    setMeta('meta[property="twitter:title"]', 'property', 'twitter:title', meta.title);
    setMeta('meta[property="twitter:description"]', 'property', 'twitter:description', meta.description);
    setMeta('meta[property="twitter:url"]', 'property', 'twitter:url', canonical);
  }, [pathname]);
}
