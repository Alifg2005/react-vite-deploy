function StatsGrid({ stats = [] }) {
  return (
    <div className="grid grid-cols-2 gap-3 rounded-2xl border border-brand-border bg-brand-white p-4 sm:p-6 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center gap-1 rounded-xl bg-brand-light p-4 text-center"
        >
          <span className="text-xl font-bold text-brand-main sm:text-2xl">{stat.value}</span>
          <span className="text-xs font-bold text-brand-muted sm:text-sm">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

export default StatsGrid;