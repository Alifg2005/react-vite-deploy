// CompanyNotifications.tsx — Company notifications page.
// Mirrors the Student notifications layout (search + status/type filters +
// reset, relative timestamps, per-row read/delete actions) while keeping the
// company's own notification types (activity/request/system/approval).

import { useMemo, useState } from 'react';
import SharedCard from '../../../shared/components/SharedCard';
import Sidebar from '../../../shared/components/DashboardSidebar';
import NotificationFilterDropdown from '../../../shared/components/NotificationFilterDropdown';
import { useNotifications } from '../../../context/NotificationsContext';
import { notificationTypeFilters, notificationTypeStyles, type Notification } from '../data';
import { formatNotificationTime } from '../utils/notificationUtils';
import { NOTIFICATIONS_ICON_PATHS } from '../../../mock';

function Icon({ name, className = "h-4 w-4" }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={NOTIFICATIONS_ICON_PATHS[name]} />
    </svg>
  );
}

function CompanyNotifications() {
  const { notifications, unreadCount, toggleRead, markAllRead, removeNotification } = useNotifications().company;
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<Array<'unread' | 'read'>>([]);
  const [typeFilter, setTypeFilter] = useState<Notification['type'][]>([]);
  const [visibleCount, setVisibleCount] = useState(4);

  function resetFilters() {
    setSearch('');
    setStatusFilter([]);
    setTypeFilter([]);
  }

  function toggleStatusFilter(status: 'unread' | 'read') {
    setStatusFilter((current) => (current.includes(status) ? current.filter((s) => s !== status) : [...current, status]));
  }

  function toggleTypeFilter(type: Notification['type']) {
    setTypeFilter((current) => (current.includes(type) ? current.filter((t) => t !== type) : [...current, type]));
  }

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return notifications.filter((notif) => {
      if (statusFilter.length > 0 && !statusFilter.includes(notif.read ? 'read' : 'unread')) return false;
      if (typeFilter.length > 0 && !typeFilter.includes(notif.type)) return false;
      if (query && !`${notif.title} ${notif.description}`.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [notifications, search, statusFilter, typeFilter]);

  const statusOptions = [
    { value: 'unread', label: 'غير مقروء', style: 'bg-sky-100 text-sky-700' },
    { value: 'read', label: 'مقروء', style: 'bg-emerald-100 text-emerald-700' },
  ];

  const typeOptions = notificationTypeFilters
    .filter((option) => option.value !== 'all')
    .map((option) => ({
      value: option.value as Notification['type'],
      label: option.label,
      style: notificationTypeStyles[option.value as Notification['type']],
    }));

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-start">
      <Sidebar />

      <section className="flex min-w-0 flex-1 flex-col gap-5">
        {/* Header */}
        <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
          <h2 className="mb-1 text-3xl font-bold">الإشعارات</h2>
          <p className="text-white/85">لديك {unreadCount} إشعارات غير مقروءة.</p>
        </div>

        {/* Toolbar */}
        <SharedCard boxed rounded="rounded-xl" padding="p-3" className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-0 flex-1">
            <Icon name="search" className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted inset-s-3" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث في الإشعارات..."
              className="w-full rounded-lg border border-brand-border py-2 text-sm ps-9 pe-3"
            />
          </div>

          <NotificationFilterDropdown
            options={statusOptions}
            selected={statusFilter}
            onToggle={(value) => toggleStatusFilter(value as 'unread' | 'read')}
            buttonLabel="الكل"
            panelTitle="تفعيل حالة الإشعار"
          />

          <NotificationFilterDropdown
            options={typeOptions}
            selected={typeFilter}
            onToggle={(value) => toggleTypeFilter(value as Notification['type'])}
            buttonLabel="النوع"
            panelTitle="تفعيل نوع الإشعار"
          />

          <button
            type="button"
            onClick={resetFilters}
            className="flex shrink-0 items-center gap-1.5 rounded-lg border border-brand-border px-3 py-2 text-sm font-bold text-brand-text transition hover:bg-brand-light"
          >
            <Icon name="reset" />
            إعادة ضبط
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
            {visible.map((notif) => (
              <article
                key={notif.id}
                className={`flex items-center gap-4 rounded-xl border p-4 transition ${
                  notif.read ? "border-brand-border bg-brand-white" : "border-brand-main/30 bg-brand-light"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    {!notif.read && <span className="inline-block h-2 w-2 rounded-full bg-brand-main" />}
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${notificationTypeStyles[notif.type]}`}>
                      {notificationTypeFilters.find((option) => option.value === notif.type)?.label ?? notif.type}
                    </span>
                    <h3 className="text-sm font-bold text-brand-text">{notif.title}</h3>
                  </div>
                  <p className="text-xs leading-relaxed text-brand-muted">{notif.description}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <time className="text-[11px] text-brand-muted">{formatNotificationTime(notif.timestamp)}</time>
                    {notif.actionUrl && notif.actionLabel && (
                      <a href={notif.actionUrl} className="text-[11px] font-bold text-brand-main hover:underline">
                        {notif.actionLabel}
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleRead(notif.id)}
                    aria-label={notif.read ? "تحديد كغير مقروء" : "تحديد كمقروء"}
                    className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                      notif.read ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" : "bg-sky-50 text-sky-600 hover:bg-sky-100"
                    }`}
                  >
                    <Icon name={notif.read ? "check" : "eye"} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeNotification(notif.id)}
                    aria-label="حذف"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-50 text-rose-600 transition hover:bg-rose-100"
                  >
                    <Icon name="trash" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="flex justify-center gap-4">
          {filtered.length > visible.length && (
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + 4)}
              className="text-sm font-bold text-brand-main hover:underline"
            >
              عرض المزيد
            </button>
          )}

          {visibleCount > 4 && (
            <button
              type="button"
              onClick={() => setVisibleCount(4)}
              className="text-sm font-bold text-brand-muted hover:underline"
            >
              عرض أقل
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default CompanyNotifications;
