function RequestCard({ request, onViewDetails }) {
  return (
    <article className="rounded-2xl border border-brand-border bg-brand-white p-4 shadow-sm">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h4 className="text-base font-bold text-brand-text">{request.title}</h4>
        <span className="rounded-full bg-brand-light px-2.5 py-1 text-[11px] font-bold text-brand-text">{request.priority}</span>
      </div>
      <p className="mb-3 text-sm leading-6 text-brand-muted">{request.summary}</p>
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-full bg-brand-main px-2.5 py-1 text-[11px] font-bold text-white">
          {request.status === "rejected" ? "مرفوض" : request.status === "pending review" ? "قيد المراجعة" : "مقبولة"}
        </span>
        <button
          type="button"
          onClick={() => onViewDetails?.(request)}
          className="rounded-lg bg-brand-main px-3 py-2 text-sm font-bold text-white transition hover:opacity-90"
        >
          عرض التفاصيل
        </button>
      </div>
    </article>
  );
}

export default RequestCard;
