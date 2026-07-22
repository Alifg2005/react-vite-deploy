import SharedCard from "../../../shared/components/SharedCard";

/* بناء الأقسام ديناميكياً بناءً على بيانات النشاط */
function buildSections(activity) {
  const sections = [];

  sections.push({
    key: "overview",
    node: (
      <SharedCard title="نبذة عن النشاط">
        <p className="text-sm leading-7 text-brand-muted">{activity.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[activity.companyName, activity.category === "course" ? "دورة" : activity.category === "camp" ? "معسكر" : "مسابقة"].map((tag) => (
            <span key={tag} className="rounded-full bg-brand-white px-3 py-1 text-xs font-bold text-brand-text">
              {tag}
            </span>
          ))}
        </div>
      </SharedCard>
    ),
  });

  sections.push({
    key: "highlight",
    node: (
      <SharedCard title="ماذا ستحقق؟">
        <div className="flex items-start gap-3 rounded-xl border border-brand-border bg-brand-white p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-main text-white">✓</span>
          <div>
            <p className="text-sm font-bold text-brand-text">{activity.highlight}</p>
            <p className="text-xs text-brand-muted mt-1">نقطة بارزة في هذا النشاط</p>
          </div>
        </div>
      </SharedCard>
    ),
  });

  sections.push({
    key: "timeline",
    node: (
      <SharedCard title="الجدول الزمني">
        <div className="flex flex-col gap-3">
          {[
            { phase: "بدء النشاط", date: activity.dueDate },
            { phase: "المتابعة الأسبوعية", date: "أسبوعياً" },
            { phase: "التقييم النهائي", date: activity.dueDate },
          ].map((step) => (
            <div
              key={step.phase}
              className="flex items-center justify-between rounded-xl border border-brand-border bg-brand-white p-4"
            >
              <span className="text-sm font-bold text-brand-text">{step.phase}</span>
              <span className="text-sm text-brand-muted">{step.date}</span>
            </div>
          ))}
        </div>
      </SharedCard>
    ),
  });

  sections.push({
    key: "rules",
    node: (
      <SharedCard title="الشروط والأحكام">
        <ul className="flex flex-col gap-2">
          {[
            "الالتزام بمواعيد الجلسات والأنشطة المحددة.",
            "إتمام جميع المهام والتقييمات المطلوبة.",
            "الاحترام المتبادل بين المشاركين والمدربين.",
            "يُمنع التغيب دون إشعار مسبق.",
          ].map((rule) => (
            <li key={rule} className="flex items-start gap-2 text-sm text-brand-muted">
              <span className="mt-0.5 text-brand-main">•</span>
              {rule}
            </li>
          ))}
        </ul>
      </SharedCard>
    ),
  });

  return sections;
}

/* ─────────────────────────────────────────────
   ActivityDetailsPanel — نفس ستايل ProgramDetails
   لكن بدون زر التسجيل
───────────────────────────────────────────── */
function ActivityDetailsPanel({ activity, onBack }) {
  const categoryLabel =
    activity.category === "course"
      ? "دورة"
      : activity.category === "camp"
      ? "معسكر"
      : "مسابقة";

  const statusLabel =
    activity.status === "current"
      ? "قيد التنفيذ"
      : activity.status === "completed"
      ? "مكتمل"
      : "قيد المراجعة";

  const sections = buildSections(activity);

  return (
    <div className="flex flex-col gap-5" dir="rtl">
      {/* زر الرجوع */}
      <button
        type="button"
        onClick={onBack}
        className="w-fit rounded-full bg-brand-light px-4 py-1.5 text-sm font-bold text-brand-text hover:opacity-80 transition"
      >
        ← العودة إلى الأنشطة
      </button>

      {/* هيرو — نفس ستايل ProgramDetails */}
      <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white">
            {categoryLabel}
          </span>
          <span className="text-sm text-white/85">{activity.companyName}</span>
        </div>
        <h2 className="mb-2 text-3xl font-bold text-white md:text-4xl">{activity.title}</h2>
        <p className="mb-4 text-lg text-white/85">{activity.description}</p>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            activity.status === "current"
              ? "bg-emerald-100 text-emerald-700"
              : activity.status === "completed"
              ? "bg-brand-white/20 text-white"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {statusLabel}
        </span>
      </div>

      {/* المحتوى: أقسام + بطاقة جانبية */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* الأعمدة الرئيسية */}
        <div className="flex flex-col gap-5 lg:col-span-2">
          {sections.map(({ key, node }) => (
            <div key={key}>{node}</div>
          ))}
        </div>

        {/* البطاقة الجانبية — بدون زر التسجيل */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-brand-border bg-brand-white p-6 lg:sticky lg:top-6">
            {/* شريط التقدم */}
            <div className="mb-5">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-bold text-brand-text">نسبة الإنجاز</span>
                <span className="font-bold text-brand-main">{activity.progress}%</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-brand-light">
                <div
                  className="h-2.5 rounded-full bg-brand-main transition-all"
                  style={{ width: `${activity.progress}%` }}
                />
              </div>
            </div>

            {/* الحقائق */}
            <div className="flex flex-col gap-3">
              {[
                { label: "الجهة المنظمة", value: activity.companyName },
                { label: "تاريخ الانتهاء", value: activity.dueDate },
                { label: "عدد المشاركين", value: `${activity.participants} مشارك` },
                { label: "الفئة", value: categoryLabel },
                { label: "الحالة", value: statusLabel },
              ].map((fact) => (
                <div key={fact.label} className="flex items-center justify-between text-sm">
                  <span className="text-brand-muted">{fact.label}</span>
                  <span className="font-bold text-brand-text">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityDetailsPanel;
