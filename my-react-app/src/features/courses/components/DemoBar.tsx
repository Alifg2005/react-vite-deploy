import { useNavigate } from "react-router-dom";
import { PRODUCTS, PRODUCT_TYPE_LABELS, PROGRAM_DETAILS_DATA } from "../../../mock";
import type { Product } from "../../../mock";

const { demoBar: DEMO_DATA } = PROGRAM_DETAILS_DATA;

interface DemoBarProps {
  product: Product;
}

function DemoBar({ product }: DemoBarProps) {
  const navigate = useNavigate();

  function goToType(type: string) {
    const item = Object.values(PRODUCTS).find((entry) => entry.type === type);
    if (item) navigate(`/program/${item.id}`);
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-brand-border bg-brand-white p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-brand-muted">{DEMO_DATA.label}</span>
        {DEMO_DATA.types.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => goToType(type)}
            className={`rounded-full px-3 py-1 text-xs font-bold transition ${
              type === product.type ? "bg-brand-main text-white" : "bg-brand-white text-brand-muted"
            }`}
          >
            {PRODUCT_TYPE_LABELS[product.type]}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DemoBar;
