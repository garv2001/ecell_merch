/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";
import { DROP, type Product } from "@/data/products";

const pad = (n: number) => String(n).padStart(2, "0");
const TEE_SIZES = "(max-width: 760px) 100vw, (max-width: 1100px) 720px, 50vw";

export default function ProductSection({ product: p, index, total }: { product: Product; index: number; total: number }) {
  const n = pad(index + 1);
  const t = p.theme;
  const style = {
    "--bg": t.bg, "--fg": t.fg, "--muted": t.muted, "--accent": t.accent, "--plate": t.plate || "transparent",
  } as CSSProperties;

  return (
    <section
      className={"product" + (index % 2 ? " product--flip" : "")}
      id={`p-${p.id}`}
      style={style}
      data-label={p.name}
      data-num={n}
      data-theme={t.bar || t.bg}
    >
      {p.background && (
        <img
          className="product__bg"
          src={p.background}
          srcSet={`${p.backgroundSm || p.background} 1200w, ${p.background} 2527w`}
          sizes="100vw"
          alt=""
          loading="lazy"
          decoding="async"
          style={{ objectPosition: t.bgPos || "50% 50%" }}
        />
      )}
      <span className="product__ghost" aria-hidden="true">{n}</span>
      <div className="product__top" data-reveal>
        <span>{n} / {pad(total)}</span>
        <span>Merch × Dhanda ’26</span>
      </div>

      <div className="viewer" data-viewer={index} data-frames={p.frames.length ? JSON.stringify(p.frames) : undefined} data-reveal>
        <div
          className="viewer__stage"
          tabIndex={0}
          role="img"
          aria-roledescription="360° viewer"
          aria-label={`${p.name} tee. Drag, swipe or use arrow keys to rotate.`}
        >
          {p.frames.length ? (
            <img className="viewer__frame" src={p.frames[0]} alt={`${p.name} tee, 360° view`} width={1200} height={1200} loading="lazy" decoding="async" draggable={false} />
          ) : (
            <div className="viewer__spin">
              <img
                className="viewer__face viewer__face--front"
                src={p.images.front}
                srcSet={`${p.images.frontSm} 600w, ${p.images.front} 1200w`}
                sizes={TEE_SIZES}
                alt={`${p.name} tee, front`}
                width={1200} height={1200} loading="lazy" decoding="async" draggable={false}
              />
              <img
                className="viewer__face viewer__face--back"
                src={p.images.back}
                srcSet={`${p.images.backSm} 600w, ${p.images.back} 1200w`}
                sizes={TEE_SIZES}
                alt={`${p.name} tee, back`}
                width={1200} height={1200} loading="lazy" decoding="async" draggable={false}
              />
            </div>
          )}
          <div className="viewer__floor" />
        </div>
        <div className="viewer__ui">
          <span className="viewer__hint"><b data-deg>000°</b> Drag to rotate ↔</span>
          <div className="viewer__toggle" role="group" aria-label="Show side">
            <button type="button" data-face="front" aria-pressed="true">Front</button>
            <button type="button" data-face="back" aria-pressed="false">Back</button>
          </div>
        </div>
      </div>

      <div className="product__info">
        <h2 className="product__name"><span className="line"><span>{p.name}</span></span></h2>
        <p className="product__line" data-reveal>{p.line}</p>
        {p.price && (
          <div className="product__row" data-reveal>
            <div className="product__price"><small>Price</small>{DROP.currency}{p.price}</div>
          </div>
        )}
        <p className="product__meta" data-reveal>
          <span>{p.colourway}</span>
          {DROP.fabric && <span>{DROP.fabric}</span>}
          <span>Front + back print</span>
        </p>
      </div>
    </section>
  );
}
