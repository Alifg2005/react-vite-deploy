// Dashboard-Sidebar.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";
import type { UserRole } from "../../mock";

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

const ICON_PATHS: Record<string, string> = {
  home:     "M3 11.5 12 4l9 7.5M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9",
  course:   "M4 6.5A2.5 2.5 0 0 1 6.5 4H20v14H6.5A2.5 2.5 0 0 0 4 20.5V6.5Z M4 6.5V20.5",
  camp:     "M12 4 3 20h18L12 4Z M12 11l4 9M12 11 8 20",
  trophy:   "M7 4h10v4a5 5 0 0 1-10 0V4Z M7 6H4v1a4 4 0 0 0 3.5 4M17 6h3v1a4 4 0 0 1-3.5 4M9.5 18h5M12 13v5",
  activity: "M3 12h4l2 7 4-14 2 7h6",
  blog:     "M4 4h11l5 5v11H4V4Z M9 12h7M9 16h7M9 8h3",
  dashboard:"M4 4h7v7H4V4Z M13 4h7v4h-7V4Z M13 11h7v9h-7v-9Z M4 14h7v6H4v-6Z",
  profile:  "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M4 20c1.6-3.6 5-5.5 8-5.5s6.4 1.9 8 5.5",
  logout:   "M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4M15 16l4-4-4-4M19 12H9",
  menu:     "M4 6h16M4 12h16M4 18h16",
  close:    "M6 6l12 12M18 6 6 18",
  chevron:  "M15 5 8 12l7 7",
  programs: "M4 6.5A2.5 2.5 0 0 1 6.5 4H20v14H6.5A2.5 2.5 0 0 0 4 20.5V6.5Z M4 6.5V20.5 M8 10h8M8 14h5",
  schedule: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
  bell:     "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
  support:  "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
};

const ROLE_LABELS: Record<UserRole, { ar: string; en: string }> = {
  guest:   { ar: "زائر",  en: "Guest"   },
  student: { ar: "طالب",  en: "Student" },
  trainer: { ar: "مدرب",  en: "Trainer" },
  company: { ar: "شركة",  en: "Company" },
  admin:   { ar: "مسؤول", en: "Admin"   },
};

const TRAINER_NAV_ITEMS: NavItem[] = [
  { label: "الرئيسية",       path: "/trainer",     icon: "home"     },
  { label: "إدارة البرامج",  path: "/trainer/programs",      icon: "programs" },
  { label: "جدولي التدريبي", path: "/trainer/schedule",      icon: "schedule" },
  { label: "الدعم الفني",    path: "/trainer/support",       icon: "support"  },
];

// Shared items (home, programs, schedule) come first in the same order used
// by TRAINER_NAV_ITEMS, page-specific items (activities, requests) follow,
// and support always stays last.
const COMPANY_NAV_ITEMS: NavItem[] = [
  { label: "الرئيسية",        path: "/company",              icon: "home"     },
  { label: "البرامج",         path: "/company/programs",     icon: "programs" },
  { label: "الجدول",          path: "/company/schedule",     icon: "schedule" },
  { label: "الأنشطة",         path: "/company/activities",   icon: "activity" },
  { label: "الطلبات",         path: "/company/requests",     icon: "blog"     },
  { label: "الدعم الفني",     path: "/company/support",      icon: "support"  },
];

function getDefaultNavItems(role: UserRole): NavItem[] {
  const base: NavItem[] = [
    { label: "الرئيسية",  path: "/",                         icon: "home"   },
    { label: "الدورات",   path: "/courses?type=course",      icon: "course" },
    { label: "المعسكرات", path: "/courses?type=camp",        icon: "camp"   },
    { label: "المسابقات", path: "/courses?type=competition", icon: "trophy" },
  ];

  const roleExtras: Partial<Record<UserRole, NavItem[]>> = {
    admin:   [],
    guest:   [],
  };

  return [...base, ...(roleExtras[role] ?? []), { label: "المدونة", path: "/blog", icon: "blog" }];
}

// Student pages render their own dedicated sidebar (see StudentLayout.tsx) —
// this component is never mounted for role "student", so it falls through
// to the generic nav below.
function getNavItems(role: UserRole): NavItem[] {
  if (role === "trainer") return TRAINER_NAV_ITEMS;
  if (role === "company") return COMPANY_NAV_ITEMS;
  return getDefaultNavItems(role);
}

