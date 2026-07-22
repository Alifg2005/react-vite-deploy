import { useEffect, useRef, useState, type FormEvent } from "react";
import AdminIcon from "../../features/admin/components/AdminIcons";
import ProductCard from "../../features/courses/components/ProductCard";
import SharedCard from "./SharedCard";
import { useRole } from "../context/RoleContext";
import type { ProgramFormValues } from "../../context/ProgramsContext";
import { ADMIN_LABELS, type AdminProgram, type AdminProgramModule } from "../../mock";

export const PROGRAM_TYPE_OPTIONS = [
  { value: "course", label: ADMIN_LABELS.course },
  { value: "camp", label: ADMIN_LABELS.camp },
  { value: "competition", label: ADMIN_LABELS.competition },
];

export const EMPTY_FORM_VALUES: ProgramFormValues = {
  title: "", type: "course", provider: "", price: "", seats: "",
  description: "", about: "", outcomes: [], curriculum: [], startDate: "", endDate: "", introVideoUrl: "",
};

// Turns a start/end date pair into a human-readable duration ("6 أسابيع", "3 أيام").
export function formatDuration(startDate?: string, endDate?: string) {
  if (!startDate || !endDate) return null;
  const days = Math.round((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000);
  if (days <= 0) return null;
  if (days % 7 === 0) {
    const weeks = days / 7;
    return weeks === 1
      ? { ar: "أسبوع واحد", en: "1 week" }
      : { ar: `${weeks} أسابيع`, en: `${weeks} weeks` };
  }
  return days === 1 ? { ar: "يوم واحد", en: "1 day" } : { ar: `${days} أيام`, en: `${days} days` };
}

interface ComputeStatusInput {
  seats: string | number;
  registeredCount?: number;
  endDate?: string;
}

// Seats full → "مكتمل"، الفترة انتهت → "مغلق"، غير ذلك → "التسجيل مفتوح".
function computeProgramStatus({ seats, registeredCount, endDate }: ComputeStatusInput) {
  const numericSeats = Number(seats) || 0;
  const isFull = numericSeats > 0 && (registeredCount ?? 0) >= numericSeats;
  if (isFull) return "full";
  if (endDate && endDate < new Date().toISOString().slice(0, 10)) return "closed";
  return "open";
}

// Shapes the in-progress form state into the same object ProductCard expects,
// so admins preview a program exactly as students will see it in the catalogue.
function buildPreviewProduct(
  { title, type, provider, price, seats, description, image, startDate, endDate, registeredCount }: ProgramFormValues & { image: string | null; registeredCount?: number },
  t: (value: unknown) => string,
) {
  const numericPrice = Number(price) || 0;
  const numericSeats = Number(seats) || 0;
  const duration = formatDuration(startDate, endDate);

  return {
    id: "preview",
    type,
    title: title.trim() || t({ ar: "اسم البرنامج", en: "Program Name" }),
    provider: provider.trim() || t({ ar: "الجهة المقدمة", en: "Provider" }),
    image: image ?? null,
    tagline: description.trim(),
    pricing: { isFree: numericPrice === 0, price: numericPrice, currency: "ريال" },
    status: computeProgramStatus({ seats, registeredCount, endDate }),
    seats: { total: numericSeats, remaining: Math.max(numericSeats - (registeredCount ?? 0), 0) },
    rating: { average: 0, count: 0 },
    facts: duration ? [{ label: t({ ar: "المدة", en: "Duration" }), value: t(duration) }] : [],
  };
}

function isBlobUrl(url: unknown): url is string {
  return typeof url === "string" && url.startsWith("blob:");
}

interface ImageUploadFieldProps {
  imageUrl: string | null;
  onFileSelected: (file: File | undefined) => void;
  onClear: () => void;
}

function ImageUploadField({ imageUrl, onFileSelected, onClear }: ImageUploadFieldProps) {
  const { t } = useRole();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label className="mb-1.5 block text-sm font-bold text-brand-text">{t({ ar: "صورة البرنامج", en: "Program Image" })}</label>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => onFileSelected(event.target.files?.[0])}
      />

      {imageUrl ? (
        <div className="flex items-center gap-3 rounded-lg border border-brand-border bg-brand-white p-2">
          <img src={imageUrl} alt="" className="h-14 w-14 shrink-0 rounded-md object-cover" />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-xs font-bold text-brand-main hover:opacity-80"
          >
            {t({ ar: "تغيير الصورة", en: "Change Image" })}
          </button>
          <button type="button" onClick={onClear} className="ms-auto text-xs font-bold text-rose-600 hover:opacity-80">
            {t({ ar: "إزالة", en: "Remove" })}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full items-center gap-3 rounded-lg border border-dashed border-brand-border bg-brand-white px-4 py-3 text-start"
        >
          <AdminIcon name="upload" className="h-5 w-5 text-brand-muted" />
          <span className="text-xs text-brand-muted">{t({ ar: "اسحب صورة هنا أو اضغط للاختيار — يُفضّل صورة مربعة وواضحة.", en: "Drag an image here or click to choose — a clear square image is preferred." })}</span>
        </button>
      )}
    </div>
  );
}

