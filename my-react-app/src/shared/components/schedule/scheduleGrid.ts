// Shared sizing/constants for the hourly Day and Week grids, so both views
// stay pixel-for-pixel consistent with each other.
export const SCHEDULE_GRID_START_HOUR = 7;
export const SCHEDULE_GRID_END_HOUR = 20;
export const SCHEDULE_GRID_ROW_HEIGHT_PX = 64;

export const SCHEDULE_GRID_HOURS = Array.from(
  { length: SCHEDULE_GRID_END_HOUR - SCHEDULE_GRID_START_HOUR },
  (_, i) => SCHEDULE_GRID_START_HOUR + i
);

export function formatScheduleHourLabel(hour: number): string {
  const period = hour < 12 ? "ص" : "م";
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display} ${period}`;
}

// Pixel offset of the current-time line within the grid, or null when "now"
// falls outside the visible hour range.
export function scheduleNowOffsetPx(): number | null {
  const now = new Date();
  const minutesFromStart = now.getHours() * 60 + now.getMinutes() - SCHEDULE_GRID_START_HOUR * 60;
  const totalMinutes = (SCHEDULE_GRID_END_HOUR - SCHEDULE_GRID_START_HOUR) * 60;

  if (minutesFromStart < 0 || minutesFromStart > totalMinutes) return null;
  return (minutesFromStart / 60) * SCHEDULE_GRID_ROW_HEIGHT_PX;
}
