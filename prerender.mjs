// Build-time prerenderer.
// Runs after `vite build` (client) and `vite build --ssr` (server entry).
// For each route it renders static HTML + per-route <head> and writes a
// static index.html, so crawlers and AI bots get full markup without executing JS.
// Pure Node + react-dom/server — no headless browser, safe on free CI (Cloudflare Pages).
//
// No network fetches happen here: the build depends only on files in the repo.
// /news (the Google Alerts feed page) is unpublished and redirected to /blog/ in
// public/_redirects. Its source (src/pages/NewsFeed.tsx, scripts/newsFeeds.mjs,
// scripts/news-feeds.json) is kept on disk; restoring it means re-adding the route,
// the feed fetch, and the window.__NEWS_ARTICLES__ seed (see git history).

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, 'dist');
const SSR_ENTRY = resolve(__dirname, 'dist-ssr/entry-server.js');

// Keep in sync with the <Route> paths in src/AppRoutes.tsx. Blog post routes are
// NOT listed here: they come from the post registry (src/data/blogPosts.ts) via
// the SSR bundle, so publishing a post cannot leave an unprerendered route behind.
const STATIC_ROUTES = ['/', '/blog', '/site-guide', '/legal', '/contact', '/ai-info', '/seo-services', '/ppc-services', '/ai-visibility-services'];

const { render, blogRoutes, blogSitemapEntries, blogFeedXml, blogLlmsSection, pricingFile } =
  await import(pathToFileURL(SSR_ENTRY).href);

const blogPostRoutes = blogRoutes();
if (!Array.isArray(blogPostRoutes) || blogPostRoutes.length === 0) {
  throw new Error('prerender: SSR bundle reported no blog routes - refusing to build a blog with no posts');
}

// The not-found page. Rendered like any route but written to dist/404.html (top
// level, no /404/ directory) and never listed in the sitemap. With no `/*` rule in
// public/_redirects, Cloudflare Pages serves this file with HTTP 404 for every
// unknown URL; the client then hydrates it under the catch-all <Route path="*">.
const NOT_FOUND_ROUTE = '/404';

const ROUTES = [...STATIC_ROUTES, ...blogPostRoutes, NOT_FOUND_ROUTE];
const template = readFileSync(resolve(DIST, 'index.html'), 'utf-8');

if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: could not find <div id="root"></div> in dist/index.html');
}
if (!template.includes('</head>') || !template.includes('</body>')) {
  throw new Error('prerender: could not find </head> or </body> in dist/index.html');
}

// The template carries one global JSON-LD @graph (Organization, WebSite,
// LocalBusiness). Route nodes are merged into it so every page ships exactly one
// structured-data block instead of a global graph plus a loose second script.
const LD_SCRIPT = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/;
const ldMatch = template.match(LD_SCRIPT);
if (!ldMatch) {
  throw new Error('prerender: no <script type="application/ld+json"> block found in dist/index.html');
}
let baseGraph;
try {
  baseGraph = JSON.parse(ldMatch[1]);
} catch (err) {
  throw new Error(`prerender: global JSON-LD in index.html is not valid JSON: ${err.message}`);
}
if (!Array.isArray(baseGraph['@graph'])) {
  throw new Error('prerender: global JSON-LD has no @graph array to merge route nodes into');
}

function mergeJsonLd(page, routeNodes) {
  const graph = {
    '@context': baseGraph['@context'] ?? 'https://schema.org',
    '@graph': [...baseGraph['@graph'], ...routeNodes],
  };
  // Escape "<" so the JSON can't break out of the <script> element. A replacer
  // function avoids $-pattern expansion in the replacement string.
  const json = JSON.stringify(graph).replace(/</g, '\\u003c');
  return page.replace(LD_SCRIPT, () => `<script type="application/ld+json">${json}</script>`);
}

function outputPathFor(route) {
  if (route === '/') return resolve(DIST, 'index.html');
  if (route === NOT_FOUND_ROUTE) return resolve(DIST, '404.html');
  return resolve(DIST, `.${route}`, 'index.html');
}

for (const route of ROUTES) {
  const { html, head, jsonLd } = render(route);

  let page = template
    .replace('</head>', `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  page = mergeJsonLd(page, jsonLd ?? []);

  const outFile = outputPathFor(route);
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, page, 'utf-8');
  console.log(`prerendered ${route} -> ${outFile.replace(DIST, 'dist')}`);
}

console.log(`prerender: ${ROUTES.length} routes written.`);

// sitemap.xml: expand the BLOG_URLS marker in public/sitemap.xml with entries
// generated from the post registry. The static pages stay hand-maintained (their
// lastmod is a human judgement); only the blog section is derived.
const SITEMAP_MARKER = '<!-- BLOG_URLS -->';
const sitemapTemplate = readFileSync(resolve(__dirname, 'public/sitemap.xml'), 'utf-8');
if (!sitemapTemplate.includes(SITEMAP_MARKER)) {
  throw new Error(`prerender: public/sitemap.xml is missing the ${SITEMAP_MARKER} marker`);
}
const sitemap = sitemapTemplate.replace(SITEMAP_MARKER, blogSitemapEntries());
writeFileSync(resolve(DIST, 'sitemap.xml'), sitemap, 'utf-8');
const sitemapUrlCount = (sitemap.match(/<loc>/g) ?? []).length;
console.log(`prerender: dist/sitemap.xml written (${sitemapUrlCount} URLs)`);

// feed.xml: real RSS for our own posts, generated from the same registry.
const feed = blogFeedXml();
writeFileSync(resolve(DIST, 'feed.xml'), feed, 'utf-8');
console.log(`prerender: dist/feed.xml written (${(feed.match(/<item>/g) ?? []).length} items)`);

// pricing.md: machine-readable pricing for AI assistants and agentic buyers, which
// cannot read prices out of a JS-rendered component. Generated from the same tier
// data the visible Pricing block uses.
const pricing = pricingFile();
writeFileSync(resolve(DIST, 'pricing.md'), pricing, 'utf-8');
console.log(`prerender: dist/pricing.md written (${pricing.split('\n## ').length - 1} tiers + sections)`);

// llms.txt: expand the BLOG_POSTS marker so the file AI assistants are pointed at
// always lists every published article.
const LLMS_MARKER = '<!-- BLOG_POSTS -->';
const llmsTemplate = readFileSync(resolve(__dirname, 'public/llms.txt'), 'utf-8');
if (!llmsTemplate.includes(LLMS_MARKER)) {
  throw new Error(`prerender: public/llms.txt is missing the ${LLMS_MARKER} marker`);
}
const llms = llmsTemplate.replace(LLMS_MARKER, blogLlmsSection());
writeFileSync(resolve(DIST, 'llms.txt'), llms, 'utf-8');
console.log('prerender: dist/llms.txt written (article list expanded)');