interface OutcomesEditorProps {
  items: string[];
  onChange: (items: string[]) => void;
}

// "ماذا ستحقق" — a free-form list of skills/outcomes shown on the public
// program page's Outcomes section.
function OutcomesEditor({ items, onChange }: OutcomesEditorProps) {
  const { t } = useRole();

  return (
    <div>
      <label className="mb-1.5 block text-sm font-bold text-brand-text">{t({ ar: "ماذا ستحقق", en: "What You'll Achieve" })}</label>
      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              value={item}
              onChange={(event) => onChange(items.map((row, i) => (i === index ? event.target.value : row)))}
              placeholder={t({ ar: "مثال: بناء تطبيق ويب متكامل", en: "e.g. Build a complete web app" })}
              className="flex-1 rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
              className="shrink-0 rounded-lg bg-rose-100 p-2.5 text-rose-600 transition hover:bg-rose-200"
            >
              <AdminIcon name="trash" className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="mt-2 flex items-center gap-1 text-xs font-bold text-brand-main hover:opacity-80"
      >
        <AdminIcon name="plus" className="h-3.5 w-3.5" />
        {t({ ar: "إضافة مهارة", en: "Add Skill" })}
      </button>
    </div>
  );
}

interface CurriculumEditorProps {
  items: AdminProgramModule[];
  onChange: (items: AdminProgramModule[]) => void;
}

