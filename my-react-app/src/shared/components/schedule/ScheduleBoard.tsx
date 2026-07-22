// Composite schedule widget shared by the student, trainer, and company
// dashboards: nav (day/week/month + arrows) + the matching grid + the event
// popover. Each page only has to map its own data into ScheduleEvent[].
import { useMemo, useState } from "react";
import { useRole } from "../../context/RoleContext";
import ScheduleNav, { type ScheduleView } from "./ScheduleNav";
import ScheduleDayView from "./ScheduleDayView";
import ScheduleWeekView from "./ScheduleWeekView";
import ScheduleMonthView from "./ScheduleMonthView";
import ScheduleEventPopover from "./ScheduleEventPopover";
import type { ScheduleEvent, ScheduleLegendEntry } from "./scheduleTypes";
import { getScheduleWeekDates } from "./scheduleTime";
import { SCHEDULE_DAYS_AR, SCHEDULE_MONTHS_AR } from "../../../mock";

interface ScheduleBoardProps {
  events: ScheduleEvent[];
  legend?: ScheduleLegendEntry[];
  initialView?: ScheduleView;
  initialDate?: Date;
  onDeleteEvent?: (id: string) => void;
}

function ScheduleBoard({ events, legend, initialView = "day", initialDate, onDeleteEvent }: ScheduleBoardProps) {
  const { direction } = useRole();
  const [view, setView] = useState<ScheduleView>(initialView);
  const [anchor, setAnchor] = useState(() => initialDate ?? new Date());
  const [activeEvent, setActiveEvent] = useState<ScheduleEvent | null>(null);

  function navigate(step: -1 | 1) {
    setAnchor((current) => {
      const next = new Date(current);
      if (view === "day") next.setDate(next.getDate() + step);
      else if (view === "week") next.setDate(next.getDate() + step * 7);
      else next.setMonth(next.getMonth() + step);
      return next;
    });
  }

  const label = useMemo(() => {
    if (view === "month") return `${SCHEDULE_MONTHS_AR[anchor.getMonth()]} ${anchor.getFullYear()}`;

    if (view === "week") {
      const weekDates = getScheduleWeekDates(anchor);
      const weekStart = weekDates[0];
      const weekEnd = weekDates[6];
      const sameMonth = weekStart.getMonth() === weekEnd.getMonth();
      return sameMonth
        ? `${weekStart.getDate()} – ${weekEnd.getDate()} ${SCHEDULE_MONTHS_AR[weekStart.getMonth()]} ${weekEnd.getFullYear()}`
        : `${weekStart.getDate()} ${SCHEDULE_MONTHS_AR[weekStart.getMonth()]} – ${weekEnd.getDate()} ${SCHEDULE_MONTHS_AR[weekEnd.getMonth()]} ${weekEnd.getFullYear()}`;
    }

    return `${SCHEDULE_DAYS_AR[anchor.getDay()]} ${anchor.getDate()} ${SCHEDULE_MONTHS_AR[anchor.getMonth()]}`;
  }, [view, anchor]);

  const monthEvents = useMemo(
    () => events.filter((event) => {
      const eventDate = new Date(`${event.date}T00:00:00`);
      return eventDate.getFullYear() === anchor.getFullYear() && eventDate.getMonth() === anchor.getMonth();
    }),
    [events, anchor]
  );

  return (
    <div>
      <ScheduleNav
        view={view}
        onViewChange={setView}
        label={label}
        onPrev={() => navigate(-1)}
        onNext={() => navigate(1)}
        direction={direction}
      />

      {legend && legend.length > 0 ? (
        <div className="mb-4 flex flex-wrap gap-2">
          {legend.map((entry) => (
            <span key={entry.label} className={`border-t-2 px-3 py-0.5 text-[11px] font-bold ${entry.style}`}>
              {entry.label}
            </span>
          ))}
        </div>
      ) : null}

      {view === "day" ? (
        <ScheduleDayView date={anchor} events={events} onEventClick={setActiveEvent} />
      ) : view === "week" ? (
        <ScheduleWeekView anchor={anchor} events={events} onEventClick={setActiveEvent} />
      ) : (
        <ScheduleMonthView monthDate={anchor} events={monthEvents} onEventClick={setActiveEvent} />
      )}

      {activeEvent ? (
        <ScheduleEventPopover
          event={activeEvent}
          onClose={() => setActiveEvent(null)}
          onDelete={onDeleteEvent}
        />
      ) : null}
    </div>
  );
}

export default ScheduleBoard;
