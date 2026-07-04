import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      email,
      password,
      remember,
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-100 flex items-center justify-center px-6 py-10">

      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-300 opacity-30 blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-cyan-500 opacity-20 blur-[180px]" />

      <div className="w-full max-w-6xl overflow-hidden rounded-[35px] bg-white/80 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.15)] border border-white/50 grid lg:grid-cols-2">

        {/* Left Side */}
        <div className="hidden lg:flex relative flex-col items-center justify-center bg-gradient-to-br from-[#006B8F] via-[#008DB7] to-[#19C3D8] p-12">

          <div className="absolute w-80 h-80 rounded-full bg-white/10 blur-3xl -top-20 -left-20"></div>
          <div className="absolute w-72 h-72 rounded-full bg-white/10 blur-3xl bottom-0 right-0"></div>

          <img
            src="/CAPSULE_TAHAWUL.png"
            alt="Capsule Tahawul"
            className="w-72 drop-shadow-2xl"
          />

          <div className="mt-12 text-center text-white">
            <h2 className="text-4xl font-bold">
              أهلاً بك في كبسولة تحول
            </h2>

            <p className="mt-5 text-lg text-white/90 leading-8">
              منصة متكاملة لإدارة التدريب والمسابقات التقنية
              مع تجربة حديثة وسهلة الاستخدام.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-white/70 backdrop-blur-xl p-10 lg:p-14">

          <img
            src="/CAPSULE_TAHAWUL.png"
            alt="logo"
            className="h-16 mb-10"
          />

          <h1 className="text-5xl font-extrabold text-gray-800">
            مرحبًا بك
          </h1>

          <p className="mt-3 text-gray-500 text-lg">
            قم بتسجيل الدخول للوصول إلى حسابك.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
          >
                        {/* Email */}

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                البريد الإلكتروني
              </label>

              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 transition duration-300 outline-none focus:bg-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
              />
            </div>

            {/* Password */}

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                كلمة المرور
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 pr-5 transition duration-300 outline-none focus:bg-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-semibold text-cyan-700 hover:text-cyan-900"
                >
                  {showPassword ? "إخفاء" : "إظهار"}
                </button>

              </div>
            </div>

            {/* Remember */}

            <div className="flex items-center justify-between">

              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="accent-cyan-600"
                />

                تذكرني
              </label>

              <button
                type="button"
                className="font-semibold text-cyan-700 hover:text-cyan-900 transition"
              >
                نسيت كلمة المرور؟
              </button>

            </div>

            {/* Login Button */}

            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-[#006B8F] to-[#19C3D8] py-4 text-lg font-bold text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              تسجيل الدخول
            </button>

            <p className="pt-4 text-center text-gray-500">
              ليس لديك حساب؟
              <button
                type="button"
                className="mr-2 font-bold text-cyan-700 hover:text-cyan-900"
              >
                إنشاء حساب
              </button>
            </p>

          </form>

        </div>

      </div>

    </div>
  );
}

