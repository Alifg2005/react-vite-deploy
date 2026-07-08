import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";
import AuthLayout from "../components/AuthLayout";

const LAST_ROLE_KEY = "ct_last_role";

const FIELD_CLASS =
  "w-full rounded-2xl border border-brand-border bg-brand-white px-5 py-4 text-brand-text transition duration-300 outline-none focus:border-brand-main focus:ring-4 focus:ring-brand-light";

const SUBMIT_CLASS =
  "w-full rounded-2xl bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] py-4 text-lg font-bold text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34.6 5.1 29.6 3 24 3 16 3 9.1 7.6 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 45c5.5 0 10.4-1.9 14.2-5.1l-6.6-5.6c-2 1.5-4.6 2.5-7.6 2.5-5.3 0-9.7-3.4-11.3-8l-6.6 5.1C9 40.3 15.9 45 24 45z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H24v8h11.3a12 12 0 0 1-4.1 5.6l6.6 5.6C41.9 36.6 45 30.9 45 24c0-1.4-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}

function AppleIcon({ className = "h-5 w-5 fill-white" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.415 2.07-1.245 2.79-.83.72-1.83 1.14-3 1.26-.06-1.14.36-2.13 1.26-2.97.9-.84 1.83-1.26 2.79-1.32.03.09.045.18.06.24h.135zM20.55 17.19c-.51 1.17-.75 1.68-1.41 2.7-.93 1.44-2.235 3.24-3.855 3.255-1.44.015-1.8-.945-3.75-.93-1.95.015-2.34.945-3.78.93-1.62-.015-2.85-1.635-3.78-3.075-2.58-3.99-2.85-8.67-1.26-11.16 1.14-1.77 2.94-2.805 4.635-2.805 1.725 0 2.805.945 4.23.945 1.38 0 2.22-.945 4.23-.945 1.5 0 3.09.825 4.23 2.25-3.72 2.04-3.12 7.335 1.11 8.835z" />
    </svg>
  );
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setRole } = useRole();
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const lastRole = localStorage.getItem(LAST_ROLE_KEY) || "student";
    setRole(lastRole);
    navigate("/dashboard");
  };

  return (
    <AuthLayout
      backTo="/"
      panelTitle="أهلاً بك في كبسولة تحول"
      panelSubtitle="منصة متكاملة لإدارة التدريب والمسابقات التقنية مع تجربة حديثة وسهلة الاستخدام."
      heading="مرحبًا بك"
      subheading="قم بتسجيل الدخول للوصول إلى حسابك."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label className="block mb-2 font-semibold text-brand-text">
            البريد الإلكتروني
          </label>

          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        {/* Remember */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-brand-muted">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="accent-brand-main"
            />
            تذكرني
          </label>

          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="font-semibold text-brand-main hover:opacity-80 transition"
          >
            نسيت كلمة المرور؟
          </button>
        </div>

        {/* Login Button */}
        <button type="submit" className={SUBMIT_CLASS}>
          تسجيل الدخول
        </button>

        <p className="text-center text-brand-muted">
          ليس لديك حساب؟
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="mr-2 font-bold text-brand-main hover:opacity-80"
          >
            إنشاء حساب
          </button>
        </p>

        {/* Social login */}
        <div className="flex items-center gap-3 pt-2">
          <span className="h-px flex-1 bg-brand-border" />
          <span className="text-sm text-brand-muted">أو تابع باستخدام</span>
          <span className="h-px flex-1 bg-brand-border" />
        </div>

        {/* Not wired up to a real provider yet — just the shape for now. */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-full border border-brand-border bg-brand-white py-3 text-sm font-bold text-brand-text transition hover:bg-brand-light"
          >
            <GoogleIcon />
            Google
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black py-3 text-sm font-bold text-white transition hover:opacity-90"
          >
            <AppleIcon />
            Apple
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
