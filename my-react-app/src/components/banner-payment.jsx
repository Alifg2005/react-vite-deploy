import React from "react";

// Main Banner component for the payment page
export default function BannerPayment() {
  return (
    /* Banner container with gradient background and custom styling */
    <div className="rounded-2xl border border-[#C9D6DF] bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white shadow-md">
      
      {/* Main page heading */}
      <h2 className="text-3xl font-bold text-white mb-2">
        إتمام الحجز والدفع الإلكتروني
      </h2>
      
      {/* Subtitle describing the purpose */}
      <p className="text-base text-white/85">
        بوابة الدفع التجريبية الخاصة بمبادرة كبسولة تحول (بيئة محاكاة تفاعلية للأسبوع الأول)
      </p>

    </div>
  );
}