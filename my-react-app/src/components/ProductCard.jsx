import { useNavigate } from "react-router";

import StarRating from "./StarRating";
import { PRODUCT_TYPE_LABELS, STATUS_LABELS } from "../data/productData";

const STATUS_STYLES = {
  open: "bg-emerald-100 text-emerald-700",
  soon: "bg-amber-100 text-amber-700",
  full: "bg-rose-100 text-rose-700",
  closed: "bg-brand-light text-brand-muted",
};

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  // Cost display rules:
  // - free products show "مجاني"
  // - competitions hide cost entirely (usually free / prize-based)
  const showCost = product.type !== "competition";
  const costLabel = product.pricing.isFree
    ? "مجاني"
    : `${product.pricing.price.toLocaleString("en-US")} ${product.pricing.currency}`;

  // duration comes from the facts list (label "المدة") if present
  const durationFact = product.facts?.find((fact) => fact.label === "المدة");

  const teacher = product.instructor?.name;

  return (
    <button
      type="button"
      onClick={() => navigate(`/program/${product.id}`)}
      className="flex flex-col overflow-hidden rounded-2xl border border-brand-border bg-brand-white text-right transition hover:shadow-lg"
    >
      {/* cover / placeholder */}
      <div className="relative h-36 w-full bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))]">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-white/80">
            {product.title.trim().charAt(0)}
          </div>
        )}

        {/* badges float on the cover */}
        <div className="absolute inset-x-3 top-3 flex items-center justify-between">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-brand-main">
            {PRODUCT_TYPE_LABELS[product.type]}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              STATUS_STYLES[product.status] ?? STATUS_STYLES.closed
            }`}
          >
            {STATUS_LABELS[product.status] ?? product.status}
          </span>
        </div>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="mb-1 line-clamp-2 text-base font-bold text-brand-text">
            {product.title}
          </h3>
          {product.tagline ? (
            <p className="line-clamp-1 text-xs text-brand-muted">{product.tagline}</p>
          ) : null}
        </div>

        <p className="text-xs text-brand-muted">{product.provider}</p>

        {teacher ? (
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-main text-xs font-bold text-white">
              {teacher.trim().charAt(0)}
            </span>
            <span className="text-xs font-bold text-brand-text">{teacher}</span>
          </div>
        ) : null}

        <StarRating value={product.rating.average} count={product.rating.count} />

        {/* footer row: duration + cost */}
        <div className="mt-auto flex items-center justify-between border-t border-brand-border pt-3">
          {durationFact ? (
            <span className="text-xs text-brand-muted">{durationFact.value}</span>
          ) : (
            <span className="text-xs text-brand-muted">—</span>
          )}

          {showCost ? (
            <span className="text-sm font-bold text-brand-text">{costLabel}</span>
          ) : (
            <span className="text-xs font-bold text-brand-main">مشاركة مجانية</span>
          )}
        </div>
      </div>
    </button>
  );
}