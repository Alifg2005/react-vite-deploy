import { useState } from "react";

const MESSAGE_TYPES = [
  { value: "دورات", label: "دورات" },
  { value: "مشكلة تقنية", label: "مشكلة تقنية" },
  { value: "شكوى", label: "شكوى" },
  { value: "اقتراح", label: "اقتراح" },
  { value: "دفع/فاتورة", label: "دفع/فاتورة" },
  { value: "أخرى", label: "أخرى" },
];

const INPUT_CLASS =
  "rounded-xl border border-brand-border bg-brand-white p-3 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-main/40 transition";

const INITIAL_FORM = { name: "", email: "", messageType: "", subject: "", message: "" };

function ClockIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AcademicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path d="M12 4l9 4.5-9 4.5-9-4.5L12 4z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 10.7v4.3c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-4.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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

const CONTACT_GUIDELINES = [
  { icon: ClockIcon, title: "رد سريع", description: "يتم الرد عادة خلال 24 ساعة في أيام العمل." },
  { icon: AcademicIcon, title: "استفسارات أكاديمية", description: "يرجى ذكر اسم الدورة أو البرنامج المعني." },
  { icon: WrenchIcon, title: "مشاكل تقنية", description: "يرجى توضيح الخطأ أو إرفاق صورة إن أمكن." },
];

function PaperclipIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-brand-muted" aria-hidden="true">
      <path d="M21.44 11.05l-9.19 9.19a5 5 0 01-7.07-7.07l9.19-9.19a3.5 3.5 0 014.95 4.95l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [attachment, setAttachment] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    // Mock API Layer Delay Simulation
    setTimeout(() => {
      setStatus({ loading: false, success: true, error: null });
      setFormData(INITIAL_FORM);
      setAttachment(null);
      setFileInputKey((key) => key + 1);
    }, 1200);
  };

  return (
    <section className="flex flex-col gap-5 text-right" dir="rtl">
      <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
        <h2 className="mb-2 text-4xl font-bold text-white">تواصل معنا</h2>
        <p className="text-lg text-white/85">
          يسعدنا استقبال استفساراتكم واقتراحاتكم. فريق كبسولة تحول هنا لمساعدتكم دائمًا.
        </p>
        <p className="mt-4 flex items-center gap-2 text-sm text-white/80">
          <ClockIcon />
          أوقات الدعم: الأحد إلى الخميس، 9ص - 5م
        </p>
      </div>

      <div>
        <h3 className="mb-4 text-xl font-bold text-brand-text">إرسال رسالة مباشرة</h3>

        {status.success && (
          <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 text-sm font-bold">
            ✓ تم إرسال رسالتك بنجاح! سنقوم بالرد عليك في أقرب وقت ممكن.
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-bold text-brand-text">الاسم الكامل</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className={INPUT_CLASS}
                placeholder="اكتب اسمك الكامل"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-bold text-brand-text">البريد الإلكتروني</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={INPUT_CLASS}
                placeholder="اكتب بريدك الإلكتروني"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="subject" className="text-sm font-bold text-brand-text">الموضوع</label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className={INPUT_CLASS}
                placeholder="اكتب موضوع الرسالة"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="messageType" className="text-sm font-bold text-brand-text">نوع الرسالة</label>
              <select
                id="messageType"
                name="messageType"
                required
                value={formData.messageType}
                onChange={handleChange}
                className={INPUT_CLASS}
              >
                <option value="" disabled>اختر نوع الرسالة</option>
                {MESSAGE_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm font-bold text-brand-text">نص الرسالة</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className={`${INPUT_CLASS} resize-none`}
              placeholder="اكتب استفسارك بالتفصيل هنا..."
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="attachment" className="text-sm font-bold text-brand-text">إرفاق صورة</label>
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

          <button
            type="submit"
            disabled={status.loading}
            className="mt-2 self-start rounded-full bg-brand-main px-8 py-3 font-bold text-white transition hover:opacity-95 disabled:opacity-50"
          >
            {status.loading ? "جاري الإرسال..." : "إرسال الرسالة"}
          </button>
        </form>
      </div>

      <div className="mt-6">
        <h3 className="mb-4 text-xl font-bold text-brand-text">إرشادات التواصل</h3>

        <div className="grid gap-4 sm:grid-cols-3">
          {CONTACT_GUIDELINES.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="flex flex-col items-center gap-2 rounded-2xl border border-brand-border bg-brand-white p-6 text-center shadow-sm"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-light text-brand-main">
                <Icon />
              </span>
              <h4 className="font-bold text-brand-text">{title}</h4>
              <p className="text-sm text-brand-muted leading-relaxed">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
