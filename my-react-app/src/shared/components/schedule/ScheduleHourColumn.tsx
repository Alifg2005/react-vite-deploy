// One day's worth of hour rows + absolutely-positioned event blocks —
// shared by the Day view (one column) and the Week view (seven of these).
import type { ScheduleEvent } from "./scheduleTypes";
import { formatScheduleTimeRange, scheduleTimeToMinutes } from "./scheduleTime";
import { SCHEDULE_GRID_HOURS, SCHEDULE_GRID_ROW_HEIGHT_PX, SCHEDULE_GRID_START_HOUR } from "./scheduleGrid";

interface ScheduleHourColumnProps {
  events: ScheduleEvent[]; // pre-filtered to this column's day
  onEventClick: (event: ScheduleEvent) => void;
  highlight?: boolean; // "today" tint
  nowLine?: number | null; // px offset for the current-time indicator
}

function ScheduleHourColumn({ events, onEventClick, highlight = false, nowLine = null }: ScheduleHourColumnProps) {
  return (
    <div className={`relative border-s border-brand-border ${highlight ? "bg-brand-main/5" : ""}`}>
      {SCHEDULE_GRID_HOURS.map((hour) => (
        <div key={hour} style={{ height: SCHEDULE_GRID_ROW_HEIGHT_PX }} className="border-t border-brand-border first:border-t-0" />
      ))}

      {events.map((event) => {
        const startMin = scheduleTimeToMinutes(event.timeStart) - SCHEDULE_GRID_START_HOUR * 60;
        const endMin = scheduleTimeToMinutes(event.timeEnd) - SCHEDULE_GRID_START_HOUR * 60;
        const top = (startMin / 60) * SCHEDULE_GRID_ROW_HEIGHT_PX;
        const height = Math.max(((endMin - startMin) / 60) * SCHEDULE_GRID_ROW_HEIGHT_PX, 28);

        return (
          <button
            key={event.id}
            type="button"
            onClick={() => onEventClick(event)}
            style={{ top: `${top}px`, height: `${height}px` }}
            className={`absolute inset-x-0.5 overflow-hidden rounded-md border-t-2 p-1.5 text-start shadow-sm transition hover:brightness-105 ${event.style}`}
          >
            <p className="truncate text-[10px] font-bold leading-snug">{event.title}</p>
            <p className="mt-0.5 truncate text-[9px] opacity-70">
              {formatScheduleTimeRange(event.timeStart, event.timeEnd)}
            </p>
          </button>
        );
      })}

      {nowLine !== null ? (
        <div className="pointer-events-none absolute inset-x-0 z-10 flex items-center" style={{ top: `${nowLine}px` }}>
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-rose-500" />
          <span className="h-px flex-1 bg-rose-500" />
        </div>
      ) : null}
    </div>
  );
}

export default ScheduleHourColumn;
