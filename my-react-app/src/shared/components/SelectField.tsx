import type { ChangeEvent } from "react";

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

export default function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-brand-text">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-brand-border bg-brand-white px-4 py-3 text-sm outline-none focus:border-brand-main"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
