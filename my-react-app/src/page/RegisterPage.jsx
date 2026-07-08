import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";
import AuthLayout from "../components/AuthLayout";

const LAST_ROLE_KEY = "ct_last_role";

const ACCOUNT_TYPES = [
  { value: "student", label: "طالب" },
  { value: "company", label: "شركة" },
  { value: "trainer", label: "مدرب" },
  { value: "admin", label: "إدارة" },
];

const FIELD_CLASS =
  "w-full rounded-2xl border border-brand-border bg-brand-white px-5 py-4 text-brand-text transition duration-300 outline-none focus:border-brand-main focus:ring-4 focus:ring-brand-light";

const SUBMIT_CLASS =
  "w-full rounded-2xl bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] py-4 text-lg font-bold text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl";

export default function Register() {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    accountType: "student",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("كلمتا المرور غير متطابقتين");
      return;
    }

    localStorage.setItem(LAST_ROLE_KEY, form.accountType);
    setRole(form.accountType);
    navigate("/dashboard");
  };

  return (
    <AuthLayout
      backTo="/"
      panelTitle="انضم إلى كبسولة تحول"
      panelSubtitle="أنشئ حسابك وابدأ رحلتك في المسابقات، التدريب، والبرامج التقنية."
      heading="إنشاء حساب"
      subheading="أدخل بياناتك لإنشاء حساب جديد."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full name */}
        <div>
          <label className="block mb-2 font-semibold text-brand-text">
            الاسم الكامل
          </label>

          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            className={FIELD_CLASS}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 font-semibold text-brand-text">
            البريد الإلكتروني
          </label>

          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            value={form.email}
            onChange={handleChange}
            required
            className={FIELD_CLASS}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-2 font-semibold text-brand-text">
            رقم الجوال
          </label>

          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className={FIELD_CLASS}
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-2 font-semibold text-brand-text">
            كلمة المرور
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              required
              className={FIELD_CLASS}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-semibold text-brand-main hover:opacity-80"
            >
              {showPassword ? "إخفاء" : "إظهار"}
            </button>
          </div>
        </div>

        {/* Confirm password */}
        <div>
          <label className="block mb-2 font-semibold text-brand-text">
            تأكيد كلمة المرور
          </label>

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="********"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className={FIELD_CLASS}
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-semibold text-brand-main hover:opacity-80"
            >
              {showConfirm ? "إخفاء" : "إظهار"}
            </button>
          </div>
        </div>

        {/* Account type */}
        <div>
          <label className="block mb-2 font-semibold text-brand-text">
            نوع الحساب
          </label>

          <select
            name="accountType"
            value={form.accountType}
            onChange={handleChange}
            className={FIELD_CLASS}
          >
            {ACCOUNT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-2 text-brand-muted">
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
            required
            className="accent-brand-main"
          />
          <span>أوافق على الشروط والأحكام.</span>
        </label>

        <button type="submit" className={SUBMIT_CLASS}>
          إنشاء الحساب
        </button>

        <p className="text-center text-brand-muted">
          لديك حساب بالفعل؟
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mr-2 font-bold text-brand-main hover:opacity-80"
          >
            تسجيل الدخول
          </button>
        </p>
      </form>
    </AuthLayout>
  );
}
