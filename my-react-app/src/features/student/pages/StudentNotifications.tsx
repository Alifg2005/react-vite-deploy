// StudentNotifications.tsx — Student notifications page.
// Search + status/type filters + reset, relative timestamps, and per-row
// view/delete actions — matching the platform's admin notifications layout.

import { useMemo, useState } from "react";
import { useRole } from "../../../shared/context/RoleContext";
import SharedCard from "../../../shared/components/SharedCard";
import NotificationFilterDropdown from "../../../shared/components/NotificationFilterDropdown";
import { useNotifications } from "../../../context/NotificationsContext";
import {
  NOTIFICATIONS_INITIAL_VISIBLE_COUNT,
  NOTIFICATION_CATEGORY_STYLES,
  NOTIFICATION_CATEGORY_LABELS,
  NOTIFICATIONS_ICON_PATHS,
} from "../../../mock";
import type { NotificationCategory } from "../../../mock";

// ── Relative time ──────────────────────────────────────────────────────────────

function arabicUnit(n: number, singular: string, dual: string, few: string, many: string): string {
  if (n === 1) return singular;
  if (n === 2) return dual;
  if (n >= 3 && n <= 10) return `${n} ${few}`;
  return `${n} ${many}`;
}

function formatRelativeTime(minutesAgo: number, lang: "ar" | "en"): string {
  if (minutesAgo < 60) {
    return lang === "ar"
      ? `منذ ${arabicUnit(minutesAgo, "دقيقة", "دقيقتان", "دقائق", "دقيقة")}`
      : `${minutesAgo}m ago`;
  }

  const hours = Math.round(minutesAgo / 60);
  if (hours < 24) {
    return lang === "ar"
      ? `منذ ${arabicUnit(hours, "ساعة", "ساعتان", "ساعات", "ساعة")}`
      : `${hours}h ago`;
  }

  const days = Math.round(hours / 24);
  return lang === "ar"
    ? `منذ ${arabicUnit(days, "يوم", "يومان", "أيام", "يوم")}`
    : `${days}d ago`;
}

// ── Icons ──────────────────────────────────────────────────────────────────────

function Icon({ name, className = "h-4 w-4" }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={NOTIFICATIONS_ICON_PATHS[name]} />
    </svg>
  );
}

// ── Component ──────────────────────────────────────────────────────────────────

const NOTIFICATION_CATEGORIES = Object.keys(NOTIFICATION_CATEGORY_LABELS) as NotificationCategory[];

