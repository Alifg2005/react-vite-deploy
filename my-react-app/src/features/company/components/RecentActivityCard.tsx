import type { CompanyDashboardActivity } from "../../../mock";

function RecentActivityCard({ activity }: { activity: CompanyDashboardActivity }) {
  return (
    <article className="rounded-2xl border border-brand-border bg-brand-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h4 className="text-base font-bold text-brand-text">{activity.title}</h4>
        <span className="rounded-full bg-brand-main px-2.5 py-0.5 text-[11px] font-bold text-white">{activity.status}</span>
      </div>
      <p className="mb-3 text-sm leading-6 text-brand-muted">{activity.description}</p>
      <div className="mb-3 h-2 overflow-hidden rounded-full bg-brand-light">
        <div className="h-full rounded-full bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-end))]" style={{ width: `${activity.progress}%` }} />
      </div>
      <p className="text-sm text-brand-muted">الموعد: {activity.dueDate}</p>
    </article>
  );
}

export default RecentActivityCard;
