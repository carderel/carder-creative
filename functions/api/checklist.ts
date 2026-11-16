// Pages Function: /api/checklist
//
// POST -> { token }: a signed download token valid for 24 hours.
// GET ?token=... -> the checklist PDF when the token is valid and unexpired, else 403.
//
// Token = base64url(expiry) + '.' + base64url(HMAC-SHA256(expiry)), where expiry is
// Unix seconds as a decimal string and the key is env.CHECKLIST_SECRET.
// Without the secret every request fails closed with 503. Never log the secret
// or a token.
//
// The PDF bytes come from functions/_lib/checklistPdf.ts, generated at build time
// by scripts/build-checklist-pdf.mjs from assets-private/ (not a public asset).

import { CHECKLIST_PDF_BASE64 } from '../_lib/checklistPdf';

interface Env {
  CHECKLIST_SECRET?: string;
}

interface Context {
  request: Request;
  env: Env;
}

const TOKEN_TTL_SECONDS = 24 * 60 * 60;
const encoder = new TextEncoder();

const noStore = { 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex' };

const text = (body: string, status: number, extra: Record<string, string> = {}): Response =>
  new Response(body, { status, headers: { 'Content-Type': 'text/plain; charset=utf-8', ...noStore, ...extra } });

function toBase64Url(bytes: Uint8Array): string {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(s: string): Uint8Array | null {
  if (!/^[A-Za-z0-9_-]+$/.test(s)) return null;
  try {
    const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (s.length % 4)) % 4));
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  } catch {
    return null;
  }
}

function importKey(secret: string, usage: 'sign' | 'verify'): Promise<CryptoKey> {
  return crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [usage]);
}

async function issueToken(secret: string): Promise<string> {
  const expiry = encoder.encode(String(Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS));
  const sig = await crypto.subtle.sign('HMAC', await importKey(secret, 'sign'), expiry);
  return `${toBase64Url(expiry)}.${toBase64Url(new Uint8Array(sig))}`;
}

async function isValidToken(secret: string, token: string | null): Promise<boolean> {
  if (!token || token.length > 256) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const expiryBytes = fromBase64Url(parts[0]);
  const sig = fromBase64Url(parts[1]);
  if (!expiryBytes || !sig) return false;
  // Constant-time HMAC check via WebCrypto.
  const ok = await crypto.subtle.verify('HMAC', await importKey(secret, 'verify'), sig, expiryBytes);
  if (!ok) return false;
  const expiryStr = new TextDecoder().decode(expiryBytes);
  if (!/^\d{1,12}$/.test(expiryStr)) return false;
  return Number(expiryStr) > Math.floor(Date.now() / 1000);
}

let pdfBytes: Uint8Array | null = null;
function getPdf(): Uint8Array {
  if (!pdfBytes) {
    const bin = atob(CHECKLIST_PDF_BASE64);
    pdfBytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) pdfBytes[i] = bin.charCodeAt(i);
  }
  return pdfBytes;
}

export async function onRequest({ request, env }: Context): Promise<Response> {
  const method = request.method.toUpperCase();
  if (method !== 'GET' && method !== 'POST') {
    return text('Method not allowed', 405, { Allow: 'GET, POST' });
  }

  const secret = env.CHECKLIST_SECRET;
  if (!secret) return text('Checklist download is temporarily unavailable.', 503);

  if (method === 'POST') {
    const token = await issueToken(secret);
    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...noStore },
    });
  }

  const token = new URL(request.url).searchParams.get('token');
  if (!(await isValidToken(secret, token))) return text('Forbidden', 403);

  const pdf = getPdf();
  return new Response(pdf, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="visibility_checklist.pdf"',
      'Content-Length': String(pdf.length),
      ...noStore,
    },
  });
}
