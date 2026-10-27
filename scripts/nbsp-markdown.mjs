// Doplní nezlomitelné mezery do těla článků v src/content/poradna (frontmatter řeší cz() v šablonách).
// Spusťte po úpravě článků: node scripts/nbsp-markdown.mjs
import fs from "node:fs";
import path from "node:path";

const NB = " ";
const dir = "src/content/poradna";
const fix = (line) =>
  line
    .replace(/(^|[\s(„"*])([ksvzouaiKSVZOUAI]) (?=\S)/g, `$1$2${NB}`)
    .replace(/(^|[\s(„"*])([ksvzouaiKSVZOUAI]) (?=\S)/g, `$1$2${NB}`)
    .replace(/(\d) (km|min|m|kW|A|V|Mpx|px\/m|%|Kč|let|dní)(?=[\s.,;:)|]|$)/g, `$1${NB}$2`);

for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
  const p = path.join(dir, f);
  const src = fs.readFileSync(p, "utf8");
  const end = src.indexOf("\n---", 3);
  const head = src.slice(0, end + 4);
  const body = src
    .slice(end + 4)
    .split("\n")
    .map((l) => (l.startsWith("|") && /^\|[\s:-]+\|/.test(l) ? l : fix(l)))
    .join("\n");
  fs.writeFileSync(p, head + body);
  console.log("ok", f);
}
