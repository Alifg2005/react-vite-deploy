import { Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { AdminPill, PendingStatusPill } from "../components/AdminUI";
import Card from "../../../shared/components/ui/Card";
import SharedCard from "../../../shared/components/SharedCard";
import GradientBanner from "../../../shared/components/GradientBanner";
import { useRole } from "../../../shared/context/RoleContext";
import { useApprovalRequests } from "../../../context/ApprovalRequestsContext";
import type { ProgramApprovalRequest } from "../../../mock";
import { ADMIN_LABELS, adminTranslations } from "../../../mock";

function DetailField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="mb-1.5 block text-sm font-bold text-brand-text">{label}</span>
      <p className="rounded-lg border border-brand-border bg-brand-light px-4 py-2.5 text-sm text-brand-text">{children}</p>
    </div>
  );
}

function DetailActions({ onApprove, onReject, onBack }: { onApprove: () => void; onReject: () => void; onBack: () => void }) {
  const { t } = useRole();
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={onApprove}
        className="rounded-lg bg-emerald-100 px-5 py-2.5 text-sm font-bold text-emerald-700 transition hover:bg-emerald-200"
      >
        {t(adminTranslations.approvalRequestDetail.accept)}
      </button>
      <button
        type="button"
        onClick={onReject}
        className="rounded-lg bg-rose-100 px-5 py-2.5 text-sm font-bold text-rose-700 transition hover:bg-rose-200"
      >
        {t(adminTranslations.approvalRequestDetail.reject)}
      </button>
      <button
        type="button"
        onClick={onBack}
        className="rounded-lg border border-brand-border bg-brand-white px-5 py-2.5 text-sm font-bold text-brand-text transition hover:bg-brand-light"
      >
        {t(adminTranslations.approvalRequestDetail.back)}
      </button>
    </div>
  );
}

function AboutSection({ program }: { program: ProgramApprovalRequest }) {
  const { t } = useRole();
  if (!program.about) return null;
  return (
    <SharedCard title={t(adminTranslations.approvalRequestDetail.aboutProgram)}>
      <p className="text-sm leading-7 text-brand-muted">{t(program.about)}</p>
    </SharedCard>
  );
}

function OutcomesSection({ program }: { program: ProgramApprovalRequest }) {
  const { t } = useRole();
  if (!program.outcomes?.length) return null;
  return (
    <SharedCard title={t(adminTranslations.approvalRequestDetail.outcomes)}>
      <div className="grid gap-3 sm:grid-cols-2">
        {program.outcomes.map((skill, index) => (
          <Card key={index} className="flex items-start gap-2 p-3">
            <span className="mt-0.5 text-brand-main">◆</span>
            <p className="text-sm text-brand-muted">{t(skill)}</p>
          </Card>
        ))}
      </div>
    </SharedCard>
  );
}

function CurriculumSection({ program }: { program: ProgramApprovalRequest }) {
  const { t } = useRole();
  if (!program.curriculum?.length) return null;
  return (
    <SharedCard title={t(adminTranslations.approvalRequestDetail.curriculum)}>
      <div className="flex flex-col gap-3">
        {program.curriculum.map((item, index) => (
          <Card key={item.title} as="article" className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-main text-sm font-bold text-white">
                {index + 1}
              </span>
              <h4 className="text-base font-bold text-brand-text">{item.title}</h4>
            </div>
            {item.meta ? <span className="text-xs text-brand-muted">{item.meta}</span> : null}
          </Card>
        ))}
      </div>
    </SharedCard>
  );
}

function ApprovalRequestDetail() {
  const { role, t } = useRole();
  const navigate = useNavigate();
  const { kind, id } = useParams<{ kind: string; id: string }>();
  const {
    programRequests, userRequests,
    approveProgramRequest, rejectProgramRequest, approveUserRequest, rejectUserRequest,
  } = useApprovalRequests();

  if (role !== "admin") return <Navigate to="/dashboard" replace />;

  // Program requests live on Program Management, join requests on User
  // Management now — each kind goes back to where its list actually is.
  function goBack() {
    navigate(kind === "program" ? "/admin/programs" : "/admin/users");
  }

  if (kind === "program") {
    const program = programRequests.find((item) => item.id === id);
    if (!program) return <Navigate to="/admin/programs" replace />;

    return (
      <div className="admin-scale flex flex-col gap-5 md:flex-row md:items-start">
        <AdminSidebar />
        <section className="flex min-w-0 flex-1 flex-col gap-5">
          <GradientBanner
            title={t(adminTranslations.approvalRequestDetail.programDetailsTitle)}
            subtitle={t(adminTranslations.approvalRequestDetail.programDetailsSubtitle)}
          />
          <SharedCard>
            <div className="grid gap-4 sm:grid-cols-2">
              <DetailField label={t(adminTranslations.common.programNameLabel)}>{t(program.name)}</DetailField>
              <DetailField label={t(adminTranslations.common.programTypeLabel)}>{t(ADMIN_LABELS[program.type])}</DetailField>
              <DetailField label={t(adminTranslations.common.submittedByLabel)}>{t(program.submittedBy)}</DetailField>
              <DetailField label={t(adminTranslations.common.requestDateLabel)}>{program.date}</DetailField>
              <div>
                <span className="mb-1.5 block text-sm font-bold text-brand-text">{t(adminTranslations.common.status)}</span>
                <p className="rounded-lg border border-brand-border bg-brand-light px-4 py-2.5"><PendingStatusPill /></p>
              </div>
            </div>
          </SharedCard>

          <AboutSection program={program} />
          <OutcomesSection program={program} />
          <CurriculumSection program={program} />

          <SharedCard>
            <DetailActions
              onApprove={() => { approveProgramRequest(program.id); goBack(); }}
              onReject={() => { rejectProgramRequest(program.id); goBack(); }}
              onBack={goBack}
            />
          </SharedCard>
        </section>
      </div>
    );
  }

  const user = userRequests.find((item) => item.id === id);
  if (!user) return <Navigate to="/admin/users" replace />;

  return (
    <div className="admin-scale flex flex-col gap-5 md:flex-row md:items-start">
      <AdminSidebar />
      <section className="flex min-w-0 flex-1 flex-col gap-5">
        <GradientBanner
          title={t(adminTranslations.approvalRequestDetail.requestDetailsTitle)}
          subtitle={t(adminTranslations.approvalRequestDetail.requestDetailsSubtitle)}
        />
        <SharedCard>
          <div className="grid gap-4 sm:grid-cols-2">
            <DetailField label={t(adminTranslations.approvalRequestDetail.userOrgNameLabel)}>{t(user.name)}</DetailField>
            <DetailField label={t(adminTranslations.common.accountType)}>
              <AdminPill tone="violet">{t(ADMIN_LABELS[user.accountType])}</AdminPill>
            </DetailField>
            <DetailField label={t(adminTranslations.common.email)}>
              <span dir="ltr">{user.email}</span>
            </DetailField>
            <DetailField label={t(adminTranslations.common.registrationDateLabel)}>{user.date}</DetailField>
            <div>
              <span className="mb-1.5 block text-sm font-bold text-brand-text">{t(adminTranslations.common.status)}</span>
              <p className="rounded-lg border border-brand-border bg-brand-light px-4 py-2.5"><PendingStatusPill /></p>
            </div>
          </div>
        </SharedCard>

        <SharedCard>
          <DetailActions
            onApprove={() => { approveUserRequest(user.id); goBack(); }}
            onReject={() => { rejectUserRequest(user.id); goBack(); }}
            onBack={goBack}
          />
        </SharedCard>
      </section>
    </div>
  );
}

export default ApprovalRequestDetail;
