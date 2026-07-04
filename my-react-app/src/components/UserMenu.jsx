import { useRef, useState } from "react";
import { useRole } from "../context/RoleContext";
import { DASHBOARD_DATA } from "../data/dashboardData";

export default function UserMenu() {
  const { role } = useRole();
  const dashboard = DASHBOARD_DATA[role];

  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [avatar, setAvatar] = useState(null);
  const [profile, setProfile] = useState({
    name: dashboard.user.name,
    email: "user@capsule.sa",
    phone: "+966 5X XXX XXXX",
    paymentMethod: "مدى",
    cardNumber: "**** **** **** 1234",
  });

  const fileInputRef = useRef(null);
  const initial = profile.name.trim().charAt(0);

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  }

  function updateProfile(field, value) {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-2 rounded-full border border-brand-border bg-brand-white py-1 ps-1 pe-3 hover:bg-brand-light"
      >
        {avatar ? (
          <img src={avatar} alt="" className="h-8 w-8 rounded-lg object-cover" />
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-main text-sm font-bold text-white">
            {initial}
          </span>
        )}

        <span className="hidden text-sm font-bold text-brand-text sm:inline">
          {profile.name}
        </span>
      </button>

      {open && (
        <div className="absolute end-0 z-20 mt-2 w-80 rounded-2xl border border-brand-border bg-brand-white p-4 text-right shadow-xl">
          <div className="mb-4 flex items-center gap-3">
            {avatar ? (
              <img src={avatar} alt="" className="h-12 w-12 rounded-lg object-cover" />
            ) : (
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-main text-lg font-bold text-white">
                {initial}
              </span>
            )}

            <div>
              <p className="text-sm font-bold text-brand-text">{profile.name}</p>
              <p className="text-xs text-brand-muted">الملف الشخصي</p>
            </div>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-2 rounded-full bg-brand-light p-1">
            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`rounded-full px-3 py-2 text-sm font-bold ${
                activeTab === "profile" ? "bg-brand-main text-white" : "text-brand-muted"
              }`}
            >
              البيانات
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("payment")}
              className={`rounded-full px-3 py-2 text-sm font-bold ${
                activeTab === "payment" ? "bg-brand-main text-white" : "text-brand-muted"
              }`}
            >
              الدفع
            </button>
          </div>

          {activeTab === "profile" ? (
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg border border-brand-border px-3 py-2 text-sm font-bold text-brand-text hover:bg-brand-light"
              >
                تغيير الصورة
              </button>

              <input
                value={profile.name}
                onChange={(event) => updateProfile("name", event.target.value)}
                className="rounded-lg border border-brand-border bg-brand-light px-3 py-2 text-sm"
                placeholder="الاسم"
              />

              <input
                value={profile.email}
                onChange={(event) => updateProfile("email", event.target.value)}
                className="rounded-lg border border-brand-border bg-brand-light px-3 py-2 text-sm"
                placeholder="البريد الإلكتروني"
              />

              <input
                value={profile.phone}
                onChange={(event) => updateProfile("phone", event.target.value)}
                className="rounded-lg border border-brand-border bg-brand-light px-3 py-2 text-sm"
                placeholder="رقم الجوال"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <select
                value={profile.paymentMethod}
                onChange={(event) => updateProfile("paymentMethod", event.target.value)}
                className="rounded-lg border border-brand-border bg-brand-light px-3 py-2 text-sm"
              >
                <option>مدى</option>
                <option>Visa</option>
                <option>تحويل بنكي</option>
              </select>

              <input
                value={profile.cardNumber}
                onChange={(event) => updateProfile("cardNumber", event.target.value)}
                className="rounded-lg border border-brand-border bg-brand-light px-3 py-2 text-sm"
                placeholder="رقم البطاقة"
              />
            </div>
          )}

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-4 w-full rounded-lg bg-brand-main px-3 py-2 text-sm font-bold text-white"
          >
            حفظ التغييرات
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
}