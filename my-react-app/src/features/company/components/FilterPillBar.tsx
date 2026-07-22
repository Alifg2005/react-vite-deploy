function FilterPillBar<T extends string>({
  value,
  setValue,
  options,
}: {
  value: T;
  setValue: (value: T) => void;
  options: Array<{ value: T; label: string }>;
}) {
  return (
    <div className="mb-6 flex gap-2 overflow-x-auto">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setValue(option.value)}
          className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${
            value === option.value
              ? 'bg-brand-main text-white'
              : 'bg-brand-light text-brand-text hover:bg-brand-border'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default FilterPillBar;
