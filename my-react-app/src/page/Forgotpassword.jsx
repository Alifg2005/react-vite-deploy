import { useState } from "react";

export default function ForgotPassword() {
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
    }, 2000);
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-light px-6">
        <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl text-center">

          <img
            src="/CAPSULE_TAHAWUL.png"
            alt="Capsule Tahawul"
            className="mx-auto h-16 mb-6"
          />

          <div className="text-6xl mb-5">📧</div>

          <h1 className="text-3xl font-bold text-brand-text">
            تم إرسال الرابط
          </h1>

          <p className="mt-4 text-gray-500 leading-7">
            إذا كان البريد الإلكتروني مسجلاً لدينا،
            فسيصلك رابط إعادة تعيين كلمة المرور خلال دقائق.
          </p>

          <button
            className="mt-8 w-full rounded-xl bg-brand-main py-3 text-white font-bold hover:opacity-90 transition"
          >
            العودة إلى تسجيل الدخول
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light px-6">

      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl p-10">

        <div className="text-center">

          <img
            src="/CAPSULE_TAHAWUL.png"
            alt="Capsule Tahawul"
            className="mx-auto h-16 mb-6"
          />

          <h1 className="text-3xl font-bold text-brand-text">
            نسيت كلمة المرور؟
          </h1>

          <p className="mt-3 text-gray-500 leading-7">
            أدخل بريدك الإلكتروني وسنرسل لك رابط
            لإعادة تعيين كلمة المرور.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >

          <div>

            <label className="block mb-2 font-semibold">
              البريد الإلكتروني
            </label>

            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-brand-border px-4 py-3 outline-none focus:border-brand-main"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-brand-main py-3 text-lg font-bold text-white hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "جاري الإرسال..." : "إرسال رابط إعادة التعيين"}
          </button>

          <button
            type="button"
            className="w-full rounded-xl border border-brand-border py-3 font-semibold text-brand-main hover:bg-brand-light transition"
          >
            العودة إلى تسجيل الدخول
          </button>

        </form>

      </div>

    </div>
  );
}

