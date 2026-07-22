// StudentDashboard.tsx — Student dashboard home/overview ("الرئيسية" in the sidebar).
// The sidebar and other section pages (Activities, Wishlist, Notifications,
// Schedule, Support) live one level up in StudentLayout / their own routes —
// this page shows completed certificates + current activities at a glance.

import { useMemo, useRef, useState } from "react";
import { useRole } from "../../../shared/context/RoleContext";
import SharedCard from "../../../shared/components/SharedCard";
import ProductCard from "../../courses/components/ProductCard";
import StudentLearningAnalytics from "../components/analytics/StudentLearningAnalytics";
import { PRODUCTS } from "../../../mock";
import { COMPLETED_ITEMS, CURRENT_ACTIVITIES } from "../../../mock";
import {
  DASHBOARD_COMPLETED_TYPE_FILTERS,
  DASHBOARD_ACTIVITY_TYPE_FILTERS,
  DASHBOARD_ACTIVITY_GROUPS,
  DASHBOARD_ACTIVITY_STATUS_FILTERS,
} from "../../../mock";

// ── Types ──────────────────────────────────────────────────────────────────────

interface ActivityItem {
  activity: { id: string; progress: number };
  product: (typeof PRODUCTS)[string];
}

interface ActivityGroupConfig {
  type: string;
  label: string;
  countLabel: string;
  items: ActivityItem[];
}

// ── Sub-components ──────────────────────────────────────────────────────────────

interface CardCarouselProps<T> {
  items: T[];
  keyFn: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
}

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
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="السابق"
            className="absolute -right-1.5 top-1/2 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-brand-white text-brand-text shadow-md ring-1 ring-brand-border sm:flex"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="التالي"
            className="absolute -left-1.5 top-1/2 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-brand-white text-brand-text shadow-md ring-1 ring-brand-border sm:flex"
          >
            ›
          </button>
        </>
      ) : null}
    </div>
  );
}

interface ActivityRowProps {
  label: string;
  countLabel: string;
  items: ActivityItem[];
}

function ActivityRow({ label, countLabel, items }: ActivityRowProps) {
  const [statusFilter, setStatusFilter] = useState("all");

  const visibleItems = items.filter((item) => {
    if (statusFilter === "completed") return item.activity.progress >= 100;
    if (statusFilter === "in-progress") return item.activity.progress < 100;
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
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-full border border-brand-border bg-brand-white px-3 py-1 text-xs font-bold text-brand-muted"
        >
          {DASHBOARD_ACTIVITY_STATUS_FILTERS.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </select>
      </div>

      <CardCarousel
        items={visibleItems}
        keyFn={(item) => item.product.id}
        renderItem={(item) => <ProductCard product={item.product} showRating={false} />}
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
        activity,
        product: (PRODUCTS as Record<string, (typeof PRODUCTS)[keyof typeof PRODUCTS]>)[activity.id],
      })).filter((item) => Boolean(item.product)) as ActivityItem[],
    []
  );

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    return activityItems.filter(({ product }) => {
      if (typeFilter !== "all" && product.type !== typeFilter) return false;
      if (query && !product.title.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [activityItems, search, typeFilter]);

  const groups: ActivityGroupConfig[] = DASHBOARD_ACTIVITY_GROUPS.map((group) => ({
    ...group,
    items: filteredItems.filter((item) => item.product.type === group.type),
  }));

  return (
    <SharedCard title="الأنشطة الحالية">
      <div className="mb-5 flex flex-col gap-3">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="ابحث في أنشطتك الحالية..."
          className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
        />

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-brand-muted">فلترة:</span>
          {DASHBOARD_ACTIVITY_TYPE_FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setTypeFilter(filter.value)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                typeFilter === filter.value
                  ? "bg-brand-main text-white"
                  : "bg-brand-white text-brand-muted"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className="flex flex-col gap-6">
          {groups.map((group) => (
            <ActivityRow
              key={group.type}
              label={group.label}
              countLabel={group.countLabel}
              items={group.items}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-brand-border bg-brand-white p-4 text-center text-sm text-brand-muted">
          لا توجد أنشطة مطابقة لبحثك.
        </p>
      )}
    </SharedCard>
  );
}

function CompletedList() {
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
      <div className="mb-4 flex flex-col gap-3">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="ابحث عن شهادتك باسم الدورة أو المعسكر أو المسابقة..."
          className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
        />

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-brand-muted">فلترة:</span>
          {DASHBOARD_COMPLETED_TYPE_FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setTypeFilter(filter.value)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                typeFilter === filter.value
                  ? "bg-brand-main text-white"
                  : "bg-brand-white text-brand-muted"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid gap-2.5 md:grid-cols-2">
          {filteredItems.map((item) => (
            <article
              key={item.title}
              className="flex items-center justify-between gap-3 rounded-lg border border-brand-border bg-brand-white p-3"
            >
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
              >
                تحميل PDF
              </button>
            </article>
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-brand-border bg-brand-white p-4 text-center text-sm text-brand-muted">
          لا توجد نتائج مطابقة لبحثك.
        </p>
      )}
    </SharedCard>
  );
}

// ── Page Component ─────────────────────────────────────────────────────────────

export default function StudentDashboard() {
  const { direction } = useRole();

  return (
    <div dir={direction} className="flex flex-col gap-5">
      {/* Hero */}
      <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
        <h2 className="mb-2 text-3xl font-bold text-white">لوحة المتدرب</h2>
        <p className="text-lg text-white/85">تابع برامجك، شهاداتك، والأنشطة الحالية.</p>
      </div>

      <StudentLearningAnalytics />
      <CompletedList />
      <CurrentActivitiesSection />
    </div>
  );
}
