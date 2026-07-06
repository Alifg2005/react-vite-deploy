import { useNavigate } from "react-router-dom";

import StarRating from "./StarRating";
import { PRODUCT_TYPE_LABELS, STATUS_LABELS } from "../data/productData";

const STATUS_STYLES = {
  open: "bg-emerald-100 text-emerald-700",
  soon: "bg-amber-100 text-amber-700",
  full: "bg-rose-100 text-rose-700",
  closed: "bg-brand-light text-brand-muted",
};

export default function ProductCard({ product, progress }) {
  const navigate = useNavigate();

  // When progress is passed in, this card represents the viewer's own
  // enrollment (dashboard "current activities"), so the status badge
  // should reflect that instead of the product's general catalogue status.
  const isEnrolled = typeof progress === "number";

  // free products show "مجاني", everything else shows the actual amount
  const costLabel = product.pricing.isFree
    ? "مجاني"
    : `${product.pricing.price.toLocaleString("en-US")} ${product.pricing.currency}`;

  // duration comes from the facts list (label "المدة") if present
  const durationFact = product.facts?.find((fact) => fact.label === "المدة");

  const teacher = product.instructor?.name;

  const isComplete = progress >= 100;
  const enrolledLabel = isComplete ? "تم الانتهاء" : "قيد التقدم";
  const enrolledStyle = isComplete ? STATUS_STYLES.open : STATUS_STYLES.soon;

  return (
    <button
      type="button"
      onClick={() => navigate(`/program/${product.id}`)}
      className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-brand-border bg-brand-white text-right transition hover:shadow-lg"
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
              isEnrolled ? enrolledStyle : STATUS_STYLES[product.status] ?? STATUS_STYLES.closed
            }`}
          >
            {isEnrolled ? enrolledLabel : STATUS_LABELS[product.status] ?? product.status}
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

        {teacher && !isEnrolled ? (
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-main text-xs font-bold text-white">
              {teacher.trim().charAt(0)}
            </span>
            <span className="text-xs font-bold text-brand-text">{teacher}</span>
          </div>
        ) : null}

        {!isEnrolled ? (
          <StarRating value={product.rating.average} count={product.rating.count} />
        ) : null}

        {/* footer row: duration + cost (cost hidden once enrolled) */}
        <div className="mt-auto flex items-center justify-between border-t border-brand-border pt-3">
          {durationFact ? (
            <span className="text-xs text-brand-muted">{durationFact.value}</span>
          ) : (
            <span className="text-xs text-brand-muted">—</span>
          )}

          {!isEnrolled ? (
            <span className="text-sm font-bold text-brand-text">{costLabel}</span>
          ) : null}
        </div>

        {isEnrolled ? (
          <div>
            <div className="mb-1 flex items-center justify-between text-[11px] font-bold text-brand-muted">
              <span>نسبة الإنجاز</span>
              <span className="text-brand-main">{progress}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-brand-light">
              <div
                className="h-full rounded-full bg-brand-main"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </button>
  );
}