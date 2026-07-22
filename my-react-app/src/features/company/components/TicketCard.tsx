function TicketCard({ ticket }) {
  return (
    <article className="rounded-2xl border border-brand-border bg-brand-white p-4 shadow-sm">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h4 className="text-base font-bold text-brand-text">{ticket.title}</h4>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${ticket.priority === "عالية" ? "bg-rose-100 text-rose-700" : ticket.priority === "متوسطة" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
          {ticket.priority}
        </span>
      </div>
      <p className="mb-3 text-sm leading-6 text-brand-muted">{ticket.summary}</p>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full bg-brand-light px-2.5 py-1 text-[11px] font-bold text-brand-text">
          {ticket.status === "open" ? "مفتوح" : ticket.status === "pending" ? "قيد الانتظار" : "محلول"}
        </span>
        <span className="text-sm text-brand-muted">{ticket.createdAt}</span>
      </div>
    </article>
  );
}

export default TicketCard;
