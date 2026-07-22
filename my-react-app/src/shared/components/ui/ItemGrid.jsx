// Merges FeatureCardGrid and StatsGrid.
//
// variant="feature"  (default) — icon + title + description cards
//   items: Array<{ icon, title, description }>
//
// variant="stats"              — value + label stat boxes
//   items: Array<{ value, label }>
//
// cols prop overrides the default column count per variant.
export default function ItemGrid({ items = [], variant = "feature", cols, className = "" }) {
  const defaultCols =
    variant === "stats"
      ? "grid-cols-2 lg:grid-cols-4"
      : "sm:grid-cols-2 lg:grid-cols-4";

  const colClass = cols ?? defaultCols;

  if (variant === "stats") {
    return (
      <div className={`grid gap-4 sm:gap-5 ${colClass} ${className}`}>
        {items.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1 rounded-xl border border-brand-border bg-brand-white p-5 text-center shadow-sm transition hover:shadow-md sm:p-6"
          >
            <span className="text-xl font-bold text-brand-main sm:text-2xl">{stat.value}</span>
            <span className="text-xs font-bold text-brand-muted sm:text-sm">{stat.label}</span>
          </div>
        ))}
      </div>
    );
  }

  // variant === "feature"
  return (
    <div className={`grid gap-4 sm:gap-5 ${colClass} ${className}`}>
      {items.map((item) => (
        <article
          key={item.title}
          className="flex h-full flex-col items-start gap-2 rounded-xl border border-brand-border bg-brand-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-main text-lg text-white">
            {item.icon}
          </span>
          <h4 className="text-base font-bold text-brand-text">{item.title}</h4>
          <p className="text-sm leading-relaxed text-brand-muted">{item.description}</p>
        </article>
      ))}
    </div>
  );
}
