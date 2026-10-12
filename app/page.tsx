import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import ProductSection from "@/components/ProductSection";
import FullDrop from "@/components/FullDrop";
import About from "@/components/About";
import Interactions from "@/components/Interactions";
import { PRODUCTS } from "@/data/products";

export default function Page() {
  return (
    <>
      <div className="progress" aria-hidden="true"><span /></div>
      <div className="cursor" aria-hidden="true"><span>Drag</span></div>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <div id="merch">
          {PRODUCTS.map((p, i) => (
            <ProductSection key={p.id} product={p} index={i} total={PRODUCTS.length} />
          ))}
        </div>
        <FullDrop />
        <About />
      </main>
      <Interactions />
    </>
  );
}
