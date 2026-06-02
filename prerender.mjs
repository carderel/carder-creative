// Build-time prerenderer.
// Runs after `vite build` (client) and `vite build --ssr` (server entry).
// For each route it renders static HTML + per-route <head> and writes a
// static index.html, so crawlers and AI bots get full markup without executing JS.
// Pure Node + react-dom/server — no headless browser, safe on free CI (Cloudflare Pages).

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, 'dist');
const SSR_ENTRY = resolve(__dirname, 'dist-ssr/entry-server.js');

// Keep in sync with the <Route> paths in src/AppRoutes.tsx.
const ROUTES = ['/', '/resources', '/news', '/site-guide', '/legal'];

const { render } = await import(pathToFileURL(SSR_ENTRY).href);

const template = readFileSync(resolve(DIST, 'index.html'), 'utf-8');

if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: could not find <div id="root"></div> in dist/index.html');
}
if (!template.includes('</head>')) {
  throw new Error('prerender: could not find </head> in dist/index.html');
}

function outputPathFor(route) {
  if (route === '/') return resolve(DIST, 'index.html');
  return resolve(DIST, `.${route}`, 'index.html');
}

for (const route of ROUTES) {
  const { html, head } = render(route);

  const page = template
    .replace('</head>', `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  const outFile = outputPathFor(route);
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, page, 'utf-8');
  console.log(`prerendered ${route} -> ${outFile.replace(DIST, 'dist')}`);
}

console.log(`prerender: ${ROUTES.length} routes written.`);
