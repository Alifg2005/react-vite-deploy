import SharedCard from "../../../shared/components/SharedCard";
import SelectField from "../../../shared/components/SelectField";
import TextField from "../../../shared/components/TextField";
import CheckField from "../../../shared/components/CheckField";
import { ACCOUNT_SETTINGS_DATA } from "../../../mock";
import type { UserProfile } from "../../../shared/context/RoleContext";

const { title, fields } = ACCOUNT_SETTINGS_DATA.payment;

interface PaymentCardProps {
  profile: UserProfile;
  updateProfile: (fields: Partial<UserProfile>) => void;
}

function PaymentCard({ profile, updateProfile }: PaymentCardProps) {
  return (
    <SharedCard title={title} className="flex flex-col gap-4">
      <SelectField
        label={fields.paymentMethod.label}
        value={profile.paymentMethod}
        onChange={(e) => updateProfile({ paymentMethod: e.target.value })}
        options={[...fields.paymentMethod.options]}
      />
      <TextField
        label={fields.cardNumber.label}
        value={profile.cardNumber}
        onChange={(e) => updateProfile({ cardNumber: e.target.value })}
      />
      <CheckField
        label={fields.offerNotifications.label}
        checked={profile.offerNotifications}
        onChange={(e) => updateProfile({ offerNotifications: e.target.checked })}
      />
      <CheckField
        label={fields.showAchievements.label}
        checked={profile.showAchievements}
        onChange={(e) => updateProfile({ showAchievements: e.target.checked })}
      />
    </SharedCard>
  );
}

export default PaymentCard;
