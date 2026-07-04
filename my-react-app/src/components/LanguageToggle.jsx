import { useRole } from "../context/RoleContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useRole();

  return (
    <select
      value={language}
      onChange={(event) => setLanguage(event.target.value)}
      className="h-10 rounded-full border border-brand-border bg-brand-white px-3 text-sm font-bold text-brand-text focus:outline-none"
    >
      <option value="ar">AR</option>
      <option value="en">EN</option>
    </select>
  );
}