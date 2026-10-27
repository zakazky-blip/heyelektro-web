# Spuštění webu (checklist)

## 1. Vercel
1. Nahrajte projekt do Git repozitáře (GitHub) a importujte ho ve Vercelu (framework se rozpozná jako Astro).
2. Environment Variables: `RESEND_API_KEY`, `FORM_TO`, `FORM_FROM`, později `PUBLIC_GTM_ID` (viz `.env.example`). `PUBLIC_AUDIT_NO_BANNER` **nenastavovat**.
3. Domains: přidejte `www.heyelektro.cz` (primární) a `heyelektro.cz` s přesměrováním 308 na www.
4. Po nasazení otevřete `/sitemap-index.xml`, `/robots.txt`, `/llms.txt` a ověřte, že vrací obsah.

## 2. E-maily z formuláře
1. Účet na resend.com, ověření domény heyelektro.cz (DNS záznamy SPF, DKIM).
2. Testovací poptávka z webu → musí dorazit na info@heyelektro.cz s odpovědí („Odpovědět“ jde na e-mail zákazníka).

## 3. Vyhledávače
1. Google Search Console (doména) → odeslat `https://www.heyelektro.cz/sitemap-index.xml`.
2. Seznam Webmaster → přidat web a sitemapu.
3. Bing Webmaster Tools → import ze Search Console.
4. Google Business Profile + Firmy.cz se stejným NAP jako na webu.

## 4. Měření a reklamy
Podle `docs/google-ads-a-mereni.md`. Ověřit, že při odmítnutí cookies nejdou žádné marketingové cookies.

## 5. Kontrola po spuštění
- [ ] PageSpeed Insights (mobil) na úvod, službu a lokalitu
- [ ] Rich Results Test na úvod (Electrician, FAQ) a článek (Article)
- [ ] Odeslání formuláře na mobilu (iPhone i Android), klik na „Zavolat“
- [ ] Odkaz „Nastavení cookies“ v patičce otevře lištu
