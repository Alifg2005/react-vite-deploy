import FilterPills from "./FilterPills";

function SearchFilterBar<T extends string>({
  query,
  setQuery,
  placeholder,
  activeValue,
  setActiveValue,
  options,
}: {
  query: string;
  setQuery: (value: string) => void;
  placeholder: string;
  activeValue: T;
  setActiveValue: (value: T) => void;
  options: Array<{ value: T; label: string }>;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm shadow-sm"
      />

      <FilterPills activeValue={activeValue} setActiveValue={setActiveValue} options={options} />
    </div>
  );
}

export default SearchFilterBar;
