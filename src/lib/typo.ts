// Česká typografie: nezlomitelná mezera za jednopísmennými předložkami a spojkami,
// mezi číslem a jednotkou a uvnitř telefonních čísel. Používá se na veškerý text při renderu.
const NBSP = " ";

export function cz(text: string): string {
  if (!text) return text;
  return (
    text
      // k, s, v, z, o, u, a, i (a velká písmena) na začátku slova, za nimi mezera
      .replace(/(^|[\s(„"])([ksvzouaiKSVZOUAI]) /g, `$1$2${NBSP}`)
      // opakovaně (např. „a v domě“)
      .replace(/(^|[\s(„"])([ksvzouaiKSVZOUAI]) /g, `$1$2${NBSP}`)
      // číslo + jednotka nebo zkratka
      .replace(/(\d) (km|min|h|m|m²|kW|kWh|A|V|mm|cm|%|Kč|let|roky|dní|hod\.|ks|MPx|Mpx|TB|GB)(?=[\s.,;:)!?]|$)/g, `$1${NBSP}$2`)
      // trojice číslic v telefonu
      .replace(/(\d{3}) (\d{3}) (\d{3})/g, `$1${NBSP}$2${NBSP}$3`)
      .replace(/\+420 /g, `+420${NBSP}`)
      // číslo a měsíc v datu „21. 10. 2026“
      .replace(/(\d{1,2})\. (\d{1,2})\. (\d{4})/g, `$1.${NBSP}$2.${NBSP}$3`)
  );
}
