import { useEffect, useMemo, useState } from "react";
import SharedCard from "../../../shared/components/SharedCard";
import Sidebar from "../../../shared/components/DashboardSidebar";
import StatCard from "../components/StatCard";
import RecentActivityCard from "../components/RecentActivityCard";
import SkeletonGrid from "../components/SkeletonGrid";
import EmptyState from "../components/EmptyState";
import CompanyProgramAnalytics from "../components/analytics/CompanyProgramAnalytics";
import { COMPANY_DASHBOARD_STATS, COMPANY_DASHBOARD_RECENT_ACTIVITIES } from "../../../mock";

function CompanyDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 600);
    return () => window.clearTimeout(timer);
  }, []);

  const visibleActivities = useMemo(() => COMPANY_DASHBOARD_RECENT_ACTIVITIES.slice(0, 3), []);

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-start">
      <Sidebar />

      <section className="flex min-w-0 flex-1 flex-col gap-5">
        <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-white/80">لوحة الشركة</p>
          <h2 className="mb-2 text-3xl font-bold text-white">مركز إدارة الأنشطة</h2>
          <p className="text-lg text-white/85">تابع الأعمال الحالية، المكتملة، والطلبات في لوحة موحدة.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {COMPANY_DASHBOARD_STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>

        <CompanyProgramAnalytics />

        <div>
          <SharedCard title="الأنشطة الأخيرة" subtitle="متابعة موجزة لأحدث الأعمال">
            {isLoading ? (
              <SkeletonGrid count={3} containerClassName="flex flex-col gap-3" itemClassName="h-24" />
            ) : visibleActivities.length > 0 ? (
              <div className="flex flex-col gap-3">
                {visibleActivities.map((activity) => (
                  <RecentActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            ) : (
              <EmptyState message="لا توجد أنشطة حديثة في هذا الوقت." />
            )}
          </SharedCard>
        </div>
      </section>
    </div>
  );
}

export default CompanyDashboard;
