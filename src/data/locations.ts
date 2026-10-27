// Lokality pro lokální SEO. Vzdálenosti a časy jízdy ze sídla v Zábřehu jsou spočítané přes OSRM
// (router.project-osrm.org, 26. 10. 2026) a zaokrouhlené nahoru, ať slibujeme spíš méně.
import type { Faq } from "./services";

export type Region = "Olomoucký kraj" | "Pardubický kraj" | "Královéhradecký kraj" | "Moravskoslezský kraj";

export type Location = {
  slug: string;
  name: string;
  locative: string; // „v Olomouci“
  kind: "city" | "region";
  region: Region | "Olomoucký kraj" | "východní Čechy";
  km: number;
  minutes: number;
  lat: number;
  lng: number;
  seoTitle: string;
  description: string;
  h1: string;
  lead: string;
  intro: string[];
  emphasis: { service: string; text: string }[];
  nearby: string[];
  faq: Faq[];
  neighbors: string[];
};

const GENITIVE: Record<string, string> = {
  Zábřeh: "Zábřehu",
  Šumperk: "Šumperka",
  Olomouc: "Olomouce",
  Prostějov: "Prostějova",
  Přerov: "Přerova",
  Jeseník: "Jeseníku",
  Svitavy: "Svitav",
  "Ústí nad Orlicí": "Ústí nad Orlicí",
  Pardubice: "Pardubic",
  "Hradec Králové": "Hradce Králové",
  Opava: "Opavy",
  Ostrava: "Ostravy",
};

const travel = (name: string, locative: string, km: number, minutes: number): Faq => ({
  q: `Jak daleko to máte do ${GENITIVE[name] ?? name}?`,
  a:
    km === 0
      ? "V Zábřehu máme sídlo, takže jsme u vás za pár minut. Termín obhlídky domluvíme po telefonu."
      : `Ze Zábřehu je to ${locative} zhruba ${km} km, autem asi ${fmtMinutes(minutes)}. Termín obhlídky domluvíme po telefonu a dopravu vždy uvedeme v nabídce předem.`,
});

export function fmtMinutes(min: number): string {
  if (min < 60) return `${min} minut`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (m === 0) return h === 1 ? "hodinu" : `${h} hodiny`;
  return `${h} h ${m} min`;
}

