import { Navigate, useNavigate } from "react-router-dom";
import AdminIcon from "../components/AdminIcons";
import AdminSidebar from "../components/AdminSidebar";
import { AdminPill, AdminRowActionButton, AdminTableHeadRow, AdminTableShell } from "../components/AdminUI";
import SharedCard from "../../../shared/components/SharedCard";
import EmptyState from "../../../shared/components/ui/EmptyState";
import GradientBanner from "../../../shared/components/GradientBanner";
import { useRole } from "../../../shared/context/RoleContext";
import { useTeam } from "../../../context/TeamContext";
import {
  DEPARTMENT_OPTIONS, TEAM_DEPARTMENT_TONES, TEAM_STATUS_TONES, TEAM_COLUMNS,
  type AdminDepartment, type AdminTeamMember,
} from "../../../mock";
import { ADMIN_LABELS, adminTranslations } from "../../../mock";

function departmentLabel(department: AdminDepartment) {
  return DEPARTMENT_OPTIONS.find((option) => option.value === department)?.label ?? { ar: department, en: department };
}
function statusLabel(status: AdminTeamMember["status"]) {
  return status === "active" ? ADMIN_LABELS.active : ADMIN_LABELS.pendingRegistration;
}

function TeamManagement() {
  const { role, t } = useRole();
  const navigate = useNavigate();
  const { members, removeMember } = useTeam();

  const sortedMembers = [...members].sort((a, b) => b.invitedDate.localeCompare(a.invitedDate));

  function handleRemove(member: AdminTeamMember) {
    if (window.confirm(t(adminTranslations.team.confirmDelete(member.name)))) {
      removeMember(member.id);
    }
  }

  if (role !== "admin") return <Navigate to="/dashboard" replace />;

  return (
    <div className="admin-scale flex flex-col gap-5 md:flex-row md:items-start">
      <AdminSidebar />

      <section className="flex min-w-0 flex-1 flex-col gap-5">
        <GradientBanner
          title={t(adminTranslations.team.pageTitle)}
          subtitle={t(adminTranslations.team.pageSubtitle)}
        />

        <div>
          <button
            type="button"
            onClick={() => navigate("/admin/team/new")}
            className="flex items-center gap-2 rounded-lg bg-brand-main px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
          >
            <AdminIcon name="userPlus" className="h-4 w-4" />
            {t(adminTranslations.team.addEmployee)}
          </button>
        </div>

        <SharedCard title={t(adminTranslations.team.teamMembersTitle(sortedMembers.length))}>
          {sortedMembers.length > 0 ? (
            <AdminTableShell>
              <thead>
                <AdminTableHeadRow columns={TEAM_COLUMNS.map(t)} />
              </thead>
              <tbody>
                {sortedMembers.map((item) => (
                  <tr key={item.id} className="border-b border-emerald-100 last:border-0">
                    <td className="px-3 py-3 text-center font-bold text-brand-text">{item.name}</td>
                    <td className="px-3 py-3 text-center text-brand-muted" dir="ltr">{item.email}</td>
                    <td className="px-3 py-3 text-center">
                      <AdminPill tone={TEAM_DEPARTMENT_TONES[item.department]}>{t(departmentLabel(item.department))}</AdminPill>
                    </td>
                    <td className="px-3 py-3 text-center text-brand-muted">{item.jobTitle}</td>
                    <td className="px-3 py-3 text-center">
                      <AdminPill tone={TEAM_STATUS_TONES[item.status]}>{t(statusLabel(item.status))}</AdminPill>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <AdminRowActionButton
                          icon="pencil"
                          tone="sky"
                          label={t(adminTranslations.common.edit)}
                          onClick={() => navigate(`/admin/team/${item.id}/edit`)}
                        />
                        <AdminRowActionButton
                          icon="trash"
                          tone="rose"
                          label={t(adminTranslations.common.delete)}
                          onClick={() => handleRemove(item)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </AdminTableShell>
          ) : (
            <EmptyState message={t(adminTranslations.team.emptyState)} />
          )}
        </SharedCard>
      </section>
    </div>
  );
}

export default TeamManagement;
