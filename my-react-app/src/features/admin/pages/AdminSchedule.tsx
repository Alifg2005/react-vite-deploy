import { useMemo, useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import AdminIcon from "../components/AdminIcons";
import AdminSidebar from "../components/AdminSidebar";
import SharedCard from "../../../shared/components/SharedCard";
import GradientBanner from "../../../shared/components/GradientBanner";
import { useRole } from "../../../shared/context/RoleContext";
import {
  ScheduleBoard,
  SCHEDULE_HUE_STYLES,
  toScheduleISODate,
  type ScheduleEvent,
} from "../../../shared/components/schedule";
import {
  ADMIN_SCHEDULE_RECURRENCE_OPTIONS, ADMIN_SCHEDULE_TASKS, SCHEDULE_DURATION_OPTIONS,
  type AdminScheduleTask,
} from "../../../mock";
import { adminTranslations } from "../../../mock";

interface ScheduleFormValues {
  title: string;
  date: string;
  recurrence: string;
  notes: string;
  startTime: string;
  durationMinutes: number;
}

// Recurrence → hue, reusing the same accent palette every other schedule
// page draws its legend from (see scheduleStyles.ts).
const ADMIN_RECURRENCE_STYLES: Record<string, string> = {
  none: SCHEDULE_HUE_STYLES.blue,
  daily: SCHEDULE_HUE_STYLES.purple,
  weekly: SCHEDULE_HUE_STYLES.amber,
  monthly: SCHEDULE_HUE_STYLES.emerald,
  yearly: SCHEDULE_HUE_STYLES.rose,
};

// How far around "today" recurring tasks get expanded into concrete
// calendar occurrences, so the shared day/week/month views (which match
// events by exact date) can render every repeat within that window.
const OCCURRENCE_WINDOW_MONTHS_PAST = 12;
const OCCURRENCE_WINDOW_MONTHS_FUTURE = 12;

// Tasks without a startTime render as a fixed morning block, matching how
// the company schedule handles its own time-less deadlines.
const ALL_DAY_TASK_TIME_START = "09:00";
const ALL_DAY_TASK_TIME_END = "09:30";

const EMPTY_FORM_VALUES: ScheduleFormValues = {
  title: "", date: toScheduleISODate(new Date()), recurrence: "none", notes: "", startTime: "", durationMinutes: 60,
};

function addDays(date: Date, count: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + count);
  return result;
}

function addMinutesToTime(time: string, minutes: number): string {
  const [hours, mins] = time.split(":").map(Number);
  const total = hours * 60 + mins + minutes;
  const wrapped = ((total % 1440) + 1440) % 1440;
  return `${String(Math.floor(wrapped / 60)).padStart(2, "0")}:${String(wrapped % 60).padStart(2, "0")}`;
}

function taskOccursOnDate(task: AdminScheduleTask, date: Date) {
  const iso = toScheduleISODate(date);
  if (iso < task.date) return false;
  if (iso === task.date) return true;

  const taskDate = new Date(`${task.date}T00:00:00`);
  switch (task.recurrence) {
    case "daily":
      return true;
    case "weekly":
      return date.getDay() === taskDate.getDay();
    case "monthly":
      return date.getDate() === taskDate.getDate();
    case "yearly":
      return date.getDate() === taskDate.getDate() && date.getMonth() === taskDate.getMonth();
    default:
      return false;
  }
}

interface AddTaskPanelProps {
  initialDate: string;
  onCancel: () => void;
  onSubmit: (values: ScheduleFormValues) => void;
}

