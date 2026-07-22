import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminIcon from "./AdminIcons";
import { ADMIN_SIDEBAR_LINKS, adminTranslations, type AdminLabel } from "../../../mock";
import { useRole } from "../../../shared/context/RoleContext";
import { useApprovalRequests } from "../../../context/ApprovalRequestsContext";

const LAST_ROLE_KEY = "ct_last_role";

// The admin demo profile has no real personal name — dashboardData.jsx seeds
// it with this placeholder label instead, so it needs the same translation
// treatment as any other display string here.
const PROFILE_NAME_TRANSLATIONS: Record<string, AdminLabel> = {
  "إدارة المنصة": adminTranslations.sidebar.platformManagement,
};

export default function AdminSidebar() {
  const { profile, setRole, t } = useRole();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const displayName = t(PROFILE_NAME_TRANSLATIONS[profile.name] ?? profile.name) || t(adminTranslations.sidebar.adminFallbackName);
  const { programRequests, userRequests } = useApprovalRequests();

  const badgeValues: Record<string, number> = {
    pendingProgramRequests: programRequests.length,
    pendingUserRequests: userRequests.length,
    // unreadNotifications: unreadCount, 
  };

  function handleLogout() {
    localStorage.removeItem(LAST_ROLE_KEY);
    setRole("guest");
    navigate("/login");
  }

  function isActive(path?: string) {
    return Boolean(path) && location.pathname === path;
  }

  return (
    <aside
      className={`hidden shrink-0 flex-col gap-3 rounded-2xl border border-brand-border bg-brand-white p-4 transition-[width] duration-300 md:flex md:sticky md:top-4 md:max-h-[calc(100vh-2rem)] md:self-start md:overflow-y-auto ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className={`flex items-center gap-3 rounded-xl bg-brand-light px-3 py-3 ${collapsed ? "justify-center" : ""}`}>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--c-hero-start),var(--c-hero-end))] text-white">
          <AdminIcon name="user" className="h-5 w-5" />
        </span>
        {collapsed ? null : (
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-brand-text">{displayName}</p>
            <p className="truncate text-xs text-brand-muted">{t(adminTranslations.sidebar.platformManagement)}</p>
          </div>
        )}
      </div>

      <nav className="flex flex-col gap-1">
        {ADMIN_SIDEBAR_LINKS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => item.path && navigate(item.path)}
            title={collapsed ? t(item.label) : undefined}
            className={`flex items-center justify-between gap-2 rounded-xl px-4 py-3 text-start text-sm font-bold transition ${
              collapsed ? "justify-center px-0" : ""
            } ${isActive(item.path) ? "bg-brand-main text-white" : "text-brand-text hover:bg-brand-light"}`}
          >
            <span className={`flex items-center gap-2 ${collapsed ? "justify-center" : ""}`}>
              <AdminIcon name={item.icon} className="h-5 w-5 shrink-0" />
              {collapsed ? null : t(item.label)}
            </span>
            {item.badgeKey && !collapsed ? (
              <span
                className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-bold ${
                  isActive(item.path) ? "bg-white/25 text-white" : "bg-brand-light text-brand-main"
                }`}
              >
                {badgeValues[item.badgeKey]}
              </span>
            ) : null}
          </button>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-1 border-t border-brand-border pt-3">
        <button
          type="button"
          onClick={handleLogout}
          title={collapsed ? t(adminTranslations.sidebar.logOut) : undefined}
          className={`flex items-center gap-2 rounded-xl px-4 py-3 text-start text-sm font-bold text-rose-600 transition hover:bg-rose-50 ${
            collapsed ? "justify-center px-0" : ""
          }`}
        >
          <AdminIcon name="logout" className="h-5 w-5 shrink-0" />
          {collapsed ? null : t(adminTranslations.sidebar.logOut)}
        </button>

        <button
          type="button"
          onClick={() => setCollapsed((current) => !current)}
          className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-brand-border py-2 text-xs font-bold text-brand-muted transition hover:bg-brand-light"
        >
          <AdminIcon name="chevron" className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
          {collapsed ? null : t(adminTranslations.sidebar.collapseMenu)}
        </button>
      </div>
    </aside>
  );
}
