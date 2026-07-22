function StatCard({ stat }) {
  return (
    <article className="rounded-xl border border-brand-border bg-brand-white px-4 py-3 shadow-sm">
      <span className="mb-1 block text-sm text-brand-muted">{stat.label}</span>
      <strong className="text-2xl text-brand-text">{stat.value}</strong>
      <p className="mt-1 text-xs text-brand-muted">{stat.helper}</p>
    </article>
  );
}

export default StatCard;
