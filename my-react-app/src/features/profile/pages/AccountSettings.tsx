import { JSX, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useRole } from "../../../shared/context/RoleContext";
import { ACCOUNT_SETTINGS_DATA } from "../../../mock";
import AccountDetailsCard from "../components/AccountDetailsCard";
import SecurityCard from "../components/SecurityCard";
import PreferencesCard from "../components/PreferencesCard";
import PaymentCard from "../components/PaymentCard";

const { pageLabel, pageTitle, actions } = ACCOUNT_SETTINGS_DATA;

function AccountSettings(): JSX.Element {
  const navigate = useNavigate();
  const { role, profile, updateProfile, language, setLanguage } = useRole();
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  if (role === "guest") return <Navigate to="/login" replace />;

  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-5">
      <p className="text-sm font-bold text-brand-main">{pageLabel}</p>
      <h2 className="text-2xl font-bold text-brand-text">{pageTitle}</h2>

      <div className="grid gap-5 lg:grid-cols-2">
        <AccountDetailsCard profile={profile} updateProfile={updateProfile} />
        <SecurityCard
          profile={profile}
          updateProfile={updateProfile}
          currentPassword={currentPassword}
          setCurrentPassword={setCurrentPassword}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
        />
        <PreferencesCard
          profile={profile}
          updateProfile={updateProfile}
          language={language}
          setLanguage={setLanguage}
        />
        <PaymentCard profile={profile} updateProfile={updateProfile} />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-xl border border-brand-border px-6 py-3 text-sm font-bold text-brand-text hover:bg-brand-light"
        >
          {actions.cancelLabel}
        </button>
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="rounded-xl bg-brand-main px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
        >
          {actions.saveLabel}
        </button>
      </div>
    </section>
  );
}

export default AccountSettings;
