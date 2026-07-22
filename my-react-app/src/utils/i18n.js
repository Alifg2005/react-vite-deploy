// Resolves a translatable value for the current language. Accepts either a
// plain string (returned as-is) or a { ar, en } pair (returns the matching
// field, falling back to ar then en).
export function pickLang(value, language) {
  if (value && typeof value === "object" && ("ar" in value || "en" in value)) {
    return value[language] ?? value.ar ?? value.en ?? "";
  }
  return value;
}
