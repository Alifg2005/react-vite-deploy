function InstagramIcon() {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/25 bg-white/10">
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
      </svg>
    </span>
  );
}

function TikTokIcon() {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/25 bg-white/10">
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M15.5 3c.4 2.5 1.8 4.1 4.5 4.3v3.1c-1.6.1-3-.4-4.4-1.3v6.3c0 3.2-2.1 5.6-5.3 5.6-3 0-5.3-2.1-5.3-5.1 0-3.4 2.7-5.8 6.2-5.2v3.2c-1.6-.5-2.9.4-2.9 1.8 0 1.2.9 2.1 2.1 2.1 1.3 0 2.2-.8 2.2-2.5V3h2.9z" />
      </svg>
    </span>
  );
}

function XIcon() {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/25 bg-white/10 text-2xl font-bold">
      𝕏
    </span>
  );
}

function MailIcon() {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/25 bg-white/10">
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/30 bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] px-8 py-12 text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <h2 className="mb-2 text-2xl font-bold text-white">تواصل معنا</h2>

        <p className="mb-8 text-base font-semibold text-white/80">
          تابعونا وتواصلوا معنا عبر القنوات التالية
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 text-base font-bold">
          <div className="flex items-center gap-3">
            <InstagramIcon />
            <span>capsuletahawul</span>
          </div>

          <div className="flex items-center gap-3">
            <TikTokIcon />
            <span>capsuletahawul</span>
          </div>

          <div className="flex items-center gap-3">
            <XIcon />
            <span>capsuletahawul</span>
          </div>

          <div className="flex items-center gap-3">
            <MailIcon />
            <span>capsuletahawul@gmail.com</span>
          </div>
        </div>

        <p className="mt-10 text-sm font-semibold text-white/70">
          © 2026 كبسولة تحول جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
}
