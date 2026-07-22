import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import AdminIcon from "../components/AdminIcons";
import AdminSidebar from "../components/AdminSidebar";
import { AdminKebabMenu, AdminPill, AdminResetButton, AdminRowActionButton, AdminSearchInput, AdminShowMoreButton } from "../components/AdminUI";
import SharedCard from "../../../shared/components/SharedCard";
import EmptyState from "../../../shared/components/ui/EmptyState";
import GradientBanner from "../../../shared/components/GradientBanner";
import NotificationFilterDropdown from "../../../shared/components/NotificationFilterDropdown";
import { useRole } from "../../../shared/context/RoleContext";
import { useNotifications } from "../../../context/NotificationsContext";
import {
  NOTIFICATION_TYPE_TONES, NOTIFICATION_TYPE_ICONS, NOTIFICATION_TYPE_FILTER_OPTIONS,
} from "../../../mock";
import { ADMIN_LABELS, adminTranslations } from "../../../mock";

const PAGE_SIZE = 5;

// Same tone -> pill class mapping as AdminPill/AdminUI, kept local since the
// type-filter dropdown needs raw classes rather than an <AdminPill>.
const NOTIFICATION_TONE_CLASSES: Record<string, string> = {
  amber: "bg-amber-100 text-amber-700",
  rose: "bg-rose-100 text-rose-700",
  sky: "bg-sky-100 text-sky-700",
  violet: "bg-violet-100 text-violet-700",
  emerald: "bg-emerald-100 text-emerald-700",
};

function AdminNotifications() {
  const { role, t } = useRole();

  const { notifications, unreadCount, toggleRead, markAllRead, deleteAll, removeNotification } = useNotifications().admin;
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<Array<"unread" | "read">>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleNotifications = useMemo(() => {
    const query = search.trim().toLowerCase();
    return notifications.filter((item) => {
      if (typeFilter.length > 0 && !typeFilter.includes(item.type)) return false;
      if (statusFilter.length > 0 && !statusFilter.includes(item.read ? "read" : "unread")) return false;
      if (query && !t(item.title).toLowerCase().includes(query) && !t(item.message).toLowerCase().includes(query)) return false;
      return true;
    });
  }, [notifications, search, typeFilter, statusFilter, t]);

  function resetFilters() {
    setSearch("");
    setTypeFilter([]);
    setStatusFilter([]);
  }

  function toggleTypeFilter(type: string) {
    setTypeFilter((current) => (current.includes(type) ? current.filter((t) => t !== type) : [...current, type]));
  }

  function toggleStatusFilter(status: "unread" | "read") {
    setStatusFilter((current) => (current.includes(status) ? current.filter((s) => s !== status) : [...current, status]));
  }

  const typeOptions = NOTIFICATION_TYPE_FILTER_OPTIONS.filter((option) => option.value !== "all").map((option) => ({
    value: option.value,
    label: t(option.label),
    style: NOTIFICATION_TONE_CLASSES[NOTIFICATION_TYPE_TONES[option.value]],
  }));

  const statusOptions = [
    { value: "unread", label: t(adminTranslations.notifications.unreadFilter), style: NOTIFICATION_TONE_CLASSES.sky },
    { value: "read", label: t(adminTranslations.notifications.readFilter), style: NOTIFICATION_TONE_CLASSES.emerald },
  ];

  if (role !== "admin") return <Navigate to="/dashboard" replace />;

  return (
    <div className="admin-scale flex flex-col gap-5 md:flex-row md:items-start">
      <AdminSidebar />

      <section className="flex min-w-0 flex-1 flex-col gap-5">
        <GradientBanner
          title={t(adminTranslations.notifications.pageTitle)}
          subtitle={
            unreadCount > 0
              ? t(adminTranslations.notifications.unreadSubtitle(unreadCount))
              : t(adminTranslations.notifications.noNewSubtitle)
          }
        />

        <SharedCard>
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center">
            <AdminSearchInput value={search} onChange={setSearch} placeholder={t(adminTranslations.notifications.searchPlaceholder)} />
            <NotificationFilterDropdown
              options={statusOptions}
              selected={statusFilter}
              onToggle={(value) => toggleStatusFilter(value as "unread" | "read")}
              buttonLabel={t(adminTranslations.notifications.allStatus)}
              panelTitle={t(adminTranslations.notifications.enableStatusTitle)}
            />
            <NotificationFilterDropdown
              options={typeOptions}
              selected={typeFilter}
              onToggle={toggleTypeFilter}
              buttonLabel={t(adminTranslations.notifications.typeFilterLabel)}
              panelTitle={t(adminTranslations.notifications.enableTypeTitle)}
            />
            <AdminResetButton onClick={resetFilters} />
            <AdminKebabMenu
              items={[
                { label: t(adminTranslations.notifications.markAllRead), icon: "check", onClick: markAllRead },
                { label: t(adminTranslations.notifications.deleteAll), icon: "trash", onClick: deleteAll },
              ]}
            />
          </div>

          {visibleNotifications.length > 0 ? (
            <>
              <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-brand-white">
                <ul>
                  {visibleNotifications.slice(0, visibleCount).map((item) => (
                    <li
                      key={item.id}
                      className={`flex items-center gap-3 border-b border-emerald-100 px-4 py-3 last:border-0 ${
                        item.read ? "" : "bg-brand-light/50"
                      }`}
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-light">
                        <AdminIcon name={NOTIFICATION_TYPE_ICONS[item.type]} className="h-4 w-4 text-brand-main" />
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-bold text-brand-text">{t(item.title)}</p>
                          <AdminPill tone={NOTIFICATION_TYPE_TONES[item.type]}>{t(ADMIN_LABELS[item.type])}</AdminPill>
                          {!item.read ? <span className="h-2 w-2 shrink-0 rounded-full bg-brand-main" aria-label={t(adminTranslations.ui.unreadAria)} /> : null}
                        </div>
                        <p className="text-sm text-brand-muted">{t(item.message)}</p>
                        <p className="text-xs text-brand-muted">{t(item.time)}</p>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <AdminRowActionButton
                          icon={item.read ? "check" : "eye"}
                          tone={item.read ? "emerald" : "sky"}
                          label={item.read ? t(adminTranslations.notifications.markedRead) : t(adminTranslations.notifications.markAsRead)}
                          onClick={() => toggleRead(item.id)}
                        />
                        <AdminRowActionButton icon="trash" tone="rose" label={t(adminTranslations.common.delete)} onClick={() => removeNotification(item.id)} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {visibleNotifications.length > PAGE_SIZE ? (
                <AdminShowMoreButton
                  expanded={visibleCount >= visibleNotifications.length}
                  onClick={() => setVisibleCount((count) => (count >= visibleNotifications.length ? PAGE_SIZE : count + PAGE_SIZE))}
                />
              ) : null}
            </>
          ) : (
            <EmptyState message={t(adminTranslations.notifications.emptyState)} />
          )}
        </SharedCard>
      </section>
    </div>
  );
}

export default AdminNotifications;