function getDashboardPath(role: UserRole): string {
  if (role === "trainer") return "/trainer";
  if (role === "company") return "/company";
  if (role === "student") return "/student/dashboard";
  return "/dashboard";
}

interface IconProps {
  name: string;
  className?: string;
}

function Icon({ name, className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

interface SidebarProps {
  items?: NavItem[];
}

function Sidebar({ items }: SidebarProps) {
  const { role, setRole } = useRole();
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems      = items ?? getNavItems(role);
  const roleLabel     = ROLE_LABELS[role] ?? ROLE_LABELS.guest;
  // Trainer and company nav lists already include their own dashboard link
  const hideSecondaryLinks = role === "trainer" || role === "company";

  // Other roles still need the dashboard + profile secondary links
  const dashboardPath = getDashboardPath(role);
  const profilePath   = "/profile";

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    function handleKeyDown(e: KeyboardEvent) { if (e.key === "Escape") setMobileOpen(false); }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function goTo(path: string) { navigate(path); setMobileOpen(false); }

  function isActive(path: string) {
  const [base] = path.split("?");
  return location.pathname === base;
  }

  function handleLogout() { setRole("guest"); setMobileOpen(false); navigate("/login"); }

  const navButtonClass = (path: string) =>
    `flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition
    ${collapsed ? "md:justify-center" : ""}
    ${isActive(path) ? "bg-brand-main text-white" : "text-brand-text hover:bg-brand-light"}`;

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="فتح القائمة"
        className="fixed top-4 right-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-brand-border bg-brand-white text-brand-text shadow-md md:hidden"
      >
        <Icon name="menu" />
      </button>

      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} className="fixed inset-0 z-30 bg-black/40 md:hidden" aria-hidden="true" />
      )}

      <aside className={`
        fixed inset-y-0 right-0 z-40 flex h-full flex-col border-brand-border bg-brand-white
        transition-transform duration-300 ease-in-out
        ${mobileOpen ? "translate-x-0" : "translate-x-full"}
        w-72 border-l shadow-xl
        md:sticky md:top-24 md:inset-y-auto md:right-auto md:h-auto md:max-h-[calc(100vh-6rem)]
        md:translate-x-0 md:shadow-none md:border md:rounded-2xl md:self-start
        md:transition-[width] md:duration-300
        ${collapsed ? "md:w-20" : "md:w-64"}
      `}>

        {/* Header */}
        <div className="flex items-center justify-between gap-2 border-b border-brand-border p-4">
          <div className={`flex items-center gap-3 overflow-hidden ${collapsed ? "md:justify-center md:w-full" : ""}`}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--c-hero-start),var(--c-hero-end))] text-sm font-bold text-white">
              {roleLabel.ar.charAt(0)}
            </div>
            <div className={`min-w-0 ${collapsed ? "md:hidden" : ""}`}>
              <p className="truncate text-sm font-bold text-brand-text">
                {roleLabel.ar}
                <span className="mr-1 text-xs font-normal text-brand-muted">· {roleLabel.en}</span>
              </p>
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

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <button
                  type="button"
                  onClick={() => goTo(item.path)}
                  title={collapsed ? item.label : undefined}
                  className={navButtonClass(item.path)}
                >
                  <Icon name={item.icon} />
                  <span className={collapsed ? "md:hidden" : ""}>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* Secondary links — hidden for roles whose nav already has a dashboard entry */}
          {!hideSecondaryLinks && (
            <>
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
                    <span className={collapsed ? "md:hidden" : ""}>لوحة {roleLabel.ar}</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => goTo(profilePath)}
                    title={collapsed ? "الملف الشخصي" : undefined}
                    className={navButtonClass(profilePath)}
                  >
                    <Icon name="profile" />
                    <span className={collapsed ? "md:hidden" : ""}>الملف الشخصي</span>
                  </button>
                </li>
              </ul>
            </>
          )}
        </nav>

        {/* Footer */}
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
            onClick={() => setCollapsed((v) => !v)}
            className="mt-2 hidden w-full items-center justify-center gap-2 rounded-xl border border-brand-border py-2 text-xs font-bold text-brand-muted transition hover:bg-brand-light md:flex"
          >
            <Icon name="chevron" className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
            <span className={collapsed ? "md:hidden" : ""}>طي القائمة</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
