import SharedCard from "../../../shared/components/SharedCard";
import TextField from "../../../shared/components/TextField";
import CheckField from "../../../shared/components/CheckField";
import { ACCOUNT_SETTINGS_DATA } from "../../../mock";
import type { UserProfile } from "../../../shared/context/RoleContext";

const { title, fields } = ACCOUNT_SETTINGS_DATA.security;

interface SecurityCardProps {
  profile: UserProfile;
  updateProfile: (fields: Partial<UserProfile>) => void;
  currentPassword: string;
  setCurrentPassword: (value: string) => void;
  newPassword: string;
  setNewPassword: (value: string) => void;
}

function SecurityCard({
  profile,
  updateProfile,
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
}: SecurityCardProps) {
  return (
    <SharedCard title={title} className="flex flex-col gap-4">
      <TextField
        label={fields.currentPassword.label}
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <TextField
        label={fields.newPassword.label}
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <CheckField
        label={fields.twoFactor.label}
        checked={profile.twoFactor}
        onChange={(e) => updateProfile({ twoFactor: e.target.checked })}
      />
    </SharedCard>
  );
}

export default SecurityCard;
