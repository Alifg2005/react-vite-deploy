import React from "react";
import SharedCard from "./SharedCard";

// Order summary component displaying course details and pricing
export default function SummaryPayment({ title, price, badge, note }) {
  return (
    <SharedCard title="ملخص حجز المقعد" className="flex h-full flex-col shadow-sm lg:col-span-5">
      {/* Course card preview details */}
      <article className="rounded-xl border border-[#C9D6DF] bg-[#F0F5F9] p-4">
        <span className="mb-1 inline-block rounded-full bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] px-3 py-1 text-xs font-bold text-white">{badge}</span>
        <h4 className="mt-2 text-lg font-bold text-[#343A60]">{title}</h4>
        <p className="mt-1 text-xs text-[#706F6F]">{note}</p>
      </article>

      {/* Lower section: Breakdown invoice and total prices — pinned to the bottom */}
      <div className="mt-auto border-t border-[#C9D6DF] pt-4">
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
    </SharedCard>
  );
}
