// Hourly Day view — Google-Calendar-style single-day grid shared by every
// role's schedule page.
import type { ScheduleEvent } from "./scheduleTypes";
import { toScheduleISODate } from "./scheduleTime";
import { scheduleNowOffsetPx } from "./scheduleGrid";
import ScheduleHourGutter from "./ScheduleHourGutter";
import ScheduleHourColumn from "./ScheduleHourColumn";

interface ScheduleDayViewProps {
  date: Date;
  events: ScheduleEvent[];
  onEventClick: (event: ScheduleEvent) => void;
}

function ScheduleDayView({ date, events, onEventClick }: ScheduleDayViewProps) {
  const iso = toScheduleISODate(date);
  const isToday = iso === toScheduleISODate(new Date());
  const dayEvents = events.filter((event) => event.date === iso);

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-border bg-brand-white">
      <div className="grid grid-cols-[3.5rem_1fr]">
        <ScheduleHourGutter />
        <ScheduleHourColumn
          events={dayEvents}
          onEventClick={onEventClick}
          nowLine={isToday ? scheduleNowOffsetPx() : null}
        />
      </div>
    </div>
  );
}

export default ScheduleDayView;
