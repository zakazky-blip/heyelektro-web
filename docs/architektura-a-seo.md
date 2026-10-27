# Architektura webu a SEO

## Mapa webu

```
Úvod (/)
├── Služby (/sluzby)
│   ├── Kamerové systémy (/sluzby/kamerove-systemy)            ★ priorita
│   ├── Zabezpečení Jablotron (/sluzby/zabezpeceni-jablotron)  ★ priorita
│   ├── Rozvaděče (/sluzby/rozvadece)                          ★ priorita
│   ├── Elektroinstalace (/sluzby/elektroinstalace)
│   ├── Revize a hromosvody (/sluzby/revize-a-hromosvody)
│   ├── Wallboxy (/sluzby/wallboxy)
│   ├── Datové sítě a Wi-Fi (/sluzby/datove-site-a-wifi)
│   └── Videotelefony a přístupové systémy (/sluzby/videotelefony-a-pristupove-systemy)
├── Kde působíme (/lokality)
│   ├── Olomoucký kraj (/lokality/olomoucky-kraj)
│   │   ├── Zábřeh, Šumperk, Olomouc, Prostějov, Přerov, Jeseník
│   ├── Východní Čechy (/lokality/vychodni-cechy)
│   │   ├── Svitavy, Ústí nad Orlicí, Pardubice, Hradec Králové
│   ├── Opava (/lokality/opava)
│   └── Ostrava (/lokality/ostrava)
├── O nás (/o-nas)
├── Poradna (/poradna)
│   ├── Kamerový systém pro rodinný dům
│   ├── Bezdrátový alarm Jablotron
│   ├── Kdy vyměnit starý rozvaděč
│   └── Kamera u domu a GDPR
├── Kontakt (/kontakt)  ← cíl všech CTA (#poptavka)
├── Děkujeme (/dekujeme)  noindex
├── Ochrana osobních údajů, Zásady cookies
└── 404
```

36 indexovaných URL v `sitemap-index.xml`. URL bez diakritiky a bez koncového lomítka, kanonická doména `https://www.heyelektro.cz`.

## Klíčová slova podle stránek

Bez přístupu k datům Sklik/Google Keyword Planner jde o odborný odhad záměru hledání. Po spuštění ověřte v Search Console a plánovači klíčových slov.

| Stránka | Hlavní dotazy | Doplňkové |
| --- | --- | --- |
| Kamerové systémy | kamerový systém, montáž kamer | kamerový systém pro rodinný dům, kamery Hikvision/Dahua montáž, IP kamery, kamery s nočním viděním |
| Zabezpečení Jablotron | alarm Jablotron, Jablotron montáž | zabezpečení domu, zabezpečovací systém, bezdrátový alarm, JABLOTRON 100+ |
| Rozvaděče | výměna rozvaděče, domovní rozvaděč | rozvaděč pro fotovoltaiku, výměna pojistek za jističe, proudový chránič |
| Elektroinstalace | elektrikář, elektroinstalace | rekonstrukce elektroinstalace, výměna hliníkových rozvodů |
| Revize a hromosvody | revize elektroinstalace, revize hromosvodu | revizní zpráva, montáž hromosvodu |
| Wallboxy | montáž wallboxu | nabíječka elektromobilu domů, wallbox fotovoltaika |
| Datové sítě a Wi-Fi | datové rozvody, strukturovaná kabeláž | wifi pro rodinný dům, datový rozvaděč |
| Videotelefony | videotelefon montáž | přístupový systém, elektrický zámek branka |
| Lokality | „elektrikář / kamery / alarm Jablotron + město“ | Zábřeh, Šumperk, Olomouc, Prostějov, Přerov, Jeseník, Svitavy, Ústí n. O., Pardubice, Hradec Králové, Opava, Ostrava |

## Lokální SEO (nejdůležitější kroky mimo web)

1. **Google Business Profile**: kategorie „Elektrikář“ + doplňkové „Prodejce zabezpečovacích systémů“, „Dodavatel kamerových systémů“. Oblast působnosti: kraje a města z webu. Shodné NAP s webem (`src/data/site.ts`).
2. **Firmy.cz (Seznam)**: založit profil, stejné NAP, kategorie elektro a zabezpečení. Seznam má v ČR stále významný podíl.
3. **Seznam Webmaster** a **Google Search Console**: přidat web, odeslat `https://www.heyelektro.cz/sitemap-index.xml`. **Bing Webmaster Tools** (živí Copilot a ChatGPT search).
4. **Recenze**: po každé zakázce poslat odkaz na Google recenzi. Recenze jsou nejsilnější lokální signál a web je zatím nemá (nevymýšlíme je).
5. **Citace**: Jablotron má vyhledávač montážních partnerů – požádat o uvedení s odkazem na web. Stejně u Dahua/Hikvision distributorů, pokud to umožňují.
6. **Fotky z realizací** do GBP i na web (nahradí ilustrační fotky).

## Technické SEO na webu

- Statické HTML, žádný JS nutný k zobrazení obsahu
- Unikátní `title` a `description` na každé stránce, kanonická URL, OG obrázek
- JSON-LD: `Electrician` (LocalBusiness) s `areaServed`, `hasCredential`, `hasOfferCatalog`; `Service` na stránkách služeb; `FAQPage`; `BreadcrumbList`; `Article` u článků; `WebSite`
- `sitemap-index.xml`, `robots.txt`, `llms.txt` (přehled pro AI asistenty)
- Drobečková navigace, interní prolinkování služba ↔ lokalita („Kamery Olomouc“ apod.)
- Lokální stránky mají unikátní obsah: vzdálenost a čas jízdy ze Zábřehu (OSRM), okolní obce, místní kontext, místní FAQ

## AI vyhledávání (ChatGPT, Perplexity, AI Overviews)

- Články v Poradně začínají odpovědí v 40–60 slovech, mají tabulky a zdroje (rozsudek SDEU C-212/13, norma EN 62676-4, ČSN 33 1500, ČSN 33 2000-4-41)
- `robots.txt` pouští vyhledávací i AI crawlery. Blok pro trénovací crawlery (GPTBot, ClaudeBot, Google-Extended) je připravený zakomentovaný – rozhodnutí na klientovi
- Doporučení: každý měsíc projít 10–20 dotazů typu „kamerový systém Olomouc“ v ChatGPT, Perplexity a Google a zapisovat, kdo je citován

## Další obsah (doporučení na 3–6 měsíců)

- Stránka **Realizace** (reference s fotkami, místem a popisem) – jakmile budou fotky a souhlas zákazníků
- Články: „Dahua, nebo Hikvision?“, „Kolik dní záznamu potřebuji“, „Alarm na chalupu bez internetu“, „Wallbox a hlavní jistič“, „Revize při prodeji domu“
- Ceník „od“ u typických sestav (např. 4 kamery na RD), pokud ho firma chce zveřejnit – výrazně pomáhá konverzím i AI odpovědím
