import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthLayout from "../../../layouts/AuthLayout";
import { useTeam } from "../../../context/TeamContext";

const FIELD_CLASS =
  "w-full rounded-2xl border border-brand-border bg-brand-white px-5 py-4 text-brand-text transition duration-300 outline-none focus:border-brand-main focus:ring-4 focus:ring-brand-light";

const SUBMIT_CLASS =
  "w-full rounded-2xl bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] py-4 text-lg font-bold text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl disabled:opacity-50";

export default function SetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const { completeInvite } = useTeam();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setError("كلمة المرور يجب أن تكون 8 أحرف على الأقل.");
      return;
    }
    if (password !== confirmPassword) {
      setError("كلمتا المرور غير متطابقتين.");
      return;
    }

    const ok = completeInvite(token);
    if (!ok) {
      setError("رابط الدعوة غير صالح أو تم استخدامه من قبل.");
      return;
    }

    setError("");
    setDone(true);
  };

  return (
    <AuthLayout
      backTo="/login"
      panelTitle="أهلاً بك في فريق كبسولة تحول"
      panelSubtitle="خطوة أخيرة لإكمال انضمامك إلى فريق الإدارة."
      heading="تعيين كلمة المرور"
      subheading="أنشئ كلمة مرور لحسابك الجديد لإكمال التسجيل."
    >
      {done ? (
        <div className="space-y-6">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center font-semibold leading-7 text-emerald-800">
            تم تعيين كلمة المرور بنجاح، وتم إشعار الإدارة بانضمامك.
          </div>

          <button type="button" onClick={() => navigate("/login")} className={SUBMIT_CLASS}>
            الذهاب لتسجيل الدخول
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block font-semibold text-brand-text">كلمة المرور الجديدة</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={FIELD_CLASS}
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-brand-text">تأكيد كلمة المرور</label>
            <input
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={FIELD_CLASS}
            />
          </div>

          {error ? <p className="text-sm font-bold text-rose-600">{error}</p> : null}

          <button type="submit" className={SUBMIT_CLASS}>
            تعيين كلمة المرور
          </button>
        </form>
      )}
    </AuthLayout>
  );
}
