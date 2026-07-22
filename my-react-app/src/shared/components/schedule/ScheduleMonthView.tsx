// Month grid — same 6-week layout as AdminSchedule's MonthView, restyled
// with each page's own event colors so every role's schedule shares one
// monthly design language.
import { useMemo } from "react";
import type { ScheduleEvent } from "./scheduleTypes";
import { toScheduleISODate } from "./scheduleTime";
import { SCHEDULE_DAYS_AR } from "../../../mock";

const MAX_PILLS_PER_CELL = 2;

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addDays(date: Date, count: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + count);
  return result;
}

function buildMonthGrid(monthDate: Date): Date[][] {
  const firstOfMonth = startOfMonth(monthDate);
  const gridStart = addDays(firstOfMonth, -firstOfMonth.getDay());
  const weeks: Date[][] = [];

  for (let week = 0; week < 6; week++) {
    weeks.push(Array.from({ length: 7 }, (_, day) => addDays(gridStart, week * 7 + day)));
  }

  return weeks;
}

interface ScheduleMonthViewProps {
  monthDate: Date;
  events: ScheduleEvent[];
  onEventClick: (event: ScheduleEvent) => void;
}

function ScheduleMonthView({ monthDate, events, onEventClick }: ScheduleMonthViewProps) {
  const weeks = useMemo(() => buildMonthGrid(monthDate), [monthDate]);
  const todayIso = toScheduleISODate(new Date());

  const eventsByDate = useMemo(() => {
    const map: Record<string, ScheduleEvent[]> = {};
    for (const event of events) {
      (map[event.date] ??= []).push(event);
    }
    return map;
  }, [events]);

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-border bg-brand-white">
      <div className="grid grid-cols-7 border-b border-brand-border text-center text-xs font-bold text-brand-muted">
        {SCHEDULE_DAYS_AR.map((label) => (
          <div key={label} className="px-2 py-2">{label}</div>
        ))}
      </div>

      {weeks.map((week) => (
        <div key={toScheduleISODate(week[0])} className="grid grid-cols-7 border-b border-brand-border last:border-0">
          {week.map((day) => {
            const iso = toScheduleISODate(day);
            const dayEvents = eventsByDate[iso] ?? [];
            const isCurrentMonth = day.getMonth() === monthDate.getMonth();
            const isToday = iso === todayIso;

            return (
              <div
                key={iso}
                className={`flex min-h-24 flex-col gap-1 border-s border-brand-border p-1.5 last:border-0 ${isCurrentMonth ? "" : "opacity-40"}`}
              >
                <span
                  className={`self-end text-xs font-bold ${
                    isToday ? "flex h-5 w-5 items-center justify-center rounded-full bg-brand-main text-white" : "text-brand-text"
                  }`}
                >
                  {day.getDate()}
                </span>

                <div className="flex flex-col gap-1">
                  {dayEvents.slice(0, MAX_PILLS_PER_CELL).map((event) => (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => onEventClick(event)}
                      className={`block truncate rounded border px-1.5 py-0.5 text-start text-[10px] font-bold ${event.style}`}
                    >
                      {event.title}
                    </button>
                  ))}
                  {dayEvents.length > MAX_PILLS_PER_CELL ? (
                    <span className="text-[10px] font-bold text-brand-muted">
                      +{dayEvents.length - MAX_PILLS_PER_CELL} أخرى
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default ScheduleMonthView;
