import type { CSSProperties } from "react";
import { asset } from "@/data/products";

/** CSS custom properties for a sticker: rotation and entrance delay. */
const v = (r: string, d: string) => ({ "--r": r, "--d": d }) as CSSProperties;

const MONO = "IBM Plex Mono, monospace";
const DISPLAY = "Archivo, sans-serif";

function TeeSticker({ cls, slug, r, d }: { cls: string; slug: string; r: string; d: string }) {
  return (
    <div className={`stk stk--tee ${cls}`} data-stk style={v(r, d)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset(`${slug}-back-sm.webp`)} alt="" width={600} height={600} draggable={false} />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="drop" data-label="The Drop" data-num="00">
      <div className="hero__meta" data-reveal>
        <span>E-Cell IIM Kozhikode</span>
        <span>Merch × Dhanda &apos;26</span>
        <span className="hide-sm">5 tees · 220 GSM · front + back</span>
      </div>

      <h1 className="sr-only">E-Cell IIM Kozhikode — Merch × Dhanda &apos;26</h1>
      <div className="banner" id="banner">
        <div className="banner__word" aria-hidden="true">
          <span className="bw bw--1">Merch</span>
          <span className="bw bw--2"><b>×</b>Dhanda<em>’26</em></span>
        </div>

        {/* tee stickers: the real designs, die-cut */}
        <TeeSticker cls="t1" slug="higher-ed" r="-9deg" d=".05s" />
        <TeeSticker cls="t2" slug="dancing-gods" r="8deg" d=".12s" />
        <TeeSticker cls="t3" slug="beach-please" r="7deg" d=".19s" />
        <TeeSticker cls="t4" slug="stfu" r="-6deg" d=".26s" />
        <TeeSticker cls="t5" slug="dil-dhan-drama" r="13deg" d=".33s" />

        {/* 220 GSM badge */}
        <div className="stk stk--gsm" data-stk style={v("12deg", ".5s")} aria-label="220 GSM fabric">
          <svg viewBox="0 0 200 200" aria-hidden="true">
            <defs><path id="gsmRing" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" /></defs>
            <circle cx="100" cy="100" r="96" fill="#F4C6CF" />
            <circle cx="100" cy="100" r="58" fill="none" stroke="#5A1620" strokeWidth="2" strokeDasharray="3 5" />
            <text fontFamily={MONO} fontSize="15" fontWeight="500" letterSpacing="3.2" fill="#5A1620">
              <textPath href="#gsmRing">220 GSM · FABRIC · 220 GSM · FABRIC ·</textPath>
            </text>
            <text x="100" y="108" textAnchor="middle" fontFamily={DISPLAY} fontWeight="900" fontStretch="62%" fontSize="58" fill="#5A1620">220</text>
            <text x="100" y="132" textAnchor="middle" fontFamily={MONO} fontWeight="500" fontSize="15" letterSpacing="4" fill="#5A1620">GSM</text>
          </svg>
        </div>

        {/* E-Cell starburst */}
        <div className="stk stk--burst" data-stk style={v("-12deg", ".58s")} aria-label="E-Cell IIM Kozhikode">
          <svg viewBox="0 0 200 200" aria-hidden="true">
            <polygon fill="#0E2850" points="100,4 116,36 150,18 152,56 190,58 170,90 198,112 162,126 176,162 138,158 128,196 100,172 72,196 62,158 24,162 38,126 2,112 30,90 10,58 48,56 50,18 84,36" />
            <text x="100" y="98" textAnchor="middle" fontFamily={DISPLAY} fontWeight="900" fontStretch="62%" fontSize="44" fill="#F4EFE6">E-CELL</text>
            <text x="100" y="126" textAnchor="middle" fontFamily={MONO} fontWeight="500" fontSize="15" letterSpacing="3" fill="#9DB9D3">IIM K</text>
          </svg>
        </div>

        {/* tagline tape */}
        <div className="stk stk--tape" data-stk style={v("-4deg", ".66s")}>
          <span>Wear <em>the work.</em></span>
        </div>

        {/* count pill */}
        <div className="stk stk--pill" data-stk style={v("5deg", ".72s")}>
          <span>5 tees</span><span>front + back</span>
        </div>

        {/* ace of hearts */}
        <div className="stk stk--ace" data-stk style={v("-14deg", ".8s")} aria-hidden="true">
          <svg viewBox="0 0 100 140">
            <rect x="2" y="2" width="96" height="136" rx="9" fill="#FBF8F2" stroke="#0E2850" strokeWidth="3" />
            <text x="13" y="30" fontFamily={DISPLAY} fontWeight="800" fontSize="24" fill="#C0303A">A</text>
            <path fill="#C0303A" d="M50 104 C20 82 18 60 32 52 C42 46 50 54 50 60 C50 54 58 46 68 52 C82 60 80 82 50 104 Z" />
            <text x="87" y="124" fontFamily={DISPLAY} fontWeight="800" fontSize="24" fill="#C0303A" textAnchor="end" transform="rotate(180 80 116)">A</text>
          </svg>
        </div>

        {/* bolt */}
        <div className="stk stk--bolt" data-stk style={v("16deg", ".86s")} aria-hidden="true">
          <svg viewBox="0 0 80 120">
            <path d="M48 3 L8 68 H36 L26 117 L72 46 H44 Z" fill="#9DB9D3" stroke="#131311" strokeWidth="4" strokeLinejoin="round" />
          </svg>
        </div>

        {/* flame */}
        <div className="stk stk--flame" data-stk style={v("-8deg", ".92s")} aria-hidden="true">
          <svg viewBox="0 0 100 130">
            <path d="M52 4 C58 30 86 44 86 80 C86 108 68 126 48 126 C26 126 12 108 14 84 C16 62 30 56 32 38 C42 48 44 58 42 70 C54 58 58 34 52 4 Z" fill="#C2381F" stroke="#131311" strokeWidth="4" strokeLinejoin="round" />
            <path d="M50 66 C56 80 68 86 66 102 C64 114 56 118 49 118 C40 118 33 110 34 100 C35 88 46 86 50 66 Z" fill="#F2B23D" />
          </svg>
        </div>

        {/* rupee coin */}
        <div className="stk stk--coin" data-stk style={v("10deg", ".98s")} aria-hidden="true">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="#E4B547" stroke="#131311" strokeWidth="4" />
            <circle cx="50" cy="50" r="34" fill="none" stroke="#131311" strokeWidth="2" strokeDasharray="2 4" />
            <text x="50" y="66" textAnchor="middle" fontFamily={DISPLAY} fontWeight="800" fontSize="44" fill="#131311">₹</text>
          </svg>
        </div>

        <p className="banner__hint mono" aria-hidden="true">Stickers move — go on.</p>
      </div>

      <div className="hero__foot">
        <p className="hero__tag" data-reveal>Built for the ones <em>who build.</em></p>
        <a className="cta cta--line" href="#merch" data-reveal>
          Explore the drop <span className="cta__arrow" aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
