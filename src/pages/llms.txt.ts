// /llms.txt: stručný přehled firmy a klíčových stránek pro AI asistenty (volitelný formát, llmstxt.org).
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { site } from "../data/site";
import { services } from "../data/services";
import { locations } from "../data/locations";

export const GET: APIRoute = async () => {
  const posts = await getCollection("poradna");
  const u = (p: string) => `${site.url}${p}`;
  const body = `# ${site.brand} (${site.legalName})

> Kamerové systémy Dahua a Hikvision, zabezpečení Jablotron a elektrické rozvaděče. Dále elektroinstalace, revize a hromosvody, wallboxy, datové sítě a videotelefony. Sídlo v Zábřehu (Olomoucký kraj), působnost hlavně Olomoucký kraj, východní Čechy (Pardubický a Královéhradecký kraj), Opava a Ostrava; větší zakázky po celé ČR.

- Sídlo: ${site.address.street}, ${site.address.zip} ${site.address.city}
- Telefon: ${site.phone.intl}
- E-mail: ${site.email}
- IČO: ${site.ico}
- Certifikace: ${site.certifications.join("; ")}
- Firma založena: 21. 10. 2026

## Služby
${services.map((s) => `- [${s.name}](${u(`/sluzby/${s.slug}`)}): ${s.short}`).join("\n")}

## Lokality
${locations.map((l) => `- [${l.name}](${u(`/lokality/${l.slug}`)})${l.km ? `: ${l.km} km ze Zábřehu` : ""}`).join("\n")}

## Poradna
${posts.map((p) => `- [${p.data.title}](${u(`/poradna/${p.id}`)}): ${p.data.description}`).join("\n")}

## Kontakt
- [Kontakt a poptávka](${u("/kontakt")})
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
