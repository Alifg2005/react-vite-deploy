import React from "react";

// Main Banner component for the payment page
export default function BannerPayment({ programTitle }) {
  return (
    /* Banner container with gradient background, themed border */
    <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white shadow-md">

      {/* Main page heading */}
      <h2 className="text-3xl font-bold text-white mb-2">
        إتمام الحجز والدفع الإلكتروني
      </h2>

      {/* Subtitle describing the purpose */}
      <p className="text-base text-white/85">
        بوابة الدفع التجريبية الخاصة بمبادرة كبسولة تحول (بيئة محاكاة تفاعلية للأسبوع الأول)
      </p>

      {/* Which program this payment belongs to */}
      {programTitle ? (
        <p className="mt-4 flex items-center gap-2 text-sm font-bold text-white/90">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white">
            البرنامج
          </span>
          {programTitle}
        </p>
      ) : null}

    </div>
  );
}