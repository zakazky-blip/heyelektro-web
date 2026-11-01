// Balíček k předání: statický web pro vlastní doménu na běžném webhostingu (nahrání přes FTP).
// 1) build s DEPLOY_TARGET=hosting, 2) .htaccess, formular.json a záložní složky, 3) ZIP, 4) návod v PDF.
// Spuštění: npm run balicek   →   predani/heyelektro-web.zip + predani/Návod k nahrání webu.pdf
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import zlib from "node:zlib";
import { spawnSync, execFileSync } from "node:child_process";
import { site } from "../src/data/site.ts";

const SITE = (process.env.SITE_URL || "https://www.heyelektro.cz").replace(/\/$/, "");
const host = new URL(SITE).host; // www.heyelektro.cz
const bare = host.replace(/^www\./, "");
const re = (s) => s.replace(/\./g, "\\.");
const dist = path.resolve("dist");
const outDir = path.resolve("predani");
const zipName = `${bare.replace(/\.[a-z]+$/, "")}-web.zip`;

// ——— 1) Build ———
const env = { ...process.env, DEPLOY_TARGET: "hosting", SITE_URL: SITE, BASE_PATH: "/", PUBLIC_NOINDEX: "0" };
delete env.PUBLIC_AUDIT_NO_BANNER;
const build = spawnSync("npx astro build", { stdio: "inherit", env, shell: true });
if (build.status !== 0) process.exit(build.status ?? 1);

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]));
const rel = (f) => path.relative(dist, f).split(path.sep).join("/");

// ——— 2a) Záložní složky: kdyby hosting .htaccess nenačetl, /sluzby/rozvadece/ pořád funguje přes index.html ———
let copies = 0;
for (const f of walk(dist)) {
  const r = rel(f);
  if (!r.endsWith(".html") || r === "index.html" || r === "404.html") continue;
  const target = path.join(dist, r.slice(0, -5), "index.html");
  if (fs.existsSync(target)) continue;
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(f, target);
  copies++;
}

// ——— 2b) .htaccess pro Apache / LiteSpeed ———
const htaccess = `# Web ${bare}: nastavení serveru pro běžný webhosting (Apache / LiteSpeed)

Options -Indexes -MultiViews
DirectoryIndex index.html
DirectorySlash Off
ErrorDocument 404 /404.html
AddDefaultCharset utf-8
AddCharset utf-8 .html .css .js .json .xml .txt .webmanifest
AddType application/manifest+json .webmanifest
AddType font/woff2 .woff2

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Vždy https://${host} (bez www i z http trvale přesměrovat)
  RewriteCond %{HTTP_HOST} ^${re(bare)}$ [NC]
  RewriteRule ^ https://${host}%{REQUEST_URI} [R=301,L,NE]
  RewriteCond %{HTTP_HOST} ^${re(host)}$ [NC]
  RewriteCond %{HTTPS} !=on
  RewriteCond %{HTTP:X-Forwarded-Proto} !=https
  RewriteRule ^ https://${host}%{REQUEST_URI} [R=301,L,NE]

  # Jedna adresa pro každou stránku: bez .html a bez lomítka na konci
  RewriteCond %{THE_REQUEST} \\s/+index\\.html[\\s?] [NC]
  RewriteRule ^ / [R=301,L]
  RewriteCond %{THE_REQUEST} \\s/+(.+?)\\.html[\\s?] [NC]
  RewriteRule ^ /%1 [R=301,L,NE]
  RewriteCond %{THE_REQUEST} \\s/+(.+?)/+(index\\.html)?[\\s?] [NC]
  RewriteRule ^ /%1 [R=301,L,NE]

  # Čistá adresa → soubor: /sluzby/rozvadece → sluzby/rozvadece.html
  RewriteCond %{REQUEST_FILENAME}.html -f
  RewriteRule ^(.+?)/?$ $1.html [L]
</IfModule>

<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
  <FilesMatch "\\.(html|json)$">
    Header set Cache-Control "no-cache"
  </FilesMatch>
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresDefault "access plus 1 hour"
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType application/json "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType text/javascript "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType image/webp "access plus 1 month"
  ExpiresByType image/avif "access plus 1 month"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/svg+xml "access plus 1 month"
  ExpiresByType image/x-icon "access plus 1 month"
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json application/xml text/xml text/plain image/svg+xml application/manifest+json
</IfModule>
`;
fs.writeFileSync(path.join(dist, ".htaccess"), htaccess);

