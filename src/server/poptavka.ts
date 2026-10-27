// Příjem poptávky z formuláře (jen při nasazení na Vercel, viz astro.config.mjs). Odesílá e-mail přes Resend.
// Proměnné prostředí: RESEND_API_KEY, FORM_TO (výchozí info@heyelektro.cz), FORM_FROM (adresa z ověřené domény v Resend).
import type { APIRoute } from "astro";
import { z } from "zod";
import { Resend } from "resend";
import { services } from "../data/services";
import { link } from "../lib/url";

export const prerender = false;

const Lead = z.object({
  jmeno: z.string().trim().min(2).max(120),
  telefon: z.string().trim().min(9).max(30).refine((v) => v.replace(/[^\d]/g, "").length >= 9),
  email: z.union([z.literal(""), z.email().max(160)]).optional().default(""),
  obec: z.string().trim().max(80).optional().default(""),
  objekt: z.string().trim().max(40).optional().default(""),
  zprava: z.string().trim().max(3000).optional().default(""),
  sluzby: z.array(z.string().max(60)).max(12).default([]),
  stranka: z.string().max(200).optional().default(""),
});

const CLICK_KEYS = ["gclid", "gbraid", "wbraid", "fbclid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export const POST: APIRoute = async ({ request, redirect }) => {
  const wantsJson = (request.headers.get("accept") || "").includes("application/json");
  const reply = (status: number, body: Record<string, unknown>) =>
    wantsJson ? new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } }) : status === 200 ? redirect(link("/dekujeme"), 303) : redirect(link("/kontakt?chyba=1#poptavka"), 303);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return reply(400, { ok: false, error: "Formulář se nepodařilo přečíst." });
  }

  // Ochrana proti robotům: vyplněné skryté pole nebo odeslání rychleji než za 3 s.
  const started = Number(form.get("t") || 0);
  if (String(form.get("web") || "") !== "" || (started && Date.now() - started < 3000)) {
    return reply(200, { ok: true, id: "ok" });
  }

  const parsed = Lead.safeParse({
    jmeno: form.get("jmeno"),
    telefon: form.get("telefon"),
    email: form.get("email") ?? "",
    obec: form.get("obec") ?? "",
    objekt: form.get("objekt") ?? "",
    zprava: form.get("zprava") ?? "",
    sluzby: form.getAll("sluzby").map(String),
    stranka: form.get("stranka") ?? "",
  });
  if (!parsed.success) {
    return reply(422, { ok: false, error: "Zkontrolujte prosím jméno a telefon." });
  }
  const lead = parsed.data;
  const id = `HE-${Date.now().toString(36).toUpperCase()}`;
  const names = lead.sluzby.map((s) => services.find((x) => x.slug === s)?.name || (s === "jine" ? "Něco jiného" : s));
  const click = Object.fromEntries(CLICK_KEYS.map((k) => [k, String(form.get(k) || "").slice(0, 200)]).filter(([, v]) => v));

  const rows: [string, string][] = [
    ["Jméno", lead.jmeno],
    ["Telefon", lead.telefon],
    ["E-mail", lead.email || "–"],
    ["Obec", lead.obec || "–"],
    ["Objekt", lead.objekt || "–"],
    ["Služby", names.join(", ") || "–"],
    ["Zpráva", lead.zprava || "–"],
    ["Stránka", lead.stranka],
    ["ID poptávky", id],
    ...Object.entries(click).map(([k, v]) => [k, v] as [string, string]),
  ];
  const html = `<h2 style="font-family:Arial,sans-serif">Nová poptávka z webu</h2><table style="font-family:Arial,sans-serif;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;color:#555;vertical-align:top">${esc(k)}</td><td style="padding:6px 0;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join("")}</table>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  const key = import.meta.env.RESEND_API_KEY;
  if (!key) {
    if (import.meta.env.DEV) {
      console.info("[poptavka] RESEND_API_KEY chybí, poptávka jen vypsána:\n" + text);
      return reply(200, { ok: true, id });
    }
    console.error("[poptavka] RESEND_API_KEY není nastavený");
    return reply(500, { ok: false, error: "Formulář teď nejde odeslat." });
  }

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: import.meta.env.FORM_FROM || "Web Hey! Elektro <web@heyelektro.cz>",
      to: [import.meta.env.FORM_TO || "info@heyelektro.cz"],
      replyTo: lead.email || undefined,
      subject: `Poptávka: ${names.join(", ") || "obecná"}${lead.obec ? ` – ${lead.obec}` : ""} (${lead.jmeno})`.replace(/[\r\n]+/g, " "),
      html,
      text,
    });
    if (error) throw new Error(error.message);
  } catch (e) {
    console.error("[poptavka] odeslání selhalo", e);
    return reply(502, { ok: false, error: "Poptávku se nepodařilo odeslat." });
  }

  return reply(200, { ok: true, id });
};
