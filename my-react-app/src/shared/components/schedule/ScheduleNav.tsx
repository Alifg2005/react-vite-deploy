// Day/Month toggle + prev/next arrows, styled like AdminSchedule's controls.
// The chevron rotation is direction-aware so "previous"/"next" always point
// the right way in both RTL and LTR.

export type ScheduleView = "day" | "week" | "month";

interface ScheduleNavProps {
  view: ScheduleView;
  onViewChange: (view: ScheduleView) => void;
  label: string;
  onPrev: () => void;
  onNext: () => void;
  direction: "rtl" | "ltr";
}

const VIEW_TABS: { value: ScheduleView; label: string }[] = [
  { value: "day", label: "اليوم" },
  { value: "week", label: "الأسبوع" },
  { value: "month", label: "الشهر" },
];

function ChevronIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function ScheduleNav({ view, onViewChange, label, onPrev, onNext, direction }: ScheduleNavProps) {
  const prevRotation = direction === "rtl" ? "" : "rotate-180";
  const nextRotation = direction === "rtl" ? "rotate-180" : "";

  return (
    <div className="mb-5 grid grid-cols-1 items-center gap-3 sm:grid-cols-3">
      <div className="flex items-center gap-1 justify-self-start rounded-lg border border-brand-border p-1">
        {VIEW_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => onViewChange(tab.value)}
            className={`rounded-md px-4 py-1.5 text-sm font-bold transition ${
              view === tab.value ? "bg-brand-main text-white" : "text-brand-muted hover:text-brand-text"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-center justify-self-center gap-3">
        <button
          type="button"
          onClick={onPrev}
          aria-label="السابق"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-border text-brand-text transition hover:bg-brand-light"
        >
          <ChevronIcon className={prevRotation} />
        </button>

        <span className="min-w-36 text-center text-base font-bold text-brand-text">{label}</span>

        <button
          type="button"
          onClick={onNext}
          aria-label="التالي"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-border text-brand-text transition hover:bg-brand-light"
        >
          <ChevronIcon className={nextRotation} />
        </button>
      </div>
    </div>
  );
}

export default ScheduleNav;
