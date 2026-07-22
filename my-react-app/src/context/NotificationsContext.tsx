import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ADMIN_NOTIFICATIONS,
  NOTIFICATIONS_SEED,
  INITIAL_TRAINER_NOTIFICATIONS as TRAINER_NOTIFICATIONS_SEED,
  type AdminNotification,
  type NotificationItem,
  type Translatable,
  type UserRole,
  type TrainerNotification,
} from "../mock";
import { notificationsSeed as COMPANY_NOTIFICATIONS_SEED, type Notification as CompanyNotification } from "../features/company/data";
import { useAuth } from "../shared/context/AuthContext";
import {
  listAdminNotificationsRequest,
  markAdminNotificationReadRequest,
  type AdminNotification as BackendNotification,
} from "../shared/lib/apiClient";
import { formatNotificationTime } from "../features/company/utils/notificationUtils";

// Real support/contact messages have no category, so they all render under
// the same "inquiry" pill in the admin list — the closest existing type.
const BACKEND_NOTIFICATION_TYPE = "inquiry";

// Polling interval for picking up new contact-form submissions while an
// admin has the app open — the backend has no push channel to notify us.
const ADMIN_NOTIFICATIONS_POLL_MS = 15000;

function mapBackendNotification(notification: BackendNotification): AdminNotification {
  return {
    id: notification.id,
    title: notification.title,
    message: notification.message,
    type: BACKEND_NOTIFICATION_TYPE,
    time: formatNotificationTime(notification.createdAt),
    read: notification.isRead,
  };
}

interface NewAdminNotificationInput {
  title: Translatable;
  message: Translatable;
  type: string;
}

interface AdminNotificationsSlice {
  notifications: AdminNotification[];
  unreadCount: number;
  addNotification: (input: NewAdminNotificationInput) => void;
  toggleRead: (id: string) => void;
  markAllRead: () => void;
  deleteAll: () => void;
  removeNotification: (id: string) => void;
}

interface StudentNotificationsSlice {
  notifications: NotificationItem[];
  unreadCount: number;
  toggleRead: (id: string) => void;
  markAllRead: () => void;
  removeNotification: (id: string) => void;
}

interface CompanyNotificationsSlice {
  notifications: CompanyNotification[];
  unreadCount: number;
  toggleRead: (id: string) => void;
  markAllRead: () => void;
  removeNotification: (id: string) => void;
}

interface TrainerNotificationsSlice {
  notifications: TrainerNotification[];
  unreadCount: number;
  toggleRead: (id: number) => void;
  markAllRead: () => void;
  removeNotification: (id: number) => void;
}

interface NotificationsContextValue {
  admin: AdminNotificationsSlice;
  student: StudentNotificationsSlice;
  company: CompanyNotificationsSlice;
  trainer: TrainerNotificationsSlice;
  // Lets chrome shared by every role (the header bell) read the right count
  // without needing to know which role-specific slice backs it.
  unreadCountForRole: (role: UserRole) => number;
}

const NotificationsContext = createContext<NotificationsContextValue | null>(null);

