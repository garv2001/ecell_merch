/* ============================================================
   MERCH × DHANDA '26 — EDIT EVERYTHING HERE
   ------------------------------------------------------------
   • name / line / colourway — plain text, swap freely
   • price — leave "" to hide it, or set e.g. "549"
   • images — front + back of the tee (transparent .webp, square),
       stored in /public/assets. *Sm = lighter copies for phones
   • background / backgroundSm — the tee's own campaign backdrop
   • frames — OPTIONAL real 360° photo sequence (24–36 shots in
       rotation order). When present the viewer switches to it:
       frames: ["beach/01.webp", "beach/02.webp", ...]  (in /public/assets)
   • theme — colours used over that backdrop
       fg = main text, muted = small labels, accent = hover colour,
       plate = soft panel behind text, bar = phone browser bar colour,
       bgPos = which part of the backdrop stays visible on narrow screens
   ============================================================ */

export type Theme = {
  bg: string;
  bar: string;
  fg: string;
  muted: string;
  accent: string;
  plate: string;
  bgPos: string;
};

export type Product = {
  id: string;
  name: string;
  line: string;
  colourway: string;
  price: string;
  images: { front: string; frontSm: string; back: string; backSm: string };
  background: string;
  backgroundSm: string;
  frames: string[];
  theme: Theme;
};

export const DROP = {
  /** Google Form for orders. Every "Order" link/button points here. "" hides them. */
  orderUrl: "https://forms.gle/cmNSX7h2BLbV2FqC7",
  currency: "₹",
  fabric: "220 GSM",
};

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
/** Path to a file in /public/assets, respecting basePath (GitHub Pages). */
export const asset = (file: string) => `${base}/assets/${file}`;

const tee = (slug: string) => ({
  front: asset(`${slug}-front.webp`),
  frontSm: asset(`${slug}-front-sm.webp`),
  back: asset(`${slug}-back.webp`),
  backSm: asset(`${slug}-back-sm.webp`),
});

export const PRODUCTS: Product[] = [
  {
    id: "beach-please",
    name: "Beach Please",
    line: "Coastal MBA Club on the chest. The full IIM Kozhikode crest on the back.",
    colourway: "Off-white",
    price: "",
    images: tee("beach-please"),
    background: asset("beach-please-bg.webp"),
    backgroundSm: asset("beach-please-bg-sm.webp"),
    frames: [],
    theme: { bg: "#7E9DB8", bar: "#5F84A6", fg: "#15253A", muted: "#33475F", accent: "#9E2B2B", plate: "rgba(243, 233, 216, .72)", bgPos: "0% 50%" },
  },
  {
    id: "higher-ed",
    name: "Higher Education Got Me Psyched",
    line: "Just roll it. The back says the rest.",
    colourway: "Black",
    price: "",
    images: tee("higher-ed"),
    background: asset("higher-ed-bg.webp"),
    backgroundSm: asset("higher-ed-bg-sm.webp"),
    frames: [],
    theme: { bg: "#9C9B98", bar: "#6E6D6A", fg: "#121211", muted: "#3B3A37", accent: "#3F7A2E", plate: "rgba(236, 232, 225, .8)", bgPos: "50% 50%" },
  },
  {
    id: "dancing-gods",
    name: "Dancing Gods",
    line: "Flame of Resistance up front. Malabar's dancing gods, in full fire, across the back.",
    colourway: "Black",
    price: "",
    images: tee("dancing-gods"),
    background: asset("dancing-gods-bg.webp"),
    backgroundSm: asset("dancing-gods-bg-sm.webp"),
    frames: [],
    theme: { bg: "#F1EDE7", bar: "#F1EDE7", fg: "#1C1414", muted: "#6A3A36", accent: "#8E1F1F", plate: "rgba(244, 240, 234, .7)", bgPos: "100% 50%" },
  },
  {
    id: "stfu",
    name: "S.T.F.U",
    line: "Give MBA your best shot. Then play your cards right.",
    colourway: "Navy",
    price: "",
    images: tee("stfu"),
    background: asset("stfu-bg.webp"),
    backgroundSm: asset("stfu-bg-sm.webp"),
    frames: [],
    theme: { bg: "#E9E3D6", bar: "#E9E3D6", fg: "#0E2850", muted: "#3E4F6E", accent: "#B8323A", plate: "rgba(246, 242, 234, .82)", bgPos: "50% 50%" },
  },
  {
    id: "dil-dhan-drama",
    name: "Dil, Dhan and Drama",
    line: "Paisa. Gaadi. Mehenga ghar. Self-funded.",
    colourway: "Blush",
    price: "",
    images: tee("dil-dhan-drama"),
    background: asset("dil-dhan-drama-bg.webp"),
    backgroundSm: asset("dil-dhan-drama-bg-sm.webp"),
    frames: [],
    theme: { bg: "#120B0E", bar: "#120B0E", fg: "#F8E8EC", muted: "#D9B5BF", accent: "#E7A2B5", plate: "rgba(18, 11, 14, .55)", bgPos: "50% 50%" },
  },
];
