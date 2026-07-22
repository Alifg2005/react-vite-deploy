import { COURSE_CATALOGUE_DATA } from "../../../mock";

const { searchPlaceholder, typeLabel, statusLabel, typeFilters, statusFilters } =
  COURSE_CATALOGUE_DATA.filters;

interface CatalogueFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  typeFilter: string;
  onTypeChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
}

function CatalogueFilters({
  search,
  onSearchChange,
  typeFilter,
  onTypeChange,
  statusFilter,
  onStatusChange,
}: CatalogueFiltersProps) {
  return (
    <div className="flex flex-col gap-4 border-brand-border bg-brand-light p-4">
      <input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder={searchPlaceholder}
        className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-3 text-sm"
      />

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-brand-muted">{typeLabel}</span>
          {typeFilters.map((filter) => (
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
          <span className="text-xs font-bold text-brand-muted">{statusLabel}</span>
          {statusFilters.map((filter) => (
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

export default CatalogueFilters;
