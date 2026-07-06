import { useNavigate } from "react-router-dom";

const FILTER_CATEGORIES = [
  { key: "courses", label: "الدورات" },
  { key: "camps", label: "المعسكرات" },
  { key: "competitions", label: "المسابقات" },
  { key: "projects", label: "المشاريع" },
  { key: "certificates", label: "الشهادات" },
  { key: "settings", label: "الإعدادات" },
];

function FilterTabs({ className = "" }) {
  return (
    <div className={className}>
      {FILTER_CATEGORIES.map((item, index) => (
        <button
          key={item.key}
          type="button"
          className={`shrink-0 rounded-lg px-4 py-2 text-sm font-bold transition sm:px-5 sm:text-base ${
            index === 0
              ? "bg-white text-brand-main"
              : "text-white hover:bg-white/15"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function FilterActions({ className = "" }) {
  const navigate = useNavigate();
  return (
    <div className={className}>
      <button
        type="button"
        className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-brand-main transition hover:opacity-90"
        onClick={() => navigate("/dashboard")}
      >
        لوحة الطالب
      </button>

      <span className="flex items-center gap-1 rounded-lg bg-white/15 px-3 py-2 text-sm font-bold text-white">
        AR <span className="text-xs">▾</span>
      </span>

      <div className="flex items-center gap-2">
        <span className="hidden text-sm font-bold text-white sm:inline">
          سارة العتيبي
        </span>
        <span className="h-9 w-9 shrink-0 rounded-full border border-dashed border-white/50 bg-white/20" />
      </div>
    </div>
  );
}

function CatalogueFilterBar() {
  return (
    <section
      aria-label="فلترة المحتوى"
      className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-3 shadow-sm sm:p-4"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <FilterTabs className="flex flex-wrap items-center justify-center gap-2 overflow-x-auto rounded-xl bg-white/15 p-2 md:flex-1 md:flex-nowrap md:justify-start" />
        <FilterActions className="flex items-center justify-center gap-3 md:justify-end" />
      </div>
    </section>
  );
}

export default CatalogueFilterBar;