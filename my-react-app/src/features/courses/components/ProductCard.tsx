import { useState } from "react";
import { useNavigate } from "react-router-dom";

import StarRating from "../../../shared/components/StarRating";
import { PRODUCT_TYPE_LABELS, STATUS_LABELS } from "../../../mock";
import type { ProductStatus } from "../../../mock";

const STATUS_STYLES: Record<string, string> = {
  open: "bg-emerald-100 text-emerald-700",
  soon: "bg-amber-100 text-amber-700",
  full: "bg-rose-100 text-rose-700",
  closed: "bg-brand-light text-brand-muted",
};

// Pulls the video id out of a youtube.com/watch?v=... URL and builds a
// muted, controls-free embed for an ambient hover preview — null for any
// other URL shape (or none), so the cover just falls back to the still image.
// Clipped to the first minute (start=0&end=60), looping within that range.
function getYouTubeEmbedUrl(url?: string): string | null {
  const id = url?.match(/[?&]v=([^&]+)/)?.[1];
  if (!id) return null;
  return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&start=0&end=60&controls=0&modestbranding=1&rel=0`;
}

export interface ProductCardProps {
  // Shaped by the still-untyped productData.jsx catalogue (or the preview
  // object ProgramManagement.tsx builds from in-progress form values), so
  // it's intentionally left as `any` rather than duplicating that shape here.
  product: any;
  progress?: number;
  showRating?: boolean;
  // Height of the cover image — defaults to h-36 everywhere (catalogue,
  // dashboard) except call sites that opt into a taller preview.
  coverClassName?: string;
}

export default function ProductCard({ product, progress, showRating = true, coverClassName = "h-36" }: ProductCardProps) {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const previewEmbedUrl = getYouTubeEmbedUrl(product.introVideoUrl);

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

  const isComplete = (progress ?? 0) >= 100;
  const enrolledLabel = isComplete ? "تم الانتهاء" : "قيد التقدم";
  const enrolledStyle = isComplete ? STATUS_STYLES.open : STATUS_STYLES.soon;

  function goToProgram() {
    navigate(`/program/${product.id}`);
  }

  return (
    // A plain div (not <button>) because the hover preview below renders an
    // <iframe> — interactive content isn't valid inside a <button>, and a
    // nested focusable iframe would fight the button for keyboard/AT focus.
    // role="button" + the handlers below keep it equally operable.
    <div
      role="button"
      tabIndex={0}
      onClick={goToProgram}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          goToProgram();
        }
      }}
      className="flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-brand-border text-right transition hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-main"
    >
      {/* cover / placeholder */}
      <div
        className={`relative w-full bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] ${coverClassName}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
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

        {isHovering && previewEmbedUrl ? (
          <iframe
            src={previewEmbedUrl}
            title={`معاينة ${product.title}`}
            className="absolute inset-0 h-full w-full"
            style={{ pointerEvents: "none" }}
            tabIndex={-1}
            aria-hidden="true"
            allow="autoplay; encrypted-media"
          />
        ) : null}

        {/* badges float on the cover */}
        <div className="absolute inset-x-3 top-3 flex items-center justify-between">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-brand-main">
            {PRODUCT_TYPE_LABELS[product.type]}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              isEnrolled ? enrolledStyle : STATUS_STYLES[product.status as ProductStatus] ?? STATUS_STYLES.closed
            }`}
          >
            {isEnrolled ? enrolledLabel : STATUS_LABELS[product.status as ProductStatus] ?? product.status}
          </span>
        </div>
      </div>

      {/* body — pulled up over the cover and semi-transparent so the image
          shows through behind the text */}
      <div className="relative z-10 -mt-3 flex flex-1 flex-col gap-3 rounded-t-2xl bg-brand-white/25 p-4 backdrop-blur-sm">
        <div>
          <h3 className="mb-1 line-clamp-2 text-sm font-bold text-brand-text">
            {product.title}
          </h3>
          {product.tagline ? (
            <p className="line-clamp-1 text-xs text-brand-muted">{product.tagline}</p>
          ) : null}
        </div>

        <p className="text-sm font-bold text-brand-text">{product.provider}</p>

        {teacher && !isEnrolled ? (
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-main text-xs font-bold text-white">
              {teacher.trim().charAt(0)}
            </span>
            <span className="text-xs font-bold text-brand-text">{teacher}</span>
          </div>
        ) : null}

        {!isEnrolled && showRating ? (
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
    </div>
  );
}
