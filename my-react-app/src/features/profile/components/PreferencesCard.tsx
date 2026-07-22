import SharedCard from "../../../shared/components/SharedCard";
import SelectField from "../../../shared/components/SelectField";
import CheckField from "../../../shared/components/CheckField";
import { ACCOUNT_SETTINGS_DATA } from "../../../mock";
import type { UserProfile } from "../../../shared/context/RoleContext";

const { title, fields } = ACCOUNT_SETTINGS_DATA.preferences;

interface PreferencesCardProps {
  profile: UserProfile;
  updateProfile: (fields: Partial<UserProfile>) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

function PreferencesCard({ profile, updateProfile, language, setLanguage }: PreferencesCardProps) {
  return (
    <SharedCard title={title} className="flex flex-col gap-4">
      <SelectField
        label={fields.language.label}
        value={language === "ar" ? "العربية" : "English"}
        onChange={(e) => setLanguage(e.target.value === "العربية" ? "ar" : "en")}
        options={[...fields.language.options]}
      />
      <SelectField
        label={fields.dashboardView.label}
        value={profile.dashboardView}
        onChange={(e) => updateProfile({ dashboardView: e.target.value })}
        options={[...fields.dashboardView.options]}
      />
      <CheckField
        label={fields.emailNotifications.label}
        checked={profile.emailNotifications}
        onChange={(e) => updateProfile({ emailNotifications: e.target.checked })}
      />
      <CheckField
        label={fields.activityNotifications.label}
        checked={profile.activityNotifications}
        onChange={(e) => updateProfile({ activityNotifications: e.target.checked })}
      />
    </SharedCard>
  );
}

export default PreferencesCard;
