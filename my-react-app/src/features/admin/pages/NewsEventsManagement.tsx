import { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AdminIcon from "../components/AdminIcons";
import AdminSidebar from "../components/AdminSidebar";
import {
  AdminPill, AdminResetButton, AdminRowActionButton, AdminSearchInput,
  AdminSelect, AdminShowMoreButton, AdminTableHeadRow, AdminTableShell,
} from "../components/AdminUI";
import SharedCard from "../../../shared/components/SharedCard";
import EmptyState from "../../../shared/components/ui/EmptyState";
import GradientBanner from "../../../shared/components/GradientBanner";
import { useRole } from "../../../shared/context/RoleContext";
import { useNewsEvents } from "../../../context/NewsEventsContext";
import {
  NEWS_EVENTS_TYPE_FILTER_OPTIONS, NEWS_EVENTS_TYPE_TONES, NEWS_EVENTS_STATUS_TONES, NEWS_EVENTS_COLUMNS,
} from "../../../mock";
import { ADMIN_LABELS, adminTranslations } from "../../../mock";

const PAGE_SIZE = 5;

function Thumbnail({ image, title }: { image: string | null; title: string }) {
  if (image) return <img src={image} alt="" className="h-10 w-10 rounded-lg object-cover" />;
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[linear-gradient(135deg,var(--c-hero-start),var(--c-hero-end))] text-sm font-bold text-white">
      {title.trim().charAt(0)}
    </span>
  );
}

function NewsEventsManagement() {
  const { role, t } = useRole();
  const navigate = useNavigate();
  const { items, removeItem } = useNewsEvents();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    return items.filter((item) => {
      if (typeFilter !== "all" && item.type !== typeFilter) return false;
      if (query && !t(item.title).toLowerCase().includes(query)) return false;
      return true;
    });
  }, [items, search, typeFilter, t]);

  function resetFilters() {
    setSearch("");
    setTypeFilter("all");
  }

  if (role !== "admin") return <Navigate to="/dashboard" replace />;

  return (
    <div className="admin-scale flex flex-col gap-5 md:flex-row md:items-start">
      <AdminSidebar />

      <section className="flex min-w-0 flex-1 flex-col gap-5">
        <GradientBanner
          title={t(adminTranslations.newsEvents.pageTitle)}
          subtitle={t(adminTranslations.newsEvents.pageSubtitle)}
        />

        <div>
          <button
            type="button"
            onClick={() => navigate("/admin/news-events/new")}
            className="flex items-center gap-2 rounded-lg bg-brand-main px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
          >
            <AdminIcon name="plus" className="h-4 w-4" />
            {t(adminTranslations.newsEvents.addButton)}
          </button>
        </div>

        <SharedCard title={t(adminTranslations.newsEvents.allItemsTitle(visibleItems.length))}>
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center">
            <AdminResetButton onClick={resetFilters} />
            <AdminSelect value={typeFilter} onChange={setTypeFilter} options={NEWS_EVENTS_TYPE_FILTER_OPTIONS.map((o) => ({ ...o, label: t(o.label) }))} />
            <AdminSearchInput value={search} onChange={setSearch} placeholder={t(adminTranslations.newsEvents.searchPlaceholder)} />
          </div>

          {visibleItems.length > 0 ? (
            <>
              <AdminTableShell>
                <thead>
                  <AdminTableHeadRow columns={NEWS_EVENTS_COLUMNS.map(t)} />
                </thead>
                <tbody>
                  {visibleItems.slice(0, visibleCount).map((item) => (
                    <tr key={item.id} className="border-b border-emerald-100 last:border-0">
                      <td className="px-3 py-3 text-center">
                        <Thumbnail image={item.image} title={t(item.title)} />
                      </td>
                      <td className="px-3 py-3 text-center font-bold text-brand-text">{t(item.title)}</td>
                      <td className="px-3 py-3 text-center">
                        <AdminPill tone={NEWS_EVENTS_TYPE_TONES[item.type]}>{t(ADMIN_LABELS[item.type])}</AdminPill>
                      </td>
                      <td className="px-3 py-3 text-center text-brand-muted">{item.date}</td>
                      <td className="px-3 py-3 text-center">
                        <AdminPill tone={NEWS_EVENTS_STATUS_TONES[item.status]}>{t(ADMIN_LABELS[item.status === "published" ? "published" : "draft"])}</AdminPill>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <AdminRowActionButton
                            icon="pencil"
                            tone="sky"
                            label={t(adminTranslations.common.edit)}
                            onClick={() => navigate(`/admin/news-events/${item.id}/edit`)}
                          />
                          <AdminRowActionButton icon="trash" tone="rose" label={t(adminTranslations.common.delete)} onClick={() => removeItem(item.id)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </AdminTableShell>

              {visibleItems.length > PAGE_SIZE ? (
                <AdminShowMoreButton
                  expanded={visibleCount >= visibleItems.length}
                  onClick={() => setVisibleCount((count) => (count >= visibleItems.length ? PAGE_SIZE : count + PAGE_SIZE))}
                />
              ) : null}
            </>
          ) : (
            <EmptyState message={t(adminTranslations.newsEvents.emptyState)} />
          )}
        </SharedCard>
      </section>
    </div>
  );
}

export default NewsEventsManagement;
