import React from "react";
import { useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useRole } from "../../../shared/context/RoleContext";
import { ROLE_LABELS, PROFILE_DATA } from "../../../mock";
import SharedCard from "../../../shared/components/SharedCard";
import TextField from "../../../shared/components/TextField";
import AvatarCard from "../components/AvatarCard";

const { pageLabel, pageTitle, form } = PROFILE_DATA;

export default function Profile() {
  const navigate = useNavigate();
  const { role, profile, updateProfile } = useRole();
  // use a non-null assertion so the ref type matches AvatarCard's expected RefObject<HTMLInputElement>
  const fileInputRef = useRef<HTMLInputElement>(null!);

  if (role === "guest") return <Navigate to="/login" replace />;

  const roleLabel = ROLE_LABELS[role];

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => updateProfile({ avatar: reader.result as string });
    reader.readAsDataURL(file);
  }

  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-5">
      <div>
        <p className="text-sm font-bold text-brand-main">{pageLabel}</p>
        <h2 className="text-2xl font-bold text-brand-text">{pageTitle}</h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <AvatarCard
          name={profile.name}
          avatarSrc={profile.avatar}
          roleLabel={roleLabel}
          fileInputRef={fileInputRef}
          onChangeClick={() => fileInputRef.current?.click()}
          onFileChange={handleFileChange}
        />

        <SharedCard title={form.title} className="flex flex-col gap-5 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label={form.fields.name.label}
              value={profile.name}
              onChange={(e) => updateProfile({ name: e.target.value })}
            />
            <TextField
              label={form.fields.email.label}
              value={profile.email}
              onChange={(e) => updateProfile({ email: e.target.value })}
            />
            <TextField
              label={form.fields.phone.label}
              value={profile.phone}
              onChange={(e) => updateProfile({ phone: e.target.value })}
            />
            <TextField
              label={form.fields.accountType.label}
              value={roleLabel}
              readOnly
            />
          </div>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="w-full rounded-xl bg-brand-main py-3 text-sm font-bold text-white transition hover:opacity-90 sm:w-fit sm:px-8"
          >
            {form.saveLabel}
          </button>
        </SharedCard>
      </div>
    </section>
  );
}