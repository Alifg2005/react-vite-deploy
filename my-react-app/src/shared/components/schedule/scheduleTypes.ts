// Canonical calendar entry shape shared by every role's schedule page —
// each page maps its own domain data (sessions, tasks, meetings…) into this
// shape once, then renders it through the shared day/month/popover views.
export interface ScheduleEvent {
  id: string;
  title: string;
  date: string;      // ISO "YYYY-MM-DD"
  timeStart: string;  // "HH:MM", 24h
  timeEnd: string;    // "HH:MM", 24h
  typeLabel: string;
  style: string;      // Tailwind bg/border/text classes for this event's type
  instructor?: string;
  platform?: string;
  location?: string;
  link?: string;
}

export interface ScheduleLegendEntry {
  label: string;
  style: string;
}
