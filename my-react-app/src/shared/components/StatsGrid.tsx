interface Stat {
  label: string;
  value: string;
}

interface StatsGridProps {
  stats?: Stat[];
}

function StatsGrid({ stats = [] }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
      {stats.map((stat) => (
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

export default StatsGrid;
