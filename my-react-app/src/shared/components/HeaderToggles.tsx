import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useRole } from "../context/RoleContext";
import type { Language } from "../../utils/i18n";

// ── Language Toggle ──────────────────────────────────────────────────────────
export function LanguageToggle() {
  const { language, setLanguage } = useRole();

  return (
    <select
      value={language}
      onChange={(event: ChangeEvent<HTMLSelectElement>) => setLanguage(event.target.value as Language)}
      className="h-10 rounded-full border border-brand-border bg-brand-white px-3 text-sm font-bold text-brand-text focus:outline-none"
    >
      <option value="ar">AR</option>
      <option value="en">EN</option>
    </select>
  );
}

// ── Theme Toggle ─────────────────────────────────────────────────────────────
type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-border text-lg text-brand-text transition hover:bg-brand-light"
      aria-label="تبديل الوضع الليلي"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
