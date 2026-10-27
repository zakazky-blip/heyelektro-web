// Obsah stránek služeb. Texty jsou psané pro web, cz() při renderu doplní nezlomitelné mezery.
// group: „elektro“ (silnoproud) nebo „zabezpeceni“ (kamery, alarmy, vstupy, sítě). Obě skupiny mají na webu stejnou váhu.

export type Faq = { q: string; a: string };
export type ServiceGroup = "elektro" | "zabezpeceni";

export type Service = {
  slug: string;
  name: string; // krátký název do navigace
  short: string; // jedna věta do přehledů
  group: ServiceGroup;
  seoTitle: string;
  description: string;
  h1: string;
  lead: string;
  image: string; // klíč v src/data/images.ts
  includes: { title: string; text: string }[];
  forWhom: { title: string; text: string }[];
  detail: { heading: string; paragraphs: string[] };
  cleanWork: string; // jak to děláme čistě, bez zbytečného sekání
  brands?: string[];
  faq: Faq[];
  related: string[];
  keywords: string[]; // podklad pro SEO a Google Ads, na stránce se nezobrazuje
};

const rawServices: Service[] = [
  {
    slug: "kamerove-systemy",
    name: "Kamerové systémy",
    short: "Kamery Dahua a Hikvision s nočním viděním, záznamem a přístupem z mobilu.",
    group: "zabezpeceni",
    seoTitle: "Montáž kamer Dahua a Hikvision, Zábřeh a Olomouc | Hey! Elektro",
    description:
      "Montáž kamerových systémů Dahua a Hikvision pro rodinné domy, firmy a chaty. Návrh rozmístění, noční vidění, záznam a sledování z mobilu. Olomoucký kraj a východní Čechy.",
    h1: "Kamerové systémy Dahua a Hikvision",
    lead: "Navrhneme, kam kamery dát, natáhneme kabely, nastavíme záznam a ukážeme vám, jak se na dům nebo firmu podíváte z telefonu.",
    image: "kamera",
    includes: [
      {
        title: "Návrh rozmístění kamer",
        text: "Projdeme s vámi objekt a určíme, co má která kamera vidět: vjezd, vchod, zahradu, sklad. U každé řekneme, jestli na ní poznáte obličej nebo SPZ.",
      },
      {
        title: "Kamery s nočním viděním",
        text: "Infračervené přisvícení zobrazí dvůr i v úplné tmě. Kde chcete vidět barvy i v noci, doporučíme modely s barevným nočním obrazem.",
      },
      {
        title: "Záznamové zařízení a disky",
        text: "Záznam ukládá rekordér (NVR) přímo u vás. Kapacitu disků spočítáme podle počtu kamer a toho, kolik dní záznamu chcete mít.",
      },
      {
        title: "Jeden kabel ke každé kameře",
        text: "Kamery napájíme po datovém kabelu (PoE). Ke každé vede jediný kabel, takže montáž je čistší a spolehlivější než s Wi-Fi.",
      },
      {
        title: "Sledování z mobilu",
        text: "Živý obraz, záznamy a upozornění máte v aplikaci výrobce: DMSS pro Dahua, Hik-Connect pro Hikvision. Při předání vám ji nastavíme.",
      },
      {
        title: "Chytrá detekce osob a aut",
        text: "Kamery s analýzou obrazu rozliší člověka a auto od větve ve větru nebo kočky. Upozornění chodí jen tehdy, když opravdu něco nastane.",
      },
    ],
    forWhom: [
      { title: "Rodinné domy", text: "Vjezd, vchod, zahrada a boční strany domu. Upozornění do telefonu, když se u domu někdo pohybuje." },
      { title: "Firmy, sklady a provozovny", text: "Areál, parkoviště, sklad, pokladna. Záznam jako důkaz pro pojišťovnu nebo policii." },
      { title: "Bytové domy a SVJ", text: "Vchody, garáže, kolárny a sklepy. Nastavení přístupu k záznamům tak, aby odpovídalo GDPR." },
      { title: "Chaty a rekreační objekty", text: "Kamery s připojením přes mobilní síť (LTE) tam, kde není pevný internet." },
    ],
    detail: {
      heading: "Dahua, nebo Hikvision?",
      paragraphs: [
        "Oba výrobci patří ke světové špičce a na kamery obou máme certifikaci. Neprodáváme jednu značku za každou cenu. Vybíráme podle toho, co má systém umět a kolik chcete investovat.",
        "Hikvision nabízí řady AcuSense s přesnou detekcí osob a vozidel a ColorVu s barevným obrazem v noci. Dahua má obdobné řady WizSense a Full-color. Rozdíl uvidíte hlavně v aplikaci a v cenách konkrétních modelů, proto vám před montáží ukážeme obě možnosti.",
        "Pokud kamera snímá i veřejný prostor, například chodník nebo ulici, vztahuje se na záznam GDPR. Vyplývá to z rozsudku Soudního dvora EU ve věci Ryneš (C-212/13), který vzešel z případu z Česka. Kamery proto nastavíme tak, aby snímaly jen to, co mají, a části obrazu případně zamaskujeme.",
      ],
    },
    cleanWork:
      "Kabely vedeme tak, aby nebyly vidět a nemuseli jsme sekat: půdou, podhledem, chráničkou nebo lištou v barvě fasády. Kde kabel natáhnout nejde, nabídneme kameru s Wi-Fi nebo LTE.",
    brands: ["Dahua", "Hikvision"],
    faq: [
      {
        q: "Kolik kamer potřebuji na rodinný dům?",
        a: "Většinou čtyři až šest: vjezd, vchod, zahrada a boční strany domu. Přesný počet určíme na obhlídce podle toho, co chcete vidět a z jaké vzdálenosti máte poznat obličej nebo SPZ.",
      },
      {
        q: "Jak dlouho se záznam uchovává?",
        a: "Záleží na kapacitě disku, počtu kamer, rozlišení a na tom, jestli se nahrává nepřetržitě, nebo jen při pohybu. Disky dimenzujeme podle toho, kolik dní záznamu potřebujete. Firmy by podle GDPR měly záznam uchovávat jen tak dlouho, jak je nezbytné.",
      },
      {
        q: "Uvidím kamery v mobilu?",
        a: "Ano. V aplikaci výrobce (DMSS pro Dahua, Hik-Connect pro Hikvision) uvidíte živý obraz, projdete záznamy a dostanete upozornění. Aplikaci vám nastavíme při předání.",
      },
      {
        q: "Funguje kamera v noci?",
        a: "Ano. Běžné kamery mají infračervené přisvícení a v noci zobrazují černobíle. Modely s barevným nočním viděním používají tlumené bílé světlo a ukážou i barvu auta nebo oblečení.",
      },
      {
        q: "Smím kamerou snímat ulici nebo sousedův pozemek?",
        a: "Jakmile kamera zabírá veřejný prostor nebo cizí pozemek, vztahuje se na ni GDPR a musíte mít k záznamu oprávněný důvod. Kamery proto nasměrujeme na váš pozemek a části obrazu, které snímat nemají, zamaskujeme.",
      },
      {
        q: "Dají se kamery propojit s alarmem Jablotron?",
        a: "Kamery a alarm navrhneme společně, aby se doplňovaly: alarm hlídá dveře, okna a místnosti, kamery ukazují, co se děje venku. Obojí pak ovládáte z telefonu.",
      },
    ],
    related: ["zabezpeceni-jablotron", "datove-site-a-wifi", "videotelefony-a-pristupove-systemy"],
    keywords: [
      "kamerový systém",
      "montáž kamer",
      "kamerový systém pro rodinný dům",
      "kamery Hikvision montáž",
      "kamery Dahua montáž",
      "kamerový systém pro firmu",
      "IP kamery",
      "kamery s nočním viděním",
    ],
  },
  {
    slug: "zabezpeceni-jablotron",
    name: "Zabezpečení Jablotron",
    short: "Alarmy Jablotron 100+ ovládané z mobilu. Bezdrátově, bez sekání do zdí.",
    group: "zabezpeceni",
    seoTitle: "Alarm Jablotron, zabezpečení domu a firmy, Zábřeh | Hey! Elektro",
    description:
      "Certifikovaný montážní partner Jablotron. Navrhneme a namontujeme alarm JABLOTRON 100+ pro byt, dům, firmu i chatu. Bezdrátové prvky bez sekání, ovládání z mobilu.",
    h1: "Zabezpečení Jablotron",
    lead: "Jako certifikovaný montážní partner Jablotron navrhneme a namontujeme alarm, který ovládáte z mobilu. Bezdrátové prvky instalujeme bez sekání do zdí.",
    image: "alarm",
    includes: [
      {
        title: "Návrh zabezpečení na míru",
        text: "Projdeme dům nebo provozovnu a určíme, kudy by mohl přijít nezvaný host. Podle toho rozmístíme detektory pohybu, kontakty na dveře a okna a sirény.",
      },
      {
        title: "Bezdrátové i drátové prvky",
        text: "V hotovém bytě nebo domě použijeme bezdrátové detektory, které se jen připevní na zeď. V novostavbě můžeme natáhnout sběrnici. Obojí jde kombinovat.",
      },
      {
        title: "Ovládání z mobilu",
        text: "V aplikaci MyJABLOTRON alarm zapnete i vypnete, uvidíte historii událostí a dostanete upozornění, když se doma něco stane.",
      },
      {
        title: "Požár, voda a únik plynu",
        text: "Systém umí hlídat i kouř, vytopení nebo plyn. Upozorní vás dřív, než se z drobnosti stane škoda.",
      },
      {
        title: "Řízení domu",
        text: "Z ústředny lze ovládat vrata, topení nebo osvětlení. Odjíždíte? Jedním povelem zapnete alarm a zavřete garáž.",
      },
      {
        title: "Pult centralizované ochrany",
        text: "Na přání alarm napojíme na pult, odkud při poplachu vyjíždí zásahová jednotka.",
      },
    ],
    forWhom: [
      { title: "Byty", text: "Bezdrátové detektory na dveře a do místností, montáž bez prachu a malování." },
      { title: "Rodinné domy", text: "Hlídání domu, garáže i dílny, ovládání vrat a upozornění do telefonu." },
      { title: "Firmy a provozovny", text: "Zóny pro různé části budovy, přístupové kódy pro zaměstnance, napojení na pult." },
      { title: "Chaty a chalupy", text: "Komunikace přes mobilní síť, takže alarm funguje i tam, kde není internet." },
    ],
    detail: {
      heading: "Máte starší Jablotron?",
      paragraphs: [
        "Spousta domů má ještě systém Jablotron Oasis nebo jiný starší alarm. Prověříme, v jakém je stavu, a řekneme vám, jestli dává smysl ho rozšířit, nebo přejít na JABLOTRON 100+.",
        "JABLOTRON 100+ je současný systém výrobce. Ovládá se z klávesnice, dálkovým ovladačem i z aplikace MyJABLOTRON a dá se kdykoli rozšířit o další detektory, sirény nebo ovládání domu.",
        "Ústředna má záložní akumulátor a komunikuje i přes mobilní síť. Při výpadku proudu nebo internetu proto alarm dál hlídá a pošle zprávu.",
      ],
    },
    cleanWork:
      "Bezdrátové detektory, kontakty a sirény se připevní na zeď nebo rám okna. Ústředna a klávesnice potřebují jen napájení. Žádné drážky, prach ani malování.",
    brands: ["Jablotron"],
    faq: [
      {
        q: "Bezdrátový, nebo drátový alarm?",
        a: "Do hotového bytu nebo domu se hodí bezdrátový systém, protože se obejde bez sekání. V novostavbě nebo při rekonstrukci se vyplatí natáhnout sběrnici, prvky pak nepotřebují baterie. Systém JABLOTRON 100+ umí obojí najednou.",
      },
      {
        q: "Funguje alarm při výpadku proudu nebo internetu?",
        a: "Ano. Ústředna má záložní akumulátor a komunikuje přes mobilní síť, takže hlídá a posílá zprávy i bez elektřiny a pevného internetu.",
      },
      {
        q: "Máme psa. Nebude alarm pořád houkat?",
        a: "Nebude. Vybereme detektory a jejich umístění tak, aby je zvíře nespouštělo, případně rozdělíme dům do zón a místnosti, kde se pes pohybuje, necháme volné.",
      },
      {
        q: "Co se stane, když alarm spustí?",
        a: "Rozezní se siréna a do aplikace a na vybraná čísla přijde zpráva. Když je alarm napojený na pult centralizované ochrany, vyjíždí zásahová jednotka.",
      },
      {
        q: "Jde alarm ovládat z mobilu?",
        a: "Ano, v aplikaci MyJABLOTRON. Zapnete a vypnete v ní alarm, uvidíte, kdo a kdy ho ovládal, a můžete ovládat i vrata nebo topení.",
      },
      {
        q: "Rozšíříte alarm, který už máme?",
        a: "Pokud jde o systém JABLOTRON 100 nebo 100+, rozšíření je jednoduché. U starších systémů nejdřív prověříme jejich stav a doporučíme, co se vyplatí.",
      },
    ],
    related: ["kamerove-systemy", "videotelefony-a-pristupove-systemy", "rozvadece"],
    keywords: [
      "alarm Jablotron",
      "Jablotron montáž",
      "zabezpečení domu",
      "zabezpečovací systém",
      "bezdrátový alarm",
      "JABLOTRON 100+",
      "zabezpečení bytu",
      "alarm do firmy",
    ],
  },
  {
    slug: "rozvadece",
    name: "Rozvaděče",
    short: "Výměna starých pojistkových skříní, rozvaděče pro novostavby, FVE a wallboxy.",
    group: "elektro",
    seoTitle: "Výměna a zapojení rozvaděčů, Zábřeh a Olomouc | Hey! Elektro",
    description:
      "Výměna starého rozvaděče za jističe a proudové chrániče, rozvaděče pro novostavby, fotovoltaiku, wallbox a firmy. Přehledné zapojení, popis obvodů a revize.",
    h1: "Elektrické rozvaděče",
    lead: "Vyměníme starou pojistkovou skříň za rozvaděč s jističi a proudovými chrániči, zapojíme rozvaděč pro novostavbu, fotovoltaiku nebo wallbox a každý obvod popíšeme.",
    image: "rozvadec",
    includes: [
      {
        title: "Výměna starého rozvaděče",
        text: "Keramické pojistky nahradíme jističi, doplníme proudové chrániče a přepěťovou ochranu. Dům pak vypíná po obvodech a bezpečně.",
      },
      {
        title: "Rozvaděče pro novostavby",
        text: "Navrhneme a zapojíme domovní rozvaděč s rezervou pro budoucí spotřebiče, ať se za pět let nemusí předělávat.",
      },
      {
        title: "Fotovoltaika, wallbox, tepelné čerpadlo",
        text: "Připravíme rozvaděč na nové velké spotřebiče a zdroje: jištění, chrániče správného typu a místo pro měření.",
      },
      {
        title: "Firemní a průmyslové rozvaděče",
        text: "Rozvaděče pro dílny, provozovny a haly, úpravy stávajících rozvaděčů a doplnění nových vývodů.",
      },
      {
        title: "Popis obvodů a dokumentace",
        text: "Každý jistič popíšeme, aby bylo jasné, co vypíná. Ke všemu dostanete schéma zapojení.",
      },
      {
        title: "Revize po výměně",
        text: "Po zásahu do rozvaděče zajistíme revizi. Dostanete revizní zprávu, kterou chce stavební úřad, banka i pojišťovna.",
      },
    ],
    forWhom: [
      { title: "Starší domy a byty", text: "Pojistky, chybějící chrániče a rozvaděč, do kterého už se nic nevejde." },
      { title: "Novostavby", text: "Domovní rozvaděč navržený podle projektu a s rezervou do budoucna." },
      { title: "Domy s FVE a wallboxem", text: "Úprava rozvaděče pro nové zdroje a spotřebiče včetně přepěťových ochran." },
      { title: "Firmy a provozovny", text: "Úpravy a rozšíření rozvaděčů, nové vývody pro stroje a technologie." },
    ],
    detail: {
      heading: "Kdy je čas rozvaděč vyměnit",
      paragraphs: [
        "Když v rozvaděči najdete keramické pojistky, chybí v něm proudový chránič, jističe často vypadávají nebo se skříň zahřívá, je čas na výměnu. Stejně tak když přidáváte velký spotřebič: indukční desku, tepelné čerpadlo, wallbox nebo fotovoltaiku.",
        "Proudový chránič vypne obvod ve chvíli, kdy proud uniká mimo vedení, například přes tělo člověka. U nových instalací ho norma vyžaduje pro zásuvkové obvody a ve starších domech chybí nejčastěji.",
        "Rozvaděč zapojujeme přehledně: vodiče vedou v žlabech, každý obvod je popsaný a ke všemu je schéma. Kdo rozvaděč otevře po nás, vyzná se v něm.",
      ],
    },
    cleanWork:
      "Nový rozvaděč většinou osadíme na místo starého a napojíme na stávající vedení. Kde je potřeba větší skříň, rozšíříme otvor jen tolik, kolik je nutné.",
    faq: [
      {
        q: "Jak poznám, že potřebuji nový rozvaděč?",
        a: "Typické znaky jsou keramické pojistky, chybějící proudový chránič, jističe, které často vypadávají, a skříň, která hřeje nebo zapáchá. Rozvaděč je také potřeba upravit, když přidáváte velký spotřebič nebo fotovoltaiku.",
      },
      {
        q: "Jak dlouho bude dům bez proudu?",
        a: "Výměna domovního rozvaděče je zpravidla práce na jeden den. Odstávku proudu s vámi domluvíme předem, ať vás nezaskočí.",
      },
      {
        q: "Je po výměně potřeba revize?",
        a: "Ano. Po zásahu do elektroinstalace se dělá revize. Zajistíme ji a dostanete revizní zprávu.",
      },
      {
        q: "Připravíte rozvaděč na fotovoltaiku nebo wallbox?",
        a: "Ano. Doplníme jištění, chrániče správného typu a přepěťovou ochranu a necháme místo pro měření. Wallbox umíme rovnou namontovat.",
      },
      {
        q: "Co je přepěťová ochrana a potřebuji ji?",
        a: "Chrání elektroniku v domě před přepětím z bouřky nebo ze sítě. U domů s hromosvodem, fotovoltaikou nebo drahou technikou ji doporučujeme vždy.",
      },
      {
        q: "Děláte rozvaděče i pro firmy?",
        a: "Ano. Upravujeme a rozšiřujeme rozvaděče v dílnách, provozovnách a halách a zapojujeme nové vývody pro stroje.",
      },
    ],
    related: ["revize-a-hromosvody", "wallboxy", "elektroinstalace"],
    keywords: [
      "výměna rozvaděče",
      "rozvaděč rodinný dům",
      "domovní rozvaděč",
      "zapojení rozvaděče",
      "rozvaděč pro fotovoltaiku",
      "proudový chránič montáž",
      "výměna pojistek za jističe",
    ],
  },
  {
    slug: "elektroinstalace",
    name: "Elektroinstalace",
    short: "Novostavby, rekonstrukce bytů a domů, firemní prostory. Včetně revize.",
    group: "elektro",
    seoTitle: "Elektroinstalace a elektrikář Zábřeh, Olomouc | Hey! Elektro",
    description:
      "Kompletní elektroinstalace pro novostavby, rekonstrukce bytů a domů i firemní prostory. Návrh rozvodů, montáž, příprava pro kamery, alarm a síť, revize.",
    h1: "Elektroinstalace",
    lead: "Kompletní elektroinstalace pro novostavby, rekonstrukce bytů a domů i firemní prostory. Od návrhu rozvodů přes montáž až po revizi.",
    image: "elektroinstalace",
    includes: [
      {
        title: "Novostavby",
        text: "Hrubá instalace podle projektu, kompletace zásuvek, vypínačů a svítidel, rozvaděč a výchozí revize.",
      },
      {
        title: "Rekonstrukce",
        text: "Výměna starých hliníkových rozvodů za měděné, nové okruhy do kuchyně a koupelny, posílení přívodů.",
      },
      {
        title: "Firmy a provozovny",
        text: "Elektroinstalace kanceláří, obchodů, dílen a skladů. Práci naplánujeme tak, aby provoz stál co nejkratší dobu.",
      },
      {
        title: "Osvětlení",
        text: "LED osvětlení interiéru, venkovní světla, osvětlení příjezdu a zahrady se senzorem pohybu.",
      },
      {
        title: "Příprava na kamery, alarm a síť",
        text: "Při stavbě rovnou natáhneme kabely pro kamery, alarm, datovou síť a videotelefon. Později se nic nemusí sekat.",
      },
      {
        title: "Menší práce",
        text: "Nový okruh, přidání zásuvek, výměna vypínačů nebo oprava poruchy. I menší zakázku rádi vezmeme.",
      },
    ],
    forWhom: [
      { title: "Stavebníci", text: "Elektroinstalace novostavby od hrubé instalace po revizi." },
      { title: "Majitelé starších domů a bytů", text: "Rekonstrukce rozvodů, nové okruhy a rozvaděč." },
      { title: "Firmy", text: "Kanceláře, provozovny, dílny a sklady." },
      { title: "Developeři a stavební firmy", text: "Elektro jako subdodávka, koordinace s ostatními profesemi." },
    ],
    detail: {
      heading: "Elektroinstalace, která myslí na kamery a alarm",
      paragraphs: [
        "Kamery, alarm a datovou síť umíme stejně dobře jako silnoproud. Při stavbě nebo rekonstrukci proto rovnou naplánujeme, kudy povedou kabely pro zabezpečení, Wi-Fi a videotelefon.",
        "Kabel natažený v hrubé stavbě stojí zlomek toho, co pozdější sekání do hotových zdí. Když se pro kamery nebo alarm rozhodnete až za pár let, bude všechno připravené.",
        "Staré hliníkové rozvody doporučujeme při rekonstrukci vyměnit za měděné. Hliník časem oxiduje a spoje se uvolňují, což je častá příčina poruch.",
      ],
    },
    cleanWork:
      "U rekonstrukcí hledáme cestu, jak kabely vést s co nejmenším zásahem: podhledy, podlahy, stávající chráničky. Sekáme jen tam, kde to jinak nejde, a po sobě uklidíme.",
    faq: [
      {
        q: "Vyplatí se vyměnit hliníkové rozvody?",
        a: "Při rekonstrukci ano. Hliník časem oxiduje, spoje se uvolňují a zahřívají. Měděné rozvody spolu s novým rozvaděčem a chrániči výrazně zvýší bezpečnost.",
      },
      {
        q: "Kolik stojí elektroinstalace?",
        a: "Cena záleží na rozsahu, počtu okruhů a zvoleném materiálu. Po obhlídce nebo podle projektu vám pošleme nabídku s rozpisem.",
      },
      {
        q: "Zajistíte i revizi?",
        a: "Ano. Po dokončení elektroinstalace zajistíme výchozí revizi a předáme revizní zprávu potřebnou ke kolaudaci.",
      },
      {
        q: "Vezmete i menší zakázku?",
        a: "Ano. Přidání okruhu, nové zásuvky, výměna vypínačů nebo oprava poruchy. Zavolejte a domluvíme se.",
      },
      {
        q: "Spolupracujete se stavební firmou?",
        a: "Ano. Koordinujeme se s ostatními profesemi na stavbě, aby elektro bylo hotové ve správné fázi.",
      },
    ],
    related: ["rozvadece", "revize-a-hromosvody", "datove-site-a-wifi"],
    keywords: [
      "elektroinstalace",
      "elektrikář",
      "elektroinstalace rodinný dům",
      "rekonstrukce elektroinstalace",
      "výměna hliníkových rozvodů",
      "elektroinstalace novostavby",
    ],
  },
  {
    slug: "revize-a-hromosvody",
    name: "Revize a hromosvody",
    short: "Výchozí a pravidelné revize s revizní zprávou. Návrh, montáž a revize hromosvodů.",
    group: "elektro",
    seoTitle: "Revize elektroinstalace a hromosvodů, Zábřeh | Hey! Elektro",
    description:
      "Výchozí a pravidelné revize elektroinstalací a hromosvodů s revizní zprávou pro kolaudaci, prodej nemovitosti i pojišťovnu. Montáž a výměna hromosvodů.",
    h1: "Revize a hromosvody",
    lead: "Výchozí a pravidelné revize elektroinstalací a hromosvodů s revizní zprávou. Hromosvody také navrhneme a namontujeme.",
    image: "revize",
    includes: [
      {
        title: "Výchozí revize",
        text: "Po dokončení nové elektroinstalace nebo její části. Revizní zprávu potřebujete ke kolaudaci.",
      },
      {
        title: "Pravidelné revize",
        text: "Pro domy, byty, firmy a provozovny. Ohlídáme termín další revize a připomeneme se.",
      },
      {
        title: "Revize při prodeji a pronájmu",
        text: "Kupující, banka nebo pojišťovna často chtějí vidět aktuální revizní zprávu. Zajistíme ji rychle.",
      },
      {
        title: "Montáž hromosvodů",
        text: "Návrh a montáž jímací soustavy, svodů a uzemnění na rodinné domy i firemní budovy.",
      },
      {
        title: "Hromosvod a fotovoltaika",
        text: "Panely na střeše mění požadavky na ochranu před bleskem. Hromosvod upravíme tak, aby panely chránil.",
      },
      {
        title: "Odstranění závad",
        text: "Když revize najde závady, dostanete jejich seznam a nabídku na opravu. Po opravě vystavíme novou zprávu.",
      },
    ],
    forWhom: [
      { title: "Stavebníci", text: "Výchozí revize elektroinstalace a hromosvodu ke kolaudaci." },
      { title: "Prodávající a kupující", text: "Aktuální revizní zpráva pro banku, pojišťovnu nebo kupce." },
      { title: "Firmy a provozovny", text: "Pravidelné revize, které jsou pro podnikatele povinné." },
      { title: "Majitelé domů s FVE", text: "Úprava a revize hromosvodu po instalaci panelů." },
    ],
    detail: {
      heading: "Co revize obsahuje",
      paragraphs: [
        "Revizní technik prohlédne rozvaděč i rozvody a změří izolační odpor, impedanci smyčky, spojitost ochranných vodičů a funkci proudových chráničů. Výsledky zapíše do revizní zprávy spolu se závěrem, jestli je instalace bezpečná.",
        "Lhůty pravidelných revizí určuje norma ČSN 33 1500 podle prostředí. Pro běžné obytné prostory je to pět let, ve vlhkých, venkovních nebo prašných prostorech kratší.",
        "U hromosvodu se kontroluje stav jímačů, svodů a spojů a měří se zemní odpor uzemnění. Lhůtu další revize určí revizní technik podle typu objektu.",
      ],
    },
    cleanWork:
      "Revize je hlavně měření a prohlídka. Nic nebouráme, jen potřebujeme přístup k rozvaděči a krátkou odstávku jednotlivých obvodů.",
    faq: [
      {
        q: "Jak často je potřeba revize elektroinstalace?",
        a: "Lhůtu určuje norma ČSN 33 1500 podle prostředí. U běžných obytných prostor je to pět let, ve vlhkých, venkovních nebo prašných prostorech kratší. Firmy mají pravidelné revize jako povinnost.",
      },
      {
        q: "Potřebuji revizi při prodeji domu?",
        a: "Zákon ji při prodeji přímo nevyžaduje, ale kupující, banka nebo pojišťovna ji často chtějí vidět. Aktuální revizní zpráva prodej usnadní.",
      },
      {
        q: "Co když revize najde závady?",
        a: "Dostanete seznam závad a nabídku na jejich odstranění. Po opravě vystavíme novou revizní zprávu.",
      },
      {
        q: "Musí mít rodinný dům hromosvod?",
        a: "Povinnost určuje projekt a stavební předpisy podle typu a polohy stavby. I tam, kde povinný není, hromosvod spolu s přepěťovou ochranou chrání dům i elektroniku uvnitř.",
      },
      {
        q: "Upravíte hromosvod kvůli fotovoltaice?",
        a: "Ano. Navrhneme úpravu jímací soustavy tak, aby panely byly v chráněném prostoru, a hromosvod pak zrevidujeme.",
      },
    ],
    related: ["rozvadece", "elektroinstalace", "wallboxy"],
    keywords: [
      "revize elektroinstalace",
      "revize elektro",
      "revizní zpráva",
      "revize hromosvodu",
      "montáž hromosvodu",
      "hromosvod rodinný dům",
    ],
  },
  {
    slug: "wallboxy",
    name: "Wallboxy",
    short: "Nabíjení elektroauta doma i ve firmě. Posouzení jističe, montáž, řízení výkonu.",
    group: "elektro",
    seoTitle: "Montáž wallboxu pro elektroauto, Zábřeh a Olomouc | Hey! Elektro",
    description:
      "Montáž wallboxů pro rodinné domy a firmy. Posoudíme hlavní jistič, doporučíme výkon, zapojíme jištění a chránič a nastavíme nabíjení z fotovoltaiky.",
    h1: "Wallboxy pro elektroauta",
    lead: "Posoudíme, jaký výkon váš dům unese, doporučíme wallbox a namontujeme ho i s jištěním a chráničem. Nabíjení umíme řídit podle spotřeby domu nebo přetoků z fotovoltaiky.",
    image: "wallbox",
    includes: [
      {
        title: "Posouzení přípojky",
        text: "Zkontrolujeme hlavní jistič a spotřebu domu a doporučíme výkon wallboxu, který se s domem snese.",
      },
      {
        title: "Výběr wallboxu",
        text: "Pro většinu aut stačí 11 kW. Doporučíme model podle auta, místa montáže a toho, jak chcete nabíjení ovládat.",
      },
      {
        title: "Jištění a ochrana",
        text: "Samostatný okruh, jistič a ochrana proti stejnosměrnému unikajícímu proudu, kterou wallbox vyžaduje.",
      },
      {
        title: "Řízení výkonu",
        text: "Wallbox sleduje odběr domu a ubere výkon, když zapnete troubu a pračku. Hlavní jistič nevypadne.",
      },
      {
        title: "Nabíjení z fotovoltaiky",
        text: "Auto může nabíjet hlavně z přebytků vaší elektrárny, místo aby je dům posílal do sítě.",
      },
      {
        title: "Wallboxy pro firmy",
        text: "Více nabíjecích bodů pro služební auta i návštěvy, přístup přes kartu nebo aplikaci.",
      },
    ],
    forWhom: [
      { title: "Rodinné domy", text: "Wallbox do garáže, pod přístřešek nebo na sloupek u vjezdu." },
      { title: "Domy s fotovoltaikou", text: "Nabíjení z přebytků a chytré řízení výkonu." },
      { title: "Firmy", text: "Nabíjení služebních aut a parkoviště pro zákazníky." },
      { title: "Bytové domy", text: "Nabíjecí místa v garážích po dohodě se SVJ." },
    ],
    detail: {
      heading: "11, nebo 22 kW?",
      paragraphs: [
        "Výkon wallboxu omezuje nejen dům, ale i auto. Většina elektroaut nabíjí ze střídavé sítě nejvýše 11 kW, takže silnější wallbox by nebyl rychlejší. Za noc se tak doplní baterie i velkého auta.",
        "Wallbox na 11 kW potřebuje třífázový přívod a jištění 16 A. Pokud je hlavní jistič domu slabší nebo dům má velkou spotřebu, nastavíme řízení výkonu nebo poradíme, jak požádat distributora o navýšení.",
        "Nabíjecí místo musí mít ochranu proti stejnosměrnému unikajícímu proudu. Některé wallboxy ji mají v sobě, jinde přidáme chránič typu B. Na tohle se při levných montážích často zapomíná.",
      ],
    },
    cleanWork:
      "Wallbox dáváme co nejblíž k rozvaděči nebo vedeme kabel garáží, chráničkou ve výkopu nebo po fasádě v liště. Trasu s vámi probereme předem.",
    faq: [
      {
        q: "Jaký wallbox mám vybrat?",
        a: "Pro většinu aut a domů stačí wallbox na 11 kW. Doporučíme konkrétní model podle auta, místa montáže a toho, jestli chcete nabíjet z fotovoltaiky nebo ovládat nabíjení z aplikace.",
      },
      {
        q: "Musím navýšit hlavní jistič?",
        a: "Často ne. Wallbox s řízením výkonu přizpůsobí nabíjení aktuální spotřebě domu. Pokud navýšení dává smysl, poradíme, jak o ně požádat distributora.",
      },
      {
        q: "Můžu mít wallbox venku?",
        a: "Ano. Wallboxy mají krytí pro venkovní montáž. Namontujeme je na fasádu, pod přístřešek nebo na samostatný sloupek.",
      },
      {
        q: "Umí wallbox nabíjet z fotovoltaiky?",
        a: "Ano, když ho propojíme s měničem nebo elektroměrem. Auto pak nabíjí hlavně z přebytků elektrárny.",
      },
    ],
    related: ["rozvadece", "elektroinstalace", "revize-a-hromosvody"],
    keywords: [
      "montáž wallboxu",
      "wallbox",
      "nabíječka elektromobilu domů",
      "nabíjecí stanice rodinný dům",
      "wallbox fotovoltaika",
    ],
  },
  {
    slug: "datove-site-a-wifi",
    name: "Datové sítě a Wi-Fi",
    short: "Kabeláž, datový rozvaděč a Wi-Fi, která pokryje celý dům, zahradu i kancelář.",
    group: "zabezpeceni",
    seoTitle: "Datové sítě a Wi-Fi pro domy a firmy, Zábřeh | Hey! Elektro",
    description:
      "Strukturovaná kabeláž, datový rozvaděč, PoE switch a Wi-Fi přístupové body pro rodinné domy a firmy. Síť navržená i pro kamery a alarm.",
    h1: "Datové sítě a Wi-Fi",
    lead: "Strukturovaná kabeláž, datový rozvaděč a Wi-Fi, která pokryje celý dům, zahradu i kancelář. Síť navrhneme rovnou i pro kamery a alarm.",
    image: "sit",
    includes: [
      {
        title: "Strukturovaná kabeláž",
        text: "Kabely kategorie 6 do každé místnosti, kde budete chtít televizi, počítač nebo přístupový bod.",
      },
      {
        title: "Datový rozvaděč",
        text: "Patch panel, switch a router na jednom místě, přehledně zapojené a popsané.",
      },
      {
        title: "Wi-Fi bez hluchých míst",
        text: "Přístupové body na stropě místo jednoho routeru v rohu. Telefon se mezi nimi přepíná sám a signál nevypadává.",
      },
      {
        title: "Napájení po kabelu",
        text: "Switch s PoE napájí kamery, přístupové body i videotelefon. Méně zásuvek a zdrojů po domě.",
      },
      {
        title: "Oddělené sítě",
        text: "Vlastní síť pro hosty a zvlášť pro kamery a chytrá zařízení. Bezpečnější a přehlednější.",
      },
      {
        title: "Měření a popis",
        text: "Každý kabel proměříme a popíšeme. Víte, která zásuvka vede kam.",
      },
    ],
    forWhom: [
      { title: "Novostavby", text: "Kabeláž do všech místností a datový rozvaděč v technické místnosti." },
      { title: "Stávající domy", text: "Wi-Fi přístupové body a kabely vedené lištami, podhledy nebo půdou." },
      { title: "Kanceláře a provozovny", text: "Pracovní místa, tiskárny, pokladny a Wi-Fi pro zákazníky." },
      { title: "Domy s kamerami", text: "Síť dimenzovaná pro kamerový systém a záznam." },
    ],
    detail: {
      heading: "Proč kabel, když existuje Wi-Fi",
      paragraphs: [
        "Wi-Fi je pohodlná pro telefony a notebooky. Televize, počítač, kamery a přístupové body ale fungují nejlépe po kabelu: rychlost se nemění a nic neruší.",
        "Dobrá Wi-Fi proto stojí na kabelech. Přístupové body na stropě propojené kabelem s datovým rozvaděčem pokryjí celý dům rovnoměrně, včetně terasy a zahrady.",
        "Když síť navrhujeme spolu s kamerami a alarmem, počítáme s jejich datovým tokem i napájením. Všechno pak běží přes jeden přehledný rozvaděč.",
      ],
    },
    cleanWork:
      "Ve stávajících domech vedeme kabely půdou, podhledem, stávajícími chráničkami nebo v lištách. Přístupové body na strop potřebují jen jeden kabel.",
    faq: [
      {
        q: "Kolik přístupových bodů potřebuji?",
        a: "Záleží na velikosti domu, počtu podlaží a materiálu zdí. U běžného patrového domu obvykle jeden na každé podlaží a další na terasu nebo zahradu. Přesně to určíme na obhlídce.",
      },
      {
        q: "Zvládnete síť v hotovém domě bez sekání?",
        a: "Většinou ano. Kabely vedeme půdou, podhledem, stávajícími chráničkami nebo v lištách. Kde kabel natáhnout nejde, použijeme bezdrátové propojení přístupových bodů.",
      },
      {
        q: "Nastavíte i router a Wi-Fi?",
        a: "Ano. Síť předáme nastavenou: Wi-Fi pro vás, síť pro hosty a oddělenou síť pro kamery a chytrá zařízení.",
      },
      {
        q: "Děláte sítě i pro firmy?",
        a: "Ano. Kabeláž pracovních míst, datový rozvaděč, Wi-Fi pro zaměstnance i zákazníky a síť pro kamerový systém.",
      },
    ],
    related: ["kamerove-systemy", "videotelefony-a-pristupove-systemy", "elektroinstalace"],
    keywords: [
      "datové rozvody",
      "strukturovaná kabeláž",
      "wifi pro rodinný dům",
      "datový rozvaděč",
      "wifi pokrytí domu",
    ],
  },
  {
    slug: "videotelefony-a-pristupove-systemy",
    name: "Videotelefony a vstupy",
    short: "Videotelefony s aplikací, čtečky karet, kódové klávesnice a elektrické zámky.",
    group: "zabezpeceni",
    seoTitle: "Videotelefony a přístupové systémy, Zábřeh | Hey! Elektro",
    description:
      "Montáž videotelefonů s aplikací v mobilu, přístupových systémů, čteček karet a elektrických zámků pro rodinné domy, bytové domy a firmy.",
    h1: "Videotelefony a přístupové systémy",
    lead: "Uvidíte, kdo zvoní, a otevřete branku z domu i z telefonu. Pro firmy a bytové domy montujeme čtečky karet, kódové klávesnice a elektrické zámky.",
    image: "videotelefon",
    includes: [
      {
        title: "Videotelefony",
        text: "Venkovní stanice s kamerou u branky a monitor v domě. Hovor přijmete i v telefonu, když nejste doma.",
      },
      {
        title: "Výměna starého zvonku",
        text: "Dvouvodičové videotelefony využijí stávající dva dráty po starém zvonku. Nové kabely nejsou potřeba.",
      },
      {
        title: "Elektrické zámky a otvírače",
        text: "Otvírání branky, vrat a dveří z monitoru, z telefonu nebo kódem.",
      },
      {
        title: "Čtečky karet a čipů",
        text: "Vstup pro zaměstnance nebo obyvatele domu na kartu či čip. Ztracený čip jednoduše zablokujete.",
      },
      {
        title: "Bytové domy",
        text: "Zvonková tabla s videem pro všechny byty a přístup do domu na čip.",
      },
      {
        title: "Propojení s kamerami",
        text: "Venkovní stanice Dahua a Hikvision se zapojí do kamerového systému. Obraz od branky uvidíte i v záznamu.",
      },
    ],
    forWhom: [
      { title: "Rodinné domy", text: "Videotelefon u branky, otvírání z telefonu a propojení s kamerami." },
      { title: "Bytové domy a SVJ", text: "Nová zvonková tabla, monitory v bytech a vstup na čip." },
      { title: "Firmy", text: "Čtečky karet, kódové klávesnice a řízení přístupu do místností." },
      { title: "Penziony a ubytování", text: "Vstup pro hosty kódem bez předávání klíčů." },
    ],
    detail: {
      heading: "Videotelefon bez nových kabelů",
      paragraphs: [
        "U starších domů vede k brance většinou jen dvoužilový kabel ke zvonku. Dvouvodičové videotelefony po něm přenesou obraz, zvuk i napájení, takže výměna obejde bez výkopu.",
        "Videotelefony Dahua a Hikvision se dají propojit s kamerovým systémem stejného výrobce. Venkovní stanice pak funguje i jako další kamera.",
        "Pro firmy a bytové domy navrhneme přístupový systém, ve kterém každý má svůj čip nebo kód. Když se čip ztratí, zablokujete jen ten jeden.",
      ],
    },
    cleanWork:
      "Kde to jde, využijeme stávající kabely po starém zvonku. Nové vedení do domu vedeme chráničkou nebo v liště, bez zbytečného sekání.",
    brands: ["Dahua", "Hikvision"],
    faq: [
      {
        q: "Můžu otevřít branku z mobilu?",
        a: "Ano. Videotelefon s aplikací přepojí hovor do telefonu a branku otevřete tlačítkem, ať jste kdekoli.",
      },
      {
        q: "Musí se kvůli videotelefonu natahovat nové kabely?",
        a: "Většinou ne. Dvouvodičové systémy využijí stávající dva dráty po starém zvonku.",
      },
      {
        q: "Vyměníte zvonkové tablo v bytovém domě?",
        a: "Ano. Navrhneme nové tablo s kamerou, monitory do bytů a vstup na čip. Postup domluvíme se SVJ.",
      },
      {
        q: "Propojí se videotelefon s kamerami?",
        a: "Ano, pokud jsou od stejného výrobce nebo podporují společný standard. Obraz od branky pak uvidíte i v kamerové aplikaci a v záznamu.",
      },
    ],
    related: ["kamerove-systemy", "zabezpeceni-jablotron", "datove-site-a-wifi"],
    keywords: [
      "videotelefon montáž",
      "videotelefon s aplikací",
      "přístupový systém",
      "čtečka karet",
      "elektrický zámek branka",
      "zvonkové tablo bytový dům",
    ],
  },
];

// Pořadí na webu: elektro a zabezpečení střídavě rovnocenně
const ORDER = [
  "elektroinstalace",
  "rozvadece",
  "revize-a-hromosvody",
  "wallboxy",
  "kamerove-systemy",
  "zabezpeceni-jablotron",
  "videotelefony-a-pristupove-systemy",
  "datove-site-a-wifi",
];
export const services: Service[] = ORDER.map((slug) => rawServices.find((s) => s.slug === slug)!);

export const serviceGroups: { id: ServiceGroup; name: string; text: string }[] = [
  { id: "elektro", name: "Elektro", text: "Elektroinstalace, rozvaděče, revize a hromosvody, wallboxy." },
  { id: "zabezpeceni", name: "Zabezpečení a sítě", text: "Kamery Dahua a Hikvision, alarmy Jablotron, videotelefony, datové sítě a Wi-Fi." },
];
export const servicesIn = (g: ServiceGroup) => services.filter((s) => s.group === g);
export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
