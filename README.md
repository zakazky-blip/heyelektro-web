# www.heyelektro.cz

Web firmy HEY elektro s.r.o. (Hey! Elektro), Zábřeh. Astro 7 + Tailwind 4. Nasazení: GitHub Pages (náhled zdarma, viz [docs/github-pages.md](docs/github-pages.md)) nebo Vercel (vlastní doména, viz [docs/spusteni.md](docs/spusteni.md)).

```bash
npm install
npm run dev
```

Otevřete http://localhost:4321. Bez `RESEND_API_KEY` se poptávky z formuláře v režimu vývoje jen vypíšou do konzole.

- Obsah a údaje firmy: `src/data/`
- Články: `src/content/poradna/`
- Dokumentace: [`docs/`](docs/) – SEO a mapa webu, Google Ads a měření, checklist spuštění, co doplnit
- Pokyny pro AI asistenta: `CLAUDE.md`
