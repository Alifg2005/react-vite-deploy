import { useState } from "react";

// Reusable search-input + pill-filter-buttons row.
// Used by: CurrentActivitiesSection, CompletedList, ReportsPanel,
//          AdminApprovalRequestsSection (filter-only, no search).
//
// Props:
//   search         string            — controlled search value (optional)
//   onSearchChange fn(string)=>void  — called on input change (pass to enable input)
//   searchPlaceholder string         — placeholder text
//   filters        Array<{value, label}>  — filter options
//   activeFilter   string            — currently active filter value
//   onFilterChange fn(value)=>void   — called when a pill is clicked
//   filterLabel    string            — label before pills (default "فلترة:")
export default function FilterBar({
  search,
  onSearchChange,
  searchPlaceholder = "ابحث...",
  filters = [],
  activeFilter,
  onFilterChange,
  filterLabel = "فلترة:",
}) {
  const showSearch = typeof onSearchChange === "function";

  return (
    <div className="flex flex-col gap-3">
      {showSearch ? (
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={searchPlaceholder}
          className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
        />
      ) : null}

      {filters.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-brand-muted">{filterLabel}</span>
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => onFilterChange(filter.value)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                activeFilter === filter.value
                  ? "bg-brand-main text-white"
                  : "bg-brand-white text-brand-muted"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
