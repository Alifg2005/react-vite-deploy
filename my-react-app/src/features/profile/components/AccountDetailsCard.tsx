import SharedCard from "../../../shared/components/SharedCard";
import TextField from "../../../shared/components/TextField";
import { ACCOUNT_SETTINGS_DATA } from "../../../mock";
import type { UserProfile } from "../../../shared/context/RoleContext";

const { title, fields } = ACCOUNT_SETTINGS_DATA.accountDetails;

interface AccountDetailsCardProps {
  profile: UserProfile;
  updateProfile: (fields: Partial<UserProfile>) => void;
}

function AccountDetailsCard({ profile, updateProfile }: AccountDetailsCardProps) {
  return (
    <SharedCard title={title} className="flex flex-col gap-4">
      <TextField
        label={fields.name.label}
        value={profile.name}
        onChange={(e) => updateProfile({ name: e.target.value })}
      />
      <TextField
        label={fields.email.label}
        value={profile.email}
        onChange={(e) => updateProfile({ email: e.target.value })}
      />
      <TextField
        label={fields.phone.label}
        value={profile.phone}
        onChange={(e) => updateProfile({ phone: e.target.value })}
      />
      <TextField
        label={fields.city.label}
        value={profile.city}
        onChange={(e) => updateProfile({ city: e.target.value })}
      />
    </SharedCard>
  );
}

export default AccountDetailsCard;
