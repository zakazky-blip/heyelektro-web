// Rebuilds clean Hey! Elektro logo SVGs from path data extracted from the round-3 PDF (varianta A2 „Dva blesky“).
// Units: circle-local (ring r = 150 centred at 0,0).
import fs from "node:fs";

const P = JSON.parse(fs.readFileSync(new URL("./logo-paths.json", import.meta.url), "utf8"));
const OUT = process.argv[2] || "public/brand";
fs.mkdirSync(OUT, { recursive: true });

const Y = "#FECA14", D = "#10161D", W = "#FFFFFF";
const RING_W = Number(process.env.RING_W || 7.5);
const EY_W = 19.5, EXCL_W = 17.5, GAP = Number(process.env.GAP || 6);
const TEXT_M = "matrix(1.3 -0.37277 -0.34833 1.3 -186.84 102.66)";

const H = P.path374.d, EY = P.path378.d, EXCL = P.path380.d, DOT = P.path382.d;
const SWOOSH = P.path334.d, ELEKTRO = P.path418.d;

const fmt = (s) => s.replace(/(\d+\.\d)\d+/g, "$1");

// Text block; colours per variant.
const text = ({ h, ey, ex }) => `<g transform="${TEXT_M}">
  <path d="${fmt(H)}" fill="${h}" stroke="${h}" stroke-width="3" stroke-linejoin="round"/>
  <path d="${fmt(EY)}" fill="none" stroke="${ey}" stroke-width="${EY_W}" stroke-linejoin="round"/>
  <path d="${fmt(EXCL)}" stroke="${ex}" stroke-width="${EXCL_W}"/>
  <path d="${fmt(DOT)}" fill="${ex}" stroke="${ex}" stroke-width="2"/>
</g>`;

// Knockout mask so the ring/swoosh break around the lettering.
const mask = (id) => `<mask id="${id}" maskUnits="userSpaceOnUse" x="-400" y="-400" width="800" height="800">
  <rect x="-400" y="-400" width="800" height="800" fill="#fff"/>
  <g transform="${TEXT_M}" stroke="#000" stroke-linejoin="round">
    <path d="${fmt(H)}" fill="#000" stroke-width="${GAP * 2}"/>
    <path d="${fmt(EY)}" fill="none" stroke-width="${EY_W + GAP * 2}"/>
    <path d="${fmt(EXCL)}" stroke-width="${EXCL_W + GAP * 2}"/>
    <path d="${fmt(DOT)}" fill="#000" stroke-width="${GAP * 2}"/>
  </g>
</mask>`;

const ring = (c, id) => `<g mask="url(#${id})">
  <circle r="150" fill="none" stroke="${c}" stroke-width="${RING_W}"/>
  <path d="${fmt(SWOOSH)}" fill="${c}"/>
</g>`;

const wordmark = (c, x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <clipPath id="ek"><rect x="-5" y="-25" width="320" height="25"/></clipPath>
  <path d="${fmt(ELEKTRO)}" fill="none" stroke="${c}" stroke-width="5.6" clip-path="url(#ek)"/>
</g>`;

const svg = (vb, body, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>\n`;

const markBody = (cols, mid) => `${mask(mid)}${ring(cols.ring, mid)}${text(cols)}`;
const onDark = { ring: Y, h: Y, ey: W, ex: Y };
const mono = (c) => ({ ring: c, h: c, ey: c, ex: c });

// Bounding box of the mark incl. lettering overflow (measured from renders).
const MARK_VB = "-215 -200 430 400";

const files = {
  "logo-mark.svg": svg(MARK_VB, markBody(onDark, "k"), "Hey! Elektro"),
  "logo-mark-black.svg": svg(MARK_VB, markBody(mono(D), "k"), "Hey! Elektro"),
  "logo-mark-white.svg": svg(MARK_VB, markBody(mono(W), "k"), "Hey! Elektro"),
  // Stacked logo, dark background version
  "logo-stacked-dark.svg": svg("-215 -200 430 460", markBody(onDark, "k") + wordmark(W, -154.5, 245.5), "Hey! Elektro"),
  // For light backgrounds: dark disc behind the mark, dark wordmark
  "logo-stacked-light.svg": svg("-215 -215 430 475", `<circle r="200" fill="${D}"/>` + markBody(onDark, "k") + wordmark(D, -154.5, 245.5), "Hey! Elektro"),
  // Horizontal lockup (header, van, business card): mark + ELEKTRO to the right
  "logo-horizontal-dark.svg": svg("-215 -200 925 400", markBody(onDark, "k") + wordmark(W, 232, 37.5, 1.5), "Hey! Elektro"),
  "logo-horizontal-light.svg": svg("-215 -200 925 400", markBody({ ring: Y, h: Y, ey: D, ex: Y }, "k") + wordmark(D, 232, 37.5, 1.5), "Hey! Elektro"),
  "elektro-wordmark.svg": svg("0 -25 310 25", wordmark("currentColor", 0, 0), "Elektro"),
};
for (const [name, content] of Object.entries(files)) fs.writeFileSync(`${OUT}/${name}`, content);

// Icon: single H made of two bolts inside a ring (favicon, app icon, avatar).
const I = P.path1846.d, IS = P.path1844.d;
const icon = (bg, radius, ringW = 14) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-256 -256 512 512"><title>Hey! Elektro</title>
${bg ? `<rect x="-256" y="-256" width="512" height="512" rx="${radius}" fill="${D}"/>` : ""}
<g transform="scale(1.18)"><circle r="154" fill="none" stroke="${Y}" stroke-width="${ringW}"/><path d="${fmt(IS)}" fill="${Y}"/><path d="${fmt(I)}" fill="${Y}" transform="scale(1.25)"/></g></svg>\n`;
fs.writeFileSync(`${OUT}/icon.svg`, icon(true, 112));
fs.writeFileSync(`${OUT}/icon-square.svg`, icon(true, 0));
fs.writeFileSync(`${OUT}/icon-maskable.svg`, icon(true, 0).replace('scale(1.18)', 'scale(0.95)'));
console.log("written", Object.keys(files).length + 3, "files to", OUT);

// Lettering only ("Hey!" without the ring) for large supergraphics. viewBox fitted from Inkscape bbox query.
const LVB = process.env.LVB || "-181 -99 361.5 198";
fs.writeFileSync(`${OUT}/logo-lettering.svg`, svg(LVB, `<g id="lt">${text(onDark)}</g>`, "Hey!"));
fs.writeFileSync(`${OUT}/logo-lettering-mono.svg`, svg(LVB, `<g id="lt">${text({ h: "currentColor", ey: "currentColor", ex: "currentColor" })}</g>`, "Hey!"));
