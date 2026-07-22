import type { ChangeEvent, FormEvent } from "react";
import { CONTACT_DATA } from "../../../../mock";
import type { ContactFormState } from "../../../../mock";

const { form } = CONTACT_DATA;

const INPUT_CLASS =
  "rounded-xl border border-brand-border bg-brand-white p-3 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-main/40 transition";

function PaperclipIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-brand-muted" aria-hidden="true">
      <path d="M21.44 11.05l-9.19 9.19a5 5 0 01-7.07-7.07l9.19-9.19a3.5 3.5 0 014.95 4.95l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

interface ContactFormStatus {
  loading: boolean;
  success: boolean;
  error: string | null;
}

interface ContactFormProps {
  formData: ContactFormState;
  attachment: File | null;
  fileInputKey: number;
  status: ContactFormStatus;
  onFieldChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onAttachmentChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

function ContactForm({
  formData,
  attachment,
  fileInputKey,
  status,
  onFieldChange,
  onAttachmentChange,
  onSubmit,
}: ContactFormProps) {
  return (
    <div>
      <h3 className="mb-4 text-xl font-bold text-brand-text">{form.sectionTitle}</h3>

      {status.success && (
        <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 text-sm font-bold">
          {form.successMessage}
        </div>
      )}

      {status.error && (
        <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 p-4 text-rose-800 text-sm font-bold">
          {status.error}
        </div>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-bold text-brand-text">{form.fields.name.label}</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={onFieldChange}
              placeholder={form.fields.name.placeholder}
              className={INPUT_CLASS}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-bold text-brand-text">{form.fields.email.label}</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={onFieldChange}
              placeholder={form.fields.email.placeholder}
              className={INPUT_CLASS}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="subject" className="text-sm font-bold text-brand-text">{form.fields.subject.label}</label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={onFieldChange}
              placeholder={form.fields.subject.placeholder}
              className={INPUT_CLASS}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="messageType" className="text-sm font-bold text-brand-text">{form.fields.messageType.label}</label>
            <select
              id="messageType"
              name="messageType"
              required
              value={formData.messageType}
              onChange={onFieldChange}
              className={INPUT_CLASS}
            >
              <option value="" disabled>{form.fields.messageType.placeholder}</option>
              {form.messageTypes.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-sm font-bold text-brand-text">{form.fields.message.label}</label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={onFieldChange}
            placeholder={form.fields.message.placeholder}
            className={`${INPUT_CLASS} resize-none`}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="attachment" className="text-sm font-bold text-brand-text">{form.fields.attachment.label}</label>
          <label
            htmlFor="attachment"
            className="flex cursor-pointer items-center justify-between rounded-xl border border-brand-border bg-brand-white p-3 text-brand-muted transition hover:border-brand-main/40"
          >
            <span className="truncate text-sm">
              {attachment ? attachment.name : form.fields.attachment.placeholder}
            </span>
            <PaperclipIcon />
          </label>
          <input
            key={fileInputKey}
            type="file"
            id="attachment"
            name="attachment"
            accept="image/png,image/jpeg"
            onChange={onAttachmentChange}
            className="hidden"
          />
        </div>

        <button
          type="submit"
          disabled={status.loading}
          className="mt-2 self-start rounded-full bg-brand-main px-8 py-3 font-bold text-white transition hover:opacity-95 disabled:opacity-50"
        >
          {status.loading ? form.loadingLabel : form.submitLabel}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
