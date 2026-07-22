import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import {
  AdminPill, AdminResetButton, AdminRowActionButton,
  AdminSearchInput, AdminSelect, AdminShowMoreButton, AdminTableHeadRow, AdminTableShell,
} from "../components/AdminUI";
import SharedCard from "../../../shared/components/SharedCard";
import EmptyState from "../../../shared/components/ui/EmptyState";
import GradientBanner from "../../../shared/components/GradientBanner";
import { useRole } from "../../../shared/context/RoleContext";
import {
  ADMIN_REPORTS, REPORT_STATUS_TONES, REPORT_TYPE_OPTIONS, REPORT_STATUS_OPTIONS, REPORT_COLUMNS,
  type AdminReport,
} from "../../../mock";
import { ADMIN_LABELS, adminTranslations } from "../../../mock";

const PAGE_SIZE = 5;

function Reports() {
  const { role, t } = useRole();

  const [reports] = useState(ADMIN_REPORTS);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [date, setDate] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleReports = useMemo(() => {
    const query = search.trim().toLowerCase();
    return reports.filter((item) => {
      if (typeFilter !== "all" && item.type !== typeFilter) return false;
      if (statusFilter !== "all" && item.status !== statusFilter) return false;
      if (date && item.createdDate < date) return false;
      if (query && !t(item.title).toLowerCase().includes(query)) return false;
      return true;
    });
  }, [reports, search, typeFilter, statusFilter, date, t]);

  function resetFilters() {
    setSearch("");
    setTypeFilter("all");
    setStatusFilter("all");
    setDate("");
  }

  function downloadReport(report: AdminReport) {
    window.alert(t(adminTranslations.reports.downloadAlert(t(report.title))));
  }

  async function shareReport(report: AdminReport) {
    const shareUrl = `${window.location.origin}/admin/reports/${report.id}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      window.alert(t(adminTranslations.reports.shareCopiedAlert(shareUrl)));
    } catch {
      window.alert(t(adminTranslations.reports.shareLinkAlert(shareUrl)));
    }
  }

  if (role !== "admin") return <Navigate to="/dashboard" replace />;

  return (
    <div className="admin-scale flex flex-col gap-5 md:flex-row md:items-start">
      <AdminSidebar />

      <section className="flex min-w-0 flex-1 flex-col gap-5">
        <GradientBanner
          title={t(adminTranslations.reports.pageTitle)}
          subtitle={t(adminTranslations.reports.pageSubtitle)}
        />

        <SharedCard title={t(adminTranslations.reports.allReportsTitle(visibleReports.length))}>
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
            <AdminResetButton onClick={resetFilters} />
            <AdminSelect value={typeFilter} onChange={setTypeFilter} options={REPORT_TYPE_OPTIONS.map((o) => ({ ...o, label: t(o.label) }))} />
            <AdminSelect value={statusFilter} onChange={setStatusFilter} options={REPORT_STATUS_OPTIONS.map((o) => ({ ...o, label: t(o.label) }))} />
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="rounded-lg border border-brand-border bg-brand-white px-3 py-2.5 text-sm text-brand-text"
              aria-label={t(adminTranslations.common.date)}
            />
            <AdminSearchInput value={search} onChange={setSearch} placeholder={t(adminTranslations.reports.searchPlaceholder)} />
          </div>

          {visibleReports.length > 0 ? (
            <>
              <AdminTableShell>
                <thead>
                  <AdminTableHeadRow columns={REPORT_COLUMNS.map(t)} />
                </thead>
                <tbody>
                  {visibleReports.slice(0, visibleCount).map((item) => (
                    <tr key={item.id} className="border-b border-emerald-100 last:border-0">
                      <td className="px-3 py-3 text-center">
                        <p className="font-bold text-brand-text">{t(item.title)}</p>
                        {item.subtitle ? <p className="text-xs text-brand-muted">{t(item.subtitle)}</p> : null}
                      </td>
                      <td className="px-3 py-3 text-center text-brand-muted">{t(ADMIN_LABELS[item.section])}</td>
                      <td className="px-3 py-3 text-center">
                        <AdminPill tone="sky">{t(ADMIN_LABELS[item.type])}</AdminPill>
                      </td>
                      <td className="px-3 py-3 text-center text-brand-muted">{item.createdDate}</td>
                      <td className="px-3 py-3 text-center">
                        <AdminPill tone={REPORT_STATUS_TONES[item.status]} dot>{t(ADMIN_LABELS[item.status])}</AdminPill>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <AdminRowActionButton icon="download" tone="sky" label={t(adminTranslations.reports.downloadPdf)} onClick={() => downloadReport(item)} />
                          <AdminRowActionButton icon="link" tone="emerald" label={t(adminTranslations.reports.shareLink)} onClick={() => shareReport(item)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </AdminTableShell>

              {visibleReports.length > PAGE_SIZE ? (
                <AdminShowMoreButton
                  expanded={visibleCount >= visibleReports.length}
                  onClick={() => setVisibleCount((count) => (count >= visibleReports.length ? PAGE_SIZE : count + PAGE_SIZE))}
                />
              ) : null}
            </>
          ) : (
            <EmptyState message={t(adminTranslations.reports.emptyState)} />
          )}
        </SharedCard>
      </section>
    </div>
  );
}

export default Reports;
