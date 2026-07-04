import { useRole } from "../context/RoleContext";
import { DASHBOARD_DATA } from "../data/dashboardData";

export default function Sidebar() {
  const { role, section, setSection } = useRole();
  const dashboard = DASHBOARD_DATA[role];

  return (
    <aside className="hidden min-h-[calc(100vh-120px)] w-64 shrink-0 flex-col bg-[linear-gradient(180deg,var(--c-hero-end),var(--c-hero-middle),var(--c-hero-start))] px-4 py-6 text-white md:flex">
      <nav className="flex flex-1 flex-col gap-3">
        {dashboard.sections.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setSection(item.key)}
            className={`rounded-xl px-5 py-3 text-right text-lg font-bold transition ${
              section === item.key
                ? "bg-white text-brand-main"
                : "text-white hover:bg-white/15"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="rounded-xl bg-white/15 px-5 py-4 text-base font-bold text-white">
        {dashboard.title}
      </div>
    </aside>
  );
}