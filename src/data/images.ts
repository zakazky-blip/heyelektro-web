// Ilustrační fotografie z Unsplash (Unsplash License: komerční použití povoleno, uvedení autora není povinné).
// Nejsou to fotky z realizací Hey! Elektro. Jakmile firma dodá vlastní fotky, vyměňte soubory a autory.
import type { ImageMetadata } from "astro";
import kameraSoumrak from "../assets/foto/kamera-soumrak.jpg";
import kameraDome from "../assets/foto/kamera-dome.jpg";
import kameryZed from "../assets/foto/kamery-zed.jpg";
import kameryTri from "../assets/foto/kamery-tri.jpg";
import videotelefon from "../assets/foto/videotelefon.jpg";
import rozvadec from "../assets/foto/rozvadec.jpg";
import rozvadecKabely from "../assets/foto/rozvadec-kabely.jpg";
import rozvadecStary from "../assets/foto/rozvadec-stary.jpg";
import elektrikar from "../assets/foto/elektrikar.jpg";
import elektrikarHelma from "../assets/foto/elektrikar-helma.jpg";
import mereni from "../assets/foto/mereni.jpg";
import kleste from "../assets/foto/kleste.jpg";
import blesk from "../assets/foto/blesk.jpg";
import wallbox from "../assets/foto/wallbox.jpg";
import sit from "../assets/foto/sit.jpg";
import dumNoc from "../assets/foto/dum-noc.jpg";
import alarmSirena from "../assets/foto/alarm-sirena.jpg";

export type Photo = { src: ImageMetadata; alt: string; author: string; url: string };

const u = (slug: string) => `https://unsplash.com/photos/${slug}`;

export const photos = {
  hero: { src: kameraSoumrak, alt: "Bezpečnostní kamera na fasádě za soumraku", author: "Alberto Lung", url: u("pDtgBIGa0cM") },
  kamera: { src: kameraDome, alt: "Kupolová kamera na omítce domu", author: "Alan J. Hendry", url: u("KNt4zd8HPb0") },
  kameryZed: { src: kameryZed, alt: "Bezpečnostní kamera na rohu budovy", author: "Victor", url: u("oRZDnS2QkuE") },
  kameryTri: { src: kameryTri, alt: "Dvě kamery na bílé fasádě", author: "Pawel Czerwinski", url: u("OfwiURcZwYw") },
  videotelefon: { src: videotelefon, alt: "Venkovní stanice videotelefonu u vchodu se žlutou stěnou", author: "Bernard Hermant", url: u("A9wbeTxMBeU") },
  rozvadec: { src: rozvadec, alt: "Jističe v domovním rozvaděči s přehledně vedenými vodiči", author: "Mark Kats", url: u("oj1zW_PNI4k") },
  rozvadecKabely: { src: rozvadecKabely, alt: "Otevřený rozvaděč s jističi a barevnými vodiči", author: "Markus Spiske", url: u("kK7uPfb2YWU") },
  rozvadecStary: { src: rozvadecStary, alt: "Starý rozvaděč s keramickými pojistkami na oprýskané zdi", author: "Peter Schulz", url: u("uKtiicv5R38") },
  elektrikar: { src: elektrikar, alt: "Elektrikář zapojuje vodiče v rozvodné skříni", author: "Raze Solar", url: u("GXLPLG3_Vf4") },
  elektrikarHelma: { src: elektrikarHelma, alt: "Elektrikář ve žluté přilbě při montáži", author: "Emmanuel Ikwuegbu", url: u("_2AlIm-F6pw") },
  mereni: { src: mereni, alt: "Měření v rozvaděči zkoušečkou", author: "Toolmash Expo", url: u("PkHf7BUWbtk") },
  kleste: { src: kleste, alt: "Žluté klešťové měřidlo a vodiče", author: "Hobi industri", url: u("NLBJ2I0lNr4") },
  blesk: { src: blesk, alt: "Blesk v noční bouřce", author: "NOAA", url: u("p9BRX1mBfe4") },
  wallbox: { src: wallbox, alt: "Wallbox u vjezdu rodinného domu s nabíjejícím autem", author: "Christian Rebero Twahirwa", url: u("EGKP0FpNSzI") },
  sit: { src: sit, alt: "Patch panel s modrými datovými kabely", author: "Jordan Harrison", url: u("40XgDxBfYXM") },
  dumNoc: { src: dumNoc, alt: "Rodinný dům v noci s rozsvíceným oknem", author: "Vladyslav Melnyk", url: u("IHxTr8c_yh8") },
  alarm: { src: alarmSirena, alt: "Poplachová siréna na cihlové zdi", author: "Eric Prouzet", url: u("tjebwsmrfmY") },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

// Obrázek ke každé službě (klíč Service.image)
export const serviceImage: Record<string, PhotoKey> = {
  kamera: "kamera",
  alarm: "dumNoc",
  rozvadec: "rozvadec",
  elektroinstalace: "elektrikar",
  revize: "kleste",
  wallbox: "wallbox",
  sit: "sit",
  videotelefon: "videotelefon",
};

// Druhá fotka na stránce služby (sekce s podrobnostmi)
export const serviceImage2: Record<string, PhotoKey> = {
  kamera: "kameryTri",
  alarm: "alarm",
  rozvadec: "rozvadecKabely",
  elektroinstalace: "elektrikarHelma",
  revize: "blesk",
  wallbox: "rozvadec",
  sit: "kameryZed",
  videotelefon: "kamera",
};
