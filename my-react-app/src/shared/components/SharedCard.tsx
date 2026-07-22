import type { ReactNode } from "react";

interface SharedCardProps {
  // content
  title?: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  actions?: ReactNode;
  children?: ReactNode;

  // image
  img?: string;
  imgAlt?: string;
  imgPosition?: "top" | "middle";
  imgHeight?: string;
  imgFit?: string;
  imgClassName?: string;

  // visual container
  boxed?: boolean;
  rounded?: string;
  shadow?: string;

  // padding — shorthand first, then per-side overrides
  padding?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingStart?: string;
  paddingEnd?: string;

  // inner spacing
  headerGap?: string;
  headerBottom?: string;
  imgGap?: string;
  actionsGap?: string;

  // escape hatch
  className?: string;

  // unused legacy prop (kept for API compatibility)
  hero?: boolean;
}

function SharedCard({
  title,
  subtitle,
  description,
  badge,
  actions,
  children,

  img = "",
  imgAlt = "",
  imgPosition = "top",
  imgHeight = "h-48",
  imgFit = "object-cover",
  imgClassName = "",

  boxed = false,
  rounded = "rounded-2xl",
  shadow = "shadow-sm",

  padding = "p-5 sm:p-6",
  paddingTop = "",
  paddingBottom = "",
  paddingStart = "",
  paddingEnd = "",

  headerGap = "gap-1",
  headerBottom = "mb-4 sm:mb-6",
  imgGap = "mb-4",
  actionsGap = "gap-2",

  className = "",
}: SharedCardProps) {
  const text = subtitle ?? description;
  const hasHeader = Boolean(title || badge || actions);

  const paddingClasses = [padding, paddingTop, paddingBottom, paddingStart, paddingEnd]
    .filter(Boolean)
    .join(" ");

  // When the image is flush at the top we need overflow-hidden on the root so
  // the image respects the card's rounded corners, but padding only starts
  // after the image — so we split into two elements.
  const isTopImage = Boolean(img) && imgPosition === "top";
  const isMidImage = Boolean(img) && imgPosition === "middle";

  const rootClasses = [
    boxed
      ? `border border-brand-border bg-brand-white ${rounded} ${shadow}`
      : "",
    // overflow-hidden only when top image, so corners clip correctly
    isTopImage ? "overflow-hidden" : "",
    // When top image, padding goes on the inner wrapper below, not the root
    boxed && !isTopImage ? paddingClasses : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  const imageEl = img ? (
    <img
      src={img}
      alt={imgAlt}
      className={`w-full ${imgHeight} ${imgFit} ${imgClassName}`.trim()}
    />
  ) : null;

  const headerEl = hasHeader ? (
    <div className={`flex flex-wrap items-start justify-between gap-3 ${headerBottom}`}>
      <div className={`flex flex-col ${headerGap}`}>
        <div className="flex items-center gap-2">
          {title ? (
            <h3 className="text-xl font-bold text-brand-text">{title}</h3>
          ) : null}

          {badge ? (
            <span className="shrink-0 rounded-full bg-brand-main px-2.5 py-0.5 text-[11px] font-bold text-white">
              {badge}
            </span>
          ) : null}
        </div>

        {text ? (
          <p className="text-sm text-brand-muted">{text}</p>
        ) : null}
      </div>

      {actions ? (
        <div className={`flex flex-wrap items-center ${actionsGap}`}>{actions}</div>
      ) : null}
    </div>
  ) : null;

  // Top-image layout: image is flush, then a padded inner wrapper holds the
  // header and children.
  if (isTopImage) {
    return (
      <div className={rootClasses}>
        {imageEl}
        <div className={boxed ? paddingClasses : ""}>
          {headerEl}
          {children}
        </div>
      </div>
    );
  }

  // Default layout (no image, or middle image).
  return (
    <div className={rootClasses}>
      {headerEl}
      {isMidImage ? <div className={imgGap}>{imageEl}</div> : null}
      {children}
    </div>
  );
}

export default SharedCard;
