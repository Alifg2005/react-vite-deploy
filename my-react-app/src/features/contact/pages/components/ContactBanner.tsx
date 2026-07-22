import { CONTACT_DATA } from "../../../../mock";

const { title, subtitle, supportHours } = CONTACT_DATA.banner;

function ClockIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ContactBanner() {
  return (
    <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
      <h2 className="mb-2 text-4xl font-bold text-white">{title}</h2>
      <p className="text-lg text-white/85">{subtitle}</p>
      <p className="mt-4 flex items-center gap-2 text-sm text-white/80">
        <ClockIcon />
        {supportHours}
      </p>
    </div>
  );
}

export default ContactBanner;
