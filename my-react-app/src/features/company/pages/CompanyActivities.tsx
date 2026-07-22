import { useEffect, useMemo, useState } from "react";
import SharedCard from "../../../shared/components/SharedCard";
import Sidebar from "../../../shared/components/DashboardSidebar";
import ActivityCard from "../components/ActivityCard";
import ActivityDetailsPanel from "../components/ActivityDetailsPanel";
import TabsBar from "../components/TabsBar";
import SearchFilterBar from "../components/SearchFilterBar";
import SkeletonGrid from "../components/SkeletonGrid";
import EmptyState from "../components/EmptyState";
import { activityTabs, activityCategoryFilters, activitiesSeed } from "../data";

function CompanyActivities() {
  const [activeTab, setActiveTab] = useState("current");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 600);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredActivities = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return activitiesSeed.filter((activity) => {
      if (activity.status !== activeTab) return false;
      if (category !== "all" && activity.category !== category) return false;
      if (!normalizedQuery) return true;
      return `${activity.title} ${activity.description}`.toLowerCase().includes(normalizedQuery);
    });
  }, [activeTab, category, query]);

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-start">
      <Sidebar />

      <section className="flex min-w-0 flex-1 flex-col gap-5">
        <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-white/80">إدارة الأنشطة</p>
          <h2 className="mb-2 text-3xl font-bold text-white">الأنشطة والشراكات</h2>
          <p className="text-lg text-white/85">ابحث في الأنشطة، وقم بالفلترة حسب الفئة أو الحالة.</p>
        </div>

        <SharedCard title="الأنشطة" subtitle="ابحث وقم بالفلترة بسلاسة">
          <SearchFilterBar
            query={query}
            setQuery={setQuery}
            placeholder="ابحث عن نشاط أو وصف..."
            activeValue={category}
            setActiveValue={setCategory}
            options={activityCategoryFilters}
          />

          <TabsBar activeTab={activeTab} setActiveTab={setActiveTab} tabs={activityTabs} />

          {isLoading ? (
            <SkeletonGrid count={4} containerClassName="grid gap-3 md:grid-cols-2" itemClassName="h-40" />
          ) : selectedActivity ? (
            <ActivityDetailsPanel
              activity={selectedActivity}
              onBack={() => setSelectedActivity(null)}
            />
          ) : filteredActivities.length > 0 ? (
            <div className="grid gap-3 md:grid-cols-2">
              {filteredActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} onViewDetails={setSelectedActivity} />
              ))}
            </div>
          ) : (
            <EmptyState message="لا توجد أنشطة تطابق الفلتر الحالي." />
          )}
        </SharedCard>
      </section>
    </div>
  );
}

export default CompanyActivities;
