// JSON-LD (schema.org). Popisuje jen to, co je na stránce vidět, a používá stále stejné @id.
import { site } from "../data/site";
import { services, type Faq, type Service } from "../data/services";
import { locations, type Location } from "../data/locations";

const ORG_ID = `${site.url}/#firma`;
const SITE_ID = `${site.url}/#web`;

const areaServed = [
  { "@type": "AdministrativeArea", name: "Olomoucký kraj" },
  { "@type": "AdministrativeArea", name: "Pardubický kraj" },
  { "@type": "AdministrativeArea", name: "Královéhradecký kraj" },
  { "@type": "AdministrativeArea", name: "Moravskoslezský kraj" },
  ...locations.filter((l) => l.kind === "city").map((l) => ({ "@type": "City", name: l.name })),
];

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Electrician",
    "@id": ORG_ID,
    name: site.brand,
    legalName: site.legalName,
    url: site.url + "/",
    logo: `${site.url}/brand/logo-stacked-light.png`,
    image: `${site.url}/og/og-default.jpg`,
    description:
      "Kamerové systémy Dahua a Hikvision, zabezpečení Jablotron, rozvaděče, elektroinstalace, revize, wallboxy, datové sítě a videotelefony. Sídlo v Zábřehu, působnost v Olomouckém kraji, ve východních Čechách, v Opavě a Ostravě.",
    telephone: site.phone.e164,
    email: site.email,
    vatID: site.dic ?? undefined,
    taxID: site.ico,
    foundingDate: site.founded,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      postalCode: site.address.zip.replace(" ", ""),
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.mapsUrl,
    areaServed,
    knowsAbout: ["Kamerové systémy", "Jablotron", "Dahua", "Hikvision", "Elektrické rozvaděče", "Elektroinstalace", "Revize elektro", "Hromosvody", "Wallboxy", "Datové sítě"],
    hasCredential: site.certifications.map((c) => ({ "@type": "EducationalOccupationalCredential", name: c })),
    ...(site.hours ? { openingHours: site.hours.schema } : {}),
    ...(site.social.length ? { sameAs: site.social.map((s) => s.url) } : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Služby",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, url: `${site.url}/sluzby/${s.slug}` },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: site.url + "/",
    name: site.brand,
    inLanguage: "cs-CZ",
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: site.url + (it.path === "/" ? "/" : it.path),
    })),
  };
}

export function faqSchema(faq: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceSchema(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/sluzby/${s.slug}#sluzba`,
    name: s.h1,
    serviceType: s.name,
    description: s.description,
    url: `${site.url}/sluzby/${s.slug}`,
    provider: { "@id": ORG_ID },
    areaServed,
    ...(s.brands ? { brand: s.brands.map((b) => ({ "@type": "Brand", name: b })) } : {}),
  };
}

export function locationSchema(l: Location) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${site.url}/lokality/${l.slug}#stranka`,
    url: `${site.url}/lokality/${l.slug}`,
    name: l.h1,
    description: l.description,
    inLanguage: "cs-CZ",
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
    spatialCoverage: {
      "@type": l.kind === "city" ? "City" : "AdministrativeArea",
      name: l.name,
      ...(l.kind === "city" ? { geo: { "@type": "GeoCoordinates", latitude: l.lat, longitude: l.lng } } : {}),
    },
  };
}

export function articleSchema(a: { title: string; description: string; slug: string; date: Date; updated?: Date; image: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    url: `${site.url}/poradna/${a.slug}`,
    datePublished: a.date.toISOString(),
    dateModified: (a.updated ?? a.date).toISOString(),
    image: a.image,
    inLanguage: "cs-CZ",
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: `${site.url}/poradna/${a.slug}`,
  };
}
