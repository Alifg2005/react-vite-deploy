// The sticky hour-labels column shared by the Day and Week grids.
import { SCHEDULE_GRID_HOURS, SCHEDULE_GRID_ROW_HEIGHT_PX, formatScheduleHourLabel } from "./scheduleGrid";

function ScheduleHourGutter() {
  return (
    <div>
      {SCHEDULE_GRID_HOURS.map((hour) => (
        <div
          key={hour}
          style={{ height: SCHEDULE_GRID_ROW_HEIGHT_PX }}
          className="flex items-start justify-end border-t border-brand-border px-1.5 pt-0.5 text-[10px] font-bold text-brand-muted first:border-t-0"
        >
          {formatScheduleHourLabel(hour)}
        </div>
      ))}
    </div>
  );
}

export default ScheduleHourGutter;