// Lives above every dashboard's notification page (and the header bell) so
// other flows — e.g. a team invite completing in TeamContext — can push a
// new notification that both immediately reflect, instead of each page
// keeping its own local, disconnected copy of the seed array.
export function NotificationsProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const isAdminSession = auth.user?.accountType === "admin";

  const [adminNotifications, setAdminNotifications] = useState<AdminNotification[]>(ADMIN_NOTIFICATIONS);
  const [studentNotifications, setStudentNotifications] = useState<NotificationItem[]>(NOTIFICATIONS_SEED);
  const [companyNotifications, setCompanyNotifications] = useState<CompanyNotification[]>(COMPANY_NOTIFICATIONS_SEED);
  const [trainerNotifications, setTrainerNotifications] = useState<TrainerNotification[]>(TRAINER_NOTIFICATIONS_SEED);

  // Real support/contact messages replace the demo seed once an actual admin
  // is logged in — polling since the backend has no push channel.
  useEffect(() => {
    if (!isAdminSession || !auth.token) return;
    const token = auth.token;

    let cancelled = false;
    async function refresh() {
      try {
        const notifications = await listAdminNotificationsRequest(token);
        if (!cancelled) setAdminNotifications(notifications.map(mapBackendNotification));
      } catch {
        // Keep the last known list on a transient network/API failure.
      }
    }

    refresh();
    const interval = window.setInterval(refresh, ADMIN_NOTIFICATIONS_POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [isAdminSession, auth.token]);

  const adminUnreadCount = useMemo(() => adminNotifications.filter((item) => !item.read).length, [adminNotifications]);
  const studentUnreadCount = useMemo(() => studentNotifications.filter((item) => !item.read).length, [studentNotifications]);
  const companyUnreadCount = useMemo(() => companyNotifications.filter((item) => !item.read).length, [companyNotifications]);
  const trainerUnreadCount = useMemo(() => trainerNotifications.filter((item) => !item.read).length, [trainerNotifications]);

  // ── admin ──────────────────────────────────────────────────────────────────

  function addAdminNotification(input: NewAdminNotificationInput) {
    setAdminNotifications((current) => [
      { id: `n-${Date.now()}`, title: input.title, message: input.message, type: input.type, time: { ar: "الآن", en: "Just now" }, read: false },
      ...current,
    ]);
  }

  function toggleAdminRead(id: string) {
    const target = adminNotifications.find((item) => item.id === id);
    if (isAdminSession && auth.token && target && !target.read) {
      markAdminNotificationReadRequest(id, auth.token).catch(() => {
        // Best-effort — the next poll reconciles state if this failed.
      });
    }
    setAdminNotifications((current) => current.map((item) => (item.id === id ? { ...item, read: !item.read } : item)));
  }

  function markAllAdminRead() {
    if (isAdminSession && auth.token) {
      const token = auth.token;
      adminNotifications
        .filter((item) => !item.read)
        .forEach((item) => {
          markAdminNotificationReadRequest(item.id, token).catch(() => {
            // Best-effort — the next poll reconciles state if this failed.
          });
        });
    }
    setAdminNotifications((current) => current.map((item) => ({ ...item, read: true })));
  }

  function deleteAllAdmin() {
    setAdminNotifications([]);
  }

  function removeAdminNotification(id: string) {
    setAdminNotifications((current) => current.filter((item) => item.id !== id));
  }

  // ── student ────────────────────────────────────────────────────────────────

  function toggleStudentRead(id: string) {
    setStudentNotifications((current) => current.map((item) => (item.id === id ? { ...item, read: !item.read } : item)));
  }

  function markAllStudentRead() {
    setStudentNotifications((current) => current.map((item) => ({ ...item, read: true })));
  }

  function removeStudentNotification(id: string) {
    setStudentNotifications((current) => current.filter((item) => item.id !== id));
  }

  // ── company ────────────────────────────────────────────────────────────────

  function toggleCompanyRead(id: string) {
    setCompanyNotifications((current) => current.map((item) => (item.id === id ? { ...item, read: !item.read } : item)));
  }

  function markAllCompanyRead() {
    setCompanyNotifications((current) => current.map((item) => ({ ...item, read: true })));
  }

  function removeCompanyNotification(id: string) {
    setCompanyNotifications((current) => current.filter((item) => item.id !== id));
  }

  // ── trainer ────────────────────────────────────────────────────────────────

  function toggleTrainerRead(id: number) {
    setTrainerNotifications((current) => current.map((item) => (item.id === id ? { ...item, read: !item.read } : item)));
  }

  function markAllTrainerRead() {
    setTrainerNotifications((current) => current.map((item) => ({ ...item, read: true })));
  }

  function removeTrainerNotification(id: number) {
    setTrainerNotifications((current) => current.filter((item) => item.id !== id));
  }

  // ── shared ─────────────────────────────────────────────────────────────────

  function unreadCountForRole(role: UserRole): number {
    if (role === "admin") return adminUnreadCount;
    if (role === "student") return studentUnreadCount;
    if (role === "company") return companyUnreadCount;
    if (role === "trainer") return trainerUnreadCount;
    return 0;
  }

  return (
    <NotificationsContext.Provider
      value={{
        admin: {
          notifications: adminNotifications,
          unreadCount: adminUnreadCount,
          addNotification: addAdminNotification,
          toggleRead: toggleAdminRead,
          markAllRead: markAllAdminRead,
          deleteAll: deleteAllAdmin,
          removeNotification: removeAdminNotification,
        },
        student: {
          notifications: studentNotifications,
          unreadCount: studentUnreadCount,
          toggleRead: toggleStudentRead,
          markAllRead: markAllStudentRead,
          removeNotification: removeStudentNotification,
        },
        company: {
          notifications: companyNotifications,
          unreadCount: companyUnreadCount,
          toggleRead: toggleCompanyRead,
          markAllRead: markAllCompanyRead,
          removeNotification: removeCompanyNotification,
        },
        trainer: {
          notifications: trainerNotifications,
          unreadCount: trainerUnreadCount,
          toggleRead: toggleTrainerRead,
          markAllRead: markAllTrainerRead,
          removeNotification: removeTrainerNotification,
        },
        unreadCountForRole,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications(): NotificationsContextValue {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }

  return context;
}