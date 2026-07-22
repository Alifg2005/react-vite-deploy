import { useEffect, useMemo, useState } from "react";
import SharedCard from "../../../shared/components/SharedCard";
import Sidebar from "../../../shared/components/DashboardSidebar";
import TicketCard from "../components/TicketCard";
import SkeletonGrid from "../components/SkeletonGrid";
import EmptyState from "../components/EmptyState";
import FilterPills from "../components/FilterPills";
import { supportStatusFilters, ticketsSeed } from "../data";

function CompanySupport() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 600);
    return () => window.clearTimeout(timer);
  }, []);

  const visibleTickets = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return ticketsSeed.filter((ticket) => {
      if (statusFilter !== "all" && ticket.status !== statusFilter) return false;
      if (!normalizedQuery) return true;
      return `${ticket.title} ${ticket.summary}`.toLowerCase().includes(normalizedQuery);
    });
  }, [query, statusFilter]);

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-start">
      <Sidebar />

      <section className="flex min-w-0 flex-1 flex-col gap-5">
        <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-white/80">الدعم الفني</p>
          <h2 className="mb-2 text-3xl font-bold text-white">الشكاوى والتذاكر</h2>
          <p className="text-lg text-white/85">تابع التذاكر، وحدد أولوياتها بسرعة.</p>
        </div>

        <SharedCard title="الدعم الفني" subtitle="ابحث عن تذكرة أو أنشئ طلبًا جديدًا">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث عن تذكرة أو مشكلة..." className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm shadow-sm md:max-w-md" />
            <button type="button" className="rounded-lg bg-brand-main px-3 py-2 text-sm font-bold text-white transition hover:opacity-90">
              إنشاء تذكرة جديدة
            </button>
          </div>

          <div className="mb-4">
            <FilterPills activeValue={statusFilter} setActiveValue={setStatusFilter} options={supportStatusFilters} />
          </div>

          {isLoading ? (
            <SkeletonGrid count={3} containerClassName="flex flex-col gap-3" itemClassName="h-28" />
          ) : visibleTickets.length > 0 ? (
            <div className="flex flex-col gap-3">
              {visibleTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          ) : (
            <EmptyState message="لا توجد تذاكر تطابق الفلتر الحالي." />
          )}
        </SharedCard>
      </section>
    </div>
  );
}

export default CompanySupport;
