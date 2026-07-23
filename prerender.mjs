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

// Keep in sync with the <Route> paths in src/AppRoutes.tsx.
const ROUTES = ['/', '/resources', '/news', '/site-guide', '/legal', '/seo-services', '/ppc-services', '/ai-visibility-services'];

const { render } = await import(pathToFileURL(SSR_ENTRY).href);
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

function outputPathFor(route) {
  if (route === '/') return resolve(DIST, 'index.html');
  return resolve(DIST, `.${route}`, 'index.html');
}

for (const route of ROUTES) {
  const initialData = route === '/news' ? { newsArticles } : undefined;
  const { html, head } = render(route, initialData);

  let page = template
    .replace('</head>', `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

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
