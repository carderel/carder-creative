// Submits the site's sitemap URLs to IndexNow.
// One submission reaches all participating engines (Bing, Yandex, Seznam, Naver).
// The key is read from the verification file in public/ (public/<key>.txt), which
// is hosted at https://<host>/<key>.txt — IndexNow fetches it to verify ownership.
//
// Usage: node scripts/indexnow.mjs   (run after the site is deployed/live)
// Requires Node 18+ (global fetch).

import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HOST = 'cardercreative.com';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = resolve(root, 'public');

const keyFile = readdirSync(publicDir).find((f) => /^[a-f0-9]{8,128}\.txt$/i.test(f));
if (!keyFile) {
  console.error('IndexNow: no key file (public/<hex>.txt) found.');
  process.exit(1);
}
const key = keyFile.replace(/\.txt$/i, '');

const sitemap = readFileSync(resolve(publicDir, 'sitemap.xml'), 'utf-8');
const urlList = [...sitemap.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)]
  .map((m) => m[1])
  .filter((u) => /^https?:\/\//.test(u));

if (urlList.length === 0) {
  console.error('IndexNow: no <loc> URLs found in public/sitemap.xml.');
  process.exit(1);
}

const payload = {
  host: HOST,
  key,
  keyLocation: `https://${HOST}/${keyFile}`,
  urlList,
};

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
});

const text = await res.text();
console.log(`IndexNow: submitted ${urlList.length} URLs -> HTTP ${res.status} ${res.statusText}`);
urlList.forEach((u) => console.log(`  - ${u}`));

// 200 = accepted, 202 = accepted/validation pending. Anything >=400 is a failure.
if (res.status >= 400) {
  console.error(`IndexNow error body: ${text}`);
  process.exit(1);
}
