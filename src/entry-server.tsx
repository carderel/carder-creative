import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import AppRoutes, { type InitialData } from './AppRoutes';
import { canonicalForPath, metaForPath, SITE_URL } from './seo/siteMeta';
import { BLOG_ROUTES, sortedBlogPosts, blogPostUrl } from './data/blogPosts';

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
  /** Route-specific JSON-LD nodes. Returned separately (rather than as a second
   *  <script> in `head`) so prerender.mjs can merge them into the single global
   *  @graph in index.html, leaving one structured-data block per page. */
  jsonLd: object[];
}

// Exposed for prerender.mjs so the build derives its blog route list from the post
// registry instead of a hand-maintained copy that can silently drift. Deliberately
// a lowercase function, not a re-exported const: an upper-case export makes the
// react-refresh lint rule treat this SSR entry as a component module.
export function blogRoutes(): string[] {
  return [...BLOG_ROUTES];
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** <url> entries for the /blog/ index plus every published post, newest first.
 *  Injected into dist/sitemap.xml at the BLOG_URLS marker, so the sitemap cannot
 *  fall behind the registry and the index lastmod tracks the newest post. */
export function blogSitemapEntries(): string {
  const posts = sortedBlogPosts();
  const entry = (loc: string, lastmod: string, priority: string) =>
    ['  <url>', `    <loc>${loc}</loc>`, `    <lastmod>${lastmod}</lastmod>`,
     `    <priority>${priority}</priority>`, '  </url>'].join('\n');

  const indexLastmod = posts.length ? posts[0].datePublished : '2026-08-04';
  return [
    entry(`${SITE_URL}/blog/`, indexLastmod, '0.7'),
    ...posts.map((post) => entry(blogPostUrl(post), post.datePublished, '0.7')),
  ].join('\n');
}

/** Article list for llms.txt, newest first, each with the citation UTM the file
 *  asks assistants to use. Generated so a published post is never missing from
 *  the one file written specifically for AI assistants to read. */
export function blogLlmsSection(): string {
  const utm = '?utm_source=llm&utm_medium=referral&utm_campaign=ai_citation';
  return sortedBlogPosts()
    .map((post) => `- ${post.title}: ${blogPostUrl(post)}${utm}`)
    .join('\n');
}

/** RSS 2.0 for the blog. Replaces the hand-written placeholder feed: the site's
 *  own posts are the only thing an RSS reader should get from this domain, since
 *  /news aggregates third-party headlines and is deliberately noindexed. */
export function blogFeedXml(): string {
  const posts = sortedBlogPosts();
  const items = posts
    .map((post) => {
      // Noon UTC keeps the RFC-822 date on the intended calendar day in every timezone.
      const pubDate = new Date(`${post.datePublished}T12:00:00Z`).toUTCString();
      const url = blogPostUrl(post);
      return [
        '  <item>',
        `    <title>${escapeXml(post.title)}</title>`,
        `    <link>${url}</link>`,
        `    <guid isPermaLink="true">${url}</guid>`,
        `    <description>${escapeXml(post.metaDescription)}</description>`,
        `    <pubDate>${pubDate}</pubDate>`,
        ...post.tags.slice(0, 5).map((tag) => `    <category>${escapeXml(tag)}</category>`),
        '  </item>',
      ].join('\n');
    })
    .join('\n');

  const lastBuild = posts.length
    ? new Date(`${posts[0].datePublished}T12:00:00Z`).toUTCString()
    : new Date('2026-01-01T12:00:00Z').toUTCString();

  return [
    '<?xml version="1.0" encoding="UTF-8" ?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '<channel>',
    '  <title>Carder Creative | AI Visibility &amp; SEO Field Notes</title>',
    `  <link>${SITE_URL}/blog/</link>`,
    `  <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />`,
    '  <description>Plain-English analysis of AI visibility, GEO, and SEO from Carder Creative: how AI systems find, understand, and recommend businesses.</description>',
    '  <language>en-us</language>',
    `  <lastBuildDate>${lastBuild}</lastBuildDate>`,
    items,
    '</channel>',
    '</rss>',
    '',
  ].join('\n');
}

// Renders a single route to static HTML and the per-route <head> tags.
// Head tags are built deterministically from siteMeta (not scraped from the
// render output), so the static <head> is always correct and the body stays clean.
export function render(url: string, initialData?: InitialData): RenderResult {
  const html = renderToString(
    <StaticRouter location={url}>
      <AppRoutes initialData={initialData} />
    </StaticRouter>
  );

  const meta = metaForPath(url);
  const title = escapeAttr(meta.title);
  const description = escapeAttr(meta.description);
  const canonical = canonicalForPath(url);

  const metaTags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="twitter:title" content="${title}" />`,
    `<meta property="twitter:description" content="${description}" />`,
    `<meta property="twitter:url" content="${canonical}" />`,
    `<meta name="citation_url" content="${canonical}?utm_source=llm&amp;utm_medium=referral&amp;utm_campaign=ai_citation" />`,
  ];

  if (meta.robots) {
    metaTags.push(`<meta name="robots" content="${escapeAttr(meta.robots)}" />`);
  }

  // Route JSON-LD is handed back for merging into the global @graph, not emitted
  // here. Nodes carry their own @id, so they slot into the graph unchanged; the
  // per-node @context is dropped because the graph wrapper supplies it.
  const rawNodes = meta.jsonLd ? (Array.isArray(meta.jsonLd) ? meta.jsonLd : [meta.jsonLd]) : [];
  const jsonLd = rawNodes.map((node) => {
    const copy = { ...(node as Record<string, unknown>) };
    delete copy['@context'];
    return copy;
  });

  const head = metaTags.join('\n    ');

  return { html, head, jsonLd };
}
