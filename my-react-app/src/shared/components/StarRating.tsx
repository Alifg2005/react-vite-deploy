interface StarProps {
  filled: boolean;
}

function Star({ filled }: StarProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 ${filled ? "text-amber-400" : "text-brand-border"}`}
      fill="currentColor"
    >
      <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 18.9 6.1 21.5l1.2-6.5L2.5 9.4l6.6-.9z" />
    </svg>
  );
}

interface StarRatingProps {
  value?: number;
  count?: number;
  size?: "sm" | "lg";
  /** Set when placed on a colored/gradient surface (e.g. the hero banner) —
   * brand-text/brand-muted are tuned for the white/light-card surface and
   * lose contrast there. */
  onDark?: boolean;
}

export default function StarRating({ value = 0, count, size = "sm", onDark = false }: StarRatingProps) {
  const rounded = Math.round(value);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star key={n} filled={n <= rounded} />
        ))}
      </div>

      <span className={`font-bold ${onDark ? "text-white" : "text-brand-text"} ${size === "lg" ? "text-base" : "text-sm"}`}>
        {value.toFixed(1)}
      </span>

      {typeof count === "number" ? (
        <span className={`text-xs ${onDark ? "text-white/80" : "text-brand-muted"}`}>({count} تقييم)</span>
      ) : null}
    </div>
  );
}
