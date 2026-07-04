import React from "react";

// Order summary component displaying course details and pricing
export default function SummaryPayment({ title, price, badge, note }) {
  return (
    /* Sidebar summary container wrapper */
    <div className="flex flex-col justify-between rounded-2xl border border-[#C9D6DF] bg-white p-6 shadow-sm lg:col-span-5">
      
      {/* Upper section: Course details information */}
      <div>
        <h3 className="mb-4 text-xl font-bold text-[#164961]">ملخص حجز المقعد</h3>
        
        {/* Course card preview details */}
        <article className="rounded-xl border border-[#C9D6DF] bg-[#F0F5F9] p-4">
          <span className="mb-1 inline-block rounded-full bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] px-3 py-1 text-xs font-bold text-white">{badge}</span>
          <h4 className="mt-2 text-lg font-bold text-[#343A60]">{title}</h4>
          <p className="mt-1 text-xs text-[#706F6F]">{note}</p>
        </article>
      </div>
      
      {/* Lower section: Breakdown invoice and total prices */}
      <div className="mt-6 border-t border-[#C9D6DF] pt-4">
        
        {/* Base course tuition breakdown item */}
        <div className="flex items-center justify-between text-base text-[#706F6F] mb-2">
          <span>الرسوم الدراسية للمسار</span>
          <span className="font-semibold text-[#343A60]">{price}</span>
        </div>
        
        <hr className="my-2 border-[#C9D6DF] border-dashed" />
        
        {/* Grand final total billing amount */}
        <div className="flex items-center justify-between text-xl font-bold text-[#343A60]">
          <span>المجموع الكلي</span>
          <span className="text-2xl font-bold text-[#164961]">{price}</span>
        </div>

      </div>
    </div>
  );
}