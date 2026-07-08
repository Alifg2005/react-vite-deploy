import { createContext, useContext, useEffect, useState } from "react";
import { DASHBOARD_DATA } from "../data/dashboardData";

const RoleContext = createContext(null);

// Mock, role-independent profile fields — reset whenever the role switcher
// picks a different role, since that's really "impersonating" a different
// demo user rather than the same person changing hats.
function buildDefaultProfile(role) {
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

export function RoleProvider({ children }) {
  const [role, setRoleState] = useState("guest");
  const [section, setSection] = useState(DASHBOARD_DATA.student.sections[0].key);
  const [typeFilter, setTypeFilter] = useState("all");
  const [language, setLanguage] = useState("ar");
  const [profile, setProfile] = useState(() => buildDefaultProfile("guest"));

  const direction = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language, direction]);

  function setRole(nextRole) {
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

  function updateProfile(fields) {
    setProfile((current) => ({ ...current, ...fields }));
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
        profile,
        updateProfile,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);

  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }

  return context;
}