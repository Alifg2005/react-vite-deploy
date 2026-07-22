import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logoLight from "../../images/capsuleLight.png";
import logoDark from "../../images/capsuleDark.png";
import { useRole } from "../context/RoleContext";
import { ROLE_LABELS } from "../../mock";
import type { UserRole } from "../../mock";
import UserMenu from "./UserMenu";
import { LanguageToggle, ThemeToggle } from "./HeaderToggles";
import { useNotifications } from "../../context/NotificationsContext";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavLink {
  label: string;
  href: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_LINKS: NavLink[] = [
  { label: "الرئيسية", href: "/" },
  { label: "من نحن", href: "/about" },
  { label: "البرامج", href: "/course-catalogue" },
  { label: "تواصل معنا", href: "/contact" },
];

const ROLE_SWITCHER_OPTIONS = Object.entries(ROLE_LABELS).map(([value, label]) => ({
  value: value as UserRole,
  label,
}));

const ROLE_DASHBOARD_PATHS: Record<UserRole, string> = {
  trainer: "/dashboard",
  student: "/dashboard",
  company: "/dashboard",
  admin: "/dashboard",
  guest: "/login",
};

const ROLE_NOTIFICATIONS_PATHS: Partial<Record<UserRole, string>> = {
  trainer: "/trainer/notifications",
  student: "/student/notifications",
  company: "/company/notifications",
  admin: "/admin/notifications",
};

// ─── Custom hook: watches the <html> dark class (set by ThemeToggle) ──────────

function useIsDarkTheme(): boolean {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

// ─── Logo ─────────────────────────────────────────────────────────────────────

/**
 * Theme-aware logo: crossfades between the light and dark variants
 * based on the active Tailwind dark-mode class on <html>.
 *
 * Logo images are 480×206 (aspect ratio ≈ 2.33:1).
 * Container: h-14 (56px) × w-[130px] preserves proportions at a prominent size.
 *
 * SWAP — correct colour-on-background pairing:
 *   Light mode → capsuleDark.png  (dark ink, legible on white header)
 *   Dark mode  → capsuleLight.png (light ink, legible on dark header)
 */
function Logo() {
  const isDark = useIsDarkTheme();

  return (
    <Link
      to="/"
      className="flex items-center shrink-0"
      aria-label="كبسولة تحول — الصفحة الرئيسية"
    >
      {/*
       * Fixed-size box sized to the logo's native 480×206 aspect ratio.
       * h-14 = 56px → width = 56 × (480/206) ≈ 130px.
       * Both images sit absolutely inside; invisible spacer anchors dimensions.
       */}
      <span className="relative block h-14 w-32.5 shrink-0">
        {/* Light mode */}
        <img
          src={logoLight}
          alt="كبسولة تحول"
          className={[
            "absolute inset-0 h-full w-full object-contain",
            "transition-opacity duration-300 ease-in-out",
            isDark ? "opacity-0" : "opacity-100",
          ].join(" ")}
        />
        {/* Dark mode */}
        <img
          src={logoDark}
          alt=""
          aria-hidden="true"
          className={[
            "absolute inset-0 h-full w-full object-contain",
            "transition-opacity duration-300 ease-in-out",
            isDark ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
        {/* Invisible spacer stabilises the wrapper's dimensions during crossfade */}
        <img src={logoDark} alt="" aria-hidden="true" className="invisible h-full w-full" />
      </span>
    </Link>
  );
}

// ─── NavLinks ─────────────────────────────────────────────────────────────────

interface NavLinksProps {
  className?: string;
  onNavigate?: () => void;
  /** "row" = desktop horizontal bar, "column" = mobile drawer */
  layout?: "row" | "column";
}

/**
 * Desktop: animated underline slides in from center on hover.
 * Mobile:  subtle brand-tinted background pill on hover / active.
 */
function NavLinks({ className = "", onNavigate, layout = "row" }: NavLinksProps) {
  const location = useLocation();

  return (
    <nav aria-label="القائمة الرئيسية" className={className}>
      {NAV_LINKS.map((link) => {
        const isActive = location.pathname === link.href;

        return (
          <Link
            key={link.label}
            to={link.href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={[
              // Base
              "relative inline-flex items-center",
              "text-sm font-semibold",
              "transition-colors duration-200 ease-in-out",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-main focus-visible:ring-offset-2 rounded-sm",
              // Active vs idle color
              isActive ? "text-brand-main" : "text-brand-muted hover:text-brand-text",
              // Layout-specific styles
              layout === "column"
                ? "w-full rounded-lg px-3 py-2.5 hover:bg-brand-main/10 active:bg-brand-main/20"
                : "group px-1 py-0.5",
            ].join(" ")}
          >
            {link.label}

            {/* Animated underline — desktop (row) layout only */}
            {layout === "row" && (
              <span
                aria-hidden="true"
                className={[
                  "absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-brand-main",
                  "origin-center transition-transform duration-300 ease-out",
                  isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                ].join(" ")}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

// ─── RoleSwitcher ─────────────────────────────────────────────────────────────

function RoleSwitcher() {
  const { role, setRole } = useRole();
  const navigate = useNavigate();

  function handleRoleChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextRole = event.target.value as UserRole;
    setRole(nextRole);
    navigate(ROLE_DASHBOARD_PATHS[nextRole] ?? "/dashboard");
  }

  return (
    <select
      value={role}
      onChange={handleRoleChange}
      aria-label="تبديل الواجهة"
      className={[
        "h-10 cursor-pointer rounded-full border border-brand-border",
        "bg-brand-white px-3 text-sm font-bold text-brand-text",
        "transition-colors duration-200 hover:border-brand-main hover:text-brand-main",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-main",
      ].join(" ")}
    >
      {ROLE_SWITCHER_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

// ─── NotificationBell ─────────────────────────────────────────────────────────

// Shown for every signed-in role (never guest) — replaces the old per-dashboard
// sidebar "notifications" entry with a single header affordance that reads its
// unread count live from NotificationsContext, whichever role is active.
function NotificationBell({ onNavigate }: { onNavigate?: () => void }) {
  const { role } = useRole();
  const { unreadCountForRole } = useNotifications();

  const path = ROLE_NOTIFICATIONS_PATHS[role];
  if (!path) return null;

  const unreadCount = unreadCountForRole(role);

  return (
    <Link
      to={path}
      onClick={onNavigate}
      aria-label={unreadCount > 0 ? `الإشعارات (${unreadCount} غير مقروءة)` : "الإشعارات"}
      className={[
        "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
        "text-brand-muted transition-colors duration-200",
        "hover:bg-brand-main/10 hover:text-brand-main",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-main",
      ].join(" ")}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>

      {unreadCount > 0 && (
        <span
          aria-hidden="true"
          className="absolute -top-0.5 inset-e-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-main px-1 text-[10px] font-bold text-white"
        >
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </Link>
  );
}

// ─── HeaderActions ────────────────────────────────────────────────────────────

interface HeaderActionsProps {
  className?: string;
  onNavigate?: () => void;
}

function HeaderActions({ className = "", onNavigate }: HeaderActionsProps) {
  const navigate = useNavigate();
  const { role } = useRole();

  const handleStartClick = () => {
    navigate("/register");
    onNavigate?.();
  };

  return (
    <div className={className}>
      <LanguageToggle />
      <ThemeToggle />

      {role === "guest" ? (
        <>
          <Link
            to="/login"
            onClick={onNavigate}
            className={[
              "rounded-lg px-3 py-2 text-sm font-semibold text-brand-muted",
              "transition-colors duration-200 hover:text-brand-text hover:bg-brand-main/10",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-main",
            ].join(" ")}
          >
            تسجيل الدخول
          </Link>

          <button
            type="button"
            onClick={handleStartClick}
            className={[
              "rounded-lg bg-brand-main px-4 py-2 text-sm font-bold text-white",
              "transition-all duration-200",
              "hover:opacity-90 hover:-translate-y-px hover:shadow-md hover:shadow-brand-main/25",
              "active:translate-y-0 active:shadow-none",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-main focus-visible:ring-offset-2",
            ].join(" ")}
          >
            ابدأ الآن
          </button>
        </>
      ) : (
        <>
          <RoleSwitcher />
          <NotificationBell onNavigate={onNavigate} />
          <UserMenu />
        </>
      )}
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    /*
     * sticky top-0  — stays visible while scrolling, stays in document flow
     * z-50          — floats above all page content
     * w-full        — full-width, flush against viewport edges
     * border-b only — no side/top borders to avoid sub-pixel gaps at top-0
     */
    <header className="sticky top-0 z-50 w-full border-b border-brand-border bg-brand-white p-4 shadow-sm">

      {/* ── Desktop row ── */}
      <div className="hidden items-center gap-4 md:grid md:grid-cols-[1fr_auto_1fr]">
        <Logo />
        <NavLinks className="flex items-center justify-center gap-6" layout="row" />
        <HeaderActions className="flex items-center justify-end gap-3" />
      </div>

      {/* ── Mobile top bar ── */}
      <div className="flex items-center justify-between gap-4 md:hidden">
        <Logo />

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          className={[
            "flex h-9 w-9 items-center justify-center rounded-lg",
            "border border-brand-border text-brand-text",
            "transition-colors duration-200",
            "hover:border-brand-main hover:text-brand-main hover:bg-brand-main/10",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-main",
          ].join(" ")}
        >
          <span aria-hidden="true" className="select-none text-lg leading-none">
            {isMenuOpen ? "×" : "☰"}
          </span>
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="mt-4 flex flex-col gap-4 border-t border-brand-border pt-4 md:hidden"
        >
          <NavLinks
            className="flex flex-col gap-1"
            onNavigate={closeMenu}
            layout="column"
          />
          <HeaderActions
            className="flex flex-col gap-3"
            onNavigate={closeMenu}
          />
        </div>
      )}
    </header>
  );
}

export default Header;
