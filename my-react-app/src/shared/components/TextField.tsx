import type { ChangeEvent } from "react";

interface TextFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
}

function TextField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  readOnly = false,
}: TextFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-brand-text">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        readOnly={readOnly}
        className={`w-full rounded-xl border border-brand-border px-4 py-3 text-sm outline-none ${
          readOnly
            ? "bg-brand-light text-brand-muted"
            : "bg-brand-white focus:border-brand-main"
        }`}
      />
    </div>
  );
}

export default TextField;
