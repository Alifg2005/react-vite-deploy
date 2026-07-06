import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
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

    console.log(form);

    // ربط API لاحقاً
  };

  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* Left Section */}
        <div className="hidden lg:flex bg-linear-to-br from-brand-main to-cyan-500 items-center justify-center relative p-12">

          <img
            src="/CAPSULE_TAHAWUL.png"
            alt="Capsule"
            className="w-72"
          />

          <div className="absolute bottom-10 text-center text-white px-10">

            <h2 className="text-4xl font-bold">
              انضم إلى كبسولة تحول
            </h2>

            <p className="mt-4 text-white/80 leading-8">
              أنشئ حسابك وابدأ رحلتك في المسابقات،
              التدريب، والبرامج التقنية.
            </p>

          </div>

        </div>

        {/* Right Section */}

        <div className="p-10 lg:p-14">

          <img
            src="/CAPSULE_TAHAWUL.png"
            alt="logo"
            className="h-16 mb-8"
          />

          <h1 className="text-4xl font-bold text-brand-text">
            إنشاء حساب ✨
          </h1>

          <p className="mt-2 text-gray-500">
            أدخل بياناتك لإنشاء حساب جديد.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 mt-10"
          >

            <div>
              <label className="block mb-2 font-semibold">
                الاسم الكامل
              </label>

              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full rounded-xl border border-brand-border px-5 py-3 outline-none focus:border-brand-main"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                البريد الإلكتروني
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-brand-border px-5 py-3 outline-none focus:border-brand-main"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                رقم الجوال
              </label>

              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-brand-border px-5 py-3 outline-none focus:border-brand-main"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                كلمة المرور
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-brand-border px-5 py-3 pr-14 outline-none focus:border-brand-main"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>

              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                تأكيد كلمة المرور
              </label>

              <div className="relative">

                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-brand-border px-5 py-3 pr-14 outline-none focus:border-brand-main"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirm(!showConfirm)
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                >
                  {showConfirm ? "🙈" : "👁️"}
                </button>

              </div>
            </div>

            <label className="flex items-center gap-2">

              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                required
              />

              <span>
                أوافق على الشروط والأحكام.
              </span>

            </label>

            <button
              type="submit"
              className="w-full rounded-xl bg-brand-main py-3 text-lg font-bold text-white hover:opacity-90 transition" 
              onClick={() => navigate("/HomePage") }

            >
              إنشاء الحساب
            </button>

            <p className="text-center text-gray-500">

              لديك حساب بالفعل؟

              <button
                type="button"
                className="mr-2 text-brand-main font-bold"
              >
                تسجيل الدخول
              </button>

            </p>

          </form>

        </div>

      </div>
    </div>
  );
}