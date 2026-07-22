import { createContext, useContext, useState, type ReactNode } from "react";
import { ADMIN_TEAM_MEMBERS, COMPANY_EMAIL_DOMAIN, type AdminTeamMember, type AdminDepartment } from "../mock";
import { useNotifications } from "./NotificationsContext";

interface MemberInput {
  name: string;
  email: string;
  department: AdminDepartment;
  jobTitle: string;
}

type InviteResult = { ok: true; member: AdminTeamMember } | { ok: false; error: "invalid-domain" };

interface TeamContextValue {
  members: AdminTeamMember[];
  inviteMember: (input: MemberInput) => InviteResult;
  updateMember: (id: string, input: MemberInput) => InviteResult;
  completeInvite: (token: string) => boolean;
  removeMember: (id: string) => void;
  isCompanyEmail: (email: string) => boolean;
}

const TeamContext = createContext<TeamContextValue | null>(null);

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

// Lives above /admin/team (the member list + add/edit pages) and the public
// /set-password page reached via a mocked invite link, so completing the
// mock "activation" on one page is reflected on the other, and can push a
// notification via NotificationsContext when an invite is sent or completed.
export function TeamProvider({ children }: { children: ReactNode }) {
  const [members, setMembers] = useState<AdminTeamMember[]>(ADMIN_TEAM_MEMBERS);
  const { addNotification } = useNotifications().admin;

  function isCompanyEmail(email: string) {
    return email.trim().toLowerCase().endsWith(`@${COMPANY_EMAIL_DOMAIN}`);
  }

  function inviteMember({ name, email, department, jobTitle }: MemberInput): InviteResult {
    const trimmedEmail = email.trim().toLowerCase();
    if (!isCompanyEmail(trimmedEmail)) return { ok: false, error: "invalid-domain" };

    const member: AdminTeamMember = {
      id: `team-${Date.now()}`,
      name: name.trim(),
      email: trimmedEmail,
      department,
      jobTitle: jobTitle.trim(),
      status: "pending",
      invitedDate: todayISO(),
      inviteToken: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    };

    setMembers((current) => [member, ...current]);
    addNotification({
      title: { ar: "تم إرسال دعوة فريق جديدة", en: "New team invite sent" },
      message: { ar: `تم إرسال رابط تفعيل الحساب إلى ${member.name}.`, en: `An activation link was sent to ${member.name}.` },
      type: "system",
    });

    return { ok: true, member };
  }

  function updateMember(id: string, { name, email, department, jobTitle }: MemberInput): InviteResult {
    const trimmedEmail = email.trim().toLowerCase();
    if (!isCompanyEmail(trimmedEmail)) return { ok: false, error: "invalid-domain" };

    let updated: AdminTeamMember | undefined;
    setMembers((current) =>
      current.map((item) => {
        if (item.id !== id) return item;
        updated = { ...item, name: name.trim(), email: trimmedEmail, department, jobTitle: jobTitle.trim() };
        return updated;
      })
    );

    return updated ? { ok: true, member: updated } : { ok: false, error: "invalid-domain" };
  }

  function completeInvite(token: string) {
    const member = members.find((item) => item.inviteToken === token && item.status === "pending");
    if (!member) return false;

    setMembers((current) => current.map((item) => (item.id === member.id ? { ...item, status: "active" } : item)));
    addNotification({
      title: { ar: "عضو جديد أكمل التفعيل", en: "New member completed activation" },
      message: { ar: `${member.name} أكمل تعيين كلمة المرور وأصبح نشطاً في الفريق.`, en: `${member.name} finished setting a password and is now active on the team.` },
      type: "request",
    });

    return true;
  }

  function removeMember(id: string) {
    setMembers((current) => current.filter((item) => item.id !== id));
  }

  return (
    <TeamContext.Provider value={{ members, inviteMember, updateMember, completeInvite, removeMember, isCompanyEmail }}>
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam(): TeamContextValue {
  const context = useContext(TeamContext);

  if (!context) {
    throw new Error("useTeam must be used within a TeamProvider");
  }

  return context;
}
