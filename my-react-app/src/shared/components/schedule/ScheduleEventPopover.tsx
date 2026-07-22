// Event detail card shown when a schedule program is clicked — same design
// as the student schedule's popover (icon rows + join/close actions).
import { useEffect } from "react";
import type { ScheduleEvent } from "./scheduleTypes";
import { formatScheduleTimeRange } from "./scheduleTime";
import { SCHEDULE_DAYS_AR, SCHEDULE_MONTHS_AR } from "../../../mock";

function formatFullArabicDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return `${SCHEDULE_DAYS_AR[date.getDay()]} ${date.getDate()} ${SCHEDULE_MONTHS_AR[date.getMonth()]} ${date.getFullYear()}`;
}

interface ScheduleEventPopoverProps {
  event: ScheduleEvent;
  onClose: () => void;
  onDelete?: (id: string) => void;
}

function ScheduleEventPopover({ event, onClose, onDelete }: ScheduleEventPopoverProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className={`w-full max-w-xs rounded-2xl border p-4 text-start shadow-xl ${event.style}`}>
        <div className="mb-3 flex items-start justify-between gap-2">
          <div>
            <p className="text-[11px] font-bold opacity-70">{event.typeLabel}</p>
            <h4 className="text-sm font-bold leading-snug">{event.title}</h4>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="mt-0.5 rounded-full p-0.5 opacity-60 hover:opacity-100"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-1.5 text-xs opacity-80">
          <p>📅 {formatFullArabicDate(event.date)}</p>
          <p>🕐 {formatScheduleTimeRange(event.timeStart, event.timeEnd)}</p>
          {event.instructor ? <p>👤 {event.instructor}</p> : null}
          {event.platform ? <p>💻 {event.platform}</p> : null}
          {event.location ? <p>📍 {event.location}</p> : null}
        </div>

        <div className="mt-4 flex gap-2">
          {event.link ? (
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-lg bg-brand-main py-1.5 text-center text-xs font-bold text-white transition hover:opacity-90"
            >
              انضم الآن
            </a>
          ) : null}

          {onDelete ? (
            <button
              type="button"
              onClick={() => { onDelete(event.id); onClose(); }}
              className="rounded-lg border border-current px-2.5 py-1.5 text-xs font-bold opacity-70 transition hover:opacity-100"
            >
              حذف
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className={`rounded-lg border border-current px-2.5 py-1.5 text-xs font-bold opacity-70 transition hover:opacity-100 ${event.link ? "" : "flex-1"}`}
            >
              إغلاق
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ScheduleEventPopover;
