import { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AdminIcon from "../components/AdminIcons";
import AdminSidebar from "../components/AdminSidebar";
import {
  AdminPill, AdminResetButton, AdminSearchInput, AdminSelect, AdminShowMoreButton,
  AdminRowActionButton, AdminTableHeadRow, AdminTableShell, PendingStatusPill,
} from "../components/AdminUI";
import SharedCard from "../../../shared/components/SharedCard";
import EmptyState from "../../../shared/components/ui/EmptyState";
import GradientBanner from "../../../shared/components/GradientBanner";
import { useRole } from "../../../shared/context/RoleContext";
import { usePrograms } from "../../../context/ProgramsContext";
import { useApprovalRequests } from "../../../context/ApprovalRequestsContext";
import {
  PROGRAM_TYPE_TONES, PROGRAM_STATUS_TONES, PROGRAM_SORT_OPTIONS,
  PROGRAM_STATUS_FILTER_OPTION_ALL, PROGRAM_MANAGEMENT_COLUMNS, APPROVAL_PROGRAM_COLUMNS,
  type ProgramApprovalRequest,
} from "../../../mock";
import { ADMIN_LABELS, adminTranslations } from "../../../mock";

const PAGE_SIZE = 5;

function ProgramThumbnail({ image, title }: { image: string | null; title: string }) {
  if (image) {
    return <img src={image} alt="" className="h-10 w-10 rounded-lg object-cover" />;
  }

  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[linear-gradient(135deg,var(--c-hero-start),var(--c-hero-end))] text-sm font-bold text-white">
      {title.trim().charAt(0)}
    </span>
  );
}

