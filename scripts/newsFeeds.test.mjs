import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  decodeEntities, stripHtml, unwrapUrl, normalizeUrl, sourceFromUrl, parseFeed, dedupeArticles,
} from './newsFeeds.mjs';

test('decodeEntities decodes named, numeric, and nbsp', () => {
  assert.equal(decodeEntities('a &amp; b &#39;c&#39; &nbsp;d &lt;e&gt;'), "a & b 'c'  d <e>");
});

test('stripHtml removes escaped tags, entities, zero-width, collapses whitespace', () => {
  assert.equal(stripHtml('How to &lt;b&gt;Rank&lt;/b&gt;&nbsp;in AI  Search'), 'How to Rank in AI Search');
  assert.equal(stripHtml('​Leading zero-width'), 'Leading zero-width');
});

test('decodeEntities handles double-encoded entities (Google Alerts feed)', () => {
  assert.equal(decodeEntities('Google&amp;#39;s'), "Google's");
  assert.equal(decodeEntities('2.5&amp;nbsp;end'), '2.5 end');
  assert.equal(decodeEntities('AT&amp;amp;T'), 'AT&T');
});

test('stripHtml cleans double-encoded title from a Google Alerts entry', () => {
  assert.equal(stripHtml('GOOGLE&amp;#39;S RED-HOT &lt;b&gt;CLOUD&lt;/b&gt; GROWTH'), "GOOGLE'S RED-HOT CLOUD GROWTH");
  assert.equal(stripHtml('In 2024 &amp;#8230; 2.5&amp;nbsp;&amp;#8230;'), 'In 2024 … 2.5 …');
});

test('unwrapUrl extracts the real url from a google.com/url wrapper (with &amp;)', () => {
  const href = 'https://www.google.com/url?rct=j&amp;sa=t&amp;url=https://ex.com/post?a=1&amp;ct=ga&amp;usg=x';
  assert.equal(unwrapUrl(href), 'https://ex.com/post?a=1');
});

test('unwrapUrl passes through a direct url', () => {
  assert.equal(unwrapUrl('https://ex.com/post'), 'https://ex.com/post');
});

test('normalizeUrl equates www/case/tracking/trailing-slash variants', () => {
  const a = normalizeUrl('https://www.Ex.com/Post/?utm_source=x&gclid=1');
  const b = normalizeUrl('https://ex.com/Post');
  assert.equal(a, b);
});

test('sourceFromUrl returns registrable-ish domain without www', () => {
  assert.equal(sourceFromUrl('https://www.forbes.com/x/y'), 'forbes.com');
});

test('parseFeed extracts entries with unwrapped url, clean title/summary', () => {
  const xml = `<feed><entry>
    <title type="html">Foo &lt;b&gt;Bar&lt;/b&gt; - Ex</title>
    <link href="https://www.google.com/url?sa=t&amp;url=https://ex.com/a&amp;usg=z"></link>
    <published>2026-07-22T12:00:00Z</published>
    <content type="html">Snippet &lt;b&gt;here&lt;/b&gt;&nbsp;...</content>
    <author><name></name></author>
  </entry></feed>`;
  const items = parseFeed(xml, 'AI SEO');
  assert.equal(items.length, 1);
  assert.equal(items[0].url, 'https://ex.com/a');
  assert.equal(items[0].title, 'Foo Bar - Ex');
  assert.equal(items[0].summary, 'Snippet here ...');
  assert.equal(items[0].keyword, 'AI SEO');
  assert.equal(items[0].published_at, '2026-07-22T12:00:00Z');
});

test('dedupeArticles collapses same-URL across feeds and merges keywords (multi-tag)', () => {
  const items = [
    { title: 'A', url: 'https://ex.com/a?utm_source=feedA', published_at: '2026-07-22T10:00:00Z', summary: 's', keyword: 'AI SEO' },
    { title: 'A', url: 'https://www.ex.com/a', published_at: '2026-07-22T10:00:00Z', summary: 's', keyword: 'GEO' },
    { title: 'B', url: 'https://ex.com/b', published_at: '2026-07-22T09:00:00Z', summary: 's', keyword: 'GEO' },
  ];
  const out = dedupeArticles(items);
  assert.equal(out.length, 2);
  const a = out.find(x => x.url.includes('/a'));
  assert.deepEqual(a.keywords, ['AI SEO', 'GEO']);
  assert.equal(a.source, 'ex.com');
});
