// Shared time/date helpers for the schedule kit — every role's calendar
// writes times the same way the trainer schedule does: "H:MM ص/م".

// Local-time ISO formatting — avoids the UTC-shift bug of toISOString()
// near midnight in timezones ahead of UTC.
export function toScheduleISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function scheduleTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function formatScheduleTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours < 12 ? "ص" : "م";
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHour}:${String(minutes).padStart(2, "0")} ${period}`;
}

export function formatScheduleTimeRange(start: string, end: string): string {
  return `${formatScheduleTime(start)} – ${formatScheduleTime(end)}`;
}

// The 7 dates (Sunday-first) of the week containing `anchor`.
export function getScheduleWeekDates(anchor: Date): Date[] {
  const start = new Date(anchor);
  start.setDate(anchor.getDate() - anchor.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    return date;
  });
}
