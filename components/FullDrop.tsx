/* eslint-disable @next/next/no-img-element */
import { DROP, PRODUCTS } from "@/data/products";

const pad = (n: number) => String(n).padStart(2, "0");

export default function FullDrop() {
  return (
    <section className="full" id="lineup-section" data-label="The Full Drop" data-num={pad(PRODUCTS.length + 1)}>
      <div className="full__head">
        <p className="eyebrow" data-reveal>The full drop</p>
        <h2 className="full__title">
          <span className="line"><span>Five tees.</span></span>
          <span className="line"><span>One <em>campus.</em></span></span>
        </h2>
      </div>

      <div className="lineup" id="lineup">
        {PRODUCTS.map((p, i) => (
          <a key={p.id} href={`#p-${p.id}`}>
            <figure data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
              <img
                src={p.images.backSm || p.images.back}
                srcSet={`${p.images.backSm} 600w, ${p.images.back} 1200w`}
                sizes="(max-width: 760px) 50vw, 32vw"
                alt={`${p.name} tee, back`}
                width={600} height={600} loading="lazy" decoding="async"
              />
              <figcaption>{pad(i + 1)} — {p.name}</figcaption>
            </figure>
          </a>
        ))}
      </div>

      <div className="full__foot">
        <p className="full__q" data-reveal>Which one&apos;s <em>yours?</em></p>
        <div className="full__ctas" data-reveal>
          {DROP.orderUrl && (
            <a className="cta cta--solid" href={DROP.orderUrl} target="_blank" rel="noopener">
              Order now <span className="cta__arrow" aria-hidden="true">→</span>
            </a>
          )}
          <a className="cta cta--line" href="#merch">
            Explore again <span className="cta__arrow" aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </section>
  );
}
