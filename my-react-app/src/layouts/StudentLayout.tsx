// StudentLayout.tsx — Shared shell for every /student/* page.
// Provides: the student sidebar (collapsible on desktop, off-canvas on mobile)
// and the WishlistProvider so wishlist state is available to all student pages.
//
// Architecture note: this layout is defined in routes.tsx (not imported inside
// individual pages), matching the pattern used by the new project structure.

import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRole } from "../shared/context/RoleContext";
import { WishlistProvider, useWishlist } from "../features/student/context/WishlistContext";

// ── Icon paths ─────────────────────────────────────────────────────────────────

const ICON_PATHS: Record<string, string> = {
  cap:           "M12 3 1 9l11 6 9-4.91V17h2V9L12 3Z M5 13.18v4.1c0 1 3 3.72 7 3.72s7-2.72 7-3.72v-4.1L12 17l-7-3.82Z",
  home:          "M3 11.5 12 4l9 7.5M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9",
  wishlist:      "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
  notifications: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
  activities:    "M9 2h6a1 1 0 0 1 1 1v1h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2V3a1 1 0 0 1 1-1Z M9 4v2h6V4M9 12h6M9 16h4",
  schedule:      "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  support:       "M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm0-11V7m0 8h.01",
  logout:        "M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4M15 16l4-4-4-4M19 12H9",
  menu:          "M4 6h16M4 12h16M4 18h16",
  close:         "M6 6l12 12M18 6 6 18",
  chevronLeft:   "M15 5 8 12l7 7",
};

// ── Icon component ─────────────────────────────────────────────────────────────

function NavIcon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={ICON_PATHS[name] ?? ""} />
    </svg>
  );
}

// ── Class helpers ──────────────────────────────────────────────────────────────

function navItemClass(active: boolean, collapsed: boolean) {
  return `relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition ${
    collapsed ? "md:justify-center" : ""
  } ${active ? "bg-brand-main text-white" : "text-brand-text hover:bg-brand-light"}`;
}

function badgePillClass(active: boolean, collapsed: boolean) {
  return `flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full px-1.5 text-xs font-bold ${
    collapsed ? "md:hidden" : ""
  } ${active ? "bg-white/25 text-white" : "bg-brand-light text-brand-main"}`;
}

// ── NavItem sub-component ──────────────────────────────────────────────────────

interface NavItemProps {
  label: string;
  icon: string;
  active: boolean;
  collapsed: boolean;
  count?: number;
  onClick: () => void;
}

function NavItem({ label, icon, active, collapsed, count = 0, onClick }: NavItemProps) {
  return (
    <button type="button" onClick={onClick} title={collapsed ? label : undefined}
      className={navItemClass(active, collapsed)}>
      <NavIcon name={icon} />
      <span className={`flex-1 truncate text-right ${collapsed ? "md:hidden" : ""}`}>{label}</span>

      {count > 0 && (
        <>
          <span className={badgePillClass(active, collapsed)}>{count > 99 ? "99+" : count}</span>
          <span className={`absolute -top-1 -inset-e-1 hidden h-4 w-4 items-center justify-center rounded-full bg-brand-main text-[10px] font-bold text-white ${collapsed ? "md:flex" : ""}`}>
            {count > 9 ? "9+" : count}
          </span>
        </>
      )}
    </button>
  );
}

// ── Sidebar content ────────────────────────────────────────────────────────────

interface SidebarContentProps {
  collapsed: boolean;
  onNavigate?: () => void;
  onToggleCollapse: () => void;
}

