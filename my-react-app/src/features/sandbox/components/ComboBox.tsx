import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { comboBoxActionRegistry } from './comboBoxActions';

export function ComboBox({
  label,
  placeholder,
  width = "w-full max-w-md",
  opt1,
  opt2,
  opt3,
  opt4,
  opt5,
  opt6,
  onSelect,
}: {
  label?: string;
  placeholder?: string;
  width?: string;
  opt1?: string;
  opt2?: string;
  opt3?: string;
  opt4?: string;
  opt5?: string;
  opt6?: string;
  onSelect?: (value: string) => void;
}) {
  const navigate = useNavigate();

  // Filter out any options that were left blank/undefined, keeping each
  // option paired with its (optional) action name.
  const allOptions: { label?: string; action?: string }[] = [
    { label: opt1, action: action1 },
    { label: opt2, action: action2 },
    { label: opt3, action: action3 },
    { label: opt4, action: action4 },
    { label: opt5, action: action5 },
    { label: opt6, action: action6 },
  ];
  const options = allOptions.filter(
    (option): option is { label: string; action?: string } => Boolean(option.label)
  );

  // If placeholder exists, default to empty string ("").
  // Otherwise, default to opt1 (or empty string if opt1 isn't provided).
  const initialValue = placeholder ? "" : opt1 || "";

  // Fallback text if placeholder prop is empty but label exists
  const defaultPlaceholderText = label ? `اختر ${label}` : "اختر...";

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>(initialValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string, action?: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onSelect?.(option);
  };

  const displayText = selectedValue || placeholder || defaultPlaceholderText;

  return (
    <div className={`flex ${width} flex-col gap-1 text-right`} dir="rtl" ref={dropdownRef}>
      {/* Label renders ONLY if provided */}
      {label && (
        <label className="text-sm font-bold text-brand-text">
          {label}
        </label>
      )}

      {/* Select Box */}
      <div className="relative w-full">
        {/* Custom trigger box matching native design */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-xl border border-brand-border bg-brand-white px-4 py-2.5 text-sm text-brand-text outline-none transition focus:border-brand-main focus:ring-1 focus:ring-brand-main"
        >
          <span className={!selectedValue ? "text-brand-muted" : ""}>
            {displayText}
          </span>

          {/* Custom Chevron Arrow on the Left */}
          <div className="pointer-events-none text-brand-muted">
            <svg
              className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </button>

        {/* Custom options container providing exact height & padding */}
        {isOpen && (
          <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-brand-border bg-brand-white py-1 shadow-lg">
            {placeholder && (
              <div
                onClick={() => handleSelect("")}
                className="cursor-pointer px-4 py-2.5 text-sm text-brand-muted transition hover:bg-brand-light"
              >
                {placeholder || defaultPlaceholderText}
              </div>
            )}
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(option.label, option.action)}
                className={`cursor-pointer px-4 py-2.5 text-sm leading-normal text-brand-text transition hover:bg-brand-light ${
                  selectedValue === option.label ? "bg-brand-light font-semibold" : ""
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}