function FilterPills<T extends string>({
  activeValue,
  setActiveValue,
  options,
}: {
  activeValue: T;
  setActiveValue: (value: T) => void;
  options: Array<{ value: T; label: string }>;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setActiveValue(option.value)}
          className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
            activeValue === option.value ? "bg-brand-main text-white" : "bg-brand-white text-brand-muted"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default FilterPills;
