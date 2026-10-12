import { DROP } from "@/data/products";

const orderProps = { href: DROP.orderUrl, target: "_blank", rel: "noopener" };

export default function Nav() {
  return (
    <>
      <header className="nav" id="nav">
        <a className="nav__brand" href="#drop" aria-label="E-Cell Merch, back to top">
          E-CELL <i>|</i> MERCH
        </a>
        <span className="nav__where" aria-live="polite">
          <b id="whereNum">00</b> <span id="whereLabel">The Drop</span>
        </span>
        <nav className="nav__links" aria-label="Primary">
          <a href="#drop">Drop</a>
          <a href="#merch">Merch</a>
          <a href="#about">About</a>
          {DROP.orderUrl && <a className="nav__order" {...orderProps}>Order</a>}
        </nav>
        <button className="nav__burger" aria-label="Open menu" aria-expanded="false" aria-controls="menu">
          <span /><span />
        </button>
      </header>

      <div className="menu" id="menu" hidden>
        <nav aria-label="Mobile">
          <a href="#drop"><small>01</small>Drop</a>
          <a href="#merch"><small>02</small>Merch</a>
          <a href="#about"><small>03</small>About</a>
          {DROP.orderUrl && <a {...orderProps}><small>04</small>Order</a>}
        </nav>
        <p className="menu__foot">E-Cell IIM Kozhikode — Merch × Dhanda &apos;26</p>
      </div>
    </>
  );
}
