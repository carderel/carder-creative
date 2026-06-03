// Build-time prerenderer.
// Runs after `vite build` (client) and `vite build --ssr` (server entry).
// For each route it renders static HTML + per-route <head> and writes a
// static index.html, so crawlers and AI bots get full markup without executing JS.
// Pure Node + react-dom/server — no headless browser, safe on free CI (Cloudflare Pages).
//
// /news is data-driven: we fetch the live feed here and bake the articles into the
// static HTML, plus inject a seed (window.__NEWS_ARTICLES__) so client hydration
// matches the server render. The client still re-fetches to stay current.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, 'dist');
const SSR_ENTRY = resolve(__dirname, 'dist-ssr/entry-server.js');

// Keep in sync with the <Route> paths in src/AppRoutes.tsx.
const ROUTES = ['/', '/resources', '/news', '/site-guide', '/legal'];

// Build-time seed for /news. Keep the host in sync with API_URL in src/pages/NewsFeed.tsx.
// We seed a recent slice (the client re-fetches the full set) to keep the static HTML lean.
const NEWS_API = 'https://ai-visibility-news-agent.carder-creative.workers.dev/api/news/articles?limit=50';

async function fetchNews() {
  try {
    const res = await fetch(NEWS_API);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const list = Array.isArray(data.articles) ? data.articles : [];
    console.log(`prerender: fetched ${list.length} news articles for /news`);
    return list;
  } catch (err) {
    // Never fail the build over the news feed — /news just prerenders empty and
    // hydrates client-side, exactly as before this feature.
    console.warn(`prerender: news fetch failed (${err?.message ?? err}); /news will hydrate client-side`);
    return [];
  }
}

const { render } = await import(pathToFileURL(SSR_ENTRY).href);
const template = readFileSync(resolve(DIST, 'index.html'), 'utf-8');

if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: could not find <div id="root"></div> in dist/index.html');
}
if (!template.includes('</head>') || !template.includes('</body>')) {
  throw new Error('prerender: could not find </head> or </body> in dist/index.html');
}

const newsArticles = await fetchNews();

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
