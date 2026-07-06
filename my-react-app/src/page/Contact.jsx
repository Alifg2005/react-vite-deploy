import { useState } from "react";

function ContactInfoCard({ title, value, iconText }) {
  return (
    <article className="rounded-xl border border-brand-border bg-brand-white px-4 py-4 shadow-sm flex items-center gap-4 text-right">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-border bg-brand-light text-xl font-bold text-brand-main">
        {iconText}
      </span>
      <div>
        <span className="mb-0.5 block text-sm text-brand-muted">{title}</span>
        <strong className="text-base text-brand-text font-bold dir-ltr inline-block">{value}</strong>
      </div>
    </article>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
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
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <section className="flex flex-col gap-5 text-right" dir="rtl">
      <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
        <h2 className="mb-2 text-4xl font-bold text-white">تواصل معنا</h2>
        <p className="text-lg text-white/85">
          يسعدنا استقبال استفساراتكم واقتراحاتكم. فريق كبسولة تحول هنا لمساعدتكم دائمًا.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <ContactInfoCard title="البريد الإلكتروني" value="capsuletahawul@gmail.com" iconText="✉" />
        <ContactInfoCard title="حساب المنصة الموحد" value="@capsuletahawul" iconText="🌐" />
        <ContactInfoCard title="أوقات العمل والدعم" value="من الأحد إلى الخميس (9ص - 5م)" iconText="⏰" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-brand-border bg-brand-white p-6 lg:col-span-2">
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
                  className="rounded-xl border border-brand-border bg-brand-light p-3 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-main/40 transition"
                  placeholder="عبدالله محمد"
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
                  className="rounded-xl border border-brand-border bg-brand-light p-3 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-main/40 transition"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="subject" className="text-sm font-bold text-brand-text">الموضوع</label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="rounded-xl border border-brand-border bg-brand-light p-3 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-main/40 transition"
                placeholder="عنوان الاستفسار"
              />
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
                className="rounded-xl border border-brand-border bg-brand-light p-3 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-main/40 transition resize-none"
                placeholder="اكتب استفسارك بالتفصيل هنا..."
              />
            </div>

            <button
              type="submit"
              disabled={status.loading}
              className="mt-2 rounded-xl bg-brand-main px-6 py-3 font-bold text-white transition hover:opacity-95 disabled:opacity-50 flex items-center justify-center self-start min-w-[140px]"
            >
              {status.loading ? "جاري الإرسال..." : "إرسال الرسالة"}
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-brand-border bg-brand-white p-6 h-fit">
          <h3 className="mb-4 text-xl font-bold text-brand-text">إرشادات التواصل</h3>
          
          <div className="flex flex-col gap-3">
            <article className="rounded-xl border border-brand-border bg-brand-light p-4">
              <h4 className="font-bold text-brand-text text-sm mb-1">الرد المعتاد خلال 24 ساعة</h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                يسعى فريق خدمة عملاء كبسولة تحول لتغطية وإجابة كافة البطاقات الواردة في غضون يوم عمل واحد.
              </p>
            </article>

            <article className="rounded-xl border border-brand-border bg-brand-light p-4">
              <h4 className="font-bold text-brand-text text-sm mb-1">الاستفسارات الأكاديمية</h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                إذا كان استفسارك يتعلق بمحتوى معسكر بناء المواقع أو دورات React، يُرجى التأكد من تضمين اسم الدورة.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
