// Vygeneruje favicon, ikony pro manifest, PNG loga a sdílecí obrázky (OG) z SVG značky.
// PNG ikony renderuje sharp (librsvg). OG obrázky s písmem Poppins fotí headless Chrome.
// Spuštění: node scripts/build-icons.mjs
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import os from "node:os";
import sharp from "sharp";

const pub = "public";
const brand = path.join(pub, "brand");
fs.mkdirSync(path.join(pub, "og"), { recursive: true });

const icon = fs.readFileSync(path.join(brand, "icon.svg"));
const iconSquare = fs.readFileSync(path.join(brand, "icon-square.svg"));
const maskable = fs.readFileSync(path.join(brand, "icon-maskable.svg"));

await sharp(iconSquare, { density: 300 }).resize(180, 180).png().toFile(path.join(pub, "apple-touch-icon.png"));
await sharp(icon, { density: 300 }).resize(192, 192).png().toFile(path.join(pub, "icon-192.png"));
await sharp(icon, { density: 300 }).resize(512, 512).png().toFile(path.join(pub, "icon-512.png"));
await sharp(maskable, { density: 300 }).resize(512, 512).png().toFile(path.join(pub, "icon-maskable-512.png"));

// favicon.ico (PNG uvnitř ICO, 32 px)
const png32 = await sharp(icon, { density: 300 }).resize(32, 32).png().toBuffer();
const ico = Buffer.alloc(22);
ico.writeUInt16LE(0, 0); ico.writeUInt16LE(1, 2); ico.writeUInt16LE(1, 4);
ico.writeUInt8(32, 6); ico.writeUInt8(32, 7); ico.writeUInt8(0, 8); ico.writeUInt8(0, 9);
ico.writeUInt16LE(1, 10); ico.writeUInt16LE(32, 12); ico.writeUInt32LE(png32.length, 14); ico.writeUInt32LE(22, 18);
fs.writeFileSync(path.join(pub, "favicon.ico"), Buffer.concat([ico, png32]));

// PNG logo pro schema.org a e-maily
await sharp(fs.readFileSync(path.join(brand, "logo-stacked-light.svg")), { density: 300 }).resize({ width: 600 }).png().toFile(path.join(brand, "logo-stacked-light.png"));
await sharp(fs.readFileSync(path.join(brand, "logo-stacked-dark.svg")), { density: 300 }).resize({ width: 600 }).flatten({ background: "#10161D" }).png().toFile(path.join(brand, "logo-stacked-dark.png"));

// OG obrázky přes headless Chrome
const chrome = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].find((p) => fs.existsSync(p));
if (!chrome) {
  console.warn("Chrome nenalezen, OG obrázky přeskočeny.");
  process.exit(0);
}
const font = (w) => path.resolve(`node_modules/@fontsource/poppins/files/poppins-latin-ext-${w}-normal.woff2`).replace(/\\/g, "/");
const fontL = (w) => path.resolve(`node_modules/@fontsource/poppins/files/poppins-latin-${w}-normal.woff2`).replace(/\\/g, "/");
const lettering = fs.readFileSync(path.join(brand, "logo-lettering.svg"), "utf8");
const wordmark = fs.readFileSync(path.join(brand, "elektro-wordmark.svg"), "utf8");

const ogs = [
  { file: "og-default", title: "Kamery, alarmy Jablotron a&nbsp;rozvaděče", sub: "Zábřeh · Olomoucký kraj · východní Čechy · Opava · Ostrava" },
];

for (const og of ogs) {
  const html = `<!doctype html><html lang="cs"><head><meta charset="utf-8"><style>
    @font-face{font-family:P;src:url("file:///${fontL(700)}") format("woff2");font-weight:700;unicode-range:U+0000-00FF}
    @font-face{font-family:P;src:url("file:///${font(700)}") format("woff2");font-weight:700;unicode-range:U+0100-024F}
    @font-face{font-family:P;src:url("file:///${fontL(500)}") format("woff2");font-weight:500;unicode-range:U+0000-00FF}
    @font-face{font-family:P;src:url("file:///${font(500)}") format("woff2");font-weight:500;unicode-range:U+0100-024F}
    html,body{margin:0;width:1200px;height:630px;background:#10161D;color:#fff;font-family:P,sans-serif;overflow:hidden}
    .l{position:absolute;right:56px;bottom:52px;width:560px}
    .w{position:absolute;left:72px;top:72px;width:260px;color:#fff}
    h1{position:absolute;left:72px;top:150px;margin:0;width:560px;font-size:64px;line-height:1.02;letter-spacing:-0.035em;font-weight:700}
    p{position:absolute;left:72px;bottom:64px;margin:0;font-size:24px;font-weight:500;color:#B4BFCC;width:460px;line-height:1.4}
    .y{position:absolute;left:0;top:0;width:12px;height:630px;background:#FECA14}
  </style></head><body><div class="y"></div><div class="w">${wordmark.replace("<svg ", '<svg style="width:100%;height:auto;color:#fff" ')}</div><h1>${og.title}</h1><p>${og.sub}</p><div class="l">${lettering.replace("<svg ", '<svg style="width:100%;height:auto" ')}</div></body></html>`;
  const tmp = path.join(os.tmpdir(), `hey-og-${og.file}.html`);
  fs.writeFileSync(tmp, html);
  const out = path.resolve(pub, "og", `${og.file}.png`);
  execFileSync(chrome, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1", `--window-size=1200,630`, `--screenshot=${out}`, `file:///${tmp.replace(/\\/g, "/")}`], { stdio: "ignore" });
  await sharp(out).jpeg({ quality: 86, mozjpeg: true }).toFile(path.resolve(pub, "og", `${og.file}.jpg`));
  fs.unlinkSync(out);
  console.log("og", og.file);
}
console.log("ikony hotové");
