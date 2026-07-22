import React from "react";
import { useState } from "react";
import Sidebar from "../../../shared/components/DashboardSidebar";
import SharedCard from "../../../shared/components/SharedCard";
import { useAuth } from "../../../shared/context/AuthContext";
import { ApiError, fileToBase64, submitContactRequest } from "../../../shared/lib/apiClient";
import {
  TRAINER_SUPPORT_TEXT as SUPPORT_TEXT,
  TRAINER_ISSUE_TYPES as ISSUE_TYPES,
  TRAINER_SUPPORT_GUIDELINES as SUPPORT_GUIDELINES,
  INITIAL_TRAINER_SUPPORT_FORM as INITIAL_SUPPORT_FORM,
} from "../../../mock";

// ─── Icons ────────────────────────────────────────────────────────────────────

function ClockIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path
        d="M14.7 6.3a4 4 0 00-5.4 4.6L4 16.2l1.8 1.8 5.3-5.3a4 4 0 004.6-5.4l-2.5 2.5-2-2 2.5-2.5z"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function PaperclipIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-brand-muted" aria-hidden="true">
      <path d="M21.44 11.05l-9.19 9.19a5 5 0 01-7.07-7.07l9.19-9.19a3.5 3.5 0 014.95 4.95l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

// Maps each SUPPORT_GUIDELINES entry (by key) to its icon component.
const GUIDELINE_ICONS: Record<string, React.FC> = {
  response: ClockIcon,
  technical: WrenchIcon,
};

const INPUT_CLASS =
  "rounded-xl border border-brand-border bg-brand-white p-3 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-main/40 transition";

// ─── Sub-components ───────────────────────────────────────────────────────────

function GuidelineCard({ Icon, title, description }: { Icon: React.FC; title: string; description: string }) {
  return (
    <article className="flex flex-col items-center gap-2 rounded-2xl border border-brand-border bg-brand-white p-6 text-center shadow-sm">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-light text-brand-main">
        <Icon />
      </span>
      <h4 className="font-bold text-brand-text">{title}</h4>
      <p className="text-sm leading-relaxed text-brand-muted">{description}</p>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function TrainerSupport() {
  const auth = useAuth();
  const [formData, setFormData]     = useState(INITIAL_SUPPORT_FORM);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [status, setStatus]         = useState({ loading: false, success: false, error: "" });

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!auth.token) {
      setStatus({ loading: false, success: false, error: SUPPORT_TEXT.authRequiredError });
      return;
    }

    setStatus({ loading: true, success: false, error: "" });

    try {
      const attachments = attachment ? [await fileToBase64(attachment)] : [];
      await submitContactRequest(
        {
          subject: formData.subject,
          message: formData.message,
          messageType: formData.issueType || undefined,
          attachments,
        },
        auth.token,
      );
      setStatus({ loading: false, success: true, error: "" });
      setFormData(INITIAL_SUPPORT_FORM);
      setAttachment(null);
      setFileInputKey((k) => k + 1);
    } catch (err) {
      const message =
        err instanceof ApiError && err.code === "unauthorized"
          ? SUPPORT_TEXT.authRequiredError
          : SUPPORT_TEXT.genericError;
      setStatus({ loading: false, success: false, error: message });
    }
  }

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-start">
      <Sidebar />

      <section className="flex min-w-0 flex-1 flex-col gap-5" dir="rtl">
        <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
          <h2 className="mb-2 text-4xl font-bold text-white">{SUPPORT_TEXT.heroTitle}</h2>
          <p className="text-lg text-white/85">{SUPPORT_TEXT.heroSubtitle}</p>
          <p className="mt-4 flex items-center gap-2 text-sm text-white/80">
            <ClockIcon />
            {SUPPORT_TEXT.supportHours}
          </p>
        </div>

        <SharedCard title={SUPPORT_TEXT.formCardTitle} boxed>
          {status.success && (
            <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-800">
              {SUPPORT_TEXT.successMessage}
            </div>
          )}

          {status.error && (
            <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-800">
              {status.error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-sm font-bold text-brand-text">{SUPPORT_TEXT.subjectLabel}</label>
                <input
                  type="text" id="subject" name="subject" required
                  value={formData.subject} onChange={handleChange}
                  placeholder={SUPPORT_TEXT.subjectPlaceholder} className={INPUT_CLASS}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="issueType" className="text-sm font-bold text-brand-text">{SUPPORT_TEXT.issueTypeLabel}</label>
                <select
                  id="issueType" name="issueType" required
                  value={formData.issueType} onChange={handleChange}
                  className={INPUT_CLASS}
                >
                  <option value="" disabled>{SUPPORT_TEXT.issueTypePlaceholder}</option>
                  {ISSUE_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-sm font-bold text-brand-text">{SUPPORT_TEXT.messageLabel}</label>
              <textarea
                id="message" name="message" required rows={5}
                value={formData.message} onChange={handleChange}
                placeholder={SUPPORT_TEXT.messagePlaceholder}
                className={`${INPUT_CLASS} resize-none`}
              />
            </div>

            {/* Image attachment — identical pattern to Contact.jsx */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="attachment" className="text-sm font-bold text-brand-text">{SUPPORT_TEXT.attachmentLabel}</label>
              <label
                htmlFor="attachment"
                className="flex cursor-pointer items-center justify-between rounded-xl border border-brand-border bg-brand-white p-3 text-brand-muted transition hover:border-brand-main/40"
              >
                <span className="truncate text-sm">
                  {attachment ? attachment.name : SUPPORT_TEXT.attachmentPlaceholder}
                </span>
                <PaperclipIcon />
              </label>
              <input
                key={fileInputKey}
                type="file" id="attachment" name="attachment"
                accept="image/png,image/jpeg"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAttachment(e.target.files?.[0] ?? null)}
                className="hidden"
              />
            </div>

            <button
              type="submit" disabled={status.loading}
              className="self-start rounded-full bg-brand-main px-8 py-3 font-bold text-white transition hover:opacity-95 disabled:opacity-50"
            >
              {status.loading ? SUPPORT_TEXT.submittingButton : SUPPORT_TEXT.submitButton}
            </button>
          </form>
        </SharedCard>

        <div>
          <h3 className="mb-4 text-lg font-bold text-brand-text">{SUPPORT_TEXT.guidelinesTitle}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {SUPPORT_GUIDELINES.map((g) => (
              <GuidelineCard key={g.key} Icon={GUIDELINE_ICONS[g.key]} title={g.title} description={g.description} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default TrainerSupport;
