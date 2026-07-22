// Build-time Google Alerts RSS ingest: fetch -> parse -> dedupe -> Article[].
// Pure Node ESM, zero deps. Imported by prerender.mjs; pure fns covered by newsFeeds.test.mjs.

const TRACKING_PARAMS = new Set([
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'gclid', 'fbclid', 'ct', 'cd', 'usg', 'rct', 'sa', 'ved', 'ei', 'oq', 'gs_lcp',
]);

const NAMED_ENTITIES = {
  '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&apos;': "'", '&nbsp;': ' ',
};

export function decodeEntities(s) {
  if (!s) return '';
  let out = s;
  for (let i = 0; i < 5; i++) {
    const next = out
      .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
      .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCodePoint(parseInt(n, 16)))
      .replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&apos;|&nbsp;/g, (m) => NAMED_ENTITIES[m] ?? m);
    if (next === out) break;
    out = next;
  }
  return out;
}

export function stripHtml(s) {
  if (!s) return '';
  return decodeEntities(s)
    .replace(/<[^>]*>/g, '')
    .replace(/[​-‍﻿]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function unwrapUrl(href) {
  if (!href) return '';
  const decoded = decodeEntities(href);
  try {
    const u = new URL(decoded);
    if (u.hostname.endsWith('google.com') && u.pathname === '/url') {
      const real = u.searchParams.get('url');
      if (real) return real;
    }
  } catch { /* not a URL; fall through */ }
  return decoded;
}

export function normalizeUrl(url) {
  try {
    const u = new URL(url);
    u.hash = '';
    u.hostname = u.hostname.toLowerCase().replace(/^www\./, '');
    u.protocol = 'https:';
    for (const p of [...u.searchParams.keys()]) {
      if (TRACKING_PARAMS.has(p)) u.searchParams.delete(p);
    }
    return u.toString().replace(/\/(\?|#|$)/, '$1').replace(/\/$/, '');
  } catch {
    return url;
  }
}

export function sourceFromUrl(url) {
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    return null;
  }
}

export function matchTag(s, tag) {
  const m = s.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return m ? m[1] : '';
}

export function parseFeed(xml, label) {
  const items = [];
  const chunks = xml.split('<entry>').slice(1);
  for (const chunk of chunks) {
    const entry = chunk.split('</entry>')[0];
    const title = stripHtml(matchTag(entry, 'title'));
    const hrefMatch = entry.match(/<link[^>]*href="([^"]*)"/);
    const url = hrefMatch ? unwrapUrl(hrefMatch[1]) : '';
    const published = matchTag(entry, 'published').trim();
    const summary = stripHtml(matchTag(entry, 'content'));
    if (!url || !title) continue;
    items.push({ title, url, published_at: published || null, summary: summary || null, keyword: label });
  }
  return items;
}

export async function fetchFeed(url, timeoutMs = 15000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: ctrl.signal, headers: { 'user-agent': 'CarderCreativeNewsBot/1.0' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

export function dedupeArticles(items) {
  const byKey = new Map();
  for (const it of items) {
    const key = normalizeUrl(it.url);
    const existing = byKey.get(key);
    if (existing) {
      if (!existing.keywords.includes(it.keyword)) existing.keywords.push(it.keyword);
    } else {
      byKey.set(key, {
        url: it.url,
        title: it.title,
        source: sourceFromUrl(it.url),
        published_at: it.published_at,
        summary: it.summary,
        keywords: [it.keyword],
      });
    }
  }
  return [...byKey.values()];
}

export async function buildArticles(feeds, opts = {}) {
  const perFeed = await Promise.all(feeds.map(async (f) => {
    try {
      const xml = await fetchFeed(f.url, opts.timeoutMs);
      return parseFeed(xml, f.label);
    } catch (err) {
      console.warn(`news: feed "${f.label}" failed (${err?.message ?? err}); skipping`);
      return [];
    }
  }));
  const deduped = dedupeArticles(perFeed.flat());
  deduped.sort((a, b) => {
    const ta = a.published_at ? Date.parse(a.published_at) : NaN;
    const tb = b.published_at ? Date.parse(b.published_at) : NaN;
    if (Number.isNaN(ta) && Number.isNaN(tb)) return 0;
    if (Number.isNaN(ta)) return 1;
    if (Number.isNaN(tb)) return -1;
    return tb - ta;
  });
  return deduped.slice(0, opts.cap ?? 200).map((a, i) => ({ id: i + 1, ...a }));
}
