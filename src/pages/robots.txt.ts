// robots.txt podle nasazení. Náhled s PUBLIC_NOINDEX=1 (GitHub Pages bez vlastní domény) je pro vyhledávače zavřený.
import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const sitemap = new URL(`${base}/sitemap-index.xml`, site).href;
  const body =
    import.meta.env.PUBLIC_NOINDEX === "1"
      ? `# Náhled webu – neindexovat. Ostrá verze poběží na vlastní doméně.\nUser-agent: *\nDisallow: /\n`
      : `# Hey! Elektro
# Vyhledávače i AI vyhledávání (ChatGPT, Perplexity, Claude, Gemini) mají přístup ke všemu kromě API.
# Pokud nechcete, aby se obsah používal k trénování AI modelů, odkomentujte blok níže.
# Vyhledávání a citace v AI odpovědích tím zůstanou zachované.

User-agent: *
Allow: /
Disallow: ${base}/api/
Disallow: ${base}/dekujeme

# User-agent: GPTBot
# Disallow: /
# User-agent: ClaudeBot
# Disallow: /
# User-agent: Google-Extended
# Disallow: /

Sitemap: ${sitemap}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
