import { useMemo, useState } from "react";
import Sidebar from "../../../shared/components/DashboardSidebar";
import SharedCard from "../../../shared/components/SharedCard";
import NotificationFilterDropdown from "../../../shared/components/NotificationFilterDropdown";
import { useNotifications } from "../../../context/NotificationsContext";
import {
  NOTIFICATIONS_ICON_PATHS,
  TRAINER_NOTIFICATIONS_TEXT as NOTIFICATIONS_TEXT,
  formatTrainerUnreadMessage as formatUnreadMessage,
  TRAINER_NOTIFICATION_TYPES as NOTIFICATION_TYPES,
  TRAINER_REMINDER_OPTIONS as REMINDER_OPTIONS,
  INITIAL_TRAINER_REMINDER_SETTINGS as INITIAL_REMINDER_SETTINGS,
  type TrainerNotification as Notification,
  type TrainerNotificationType,
  type TrainerReminderKey as ReminderKey,
} from "../../../mock";

function Icon({ name, className = "h-4 w-4" }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={NOTIFICATIONS_ICON_PATHS[name]} />
    </svg>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
        checked ? "bg-brand-main" : "bg-brand-border"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

function NotificationItem({ notification, onToggleRead, onDelete }: { notification: Notification; onToggleRead: (id: number) => void; onDelete: (id: number) => void }) {
  const type = NOTIFICATION_TYPES[notification.type];
  return (
    <article className={`flex items-center gap-4 rounded-xl border p-4 transition ${
      notification.read ? "border-brand-border bg-brand-white" : "border-brand-main/30 bg-brand-main/5"
    }`}>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          {!notification.read && <span className="h-2 w-2 shrink-0 rounded-full bg-brand-main" />}
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${type.style}`}>{type.label}</span>
          <h4 className="text-sm font-bold text-brand-text">{notification.title}</h4>
        </div>
        <p className="text-xs leading-relaxed text-brand-muted">{notification.body}</p>
        <time className="mt-1 block text-[11px] text-brand-muted">{notification.time}</time>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={() => onToggleRead(notification.id)}
          aria-label={notification.read ? "تحديد كغير مقروء" : "تحديد كمقروء"}
          className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
            notification.read ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" : "bg-sky-50 text-sky-600 hover:bg-sky-100"
          }`}
        >
          <Icon name={notification.read ? "check" : "eye"} />
        </button>
        <button
          type="button"
          onClick={() => onDelete(notification.id)}
          aria-label="حذف"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-50 text-rose-600 transition hover:bg-rose-100"
        >
          <Icon name="trash" />
        </button>
      </div>
    </article>
  );
}

function ReminderSettings({ settings, onToggle }: { settings: Record<ReminderKey, boolean>; onToggle: (key: ReminderKey) => void }) {
  return (
    <SharedCard title={NOTIFICATIONS_TEXT.settingsCardTitle} boxed>
      <p className="mb-4 text-sm text-brand-muted">{NOTIFICATIONS_TEXT.settingsDescription}</p>
      <div className="flex flex-col gap-3">
        {REMINDER_OPTIONS.map((option) => (
          <div
            key={option.key}
            className="flex items-center justify-between gap-3 rounded-xl border border-brand-border bg-brand-white p-3"
          >
            <span className="text-sm font-bold text-brand-text">{option.label}</span>
            <Toggle checked={settings[option.key as ReminderKey]} onChange={() => onToggle(option.key as ReminderKey)} />
          </div>
        ))}
      </div>
    </SharedCard>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function TrainerNotifications() {
  const { notifications, unreadCount, toggleRead, markAllRead, removeNotification } = useNotifications().trainer;
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Array<"unread" | "read">>([]);
  const [typeFilter, setTypeFilter] = useState<TrainerNotificationType[]>([]);
  const [reminderSettings, setReminderSettings] = useState<Record<ReminderKey, boolean>>(INITIAL_REMINDER_SETTINGS);

  function resetFilters() {
    setSearch("");
    setStatusFilter([]);
    setTypeFilter([]);
  }

  function toggleStatusFilter(status: "unread" | "read") {
    setStatusFilter((current) => (current.includes(status) ? current.filter((s) => s !== status) : [...current, status]));
  }

  function toggleTypeFilter(type: TrainerNotificationType) {
    setTypeFilter((current) => (current.includes(type) ? current.filter((t) => t !== type) : [...current, type]));
  }

  const filteredNotifications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return notifications.filter((n) => {
      if (statusFilter.length > 0 && !statusFilter.includes(n.read ? "read" : "unread")) return false;
      if (typeFilter.length > 0 && !typeFilter.includes(n.type)) return false;
      if (query && !`${n.title} ${n.body}`.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [notifications, search, statusFilter, typeFilter]);

  const statusOptions = [
    { value: "unread", label: "غير مقروء", style: "bg-sky-100 text-sky-700" },
    { value: "read", label: "مقروء", style: "bg-emerald-100 text-emerald-700" },
  ];

  const typeOptions = (Object.keys(NOTIFICATION_TYPES) as TrainerNotificationType[]).map((type) => ({
    value: type,
    label: NOTIFICATION_TYPES[type].label,
    style: NOTIFICATION_TYPES[type].style,
  }));

  function toggleSetting(key: ReminderKey) {
    setReminderSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-start">
      <Sidebar />
      <section className="flex min-w-0 flex-1 flex-col gap-5">
        <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
          <h2 className="mb-2 text-4xl font-bold text-white">{NOTIFICATIONS_TEXT.heroTitle}</h2>
          <p className="text-lg text-white/85">{formatUnreadMessage(unreadCount)}</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
          <SharedCard boxed>
            <div className="mb-4 flex flex-wrap items-center gap-2">
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
                onToggle={(value) => toggleStatusFilter(value as "unread" | "read")}
                buttonLabel="الكل"
                panelTitle="تفعيل حالة الإشعار"
              />

              <NotificationFilterDropdown
                options={typeOptions}
                selected={typeFilter}
                onToggle={(value) => toggleTypeFilter(value as TrainerNotificationType)}
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
                <button type="button" onClick={markAllRead}
                  className="shrink-0 rounded-lg bg-brand-main px-3 py-2 text-sm font-bold text-white transition hover:opacity-90">
                  {NOTIFICATIONS_TEXT.markAllReadButton}
                </button>
              )}
            </div>

            {filteredNotifications.length > 0 ? (
              <div className="flex flex-col gap-3">
                {filteredNotifications.map((n) => (
                  <NotificationItem key={n.id} notification={n} onToggleRead={toggleRead} onDelete={removeNotification} />
                ))}
              </div>
            ) : (
              <p className="rounded-lg border border-dashed border-brand-border p-4 text-center text-sm text-brand-muted">
                {NOTIFICATIONS_TEXT.emptyMessage}
              </p>
            )}
          </SharedCard>

          <ReminderSettings settings={reminderSettings} onToggle={toggleSetting} />
        </div>
      </section>
    </div>
  );
}

export default TrainerNotifications;
