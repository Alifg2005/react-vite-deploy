import React from "react";
import { useMemo, useRef, useState } from "react";
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { useNavigate, Navigate } from "react-router-dom";
import { useRole } from "../../../shared/context/RoleContext";
import { DASHBOARD_DATA, PRODUCTS, COMPLETED_ITEMS, CURRENT_ACTIVITIES } from "../../../mock";
import ProductCard from "../../courses/components/ProductCard";
import Sidebar from "../../../shared/components/DashboardSidebar";
import SharedCard from "../../../shared/components/SharedCard";
import Card from "../../../shared/components/ui/Card";
import EmptyState from "../../../shared/components/ui/EmptyState";
import FilterBar from "../../../shared/components/ui/FilterBar";
import GradientBanner from "../../../shared/components/GradientBanner";

const COMPLETED_TYPE_FILTERS = [
  { value: "all", label: "الكل" },
  { value: "دورة", label: "دورة" },
  { value: "معسكر", label: "معسكر" },
  { value: "مسابقة", label: "مسابقة" },
];

const ACTIVITY_TYPE_FILTERS = [
  { value: "all", label: "الكل" },
  { value: "course", label: "دورة" },
  { value: "camp", label: "معسكر" },
  { value: "competition", label: "مسابقة" },
];

const ACTIVITY_GROUPS = [
  { type: "course", label: "الدورات", countLabel: "دورات" },
  { type: "camp", label: "المعسكرات", countLabel: "معسكرات" },
  { type: "competition", label: "المسابقات", countLabel: "مسابقات" },
];

const ACTIVITY_STATUS_FILTERS = [
  { value: "all", label: "فلترة: الكل" },
  { value: "in-progress", label: "قيد التقدم" },
  { value: "completed", label: "مكتمل" },
];

