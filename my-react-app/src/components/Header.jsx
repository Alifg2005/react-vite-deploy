import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../images/ct-no-background.png";
import { useRole } from "../context/RoleContext";
import { ROLE_LABELS } from "../data/dashboardData";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";

const NAV_LINKS = [
  { label: "الرئيسية", href: "/" },
  { label: "من نحن", href: "/about" },
  { label: "البرامج", href: "/course-catalogue" },
  { label: "تواصل معنا", href: "/contact" },
];

const ROLE_SWITCHER_OPTIONS = Object.entries(ROLE_LABELS).map(([value, label]) => ({
  value,
  label,
}));

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img
      src={logo}
        alt="كبسولة تحول"
        className="h-15 w-auto"></img>
      <span className="text-lg font-bold text-brand-text">
        كبسولة تحول
      </span>
    </Link>
  );
}

function NavLinks({ className = "", onNavigate }) {
  return (
    <nav className={className}>
      {NAV_LINKS.map((link) => (
        <Link
          key={link.label}
          to={link.href}
          onClick={onNavigate}
          className="text-sm font-semibold text-brand-muted transition hover:text-brand-text"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

function RoleSwitcher() {
  const { role, setRole } = useRole();

  return (
    <select
      value={role}
      onChange={(event) => setRole(event.target.value)}
      className="h-10 rounded-full border border-brand-border bg-brand-white px-3 text-sm font-bold text-brand-text focus:outline-none"
      aria-label="تبديل الواجهة"
    >
      {ROLE_SWITCHER_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

function HeaderActions({ className = "", onNavigate }) {
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
            className="text-sm font-semibold text-brand-muted transition hover:text-brand-text"
          >
            تسجيل الدخول
          </Link>

          <button
            type="button"
            onClick={handleStartClick}
            className="rounded-lg bg-brand-main px-4 py-2 text-sm font-bold text-white transition hover:opacity-90"
          >
            ابدأ الآن
          </button>
        </>
      ) : (
        <>
          <RoleSwitcher />
          <UserMenu />
        </>
      )}
    </div>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu automatically whenever the route changes.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="rounded-2xl border border-brand-border bg-brand-white p-4 shadow-sm">
      {/* Desktop row — a 3-column grid so the nav links stay centered
          regardless of how wide the logo or the actions cluster are. */}
      <div className="hidden items-center gap-4 md:grid md:grid-cols-[1fr_auto_1fr]">
        <Logo />
        <NavLinks className="flex items-center justify-center gap-6" />
        <HeaderActions className="flex items-center justify-end gap-3" />
      </div>

      {/* Mobile row — visible only below md breakpoint */}
      <div className="flex items-center justify-between gap-4 md:hidden">
        <Logo />

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-label="فتح القائمة"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-border text-brand-text"
        >
          <span className="text-lg leading-none">
            {isMenuOpen ? "×" : "☰"}
          </span>
        </button>
      </div>

      {isMenuOpen && (
        <div className="mt-4 flex flex-col gap-4 border-t border-brand-border pt-4 md:hidden">
          <NavLinks
            className="flex flex-col gap-3"
            onNavigate={() => setIsMenuOpen(false)}
          />
          <HeaderActions
            className="flex flex-col gap-3"
            onNavigate={() => setIsMenuOpen(false)}
          />
        </div>
      )}
    </header>
  );
}

export default Header;