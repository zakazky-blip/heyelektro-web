// Jediný zdroj NAP údajů (název, adresa, telefon). Stejné hodnoty musí být v Google Business Profile a na Firmy.cz.

export const site = {
  url: "https://www.heyelektro.cz",
  brand: "Hey! Elektro",
  legalName: "HEY elektro s.r.o.",
  ico: "30177481",
  // Firma k 24. 10. 2026 není v ARES vedena jako plátce DPH. Po registraci doplňte DIČ.
  dic: null as string | null,
  register: "Krajský soud v Ostravě, oddíl C, vložka 105637",
  founded: "2026-10-21",
  phone: {
    display: "602 270 211",
    intl: "+420 602 270 211",
    href: "tel:+420602270211",
    e164: "+420602270211",
  },
  email: "info@heyelektro.cz",
  address: {
    street: "Křížkovského 865/4",
    city: "Zábřeh",
    zip: "789 01",
    region: "Olomoucký kraj",
    country: "CZ",
  },
  geo: { lat: 49.8826, lng: 16.8722 },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=K%C5%99%C3%AD%C5%BEkovsk%C3%A9ho+865%2F4%2C+789+01+Z%C3%A1b%C5%99eh",
  // [DOPLNIT] Pracovní doba. Dokud je null, web ji nikde nezobrazuje a schema ji neuvádí.
  hours: null as null | { days: string; time: string; schema: string[] },
  // [DOPLNIT] Odkazy na profily, jakmile vzniknou (Google Business Profile, Firmy.cz, Facebook, Instagram).
  social: [] as { label: string; url: string }[],
  certifications: [
    "Certifikovaný montážní partner Jablotron",
    "Certifikace kamerových systémů Dahua",
    "Certifikace kamerových systémů Hikvision",
  ],
};

export type Site = typeof site;
