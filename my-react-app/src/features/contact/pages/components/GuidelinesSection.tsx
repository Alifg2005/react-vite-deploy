import type { FC } from "react";
import { CONTACT_DATA } from "../../../../mock";

const { guidelines } = CONTACT_DATA;

// ── Icons ──────────────────────────────────────────────────────────────────────

function AcademicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path
        d="M12 4l9 4.5-9 4.5-9-4.5L12 4z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 10.7v4.3c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-4.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path
        d="M14.7 6.3a4 4 0 00-5.4 4.6L4 16.2l1.8 1.8 5.3-5.3a4 4 0 004.6-5.4l-2.5 2.5-2-2 2.5-2.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// "متابعة الطلب" replaces "رد سريع"
function FollowUpIcon() {
  return <span className="text-2xl" aria-hidden="true">📩</span>;
}

// ── Icon map — "clock" is replaced by "followup" ──────────────────────────────

const ICON_MAP: Record<string, FC> = {
  followup: FollowUpIcon,
  academic:  AcademicIcon,
  wrench:    WrenchIcon,
};

// ── Updated guidelines items — "clock" swapped for "followup" ─────────────────

const UPDATED_ITEMS = guidelines.items.map((item) =>
  item.id === "clock"
    ? {
        id: "followup",
        title: "متابعة الطلب",
        description:
          "احتفظ ببريدك الإلكتروني وتابع صندوق الوارد، فقد نحتاج إلى معلومات إضافية لإكمال معالجة طلبك.",
      }
    : item,
);

// ── Component ─────────────────────────────────────────────────────────────────

function GuidelinesSection() {
  return (
    <div className="mt-6">
      <h3 className="mb-4 text-xl font-bold text-brand-text">
        {guidelines.sectionTitle}
      </h3>

      <div className="grid gap-4 sm:grid-cols-3">
        {UPDATED_ITEMS.map(({ id, title, description }) => {
          const Icon = ICON_MAP[id];
          return (
            <article
              key={id}
              className="flex flex-col items-center gap-2 rounded-2xl border border-brand-border bg-brand-white p-6 text-center shadow-sm"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-light text-brand-main">
                {Icon ? <Icon /> : null}
              </span>
              <h4 className="font-bold text-brand-text">{title}</h4>
              <p className="text-sm text-brand-muted leading-relaxed">
                {description}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default GuidelinesSection;
