import { useRole } from "../context/RoleContext";
import { DASHBOARD_DATA } from "../data/dashboardData";
import LanguageToggle from "./LanguageToggle";
import UserMenu from "./UserMenu";

export default function Topbar() {
  const { role } = useRole();

  const dashboard = DASHBOARD_DATA[role] ?? DASHBOARD_DATA.student;
  const sections = dashboard.sections ?? [];

  return (
    <header className="w-full bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] px-6 py-5 text-white shadow-md">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-right">
          <img
            src="/CAPSULE_TAHAWUL.png"
            alt="Capsule Tahawul"
            className="h-20 w-auto object-contain"
          />

          <div>
            <h1 className="text-2xl font-bold text-white">كبسولة تحول</h1>

            <p className="mt-1 w-fit rounded-full bg-white/20 px-3 py-1 text-sm font-bold text-white">
             {dashboard.title}
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-2 rounded-2xl bg-white/15 p-2">
          {sections.map((item, index) => (
            <button
              key={item.key}
              type="button"
              className={`rounded-xl px-7 py-3 text-lg font-bold transition ${
                index === 0
                  ? "bg-white text-brand-main"
                  : "text-white hover:bg-white/15"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}