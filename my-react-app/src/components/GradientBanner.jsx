function GradientBanner({ title, subtitle, layout = "column", children }) {
  const isRow = layout === "row";

  return (
    <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-6 text-white sm:p-8">
      <div
        className={`flex flex-col gap-6 ${
          isRow ? "md:flex-row md:items-center md:justify-between" : ""
        }`}
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{title}</h2>
          {subtitle ? <p className="text-sm text-white/85 sm:text-base">{subtitle}</p> : null}
        </div>

        {children ? (
          <div className="flex flex-wrap items-center gap-3">{children}</div>
        ) : null}
      </div>
    </div>
  );
}

export default GradientBanner;