function GradientBanner({ title, subtitle, layout = "column", image, children }) {
  const isRow = layout === "row";

  if (image) {
    return (
      <div
        className="flex min-h-[70vh] flex-col items-center justify-center rounded-2xl border border-brand-border bg-cover bg-center p-10 text-center text-white sm:p-16"
        style={{
          backgroundImage: `linear-gradient(rgba(7,59,76,0.72), rgba(7,59,76,0.55)), url(${image})`,
        }}
      >
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
          <h2 className="text-4xl font-extrabold text-white sm:text-6xl">{title}</h2>
          {subtitle ? <p className="text-lg text-white/90 sm:text-xl">{subtitle}</p> : null}
          {children ? (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">{children}</div>
          ) : null}
        </div>
      </div>
    );
  }

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