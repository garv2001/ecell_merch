import { DROP, PRODUCTS } from "@/data/products";

export default function About() {
  return (
    <section className="about" id="about" data-label="About" data-num={String(PRODUCTS.length + 2).padStart(2, "0")}>
      <p className="eyebrow" data-reveal>About the drop</p>
      <p className="about__text" data-reveal>
        Designed by students, for students. Five shirts made from the in-jokes, late nights and coastline of{" "}
        <em>IIM Kozhikode</em> — by E-Cell, for the ones who build.
      </p>
      <dl className="about__facts" data-reveal>
        <div><dt>Designs</dt><dd>{String(PRODUCTS.length).padStart(2, "0")}</dd></div>
        <div><dt>Prints</dt><dd>Front + back</dd></div>
        <div><dt>Fabric</dt><dd>{DROP.fabric}</dd></div>
        <div><dt>Edition</dt><dd>Dhanda &apos;26</dd></div>
      </dl>
      <footer className="foot">
        <span>E-Cell IIM Kozhikode</span>
        <span>Merch × Dhanda &apos;26</span>
        <a href="#drop">Back to top ↑</a>
      </footer>
    </section>
  );
}
