import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";

/**
 * Small inline icon set so the sidebar has no extra dependency.
 * Each entry is a 24x24 stroke-based path.
 */
const ICON_PATHS = {
  home: "M3 11.5 12 4l9 7.5M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9",
  course: "M4 6.5A2.5 2.5 0 0 1 6.5 4H20v14H6.5A2.5 2.5 0 0 0 4 20.5V6.5Z M4 6.5V20.5",
  camp: "M12 4 3 20h18L12 4Z M12 11l4 9M12 11 8 20",
  trophy:
    "M7 4h10v4a5 5 0 0 1-10 0V4Z M7 6H4v1a4 4 0 0 0 3.5 4M17 6h3v1a4 4 0 0 1-3.5 4M9.5 18h5M12 13v5",
  activity: "M3 12h4l2 7 4-14 2 7h6",
  blog: "M4 4h11l5 5v11H4V4Z M9 12h7M9 16h7M9 8h3",
  dashboard: "M4 4h7v7H4V4Z M13 4h7v4h-7V4Z M13 11h7v9h-7v-9Z M4 14h7v6H4v-6Z",
  profile: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M4 20c1.6-3.6 5-5.5 8-5.5s6.4 1.9 8 5.5",
  logout: "M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4M15 16l4-4-4-4M19 12H9",
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "M6 6l12 12M18 6 6 18",
  chevron: "M15 5 8 12l7 7",
};

