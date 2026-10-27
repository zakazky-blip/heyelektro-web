# Web Hey! Elektro (HEY elektro s.r.o.)

Firemní web pro elektro firmu ze Zábřehu: kamerové systémy Dahua/Hikvision, zabezpečení Jablotron, rozvaděče a další elektro služby. Priorita: lokální SEO (Olomoucký kraj, východní Čechy, Opava, Ostrava), mobil, připravenost na Google Ads.

## Stack
- Astro 7, dva cíle nasazení (`DEPLOY_TARGET`):
  - `github` – GitHub Pages, čistě statické, formulář přes Web3Forms nebo mailto, workflow `.github/workflows/deploy.yml`
  - `vercel` (výchozí) – `@astrojs/vercel`, `/api/poptavka` (`src/server/poptavka.ts`) jako funkce
- Podadresa webu: `BASE_PATH`; interní odkazy vždy přes `link()` z `src/lib/url.ts`
- Tailwind CSS v4 (`@tailwindcss/vite`) + vlastní CSS v komponentách
- Písmo Poppins (self-hosted přes `@fontsource/poppins`)
- Formulář: `src/pages/api/poptavka.ts` → Resend
- Měření: GTM + Consent Mode v2 (`src/layouts/Base.astro`, `src/scripts/site.ts`)

## Příkazy
- `npm run dev` – vývoj na http://localhost:4321
- `npm run build` – build pro Vercel (výstup `.vercel/output`)
- Build pro GitHub Pages lokálně (Git Bash): `MSYS_NO_PATHCONV=1 DEPLOY_TARGET=github BASE_PATH=/heyelektro-web npx astro build` → `dist/`
- `npm run logo` – přegeneruje SVG loga z `scripts/logo-paths.json`
- `npm run icons` – favicon, ikony, PNG loga
- `npm run og` – sdílecí obrázky (OG) pro úvod, služby a lokality (po změně názvů služeb nebo lokalit)
- `node scripts/nbsp-markdown.mjs` – nezlomitelné mezery v článcích po úpravě

## Kde je obsah
- Firma, NAP, certifikace: `src/data/site.ts` (jediný zdroj, musí sedět s Google Business Profile)
- Služby: `src/data/services.ts`, lokality a vzdálenosti: `src/data/locations.ts`
- Fotky a autoři: `src/data/images.ts` (ilustrační z Unsplash, nahradit vlastními)
- Články: `src/content/poradna/*.md`
- Dokumentace: `docs/`

## Pravidla
- Česká typografie: texty procházejí `cz()` z `src/lib/typo.ts`
- Nevymýšlet čísla, reference, recenze ani ceny. Chybějící fakta: `[DOPLNIT]` v `docs/doplnit.md`
- Nadpisy max. 2 řádky na všech šířkách, žádné gradienty/stíny v klidu/eyebrow štítky (design-taste-frontend)
- Barvy jen z identity: Hey žlutá #FECA14, Noční tmavá #10161D, Bílá
