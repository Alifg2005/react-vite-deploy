// 7-day week grid — same hour rows/row-height as the Day view, laid out as
// columns like the original trainer schedule design.
import { useMemo } from "react";
import type { ScheduleEvent } from "./scheduleTypes";
import { getScheduleWeekDates, toScheduleISODate } from "./scheduleTime";
import { scheduleNowOffsetPx } from "./scheduleGrid";
import ScheduleHourGutter from "./ScheduleHourGutter";
import ScheduleHourColumn from "./ScheduleHourColumn";
import { SCHEDULE_DAYS_AR } from "../../../mock";

const GRID_TEMPLATE_COLUMNS = "3.5rem repeat(7, minmax(120px, 1fr))";

function formatDayDate(date: Date): string {
  return date.toLocaleDateString("ar-SA", { month: "long", day: "numeric" });
}

interface ScheduleWeekViewProps {
  anchor: Date;
  events: ScheduleEvent[];
  onEventClick: (event: ScheduleEvent) => void;
}

function ScheduleWeekView({ anchor, events, onEventClick }: ScheduleWeekViewProps) {
  const weekDates = useMemo(() => getScheduleWeekDates(anchor), [anchor]);
  const todayIso = toScheduleISODate(new Date());
  const nowLine = scheduleNowOffsetPx();

  const eventsByDate = useMemo(() => {
    const map: Record<string, ScheduleEvent[]> = {};
    for (const event of events) {
      (map[event.date] ??= []).push(event);
    }
    return map;
  }, [events]);

  return (
    <div className="overflow-x-auto rounded-2xl border border-brand-border bg-brand-white">
      <div className="min-w-max">
        <div className="grid border-b border-brand-border" style={{ gridTemplateColumns: GRID_TEMPLATE_COLUMNS }}>
          <div />
          {weekDates.map((date) => {
            const iso = toScheduleISODate(date);
            const isToday = iso === todayIso;
            return (
              <div
                key={iso}
                className={`flex flex-col items-center justify-center gap-0.5 border-s border-brand-border py-2 text-xs font-bold ${
                  isToday ? "bg-brand-main text-white" : "bg-brand-light text-brand-text"
                }`}
              >
                <span>{SCHEDULE_DAYS_AR[date.getDay()]}</span>
                <span className={`text-[10px] font-normal ${isToday ? "text-white/70" : "text-brand-muted"}`}>
                  {formatDayDate(date)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="grid" style={{ gridTemplateColumns: GRID_TEMPLATE_COLUMNS }}>
          <ScheduleHourGutter />
          {weekDates.map((date) => {
            const iso = toScheduleISODate(date);
            const isToday = iso === todayIso;
            return (
              <ScheduleHourColumn
                key={iso}
                events={eventsByDate[iso] ?? []}
                onEventClick={onEventClick}
                highlight={isToday}
                nowLine={isToday ? nowLine : null}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ScheduleWeekView;
