const STATUS_FILTERS = [
  { value: "all", label: "كل الحالات" },
  { value: "open", label: "متاح الآن" },
  { value: "soon", label: "قريباً" },
];

// Only the student-visible types belong in the catalogue filter.
const TYPE_FILTERS = [
  { value: "all", label: "كل الأنواع" },
  { value: "course", label: "دورات" },
  { value: "camp", label: "معسكرات" },
  { value: "competition", label: "مسابقات" },
];

export default function CatalogueFilters({
  search,
  onSearchChange,
  typeFilter,
  onTypeChange,
  statusFilter,
  onStatusChange,
}) {
  return (
    <div className="flex flex-col gap-4 border-brand-border bg-brand-light p-4">
      <input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="ابحث باسم البرنامج أو المدرب..."
        className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-3 text-sm"
      />

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-brand-muted">النوع:</span>
          {TYPE_FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => onTypeChange(filter.value)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                typeFilter === filter.value
                  ? "bg-brand-main text-white"
                  : "bg-brand-white text-brand-muted"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-brand-muted">الحالة:</span>
          {STATUS_FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => onStatusChange(filter.value)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                statusFilter === filter.value
                  ? "bg-brand-main text-white"
                  : "bg-brand-light text-brand-muted"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}