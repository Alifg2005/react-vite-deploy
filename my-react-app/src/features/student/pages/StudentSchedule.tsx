// StudentSchedule.tsx — matches the trainer schedule's day/month design and
// colors: same hero banner, day/month arrow nav, and event popover.
import { useState } from "react";
import {
  ScheduleBoard,
  SCHEDULE_SESSION_TYPE_STYLES,
  DEFAULT_SESSION_TYPE,
  type ScheduleEvent,
} from "../../../shared/components/schedule";
import { SCHEDULE_SESSIONS_SEED } from "../../../mock";

function buildStudentEvents(): ScheduleEvent[] {
  return SCHEDULE_SESSIONS_SEED.map((session) => ({
    id: session.id,
    title: session.title,
    date: session.date,
    timeStart: session.timeStart,
    timeEnd: session.timeEnd,
    typeLabel: session.type,
    style: SCHEDULE_SESSION_TYPE_STYLES[session.type] ?? SCHEDULE_SESSION_TYPE_STYLES[DEFAULT_SESSION_TYPE],
    instructor: session.instructor,
    platform: session.platform,
    link: session.link,
  }));
}

export default function StudentSchedule() {
  const [events, setEvents] = useState<ScheduleEvent[]>(buildStudentEvents);

  function removeEvent(id: string) {
    setEvents((current) => current.filter((event) => event.id !== id));
  }

  const legend = Object.entries(SCHEDULE_SESSION_TYPE_STYLES).map(([type, style]) => ({ label: type, style }));

  return (
    <section className="flex flex-col gap-5">
      <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
        <h2 className="mb-2 text-4xl font-bold text-white">جدولي</h2>
        <p className="text-lg text-white/85">استعرض جلساتك التدريبية القادمة وانضم إليها مباشرة.</p>
      </div>

      <div className="rounded-2xl border border-brand-border bg-brand-white p-6">
        <h3 className="mb-4 text-lg font-bold text-brand-text">الجدول</h3>
        <ScheduleBoard events={events} legend={legend} onDeleteEvent={removeEvent} />
      </div>
    </section>
  );
}