function ChartCard({ chart }: { chart: import("../../../mock").DashboardChart }) {
  return (
    <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-6 text-white">
      <h3 className="mb-4 text-xl font-bold text-white">{chart.title}</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={chart.data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.35)" />
          <XAxis dataKey="label" stroke="rgba(255,255,255,0.85)" fontSize={12} />
          <YAxis stroke="rgba(255,255,255,0.85)" fontSize={12} />
          <Tooltip />
          <Bar dataKey="value" fill="#ffffff" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface CardCarouselProps<T> { items: T[]; keyFn: (item: T) => string | number; renderItem: (item: T) => React.ReactNode; }
function CardCarousel<T>({ items, keyFn, renderItem }: CardCarouselProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: number) {
    scrollRef.current?.scrollBy({ left: direction * 280, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto scroll-smooth pb-1">
        {items.map((item) => (
          <div key={keyFn(item)} className="w-64 shrink-0">
            {renderItem(item)}
          </div>
        ))}
      </div>
      {items.length > 1 ? (
        <>
          <button type="button" onClick={() => scroll(-1)} aria-label="السابق"
            className="absolute -right-1.5 top-1/2 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-brand-white text-brand-text shadow-md ring-1 ring-brand-border sm:flex">
            ‹
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="التالي"
            className="absolute -left-1.5 top-1/2 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-brand-white text-brand-text shadow-md ring-1 ring-brand-border sm:flex">
            ›
          </button>
        </>
      ) : null}
    </div>
  );
}

interface ActivityItem { product: import("../../../mock").Product; progress: number; }
function ActivityRow({ label, countLabel, items }: { label: string; countLabel: string; items: ActivityItem[] }) {
  const [statusFilter, setStatusFilter] = useState("all");

  const visibleItems = items.filter((item) => {
    if (statusFilter === "completed") return item.progress >= 100;
    if (statusFilter === "in-progress") return item.progress < 100;
    return true;
  });

  if (items.length === 0) return null;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h4 className="text-base font-bold text-brand-text">{label}</h4>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
            {visibleItems.length} {countLabel}
          </span>
        </div>
        <select
          value={statusFilter}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(event.target.value)}
          className="rounded-full border border-brand-border bg-brand-white px-3 py-1 text-xs font-bold text-brand-muted"
        >
          {ACTIVITY_STATUS_FILTERS.map((filter) => (
            <option key={filter.value} value={filter.value}>{filter.label}</option>
          ))}
        </select>
      </div>
      <CardCarousel
        items={visibleItems}
        keyFn={(item) => item.product.id}
        renderItem={(item) => <ProductCard product={item.product} progress={item.progress} />}
      />
    </div>
  );
}

function CurrentActivitiesSection() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const activityItems = useMemo(
    () =>
      CURRENT_ACTIVITIES.map((activity) => ({
        product: PRODUCTS[activity.id],
        progress: activity.progress,
      })).filter((item) => Boolean(item.product)),
    []
  );

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    return activityItems.filter((item) => {
      if (typeFilter !== "all" && item.product.type !== typeFilter) return false;
      if (query && !item.product.title.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [activityItems, search, typeFilter]);

  const groups = ACTIVITY_GROUPS.map((group) => ({
    ...group,
    items: filteredItems.filter((item) => item.product.type === group.type),
  }));

  return (
    <SharedCard title="الأنشطة الحالية">
      <div className="mb-5">
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="ابحث في أنشطتك الحالية..."
          filters={ACTIVITY_TYPE_FILTERS}
          activeFilter={typeFilter}
          onFilterChange={setTypeFilter}
        />
      </div>
      {filteredItems.length > 0 ? (
        <div className="flex flex-col gap-6">
          {groups.map((group) => (
            <ActivityRow key={group.type} label={group.label} countLabel={group.countLabel} items={group.items} />
          ))}
        </div>
      ) : (
        <EmptyState message="لا توجد أنشطة مطابقة لبحثك." />
      )}
    </SharedCard>
  );
}

function CompletedList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    return COMPLETED_ITEMS.filter((item) => {
      if (typeFilter !== "all" && item.type !== typeFilter) return false;
      if (query && !item.title.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [search, typeFilter]);

  return (
    <SharedCard title="الشهادات المكتملة">
      <div className="mb-4">
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="ابحث عن شهادتك باسم الدورة أو المعسكر أو المسابقة..."
          filters={COMPLETED_TYPE_FILTERS}
          activeFilter={typeFilter}
          onFilterChange={setTypeFilter}
        />
      </div>
      {filteredItems.length > 0 ? (
        <div className="grid gap-2.5 md:grid-cols-2">
          {filteredItems.map((item) => (
            <Card key={item.title} as="article" className="flex items-center justify-between gap-3">
              <div>
                <span className="mb-1 inline-block rounded-full bg-brand-main px-2.5 py-0.5 text-[11px] font-bold text-white">
                  {item.type}
                </span>
                <h4 className="text-sm font-bold text-brand-text">{item.title}</h4>
                <p className="text-xs text-brand-muted">تاريخ الإكمال: {item.date}</p>
              </div>
              <button
                type="button"
                className="rounded-lg bg-brand-main px-3 py-1.5 text-xs font-bold text-white transition hover:opacity-90"
                onClick={() => navigate("/about")}
              >
                تحميل PDF
              </button>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState message="لا توجد نتائج مطابقة لبحثك." />
      )}
    </SharedCard>
  );
}

function Dashboard() {
  const { role } = useRole();

  if (role === "guest") return <Navigate to="/login" replace />;
  // Admin has its own dedicated dashboard now — see features/dashboard/pages/AdminDashboard.tsx.
  if (role === "admin") return <Navigate to="/admin" replace />;

  if (role === "trainer") return <Navigate to="/trainer" replace />;

  if (role === "company") return <Navigate to="/company" replace />;

  // Student has its own dedicated dashboard now — see features/student/pages/StudentDashboard.tsx.
  if (role === "student") return <Navigate to="/student/dashboard" replace />;

  const dashboard = DASHBOARD_DATA[role];

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-start">
      <Sidebar />

      <section className="flex min-w-0 flex-1 flex-col gap-5">
        <GradientBanner title={dashboard.title} subtitle={dashboard.subtitle} />

        {role !== "student" ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {dashboard.stats.map((stat) => (
              <Card key={stat.label} as="article" radius="xl" padding="3" className="shadow-sm px-4 py-3">
                <span className="mb-1 block text-sm text-brand-muted">{stat.label}</span>
                <strong className="text-2xl text-brand-text">{stat.value}</strong>
              </Card>
            ))}
          </div>
        ) : null}

        {dashboard.chart ? <ChartCard chart={dashboard.chart} /> : null}

        {role === "student" ? <CompletedList /> : null}
        {role === "student" ? <CurrentActivitiesSection /> : null}
      </section>
    </div>
  );
}

export default Dashboard;
