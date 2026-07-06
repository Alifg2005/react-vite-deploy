function SectionCard({ title, subtitle, children }) {
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-white p-4 sm:p-6">
      {title ? (
        <div className="mb-4 flex flex-col gap-1">
          <h3 className="text-lg font-bold text-brand-text sm:text-xl">{title}</h3>
          {subtitle ? <p className="text-sm text-brand-muted">{subtitle}</p> : null}
        </div>
      ) : null}

      {children}
    </div>
  );
}

export default SectionCard;