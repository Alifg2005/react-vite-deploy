import { useRole } from "../context/RoleContext";
import { DASHBOARD_DATA } from "../data/dashboardData";

// Student's dashboard sidebar is trimmed to the 3 core content types —
// المشاريع/الشهادات/الإعدادات stay reachable elsewhere (profile menu,
// always-visible dashboard sections) instead of cluttering the nav.
const STUDENT_SIDEBAR_KEYS = ["courses", "camps", "contests"];

export default function Sidebar() {
  const { role, section, setSection } = useRole();
  const dashboard = DASHBOARD_DATA[role];

  const items =
    role === "student"
      ? dashboard.sections.filter((item) => STUDENT_SIDEBAR_KEYS.includes(item.key))
      : dashboard.sections;

  return (
    <aside className="hidden w-64 shrink-0 flex-col gap-4 rounded-2xl border border-brand-border bg-brand-white p-4 md:flex">
      <nav className="flex flex-col gap-1">
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setSection(item.key)}
            className={`rounded-xl px-4 py-3 text-right text-sm font-bold transition ${
              section === item.key
                ? "bg-brand-main text-white"
                : "text-brand-text hover:bg-brand-light"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="rounded-xl bg-brand-light px-4 py-3 text-sm font-bold text-brand-muted">
        {dashboard.title}
      </div>
    </aside>
  );
}