// ——— 2c) Klíč pro formulář: zákazník ho vloží sem, web si ho načte při odeslání poptávky ———
fs.writeFileSync(
  path.join(dist, "formular.json"),
  JSON.stringify({ web3formsKlic: "", navod: "Klíč z web3forms.com vložte mezi uvozovky u web3formsKlic a soubor znovu nahrajte. Bez klíče formulář otevře e-mail s vyplněnou poptávkou." }, null, 2) + "\n",
);

// ——— 3) ZIP (vlastní zápis: lomítka v cestách, UTF-8 názvy, funguje i při rozbalení na serveru) ———
function zip(files, dest) {
  const parts = [], central = [];
  let offset = 0;
  const now = new Date();
  const dosTime = (now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1);
  const dosDate = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();
  for (const f of files) {
    const name = Buffer.from(rel(f), "utf8");
    const data = fs.readFileSync(f);
    const deflated = zlib.deflateRawSync(data, { level: 9 });
    const stored = deflated.length >= data.length;
    const body = stored ? data : deflated;
    const crc = zlib.crc32(data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(20, 4); local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(stored ? 0 : 8, 8); local.writeUInt16LE(dosTime, 10); local.writeUInt16LE(dosDate, 12);
    local.writeUInt32LE(crc, 14); local.writeUInt32LE(body.length, 18); local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(name.length, 26); local.writeUInt16LE(0, 28);
    parts.push(local, name, body);
    const c = Buffer.alloc(46);
    c.writeUInt32LE(0x02014b50, 0); c.writeUInt16LE(20, 4); c.writeUInt16LE(20, 6); c.writeUInt16LE(0x0800, 8);
    c.writeUInt16LE(stored ? 0 : 8, 10); c.writeUInt16LE(dosTime, 12); c.writeUInt16LE(dosDate, 14);
    c.writeUInt32LE(crc, 16); c.writeUInt32LE(body.length, 20); c.writeUInt32LE(data.length, 24);
    c.writeUInt16LE(name.length, 28); c.writeUInt32LE(offset, 42);
    central.push(c, name);
    offset += local.length + name.length + body.length;
  }
  const cd = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(files.length, 8); end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(cd.length, 12); end.writeUInt32LE(offset, 16);
  fs.writeFileSync(dest, Buffer.concat([...parts, cd, end]));
}

fs.mkdirSync(outDir, { recursive: true });
const files = walk(dist).sort((a, b) => rel(a).localeCompare(rel(b)));
const zipPath = path.join(outDir, zipName);
zip(files, zipPath);

// ——— 4) Návod v PDF (headless Chrome) ———
const chrome = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].find((p) => fs.existsSync(p));
const pdfPath = path.join(outDir, "Návod k nahrání webu.pdf");
if (chrome) {
  const fileUrl = (p) => `file:///${path.resolve(p).replace(/\\/g, "/")}`;
  const font = (set, w) => fileUrl(`node_modules/@fontsource/poppins/files/poppins-${set}-${w}-normal.woff2`);
  const html = fs
    .readFileSync("scripts/navod-k-nahrani.html", "utf8")
    .replaceAll("{{FONT_400}}", font("latin", 400)).replaceAll("{{FONT_400X}}", font("latin-ext", 400))
    .replaceAll("{{FONT_700}}", font("latin", 700)).replaceAll("{{FONT_700X}}", font("latin-ext", 700))
    .replaceAll("{{LOGO}}", fs.readFileSync("public/brand/logo-stacked-light.svg", "utf8").replace("<svg ", '<svg class="logo" '))
    .replaceAll("{{SITE}}", SITE).replaceAll("{{HOST}}", host).replaceAll("{{BARE}}", bare).replaceAll("{{ZIP}}", zipName).replaceAll("{{EMAIL}}", site.email);
  const tmp = path.join(os.tmpdir(), "navod-k-nahrani.html");
  fs.writeFileSync(tmp, html);
  execFileSync(chrome, ["--headless=new", "--disable-gpu", "--allow-file-access-from-files", "--no-pdf-header-footer", `--print-to-pdf=${pdfPath}`, fileUrl(tmp)], { stdio: "ignore" });
  fs.unlinkSync(tmp);
} else {
  console.warn("Chrome nenalezen, návod v PDF přeskočen.");
}

const mb = (fs.statSync(zipPath).size / 1048576).toFixed(1);
console.log(`\nHotovo: ${files.length} souborů (${copies} záložních složek), ${path.relative(process.cwd(), zipPath)} (${mb} MB)`);
if (chrome) console.log(`Návod: ${path.relative(process.cwd(), pdfPath)}`);
