// Jednoduchý statický server nad produkčním buildem (.vercel/output/static) pro lokální měření výkonu.
// Napodobuje Vercel: čisté URL bez .html, gzip/brotli, dlouhá cache pro /_astro.
// Spuštění: node scripts/serve-static.mjs [port] [složka] [podadresa]
//   Vercel build:        node scripts/serve-static.mjs 4322
//   GitHub Pages build:  node scripts/serve-static.mjs 4323 dist /heyelektro-web
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname, resolve } from "node:path";
import { brotliCompressSync, gzipSync } from "node:zlib";

const port = Number(process.argv[2] || 4322);
const root = resolve(process.argv[3] || ".vercel/output/static");
const base = (process.argv[4] || "").replace(/\/$/, "");
const MIME = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif", ".woff2": "font/woff2", ".ico": "image/x-icon", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8", ".webmanifest": "application/manifest+json", ".json": "application/json" };
const cache = new Map();

createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (base && p.startsWith(base)) p = p.slice(base.length) || "/";
  let f = join(root, p);
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, "index.html");
  else if (!existsSync(f) && existsSync(f + ".html")) f += ".html";
  else if (!existsSync(f) && existsSync(join(f, "index.html"))) f = join(f, "index.html");
  let status = 200;
  if (!existsSync(f)) { f = join(root, "404.html"); status = 404; }
  const ext = extname(f);
  const type = MIME[ext] || "application/octet-stream";
  const enc = req.headers["accept-encoding"] || "";
  const compressible = /text|javascript|svg|xml|json|manifest/.test(type);
  const key = f + (enc.includes("br") ? ":br" : enc.includes("gzip") ? ":gz" : "");
  let body = cache.get(key);
  if (!body) {
    body = readFileSync(f);
    if (compressible && enc.includes("br")) body = brotliCompressSync(body);
    else if (compressible && enc.includes("gzip")) body = gzipSync(body);
    cache.set(key, body);
  }
  const headers = { "Content-Type": type, "Cache-Control": p.startsWith("/_astro/") ? "public, max-age=31536000, immutable" : "public, max-age=0, must-revalidate" };
  if (compressible && enc.includes("br")) headers["Content-Encoding"] = "br";
  else if (compressible && enc.includes("gzip")) headers["Content-Encoding"] = "gzip";
  res.writeHead(status, headers);
  res.end(body);
}).listen(port, () => console.log(`http://localhost:${port}`));
