function ActivityCard({ activity, onViewDetails }) {
  return (
    <article className="rounded-2xl border border-brand-border bg-brand-white p-4 shadow-sm transition hover:-translate-y-0.5">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div>
          <span className="inline-flex rounded-full bg-brand-main px-2.5 py-1 text-[11px] font-bold text-white">
            {activity.category === "course" ? "دورة" : activity.category === "camp" ? "معسكر" : "مسابقة"}
          </span>
          <h4 className="mt-2 text-base font-bold text-brand-text">{activity.title}</h4>
        </div>
        <span className="rounded-full bg-brand-light px-2.5 py-1 text-[11px] font-bold text-brand-text">
          {activity.status === "current" ? "قيد التنفيذ" : activity.status === "completed" ? "مكتمل" : "قيد المراجعة"}
        </span>
      </div>

      <p className="mb-3 text-sm leading-6 text-brand-muted">{activity.description}</p>

      <div className="mb-3 h-2 overflow-hidden rounded-full bg-brand-light">
        <div className="h-full rounded-full bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-end))]" style={{ width: `${activity.progress}%` }} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-brand-muted">
        <span>{activity.highlight}</span>
        <span>{activity.participants} مشارك</span>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-brand-border pt-3 text-sm text-brand-muted">
        <span>الجهة: {activity.companyName}</span>
        <span>الموعد: {activity.dueDate}</span>
      </div>

      <button
        type="button"
        onClick={() => onViewDetails?.(activity)}
        className="mt-3 w-full rounded-xl bg-brand-main px-3 py-2 text-sm font-bold text-white transition hover:opacity-90"
      >
        عرض التفاصيل
      </button>
    </article>
  );
}

export default ActivityCard;
