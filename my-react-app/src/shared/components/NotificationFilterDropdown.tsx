// NotificationFilterDropdown.tsx — multi-select filter used on every
// notifications page (student/trainer/company/admin), for both the "type" and
// "status" filters. Opens a checklist of colored pills instead of a plain
// <select>, so a user can filter by more than one value at once.

import { useState } from "react";

export interface NotificationFilterOption {
  value: string;
  label: string;
  // Tailwind bg-*/text-* classes for the pill, e.g. "bg-sky-100 text-sky-700".
  style: string;
}

export interface NotificationFilterDropdownProps {
  options: NotificationFilterOption[];
  selected: string[];
  onToggle: (value: string) => void;
  buttonLabel: string;
  panelTitle: string;
}

export default function NotificationFilterDropdown({
  options,
  selected,
  onToggle,
  buttonLabel,
  panelTitle,
}: NotificationFilterDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex shrink-0 items-center gap-1.5 rounded-lg border border-brand-border bg-brand-white px-3 py-2 text-sm font-bold text-brand-text"
      >
        {buttonLabel}
        <svg
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
          className={`h-3.5 w-3.5 transition-transform ${open ? "-rotate-90" : "rotate-90"}`}
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>

      {open ? (
        <div className="absolute inset-e-0 top-full z-20 mt-2 w-56 rounded-xl border border-brand-border bg-brand-white p-3 text-start shadow-lg">
          <p className="mb-2 border-b border-brand-border pb-2 text-sm font-bold text-brand-main">{panelTitle}</p>
          <div className="flex flex-col gap-2.5">
            {options.map((option) => (
              <label key={option.value} className="flex cursor-pointer items-center justify-between gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${option.style}`}>{option.label}</span>
                <input
                  type="checkbox"
                  checked={selected.includes(option.value)}
                  onChange={() => onToggle(option.value)}
                  className="h-4 w-4 rounded border-brand-border text-brand-main focus:ring-brand-main"
                />
              </label>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
