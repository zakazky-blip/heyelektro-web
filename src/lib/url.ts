// Interní odkazy respektují podadresu webu (BASE_PATH). Na vlastní doméně je BASE_URL „/“,
// na GitHub Pages např. „/heyelektro-web/“. Externí odkazy, kotvy (#…) a tel:/mailto: zůstávají beze změny.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export function link(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return BASE + path;
}

// Odstraní podadresu z cesty, aby šlo porovnávat aktuální stránku s odkazy v menu.
export function stripBase(pathname: string): string {
  if (BASE && pathname.startsWith(BASE)) return pathname.slice(BASE.length) || "/";
  return pathname;
}

// Doplní podadresu do odkazů v hotovém HTML (např. vykreslený Markdown článků).
export function linkHtml(html: string): string {
  return BASE ? html.replace(/(href|src)="\/(?!\/)/g, `$1="${BASE}/`) : html;
}
