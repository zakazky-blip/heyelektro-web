// Připraví SVG soubor pro vložení přímo do HTML: dekorativní (aria-hidden), bez <title>
// a s unikátními id, aby se masky více log na jedné stránce nepletly.
export function inlineSvg(raw: string, prefix: string, className = ""): string {
  let out = raw
    .replace(/<title>.*?<\/title>/, "")
    .replace("<svg ", `<svg aria-hidden="true" focusable="false"${className ? ` class="${className}"` : ""} `);
  const ids = [...out.matchAll(/id="([^"]+)"/g)].map((m) => m[1]);
  for (const id of ids) {
    out = out.replaceAll(`id="${id}"`, `id="${prefix}-${id}"`).replaceAll(`url(#${id})`, `url(#${prefix}-${id})`);
  }
  return out;
}
