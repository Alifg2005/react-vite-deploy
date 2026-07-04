import { createContext, useContext, useEffect, useState } from "react";
import { DASHBOARD_DATA } from "../data/dashboardData";

const RoleContext = createContext(null);

export function RoleProvider({ children }) {
  const [role, setRoleState] = useState("student");
  const [section, setSection] = useState(DASHBOARD_DATA.student.sections[0].key);
  const [typeFilter, setTypeFilter] = useState("all");
  const [language, setLanguage] = useState("ar");

  const direction = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language, direction]);

  function setRole(nextRole) {
  const data = DASHBOARD_DATA[nextRole];
  if (!data) return; // ignore roles that have no dashboard (guest, couch, ...)
  setRoleState(nextRole);
  setSection(data.sections[0].key);
  setTypeFilter("all");
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