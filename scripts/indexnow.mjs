// Submits the site's sitemap URLs to IndexNow.
// One submission reaches all participating engines (Bing, Yandex, Seznam, Naver).
// The key is read from the verification file in public/ (public/<key>.txt), which
// is hosted at https://<host>/<key>.txt — IndexNow fetches it to verify ownership.
//
// Runs as part of the deploy build (`npm run build && npm run indexnow`) and can
// also be run by hand: `node scripts/indexnow.mjs`.
//
// IMPORTANT: this is a best-effort SEO notification. It must NEVER fail the build,
// so every error path logs a warning and exits 0. A missed ping is harmless; a
// blocked deploy is not. Requires Node 18+ (global fetch).

import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HOST = 'cardercreative.com';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

function warn(msg) {
  console.warn(`IndexNow: skipped - ${msg}`);
}

try {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const publicDir = resolve(root, 'public');

  const keyFile = readdirSync(publicDir).find((f) => /^[a-f0-9]{8,128}\.txt$/i.test(f));
  if (!keyFile) {
    warn('no key file (public/<hex>.txt) found');
    process.exit(0);
  }
  const key = keyFile.replace(/\.txt$/i, '');

  const sitemap = readFileSync(resolve(publicDir, 'sitemap.xml'), 'utf-8');
  const urlList = [...sitemap.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)]
    .map((m) => m[1])
    .filter((u) => /^https?:\/\//.test(u));

  if (urlList.length === 0) {
    warn('no <loc> URLs found in public/sitemap.xml');
    process.exit(0);
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

  // 200 = OK, 202 = accepted (validation pending). 4xx/5xx are logged but not fatal.
  if (res.status >= 400) {
    const body = await res.text().catch(() => '');
    warn(`endpoint returned HTTP ${res.status} ${res.statusText}. ${body}`.trim());
    process.exit(0);
  }

  console.log(`IndexNow: submitted ${urlList.length} URLs -> HTTP ${res.status} ${res.statusText}`);
  urlList.forEach((u) => console.log(`  - ${u}`));
} catch (err) {
  // Network error, DNS, etc. — never fail the build over a notification.
  warn(err?.message ?? String(err));
  process.exit(0);
}
