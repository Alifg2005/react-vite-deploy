// Canonical session-type palette for the trainer/student schedules — the
// "trainer schedule colors" every other schedule page is meant to match.
// Each hue is a CSS custom property (see index.css) that swaps to a
// dark-surface-friendly value under the app's .dark theme, the same way
// every other themed color in this app works.
export const SCHEDULE_HUE_STYLES = {
  emerald: "bg-[var(--c-schedule-emerald-bg)] border-[var(--c-schedule-emerald-border)] text-[var(--c-schedule-emerald-text)]",
  blue: "bg-[var(--c-schedule-blue-bg)] border-[var(--c-schedule-blue-border)] text-[var(--c-schedule-blue-text)]",
  purple: "bg-[var(--c-schedule-purple-bg)] border-[var(--c-schedule-purple-border)] text-[var(--c-schedule-purple-text)]",
  amber: "bg-[var(--c-schedule-amber-bg)] border-[var(--c-schedule-amber-border)] text-[var(--c-schedule-amber-text)]",
  rose: "bg-[var(--c-schedule-rose-bg)] border-[var(--c-schedule-rose-border)] text-[var(--c-schedule-rose-text)]",
} as const;

export const SCHEDULE_SESSION_TYPE_STYLES: Record<string, string> = {
  "دورة": SCHEDULE_HUE_STYLES.emerald,
  "معسكر": SCHEDULE_HUE_STYLES.blue,
  "مسابقة": SCHEDULE_HUE_STYLES.purple,
};

export const DEFAULT_SESSION_TYPE = "دورة";
