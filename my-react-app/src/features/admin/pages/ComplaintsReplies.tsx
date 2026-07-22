import { Fragment, useMemo, useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import {
  AdminKebabMenu, AdminPill, AdminResetButton, AdminRowActionButton,
  AdminSearchInput, AdminSelect, AdminShowMoreButton, AdminTableHeadRow, AdminTableShell,
} from "../components/AdminUI";
import SharedCard from "../../../shared/components/SharedCard";
import EmptyState from "../../../shared/components/ui/EmptyState";
import GradientBanner from "../../../shared/components/GradientBanner";
import { useRole } from "../../../shared/context/RoleContext";
import {
  ADMIN_COMPLAINTS, COMPLAINT_STATUS_TONES, COMPLAINT_CATEGORY_OPTIONS, COMPLAINT_STATUS_OPTIONS, COMPLAINT_COLUMNS,
  type AdminComplaint,
} from "../../../mock";
import { ADMIN_LABELS, adminTranslations } from "../../../mock";

const PAGE_SIZE = 5;

function ComplaintDetailRow({ complaint }: { complaint: AdminComplaint }) {
  const { t } = useRole();
  return (
    <tr className="border-b border-emerald-100 bg-brand-light/60">
      <td colSpan={7} className="px-3 py-3">
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <AdminPill tone="violet">{t(ADMIN_LABELS[complaint.category])}</AdminPill>
            {complaint.attachment ? (
              <AdminPill tone="sky" icon="image">{t(adminTranslations.complaints.hasAttachment)}</AdminPill>
            ) : (
              <AdminPill tone="gray">{t(adminTranslations.complaints.noAttachment)}</AdminPill>
            )}
          </div>
          <p className="text-brand-text">{t(complaint.details)}</p>
        </div>
      </td>
    </tr>
  );
}

interface ReplyRowProps {
  complaint: AdminComplaint;
  onSubmit: (text: string) => void;
  onCancel: () => void;
}

function ReplyRow({ complaint, onSubmit, onCancel }: ReplyRowProps) {
  const { t } = useRole();
  const [replyText, setReplyText] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!replyText.trim()) return;
    onSubmit(replyText.trim());
  }

  return (
    <tr className="border-b border-emerald-100 bg-brand-light/60 last:border-0">
      <td colSpan={7} className="px-3 py-3">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-start">
          <textarea
            value={replyText}
            onChange={(event) => setReplyText(event.target.value)}
            rows={2}
            placeholder={t(adminTranslations.complaints.replyPlaceholder(complaint.id))}
            className="flex-1 rounded-lg border border-brand-border bg-brand-white px-3 py-2 text-sm"
            autoFocus
          />
          <div className="flex gap-2">
            <button type="submit" className="rounded-lg bg-brand-main px-4 py-2 text-xs font-bold text-white transition hover:opacity-90">
              {t(adminTranslations.complaints.sendReply)}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-brand-border bg-brand-white px-4 py-2 text-xs font-bold text-brand-text transition hover:bg-brand-light"
            >
              {t(adminTranslations.common.cancel)}
            </button>
          </div>
        </form>
      </td>
    </tr>
  );
}

