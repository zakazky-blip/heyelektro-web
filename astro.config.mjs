// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Kam se web nasazuje:
//   DEPLOY_TARGET=vercel (výchozí) – vlastní doména, formulář přes /api/poptavka a Resend
//   DEPLOY_TARGET=github – GitHub Pages, čistě statický web, formulář přes Web3Forms nebo e-mail
const TARGET = process.env.DEPLOY_TARGET || "vercel";
const SITE = process.env.SITE_URL || "https://www.heyelektro.cz";
const BASE = process.env.BASE_PATH || "/";
const isVercel = TARGET === "vercel";

// API pro formulář existuje jen na Vercelu; GitHub Pages umí jen statické soubory.
/** @type {import("astro").AstroIntegration} */
const formApi = {
  name: "hey-form-api",
  hooks: {
    "astro:config:setup": ({ injectRoute }) => {
      if (isVercel) injectRoute({ pattern: "/api/poptavka", entrypoint: "./src/server/poptavka.ts", prerender: false });
    },
  },
};

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: isVercel ? "never" : "ignore",
  build: { format: isVercel ? "file" : "directory" },
  compressHTML: true,
  adapter: isVercel
    ? vercel({
        imageService: false,
        webAnalytics: { enabled: false },
      })
    : undefined,
  integrations: [
    formApi,
    sitemap({
      filter: (page) => !/\/(dekujeme|404)\/?$/.test(page),
      changefreq: "monthly",
      serialize(item) {
        const url = item.url.replace(/\/$/, "");
        if (url === SITE.replace(/\/$/, "") + BASE.replace(/\/$/, "")) item.priority = 1.0;
        else if (/\/sluzby\//.test(url)) item.priority = 0.9;
        else if (/\/lokality\//.test(url)) item.priority = 0.8;
        else item.priority = 0.6;
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
  image: {
    responsiveStyles: true,
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  vite: {
    plugins: [tailwindcss()],
    define: {
      "import.meta.env.PUBLIC_DEPLOY_TARGET": JSON.stringify(TARGET),
    },
  },
});