export default function StudentNotifications() {
  const { language, direction } = useRole();
  const lang = language;

  const { notifications, unreadCount, toggleRead, markAllRead, removeNotification } = useNotifications().student;
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Array<"unread" | "read">>([]);
  const [typeFilter, setTypeFilter] = useState<NotificationCategory[]>([]);
  const [visibleCount, setVisibleCount] = useState(NOTIFICATIONS_INITIAL_VISIBLE_COUNT);

  function resetFilters() {
    setSearch("");
    setStatusFilter([]);
    setTypeFilter([]);
  }

  function toggleStatusFilter(status: "unread" | "read") {
    setStatusFilter((current) => (current.includes(status) ? current.filter((s) => s !== status) : [...current, status]));
  }

  function toggleTypeFilter(category: NotificationCategory) {
    setTypeFilter((current) =>
      current.includes(category) ? current.filter((c) => c !== category) : [...current, category]
    );
  }

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return notifications.filter((n) => {
      if (statusFilter.length > 0 && !statusFilter.includes(n.read ? "read" : "unread")) return false;
      if (typeFilter.length > 0 && !typeFilter.includes(n.category)) return false;
      if (query) {
        const title = lang === "ar" ? n.titleAr : n.titleEn;
        const body  = lang === "ar" ? n.bodyAr  : n.bodyEn;
        if (!`${title} ${body}`.toLowerCase().includes(query)) return false;
      }
      return true;
    });
  }, [notifications, search, statusFilter, typeFilter, lang]);

  const visible = filtered.slice(0, visibleCount);

  const statusOptions = [
    { value: "unread", label: lang === "ar" ? "غير مقروء" : "Unread", style: "bg-sky-100 text-sky-700" },
    { value: "read", label: lang === "ar" ? "مقروء" : "Read", style: "bg-emerald-100 text-emerald-700" },
  ];

  const typeOptions = NOTIFICATION_CATEGORIES.map((category) => ({
    value: category,
    label: NOTIFICATION_CATEGORY_LABELS[category][lang],
    style: NOTIFICATION_CATEGORY_STYLES[category],
  }));

  return (
    <section dir={direction} className="flex flex-col gap-5">
      {/* Header */}
      <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
        <h2 className="mb-1 text-3xl font-bold">الإشعارات</h2>
        <p className="text-white/85">
          {lang === "ar" ? `لديك ${unreadCount} إشعارات غير مقروءة.` : `You have ${unreadCount} unread notifications.`}
        </p>
      </div>

      {/* Toolbar */}
      <SharedCard boxed rounded="rounded-xl" padding="p-3" className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-0 flex-1">
          <Icon name="search" className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted inset-s-3" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === "ar" ? "ابحث في الإشعارات..." : "Search notifications..."}
            className="w-full rounded-lg border border-brand-border py-2 text-sm ps-9 pe-3"
          />
        </div>

        <NotificationFilterDropdown
          options={statusOptions}
          selected={statusFilter}
          onToggle={(value) => toggleStatusFilter(value as "unread" | "read")}
          buttonLabel={lang === "ar" ? "الكل" : "All"}
          panelTitle={lang === "ar" ? "تفعيل حالة الإشعار" : "Enable notification status"}
        />

        <NotificationFilterDropdown
          options={typeOptions}
          selected={typeFilter}
          onToggle={(value) => toggleTypeFilter(value as NotificationCategory)}
          buttonLabel={lang === "ar" ? "النوع" : "Type"}
          panelTitle={lang === "ar" ? "تفعيل نوع الإشعار" : "Enable notification type"}
        />

        <button
          type="button"
          onClick={resetFilters}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-brand-border px-3 py-2 text-sm font-bold text-brand-text transition hover:bg-brand-light"
        >
          <Icon name="reset" />
          {lang === "ar" ? "إعادة ضبط" : "Reset"}
        </button>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllRead}
            className="shrink-0 rounded-lg bg-brand-main px-3 py-2 text-sm font-bold text-white transition hover:opacity-90"
          >
            تحديد الكل كمقروء
          </button>
        )}
      </SharedCard>

      {/* Notification list */}
      {visible.length === 0 ? (
        <p className="rounded-xl border border-dashed border-brand-border bg-brand-white p-6 text-center text-sm text-brand-muted">
          لا توجد إشعارات
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {visible.map((notif) => {
            const catLabel = NOTIFICATION_CATEGORY_LABELS[notif.category][lang];
            const title = lang === "ar" ? notif.titleAr : notif.titleEn;
            const body  = lang === "ar" ? notif.bodyAr  : notif.bodyEn;

            return (
              <article
                key={notif.id}
                className={`flex items-center gap-4 rounded-xl border p-4 transition ${
                  notif.read ? "border-brand-border bg-brand-white" : "border-brand-main/30 bg-brand-light"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    {!notif.read && <span className="inline-block h-2 w-2 rounded-full bg-brand-main" />}
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${NOTIFICATION_CATEGORY_STYLES[notif.category]}`}>
                      {catLabel}
                    </span>
                    <h3 className="text-sm font-bold text-brand-text">{title}</h3>
                  </div>
                  <p className="text-xs leading-relaxed text-brand-muted">{body}</p>
                  <time className="mt-1 block text-[11px] text-brand-muted">
                    {formatRelativeTime(notif.minutesAgo, lang)}
                  </time>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleRead(notif.id)}
                    aria-label={notif.read ? (lang === "ar" ? "تحديد كغير مقروء" : "Mark as unread") : (lang === "ar" ? "تحديد كمقروء" : "Mark as read")}
                    className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                      notif.read ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" : "bg-sky-50 text-sky-600 hover:bg-sky-100"
                    }`}
                  >
                    <Icon name={notif.read ? "check" : "eye"} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeNotification(notif.id)}
                    aria-label={lang === "ar" ? "حذف" : "Delete"}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-50 text-rose-600 transition hover:bg-rose-100"
                  >
                    <Icon name="trash" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <div className="flex justify-center gap-4">
        {filtered.length > visible.length && (
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + NOTIFICATIONS_INITIAL_VISIBLE_COUNT)}
            className="text-sm font-bold text-brand-main hover:underline"
          >
            {lang === "ar" ? "عرض المزيد" : "Show more"}
          </button>
        )}

        {visibleCount > NOTIFICATIONS_INITIAL_VISIBLE_COUNT && (
          <button
            type="button"
            onClick={() => setVisibleCount(NOTIFICATIONS_INITIAL_VISIBLE_COUNT)}
            className="text-sm font-bold text-brand-muted hover:underline"
          >
            {lang === "ar" ? "عرض أقل" : "Show less"}
          </button>
        )}
      </div>
    </section>
  );
}
