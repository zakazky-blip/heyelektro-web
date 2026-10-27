// Klientský skript pro celý web: hlavička, menu, odhalování sekcí, cookies a měření.
import "./tracking/phone-click.js";

type Consent = { v: 1; analytics: boolean; marketing: boolean; ts: string };
declare global {
  interface Window { dataLayer: unknown[]; gtag?: (...args: unknown[]) => void }
}
window.dataLayer = window.dataLayer || [];
const push = (o: Record<string, unknown>) => window.dataLayer.push(o);

/* ——— Hlavička ——— */
const header = document.querySelector<HTMLElement>("[data-header]");
const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > (document.body.classList.contains("is-home") ? window.innerHeight * 0.6 : 8));
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* ——— Rozbalovací menu Služby ——— */
const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
const menu = document.querySelector<HTMLElement>("[data-menu]");
const setMenu = (open: boolean) => {
  if (!toggle || !menu) return;
  toggle.setAttribute("aria-expanded", String(open));
  menu.hidden = !open;
};
toggle?.addEventListener("click", (e) => {
  e.stopPropagation();
  setMenu(toggle.getAttribute("aria-expanded") !== "true");
});
document.addEventListener("click", (e) => {
  if (menu && !menu.hidden && !menu.contains(e.target as Node)) setMenu(false);
});

/* ——— Mobilní menu ——— */
const burger = document.querySelector<HTMLButtonElement>("[data-burger]");
const mnav = document.querySelector<HTMLElement>("[data-mobile-menu]");
const setMobile = (open: boolean) => {
  if (!burger || !mnav) return;
  burger.setAttribute("aria-expanded", String(open));
  mnav.hidden = !open;
  document.documentElement.style.overflow = open ? "hidden" : "";
  header?.classList.toggle("is-scrolled", open || window.scrollY > 8);
};
burger?.addEventListener("click", () => setMobile(burger.getAttribute("aria-expanded") !== "true"));
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (menu && !menu.hidden) { setMenu(false); toggle?.focus(); }
  if (mnav && !mnav.hidden) { setMobile(false); burger?.focus(); }
});

/* ——— Odhalování sekcí při scrollu (obsah je viditelný i bez JS) ——— */
const io = new IntersectionObserver(
  (entries) => {
    for (const en of entries) {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        io.unobserve(en.target);
      }
    }
  },
  { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
);
document.querySelectorAll(".rv").forEach((el) => io.observe(el));

/* ——— Mobilní lišta: schovat, když píšete do formuláře (klávesnice) ——— */
const bar = document.querySelector<HTMLElement>("[data-mobile-bar]");
document.addEventListener("focusin", (e) => {
  if ((e.target as HTMLElement).matches("input, textarea, select")) bar?.classList.add("is-hidden");
});
document.addEventListener("focusout", () => bar?.classList.remove("is-hidden"));

// U velkého telefonního čísla a v patičce je lišta zbytečná, schová se.
const hideZones = new Set<Element>();
const barIo = new IntersectionObserver((entries) => {
  for (const en of entries) en.isIntersecting ? hideZones.add(en.target) : hideZones.delete(en.target);
  bar?.classList.toggle("is-away", hideZones.size > 0);
}, { threshold: 0 });
document.querySelectorAll("[data-hide-mbar]").forEach((el) => barIo.observe(el));

/* ——— Souhlas s cookies → Google Consent Mode v2 ——— */
const KEY = "hey-consent";
const cc = document.querySelector<HTMLElement>("[data-consent]");
const prefs = document.querySelector<HTMLFormElement>("[data-consent-prefs]");
const saveBtn = cc?.querySelector<HTMLButtonElement>("[data-consent-save]");
const moreBtn = cc?.querySelector<HTMLButtonElement>("[data-consent-more]");

const readConsent = (): Consent | null => {
  try {
    const c = JSON.parse(localStorage.getItem(KEY) || "null");
    return c && c.v === 1 ? c : null;
  } catch {
    return null;
  }
};

const applyConsent = (analytics: boolean, marketing: boolean) => {
  const c: Consent = { v: 1, analytics, marketing, ts: new Date().toISOString() };
  try { localStorage.setItem(KEY, JSON.stringify(c)); } catch {}
  window.gtag?.("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: marketing ? "granted" : "denied",
    ad_user_data: marketing ? "granted" : "denied",
    ad_personalization: marketing ? "granted" : "denied",
  });
  push({ event: "consent_update", consent_analytics: analytics, consent_marketing: marketing });
  if (marketing) storeClickIds();
  if (cc) cc.hidden = true;
  bar?.classList.remove("is-hidden");
};

const openConsent = (showPrefs = false) => {
  if (!cc) return;
  const c = readConsent();
  if (prefs) {
    (prefs.elements.namedItem("analytics") as HTMLInputElement).checked = !!c?.analytics;
    (prefs.elements.namedItem("marketing") as HTMLInputElement).checked = !!c?.marketing;
    prefs.hidden = !showPrefs;
  }
  if (saveBtn) saveBtn.hidden = !showPrefs;
  if (moreBtn) moreBtn.hidden = showPrefs;
  cc.hidden = false;
  bar?.classList.add("is-hidden");
};

cc?.querySelector("[data-consent-accept]")?.addEventListener("click", () => applyConsent(true, true));
cc?.querySelector("[data-consent-reject]")?.addEventListener("click", () => applyConsent(false, false));
moreBtn?.addEventListener("click", () => openConsent(true));
saveBtn?.addEventListener("click", () => {
  if (!prefs) return;
  applyConsent(
    (prefs.elements.namedItem("analytics") as HTMLInputElement).checked,
    (prefs.elements.namedItem("marketing") as HTMLInputElement).checked,
  );
});
document.querySelectorAll("[data-consent-open]").forEach((b) => b.addEventListener("click", () => openConsent(true)));
if (!readConsent()) openConsent(false);

/* ——— Kliknutí na e-mail a CTA (telefon řeší phone-click.js → phone_click) ——— */
document.addEventListener("click", (e) => {
  const a = (e.target as HTMLElement).closest<HTMLElement>("[data-track]");
  if (!a) return;
  const kind = a.dataset.track;
  if (kind === "email") push({ event: "email_click", page_path: location.pathname });
  if (kind === "cta") push({ event: "cta_click", cta_location: a.dataset.cta || "", cta_text: (a.textContent || "").trim().slice(0, 60), page_path: location.pathname });
});

/* ——— ID prokliků z reklam (gclid, gbraid, wbraid, fbclid, UTM) pro formulář ———
   Ukládají se do sessionStorage jen se souhlasem s marketingem; bez něj se použijí jen z aktuální URL. */
const CLICK_KEYS = ["gclid", "gbraid", "wbraid", "fbclid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
function storeClickIds() {
  const p = new URLSearchParams(location.search);
  const found = CLICK_KEYS.filter((k) => p.get(k));
  if (!found.length) return;
  try {
    const prev = JSON.parse(sessionStorage.getItem("hey-click") || "{}");
    for (const k of found) prev[k] = p.get(k);
    sessionStorage.setItem("hey-click", JSON.stringify(prev));
  } catch {}
}
if (readConsent()?.marketing) storeClickIds();

export function clickIds(): Record<string, string> {
  const out: Record<string, string> = {};
  try { Object.assign(out, JSON.parse(sessionStorage.getItem("hey-click") || "{}")); } catch {}
  const p = new URLSearchParams(location.search);
  for (const k of CLICK_KEYS) { const v = p.get(k); if (v) out[k] = v; }
  return out;
}
(window as unknown as { heyClickIds: typeof clickIds }).heyClickIds = clickIds;
