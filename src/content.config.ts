import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const poradna = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/poradna" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    perex: z.string(), // odpověď hned na začátku (40–60 slov), citovatelná sama o sobě
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    image: z.string(), // klíč v src/data/images.ts
    service: z.string(), // související služba (slug)
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

export const collections = { poradna };
