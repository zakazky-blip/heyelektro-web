// Generates src/data/cz-map.json (SVG paths of Czech regions) from Natural Earth admin-1 (public domain).
// Usage: node scripts/build-map.mjs [scripts/data/cz-kraje.geojson]
import fs from "node:fs";

const src = process.argv[2] || "scripts/data/cz-kraje.geojson";
const gj = JSON.parse(fs.readFileSync(src, "utf8"));

const LAT0 = 49.8, LNG0 = 12.0, K = 100; // 1° latitude = 100 units
const COS = Math.cos((LAT0 * Math.PI) / 180);
export const project = (lat, lng) => [(lng - LNG0) * COS * K, (51.1 - lat) * K];

// Douglas–Peucker
function simplify(pts, eps) {
  if (pts.length < 3) return pts;
  const [a, b] = [pts[0], pts[pts.length - 1]];
  let idx = 0, max = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i];
    const num = Math.abs((b[1] - a[1]) * p[0] - (b[0] - a[0]) * p[1] + b[0] * a[1] - b[1] * a[0]);
    const den = Math.hypot(b[1] - a[1], b[0] - a[0]);
    const d = den === 0 ? Math.hypot(p[0] - a[0], p[1] - a[1]) : num / den;
    if (d > max) { max = d; idx = i; }
  }
  if (max > eps) {
    const l = simplify(pts.slice(0, idx + 1), eps);
    const r = simplify(pts.slice(idx), eps);
    return l.slice(0, -1).concat(r);
  }
  return [a, b];
}

const ring = (coords) =>
  "M" + simplify(coords.map(([lng, lat]) => project(lat, lng)), 0.6)
    .map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`)
    .join("L") + "Z";

const NAMES = { Prague: "Praha", "Vysočina": "Kraj Vysočina" };
const kraje = gj.features.map((f) => {
  const polys = f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;
  const d = polys.map((p) => p.map(ring).join("")).join("");
  const raw = f.properties.name;
  return { name: NAMES[raw] || `${raw} kraj`, key: raw, d };
});

const all = kraje.flatMap((k) => k.d.match(/-?\d+\.\d/g).map(Number));
const xs = all.filter((_, i) => i % 2 === 0), ys = all.filter((_, i) => i % 2 === 1);
const pad = 4;
const viewBox = [Math.min(...xs) - pad, Math.min(...ys) - pad, Math.max(...xs) - Math.min(...xs) + pad * 2, Math.max(...ys) - Math.min(...ys) + pad * 2]
  .map((n) => +n.toFixed(1)).join(" ");

fs.writeFileSync("src/data/cz-map.json", JSON.stringify({ viewBox, lat0: LAT0, lng0: LNG0, k: K, cos: COS, kraje }));
console.log("cz-map.json", viewBox, kraje.length, "regions,", JSON.stringify(kraje).length, "bytes");
