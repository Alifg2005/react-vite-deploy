import { useNavigate } from "react-router-dom";
import authPhoto from "../images/log.jpg";

// Shared shell for Login / Register / Forgot-password so the three pages
// always match: same background, same card look, same field/button styles,
// same spacing. No site Header/Footer here — just a logo + back button.
function BackArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6 rtl:rotate-180"
      aria-hidden="true"
    >
      <path
        d="M19 12H5M5 12L11 6M5 12L11 18"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AuthLayout({ backTo, panelTitle, panelSubtitle, heading, subheading, children }) {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-brand-light px-6 py-8">
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-brand-soft opacity-30 blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-125 h-125 rounded-full bg-brand-main opacity-20 blur-[180px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center">
        <button
          type="button"
          onClick={() => navigate(backTo)}
          className="flex items-center gap-2 rounded-full border border-brand-border bg-brand-white/70 px-5 py-3 text-lg font-bold text-brand-text shadow-sm backdrop-blur transition hover:bg-brand-white"
        >
          <BackArrow />
          رجوع
        </button>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-6xl items-center justify-center py-8">
        <div className="grid w-full overflow-hidden rounded-[35px] bg-brand-white/80 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.15)] border border-brand-border lg:grid-cols-2">
          {/* Left Side */}
          <div
            className="hidden lg:flex relative flex-col items-center justify-center bg-cover bg-center p-12"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(7,59,76,0.88), rgba(19,148,160,0.75), rgba(127,184,184,0.55)), url(${authPhoto})`,
            }}
          >
            <div className="absolute w-80 h-80 rounded-full bg-white/10 blur-3xl -top-20 -left-20" />
            <div className="absolute w-72 h-72 rounded-full bg-white/10 blur-3xl bottom-0 right-0" />

            <img src="/CAPSULE_TAHAWUL.png" alt="Capsule Tahawul" className="w-72 drop-shadow-2xl" />

            <div className="mt-12 text-center text-white">
              <h2 className="text-4xl font-bold">{panelTitle}</h2>
              <p className="mt-5 text-lg text-white/90 leading-8">{panelSubtitle}</p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col justify-center bg-brand-white/70 backdrop-blur-xl p-10 lg:p-14">
            <h1 className="text-4xl font-extrabold text-brand-text">{heading}</h1>
            <p className="mt-3 text-brand-muted text-lg">{subheading}</p>

            <div className="mt-10">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
