function FeatureCardGrid({ items = [] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <article
          key={item.title}
          className="flex flex-col items-start gap-2 rounded-xl border border-brand-border bg-brand-light p-4"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-main text-lg text-white">
            {item.icon}
          </span>
          <h4 className="text-base font-bold text-brand-text">{item.title}</h4>
          <p className="text-sm text-brand-muted">{item.description}</p>
        </article>
      ))}
    </div>
  );
}

export default FeatureCardGrid;