// "محتوى الدورة" — an ordered list of modules (title + short meta line),
// each with its own nested list of lessons, shown on the public program
// page's Curriculum section.
function CurriculumEditor({ items, onChange }: CurriculumEditorProps) {
  const { t } = useRole();

  function updateItem(index: number, field: "title" | "meta", value: string) {
    onChange(items.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  }

  function updateLessons(index: number, lessons: string[]) {
    onChange(items.map((row, i) => (i === index ? { ...row, lessons } : row)));
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-bold text-brand-text">{t({ ar: "محتوى الدورة", en: "Course Content" })}</label>
      <div className="flex flex-col gap-3">
        {items.map((item, index) => {
          const lessons = item.lessons ?? [];
          return (
            <div key={index} className="rounded-lg border border-brand-border bg-brand-light p-3">
              <div className="flex items-center gap-2">
                <input
                  value={item.title}
                  onChange={(event) => updateItem(index, "title", event.target.value)}
                  placeholder={t({ ar: "عنوان الوحدة", en: "Module title" })}
                  className="flex-1 rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
                />
                <input
                  value={item.meta}
                  onChange={(event) => updateItem(index, "meta", event.target.value)}
                  placeholder={t({ ar: "مثال: 5 دروس • ساعتان", en: "e.g. 5 lessons • 2 hours" })}
                  className="flex-1 rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
                />
                <button
                  type="button"
                  onClick={() => onChange(items.filter((_, i) => i !== index))}
                  className="shrink-0 rounded-lg bg-rose-100 p-2.5 text-rose-600 transition hover:bg-rose-200"
                >
                  <AdminIcon name="trash" className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-2 flex flex-col gap-1.5 ps-4">
                {lessons.map((lesson, lessonIndex) => (
                  <div key={lessonIndex} className="flex items-center gap-2">
                    <span className="text-brand-muted">–</span>
                    <input
                      value={lesson}
                      onChange={(event) =>
                        updateLessons(index, lessons.map((row, i) => (i === lessonIndex ? event.target.value : row)))
                      }
                      placeholder={t({ ar: "عنوان الدرس", en: "Lesson title" })}
                      className="flex-1 rounded-lg border border-brand-border bg-brand-white px-3 py-2 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => updateLessons(index, lessons.filter((_, i) => i !== lessonIndex))}
                      className="shrink-0 rounded-lg bg-rose-100 p-1.5 text-rose-600 transition hover:bg-rose-200"
                    >
                      <AdminIcon name="trash" className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => updateLessons(index, [...lessons, ""])}
                  className="mt-1 flex w-fit items-center gap-1 text-xs font-bold text-brand-main hover:opacity-80"
                >
                  <AdminIcon name="plus" className="h-3 w-3" />
                  {t({ ar: "إضافة درس", en: "Add Lesson" })}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => onChange([...items, { title: "", meta: "", lessons: [] }])}
        className="mt-2 flex items-center gap-1 text-xs font-bold text-brand-main hover:opacity-80"
      >
        <AdminIcon name="plus" className="h-3.5 w-3.5" />
        {t({ ar: "إضافة وحدة", en: "Add Module" })}
      </button>
    </div>
  );
}

export interface ProgramFormPanelProps {
  mode: "add" | "edit";
  initialProgram: AdminProgram | null | undefined;
  onCancel: () => void;
  onSubmit: (values: ProgramFormValues & { image: string | null }) => void;
}

export default function ProgramFormPanel({ mode, initialProgram, onCancel, onSubmit }: ProgramFormPanelProps) {
  const { t } = useRole();
  const isEdit = mode === "edit";
  const [values, setValues] = useState<ProgramFormValues>(() =>
    initialProgram
      ? {
          title: initialProgram.title,
          type: initialProgram.type,
          provider: initialProgram.submittedBy,
          price: initialProgram.price ?? "",
          seats: initialProgram.seats ?? "",
          description: initialProgram.description ?? "",
          about: initialProgram.about ?? "",
          outcomes: initialProgram.outcomes ?? [],
          curriculum: initialProgram.curriculum ?? [],
          startDate: initialProgram.startDate ?? "",
          endDate: initialProgram.endDate ?? "",
          introVideoUrl: initialProgram.introVideoUrl ?? "",
        }
      : EMPTY_FORM_VALUES
  );
  const [imageUrl, setImageUrl] = useState<string | null>(initialProgram?.image ?? null);

  // Revoke any object URL we created for a locally-picked file once it's
  // replaced or the panel closes, so we don't leak blob references.
  useEffect(() => {
    return () => {
      if (isBlobUrl(imageUrl)) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  function updateField<K extends keyof ProgramFormValues>(field: K, value: ProgramFormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleFileSelected(file: File | undefined) {
    if (!file) return;
    if (isBlobUrl(imageUrl)) URL.revokeObjectURL(imageUrl);
    setImageUrl(URL.createObjectURL(file));
  }

  function handleClearImage() {
    if (isBlobUrl(imageUrl)) URL.revokeObjectURL(imageUrl);
    setImageUrl(null);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!values.title.trim()) return;
    onSubmit({ ...values, image: imageUrl });
  }

  const duration = formatDuration(values.startDate, values.endDate);
  const previewProduct = buildPreviewProduct({ ...values, image: imageUrl, registeredCount: initialProgram?.registeredCount ?? 0 }, t);

  return (
    <SharedCard
      title={isEdit ? t({ ar: "تعديل البرنامج", en: "Edit Program" }) : t({ ar: "إضافة برنامج جديد", en: "Add New Program" })}
      subtitle={
        isEdit
          ? t({ ar: "حدّث بيانات البرنامج ثم احفظ التغييرات.", en: "Update the program details, then save your changes." })
          : t({ ar: "عبّئ بيانات البرنامج ثم احفظه ليظهر في قائمة البرامج.", en: "Fill in the program details, then save it to show it in the program list." })
      }
    >
      <div className="grid items-start gap-6 lg:grid-cols-[7fr_6fr]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isEdit ? (
            <div>
              <label className="mb-1.5 block text-sm font-bold text-brand-text">{t({ ar: "رقم البرنامج", en: "Program ID" })}</label>
              <input
                value={initialProgram?.id ?? ""}
                readOnly
                className="w-full rounded-lg border border-brand-border bg-brand-light px-4 py-2.5 text-sm text-brand-muted"
              />
            </div>
          ) : null}

          <div>
            <label className="mb-1.5 block text-sm font-bold text-brand-text">{t({ ar: "اسم البرنامج", en: "Program Name" })}</label>
            <input
              value={values.title}
              onChange={(event) => updateField("title", event.target.value)}
              placeholder={t({ ar: "مثال: دورة تصميم واجهات المستخدم", en: "e.g. UI Design Course" })}
              className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
              autoFocus
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-bold text-brand-text">{t({ ar: "نوع البرنامج", en: "Program Type" })}</label>
              <select
                value={values.type}
                onChange={(event) => updateField("type", event.target.value)}
                className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
              >
                {PROGRAM_TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{t(option.label)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-bold text-brand-text">{t({ ar: "الجهة المقدمة", en: "Provider" })}</label>
              <input
                value={values.provider}
                onChange={(event) => updateField("provider", event.target.value)}
                placeholder={t({ ar: "اسم الجهة أو المدرب", en: "Provider or trainer name" })}
                className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-bold text-brand-text">{t({ ar: "السعر (ريال)", en: "Price (SAR)" })}</label>
              <input
                type="number"
                min="0"
                value={values.price}
                onChange={(event) => updateField("price", event.target.value)}
                placeholder={t({ ar: "مثال: 299", en: "e.g. 299" })}
                className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-bold text-brand-text">{t({ ar: "عدد المقاعد", en: "Number of Seats" })}</label>
              <input
                type="number"
                min="0"
                value={values.seats}
                onChange={(event) => updateField("seats", event.target.value)}
                placeholder={t({ ar: "مثال: 30", en: "e.g. 30" })}
                className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-bold text-brand-text">{t({ ar: "تاريخ البداية", en: "Start Date" })}</label>
              <input
                type="date"
                value={values.startDate}
                onChange={(event) => updateField("startDate", event.target.value)}
                className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-bold text-brand-text">{t({ ar: "تاريخ النهاية", en: "End Date" })}</label>
              <input
                type="date"
                value={values.endDate}
                min={values.startDate || undefined}
                onChange={(event) => updateField("endDate", event.target.value)}
                className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
              />
            </div>
          </div>
          <p className="-mt-2 text-xs text-brand-muted">
            {duration
              ? t({ ar: `المدة: ${t(duration)}`, en: `Duration: ${t(duration)}` })
              : t({ ar: "أدخل تاريخ البداية والنهاية لحساب مدة البرنامج تلقائياً.", en: "Enter a start and end date to calculate the program duration automatically." })}
          </p>

          <div>
            <label className="mb-1.5 block text-sm font-bold text-brand-text">{t({ ar: "الوصف المختصر", en: "Short Description" })}</label>
            <textarea
              value={values.description}
              onChange={(event) => updateField("description", event.target.value)}
              rows={2}
              placeholder={t({ ar: "جملة مختصرة تظهر في بطاقة البرنامج...", en: "A short line shown on the program card..." })}
              className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-bold text-brand-text">{t({ ar: "نبذة عن البرنامج", en: "About the Program" })}</label>
            <textarea
              value={values.about}
              onChange={(event) => updateField("about", event.target.value)}
              rows={4}
              placeholder={t({ ar: "اكتب نبذة تفصيلية عن البرنامج تظهر في صفحة البرنامج العامة...", en: "Write a detailed write-up shown on the public program page..." })}
              className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-bold text-brand-text">{t({ ar: "المقطع التعريفي (رابط فيديو)", en: "Intro Clip (video link)" })}</label>
            <input
              dir="ltr"
              value={values.introVideoUrl}
              onChange={(event) => updateField("introVideoUrl", event.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
            />
            <p className="mt-1 text-xs text-brand-muted">
              {t({ ar: "رابط فيديو قصير يعرّف بالبرنامج، يظهر في صفحة البرنامج العامة.", en: "A short video link introducing the program, shown on the public program page." })}
            </p>
          </div>

          <OutcomesEditor items={values.outcomes} onChange={(items) => updateField("outcomes", items)} />

          <CurriculumEditor items={values.curriculum} onChange={(items) => updateField("curriculum", items)} />

          <ImageUploadField imageUrl={imageUrl} onFileSelected={handleFileSelected} onClear={handleClearImage} />

          <div className="flex gap-2">
            <button type="submit" className="rounded-lg bg-brand-main px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90">
              {isEdit ? t({ ar: "تحديث البرنامج", en: "Update Program" }) : t({ ar: "حفظ البرنامج", en: "Save Program" })}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-brand-border bg-brand-white px-5 py-2.5 text-sm font-bold text-brand-text transition hover:bg-brand-light"
            >
              {t({ ar: "إلغاء", en: "Cancel" })}
            </button>
          </div>
        </form>

        <SharedCard title={t({ ar: "معاينة البرنامج", en: "Program Preview" })} className="lg:sticky lg:top-6 lg:self-start">
          <div className="pointer-events-none mx-auto w-full max-w-sm">
            <ProductCard product={previewProduct} showRating={false} />
          </div>
        </SharedCard>
      </div>
    </SharedCard>
  );
}
