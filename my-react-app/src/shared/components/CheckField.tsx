            import type { ChangeEvent } from "react";

interface CheckFieldProps {
  label: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckField({ label, checked, onChange }: CheckFieldProps) {
  return (
    <label className="flex items-center gap-2 text-sm font-semibold text-brand-text">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="accent-brand-main"
      />
      {label}
    </label>
  );
}
