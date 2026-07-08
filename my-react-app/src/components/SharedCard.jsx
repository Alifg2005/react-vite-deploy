// The reusable section wrapper: no longer a boxed container itself — it just
// provides the consistent header (title/badge/subtitle/actions) and lets the
// page background show through, so visual weight lives in the small cards
// inside it, not in this wrapper.
function SharedCard({ title, subtitle, description, badge, actions, className = "", children }) {
  const text = subtitle ?? description;
  const hasHeader = Boolean(title || badge || actions);

  return (
    <div className={className}>
      {hasHeader ? (
        <div className="mb-4 flex flex-wrap bg-items-start justify-between gap-3 sm:mb-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              {title ? <h3 className="text-xl font-bold text-brand-text">{title}</h3> : null}
              {badge ? (
                <span className="shrink-0 rounded-full bg-brand-main px-2.5 py-0.5 text-[11px] font-bold text-white">
                  {badge}
                </span>
              ) : null}
            </div>
            {text ? <p className="text-sm text-brand-muted">{text}</p> : null}
          </div>

          {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
        </div>
      ) : null}

      {children}
    </div>
  );
}

export default SharedCard;