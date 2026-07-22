import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface PromoData {
  alt: string;
  ctaLabel: string;
  ctaPath: string;
}

interface PromoPopupProps {
  promo: PromoData;
  image: string;
}

function PromoPopup({ promo, image }: PromoPopupProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="relative flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-brand-white shadow-xl animate-[popup-in_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="إغلاق"
          className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
        >
          ✕
        </button>

        <div className="overflow-y-auto">
          <img src={image} alt={promo.alt} className="w-full" />
        </div>

        <div className="flex gap-3 p-4">
          <button
            type="button"
            className="flex-1 rounded-full bg-brand-main px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
            onClick={() => {
              setOpen(false);
              navigate(promo.ctaPath);
            }}
          >
            {promo.ctaLabel}
          </button>
          <button
            type="button"
            className="rounded-full border border-brand-border px-5 py-2.5 text-sm font-bold text-brand-text transition hover:bg-brand-light"
            onClick={() => setOpen(false)}
          >
            لاحقًا
          </button>
        </div>
      </div>
    </div>
  );
}

export default PromoPopup;
