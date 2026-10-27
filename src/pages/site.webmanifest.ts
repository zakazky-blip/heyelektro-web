// Web manifest s cestami podle podadresy webu.
import type { APIRoute } from "astro";
import { link } from "../lib/url";

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: "Hey! Elektro",
      short_name: "Hey! Elektro",
      description: "Kamery, alarmy Jablotron a rozvaděče. Zábřeh, Olomoucký kraj, východní Čechy, Opava a Ostrava.",
      lang: "cs",
      start_url: link("/"),
      display: "browser",
      background_color: "#10161D",
      theme_color: "#10161D",
      icons: [
        { src: link("/icon-192.png"), sizes: "192x192", type: "image/png" },
        { src: link("/icon-512.png"), sizes: "512x512", type: "image/png" },
        { src: link("/icon-maskable-512.png"), sizes: "512x512", type: "image/png", purpose: "maskable" },
      ],
    }),
    { headers: { "Content-Type": "application/manifest+json" } },
  );
