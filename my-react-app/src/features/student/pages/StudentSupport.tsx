// StudentSupport.tsx

import { useState } from "react";
import { useRole } from "../../../shared/context/RoleContext";
import { useAuth } from "../../../shared/context/AuthContext";
import { ApiError, fileToBase64, submitContactRequest } from "../../../shared/lib/apiClient";
import {
  SUPPORT_FORM_INITIAL,
  SUPPORT_MESSAGE_TYPES,
  SUPPORT_INPUT_CLASS,
} from "../../../mock";
import type { SupportFormData } from "../../../mock";

// ── Icons ──────────────────────────────────────────────────────────────────────

function ClockIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 7v5l3.5 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PaperclipIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 shrink-0 text-brand-muted"
      aria-hidden="true"
    >
      <path d="M21.44 11.05l-9.19 9.19a5 5 0 01-7.07-7.07l9.19-9.19a3.5 3.5 0 014.95 4.95l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function StudentSupport() {
  useRole();
  const auth = useAuth();

  const [form, setForm]             = useState<SupportFormData>(SUPPORT_FORM_INITIAL);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [status, setStatus]         = useState({ loading: false, success: false, error: "" });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!auth.token) {
      setStatus({ loading: false, success: false, error: "يجب تسجيل الدخول لإرسال رسالة." });
      return;
    }

    setStatus({ loading: true, success: false, error: "" });

    try {
      const attachments = attachment ? [await fileToBase64(attachment)] : [];
      await submitContactRequest(
        {
          subject: form.subject,
          message: form.message,
          messageType: form.messageType || undefined,
          attachments,
        },
        auth.token,
      );
      setStatus({ loading: false, success: true, error: "" });
      setForm(SUPPORT_FORM_INITIAL);
      setAttachment(null);
      setFileInputKey((k) => k + 1);
    } catch (err) {
      const message =
        err instanceof ApiError && err.code === "unauthorized"
          ? "يجب تسجيل الدخول لإرسال رسالة."
          : "تعذر إرسال رسالتك، حاول مرة أخرى.";
      setStatus({ loading: false, success: false, error: message });
    }
  }

  return (
    <section className="flex flex-col gap-5 text-right" dir="rtl">

      {/* Gradient header */}
      <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
        <h2 className="mb-2 text-4xl font-bold text-white">الدعم الفني</h2>
        <p className="text-lg text-white/85">
          يسعدنا استقبال استفساراتكم ومشاكلكم التقنية. فريق كبسولة تحول هنا لمساعدتكم دائمًا.
        </p>
        <p className="mt-4 flex items-center gap-2 text-sm text-white/80">
          <ClockIcon />
          أوقات الدعم: الأحد إلى الخميس، 9ص - 5م
        </p>
      </div>

      {/* Form section */}
      <div>
        <h3 className="mb-4 text-xl font-bold text-brand-text">إرسال رسالة مباشرة</h3>

        {status.success && (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-800">
            ✓ تم إرسال رسالتك بنجاح! سنقوم بالرد عليك في أقرب وقت ممكن.
          </div>
        )}

        {status.error && (
          <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-800">
            {status.error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Row 1 — Subject + Message type */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="subject" className="text-sm font-bold text-brand-text">
                الموضوع
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={form.subject}
                onChange={handleChange}
                placeholder="اكتب موضوع الرسالة"
                className={SUPPORT_INPUT_CLASS}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="messageType" className="text-sm font-bold text-brand-text">
                نوع الرسالة
              </label>
              <select
                id="messageType"
                name="messageType"
                required
                value={form.messageType}
                onChange={handleChange}
                className={SUPPORT_INPUT_CLASS}
              >
                <option value="" disabled>اختر نوع الرسالة</option>
                {SUPPORT_MESSAGE_TYPES.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2 — Message body */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm font-bold text-brand-text">
              نص الرسالة
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="اكتب استفسارك بالتفصيل هنا..."
              className={`${SUPPORT_INPUT_CLASS} resize-none`}
            />
          </div>

          {/* Row 3 — File attachment */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="attachment" className="text-sm font-bold text-brand-text">
              إرفاق صورة
            </label>
            <label
              htmlFor="attachment"
              className="flex cursor-pointer items-center justify-between rounded-xl border border-brand-border bg-brand-white p-3 text-brand-muted transition hover:border-brand-main/40"
            >
              <span className="truncate text-sm">
                {attachment ? attachment.name : "اختياري - PNG أو JPG"}
              </span>
              <PaperclipIcon />
            </label>
            <input
              key={fileInputKey}
              type="file"
              id="attachment"
              name="attachment"
              accept="image/png,image/jpeg"
              onChange={(e) => setAttachment(e.target.files?.[0] ?? null)}
              className="hidden"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={status.loading}
            className="mt-2 self-start rounded-full bg-brand-main px-8 py-3 font-bold text-white transition hover:opacity-95 disabled:opacity-50"
          >
            {status.loading ? "جاري الإرسال..." : "إرسال الرسالة"}
          </button>

        </form>
      </div>

    </section>
  );
}
