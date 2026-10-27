// Sdílecí obrázky (Open Graph, 1200×630) pro úvod, každou službu a každou lokalitu.
// Oficiální logo (stacked, ELEKTRO na střed), písmo Poppins, fotka služby. Fotí headless Chrome.
// Spuštění: npm run og   (Node 23.6+ kvůli importu .ts dat)
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import sharp from "sharp";
import { services } from "../src/data/services.ts";
import { locations } from "../src/data/locations.ts";

const outDir = path.resolve("public/og");
fs.mkdirSync(outDir, { recursive: true });

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

const fileUrl = (p) => `file:///${path.resolve(p).replace(/\\/g, "/")}`;
const font = (set, w) => fileUrl(`node_modules/@fontsource/poppins/files/poppins-${set}-${w}-normal.woff2`);
const logo = fs.readFileSync("public/brand/logo-stacked-dark.svg", "utf8").replace("<svg ", '<svg style="width:100%;height:auto;display:block" ');
// Fotka ke klíči Service.image (stejné přiřazení jako serviceImage v src/data/images.ts)
const photo = {
  kamera: "kamera-dome.jpg",
  alarm: "dum-noc.jpg",
  rozvadec: "rozvadec.jpg",
  elektroinstalace: "elektrikar.jpg",
  revize: "kleste.jpg",
  wallbox: "wallbox.jpg",
  sit: "sit.jpg",
  videotelefon: "videotelefon.jpg",
};
const locPhotos = ["elektrikar.jpg", "rozvadec-kabely.jpg", "kamera-dome.jpg", "elektrikar-helma.jpg", "rozvadec.jpg", "dum-noc.jpg"];
// Nezlomitelná mezera za jednopísmennými předložkami a spojkami
const nb = (t) => t.replace(/(^|\s)([kvszaiouKVSZAIOU])\s/g, "$1$2&nbsp;").replace("východní Čechy", "východní&nbsp;Čechy");

const ogs = [
  { file: "og-default", title: "Elektroinstalace a zabezpečení", sub: "Elektrikáři ze Zábřehu · Olomoucký kraj · východní Čechy · Opava · Ostrava" },
  ...services.map((s) => ({ file: `sluzba-${s.slug}`, title: s.h1, desc: s.short, sub: "Zábřeh · Olomoucký kraj · východní Čechy", photo: photo[s.image] })),
  ...locations.map((l, i) => ({
    file: `lokalita-${l.slug}`,
    title: l.h1,
    sub: l.km ? `${l.km} km ze Zábřehu · Hey! Elektro` : "Sídlo Hey! Elektro · Křížkovského 865/4",
    photo: locPhotos[i % locPhotos.length],
  })),
];

for (const og of ogs) {
  const withPhoto = Boolean(og.photo);
  const html = `<!doctype html><html lang="cs"><head><meta charset="utf-8"><style>
    @font-face{font-family:P;src:url("${font("latin", 700)}") format("woff2");font-weight:700;unicode-range:U+0000-00FF}
    @font-face{font-family:P;src:url("${font("latin-ext", 700)}") format("woff2");font-weight:700;unicode-range:U+0100-024F}
    @font-face{font-family:P;src:url("${font("latin", 500)}") format("woff2");font-weight:500;unicode-range:U+0000-00FF}
    @font-face{font-family:P;src:url("${font("latin-ext", 500)}") format("woff2");font-weight:500;unicode-range:U+0100-024F}
    html,body{margin:0;width:1200px;height:630px;background:#10161D;color:#fff;font-family:P,sans-serif;overflow:hidden;position:relative}
    .y{position:absolute;left:0;top:0;width:12px;height:630px;background:#FECA14}
    .ph{position:absolute;right:0;top:0;width:540px;height:630px;background:#18202A center/cover no-repeat;clip-path:polygon(96px 0,100% 0,100% 100%,0 100%)}
    .ph::after{content:"";position:absolute;left:0;top:0;bottom:0;width:120px;background:#FECA14;clip-path:polygon(96px 0,108px 0,12px 100%,0 100%)}
    .lg{position:absolute}
    h1{position:absolute;left:72px;margin:0;font-weight:700;letter-spacing:-0.035em;line-height:1.04}
    .d{position:absolute;left:72px;margin:0;font-size:24px;font-weight:500;color:#fff;opacity:.82;line-height:1.4}
    p{position:absolute;left:72px;bottom:58px;margin:0;font-size:22px;font-weight:500;color:#B4BFCC;line-height:1.4}
    ${withPhoto
      ? ".lg{left:72px;top:52px;width:132px} h1{top:236px;width:560px;font-size:54px} .d{width:540px} p{width:560px}"
      : ".lg{right:96px;top:92px;width:400px} h1{top:190px;width:600px;font-size:72px} p{width:600px}"}
  </style></head><body><div class="y"></div>${withPhoto ? `<div class="ph" style="background-image:url('${fileUrl(`src/assets/foto/${og.photo}`)}')"></div>` : ""}<div class="lg">${logo}</div><h1>${nb(og.title)}</h1>${og.desc ? `<div class="d" style="top:${og.title.length > 22 ? 380 : 324}px">${nb(og.desc)}</div>` : ""}<p>${nb(og.sub)}</p></body></html>`;
  const tmp = path.join(os.tmpdir(), `hey-og-${og.file}.html`);
  fs.writeFileSync(tmp, html);
  const png = path.join(outDir, `${og.file}.png`);
  execFileSync(chrome, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1", "--allow-file-access-from-files", "--window-size=1200,630", `--screenshot=${png}`, fileUrl(tmp)], { stdio: "ignore" });
  await sharp(png).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(outDir, `${og.file}.jpg`));
  fs.unlinkSync(png);
  fs.unlinkSync(tmp);
  console.log("og", og.file);
}
