import { useEffect, useRef, useState, type FormEvent } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AdminIcon from "../components/AdminIcons";
import AdminSidebar from "../components/AdminSidebar";
import SharedCard from "../../../shared/components/SharedCard";
import GradientBanner from "../../../shared/components/GradientBanner";
import { useRole } from "../../../shared/context/RoleContext";
import { useNewsEvents, type NewsEventFormValues } from "../../../context/NewsEventsContext";
import { NEWS_EVENT_TYPE_OPTIONS, NEWS_EVENT_EDITOR_TYPE_TONES } from "../../../mock";
import { adminTranslations } from "../../../mock";

function isBlobUrl(url: unknown): url is string {
  return typeof url === "string" && url.startsWith("blob:");
}

function NewsEventEditor() {
  const { role, t } = useRole();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { items, addItem, updateItem } = useNewsEvents();
  const inputRef = useRef<HTMLInputElement>(null);

  const isEdit = Boolean(id);
  const existing = isEdit ? items.find((item) => item.id === id) : null;

  const [title, setTitle] = useState(existing ? t(existing.title) : "");
  const [type, setType] = useState<"news" | "event">(existing?.type ?? "news");
  const [date, setDate] = useState(existing?.date ?? "");
  const [excerpt, setExcerpt] = useState(existing ? t(existing.excerpt) : "");
  const [imageUrl, setImageUrl] = useState<string | null>(existing?.image ?? null);

  useEffect(() => {
    return () => {
      if (isBlobUrl(imageUrl)) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  if (role !== "admin") return <Navigate to="/dashboard" replace />;
  if (isEdit && !existing) return <Navigate to="/admin/news-events" replace />;

  function handleFileSelected(file: File | undefined) {
    if (!file) return;
    if (isBlobUrl(imageUrl)) URL.revokeObjectURL(imageUrl);
    setImageUrl(URL.createObjectURL(file));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!title.trim() || !date) return;

    const values: NewsEventFormValues = { title, type, date, excerpt, image: imageUrl };
    if (isEdit && existing) updateItem(existing.id, values);
    else addItem(values);

    navigate("/admin/news-events");
  }

  return (
    <div className="admin-scale flex flex-col gap-5 md:flex-row md:items-start">
      <AdminSidebar />

      <section className="flex min-w-0 flex-1 flex-col gap-5">
        <GradientBanner
          title={isEdit ? t(adminTranslations.newsEvents.editTitle) : t(adminTranslations.newsEvents.addTitle)}
          subtitle={t(adminTranslations.newsEvents.editorSubtitle)}
        />

        <SharedCard>
          <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-2">
            {/* Right side (first in RTL DOM order): tall image box, click to add an image.
                Title/date/type overlay directly on it as a live poster preview. */}
            <div>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => handleFileSelected(event.target.files?.[0])}
              />
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="relative flex h-112 w-full flex-col justify-between overflow-hidden rounded-2xl border-2 border-dashed border-brand-border bg-brand-light text-start"
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-brand-muted">
                    <AdminIcon name="image" className="h-10 w-10" />
                    <span className="text-sm font-bold">{t(adminTranslations.newsEvents.clickToAddImage)}</span>
                  </span>
                )}
                <span className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-black/50" />

                <span className="relative z-10 flex items-start justify-between p-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold text-white ${NEWS_EVENT_EDITOR_TYPE_TONES[type]}`}>
                    {t(NEWS_EVENT_TYPE_OPTIONS.find((option) => option.value === type)!.label)}
                  </span>
                </span>

                <span className="relative z-10 flex flex-col gap-2 p-4">
                  <span className="text-xl font-bold text-white drop-shadow-md">
                    {title || t(adminTranslations.newsEvents.titlePlaceholderPreview)}
                  </span>
                  <span className="w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                    {date || t(adminTranslations.common.date)}
                  </span>
                </span>
              </button>
              {imageUrl ? (
                <button
                  type="button"
                  onClick={() => setImageUrl(null)}
                  className="mt-2 text-xs font-bold text-rose-600 hover:opacity-80"
                >
                  {t(adminTranslations.newsEvents.removeImage)}
                </button>
              ) : null}
            </div>

            {/* Left side: the actual form fields feeding the preview. */}
            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-bold text-brand-text">{t(adminTranslations.newsEvents.nameLabel)}</label>
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder={t(adminTranslations.newsEvents.namePlaceholder)}
                  className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
                  autoFocus
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-brand-text">{t(adminTranslations.common.date)}</label>
                <input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-brand-text">{t(adminTranslations.newsEvents.typeLabel)}</label>
                <select
                  value={type}
                  onChange={(event) => setType(event.target.value as "news" | "event")}
                  className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
                >
                  {NEWS_EVENT_TYPE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{t(option.label)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-brand-text">{t(adminTranslations.newsEvents.excerptLabel)}</label>
                <textarea
                  value={excerpt}
                  onChange={(event) => setExcerpt(event.target.value)}
                  rows={4}
                  placeholder={t(adminTranslations.newsEvents.excerptPlaceholder)}
                  className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
                />
              </div>

              <div className="mt-auto flex gap-2">
                <button type="submit" className="rounded-lg bg-brand-main px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90">
                  {isEdit ? t(adminTranslations.common.saveChanges) : t(adminTranslations.common.save)}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/admin/news-events")}
                  className="rounded-lg border border-brand-border bg-brand-white px-5 py-2.5 text-sm font-bold text-brand-text transition hover:bg-brand-light"
                >
                  {t(adminTranslations.common.cancel)}
                </button>
              </div>
            </div>
          </form>
        </SharedCard>
      </section>
    </div>
  );
}

export default NewsEventEditor;