function ComplaintsReplies() {
  const { role, t } = useRole();

  const [complaints, setComplaints] = useState(ADMIN_COMPLAINTS);
  const [replyingId, setReplyingId] = useState<number | null>(null);
  const [viewingId, setViewingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleComplaints = useMemo(() => {
    const query = search.trim().toLowerCase();
    return complaints.filter((item) => {
      if (categoryFilter !== "all" && item.category !== categoryFilter) return false;
      if (statusFilter !== "all" && item.status !== statusFilter) return false;
      if (query && !t(item.title).toLowerCase().includes(query) && !t(item.userName).toLowerCase().includes(query)) return false;
      return true;
    });
  }, [complaints, search, categoryFilter, statusFilter, t]);

  function resetFilters() {
    setSearch("");
    setCategoryFilter("all");
    setStatusFilter("all");
  }

  function submitReply(id: number, text: string) {
    setComplaints((current) =>
      current.map((item) => (item.id === id ? { ...item, status: "replied", replyText: text } : item))
    );
    setReplyingId(null);
  }

  function reopenComplaint(id: number) {
    setComplaints((current) => current.map((item) => (item.id === id ? { ...item, status: "reopened" } : item)));
  }

  function closeComplaint(id: number) {
    setComplaints((current) => current.map((item) => (item.id === id ? { ...item, status: "closed" } : item)));
  }

  if (role !== "admin") return <Navigate to="/dashboard" replace />;

  return (
    <div className="admin-scale flex flex-col gap-5 md:flex-row md:items-start">
      <AdminSidebar />

      <section className="flex min-w-0 flex-1 flex-col gap-5">
        <GradientBanner
          title={t(adminTranslations.complaints.pageTitle)}
          subtitle={t(adminTranslations.complaints.pageSubtitle)}
        />

        <SharedCard title={t(adminTranslations.complaints.allComplaintsTitle(visibleComplaints.length))}>
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
            <AdminResetButton onClick={resetFilters} />
            <AdminSelect value={categoryFilter} onChange={setCategoryFilter} options={COMPLAINT_CATEGORY_OPTIONS.map((o) => ({ ...o, label: t(o.label) }))} />
            <AdminSelect value={statusFilter} onChange={setStatusFilter} options={COMPLAINT_STATUS_OPTIONS.map((o) => ({ ...o, label: t(o.label) }))} />
            <AdminSearchInput value={search} onChange={setSearch} placeholder={t(adminTranslations.complaints.searchPlaceholder)} />
          </div>

          {visibleComplaints.length > 0 ? (
            <>
              <AdminTableShell>
                <thead>
                  <AdminTableHeadRow columns={COMPLAINT_COLUMNS.map(t)} />
                </thead>
                <tbody>
                  {visibleComplaints.slice(0, visibleCount).map((item) => (
                    <Fragment key={item.id}>
                      {viewingId === item.id ? <ComplaintDetailRow complaint={item} /> : null}

                      <tr className="border-b border-emerald-100 last:border-0">
                        <td className="px-3 py-3 text-center font-bold text-brand-text">#{item.id}</td>
                        <td className="px-3 py-3 text-center">
                          <p className="font-bold text-brand-text">{t(item.title)}</p>
                          <p className="text-xs text-brand-muted">{t(item.excerpt)}</p>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <p className="font-bold text-brand-text">{t(item.userName)}</p>
                          <p className="text-xs text-brand-muted">{t(ADMIN_LABELS[item.userRole])}</p>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <AdminPill tone="violet">{t(ADMIN_LABELS[item.category])}</AdminPill>
                        </td>
                        <td className="px-3 py-3 text-center text-brand-muted">
                          {item.sentDate}
                          <span className="block text-xs">{t(item.sentTime)}</span>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <AdminPill tone={COMPLAINT_STATUS_TONES[item.status]} dot>{t(ADMIN_LABELS[item.status])}</AdminPill>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <AdminRowActionButton
                              icon="eye"
                              tone="emerald"
                              label={t(ADMIN_LABELS.view)}
                              onClick={() => setViewingId((current) => (current === item.id ? null : item.id))}
                            />
                            <AdminRowActionButton
                              icon="chat"
                              tone="sky"
                              label={t(adminTranslations.complaints.replyAction)}
                              onClick={() => setReplyingId((current) => (current === item.id ? null : item.id))}
                            />
                            <AdminKebabMenu
                              align="start"
                              items={
                                item.status === "closed"
                                  ? [{ label: t(adminTranslations.complaints.reopenComplaint), icon: "refresh", onClick: () => reopenComplaint(item.id) }]
                                  : [{ label: t(adminTranslations.complaints.closeComplaint), icon: "ban", onClick: () => closeComplaint(item.id) }]
                              }
                            />
                          </div>
                        </td>
                      </tr>

                      {replyingId === item.id ? (
                        <ReplyRow
                          complaint={item}
                          onSubmit={(text) => submitReply(item.id, text)}
                          onCancel={() => setReplyingId(null)}
                        />
                      ) : null}
                    </Fragment>
                  ))}
                </tbody>
              </AdminTableShell>

              {visibleComplaints.length > PAGE_SIZE ? (
                <AdminShowMoreButton
                  expanded={visibleCount >= visibleComplaints.length}
                  onClick={() => setVisibleCount((count) => (count >= visibleComplaints.length ? PAGE_SIZE : count + PAGE_SIZE))}
                />
              ) : null}
            </>
          ) : (
            <EmptyState message={t(adminTranslations.complaints.emptyState)} />
          )}
        </SharedCard>
      </section>
    </div>
  );
}

export default ComplaintsReplies;
