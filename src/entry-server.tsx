import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import AppRoutes from './AppRoutes';
import { canonicalForPath, metaForPath } from './seo/siteMeta';

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export interface RenderResult {
  html: string;
  head: string;
}

// Renders a single route to static HTML and the per-route <head> tags.
// Head tags are built deterministically from siteMeta (not scraped from the
// render output), so the static <head> is always correct and the body stays clean.
export function render(url: string): RenderResult {
  const html = renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>
  );

  const meta = metaForPath(url);
  const title = escapeAttr(meta.title);
  const description = escapeAttr(meta.description);
  const canonical = canonicalForPath(url);

  const head = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="twitter:title" content="${title}" />`,
    `<meta property="twitter:description" content="${description}" />`,
    `<meta property="twitter:url" content="${canonical}" />`,
  ].join('\n    ');

  return { html, head };
}
