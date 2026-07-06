import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../images/ct-no-background.png";

const NAV_LINKS = [
  { label: "الرئيسية", href: "/" },
  { label: "من نحن", href: "/about" },
  { label: "البرامج", href: "/course-catalogue" },
  { label: "تواصل معنا", href: "/contact" },
];

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

function HeaderActions({ className = "", onNavigate }) {
  const navigate = useNavigate();

  const handleStartClick = () => {
    // Later: check auth/role from RoleContext here first.
    // e.g. if (!user) return navigate("/login");
    navigate("/register");
    onNavigate?.();
  };

  return (
    <div className={className}>
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

      <span className="h-9 w-9 shrink-0 rounded-full border border-dashed border-brand-border bg-brand-light" />
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
      <div className="flex items-center justify-between gap-4">
        <Logo />

        {/* Desktop nav — hidden on mobile, visible from md breakpoint up */}
        <NavLinks className="hidden items-center gap-6 md:flex" />
        <HeaderActions className="hidden items-center gap-3 md:flex" />

        {/* Mobile menu toggle — visible only below md breakpoint */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-label="فتح القائمة"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-border text-brand-text md:hidden"
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