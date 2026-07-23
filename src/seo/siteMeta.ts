// Single source of truth for per-route SEO metadata.
// Consumed by both the client (useDocumentMeta hook) and the build-time
// prerender script (prerender.mjs via entry-server). Keep route keys in sync
// with the <Route> paths in AppRoutes.tsx and the URLs in public/sitemap.xml.

import { SEO_SERVICE, PPC_SERVICE, AI_VISIBILITY_SERVICE, serviceJsonLd } from '../data/servicePages';

export const SITE_URL = 'https://cardercreative.com';

export interface RouteMeta {
  title: string;
  description: string;
  /** Optional per-route structured data, injected into the prerendered <head>. */
  jsonLd?: object | object[];
  /** Optional per-route robots directive, e.g. 'noindex, follow'. */
  robots?: string;
}

export const ROUTE_META: Record<string, RouteMeta> = {
  '/': {
    title: 'Carder Creative | AI Visibility, SEO & PPC in Columbus, Ohio',
    description:
      'Carder Creative is an independent Columbus, Ohio practice helping businesses get found, understood, and recommended across AI, search, and paid.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': 'https://cardercreative.com/#webpage',
      url: 'https://cardercreative.com/',
      name: 'Carder Creative | AI Visibility, SEO & PPC in Columbus, Ohio',
      description: 'Independent Columbus, Ohio practice for AI visibility, SEO, and PPC.',
      isPartOf: { '@id': 'https://cardercreative.com/#website' },
      about: { '@id': 'https://cardercreative.com/#business' },
    },
  },
  '/resources': {
    title: 'Intel Archive | AI Visibility Resources | Carder Creative',
    description:
      'A curated feed of emerging AI search patterns, discovery-layer updates, and machine-trust protocol analysis from Carder Creative.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': 'https://cardercreative.com/resources/#page',
      url: 'https://cardercreative.com/resources/',
      name: 'Intel Archive',
      description: 'A curated feed of emerging AI search patterns and discovery-layer analysis.',
      isPartOf: { '@id': 'https://cardercreative.com/#website' },
      about: 'AI visibility, generative engine optimization, and AI search',
    },
  },
  '/news': {
    title: 'AI Search Intel | Live AI Visibility & GEO News',
    description:
      'Real-time news on AI search, GEO, LLM visibility, and the emerging discovery layer. Updated daily by Carder Creative.',
    robots: 'noindex, follow',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': 'https://cardercreative.com/news/#page',
      url: 'https://cardercreative.com/news/',
      name: 'AI Search Intel',
      description: 'News on AI search, GEO, LLM visibility, and the emerging discovery layer.',
      isPartOf: { '@id': 'https://cardercreative.com/#website' },
    },
  },
  '/site-guide': {
    title: 'AI Site Guide | Carder Creative',
    description:
      'A combined directory for human visitors, search crawlers, and AI agents exploring Carder Creative AI Visibility Services.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': 'https://cardercreative.com/site-guide/#page',
      url: 'https://cardercreative.com/site-guide/',
      name: 'AI Site Guide',
      description: 'A combined directory for human visitors, search crawlers, and AI agents.',
      isPartOf: { '@id': 'https://cardercreative.com/#website' },
    },
  },
  '/legal': {
    title: 'Privacy Policy & Terms | Carder Creative',
    description:
      'Privacy Policy and Terms of Service for AI Visibility Services, operated by Carder Creative LLC in Columbus, Ohio.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': 'https://cardercreative.com/legal/#page',
      url: 'https://cardercreative.com/legal/',
      name: 'Privacy Policy & Terms',
      description: 'Privacy Policy and Terms of Service for Carder Creative LLC, Columbus, Ohio.',
      isPartOf: { '@id': 'https://cardercreative.com/#website' },
    },
  },
  [SEO_SERVICE.slug]: {
    title: SEO_SERVICE.title,
    description: SEO_SERVICE.metaDescription,
    jsonLd: serviceJsonLd(SEO_SERVICE),
  },
  [PPC_SERVICE.slug]: {
    title: PPC_SERVICE.title,
    description: PPC_SERVICE.metaDescription,
    jsonLd: serviceJsonLd(PPC_SERVICE),
  },
  [AI_VISIBILITY_SERVICE.slug]: {
    title: AI_VISIBILITY_SERVICE.title,
    description: AI_VISIBILITY_SERVICE.metaDescription,
    jsonLd: serviceJsonLd(AI_VISIBILITY_SERVICE),
  },
};

export const DEFAULT_META: RouteMeta = ROUTE_META['/'];

// Cloudflare Pages serves directory routes with a trailing slash and 308-redirects
// the no-slash form to it (e.g. /resources -> /resources/). We normalize the
// no-slash form for ROUTE_META lookups (route keys are no-slash) but always emit
// canonical/og URLs in the trailing-slash form so they match the served URL.
function normalizePath(pathname: string): string {
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
}

export function metaForPath(pathname: string): RouteMeta {
  return ROUTE_META[normalizePath(pathname)] ?? DEFAULT_META;
}

export function canonicalForPath(pathname: string): string {
  const p = normalizePath(pathname);
  return p === '/' ? `${SITE_URL}/` : `${SITE_URL}${p}/`;
}
