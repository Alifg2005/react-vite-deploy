import { useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";
import { ROLE_LABELS } from "../data/dashboardData";
import SharedCard from "../components/SharedCard";

function Field({ label, value, onChange, readOnly = false }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-brand-text">{label}</label>
      <input
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={`w-full rounded-xl border border-brand-border px-4 py-3 text-sm outline-none ${
          readOnly ? "bg-brand-light text-brand-muted" : "bg-brand-white focus:border-brand-main"
        }`}
      />
    </div>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const { role, profile, updateProfile } = useRole();
  const fileInputRef = useRef(null);

  if (role === "guest") return <Navigate to="/login" replace />;

  const roleLabel = ROLE_LABELS[role];
  const initial = profile.name.trim().charAt(0) || "؟";

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => updateProfile({ avatar: reader.result });
    reader.readAsDataURL(file);
  }

  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-5">
      <div>
        <p className="text-sm font-bold text-brand-main">الحساب</p>
        <h2 className="text-2xl font-bold text-brand-text">الملف الشخصي</h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="order-first flex flex-col items-center gap-3 rounded-2xl border border-brand-border bg-brand-white p-6 text-center lg:order-last lg:col-span-1">
          {profile.avatar ? (
            <img src={profile.avatar} alt="" className="h-20 w-20 rounded-full object-cover" />
          ) : (
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-main text-2xl font-bold text-white">
              {initial}
            </span>
          )}

          <div>
            <p className="text-lg font-bold text-brand-text">{profile.name}</p>
            <span className="mt-1 inline-block rounded-full bg-brand-light px-3 py-1 text-sm font-bold text-brand-main">
              {roleLabel}
            </span>
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-lg border border-brand-border px-4 py-2 text-sm font-bold text-brand-text hover:bg-brand-light"
          >
            تغيير الصورة
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <SharedCard
          title="بيانات الحساب"
          className="flex flex-col gap-5 lg:col-span-2"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="الاسم"
              value={profile.name}
              onChange={(event) => updateProfile({ name: event.target.value })}
            />
            <Field
              label="البريد الإلكتروني"
              value={profile.email}
              onChange={(event) => updateProfile({ email: event.target.value })}
            />
            <Field
              label="رقم الجوال"
              value={profile.phone}
              onChange={(event) => updateProfile({ phone: event.target.value })}
            />
            <Field label="نوع الحساب" value={roleLabel} readOnly />
          </div>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="w-full rounded-xl bg-brand-main py-3 text-sm font-bold text-white transition hover:opacity-90 sm:w-fit sm:px-8"
          >
            حفظ التغييرات
          </button>
        </SharedCard>
      </div>
    </section>
  );
}
