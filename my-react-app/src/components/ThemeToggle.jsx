import { useEffect, useState } from "react";

function getInitialTheme() {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

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