function AddTaskPanel({ initialDate, onCancel, onSubmit }: AddTaskPanelProps) {
  const { t } = useRole();
  const [values, setValues] = useState<ScheduleFormValues>({ ...EMPTY_FORM_VALUES, date: initialDate });

  function updateField<K extends keyof ScheduleFormValues>(field: K, value: ScheduleFormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!values.title.trim() || !values.date) return;
    onSubmit(values);
  }

  return (
    <SharedCard
      title={t(adminTranslations.schedule.addTask)}
      subtitle={t(adminTranslations.schedule.addTaskSubtitle)}
    >
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-bold text-brand-text">{t(adminTranslations.schedule.taskTitleLabel)}</label>
          <input
            value={values.title}
            onChange={(event) => updateField("title", event.target.value)}
            placeholder={t(adminTranslations.schedule.taskTitlePlaceholder)}
            className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
            autoFocus
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-bold text-brand-text">{t(adminTranslations.common.date)}</label>
          <input
            type="date"
            value={values.date}
            onChange={(event) => updateField("date", event.target.value)}
            className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-bold text-brand-text">{t(adminTranslations.schedule.recurrenceLabel)}</label>
          <select
            value={values.recurrence}
            onChange={(event) => updateField("recurrence", event.target.value)}
            className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
          >
            {ADMIN_SCHEDULE_RECURRENCE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{t(option.label)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-bold text-brand-text">{t(adminTranslations.schedule.startTimeLabel)}</label>
          <input
            type="time"
            value={values.startTime}
            onChange={(event) => updateField("startTime", event.target.value)}
            className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-bold text-brand-text">{t(adminTranslations.schedule.durationLabel)}</label>
          <select
            value={values.durationMinutes}
            onChange={(event) => updateField("durationMinutes", Number(event.target.value))}
            disabled={!values.startTime}
            className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm disabled:bg-brand-light disabled:text-brand-muted"
          >
            {SCHEDULE_DURATION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{t(option.label)}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-bold text-brand-text">{t(adminTranslations.schedule.notesLabel)}</label>
          <textarea
            value={values.notes}
            onChange={(event) => updateField("notes", event.target.value)}
            rows={3}
            placeholder={t(adminTranslations.schedule.notesPlaceholder)}
            className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
          />
        </div>

        <div className="flex gap-2 sm:col-span-2">
          <button type="submit" className="rounded-lg bg-brand-main px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90">
            {t(adminTranslations.schedule.saveTask)}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-brand-border bg-brand-white px-5 py-2.5 text-sm font-bold text-brand-text transition hover:bg-brand-light"
          >
            {t(adminTranslations.common.cancel)}
          </button>
        </div>
      </form>
    </SharedCard>
  );
}

function AdminSchedule() {
  const { role, t } = useRole();

  const [tasks, setTasks] = useState(ADMIN_SCHEDULE_TASKS);
  const [showAddForm, setShowAddForm] = useState(false);

  const recurrenceLabel = useMemo(() => {
    const labels: Record<string, string> = {};
    for (const option of ADMIN_SCHEDULE_RECURRENCE_OPTIONS) labels[option.value] = t(option.label);
    return labels;
  }, [t]);

  const legend = useMemo(
    () => ADMIN_SCHEDULE_RECURRENCE_OPTIONS.map((option) => ({
      label: t(option.label),
      style: ADMIN_RECURRENCE_STYLES[option.value] ?? ADMIN_RECURRENCE_STYLES.none,
    })),
    [t]
  );

  // Expands every recurring task into its concrete calendar occurrences
  // within the navigable window, so the shared views (which match events by
  // exact date) render each repeat.
  const events = useMemo<ScheduleEvent[]>(() => {
    const today = new Date();
    const rangeStart = new Date(today.getFullYear(), today.getMonth() - OCCURRENCE_WINDOW_MONTHS_PAST, 1);
    const rangeEnd = new Date(today.getFullYear(), today.getMonth() + OCCURRENCE_WINDOW_MONTHS_FUTURE + 1, 0);

    const result: ScheduleEvent[] = [];
    for (const task of tasks) {
      const taskStart = new Date(`${task.date}T00:00:00`);
      const timeStart = task.startTime ?? ALL_DAY_TASK_TIME_START;
      const timeEnd = task.startTime
        ? addMinutesToTime(task.startTime, task.durationMinutes ?? 60)
        : ALL_DAY_TASK_TIME_END;

      for (let date = taskStart > rangeStart ? taskStart : rangeStart; date <= rangeEnd; date = addDays(date, 1)) {
        if (!taskOccursOnDate(task, date)) continue;
        const iso = toScheduleISODate(date);
        result.push({
          id: `${task.id}::${iso}`,
          title: t(task.title),
          date: iso,
          timeStart,
          timeEnd,
          typeLabel: recurrenceLabel[task.recurrence] ?? recurrenceLabel.none,
          style: ADMIN_RECURRENCE_STYLES[task.recurrence] ?? ADMIN_RECURRENCE_STYLES.none,
        });
      }
    }
    return result;
  }, [tasks, t, recurrenceLabel]);

  function addTask(values: ScheduleFormValues) {
    setTasks((current) => [
      ...current,
      {
        id: `task-${Date.now()}`,
        title: values.title,
        date: values.date,
        recurrence: values.recurrence,
        notes: values.notes,
        startTime: values.startTime || undefined,
        durationMinutes: values.startTime ? values.durationMinutes : undefined,
      },
    ]);
    setShowAddForm(false);
  }

  function removeEvent(eventId: string) {
    const taskId = eventId.split("::")[0];
    setTasks((current) => current.filter((task) => task.id !== taskId));
  }

  if (role !== "admin") return <Navigate to="/dashboard" replace />;

  return (
    <div className="admin-scale flex flex-col gap-5 md:flex-row md:items-start">
      <AdminSidebar />

      <section className="flex min-w-0 flex-1 flex-col gap-5">
        <GradientBanner
          title={t(adminTranslations.schedule.pageTitle)}
          subtitle={t(adminTranslations.schedule.pageSubtitle)}
        />

        <div>
          <button
            type="button"
            onClick={() => setShowAddForm((current) => !current)}
            className="flex items-center gap-2 rounded-lg bg-brand-main px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
          >
            <AdminIcon name="plus" className="h-4 w-4" />
            {t(adminTranslations.schedule.addTask)}
          </button>
        </div>

        {showAddForm ? (
          <AddTaskPanel
            initialDate={toScheduleISODate(new Date())}
            onCancel={() => setShowAddForm(false)}
            onSubmit={addTask}
          />
        ) : null}

        <SharedCard>
          <ScheduleBoard events={events} legend={legend} onDeleteEvent={removeEvent} />
        </SharedCard>
      </section>
    </div>
  );
}

export default AdminSchedule;
