import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";
import SharedCard from "../components/SharedCard";

function TextField({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-brand-text">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-brand-border bg-brand-white px-4 py-3 text-sm outline-none focus:border-brand-main"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-brand-text">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-brand-border bg-brand-white px-4 py-3 text-sm outline-none focus:border-brand-main"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function CheckField({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm font-semibold text-brand-text">
      <input type="checkbox" checked={checked} onChange={onChange} className="accent-brand-main" />
      {label}
    </label>
  );
}

export default function AccountSettings() {
  const navigate = useNavigate();
  const { role, profile, updateProfile, language, setLanguage } = useRole();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  if (role === "guest") return <Navigate to="/login" replace />;

  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-5">
      <p className="text-sm font-bold text-brand-main">الإعدادات</p>
      <h2 className="text-2xl font-bold text-brand-text">إعدادات الحساب</h2>

      <div className="grid gap-5 lg:grid-cols-2">
        <SharedCard title="بيانات الحساب" className="flex flex-col gap-4">
          <TextField
            label="الاسم الكامل"
            value={profile.name}
            onChange={(event) => updateProfile({ name: event.target.value })}
          />
          <TextField
            label="البريد الإلكتروني"
            value={profile.email}
            onChange={(event) => updateProfile({ email: event.target.value })}
          />
          <TextField
            label="رقم الجوال"
            value={profile.phone}
            onChange={(event) => updateProfile({ phone: event.target.value })}
          />
          <TextField
            label="المدينة"
            value={profile.city}
            onChange={(event) => updateProfile({ city: event.target.value })}
          />
        </SharedCard>

        <SharedCard title="الأمان وتسجيل الدخول" className="flex flex-col gap-4">
          <TextField
            label="كلمة المرور الحالية"
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
          />
          <TextField
            label="كلمة المرور الجديدة"
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
          <CheckField
            label="تفعيل التحقق بخطوتين"
            checked={profile.twoFactor}
            onChange={(event) => updateProfile({ twoFactor: event.target.checked })}
          />
        </SharedCard>

        <SharedCard title="التنبيهات والإشعارات" className="flex flex-col gap-4">
          <SelectField
            label="اللغة"
            value={language === "ar" ? "العربية" : "English"}
            onChange={(event) => setLanguage(event.target.value === "العربية" ? "ar" : "en")}
            options={["العربية", "English"]}
          />
          <SelectField
            label="طريقة عرض اللوحة"
            value={profile.dashboardView}
            onChange={(event) => updateProfile({ dashboardView: event.target.value })}
            options={["بسيط", "متقدم"]}
          />
          <CheckField
            label="تفعيل إشعارات البريد"
            checked={profile.emailNotifications}
            onChange={(event) => updateProfile({ emailNotifications: event.target.checked })}
          />
          <CheckField
            label="تفعيل إشعارات الأنشطة"
            checked={profile.activityNotifications}
            onChange={(event) => updateProfile({ activityNotifications: event.target.checked })}
          />
        </SharedCard>

        <SharedCard title="الدفع والخصوصية" className="flex flex-col gap-4">
          <SelectField
            label="طريقة الدفع"
            value={profile.paymentMethod}
            onChange={(event) => updateProfile({ paymentMethod: event.target.value })}
            options={["مدى", "Visa", "تحويل بنكي"]}
          />
          <TextField
            label="رقم البطاقة"
            value={profile.cardNumber}
            onChange={(event) => updateProfile({ cardNumber: event.target.value })}
          />
          <CheckField
            label="السماح بتنبيهات العروض الجديدة"
            checked={profile.offerNotifications}
            onChange={(event) => updateProfile({ offerNotifications: event.target.checked })}
          />
          <CheckField
            label="إظهار إنجازاتي في الملف"
            checked={profile.showAchievements}
            onChange={(event) => updateProfile({ showAchievements: event.target.checked })}
          />
        </SharedCard>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-xl border border-brand-border px-6 py-3 text-sm font-bold text-brand-text hover:bg-brand-light"
        >
          إلغاء
        </button>
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="rounded-xl bg-brand-main px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
        >
          حفظ التغييرات
        </button>
      </div>
    </section>
  );
}
