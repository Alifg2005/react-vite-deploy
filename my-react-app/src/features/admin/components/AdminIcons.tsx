// Small inline icon set for the admin section so it has no extra dependency.
// Each entry is a 24x24 stroke-based path (same pattern as NavSidebar's icon set).
// Keyed by `string` (not a literal union) since several pages look up the
// icon name dynamically from data (e.g. `TYPE_ICONS[item.type]`).
const ICON_PATHS: Record<string, string> = {
  home: "M3 11.5 12 4l9 7.5M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9",
  clipboard:
    "M9 4h6a1 1 0 0 1 1 1v1h1a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1V5a1 1 0 0 1 1-1Z M9 4v3h6V4",
  users:
    "M8.5 11a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z M2.5 19.5c0-3.4 2.7-5.5 6-5.5s6 2.1 6 5.5 M16 5a3 3 0 0 1 0 6M18.5 14c2.4.4 3.5 1.9 3.5 4.5",
  grid: "M4 4h7v7H4V4Z M13 4h7v7h-7V4Z M4 13h7v7H4v-7Z M13 13h7v7h-7v-7Z",
  chat: "M4 5h16v11H9l-4 4V5Z",
  chart: "M4 20V10M10 20V4M16 20v-7M4 20h16",
  profile: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M4 20c1.6-3.6 5-5.5 8-5.5s6.4 1.9 8 5.5",
  logout: "M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4M15 16l4-4-4-4M19 12H9",
  chevron: "M9 6l6 6-6 6",
  dot: "M12 12h.01",
  hourglass: "M6 3h12M6 21h12M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9",
  eye: "M2 12c2.5-5 6.5-8 10-8s7.5 3 10 8c-2.5 5-6.5 8-10 8s-7.5-3-10-8Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  graduation: "M2 9 12 4l10 5-10 5-10-5Z M6 11.5V17c0 1.5 3 3 6 3s6-1.5 6-3v-5.5M22 9v6",
  building: "M5 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16M13 21V9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v12M3 21h18M8 7h1M8 11h1M8 15h1M17 12h1M17 16h1",
  user: "M12 12a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2Z M4.5 19.5c0-3.6 3.4-5.5 7.5-5.5s7.5 1.9 7.5 5.5",
  userPlus: "M9.5 12a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2Z M2.5 19.5c0-3.6 3.4-5.5 7-5.5s7 1.9 7 5.5M19 8v6M16 11h6",
  funnel: "M3 4h18l-7 8v6l-4 2v-8L3 4Z",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z M21 21l-4.3-4.3",
  calendar: "M4 7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7Z M8 3v4M16 3v4M4 10h16",
  doc: "M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z M14 3v5h5",
  plus: "M12 5v14M5 12h14",
  trash: "M4 7h16M9 7V4h6v3M6 7l1 14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-14M10 11v6M14 11v6",
  pencil: "M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",
  refresh: "M4 4v6h6M20 20v-6h-6M4.5 15a8 8 0 0 0 14.5 3.5M19.5 9A8 8 0 0 0 5 5.5",
  upload: "M12 16V4M8 8l4-4 4 4M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3",
  ban: "M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z M6.5 6.5l11 11",
  check: "M5 13l4 4L19 7",
  kebab: "M12 6a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8Z M12 13.4a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8Z M12 20.8a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8Z",
  download: "M12 4v11M8 11l4 4 4-4M5 20h14",
  link: "M9.5 14.5 14.5 9.5 M8 12a3 3 0 0 1 0-4.2l2-2a3 3 0 0 1 4.2 4.2M16 12a3 3 0 0 1 0 4.2l-2 2a3 3 0 0 1-4.2-4.2",
  image: "M4 5h16v14H4V5Z M8 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z M5 17l4-4 3 3 4-5 3 4",
  bell: "M12 3a5 5 0 0 0-5 5v3.2c0 .9-.35 1.76-1 2.4l-1 1c-.5.5-.15 1.4.55 1.4h13c.7 0 1.05-.9.55-1.4l-1-1a3.4 3.4 0 0 1-1-2.4V8a5 5 0 0 0-5-5Z M9.5 19a2.5 2.5 0 0 0 5 0",
};

export interface AdminIconProps {
  name: string;
  className?: string;
}

export default function AdminIcon({ name, className = "h-5 w-5" }: AdminIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}
