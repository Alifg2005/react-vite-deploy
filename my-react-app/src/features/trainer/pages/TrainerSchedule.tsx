import { useMemo, useState } from "react";
import Sidebar from "../../../shared/components/DashboardSidebar";
import {
  ScheduleBoard,
  toScheduleISODate,
  SCHEDULE_SESSION_TYPE_STYLES,
  DEFAULT_SESSION_TYPE,
  type ScheduleEvent,
} from "../../../shared/components/schedule";
import {
  TRAINER_SCHEDULE_TEXT as SCHEDULE_TEXT,
  TRAINER_WEEK_DAY_KEYS as WEEK_DAY_KEYS,
  ALL_TRAINER_SESSIONS as ALL_SESSIONS,
  TRAINER_WEEK_BUCKET_OFFSETS as WEEK_BUCKET_OFFSETS,
} from "../../../mock";

// Trainer sessions start at 8:00 and run one hour per slot.
const SESSION_GRID_START_HOUR = 8;

function slotToTime(slot: number): string {
  return `${String(SESSION_GRID_START_HOUR + slot).padStart(2, "0")}:00`;
}

function getWeekStartDate(baseDate: Date, weekOffset: number): Date {
  const date = new Date(baseDate);
  date.setDate(date.getDate() - date.getDay() + weekOffset * 7);
  return date;
}

// Maps the mock day/week-bucket sessions onto real calendar dates so they
// can flow through the shared day/month schedule views.
function buildTrainerEvents(): ScheduleEvent[] {
  return ALL_SESSIONS.map((session) => {
    const weekStart = getWeekStartDate(new Date(), WEEK_BUCKET_OFFSETS[session.week]);
    const eventDate = new Date(weekStart);
    eventDate.setDate(weekStart.getDate() + WEEK_DAY_KEYS.indexOf(session.day));

    return {
      id: `session-${session.id}`,
      title: session.program,
      date: toScheduleISODate(eventDate),
      timeStart: slotToTime(session.startSlot),
      timeEnd: slotToTime(session.endSlot),
      typeLabel: session.type,
      style: SCHEDULE_SESSION_TYPE_STYLES[session.type] ?? SCHEDULE_SESSION_TYPE_STYLES[DEFAULT_SESSION_TYPE],
      location: session.room,
    };
  });
}

function TrainerSchedule() {
  const [events, setEvents] = useState<ScheduleEvent[]>(buildTrainerEvents);
  const legend = useMemo(
    () => Object.entries(SCHEDULE_SESSION_TYPE_STYLES).map(([type, style]) => ({ label: type, style })),
    []
  );

  function removeEvent(id: string) {
    setEvents((current) => current.filter((event) => event.id !== id));
  }

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-start">
      <Sidebar />

      <section className="flex min-w-0 flex-1 flex-col gap-5">
        <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
          <h2 className="mb-2 text-4xl font-bold text-white">{SCHEDULE_TEXT.heroTitle}</h2>
          <p className="text-lg text-white/85">{SCHEDULE_TEXT.heroSubtitle}</p>
        </div>

        <div className="rounded-2xl border border-brand-border bg-brand-white p-6">
          <h3 className="mb-4 text-lg font-bold text-brand-text">{SCHEDULE_TEXT.scheduleCardTitle}</h3>
          <ScheduleBoard events={events} legend={legend} onDeleteEvent={removeEvent} />
        </div>
      </section>
    </div>
  );
}

export default TrainerSchedule;