export const locations: Location[] = [
  // ——— Olomoucký kraj ———
  {
    slug: "olomoucky-kraj",
    name: "Olomoucký kraj",
    locative: "v Olomouckém kraji",
    kind: "region",
    region: "Olomoucký kraj",
    km: 0,
    minutes: 0,
    lat: 49.75,
    lng: 17.15,
    seoTitle: "Kamery, alarmy Jablotron a elektro v Olomouckém kraji | Hey! Elektro",
    description:
      "Kamerové systémy Dahua a Hikvision, zabezpečení Jablotron, rozvaděče a elektroinstalace v celém Olomouckém kraji. Sídlo v Zábřehu, Šumperk 15 km, Olomouc 49 km.",
    h1: "Kamery a alarmy v Olomouckém kraji",
    lead: "Sídlíme v Zábřehu, takže celý Olomoucký kraj máme po ruce: Šumperk a Mohelnici za čtvrt hodiny, Olomouc za necelou hodinu, Jeseník přes Červenohorské sedlo.",
    intro: [
      "Olomoucký kraj je náš domovský region. Ze Zábřehu vede silnice I/44 na sever do Šumperka a Jeseníku a na jih k dálnici D35, po které jsme rychle v Olomouci, Prostějově i Přerově.",
      "Montujeme kamerové systémy, alarmy Jablotron a rozvaděče pro rodinné domy, firmy i chaty v Jeseníkách. Děláme také elektroinstalace, revize, wallboxy, datové sítě a videotelefony.",
    ],
    emphasis: [
      { service: "kamerove-systemy", text: "Kamery Dahua a Hikvision pro domy, firmy a areály od Jeseníku po Přerov." },
      { service: "zabezpeceni-jablotron", text: "Bezdrátové alarmy Jablotron pro byty v Olomouci i chalupy v Jeseníkách." },
      { service: "rozvadece", text: "Výměny starých rozvaděčů v domech a bytech po celém kraji." },
    ],
    nearby: ["Zábřeh", "Šumperk", "Mohelnice", "Olomouc", "Prostějov", "Přerov", "Jeseník", "Litovel", "Uničov", "Šternberk", "Hranice", "Lipník nad Bečvou", "Kostelec na Hané", "Konice", "Zlaté Hory", "Javorník", "Hanušovice", "Velké Losiny"],
    faq: [
      {
        q: "Jezdíte do celého Olomouckého kraje?",
        a: "Ano. Ze Zábřehu to máme do Šumperka 15 km, do Olomouce 49 km, do Prostějova 63 km, do Jeseníku 58 km a do Přerova 74 km.",
      },
      {
        q: "Děláte i menší zakázky v okolí Zábřehu?",
        a: "Ano. V okolí sídla rádi vezmeme i menší práce: přidání zásuvek, opravu poruchy nebo výměnu svítidel.",
      },
    ],
    neighbors: ["zabreh", "sumperk", "olomouc", "prostejov", "prerov", "jesenik"],
  },
  {
    slug: "zabreh",
    name: "Zábřeh",
    locative: "v Zábřehu",
    kind: "city",
    region: "Olomoucký kraj",
    km: 0,
    minutes: 0,
    lat: 49.8826,
    lng: 16.8722,
    seoTitle: "Elektrikář Zábřeh, kamery a alarmy Jablotron | Hey! Elektro",
    description:
      "Elektrikář přímo v Zábřehu. Kamerové systémy Dahua a Hikvision, alarmy Jablotron, rozvaděče, elektroinstalace a revize. Sídlo Křížkovského 865/4.",
    h1: "Elektrikář a kamery v Zábřehu",
    lead: "V Zábřehu máme sídlo, na Křížkovského ulici. K vám domů nebo do firmy to máme pár minut.",
    intro: [
      "Zábřeh je naše domovské město, proto tu vezmeme i práci, kvůli které by vzdálenější firma nevyjela: výměnu jističe, nové zásuvky nebo rychlou opravu poruchy.",
      "Hlavně ale montujeme kamerové systémy, alarmy Jablotron a rozvaděče. Pracujeme v rodinných domech na okraji města, v bytech, ve firmách i v okolních obcích od Postřelmova po Štíty.",
    ],
    emphasis: [
      { service: "kamerove-systemy", text: "Kamery pro domy a firmy v Zábřehu, s obrazem v mobilu." },
      { service: "zabezpeceni-jablotron", text: "Alarmy Jablotron do bytů i domů, bezdrátově a bez sekání." },
      { service: "rozvadece", text: "Výměna starých pojistkových skříní za rozvaděč s chrániči." },
    ],
    nearby: ["Postřelmov", "Leština", "Hoštejn", "Rovensko", "Dubicko", "Zvole", "Lukavice", "Bohdíkov", "Štíty", "Jedlí", "Rájec", "Svébohov", "Mohelnice"],
    faq: [
      {
        q: "Kde přesně v Zábřehu sídlíte?",
        a: "Na adrese Křížkovského 865/4, 789 01 Zábřeh. Před návštěvou nám prosím zavolejte, většinu dne jsme na zakázkách.",
      },
      {
        q: "Vezmete i drobnou opravu?",
        a: "V Zábřehu a okolí ano. Zavolejte na 602 270 211 a domluvíme termín.",
      },
    ],
    neighbors: ["sumperk", "olomoucky-kraj", "usti-nad-orlici", "svitavy"],
  },
  {
    slug: "sumperk",
    name: "Šumperk",
    locative: "v Šumperku",
    kind: "city",
    region: "Olomoucký kraj",
    km: 15,
    minutes: 20,
    lat: 49.9653,
    lng: 16.9706,
    seoTitle: "Kamery, alarmy Jablotron a elektrikář Šumperk | Hey! Elektro",
    description:
      "Kamerové systémy, alarmy Jablotron, rozvaděče a elektroinstalace v Šumperku a okolí. Ze Zábřehu jsme u vás za 20 minut. Chalupy v Jeseníkách s LTE připojením.",
    h1: "Kamery, alarmy a elektro v Šumperku",
    lead: "Do Šumperka to máme ze Zábřehu 15 km po I/44. Jezdíme sem i do údolí Desné a na chalupy v Jeseníkách.",
    intro: [
      "Šumperk je pro nás skoro domácí půda. Montujeme tu kamery a alarmy do rodinných domů, bytů a firem a měníme staré rozvaděče v domech, které mají ještě pojistky.",
      "Za Šumperkem začínají Jeseníky a s nimi chalupy a penziony ve Velkých Losinách, Loučné nad Desnou nebo Kouty. Tam často chybí pevný internet, a tak dáváme alarmy a kamery s připojením přes mobilní síť. Majitel pak vidí, co se na chalupě děje, i když je stovky kilometrů daleko.",
    ],
    emphasis: [
      { service: "zabezpeceni-jablotron", text: "Alarmy Jablotron s LTE pro chalupy a penziony v údolí Desné." },
      { service: "kamerove-systemy", text: "Kamery pro domy a firmy v Šumperku a kamery s LTE na horách." },
      { service: "rozvadece", text: "Výměny rozvaděčů ve starší zástavbě a rodinných domech." },
    ],
    nearby: ["Bludov", "Rapotín", "Velké Losiny", "Petrov nad Desnou", "Sobotín", "Loučná nad Desnou", "Libina", "Nový Malín", "Hanušovice", "Bohdíkov", "Vikýřovice", "Dolní Studénky"],
    faq: [
      {
        q: "Zabezpečíte chalupu, kde není internet?",
        a: "Ano. Alarm Jablotron i kamery připojíme přes mobilní síť. Upozornění a obraz pak dostanete do telefonu odkudkoli.",
      },
    ],
    neighbors: ["zabreh", "jesenik", "olomoucky-kraj", "olomouc"],
  },
  {
    slug: "olomouc",
    name: "Olomouc",
    locative: "v Olomouci",
    kind: "city",
    region: "Olomoucký kraj",
    km: 49,
    minutes: 45,
    lat: 49.5938,
    lng: 17.2509,
    seoTitle: "Kamerové systémy, alarmy Jablotron a elektrikář Olomouc | Hey! Elektro",
    description:
      "Montáž kamer Dahua a Hikvision, alarmů Jablotron a rozvaděčů v Olomouci a okolí. Bezdrátové zabezpečení bytů bez sekání, videotelefony pro SVJ, firmy.",
    h1: "Kamery, alarmy a elektro v Olomouci",
    lead: "Do Olomouce jezdíme ze Zábřehu po D35, zhruba 45 minut. Zabezpečujeme byty, rodinné domy, bytové domy i firemní areály.",
    intro: [
      "V Olomouci hodně pracujeme v bytech. Bezdrátový alarm Jablotron se do bytu namontuje bez sekání a bez prachu, takže se hodí i do čerstvě vymalovaného interiéru nebo do pronájmu.",
      "Pro bytové domy a SVJ měníme zvonková tabla za videotelefony se vstupem na čip a montujeme kamery do vchodů, garáží a kolárn. Ve firmách a skladech kolem města stavíme kamerové systémy s chytrou detekcí osob a vozidel a upravujeme rozvaděče pro nové stroje.",
    ],
    emphasis: [
      { service: "zabezpeceni-jablotron", text: "Bezdrátové alarmy Jablotron do bytů, bez sekání a malování." },
      { service: "kamerove-systemy", text: "Kamery pro firmy, sklady a bytové domy v Olomouci a okolí." },
      { service: "videotelefony-a-pristupove-systemy", text: "Zvonková tabla s videem a vstup na čip pro SVJ." },
    ],
    nearby: ["Hlubočky", "Velká Bystřice", "Bystrovany", "Hlušovice", "Bohuňovice", "Horka nad Moravou", "Křelov-Břuchotín", "Grygov", "Velký Týnec", "Dolany", "Šternberk", "Litovel", "Uničov"],
    faq: [
      {
        q: "Namontujete alarm do bytu v paneláku?",
        a: "Ano. Bezdrátové prvky Jablotron se připevní na zeď nebo rám dveří, ústředna potřebuje jen zásuvku. Montáž je čistá a obejde se bez sekání.",
      },
      {
        q: "Děláte kamery pro SVJ?",
        a: "Ano. Navrhneme kamery do vchodů, garáží a sklepů, nastavíme přístup k záznamům a pomůžeme s informační cedulí podle GDPR.",
      },
    ],
    neighbors: ["prostejov", "prerov", "olomoucky-kraj", "sumperk"],
  },
  {
    slug: "prostejov",
    name: "Prostějov",
    locative: "v Prostějově",
    kind: "city",
    region: "Olomoucký kraj",
    km: 63,
    minutes: 55,
    lat: 49.4719,
    lng: 17.1118,
    seoTitle: "Kamery, alarmy Jablotron a elektrikář Prostějov | Hey! Elektro",
    description:
      "Kamerové systémy Dahua a Hikvision, alarmy Jablotron, rozvaděče a elektroinstalace v Prostějově a na Hané. Ze Zábřehu necelá hodina jízdy.",
    h1: "Kamery a alarmy v Prostějově",
    lead: "Do Prostějova to máme ze Zábřehu 63 km, necelou hodinu jízdy. Pracujeme ve městě i v obcích na Hané a směrem na Plumlov.",
    intro: [
      "Na Prostějovsku stojí hodně rodinných domů s dvorem, garáží a dílnou. Pro ně navrhujeme kamery, které hlídají vjezd a dvůr, a alarm, který pokryje dům i hospodářské budovy.",
      "Ve starších domech často narážíme na rozvaděč s pojistkami a bez proudového chrániče. Výměnu spojíme s revizí, takže na konci dostanete bezpečný rozvaděč i revizní zprávu.",
    ],
    emphasis: [
      { service: "kamerove-systemy", text: "Kamery na vjezd, dvůr a hospodářské budovy rodinných domů." },
      { service: "rozvadece", text: "Výměna starých rozvaděčů s pojistkami, včetně revize." },
      { service: "zabezpeceni-jablotron", text: "Alarm Jablotron pro dům, garáž i dílnu v jednom systému." },
    ],
    nearby: ["Kostelec na Hané", "Plumlov", "Mostkovice", "Držovice", "Smržice", "Určice", "Vrbátky", "Němčice nad Hanou", "Konice", "Čelechovice na Hané"],
    faq: [
      {
        q: "Pohlídá jeden alarm dům i dílnu na dvoře?",
        a: "Ano. Systém JABLOTRON 100+ rozdělíme do zón. Dům, garáž a dílnu pak zapínáte zvlášť nebo najednou.",
      },
    ],
    neighbors: ["olomouc", "prerov", "olomoucky-kraj"],
  },
  {
    slug: "prerov",
    name: "Přerov",
    locative: "v Přerově",
    kind: "city",
    region: "Olomoucký kraj",
    km: 74,
    minutes: 65,
    lat: 49.4551,
    lng: 17.4509,
    seoTitle: "Kamery, alarmy Jablotron a elektrikář Přerov | Hey! Elektro",
    description:
      "Montáž kamerových systémů, alarmů Jablotron a rozvaděčů v Přerově a okolí. Kamery pro firmy a areály, zabezpečení domů, elektroinstalace a revize.",
    h1: "Kamery, alarmy a elektro v Přerově",
    lead: "Do Přerova jezdíme ze Zábřehu přes Olomouc, zhruba hodinu. Zabezpečujeme domy, firmy a areály v Přerově, Lipníku i Kojetíně.",
    intro: [
      "Přerovsko je kraj firem, skladů a dílen. Pro ně stavíme kamerové systémy s chytrou detekcí, které v noci upozorní na člověka nebo auto v areálu, ale nespustí se kvůli dešti nebo zvířeti.",
      "Pro rodinné domy montujeme alarmy Jablotron a kamery s aplikací v mobilu. Při větších zakázkách plánujeme montáž tak, abychom ji zvládli v co nejméně výjezdech.",
    ],
    emphasis: [
      { service: "kamerove-systemy", text: "Kamery s detekcí osob a vozidel pro firemní areály a sklady." },
      { service: "zabezpeceni-jablotron", text: "Alarmy Jablotron pro rodinné domy s ovládáním z mobilu." },
      { service: "rozvadece", text: "Rozvaděče pro dílny a provozovny, nové vývody pro stroje." },
    ],
    nearby: ["Lipník nad Bečvou", "Kojetín", "Tovačov", "Brodek u Přerova", "Dřevohostice", "Bochoř", "Věrovany", "Osek nad Bečvou", "Prosenice", "Hranice"],
    faq: [
      {
        q: "Uděláte kamerový systém pro celý areál?",
        a: "Ano. Navrhneme rozmístění kamer, kabeláž, záznam i přístup pro více lidí. U firem pomůžeme i s nastavením podle GDPR.",
      },
    ],
    neighbors: ["olomouc", "prostejov", "olomoucky-kraj", "ostrava"],
  },
  {
    slug: "jesenik",
    name: "Jeseník",
    locative: "v Jeseníku",
    kind: "city",
    region: "Olomoucký kraj",
    km: 58,
    minutes: 80,
    lat: 50.2294,
    lng: 17.2046,
    seoTitle: "Kamery a alarmy Jablotron pro chaty a penziony, Jeseník | Hey! Elektro",
    description:
      "Zabezpečení chat, penzionů a domů na Jesenicku. Alarmy Jablotron a kamery s připojením přes mobilní síť, rozvaděče a elektroinstalace. Jezdíme přes Červenohorské sedlo.",
    h1: "Kamery a alarmy pro Jesenicko",
    lead: "Do Jeseníku jezdíme ze Zábřehu přes Šumperk a Červenohorské sedlo. Zabezpečujeme chalupy, penziony i domy ve městě.",
    intro: [
      "Na Jesenicku je hodně objektů, kde majitel není každý den: chalupy, apartmány, penziony. Alarm Jablotron s komunikací přes mobilní síť a kamery s LTE připojením vám ukážou, co se děje, i když jste doma ve městě.",
      "V zimě hlídá alarm i teplotu a únik vody. Když vypadne topení nebo praskne potrubí, dozvíte se to hned, ne až při příští návštěvě.",
    ],
    emphasis: [
      { service: "zabezpeceni-jablotron", text: "Alarmy pro chaty a penziony s hlídáním teploty a vody." },
      { service: "kamerove-systemy", text: "Kamery s LTE připojením tam, kde není pevný internet." },
      { service: "videotelefony-a-pristupove-systemy", text: "Vstup pro hosty penzionu kódem, bez předávání klíčů." },
    ],
    nearby: ["Lipová-lázně", "Česká Ves", "Mikulovice", "Bělá pod Pradědem", "Zlaté Hory", "Javorník", "Vidnava", "Žulová", "Supíkovice", "Hradec-Nová Ves"],
    faq: [
      {
        q: "Pohlídá alarm na chalupě i mráz a vodu?",
        a: "Ano. Systém Jablotron umí hlídat teplotu i zaplavení. Když teplota klesne nebo unikne voda, přijde vám zpráva do telefonu.",
      },
      {
        q: "Jak řešíte vstup hostů do penzionu?",
        a: "Kódovou klávesnicí nebo čtečkou čipů s elektrickým zámkem. Každý host dostane vlastní kód, který po odjezdu zrušíte.",
      },
    ],
    neighbors: ["sumperk", "zabreh", "olomoucky-kraj", "opava"],
  },
  // ——— Východní Čechy ———
  {
    slug: "vychodni-cechy",
    name: "Východní Čechy",
    locative: "ve východních Čechách",
    kind: "region",
    region: "východní Čechy",
    km: 0,
    minutes: 0,
    lat: 50.0,
    lng: 16.1,
    seoTitle: "Kamery, alarmy Jablotron a rozvaděče ve východních Čechách | Hey! Elektro",
    description:
      "Kamerové systémy, alarmy Jablotron, rozvaděče a elektroinstalace v Pardubickém a Královéhradeckém kraji: Svitavy, Ústí nad Orlicí, Pardubice, Hradec Králové.",
    h1: "Kamery a alarmy ve východních Čechách",
    lead: "Ze Zábřehu je to do Lanškrouna 26 km a do Ústí nad Orlicí 45 km. Pravidelně jezdíme na Svitavsko, Orlickoústecko, Pardubicko i Hradecko.",
    intro: [
      "Zábřeh leží kousek od hranice s Pardubickým krajem. Lanškroun, Moravská Třebová nebo Česká Třebová jsou blíž než Olomouc, a tak je pro nás Svitavsko a Orlickoústecko stejně domácí jako Haná.",
      "Do Pardubic a Hradce Králové jezdíme na větší zakázky: kamerové systémy pro firmy, rozvaděče, alarmy pro rodinné domy. Montáž plánujeme tak, abychom ji zvládli v co nejméně výjezdech.",
    ],
    emphasis: [
      { service: "kamerove-systemy", text: "Kamery Dahua a Hikvision pro domy a firmy od Svitav po Hradec." },
      { service: "zabezpeceni-jablotron", text: "Alarmy Jablotron s ovládáním z mobilu, bezdrátově a čistě." },
      { service: "rozvadece", text: "Rozvaděče pro novostavby, FVE a wallboxy i výměny starých." },
    ],
    nearby: ["Lanškroun", "Moravská Třebová", "Česká Třebová", "Ústí nad Orlicí", "Svitavy", "Litomyšl", "Polička", "Letohrad", "Žamberk", "Choceň", "Vysoké Mýto", "Chrudim", "Pardubice", "Hradec Králové"],
    faq: [
      {
        q: "Jezdíte až do Pardubic a Hradce Králové?",
        a: "Ano. Ze Zábřehu je to do Pardubic asi 110 km a do Hradce Králové 125 km. Na obhlídku přijedeme v domluvený den a dopravu uvedeme v nabídce.",
      },
      {
        q: "Které části východních Čech máte nejblíž?",
        a: "Lanškroun (26 km), Moravskou Třebovou (35 km), Českou Třebovou (42 km), Ústí nad Orlicí (45 km) a Svitavy (52 km).",
      },
    ],
    neighbors: ["svitavy", "usti-nad-orlici", "pardubice", "hradec-kralove"],
  },
  {
    slug: "svitavy",
    name: "Svitavy",
    locative: "ve Svitavách",
    kind: "city",
    region: "Pardubický kraj",
    km: 52,
    minutes: 55,
    lat: 49.7559,
    lng: 16.4683,
    seoTitle: "Kamery, alarmy Jablotron a elektrikář Svitavy | Hey! Elektro",
    description:
      "Kamerové systémy Dahua a Hikvision, alarmy Jablotron, rozvaděče a elektroinstalace ve Svitavách, Moravské Třebové, Poličce a Litomyšli.",
    h1: "Kamery a alarmy ve Svitavách",
    lead: "Ze Zábřehu do Svitav je to 52 km. Moravskou Třebovou máme cestou, Poličku a Litomyšl kousek za ní.",
    intro: [
      "Na Svitavsku montujeme kamerové systémy a alarmy do rodinných domů i do firem a dílen. Mnoho domů tu má velký pozemek, takže kamery navrhujeme tak, aby pokryly vjezd, dvůr i zahradu bez slepých míst.",
      "Častou zakázkou je i rozvaděč pro nový velký spotřebič: tepelné čerpadlo, fotovoltaiku nebo wallbox. Rozvaděč upravíme, doplníme přepěťovou ochranu a zajistíme revizi.",
    ],
    emphasis: [
      { service: "kamerove-systemy", text: "Kamery pro velké pozemky bez slepých míst, s detekcí osob." },
      { service: "rozvadece", text: "Úpravy rozvaděčů pro tepelná čerpadla, FVE a wallboxy." },
      { service: "zabezpeceni-jablotron", text: "Alarmy Jablotron pro domy i firemní provozovny." },
    ],
    nearby: ["Moravská Třebová", "Polička", "Litomyšl", "Březová nad Svitavou", "Jevíčko", "Hradec nad Svitavou", "Opatov", "Dlouhá Loučka", "Městečko Trnávka", "Bystré"],
    faq: [
      {
        q: "Pokryjí kamery i velký pozemek?",
        a: "Ano. Na velké pozemky používáme kamery s delším dosahem nočního přisvícení a chytrou detekcí, aby upozornění chodila jen na lidi a auta.",
      },
    ],
    neighbors: ["usti-nad-orlici", "vychodni-cechy", "zabreh", "pardubice"],
  },
  {
    slug: "usti-nad-orlici",
    name: "Ústí nad Orlicí",
    locative: "v Ústí nad Orlicí",
    kind: "city",
    region: "Pardubický kraj",
    km: 45,
    minutes: 55,
    lat: 49.9739,
    lng: 16.3936,
    seoTitle: "Kamery, alarmy Jablotron a elektrikář Ústí nad Orlicí | Hey! Elektro",
    description:
      "Montáž kamer, alarmů Jablotron a rozvaděčů v Ústí nad Orlicí, České Třebové, Lanškrouně a Letohradu. Ze Zábřehu 45 km.",
    h1: "Kamery a alarmy v Ústí nad Orlicí",
    lead: "Orlickoústecko máme ze Zábřehu blízko: Lanškroun 26 km, Česká Třebová 42 km, Ústí nad Orlicí 45 km.",
    intro: [
      "Do Lanškrouna, České Třebové a Ústí nad Orlicí to máme blíž než do Olomouce. Proto sem jezdíme pravidelně, na obhlídky, montáže i servis.",
      "Montujeme kamery a alarmy pro rodinné domy a firmy, měníme rozvaděče a připravujeme domy na fotovoltaiku a wallbox. Pro chalupy v Orlických horách nabízíme alarmy a kamery s připojením přes mobilní síť.",
    ],
    emphasis: [
      { service: "kamerove-systemy", text: "Kamery pro domy a firmy v Ústí, Lanškrouně a České Třebové." },
      { service: "zabezpeceni-jablotron", text: "Alarmy Jablotron s LTE pro chalupy v Orlických horách." },
      { service: "wallboxy", text: "Wallboxy a rozvaděče pro domy s fotovoltaikou." },
    ],
    nearby: ["Česká Třebová", "Lanškroun", "Letohrad", "Žamberk", "Choceň", "Brandýs nad Orlicí", "Králíky", "Jablonné nad Orlicí", "Damníkov", "Dolní Dobrouč"],
    faq: [
      {
        q: "Jezdíte i do Lanškrouna a České Třebové?",
        a: "Ano, a často. Lanškroun máme ze Zábřehu 26 km, Českou Třebovou 42 km.",
      },
    ],
    neighbors: ["svitavy", "vychodni-cechy", "zabreh", "hradec-kralove"],
  },
  {
    slug: "pardubice",
    name: "Pardubice",
    locative: "v Pardubicích",
    kind: "city",
    region: "Pardubický kraj",
    km: 110,
    minutes: 115,
    lat: 50.0343,
    lng: 15.7812,
    seoTitle: "Kamerové systémy, alarmy Jablotron a rozvaděče Pardubice | Hey! Elektro",
    description:
      "Kamerové systémy Dahua a Hikvision, alarmy Jablotron a rozvaděče v Pardubicích a Chrudimi. Firemní areály, rodinné domy, výměny rozvaděčů.",
    h1: "Kamery a alarmy v Pardubicích",
    lead: "Do Pardubic jezdíme ze Zábřehu na obhlídky a montáže kamer, alarmů a rozvaděčů. Je to 110 km, necelé dvě hodiny jízdy.",
    intro: [
      "V Pardubicích a okolí děláme hlavně kamerové systémy pro firmy a rodinné domy, alarmy Jablotron a rozvaděče. Na menší opravy je pro vás výhodnější místní elektrikář. Na kameru, alarm nebo nový rozvaděč se k vám rádi rozjedeme.",
      "Montáž plánujeme v celých dnech, aby vám dojezd zbytečně nenavyšoval cenu. Rozsah práce a dopravu uvedeme v nabídce dopředu.",
    ],
    emphasis: [
      { service: "kamerove-systemy", text: "Kamerové systémy pro firmy, sklady a rodinné domy." },
      { service: "zabezpeceni-jablotron", text: "Alarmy Jablotron 100+ s ovládáním z mobilu." },
      { service: "rozvadece", text: "Nové rozvaděče a výměny starých, včetně revize." },
    ],
    nearby: ["Chrudim", "Lázně Bohdaneč", "Sezemice", "Dašice", "Holice", "Přelouč", "Rybitví", "Srch", "Staré Hradiště", "Hrochův Týnec"],
    faq: [
      {
        q: "Vyplatí se vám jezdit do Pardubic?",
        a: "Na kamerový systém, alarm nebo rozvaděč ano. Montáž plánujeme v celých dnech a dopravu uvedeme v nabídce předem.",
      },
    ],
    neighbors: ["hradec-kralove", "vychodni-cechy", "svitavy", "usti-nad-orlici"],
  },
  {
    slug: "hradec-kralove",
    name: "Hradec Králové",
    locative: "v Hradci Králové",
    kind: "city",
    region: "Královéhradecký kraj",
    km: 125,
    minutes: 120,
    lat: 50.2092,
    lng: 15.8328,
    seoTitle: "Kamerové systémy, alarmy Jablotron a rozvaděče Hradec Králové | Hey! Elektro",
    description:
      "Kamerové systémy Dahua a Hikvision, alarmy Jablotron a rozvaděče v Hradci Králové a okolí. Pro firmy i rodinné domy, montáž plánovaná v celých dnech.",
    h1: "Kamery a alarmy v Hradci Králové",
    lead: "Do Hradce Králové jezdíme ze Zábřehu na zakázky kamer, alarmů a rozvaděčů. Je to 125 km, zhruba dvě hodiny.",
    intro: [
      "V Hradci Králové a okolí stavíme kamerové systémy pro firmy a rodinné domy, montujeme alarmy Jablotron a zapojujeme rozvaděče, hlavně pro novostavby, fotovoltaiku a wallboxy.",
      "Obhlídku domluvíme na konkrétní den a montáž naplánujeme tak, abychom ji zvládli najednou. Cenu práce i dopravy znáte z nabídky dřív, než začneme.",
    ],
    emphasis: [
      { service: "kamerove-systemy", text: "Kamery Dahua a Hikvision pro firmy a rodinné domy." },
      { service: "rozvadece", text: "Rozvaděče pro novostavby, fotovoltaiku a wallboxy." },
      { service: "zabezpeceni-jablotron", text: "Alarmy Jablotron s napojením na pult centralizované ochrany." },
    ],
    nearby: ["Třebechovice pod Orebem", "Smiřice", "Jaroměř", "Nechanice", "Nový Bydžov", "Hořice", "Týniště nad Orlicí", "Lhota pod Libčany", "Předměřice nad Labem", "Černilov"],
    faq: [
      {
        q: "Jak řešíte vzdálenost do Hradce?",
        a: "Obhlídku i montáž plánujeme na konkrétní dny, aby se práce udělala v co nejméně výjezdech. Dopravu vždy uvedeme v nabídce.",
      },
    ],
    neighbors: ["pardubice", "vychodni-cechy", "usti-nad-orlici", "svitavy"],
  },
  // ——— Moravskoslezský kraj ———
  {
    slug: "opava",
    name: "Opava",
    locative: "v Opavě",
    kind: "city",
    region: "Moravskoslezský kraj",
    km: 143,
    minutes: 115,
    lat: 49.9387,
    lng: 17.9026,
    seoTitle: "Kamerové systémy, alarmy Jablotron a rozvaděče Opava | Hey! Elektro",
    description:
      "Kamery Dahua a Hikvision, alarmy Jablotron a rozvaděče v Opavě a okolí. Zabezpečení rodinných domů, firem a provozoven, montáž plánovaná v celých dnech.",
    h1: "Kamery a alarmy v Opavě",
    lead: "Na Opavsko jezdíme ze Zábřehu na zakázky kamer, alarmů a rozvaděčů. Necelé dvě hodiny jízdy.",
    intro: [
      "V Opavě a okolních obcích zabezpečujeme rodinné domy a firmy: kamerový systém s obrazem v mobilu, alarm Jablotron, případně obojí v jednom návrhu. Na kamery Dahua i Hikvision máme certifikaci.",
      "Vzdálenost řešíme plánováním. Obhlídku domluvíme na konkrétní den a montáž naplánujeme tak, abychom ji zvládli v co nejméně výjezdech.",
    ],
    emphasis: [
      { service: "kamerove-systemy", text: "Kamerové systémy pro domy a firmy s chytrou detekcí." },
      { service: "zabezpeceni-jablotron", text: "Alarmy Jablotron pro rodinné domy, byty i provozovny." },
      { service: "rozvadece", text: "Rozvaděče pro firmy, FVE a wallboxy." },
    ],
    nearby: ["Kravaře", "Hradec nad Moravicí", "Velké Hoštice", "Komárov", "Mokré Lazce", "Štěpánkovice", "Dolní Benešov", "Hlučín", "Vítkov", "Otice"],
    faq: [
      {
        q: "Opravdu jezdíte až do Opavy?",
        a: "Ano, na kamerové systémy, alarmy a rozvaděče. Obhlídku i montáž plánujeme na konkrétní dny a dopravu uvedeme v nabídce.",
      },
    ],
    neighbors: ["ostrava", "jesenik", "olomoucky-kraj"],
  },
  {
    slug: "ostrava",
    name: "Ostrava",
    locative: "v Ostravě",
    kind: "city",
    region: "Moravskoslezský kraj",
    km: 145,
    minutes: 105,
    lat: 49.8347,
    lng: 18.282,
    seoTitle: "Kamerové systémy pro firmy, alarmy Jablotron Ostrava | Hey! Elektro",
    description:
      "Kamerové systémy Dahua a Hikvision pro firmy, sklady a domy v Ostravě. Alarmy Jablotron, rozvaděče a datové sítě. Po D1 ze Zábřehu zhruba 1 h 45 min.",
    h1: "Kamery a alarmy v Ostravě",
    lead: "Do Ostravy jezdíme po dálnici D1, ze Zábřehu zhruba hodinu tři čtvrtě. Hlavně za kamerovými systémy pro firmy a sklady.",
    intro: [
      "Ostravsko je plné hal, skladů a provozoven. Navrhujeme pro ně kamerové systémy s detekcí osob a vozidel, záznamem na místě a přístupem pro více lidí, včetně datové sítě, po které kamery poběží.",
      "Pro rodinné domy v Ostravě a okolí montujeme kamery a alarmy Jablotron. Práci plánujeme v celých dnech, aby dojezd zbytečně nezvyšoval cenu.",
    ],
    emphasis: [
      { service: "kamerove-systemy", text: "Kamery pro haly, sklady a areály, s detekcí a záznamem." },
      { service: "datove-site-a-wifi", text: "Datová síť a PoE switche pro kamerový systém." },
      { service: "zabezpeceni-jablotron", text: "Alarmy Jablotron pro rodinné domy a provozovny." },
    ],
    nearby: ["Havířov", "Frýdek-Místek", "Bohumín", "Orlová", "Karviná", "Hlučín", "Klimkovice", "Šenov", "Studénka", "Vratimov"],
    faq: [
      {
        q: "Děláte kamery i pro velké areály?",
        a: "Ano. Navrhneme rozmístění kamer, datovou síť, záznam a přístupy pro vedení i ostrahu. Pomůžeme s nastavením podle GDPR.",
      },
    ],
    neighbors: ["opava", "prerov", "olomoucky-kraj"],
  },
];

