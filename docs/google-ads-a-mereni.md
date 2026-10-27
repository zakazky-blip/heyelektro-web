# Google Ads, Sklik a měření

Web je připravený tak, aby šlo měření a reklamy zapnout bez zásahu do kódu: stačí nastavit `PUBLIC_GTM_ID` a vše ostatní řídit v Google Tag Manageru.

## Jak je měření postavené

1. **Consent Mode v2** (`src/layouts/Base.astro`): před načtením čehokoli je výchozí stav `denied` pro `ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage`. Zapnuté `ads_data_redaction` a `url_passthrough`.
2. **Cookie lišta** (`src/components/CookieConsent.astro`): „Přijmout vše“ a „Odmítnout vše“ jsou stejně výrazné, „Nastavení“ po kategoriích, změna souhlasu kdykoli z patičky. Volba se uloží do `localStorage` (`hey-consent`) a pošle `gtag('consent','update',…)` + událost `consent_update`.
3. **GTM** se načte jen když je nastavené `PUBLIC_GTM_ID`. Tagy v GTM musí mít nastavené požadavky na souhlas (Google tagy to řeší samy přes Consent Mode, Sklik a Meta je potřeba podmínit triggerem na `consent_update` / proměnnou souhlasu).

## Události v dataLayer

| Událost | Kdy | Parametry | Doporučené použití |
| --- | --- | --- | --- |
| `form_submitted` | **až po potvrzení serverem**, že poptávka odešla | `form_id`, `lead_id`, `services`, `object_type`, `location`, `user_data.email`, `user_data.phone_number` | **Primární konverze** Google Ads + Sklik + GA4 `generate_lead` |
| `phone_click` | klik na `tel:` odkaz (dedup 2 s) | `phone_number`, `link_text`, `page_path` | Primární konverze „Hovor z webu“ (počítat 1 na prokliknutí) |
| `email_click` | klik na `mailto:` | `page_path` | Sekundární |
| `cta_click` | klik na tlačítko poptávky | `cta_location`, `cta_text` | Jen GA4 (mikrokonverze), **ne** jako konverze Ads |
| `form_start` | první psaní do formuláře | `form_id` | GA4 funnel |
| `dojezd_select` | výběr města v dojezdové mapě | `town` | GA4 (zájem podle lokalit) |
| `consent_update` | změna souhlasu | `consent_analytics`, `consent_marketing` | trigger pro tagy třetích stran |

Detektor kliků na telefon je převzatý beze změn ze skillu conversion-tracking (`src/scripts/tracking/phone-click.js`).

## Nastavení v GTM (krok za krokem)

1. Vytvořte kontejner GTM (Web) a ID vložte do Vercel jako `PUBLIC_GTM_ID`.
2. **Google tag** (GA4, ID `G-…`) – trigger Initialization – All Pages.
3. **Conversion Linker** – All Pages.
4. **GA4 událost `generate_lead`** – trigger Custom Event `form_submitted`.
5. **Google Ads konverze „Poptávka z webu“** – trigger Custom Event `form_submitted`. Zapněte **Enhanced Conversions** s proměnnou User-Provided Data → Data Layer `user_data` (e-mail, telefon). Hodnota např. 1 a počítání „Jedna“.
6. **Google Ads konverze „Klik na telefon“** – trigger Custom Event `phone_click`. Volitelně místo toho **volání z webu** přes Google forwarding numbers (Ads → Konverze → Telefonní hovory → Hovory na číslo na webu), které měří i délku hovoru.
7. **Sklik konverze** (šablona „Sklik – konverzní kód“ v Galerii šablon) – trigger `form_submitted`, a **Sklik retargeting** – All Pages, obojí s předáním souhlasu (`consent` = 1 jen při marketingovém souhlasu).
8. **Meta Pixel** (pokud budete dělat FB/IG reklamy) – Lead na `form_submitted`, podmíněno marketingovým souhlasem.
9. V Preview režimu ověřte, že při „Odmítnout vše“ nejdou žádné cookies `_ga`, `_gcl_*`, `_fbp`.

## Ověření konverze (po nasazení)

1. Otevřete web v anonymním okně, přijměte cookies.
2. Odešlete testovací poptávku se jménem „TEST Hey“ a e-mailem, který poznáte.
3. GTM Preview: událost `form_submitted` musí přijít **jednou**, Google Ads tag musí vystřelit.
4. GA4 → DebugView: `generate_lead` do minuty.
5. Google Ads → Konverze: status se změní z „Neověřeno“ do 24–48 h.
6. Testovací poptávku pak smažte z e-mailu/CRM.

## Offline konverze (doporučené)

Do e-mailu s poptávkou se přikládají `gclid`, `gbraid`, `wbraid`, `fbclid` a UTM parametry (pokud návštěvník přišel z reklamy a souhlasil s marketingem). Když z poptávky vznikne zakázka, lze ji nahrát zpět do Google Ads jako offline konverzi s hodnotou zakázky. Bidding se pak učí na skutečných zakázkách, ne jen na vyplněných formulářích.

## Návrh struktury kampaní Google Ads (Search)

| Kampaň | Sestavy | Cílová stránka |
| --- | --- | --- |
| Kamery – Olomoucký kraj | kamerový systém, montáž kamer, kamery RD, kamery firma | /sluzby/kamerove-systemy |
| Alarmy Jablotron – Olomoucký kraj | alarm Jablotron, zabezpečení domu, bezdrátový alarm | /sluzby/zabezpeceni-jablotron |
| Rozvaděče – Olomoucký kraj | výměna rozvaděče, rozvaděč FVE, jističe místo pojistek | /sluzby/rozvadece |
| Kamery + alarmy – Východní Čechy | stejné sestavy, cílení Pardubický a Královéhradecký kraj | služby nebo /lokality/vychodni-cechy |
| Kamery – Opava, Ostrava | kamerový systém firma, kamery sklad | /lokality/ostrava, /lokality/opava |
| Brand | Hey Elektro, heyelektro | / |

- **Geocílení**: „Přítomnost“ (lidé, kteří se v oblasti nacházejí nebo ji pravidelně navštěvují), ne „zájem“.
- **Vylučující slova**: práce, brigáda, kurz, návod, levně koupit, bazar, Alza, Datart, Mall, aliexpress, recenze kamery (spotřebitelský nákup bez montáže), PDF, schéma zapojení.
- **Rozšíření**: volání (602 270 211), lokalita (propojit GBP), odkazy na podstránky (Kamery, Jablotron, Rozvaděče, Kontakt), popisky („Certifikovaný partner Jablotron“, „Dahua a Hikvision“, „Montáž bez sekání“).
- **Texty reklam** (příklady, max. 30 znaků titulek): „Kamerové systémy Dahua“, „Montáž kamer na klíč“, „Certifikovaný partner Jablotron“, „Alarm bez sekání do zdí“, „Výměna rozvaděče za 1 den“ (jen pokud firma potvrdí), „Zavolejte 602 270 211“.
- **Rozpočet**: začít úzce (priorita kamery + alarmy v Olomouckém kraji), po 2–4 týdnech přidat regiony podle ceny za konverzi.

## Sklik

Stejné rozdělení jako Google Ads. Sklik má v regionech mimo velká města stále slušný podíl. Konverzní kód a retargeting přes GTM (viz výše), vždy s předáním souhlasu.
