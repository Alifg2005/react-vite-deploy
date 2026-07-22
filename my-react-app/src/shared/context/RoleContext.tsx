import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { DASHBOARD_DATA } from "../../mock";
import type { UserRole } from "../../mock";
import { pickLang, type Language } from "../../utils/i18n";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UserProfile {
  name: string;
  avatar: string | null;
  email: string;
  phone: string;
  city: string;
  paymentMethod: string;
  cardNumber: string;
  twoFactor: boolean;
  dashboardView: string;
  emailNotifications: boolean;
  activityNotifications: boolean;
  offerNotifications: boolean;
  showAchievements: boolean;
}

interface RoleContextValue {
  role: UserRole;
  setRole: (role: UserRole) => void;
  section: string;
  setSection: (section: string) => void;
  typeFilter: string;
  setTypeFilter: (filter: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  direction: "rtl" | "ltr";
  t: (value: unknown) => string;
  profile: UserProfile;
  updateProfile: (fields: Partial<UserProfile>) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const RoleContext = createContext<RoleContextValue | null>(null);

// Mock, role-independent profile fields — reset whenever the role switcher
// picks a different role, since that's really "impersonating" a different
// demo user rather than the same person changing hats.
function buildDefaultProfile(role: UserRole): UserProfile {
  const data = DASHBOARD_DATA[role];

  return {
    name: data ? data.user.name : "",
    avatar: null,
    email: "user@capsule.sa",
    phone: "+966 5X XXX XXXX",
    city: "الرياض",
    paymentMethod: "مدى",
    cardNumber: "**** **** **** 1234",
    twoFactor: false,
    dashboardView: "متقدم",
    emailNotifications: true,
    activityNotifications: true,
    offerNotifications: true,
    showAchievements: true,
  };
}

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("guest");
  const [section, setSection] = useState<string>(DASHBOARD_DATA.student.sections[0].key);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [language, setLanguage] = useState<Language>("ar");
  const [profile, setProfile] = useState<UserProfile>(() => buildDefaultProfile("guest"));

  const direction: "rtl" | "ltr" = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language, direction]);

  function setRole(nextRole: UserRole) {
    if (nextRole === "guest") {
      setRoleState("guest");
      return;
    }

    const data = DASHBOARD_DATA[nextRole];
    if (!data) return; // ignore roles that have no dashboard
    setRoleState(nextRole);
    setSection(data.sections[0].key);
    setTypeFilter("all");
    setProfile(buildDefaultProfile(nextRole));
  }

  function updateProfile(fields: Partial<UserProfile>) {
    setProfile((current) => ({ ...current, ...fields }));
  }

  function t(value: unknown) {
    return pickLang(value as any, language);
  }

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        section,
        setSection,
        typeFilter,
        setTypeFilter,
        language,
        setLanguage,
        direction,
        t,
        profile,
        updateProfile,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole(): RoleContextValue {
  const context = useContext(RoleContext);

  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }

  return context;
}