// Lokality pro výběr dojezdu, včetně měst bez vlastní stránky. km a min ze Zábřehu (OSRM, zaokrouhleno nahoru).
export const travelTable: { name: string; km: number; min: number; region: Region; slug?: string; lat: number; lng: number }[] = [
  { name: "Zábřeh", km: 0, min: 0, region: "Olomoucký kraj", slug: "zabreh", lat: 49.8826, lng: 16.8722 },
  { name: "Mohelnice", km: 15, min: 20, region: "Olomoucký kraj", lat: 49.777, lng: 16.9195 },
  { name: "Šumperk", km: 15, min: 20, region: "Olomoucký kraj", slug: "sumperk", lat: 49.9653, lng: 16.9706 },
  { name: "Uničov", km: 26, min: 35, region: "Olomoucký kraj", lat: 49.7709, lng: 17.1214 },
  { name: "Litovel", km: 33, min: 35, region: "Olomoucký kraj", lat: 49.7012, lng: 17.0762 },
  { name: "Šternberk", km: 41, min: 55, region: "Olomoucký kraj", lat: 49.7305, lng: 17.2989 },
  { name: "Olomouc", km: 49, min: 45, region: "Olomoucký kraj", slug: "olomouc", lat: 49.5938, lng: 17.2509 },
  { name: "Jeseník", km: 58, min: 80, region: "Olomoucký kraj", slug: "jesenik", lat: 50.2294, lng: 17.2046 },
  { name: "Prostějov", km: 63, min: 55, region: "Olomoucký kraj", slug: "prostejov", lat: 49.4719, lng: 17.1118 },
  { name: "Přerov", km: 74, min: 65, region: "Olomoucký kraj", slug: "prerov", lat: 49.4551, lng: 17.4509 },
  { name: "Hranice", km: 93, min: 75, region: "Olomoucký kraj", lat: 49.548, lng: 17.7347 },
  { name: "Lanškroun", km: 26, min: 35, region: "Pardubický kraj", lat: 49.9122, lng: 16.6119 },
  { name: "Moravská Třebová", km: 35, min: 40, region: "Pardubický kraj", lat: 49.7579, lng: 16.664 },
  { name: "Česká Třebová", km: 42, min: 55, region: "Pardubický kraj", lat: 49.9019, lng: 16.4473 },
  { name: "Ústí nad Orlicí", km: 45, min: 55, region: "Pardubický kraj", slug: "usti-nad-orlici", lat: 49.9739, lng: 16.3936 },
  { name: "Svitavy", km: 52, min: 55, region: "Pardubický kraj", slug: "svitavy", lat: 49.7559, lng: 16.4683 },
  { name: "Litomyšl", km: 60, min: 65, region: "Pardubický kraj", lat: 49.8681, lng: 16.3131 },
  { name: "Polička", km: 68, min: 75, region: "Pardubický kraj", lat: 49.7147, lng: 16.2654 },
  { name: "Vysoké Mýto", km: 76, min: 85, region: "Pardubický kraj", lat: 49.9532, lng: 16.1617 },
  { name: "Chrudim", km: 106, min: 115, region: "Pardubický kraj", lat: 49.9511, lng: 15.7956 },
  { name: "Pardubice", km: 110, min: 115, region: "Pardubický kraj", slug: "pardubice", lat: 50.0343, lng: 15.7812 },
  { name: "Hradec Králové", km: 125, min: 120, region: "Královéhradecký kraj", slug: "hradec-kralove", lat: 50.2092, lng: 15.8328 },
  { name: "Bruntál", km: 64, min: 80, region: "Moravskoslezský kraj", lat: 49.9884, lng: 17.4647 },
  { name: "Opava", km: 143, min: 115, region: "Moravskoslezský kraj", slug: "opava", lat: 49.9387, lng: 17.9026 },
  { name: "Ostrava", km: 145, min: 105, region: "Moravskoslezský kraj", slug: "ostrava", lat: 49.8347, lng: 18.282 },
];

export const cities = locations.filter((l) => l.kind === "city");
export const regions = locations.filter((l) => l.kind === "region");
export const locationBySlug = (slug: string) => locations.find((l) => l.slug === slug);
export const travelFaq = (l: Location) => travel(l.name, l.locative, l.km, l.minutes);
