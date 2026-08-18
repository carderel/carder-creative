// Build-time prerenderer.
// Runs after `vite build` (client) and `vite build --ssr` (server entry).
// For each route it renders static HTML + per-route <head> and writes a
// static index.html, so crawlers and AI bots get full markup without executing JS.
// Pure Node + react-dom/server — no headless browser, safe on free CI (Cloudflare Pages).
//
// /news is data-driven: we fetch the Google Alerts RSS feeds here and bake the
// articles into the static HTML, plus inject a seed (window.__NEWS_ARTICLES__) so
// client hydration matches the server render. /news is fully baked at build time —
// the client renders the prerendered seed with no live re-fetch; freshness comes
// from the daily rebuild (external cron -> Cloudflare Pages Deploy Hook).

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { buildArticles } from './scripts/newsFeeds.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, 'dist');
const SSR_ENTRY = resolve(__dirname, 'dist-ssr/entry-server.js');

const FEEDS = JSON.parse(readFileSync(resolve(__dirname, 'scripts/news-feeds.json'), 'utf-8'));

// Keep in sync with the <Route> paths in src/AppRoutes.tsx. Blog post routes are
// NOT listed here: they come from the post registry (src/data/blogPosts.ts) via
// the SSR bundle, so publishing a post cannot leave an unprerendered route behind.
const STATIC_ROUTES = ['/', '/resources', '/news', '/blog', '/site-guide', '/legal', '/seo-services', '/ppc-services', '/ai-visibility-services'];

const { render, blogRoutes, blogSitemapEntries, blogFeedXml, blogLlmsSection, pricingFile } =
  await import(pathToFileURL(SSR_ENTRY).href);

const blogPostRoutes = blogRoutes();
if (!Array.isArray(blogPostRoutes) || blogPostRoutes.length === 0) {
  throw new Error('prerender: SSR bundle reported no blog routes - refusing to build a blog with no posts');
}

const ROUTES = [...STATIC_ROUTES, ...blogPostRoutes];
const template = readFileSync(resolve(DIST, 'index.html'), 'utf-8');

if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: could not find <div id="root"></div> in dist/index.html');
}
if (!template.includes('</head>') || !template.includes('</body>')) {
  throw new Error('prerender: could not find </head> or </body> in dist/index.html');
}

const newsArticles = await buildArticles(FEEDS);
if (newsArticles.length === 0) {
  // Fail-loud (D4): never deploy an empty feed and never silently serve stale data.
  throw new Error(`prerender: 0 news articles from ${FEEDS.length} Google Alerts feeds — refusing to build an empty /news`);
}
console.log(`prerender: built ${newsArticles.length} deduped news articles from ${FEEDS.length} feeds`);

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
  return resolve(DIST, `.${route}`, 'index.html');
}

for (const route of ROUTES) {
  const initialData = route === '/news' ? { newsArticles } : undefined;
  const { html, head, jsonLd } = render(route, initialData);

  let page = template
    .replace('</head>', `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  page = mergeJsonLd(page, jsonLd ?? []);

  if (route === '/news' && newsArticles.length) {
    // Escape "<" so the JSON can't break out of the <script> element.
    const seed = JSON.stringify(newsArticles).replace(/</g, '\\u003c');
    page = page.replace('</body>', `  <script>window.__NEWS_ARTICLES__=${seed}</script>\n  </body>`);
  }

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