function StudentSidebarContent({ collapsed, onNavigate, onToggleCollapse }: SidebarContentProps) {
  const { setRole } = useRole();
  const { items }   = useWishlist();
  const location    = useLocation();
  const navigate    = useNavigate();

  function goTo(to: string) { navigate(to); onNavigate?.(); }
  function handleLogout()   { setRole("guest"); onNavigate?.(); navigate("/login"); }

  function isActive(path: string) {
    return path === "/student/dashboard"
      ? location.pathname === path
      : location.pathname.startsWith(path);
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-brand-border p-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--c-hero-start),var(--c-hero-end))] text-white">
          <NavIcon name="cap" className="h-5 w-5" />
        </div>
        <div className={`min-w-0 ${collapsed ? "md:hidden" : ""}`}>
          <p className="truncate text-sm font-bold text-brand-text">متدرب</p>
          <p className="truncate text-xs text-brand-muted">لوحة المتدرب</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="flex flex-col gap-1">
          <li>
            <NavItem label="الرئيسية" icon="home" collapsed={collapsed}
              active={isActive("/student/dashboard")} onClick={() => goTo("/student/dashboard")} />
          </li>

          <li>
            <NavItem label="الأمنيات" icon="wishlist" collapsed={collapsed}
              active={isActive("/student/wishlist")} count={items.length}
              onClick={() => goTo("/student/wishlist")} />
          </li>

          <li>
            <NavItem label="الأنشطة" icon="activities" collapsed={collapsed}
              active={isActive("/student/activities")} onClick={() => goTo("/student/activities")} />
          </li>

          <li>
            <NavItem label="جدولي" icon="schedule" collapsed={collapsed}
              active={isActive("/student/schedule")} onClick={() => goTo("/student/schedule")} />
          </li>
        </ul>

        <div className="my-3 border-t border-brand-border" />

        <ul className="flex flex-col gap-1">
          <li>
            <NavItem label="الدعم الفني" icon="support" collapsed={collapsed}
              active={isActive("/student/support")} onClick={() => goTo("/student/support")} />
          </li>
        </ul>
      </nav>

      {/* Footer: logout + collapse toggle */}
      <div className="border-t border-brand-border p-3">
        <button
          type="button"
          onClick={handleLogout}
          title={collapsed ? "تسجيل خروج" : undefined}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-rose-600 transition hover:bg-rose-50 ${collapsed ? "md:justify-center" : ""}`}
        >
          <NavIcon name="logout" />
          <span className={collapsed ? "md:hidden" : ""}>تسجيل خروج</span>
        </button>

        <button
          type="button"
          onClick={onToggleCollapse}
          className="mt-2 hidden w-full items-center justify-center gap-2 rounded-xl border border-brand-border py-2 text-xs font-bold text-brand-muted transition hover:bg-brand-light md:flex"
        >
          <NavIcon name="chevronLeft" className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
          <span className={collapsed ? "md:hidden" : ""}>طي القائمة</span>
        </button>
      </div>
    </div>
  );
}

// ── Layout ─────────────────────────────────────────────────────────────────────

function StudentLayoutInner() {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!mobileOpen) return undefined;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="flex min-h-screen flex-col gap-5 md:flex-row md:items-start">
      {/* Mobile toggle button */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="فتح القائمة"
        className="fixed top-4 inset-e-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-brand-border bg-brand-white text-brand-text shadow-md md:hidden"
      >
        <NavIcon name="menu" />
      </button>

      {/* Backdrop, mobile only */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          aria-hidden="true"
        />
      )}

      <aside className={`
        max-md:fixed max-md:inset-y-0 max-md:inset-e-0 max-md:w-72 max-md:shadow-xl
        z-40 flex h-full flex-col border-brand-border bg-brand-white
        border-s transition-transform duration-300 ease-in-out
        ${mobileOpen ? "translate-x-0" : "max-md:rtl:translate-x-full max-md:ltr:-translate-x-full"}
        md:sticky md:top-5 md:h-auto md:max-h-[calc(100vh-2.5rem)] md:translate-x-0
        md:overflow-hidden md:border md:border-s md:rounded-2xl
        md:transition-[width] md:duration-300
        ${collapsed ? "md:w-20" : "md:w-72"}
      `}>
        {/* Close control, mobile only */}
        <div className="flex items-center justify-end p-2 md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="إغلاق القائمة"
            className="flex h-8 w-8 items-center justify-center rounded-full text-brand-muted hover:bg-brand-light"
          >
            <NavIcon name="close" className="h-4 w-4" />
          </button>
        </div>

        <StudentSidebarContent
          collapsed={collapsed}
          onNavigate={() => setMobileOpen(false)}
          onToggleCollapse={() => setCollapsed((v) => !v)}
        />
      </aside>

      {/* Main content */}
      <main className="min-w-0 flex-1 pb-6">
        <Outlet />
      </main>
    </div>
  );
}

// WishlistProvider wraps the inner layout so sidebar can read wishlist count.
export default function StudentLayout() {
  return (
    <WishlistProvider>
      <StudentLayoutInner />
    </WishlistProvider>
  );
}