function Icon({ name, className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

const ROLE_LABELS = {
  guest: "زائر",
  student: "طالب",
  coach: "مدرب",
  company: "شركة",
  admin: "مسؤول",
};

// Base links every signed-in role sees, plus role-specific extras.
// Adjust the `path` values to match your actual router once wired up.
function getNavItems(role) {
  const base = [
    { label: "الرئيسية", path: "/", icon: "home" },
    { label: "الدورات", path: "/courses?type=course", icon: "course" },
    { label: "المعسكرات", path: "/courses?type=camp", icon: "camp" },
    { label: "المسابقات", path: "/courses?type=competition", icon: "trophy" },
  ];

  const byRole = {
    student: [{ label: "الأنشطة الحالية", path: "/activities", icon: "activity" }],
    coach: [{ label: "الأنشطة الحالية", path: "/activities", icon: "activity" }],
    company: [{ label: "الأنشطة الحالية", path: "/activities", icon: "activity" }],
    admin: [],
    guest: [],
  };

  return [...base, ...(byRole[role] ?? []), { label: "المدونة", path: "/blog", icon: "blog" }];
}

/**
 * Left-hand navigation sidebar.
 * - Desktop (md+): stays in normal flow, can collapse to an icon rail.
 * - Mobile (<md): becomes an off-canvas drawer, opened with a floating
 *   toggle button and closed by tapping the backdrop, the close icon,
 *   the Escape key, or navigating to a new route.
 *
 * Props:
 *  - items?: override the auto-generated, role-based nav items.
 */
function Sidebar({ items }) {
  const { role, setRole } = useRole();
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false); // desktop icon-rail mode
  const [mobileOpen, setMobileOpen] = useState(false); // mobile drawer

  const navItems = items ?? getNavItems(role);
  const dashboardPath = "/dashboard";
  const profilePath = "/profile";

  // Close the mobile drawer automatically whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  // Close on Escape, and lock background scroll while the drawer is open.
  useEffect(() => {
    if (!mobileOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") setMobileOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function goTo(path) {
    navigate(path);
    setMobileOpen(false);
  }

  function isActive(path) {
    const [base] = path.split("?");
    return base === "/" ? location.pathname === "/" : location.pathname.startsWith(base);
  }

  function handleLogout() {
    setRole?.("guest");
    setMobileOpen(false);
    navigate("/login");
  }

  return (
    <>
      {/* Mobile toggle button — stays visible even while the drawer is closed */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="فتح القائمة"
        className="fixed top-4 right-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-brand-border bg-brand-white text-brand-text shadow-md md:hidden"
      >
        <Icon name="menu" />
      </button>

      {/* Backdrop, mobile only */}
      {mobileOpen ? (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          aria-hidden="true"
        />
      ) : null}

      <aside
        className={`
          fixed inset-y-0 right-0 z-40 flex h-full flex-col border-brand-border bg-brand-white
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}
          w-72 border-l shadow-xl
          md:static md:h-auto md:translate-x-0 md:shadow-none md:border md:rounded-2xl
          md:transition-[width] md:duration-300
          ${collapsed ? "md:w-20" : "md:w-64"}
        `}
      >
        {/* Header: role badge + close (mobile) / collapse (desktop) controls */}
        <div className="flex items-center justify-between gap-2 border-b border-brand-border p-4">
          <div className={`flex items-center gap-3 overflow-hidden ${collapsed ? "md:justify-center md:w-full" : ""}`}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--c-hero-start),var(--c-hero-end))] text-sm font-bold text-white">
              {ROLE_LABELS[role]?.charAt(0) ?? "؟"}
            </div>
            <div className={`min-w-0 ${collapsed ? "md:hidden" : ""}`}>
              <p className="truncate text-sm font-bold text-brand-text">{ROLE_LABELS[role] ?? "زائر"}</p>
              <p className="truncate text-xs text-brand-muted">لوحة التحكم</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="إغلاق القائمة"
            className="flex h-8 w-8 items-center justify-center rounded-full text-brand-muted hover:bg-brand-light md:hidden"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <button
                  type="button"
                  onClick={() => goTo(item.path)}
                  title={collapsed ? item.label : undefined}
                  className={`
                    flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition
                    ${collapsed ? "md:justify-center" : ""}
                    ${isActive(item.path)
                      ? "bg-brand-main text-white"
                      : "text-brand-text hover:bg-brand-light"}
                  `}
                >
                  <Icon name={item.icon} />
                  <span className={collapsed ? "md:hidden" : ""}>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="my-3 border-t border-brand-border" />

          <ul className="flex flex-col gap-1">
            <li>
              <button
                type="button"
                onClick={() => goTo(dashboardPath)}
                title={collapsed ? "لوحة التحكم" : undefined}
                className={`
                  flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition
                  ${collapsed ? "md:justify-center" : ""}
                  ${isActive(dashboardPath)
                    ? "bg-brand-main text-white"
                    : "bg-brand-light text-brand-text hover:opacity-90"}
                `}
              >
                <Icon name="dashboard" />
                <span className={collapsed ? "md:hidden" : ""}>لوحة {ROLE_LABELS[role] ?? ""}</span>
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => goTo(profilePath)}
                title={collapsed ? "الملف الشخصي" : undefined}
                className={`
                  flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition
                  ${collapsed ? "md:justify-center" : ""}
                  ${isActive(profilePath)
                    ? "bg-brand-main text-white"
                    : "text-brand-text hover:bg-brand-light"}
                `}
              >
                <Icon name="profile" />
                <span className={collapsed ? "md:hidden" : ""}>الملف الشخصي</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Footer: logout + desktop collapse toggle */}
        <div className="border-t border-brand-border p-3">
          <button
            type="button"
            onClick={handleLogout}
            title={collapsed ? "تسجيل الخروج" : undefined}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-rose-600 transition hover:bg-rose-50 ${collapsed ? "md:justify-center" : ""}`}
          >
            <Icon name="logout" />
            <span className={collapsed ? "md:hidden" : ""}>تسجيل الخروج</span>
          </button>

          <button
            type="button"
            onClick={() => setCollapsed((value) => !value)}
            className="mt-2 hidden w-full items-center justify-center gap-2 rounded-xl border border-brand-border py-2 text-xs font-bold text-brand-muted transition hover:bg-brand-light md:flex"
          >
            <Icon
              name="chevron"
              className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`}
            />
            <span className={collapsed ? "md:hidden" : ""}>طي القائمة</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
