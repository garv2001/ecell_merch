import { PRODUCTS } from "@/data/products";

export default function Ticker() {
  const names = [...PRODUCTS, ...PRODUCTS].map((p, i) => <span key={i}>{p.name}</span>);
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">{names}</div>
    </div>
  );
}
