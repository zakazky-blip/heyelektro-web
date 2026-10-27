# Web na GitHub Pages (zdarma) – návod krok za krokem

Výsledek: web poběží na adrese `https://VASE-JMENO.github.io/heyelektro-web/`.
Každá změna nahraná na GitHub se do 2–3 minut sama promítne na web.

## 1. Účet na GitHubu (jednou)
1. Otevřete https://github.com/signup a založte účet (stačí e-mail a heslo). Pokud účet máte, přihlaste se.
2. Jméno účtu bude v adrese webu (např. `heyelektro` → `https://heyelektro.github.io/heyelektro-web/`).

## 2. Prázdný repozitář (jednou)
1. Vpravo nahoře klikněte na **+** → **New repository**.
2. **Repository name:** `heyelektro-web`
3. Vyberte **Public** (GitHub Pages zdarma funguje jen u veřejných repozitářů; zdrojový kód webu tak bude veřejně vidět, žádná hesla ani klíče v něm nejsou).
4. Nezaškrtávejte README, .gitignore ani licenci.
5. Klikněte **Create repository** a zkopírujte adresu, která se ukáže, např. `https://github.com/heyelektro/heyelektro-web.git`.

## 3. Nahrání projektu
Pošlete adresu repozitáře Claudovi, on projekt nahraje. Při prvním nahrání se otevře okno **Přihlášení ke GitHubu** – přihlaste se (Sign in with your browser) a potvrďte.

Kdybyste to dělali sami, v terminálu ve složce projektu:

```bash
git remote add origin https://github.com/VASE-JMENO/heyelektro-web.git
git push -u origin main
```

## 4. Zapnutí GitHub Pages (jednou)
1. V repozitáři otevřete **Settings** → vlevo **Pages**.
2. U **Build and deployment → Source** vyberte **GitHub Actions**.
3. Otevřete záložku **Actions**: běží úloha „Nasazení na GitHub Pages“. Když se objeví zelená fajfka (2–3 minuty), web je na adrese `https://VASE-JMENO.github.io/heyelektro-web/`.
4. Pokud první úloha skončila červeně dřív, než jste zapnuli Pages, klikněte v Actions na úlohu a **Re-run all jobs**.

## 5. Formulář, aby chodily poptávky e-mailem (doporučeno)
Bez tohoto kroku formulář otevře návštěvníkovi e-mail s vyplněnou poptávkou (funguje, ale je to krok navíc).
1. Na https://web3forms.com zadejte e-mail, kam mají poptávky chodit (např. info@heyelektro.cz), a nechte si poslat **Access Key**.
2. V repozitáři: **Settings → Secrets and variables → Actions → záložka Variables → New repository variable**
   - Name: `PUBLIC_WEB3FORMS_KEY`
   - Value: váš Access Key
3. V **Actions** spusťte znovu poslední úlohu (**Re-run all jobs**). Od té chvíle chodí poptávky e-mailem.

## 6. Google ho zatím neuvidí (záměrně)
Adresa `github.io` je náhled: web má nastavené, aby ho Google neindexoval. Až web poběží na vlastní doméně, Google indexovat bude.
- **Vlastní doména na GitHub Pages:** Settings → Pages → **Custom domain** `www.heyelektro.cz`, u registrátora domény nastavit DNS podle návodu GitHubu. Pak v Variables přidejte `PUBLIC_NOINDEX` = `0` a spusťte úlohu znovu.
- **Nebo Vercel** (formulář přes vlastní API a Resend): viz `docs/spusteni.md`.

## Jak dělat změny
Upravte soubory (texty jsou v `src/data/` a `src/content/poradna/`) a nahrajte je:

```bash
git add -A
git commit -m "Popis změny"
git push
```

Web se za pár minut aktualizuje sám.
