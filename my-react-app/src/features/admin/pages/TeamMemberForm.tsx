import { useState, type FormEvent } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import SharedCard from "../../../shared/components/SharedCard";
import GradientBanner from "../../../shared/components/GradientBanner";
import { useRole } from "../../../shared/context/RoleContext";
import { useTeam } from "../../../context/TeamContext";
import { COMPANY_EMAIL_DOMAIN, DEPARTMENT_OPTIONS, type AdminDepartment } from "../../../mock";
import { adminTranslations } from "../../../mock";

function TeamMemberForm() {
  const { role, t } = useRole();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { members, inviteMember, updateMember } = useTeam();

  const isEdit = Boolean(id);
  const existing = isEdit ? members.find((item) => item.id === id) : null;

  const [name, setName] = useState(existing?.name ?? "");
  const [email, setEmail] = useState(existing?.email ?? "");
  const [department, setDepartment] = useState<AdminDepartment>(existing?.department ?? "management");
  const [jobTitle, setJobTitle] = useState(existing?.jobTitle ?? "");
  const [error, setError] = useState<string | null>(null);

  if (role !== "admin") return <Navigate to="/dashboard" replace />;
  if (isEdit && !existing) return <Navigate to="/admin/team" replace />;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !jobTitle.trim()) return;

    const values = { name, email, department, jobTitle };
    const result = isEdit && existing ? updateMember(existing.id, values) : inviteMember(values);

    if (!result.ok) {
      setError(t(adminTranslations.team.emailDomainError(COMPANY_EMAIL_DOMAIN)));
      return;
    }

    navigate("/admin/team");
  }

  return (
    <div className="admin-scale flex flex-col gap-5 md:flex-row md:items-start">
      <AdminSidebar />

      <section className="flex min-w-0 flex-1 flex-col gap-5">
        <GradientBanner
          title={isEdit ? t(adminTranslations.team.editEmployeeTitle) : t(adminTranslations.team.addEmployeeTitle)}
          subtitle={
            isEdit
              ? t(adminTranslations.team.editEmployeeSubtitle)
              : t(adminTranslations.team.addEmployeeSubtitle)
          }
        />

        <SharedCard>
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-bold text-brand-text">{t(adminTranslations.team.fullNameLabel)}</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={t(adminTranslations.team.namePlaceholder)}
                className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
                autoFocus
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-bold text-brand-text">{t(adminTranslations.team.workEmailLabel)}</label>
              <input
                type="email"
                dir="ltr"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={`name@${COMPANY_EMAIL_DOMAIN}`}
                className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-bold text-brand-text">{t(adminTranslations.team.departmentLabel)}</label>
              <select
                value={department}
                onChange={(event) => setDepartment(event.target.value as AdminDepartment)}
                className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
              >
                {DEPARTMENT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{t(option.label)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-bold text-brand-text">{t(adminTranslations.team.jobTitleLabel)}</label>
              <input
                value={jobTitle}
                onChange={(event) => setJobTitle(event.target.value)}
                placeholder={t(adminTranslations.team.jobTitlePlaceholder)}
                className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
              />
            </div>

            {error ? <p className="text-sm font-bold text-rose-600 sm:col-span-2">{error}</p> : null}

            <div className="flex gap-2 sm:col-span-2">
              <button type="submit" className="rounded-lg bg-brand-main px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90">
                {isEdit ? t(adminTranslations.common.saveChanges) : t(adminTranslations.team.sendInvite)}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/team")}
                className="rounded-lg border border-brand-border bg-brand-white px-5 py-2.5 text-sm font-bold text-brand-text transition hover:bg-brand-light"
              >
                {t(adminTranslations.common.cancel)}
              </button>
            </div>
          </form>
        </SharedCard>
      </section>
    </div>
  );
}

export default TeamMemberForm;
