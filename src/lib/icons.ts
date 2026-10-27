// Názvy ikon z komponenty Icon.astro a ikona ke každé službě.
export type IconName =
  | "socket" | "panel" | "camera" | "shield" | "bolt" | "phone" | "arrow" | "meter"
  | "charger" | "wifi" | "intercom" | "check" | "pin" | "mail" | "clock" | "broom" | "doc" | "spark";

export const serviceIcon: Record<string, IconName> = {
  elektroinstalace: "socket",
  rozvadece: "panel",
  "revize-a-hromosvody": "meter",
  wallboxy: "charger",
  "kamerove-systemy": "camera",
  "zabezpeceni-jablotron": "shield",
  "videotelefony-a-pristupove-systemy": "intercom",
  "datove-site-a-wifi": "wifi",
};