// Moved here (from the retired /admin/approval-requests list page) since
// program approval requests are now managed alongside the program catalogue
// they'll join once approved, instead of a separate page.
function ProgramRequestsSection() {
  const { t } = useRole();
  const navigate = useNavigate();
  const { programRequests } = useApprovalRequests();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  if (programRequests.length === 0) return null;

  const visibleRequests: ProgramApprovalRequest[] = programRequests.slice(0, visibleCount);

  return (
    <SharedCard title={t(adminTranslations.approvalRequests.programRequestsTitle(programRequests.length))}>
      <AdminTableShell>
        <thead>
          <AdminTableHeadRow columns={APPROVAL_PROGRAM_COLUMNS.map(t)} />
        </thead>
        <tbody>
          {visibleRequests.map((item) => (
            <tr key={item.id} className="border-b border-emerald-100 last:border-0">
              <td className="px-3 py-3 text-center">
                <AdminPill tone={PROGRAM_TYPE_TONES[item.type]}>{t(ADMIN_LABELS[item.type])}</AdminPill>
              </td>
              <td className="px-3 py-3 text-center font-bold text-brand-text">{t(item.name)}</td>
              <td className="px-3 py-3 text-center text-brand-muted">{t(item.submittedBy)}</td>
              <td className="px-3 py-3 text-center text-brand-muted">{item.date}</td>
              <td className="px-3 py-3 text-center"><PendingStatusPill /></td>
              <td className="px-3 py-3 text-center">
                <button
                  type="button"
                  onClick={() => navigate(`/admin/approval-requests/program/${item.id}`)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-4 py-2 text-xs font-bold text-sky-700 transition hover:bg-sky-200"
                >
                  {t(adminTranslations.approvalRequests.reviewRequest)}
                  <AdminIcon name="chevron" className="h-3.5 w-3.5 rotate-180" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </AdminTableShell>

      {programRequests.length > PAGE_SIZE ? (
        <AdminShowMoreButton
          expanded={visibleCount >= programRequests.length}
          onClick={() => setVisibleCount((count) => (count >= programRequests.length ? PAGE_SIZE : count + PAGE_SIZE))}
        />
      ) : null}
    </SharedCard>
  );
}

function ProgramManagement() {
  const { role, t } = useRole();
  const navigate = useNavigate();
  const { programs, removeProgram } = usePrograms();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const statusOptions = useMemo(() => {
    const statuses = [...new Set(programs.map((item) => item.status))];
    return [
      { ...PROGRAM_STATUS_FILTER_OPTION_ALL, label: t(PROGRAM_STATUS_FILTER_OPTION_ALL.label) },
      ...statuses.map((status) => ({ value: status, label: t(ADMIN_LABELS[status]) })),
    ];
  }, [programs, t]);

  const visiblePrograms = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = programs.filter((item) => {
      if (statusFilter !== "all" && item.status !== statusFilter) return false;
      if (query && !item.title.toLowerCase().includes(query) && !item.submittedBy.toLowerCase().includes(query)) return false;
      return true;
    });

    const sorted = [...filtered];
    if (sortBy === "newest") sorted.sort((a, b) => b.dateAdded.localeCompare(a.dateAdded));
    if (sortBy === "oldest") sorted.sort((a, b) => a.dateAdded.localeCompare(b.dateAdded));
    return sorted;
  }, [programs, search, statusFilter, sortBy]);

  function resetFilters() {
    setSearch("");
    setStatusFilter("all");
    setSortBy("newest");
  }

  if (role !== "admin") return <Navigate to="/dashboard" replace />;

  return (
    <div className="admin-scale flex flex-col gap-5 md:flex-row md:items-start">
      <AdminSidebar />

      <section className="flex min-w-0 flex-1 flex-col gap-5">
        <GradientBanner
          title={t(adminTranslations.programs.pageTitle)}
          subtitle={t(adminTranslations.programs.pageSubtitle)}
        />

        <div>
          <button
            type="button"
            onClick={() => navigate("/admin/programs/new")}
            className="flex items-center gap-2 rounded-lg bg-brand-main px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
          >
            <AdminIcon name="plus" className="h-4 w-4" />
            {t(adminTranslations.programs.addNewProgram)}
          </button>
        </div>

        <ProgramRequestsSection />

        <SharedCard title={t(adminTranslations.programs.allProgramsTitle(visiblePrograms.length))}>
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center">
            <AdminResetButton onClick={resetFilters} />
            <AdminSelect value={statusFilter} onChange={setStatusFilter} options={statusOptions} />
            <AdminSelect value={sortBy} onChange={setSortBy} options={PROGRAM_SORT_OPTIONS.map((o) => ({ ...o, label: t(o.label) }))} />
            <AdminSearchInput value={search} onChange={setSearch} placeholder={t(adminTranslations.programs.searchPlaceholder)} />
          </div>

          {visiblePrograms.length > 0 ? (
            <>
              <AdminTableShell>
                <thead>
                  <AdminTableHeadRow columns={PROGRAM_MANAGEMENT_COLUMNS.map(t)} />
                </thead>
                <tbody>
                  {visiblePrograms.slice(0, visibleCount).map((item) => (
                    <tr key={item.id} className="border-b border-emerald-100 last:border-0">
                      <td className="px-3 py-3 text-center">
                        <ProgramThumbnail image={item.image} title={item.title} />
                      </td>
                      <td className="px-3 py-3 text-center font-bold text-brand-text">{item.title}</td>
                      <td className="px-3 py-3 text-center">
                        <AdminPill tone={PROGRAM_TYPE_TONES[item.type]}>{t(ADMIN_LABELS[item.type])}</AdminPill>
                      </td>
                      <td className="px-3 py-3 text-center text-brand-muted">{item.submittedBy}</td>
                      <td className="px-3 py-3 text-center">
                        <AdminPill tone={PROGRAM_STATUS_TONES[item.status]}>{t(ADMIN_LABELS[item.status])}</AdminPill>
                      </td>
                      <td className="px-3 py-3 text-center text-brand-muted">{item.registeredCount}</td>
                      <td className="px-3 py-3 text-center text-brand-muted">{item.dateAdded}</td>
                      <td className="px-3 py-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <AdminRowActionButton icon="trash" tone="rose" label={t(adminTranslations.common.delete)} onClick={() => removeProgram(item.id)} />
                          <AdminRowActionButton
                            icon="pencil"
                            tone="sky"
                            label={t(adminTranslations.common.edit)}
                            onClick={() => navigate(`/admin/programs/${item.id}/edit`)}
                          />
                          <AdminRowActionButton
                            icon="eye"
                            tone="emerald"
                            label={t(ADMIN_LABELS.view)}
                            onClick={() => (item.id.startsWith("draft-") ? null : navigate(`/program/${item.id}`))}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </AdminTableShell>

              {visiblePrograms.length > PAGE_SIZE ? (
                <AdminShowMoreButton
                  expanded={visibleCount >= visiblePrograms.length}
                  onClick={() => setVisibleCount((count) => (count >= visiblePrograms.length ? PAGE_SIZE : count + PAGE_SIZE))}
                />
              ) : null}
            </>
          ) : (
            <EmptyState message={t(adminTranslations.programs.emptyState)} />
          )}
        </SharedCard>
      </section>
    </div>
  );
}

export default ProgramManagement;
