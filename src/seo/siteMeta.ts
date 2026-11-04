// Single source of truth for per-route SEO metadata.
// Consumed by both the client (useDocumentMeta hook) and the build-time
// prerender script (prerender.mjs via entry-server). Keep route keys in sync
// with the <Route> paths in AppRoutes.tsx and the URLs in public/sitemap.xml.

import { SEO_SERVICE, PPC_SERVICE, AI_VISIBILITY_SERVICE, serviceJsonLd } from '../data/servicePages';
import { BLOG_POSTS, blogPostJsonLd } from '../data/blogPosts';
import { contactJsonLd } from '../data/contactPage';
import { aiInfoJsonLd, CORE_CONSISTENCY_PHRASE } from '../data/aiInfoPage';

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
      'Independent SEO, Google Ads, and AI visibility expertise in Columbus, Ohio. One-time troubleshooting or ongoing search management for businesses and agencies.',
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
  '/blog': {
    title: 'Blog | AI Visibility & SEO Insights | Carder Creative',
    description:
      'Plain-English analysis of AI visibility, GEO, and SEO from Carder Creative - how AI systems find, understand, and recommend businesses.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': 'https://cardercreative.com/blog/#blog',
      url: 'https://cardercreative.com/blog/',
      name: 'Carder Creative Blog',
      description: 'Plain-English analysis of AI visibility, GEO, and SEO.',
      isPartOf: { '@id': 'https://cardercreative.com/#website' },
      publisher: { '@id': 'https://cardercreative.com/#organization' },
    },
  },
  // One ROUTE_META entry per published post, derived from the registry.
  ...Object.fromEntries(
    BLOG_POSTS.map((post) => [
      `/blog/${post.slug}`,
      {
        title: post.metaTitle,
        description: post.metaDescription,
        jsonLd: blogPostJsonLd(post),
      },
    ])
  ),
  '/contact': {
    title: 'Contact Carder Creative | Columbus, Ohio AI Visibility, SEO & PPC',
    description:
      'Contact Carder Creative in Columbus, Ohio. Call 614-809-5565, email, or send the form. Replies within 24 hours, consultations by appointment.',
    jsonLd: contactJsonLd(),
  },
  '/ai-info': {
    title: 'AI Assistant Info: Facts About Carder Creative for ChatGPT, Claude, Gemini & Perplexity',
    description: CORE_CONSISTENCY_PHRASE,
    jsonLd: aiInfoJsonLd(),
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

/** Meta for any path with no ROUTE_META entry: the 404 page (prerendered to
 *  dist/404.html) and client-side navigation to an unknown URL. Deliberately not
 *  DEFAULT_META, so an unknown URL never claims the homepage title or canonical. */
export const NOT_FOUND_META: RouteMeta = {
  title: 'Page not found | Carder Creative',
  description:
    "This page doesn't exist. Use the Carder Creative site map below to find the page you need.",
  robots: 'noindex',
};

// Cloudflare Pages serves directory routes with a trailing slash and 308-redirects
// the no-slash form to it (e.g. /blog -> /blog/). We normalize the
// no-slash form for ROUTE_META lookups (route keys are no-slash) but always emit
// canonical/og URLs in the trailing-slash form so they match the served URL.
function normalizePath(pathname: string): string {
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
}

export function isKnownPath(pathname: string): boolean {
  return Object.prototype.hasOwnProperty.call(ROUTE_META, normalizePath(pathname));
}

export function metaForPath(pathname: string): RouteMeta {
  return isKnownPath(pathname) ? ROUTE_META[normalizePath(pathname)] : NOT_FOUND_META;
}

/** Canonical URL for a known route, or null for an unknown one (the 404 page
 *  must not point a canonical at any real URL). */
export function canonicalForPath(pathname: string): string | null {
  if (!isKnownPath(pathname)) return null;
  const p = normalizePath(pathname);
  return p === '/' ? `${SITE_URL}/` : `${SITE_URL}${p}/`;
}
