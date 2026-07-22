// StudentWishlist.tsx — Wishlist page.
// Stats strip (4 cards) → search/sort/filter bar → category chips → item grid.
// WishlistProvider and useWishlist live in ../context/WishlistContext.

import { useMemo, useState } from "react";
import { useRole } from "../../../shared/context/RoleContext";
import SharedCard from "../../../shared/components/SharedCard";
import {
  useWishlist,
  type WishlistItem,
  type RegistrationStatus,
} from "../context/WishlistContext";
import {
  WISHLIST_SORT_OPTIONS,
  WISHLIST_CATEGORY_FILTERS,
  WISHLIST_STATUS_CONFIG,
  WISHLIST_TYPE_BADGE_STYLES,
} from "../../../mock";
import type { WishlistSortKey } from "../../../mock";

// ── Toast ──────────────────────────────────────────────────────────────────────

function WishlistToast() {
  const { toast } = useWishlist();
  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg"
    >
      تمت الإضافة إلى المفضلة
    </div>
  );
}

// ── AddToWishlistButton (exported for use in catalogue pages) ──────────────────

export function AddToWishlistButton({ item }: { item: WishlistItem }) {
  const { addItem, hasItem } = useWishlist();
  const already = hasItem(item.id);

  return (
    <>
      <button
        type="button"
        onClick={() => addItem(item)}
        disabled={already}
        className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
          already
            ? "cursor-default bg-emerald-100 text-emerald-700"
            : "bg-brand-light text-brand-text hover:bg-brand-main hover:text-white"
        }`}
      >
        {already ? "في المفضلة" : "إضافة للمفضلة"}
      </button>
      <WishlistToast />
    </>
  );
}

// ── Stats strip ────────────────────────────────────────────────────────────────

interface StatCard {
  label: string;
  value: number;
  icon: string;
  iconBg: string;
  iconColor: string;
}

function buildStats(items: WishlistItem[]): StatCard[] {
  return [
    { label: "إجمالي العناصر",   value: items.length, icon: "⊞", iconBg: "bg-brand-main/10", iconColor: "text-brand-main" },
    { label: "التسجيل مفتوح",     value: items.filter((i) => i.registrationStatus === "open" || i.registrationStatus === "free").length, icon: "✓", iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
    { label: "يبدأ قريباً",       value: items.filter((i) => i.registrationStatus === "soon").length,   icon: "◷", iconBg: "bg-amber-100",    iconColor: "text-amber-600"  },
    { label: "انتهى التسجيل",     value: items.filter((i) => i.registrationStatus === "closed").length, icon: "✕", iconBg: "bg-rose-100",     iconColor: "text-rose-500"   },
  ];
}

function StatsStrip({ items }: { items: WishlistItem[] }) {
  const stats = buildStats(items);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat) => (
        <SharedCard
          key={stat.label}
          boxed
          rounded="rounded-2xl"
          padding="px-4 py-4"
          className="flex items-center justify-between gap-3"
        >
          <div>
            <p className="mb-0.5 text-xs text-brand-muted">{stat.label}</p>
            <strong className="text-2xl font-bold text-brand-text">{stat.value}</strong>
          </div>
          <span className={`flex h-10 w-10 items-center justify-center rounded-full text-lg ${stat.iconBg} ${stat.iconColor}`}>
            {stat.icon}
          </span>
        </SharedCard>
      ))}
    </div>
  );
}

// ── Search & Sort bar ──────────────────────────────────────────────────────────

interface SearchSortBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  sort: WishlistSortKey;
  onSortChange: (v: WishlistSortKey) => void;
}

function SearchSortBar({ search, onSearchChange, sort, onSortChange }: SearchSortBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {WISHLIST_SORT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSortChange(opt.value)}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition ${
              sort === opt.value
                ? "border-brand-main bg-brand-main/10 text-brand-main"
                : "border-brand-border bg-brand-white text-brand-muted hover:bg-brand-light"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="relative w-full sm:max-w-xs">
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="بحث..."
          className="w-full rounded-full border border-brand-border bg-brand-white py-2 pe-9 ps-4 text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-main/30"
        />
      </div>
    </div>
  );
}

// ── Category chips ─────────────────────────────────────────────────────────────

function CategoryChips({ active, onChange }: { active: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-bold text-brand-muted">التصنيف:</span>
      {WISHLIST_CATEGORY_FILTERS.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat)}
          className={`rounded-full border px-3 py-1 text-xs font-bold transition ${
            active === cat
              ? "border-brand-main bg-brand-main text-white"
              : "border-brand-border bg-brand-white text-brand-text hover:bg-brand-light"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

// ── Item card ──────────────────────────────────────────────────────────────────

function WishlistCard({ item, onRemove }: { item: WishlistItem; onRemove: (id: string) => void }) {
  const status = WISHLIST_STATUS_CONFIG[item.registrationStatus];

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-brand-border bg-brand-white shadow-sm transition hover:shadow-md">
      {/* Cover */}
      <div className="relative flex h-36 items-center justify-center bg-[linear-gradient(135deg,var(--c-hero-start),var(--c-hero-end))]">
        <span className="text-4xl font-extrabold text-white/80">{item.coverIcon}</span>

        <span className={`absolute right-2 top-2 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${WISHLIST_TYPE_BADGE_STYLES[item.type] ?? ""}`}>
          {item.type}
        </span>

        <span className={`absolute left-2 top-2 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${status.badge}`}>
          {item.registrationStatus === "soon" && item.startsInDays
            ? `يبدأ بعد ${item.startsInDays} أيام`
            : status.label}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-sm font-bold text-brand-text">{item.title}</h3>
        <p className="text-xs text-brand-muted">{item.instructor}</p>

        <div className="flex items-center gap-3 text-xs text-brand-muted">
          <span>📅 {item.durationWeeks} أسابيع</span>
          <span className="font-bold text-brand-text">
            {item.price === 0 ? "مجاني" : `${item.price} ريال`}
          </span>
        </div>

        <div className="mt-auto flex gap-2 pt-2">
          <button
            type="button"
            className="flex-1 rounded-lg border border-brand-border py-1.5 text-xs font-bold text-brand-text transition hover:bg-brand-light"
          >
            عرض التفاصيل
          </button>
          <button
            type="button"
            className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition ${status.actionStyle}`}
            disabled={item.registrationStatus === "closed" || item.registrationStatus === "soon"}
          >
            {status.actionLabel}
          </button>
        </div>

        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="mt-1 self-end text-[11px] text-rose-400 transition hover:text-rose-600"
        >
          إزالة من القائمة
        </button>
      </div>
    </article>
  );
}

// ── Page Component ─────────────────────────────────────────────────────────────

export default function StudentWishlist() {
  const { items, removeItem } = useWishlist();
  const { language, direction } = useRole();

  const [search, setSearch]     = useState("");
  const [sort, setSort]         = useState<WishlistSortKey>("newest");
  const [category, setCategory] = useState("الكل");

  const visibleItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = items.filter((item) => {
      const title = language === "ar" ? item.title : item.titleEn;
      if (query && !title.toLowerCase().includes(query)) return false;
      if (category !== "الكل" && item.category !== category) return false;
      if (sort === "free" && item.price !== 0) return false;
      return true;
    });

    if (sort === "newest") {
      return [...filtered].sort((a, b) => b.date.localeCompare(a.date));
    }
    if (sort === "ending") {
      const order: Record<RegistrationStatus, number> = { closed: 0, soon: 1, open: 2, free: 3 };
      return [...filtered].sort((a, b) => order[a.registrationStatus] - order[b.registrationStatus]);
    }
    return filtered;
  }, [items, search, sort, category, language]);

  return (
    <section dir={direction} className="flex flex-col gap-5">

      {/* Header banner */}
      <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
        <h2 className="mb-1 text-3xl font-bold">المفضلة</h2>
        <p className="text-white/85">
          {language === "ar"
            ? "تابع دوراتك ومعسكراتك ومسابقاتك المفضلة"
            : "Track your favourite courses, camps and competitions"}
        </p>
      </div>

      <StatsStrip items={items} />

      <SearchSortBar
        search={search}
        onSearchChange={setSearch}
        sort={sort}
        onSortChange={setSort}
      />

      <CategoryChips active={category} onChange={setCategory} />

      {visibleItems.length === 0 ? (
        <p className="rounded-xl border border-dashed border-brand-border bg-brand-white p-8 text-center text-sm text-brand-muted">
          لا توجد عناصر في المفضلة
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleItems.map((item) => (
            <WishlistCard key={item.id} item={item} onRemove={removeItem} />
          ))}
        </div>
      )}

      <WishlistToast />
    </section>
  );
}
