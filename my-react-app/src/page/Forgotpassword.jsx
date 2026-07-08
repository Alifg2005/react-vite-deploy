import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const FIELD_CLASS =
  "w-full rounded-2xl border border-brand-border bg-brand-white px-5 py-4 text-brand-text transition duration-300 outline-none focus:border-brand-main focus:ring-4 focus:ring-brand-light";

const SUBMIT_CLASS =
  "w-full rounded-2xl bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] py-4 text-lg font-bold text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl disabled:opacity-50";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    // محاكاة إرسال الرابط
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  return (
    <AuthLayout
            backTo="/login"
      panelTitle="استعادة كلمة المرور"
      panelSubtitle="لا تقلق، سنساعدك على العودة إلى حسابك في كبسولة تحول خلال دقائق."
      heading="نسيت كلمة المرور؟"
      subheading="أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور."
    >
      {sent ? (
        <div className="space-y-6">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center text-emerald-800 font-semibold leading-7">
            تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني.
          </div>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className={SUBMIT_CLASS}
          >
            العودة لتسجيل الدخول
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
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

          <button type="submit" disabled={loading} className={SUBMIT_CLASS}>
            {loading ? "جاري الإرسال..." : "إرسال رابط إعادة التعيين"}
          </button>

          <p className="text-center text-brand-muted">
            تذكرت كلمة المرور؟
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="mr-2 font-bold text-brand-main hover:opacity-80"
            >
              العودة لتسجيل الدخول
            </button>
          </p>
        </form>
      )}
    </AuthLayout>
  );
}
