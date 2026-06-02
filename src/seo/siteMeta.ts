// Single source of truth for per-route SEO metadata.
// Consumed by both the client (useDocumentMeta hook) and the build-time
// prerender script (prerender.mjs via entry-server). Keep route keys in sync
// with the <Route> paths in AppRoutes.tsx and the URLs in public/sitemap.xml.

export const SITE_URL = 'https://cardercreative.com';

export interface RouteMeta {
  title: string;
  description: string;
}

export const ROUTE_META: Record<string, RouteMeta> = {
  '/': {
    title: 'AI Visibility Services by Carder Creative | Columbus, Ohio',
    description:
      'Carder Creative helps Columbus businesses get found, understood, and recommended by AI systems like ChatGPT, Gemini, and Claude.',
  },
  '/resources': {
    title: 'Intel Archive | AI Visibility Resources | Carder Creative',
    description:
      'A curated feed of emerging AI search patterns, discovery-layer updates, and machine-trust protocol analysis from Carder Creative.',
  },
  '/news': {
    title: 'AI Search Intel | Live AI Visibility & GEO News',
    description:
      'Real-time news on AI search, GEO, LLM visibility, and the emerging discovery layer. Updated daily by Carder Creative.',
  },
  '/site-guide': {
    title: 'AI Site Guide | Carder Creative',
    description:
      'A combined directory for human visitors, search crawlers, and AI agents exploring Carder Creative AI Visibility Services.',
  },
  '/legal': {
    title: 'Privacy Policy & Terms | Carder Creative',
    description:
      'Privacy Policy and Terms of Service for AI Visibility Services, operated by Carder Creative LLC in Columbus, Ohio.',
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
