# Co je potřeba doplnit nebo potvrdit

Web nic z níže uvedeného nevymýšlí. Položky jsou buď schované (dokud nejsou data), nebo formulované obecně.

## Firma
- [ ] **Pracovní doba** → `src/data/site.ts` (`hours`). Pak se zobrazí v kontaktu a ve schema.org.
- [ ] **DIČ** po registraci k DPH → `src/data/site.ts` (`dic`).
- [ ] **E-mail info@heyelektro.cz** musí existovat a být čtený (chodí na něj poptávky).
- [ ] **Profily** Google Business Profile, Firmy.cz, Facebook/Instagram → `site.social`.
- [ ] Potvrdit, že certifikace Jablotron, Dahua a Hikvision lze uvádět **za HEY elektro s.r.o.** (případně kdo z týmu je jejich držitelem).
- [ ] Jméno a osvědčení **revizního technika** (doporučeno uvést na stránce Revize).

## Obsah
- [ ] **Vlastní fotky** z realizací, týmu a auta – nahradí ilustrační fotky z Unsplash (`src/data/images.ts`, `src/assets/foto`).
- [ ] **Krátké video** ze zakázky (10–20 s, bez zvuku, na šířku) – smyčka do sekce „Proč Hey! Elektro“ na úvodní stránce. Volně licencované video elektrikáře v potřebné kvalitě jsme nenašli.
- [ ] Potvrdit **vodorovnou verzi loga** v hlavičce (značka vlevo, ELEKTRO vpravo). Pokud ji brand manuál nemá, nahradíme ji samotnou značkou; patička, O nás a sdílecí obrázky už používají oficiální verzi s ELEKTRO na střed.
- [ ] **Tým**: jména a fotky lidí na stránku O nás (E-E-A-T i důvěra).
- [ ] **Reference / realizace** se souhlasem zákazníků → nová stránka Realizace.
- [ ] **Google recenze** – sbírat od prvních zakázek.
- [ ] Potvrdit formulace: „výměna domovního rozvaděče je zpravidla práce na jeden den“, „montáž plánujeme tak, abychom ji zvládli v co nejméně výjezdech“, „systémy, které jsme montovali, umíme rozšířit“.
- [ ] Potvrdit výklad loga na stránce O nás („H ze dvou blesků: silnoproud a slaboproud“) – je to návrh textu.
- [ ] Reakční doba na poptávku (např. „ozveme se do 24 hodin“) – pokud ji firma chce slíbit, výrazně zvedne konverze.
- [ ] Ceny „od“ u typických sestav – pokud je chcete zveřejnit.
- [ ] Ověřit odborná tvrzení v článcích (lhůty revizí podle ČSN 33 1500, údaje DORI z EN 62676-4) revizním technikem.

## Právní
- [ ] Nechat zkontrolovat **Zásady ochrany osobních údajů** a **Zásady cookies** (vzor podle čl. 13 GDPR) – hlavně zpracovatele a doby uložení.
- [ ] Po nasazení GTM ověřit seznam cookies na `/cookies` podle toho, co skutečně běží.

## Technické
- [ ] Doména heyelektro.cz + www, přesměrování na `https://www.heyelektro.cz`.
- [ ] Resend: ověřit doménu (SPF/DKIM) a nastavit `RESEND_API_KEY`, `FORM_FROM`.
- [ ] `PUBLIC_GTM_ID` a nastavení tagů podle `docs/google-ads-a-mereni.md`.
