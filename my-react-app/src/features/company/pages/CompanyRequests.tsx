import { useEffect, useMemo, useState } from "react";
import SharedCard from "../../../shared/components/SharedCard";
import Sidebar from "../../../shared/components/DashboardSidebar";
import RequestCard from "../components/RequestCard";
import RequestDetailModal from "../components/RequestDetailModal";
import TabsBar from "../components/TabsBar";
import SearchFilterBar from "../components/SearchFilterBar";
import SkeletonGrid from "../components/SkeletonGrid";
import EmptyState from "../components/EmptyState";
import { requestTabs, requestStatusFilters, requestsSeed, type Request } from "../data";

function CompanyRequests() {
  const [activeTab, setActiveTab] = useState("company");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 600);
    return () => window.clearTimeout(timer);
  }, []);

  const visibleRequests = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return (requestsSeed[activeTab as keyof typeof requestsSeed] ?? []).filter((request) => {
      if (statusFilter !== "all" && request.status !== statusFilter) return false;
      if (!normalizedQuery) return true;
      return `${request.title} ${request.summary}`.toLowerCase().includes(normalizedQuery);
    });
  }, [activeTab, query, statusFilter]);

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-start">
      <Sidebar />

      <section className="flex min-w-0 flex-1 flex-col gap-5">
        <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-white/80">الطلبات</p>
          <h2 className="mb-2 text-3xl font-bold text-white">متابعة الطلبات والطلبات التشغيلية</h2>
          <p className="text-lg text-white/85">ابحث عن الطلب المناسب ثم تابع حالته بوضوح.</p>
        </div>

        <SharedCard title="الطلبات" subtitle="تصفية الطلبات حسب النوع والحالة">
          <SearchFilterBar
            query={query}
            setQuery={setQuery}
            placeholder="ابحث عن طلب أو وصف..."
            activeValue={statusFilter}
            setActiveValue={setStatusFilter}
            options={requestStatusFilters}
          />
          <TabsBar activeTab={activeTab} setActiveTab={setActiveTab} tabs={requestTabs} />

          {isLoading ? (
            <SkeletonGrid count={3} containerClassName="grid gap-3 md:grid-cols-2" itemClassName="h-32" />
          ) : visibleRequests.length > 0 ? (
            <div className="grid gap-3 md:grid-cols-2">
              {visibleRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onViewDetails={() => setSelectedRequest(request)}
                />
              ))}
            </div>
          ) : (
            <EmptyState message="لا توجد طلبات تطابق الفلتر الحالي." />
          )}
        </SharedCard>
      </section>

      {selectedRequest && (
        <RequestDetailModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}
    </div>
  );
}

export default CompanyRequests;
