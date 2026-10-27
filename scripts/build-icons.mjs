// Vygeneruje favicon, ikony pro manifest a PNG loga z SVG značky (renderuje sharp/librsvg).
// Spuštění: node scripts/build-icons.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const pub = "public";
const brand = path.join(pub, "brand");

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

// Sdílecí obrázky (OG) generuje scripts/build-og.mjs (npm run og).
console.log("ikony hotové");
