// Problesknutí při kliknutí: drobný elektrický výboj v místě kliku a odlesk přes tlačítko.
// Čistě dekorativní. Vrstva nepřijímá události a při prefers-reduced-motion se nic nespouští.
const reduce = matchMedia("(prefers-reduced-motion: reduce)");
const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
// Do textových polí klikáme kvůli psaní, tam by jiskra jen rušila.
const SKIP = "input:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=button]), textarea, select, [contenteditable]";
// Světlé a žluté plochy dostanou tmavou jiskru, jinak by nebyla vidět.
const LIGHT = ".fsec, .pcta, .on-paper, .faq--paper";

let layer: HTMLDivElement | null = null;
let live = 0;

const getLayer = () => {
  if (!layer?.isConnected) {
    layer = document.createElement("div");
    layer.className = "spk-layer";
    layer.setAttribute("aria-hidden", "true");
    document.body.append(layer);
  }
  return layer;
};

// Pohyb s výrazným ease-out, vyhasínání zvlášť a pomaleji, aby výboj nezmizel dřív, než ho oko zachytí.
const move = (node: Element, from: string, to: string, duration: number, o0 = 1) => [
  node.animate([{ transform: from }, { transform: to }], { duration, easing: EASE, fill: "forwards" }),
  node.animate([{ opacity: o0 }, { opacity: o0, offset: 0.3 }, { opacity: 0 }], { duration, easing: "ease-in", fill: "forwards" }), // taste-skill-ignore: vyhasínání dekorace, ne UI přechod
];

const el = (cls: string) => {
  const i = document.createElement("i");
  i.className = cls;
  return i;
};

// Klikatá čára (blesk) z nuly do vzdálenosti r pod úhlem a.
const boltPath = (a: number, r: number) => {
  const pts: string[] = ["M0 0"];
  for (let k = 1; k <= 3; k++) {
    const t = (k / 3) * r;
    const j = k === 3 ? 0 : (k % 2 ? 1 : -1) * (3 + Math.random() * 3);
    pts.push(`L${(Math.cos(a) * t - Math.sin(a) * j).toFixed(1)} ${(Math.sin(a) * t + Math.cos(a) * j).toFixed(1)}`);
  }
  return pts.join(" ");
};

function burst(x: number, y: number, dark: boolean) {
  if (live > 5) return;
  live++;
  const root = el(dark ? "spk spk--dark" : "spk");
  root.style.transform = `translate(${x}px, ${y}px)`;

  const core = el("spk__core");
  const ring = el("spk__ring");
  root.append(core, ring);
  const anims = [
    ...move(core, "scale(.4)", "scale(1.6)", 380),
    ...move(ring, "scale(.25)", "scale(1)", 560, 0.9),
  ];

  const n = 7;
  const off = Math.random() * Math.PI * 2;
  for (let i = 0; i < n; i++) {
    const deg = ((off + (i / n) * Math.PI * 2) * 180) / Math.PI + (Math.random() - 0.5) * 24;
    const d = 24 + Math.random() * 20;
    const ray = el("spk__ray");
    root.append(ray);
    anims.push(...move(ray, `rotate(${deg}deg) translateX(5px) scaleX(1)`, `rotate(${deg}deg) translateX(${d}px) scaleX(.2)`, 400 + Math.random() * 160));
  }

  // Dva krátké blesky, které problesknou a zhasnou.
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "spk__bolts");
  svg.setAttribute("viewBox", "-40 -40 80 80");
  for (let b = 0; b < 2; b++) {
    const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttribute("d", boltPath(off + b * Math.PI + (Math.random() - 0.5), 30 + Math.random() * 8));
    p.setAttribute("pathLength", "1");
    svg.append(p);
    anims.push(p.animate(
      [
        { strokeDashoffset: 1, opacity: 1 },
        { strokeDashoffset: 0, opacity: 1, offset: 0.35 },
        { strokeDashoffset: 0, opacity: 0.2, offset: 0.5 },
        { strokeDashoffset: 0, opacity: 0.9, offset: 0.62 },
        { strokeDashoffset: 0, opacity: 0 },
      ],
      { duration: 420, easing: "linear", fill: "forwards", delay: b * 40 },
    ));
  }
  root.append(svg);

  getLayer().append(root);
  Promise.all(anims.map((a) => a.finished)).catch(() => {}).finally(() => { root.remove(); live--; });
}

function zap(btn: HTMLElement) {
  btn.classList.remove("is-zap");
  void btn.offsetWidth; // restart animace při rychlém opakovaném kliku
  btn.classList.add("is-zap");
}

let lastType = "mouse";
const fire = (e: MouseEvent) => {
  if (reduce.matches) return;
  const t = e.target as Element | null;
  if (!t || !(t instanceof Element) || t.closest(SKIP)) return;
  burst(e.clientX, e.clientY, !!t.closest(LIGHT));
  const btn = t.closest<HTMLElement>(".btn");
  if (btn) zap(btn);
};

// Myš: hned při stisku. Dotyk: až při ťuknutí (click), aby jiskra nevznikala při posouvání stránky.
document.addEventListener("pointerdown", (e) => {
  lastType = e.pointerType;
  if (e.pointerType === "mouse" && e.button === 0) fire(e);
}, { passive: true });
document.addEventListener("click", (e) => {
  if (lastType !== "mouse" && e.detail > 0) fire(e);
});
document.addEventListener("animationend", (e) => {
  if (e.animationName === "btn-zap") (e.target as HTMLElement).classList.remove("is-zap");
});
