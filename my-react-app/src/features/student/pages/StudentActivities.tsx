// StudentActivities.tsx — "My Courses" hub: courses, camps, and
// competitions together in one unified section, filterable by type. Shows:
//   - 3 stat boxes (registered / pending / completed) that filter the list below
//   - the student's own registered+pending items as compact status cards
//   - a type filter (all/course/camp/competition) to narrow the list further

import { useMemo, useState } from "react";
import { useRole } from "../../../shared/context/RoleContext";
import ProductCard from "../../courses/components/ProductCard";
import SharedCard from "../../../shared/components/SharedCard";
import { PRODUCTS } from "../../../mock";
import { CURRENT_ACTIVITIES } from "../../../mock";
import type { Product } from "../../../mock";
import { ACTIVITIES_STAT_BOXES, ACTIVITIES_ICON_PATHS } from "../../../mock";
import type { ActivityStatusFilter } from "../../../mock";

// ── Types ──────────────────────────────────────────────────────────────────────

type ActivityTypeFilter = "all" | "course" | "camp" | "competition";

interface EnrolledEntry {
  activity: { id: string; progress: number; applicationStatus?: "approved" | "pending" };
  product: Product;
}

const TYPE_FILTERS: { value: ActivityTypeFilter; label: string }[] = [
  { value: "all", label: "الكل" },
  { value: "course", label: "الدورات" },
  { value: "camp", label: "المعسكرات" },
  { value: "competition", label: "المسابقات" },
];

// ── Icons ──────────────────────────────────────────────────────────────────────

function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={ACTIVITIES_ICON_PATHS[name]} />
    </svg>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

interface StatBoxProps {
  icon: string;
  count: number;
  label: string;
  active: boolean;
  onClick: () => void;
}

function StatBox({ icon, count, label, active, onClick }: StatBoxProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl border p-4 text-right transition ${
        active ? "border-brand-main bg-brand-light" : "border-brand-border bg-brand-white hover:bg-brand-light"
      }`}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-main">
        <Icon name={icon} />
      </span>
      <span className="flex flex-col">
        <strong className="text-2xl text-brand-text">{count}</strong>
        <span className="text-xs font-bold text-brand-muted">{label}</span>
      </span>
    </button>
  );
}

// ── Page Component ─────────────────────────────────────────────────────────────

export default function StudentActivities() {
  const { language, direction } = useRole();
  const [typeFilter, setTypeFilter] = useState<ActivityTypeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<ActivityStatusFilter>("all");
  const [search, setSearch] = useState("");
  const [sortByDeadline, setSortByDeadline] = useState(false);
  const [freeOnly, setFreeOnly] = useState(false);
  const [remoteOnly, setRemoteOnly] = useState(false);

  const enrolledEntries = useMemo((): EnrolledEntry[] => {
    return CURRENT_ACTIVITIES.map((activity) => ({
      activity,
      product: (PRODUCTS as Record<string, Product>)[activity.id],
    })).filter(
      (entry): entry is EnrolledEntry =>
        Boolean(entry.product) && (typeFilter === "all" || entry.product.type === typeFilter)
    );
  }, [typeFilter]);

  const registeredCount = enrolledEntries.filter((e) => e.activity.applicationStatus === "approved").length;
  const pendingCount    = enrolledEntries.filter((e) => e.activity.applicationStatus === "pending").length;
  const completedCount  = enrolledEntries.filter(
    (e) => e.activity.applicationStatus === "approved" && e.activity.progress >= 100
  ).length;

  const statCounts: Record<ActivityStatusFilter, number> = {
    all:       enrolledEntries.length,
    approved:  registeredCount,
    pending:   pendingCount,
    completed: completedCount,
  };

  const visibleEnrolled = useMemo(() => {
    const query = search.trim().toLowerCase();

    let items = enrolledEntries.filter(({ activity, product }) => {
      if (statusFilter === "approved" && activity.applicationStatus !== "approved") return false;
      if (statusFilter === "pending"  && activity.applicationStatus !== "pending")  return false;
      if (
        statusFilter === "completed" &&
        !(activity.applicationStatus === "approved" && activity.progress >= 100)
      ) return false;
      if (freeOnly   && !product.pricing.isFree)        return false;
      if (remoteOnly && product.mode !== "remote")       return false;
      if (query      && !product.title.toLowerCase().includes(query)) return false;
      return true;
    });

    if (sortByDeadline) {
      items = [...items].sort(
        (a, b) => (a.product.deadline ?? "").localeCompare(b.product.deadline ?? "")
      );
    }

    return items;
  }, [enrolledEntries, statusFilter, freeOnly, remoteOnly, search, sortByDeadline]);

  return (
    <section dir={direction} className="flex flex-col gap-5">
      {/* Header */}
      <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
        <h2 className="mb-1 text-3xl font-bold">
          {language === "ar" ? "الدورات" : "Courses"}
        </h2>
        <p className="text-white/85">
          {language === "ar" ? "تابع دوراتك ومعسكراتك ومسابقاتك" : "Track your courses, camps, and competitions"}
        </p>
      </div>

      {/* Stat boxes */}
      <div className="grid gap-3 sm:grid-cols-3">
        {ACTIVITIES_STAT_BOXES.map((box) => (
          <StatBox
            key={box.status}
            icon={box.icon}
            label={box.label}
            count={statCounts[box.status]}
            active={statusFilter === box.status}
            onClick={() => setStatusFilter((current) => (current === box.status ? "all" : box.status))}
          />
        ))}
      </div>

      {/* Filters */}
      <SharedCard boxed rounded="rounded-xl" padding="p-4" className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث..."
            className="w-full rounded-lg border border-brand-border px-4 py-2 text-sm sm:max-w-xs"
          />

          <button
            type="button"
            onClick={() => setSortByDeadline((v) => !v)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${
              sortByDeadline ? "bg-brand-main text-white" : "bg-brand-light text-brand-muted"
            }`}
          >
            <Icon name="sort" className="h-3.5 w-3.5" />
            الأقرب انتهاءً
          </button>

          <button
            type="button"
            onClick={() => setFreeOnly((v) => !v)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition ${
              freeOnly ? "bg-brand-main text-white" : "bg-brand-light text-brand-muted"
            }`}
          >
            مجاني فقط
          </button>

          <button
            type="button"
            onClick={() => setRemoteOnly((v) => !v)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition ${
              remoteOnly ? "bg-brand-main text-white" : "bg-brand-light text-brand-muted"
            }`}
          >
            عن بعد فقط
          </button>
        </div>

        {/* Type pills — course / camp / competition, unified in one section */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-bold text-brand-muted">النوع:</span>
          {TYPE_FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setTypeFilter(filter.value)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                typeFilter === filter.value ? "bg-brand-main text-white" : "bg-brand-light text-brand-muted"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </SharedCard>

      {/* Enrolled cards */}
      {visibleEnrolled.length === 0 ? (
        <p className="rounded-xl border border-dashed border-brand-border bg-brand-white p-6 text-center text-sm text-brand-muted">
          لا توجد أنشطة مطابقة
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleEnrolled.map(({ activity, product }) => (
            <ProductCard key={activity.id} product={product} showRating={false} />
          ))}
        </div>
      )}
    </section>
  );
}
