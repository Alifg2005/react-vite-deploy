export function Banner({
  title,
  description,
  footer,
}: {
  title: string;
  description: string;
  footer?: string;
}) {
  return (
    <div
      dir="rtl"
      className="flex w-full flex-col items-start justify-center gap-2.5 rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-right text-white"
    >
      {/* Main Title */}
      <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
        {title}
      </h2>

      {/* Description */}
      <p className="text-sm font-normal opacity-90 md:text-base">
        {description}
      </p>

      {/* Footer / Extra Info (e.g., Working Hours) */}
      {footer && (
        <div className="mt-1 flex items-center gap-1.5 text-xs font-light opacity-80 md:text-sm">
          <span>{footer}</span>
        </div>
      )}
    </div>
  );
}