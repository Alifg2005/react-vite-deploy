import { useState } from "react";
import Sidebar from "../../../shared/components/DashboardSidebar";
import { ScheduleBoard, SCHEDULE_HUE_STYLES, type ScheduleEvent } from "../../../shared/components/schedule";
import { scheduleMeetings, scheduleDeadlines } from "../data";

// Reuses the same theme-aware hue tokens as the trainer/student schedules,
// mapped onto this page's own event categories.
const COMPANY_EVENT_STYLES: Record<string, string> = {
  meeting: SCHEDULE_HUE_STYLES.emerald,
  training: SCHEDULE_HUE_STYLES.blue,
  deadline: SCHEDULE_HUE_STYLES.amber,
  workshop: SCHEDULE_HUE_STYLES.purple,
};

const COMPANY_EVENT_LABELS: Record<string, string> = {
  meeting: "اجتماع",
  training: "تدريب",
  deadline: "موعد نهائي",
  workshop: "ورشة عمل",
};

// Deadlines have no clock time of their own — give them a fixed morning
// slot so they still render as a normal block in the day/month grids.
const DEADLINE_TIME_START = "09:00";
const DEADLINE_TIME_END = "09:30";

function buildCompanyEvents(): ScheduleEvent[] {
  const meetingEvents = scheduleMeetings.map((meeting) => ({
    id: `meeting-${meeting.id}`,
    title: meeting.title,
    date: meeting.date,
    timeStart: meeting.time,
    timeEnd: meeting.endTime,
    typeLabel: COMPANY_EVENT_LABELS[meeting.type],
    style: COMPANY_EVENT_STYLES[meeting.type],
    location: meeting.location,
  }));

  const deadlineEvents = scheduleDeadlines.map((deadline) => ({
    id: `deadline-${deadline.id}`,
    title: deadline.title,
    date: deadline.date,
    timeStart: deadline.time ?? DEADLINE_TIME_START,
    timeEnd: deadline.endTime ?? DEADLINE_TIME_END,
    typeLabel: COMPANY_EVENT_LABELS[deadline.type],
    style: COMPANY_EVENT_STYLES[deadline.type],
  }));

  return [...meetingEvents, ...deadlineEvents];
}

function CompanySchedule() {
  const [events, setEvents] = useState<ScheduleEvent[]>(buildCompanyEvents);

  function removeEvent(id: string) {
    setEvents((current) => current.filter((event) => event.id !== id));
  }

  const legend = Object.entries(COMPANY_EVENT_LABELS).map(([type, label]) => ({
    label,
    style: COMPANY_EVENT_STYLES[type],
  }));

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-start">
      <Sidebar />

      <section className="flex min-w-0 flex-1 flex-col gap-5">
        <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-white/80">الجدول</p>
          <h2 className="mb-2 text-3xl font-bold text-white">تقويم المتابعة والمهام</h2>
          <p className="text-lg text-white/85">تابع الاجتماعات القادمة والمهام المهمة في واجهة تقويمية احترافية.</p>
        </div>

        <div className="rounded-2xl border border-brand-border bg-brand-white p-6">
          <ScheduleBoard
            events={events}
            legend={legend}
            initialDate={new Date("2026-07-14")}
            onDeleteEvent={removeEvent}
          />
        </div>
      </section>
    </div>
  );
}

export default CompanySchedule;
