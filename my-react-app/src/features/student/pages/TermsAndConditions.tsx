// TermsAndConditions.tsx — Full terms page. Linked from course application modals.

import { useRole } from "../../../shared/context/RoleContext";
import SharedCard from "../../../shared/components/SharedCard";
import { TERMS_SECTIONS_AR, TERMS_SECTIONS_EN } from "../../../mock";

export default function TermsAndConditions() {
  const { language, direction } = useRole();
  const sections = language === "ar" ? TERMS_SECTIONS_AR : TERMS_SECTIONS_EN;

  return (
    <section
      className="mx-auto max-w-3xl px-4 py-10 text-right"
      dir={direction}
    >
      {/* Hero banner */}
      <div className="mb-8 rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
        <h1 className="mb-2 text-3xl font-bold">
          {language === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}
        </h1>
        <p className="text-white/85">
          {language === "ar"
            ? "يُرجى قراءة هذه الشروط بعناية قبل استخدام المنصة أو التسجيل في أي برنامج."
            : "Please read these terms carefully before using the platform or registering for any programme."}
        </p>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-6">
        {sections.map((section) => (
          <SharedCard key={section.heading} boxed rounded="rounded-xl" padding="p-5">
            <h2 className="mb-2 text-base font-bold text-brand-text">{section.heading}</h2>
            <p className="text-sm leading-relaxed text-brand-muted">{section.body}</p>
          </SharedCard>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-brand-muted">
        {language === "ar"
          ? "آخر تحديث: يناير ٢٠٢٥ — كبسولة تحول"
          : "Last updated: January 2025 — Capsule Transform"}
      </p>
    </section>
  );
}
