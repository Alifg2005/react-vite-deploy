import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";
import { DASHBOARD_DATA } from "../data/dashboardData";

const LAST_ROLE_KEY = "ct_last_role";

function UserIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 19.5c0-3.9 3.4-6 7.5-6s7.5 2.1 7.5 6" />
    </svg>
  );
}

export default function UserMenu() {
  const navigate = useNavigate();
  const { role, setRole, profile } = useRole();
  const dashboard = DASHBOARD_DATA[role];

  const [open, setOpen] = useState(false);

  function goTo(path) {
    setOpen(false);
    navigate(path);
  }

  function handleLogout() {
    // Go straight to /login rather than "/" — logging out from /dashboard
    // would end up there anyway via the dashboard's own guest guard, so
    // this avoids a redirect race and gives a consistent destination
    // regardless of which page logout was triggered from.
    localStorage.removeItem(LAST_ROLE_KEY);
    setOpen(false);
    setRole("guest");
    navigate("/login");
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-2 rounded-full border border-brand-border bg-brand-white py-2 ps-3 pe-4 hover:bg-brand-light"
      >
        {profile.avatar ? (
          <img src={profile.avatar} alt="" className="h-6 w-6 rounded-full object-cover" />
        ) : (
          <UserIcon className="h-5 w-5 text-brand-main" />
        )}

        <span className="hidden text-sm font-bold text-brand-text sm:inline">
          {profile.name}
        </span>
      </button>

      {open && (
        <div className="absolute inset-e-0 z-20 mt-2 w-64 rounded-2xl border border-brand-border bg-brand-white p-3 text-right shadow-xl">
          <div className="mb-3 flex items-center gap-3 border-b border-brand-border pb-3">
            {profile.avatar ? (
              <img src={profile.avatar} alt="" className="h-11 w-11 rounded-full object-cover" />
            ) : (
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-border">
                <UserIcon className="h-7 w-7 text-brand-main" />
              </span>
            )}

            <div>
              <p className="text-sm font-bold text-brand-text">{profile.name}</p>
              <p className="text-xs text-brand-muted">{dashboard.title}</p>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => goTo("/dashboard")}
              className="rounded-lg px-3 py-2 text-right text-sm font-bold text-brand-text hover:bg-brand-light"
            >
              {dashboard.title}
            </button>

            <button
              type="button"
              onClick={() => goTo("/profile")}
              className="rounded-lg px-3 py-2 text-right text-sm font-bold text-brand-text hover:bg-brand-light"
            >
              الملف الشخصي
            </button>

            <button
              type="button"
              onClick={() => goTo("/account-settings")}
              className="rounded-lg px-3 py-2 text-right text-sm font-bold text-brand-text hover:bg-brand-light"
            >
              الإعدادات
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg px-3 py-2 text-right text-sm font-bold text-rose-600 hover:bg-rose-50"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
