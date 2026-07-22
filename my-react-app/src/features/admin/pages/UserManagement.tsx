import { useMemo, useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AdminIcon from "../components/AdminIcons";
import AdminSidebar from "../components/AdminSidebar";
import {
  AdminPill, AdminResetButton, AdminRowActionButton, AdminSearchInput,
  AdminSelect, AdminShowMoreButton, AdminTableHeadRow, AdminTableShell, AdminToneIcon,
  PendingStatusPill,
} from "../components/AdminUI";
import Card from "../../../shared/components/ui/Card";
import SharedCard from "../../../shared/components/SharedCard";
import EmptyState from "../../../shared/components/ui/EmptyState";
import GradientBanner from "../../../shared/components/GradientBanner";
import { useRole } from "../../../shared/context/RoleContext";
import { useApprovalRequests } from "../../../context/ApprovalRequestsContext";
import {
  ADMIN_USERS, USER_ROLE_OPTIONS, USER_STATUS_OPTIONS, USER_INDIVIDUAL_ROLES,
  USER_ROLE_TONES, USER_ROLE_ICONS, USER_STATUS_TONES,
  USER_ROLE_FILTER_OPTIONS, USER_STATUS_FILTER_OPTIONS, USER_COLUMNS, USER_STAT_CARDS,
  APPROVAL_USER_COLUMNS,
  type AdminUserRecord, type UserApprovalRequest,
} from "../../../mock";
import { ADMIN_LABELS, adminTranslations } from "../../../mock";

interface UserFormValues {
  name: string;
  email: string;
  role: string;
  status: string;
}

type ActiveUserPanel = { mode: "edit" | "view"; user: AdminUserRecord } | null;

const INDIVIDUAL_ROLES = new Set(USER_INDIVIDUAL_ROLES);

function editableRoleOptions(currentRole: string) {
  return INDIVIDUAL_ROLES.has(currentRole)
    ? USER_ROLE_OPTIONS.filter((option) => INDIVIDUAL_ROLES.has(option.value))
    : USER_ROLE_OPTIONS.filter((option) => option.value === "company");
}

const PAGE_SIZE = 5;

function userHandle(email: string) {
  return `@${email.split("@")[0]}`;
}

// Moved here (from the retired /admin/approval-requests list page) since
// join/membership requests are now managed alongside the user accounts
// they'll become once approved, instead of a separate page.
function JoinRequestsSection() {
  const { t } = useRole();
  const navigate = useNavigate();
  const { userRequests } = useApprovalRequests();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  if (userRequests.length === 0) return null;

  const visibleRequests: UserApprovalRequest[] = userRequests.slice(0, visibleCount);

  return (
    <SharedCard title={t(adminTranslations.approvalRequests.joinRequestsTitle(userRequests.length))}>
      <AdminTableShell>
        <thead>
          <AdminTableHeadRow columns={APPROVAL_USER_COLUMNS.map(t)} />
        </thead>
        <tbody>
          {visibleRequests.map((item) => (
            <tr key={item.id} className="border-b border-emerald-100 last:border-0">
              <td className="px-3 py-3 text-center">
                <AdminPill tone="violet">{t(ADMIN_LABELS[item.accountType])}</AdminPill>
              </td>
              <td className="px-3 py-3 text-center font-bold text-brand-text">{t(item.name)}</td>
              <td className="px-3 py-3 text-center text-brand-muted" dir="ltr">{item.email}</td>
              <td className="px-3 py-3 text-center text-brand-muted">{item.date}</td>
              <td className="px-3 py-3 text-center"><PendingStatusPill /></td>
              <td className="px-3 py-3 text-center">
                <button
                  type="button"
                  onClick={() => navigate(`/admin/approval-requests/user/${item.id}`)}
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

      {userRequests.length > PAGE_SIZE ? (
        <AdminShowMoreButton
          expanded={visibleCount >= userRequests.length}
          onClick={() => setVisibleCount((count) => (count >= userRequests.length ? PAGE_SIZE : count + PAGE_SIZE))}
        />
      ) : null}
    </SharedCard>
  );
}

function UserAvatar({ role }: { role: string }) {
  const toneClasses: Record<string, string> = {
    teal: "bg-teal-100 text-teal-600",
    violet: "bg-violet-100 text-violet-600",
    emerald: "bg-emerald-100 text-emerald-600",
  };

  return (
    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${toneClasses[USER_ROLE_TONES[role]]}`}>
      <AdminIcon name={USER_ROLE_ICONS[role]} className="h-4 w-4" />
    </span>
  );
}

interface UserFormPanelProps {
  mode: "edit" | "view";
  initialUser: AdminUserRecord;
  onCancel: () => void;
  onSubmit: (values: UserFormValues) => void;
}

function UserFormPanel({ mode, initialUser, onCancel, onSubmit }: UserFormPanelProps) {
  const { t } = useRole();
  const readOnly = mode === "view";
  const [values, setValues] = useState<UserFormValues>(() => (
    { name: t(initialUser.name), email: initialUser.email, role: initialUser.role, status: initialUser.status }
  ));

  function updateField(field: keyof UserFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!values.name.trim() || !values.email.trim()) return;
    onSubmit(values);
  }

  const titles = {
    edit: t(adminTranslations.users.editUserTitle),
    view: t(adminTranslations.users.userDetailsTitle),
  };

  const roleOptions = readOnly ? USER_ROLE_OPTIONS : editableRoleOptions(initialUser.role);

  return (
    <SharedCard title={titles[mode]}>
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-bold text-brand-text">{t(adminTranslations.users.nameLabel)}</label>
          <input
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder={t(adminTranslations.users.namePlaceholder)}
            readOnly={readOnly}
            className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm read-only:bg-brand-light"
            autoFocus={!readOnly}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-bold text-brand-text">{t(adminTranslations.common.email)}</label>
          <input
            type="email"
            dir="ltr"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="example@email.com"
            readOnly={readOnly}
            className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm read-only:bg-brand-light"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-bold text-brand-text">{t(adminTranslations.common.accountType)}</label>
          <select
            value={values.role}
            onChange={(event) => updateField("role", event.target.value)}
            disabled={readOnly}
            className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm disabled:bg-brand-light"
          >
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>{t(option.label)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-bold text-brand-text">{t(adminTranslations.common.status)}</label>
          <select
            value={values.status}
            onChange={(event) => updateField("status", event.target.value)}
            disabled={readOnly}
            className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm disabled:bg-brand-light"
          >
            {USER_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{t(option.label)}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 sm:col-span-2">
          {readOnly ? (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg bg-brand-main px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
            >
              {t(adminTranslations.common.close)}
            </button>
          ) : (
            <>
              <button type="submit" className="rounded-lg bg-brand-main px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90">
                {t(adminTranslations.users.saveUser)}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="rounded-lg border border-brand-border bg-brand-white px-5 py-2.5 text-sm font-bold text-brand-text transition hover:bg-brand-light"
              >
                {t(adminTranslations.common.cancel)}
              </button>
            </>
          )}
        </div>
      </form>
    </SharedCard>
  );
}

function UserManagement() {
  const { role, t } = useRole();

  const [users, setUsers] = useState(ADMIN_USERS);
  const [activePanel, setActivePanel] = useState<ActiveUserPanel>(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return users.filter((item) => {
      if (roleFilter !== "all" && item.role !== roleFilter) return false;
      if (statusFilter !== "all" && item.status !== statusFilter) return false;
      if (query && !t(item.name).toLowerCase().includes(query) && !item.email.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [users, search, roleFilter, statusFilter, t]);

  function resetFilters() {
    setSearch("");
    setRoleFilter("all");
    setStatusFilter("all");
  }

  function updateUser(id: string, values: UserFormValues) {
    setUsers((current) =>
      current.map((item) =>
        item.id === id ? { ...item, name: values.name.trim(), email: values.email.trim(), role: values.role, status: values.status } : item
      )
    );
    setActivePanel(null);
  }

  if (role !== "admin") return <Navigate to="/dashboard" replace />;

  return (
    <div className="admin-scale flex flex-col gap-5 md:flex-row md:items-start">
      <AdminSidebar />

      <section className="flex min-w-0 flex-1 flex-col gap-5">
        <GradientBanner
          title={t(adminTranslations.users.pageTitle)}
          subtitle={t(adminTranslations.users.pageSubtitle)}
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {USER_STAT_CARDS.map((stat) => (
            <Card key={stat.key} as="article" radius="2xl" shadow className="flex items-center gap-3 px-4 py-3">
              <AdminToneIcon tone={stat.tone} icon={stat.icon} />
              <div>
                <strong className="block text-xl text-brand-text">{stat.value.toLocaleString("en-US")}</strong>
                <span className="text-xs text-brand-muted">{t(stat.label)}</span>
              </div>
            </Card>
          ))}
        </div>

        <JoinRequestsSection />

        {activePanel ? (
          <UserFormPanel
            mode={activePanel.mode}
            initialUser={activePanel.user}
            onCancel={() => setActivePanel(null)}
            onSubmit={(values) => updateUser(activePanel.user.id, values)}
          />
        ) : null}

        <SharedCard>
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center">
            <AdminResetButton onClick={resetFilters} />
            <AdminSelect value={statusFilter} onChange={setStatusFilter} options={USER_STATUS_FILTER_OPTIONS.map((o) => ({ ...o, label: t(o.label) }))} />
            <AdminSelect value={roleFilter} onChange={setRoleFilter} options={USER_ROLE_FILTER_OPTIONS.map((o) => ({ ...o, label: t(o.label) }))} />
            <AdminSearchInput value={search} onChange={setSearch} placeholder={t(adminTranslations.users.searchPlaceholder)} />
          </div>

          <p className="mb-3 text-sm font-bold text-brand-text">
            {t(adminTranslations.users.totalUsersLabel)}: {visibleUsers.length.toLocaleString("en-US")}
          </p>

          {visibleUsers.length > 0 ? (
            <>
              <AdminTableShell>
                <thead>
                  <AdminTableHeadRow columns={USER_COLUMNS.map(t)} />
                </thead>
                <tbody>
                  {visibleUsers.slice(0, visibleCount).map((item) => (
                    <tr key={item.id} className="border-b border-emerald-100 last:border-0">
                      <td className="px-3 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <UserAvatar role={item.role} />
                          <div className="text-center">
                            <p className="font-bold text-brand-text">{t(item.name)}</p>
                            <p className="text-xs text-brand-muted" dir="ltr">{userHandle(item.email)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <AdminPill tone={USER_ROLE_TONES[item.role]} icon={USER_ROLE_ICONS[item.role]}>{t(ADMIN_LABELS[item.role])}</AdminPill>
                      </td>
                      <td className="px-3 py-3 text-center text-brand-muted" dir="ltr">{item.email}</td>
                      <td className="px-3 py-3 text-center">
                        <AdminPill tone={USER_STATUS_TONES[item.status]}>{t(ADMIN_LABELS[item.status])}</AdminPill>
                      </td>
                      <td className="px-3 py-3 text-center text-brand-muted">{item.joinDate}</td>
                      <td className="px-3 py-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <AdminRowActionButton icon="eye" tone="emerald" label={t(ADMIN_LABELS.view)} onClick={() => setActivePanel({ mode: "view", user: item })} />
                          <AdminRowActionButton icon="pencil" tone="sky" label={t(adminTranslations.common.edit)} onClick={() => setActivePanel({ mode: "edit", user: item })} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </AdminTableShell>

              {visibleUsers.length > PAGE_SIZE ? (
                <AdminShowMoreButton
                  expanded={visibleCount >= visibleUsers.length}
                  onClick={() => setVisibleCount((count) => (count >= visibleUsers.length ? PAGE_SIZE : count + PAGE_SIZE))}
                />
              ) : null}
            </>
          ) : (
            <EmptyState message={t(adminTranslations.users.emptyState)} />
          )}
        </SharedCard>
      </section>
    </div>
  );
}

export default UserManagement;
