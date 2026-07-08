import React from "react";
import SharedCard from "./SharedCard";

// Payment form component handling user input and states
export default function FormPayment({
  cardNumber, setCardNumber,
  cardName, setCardName,
  expiry, setExpiry,
  cvv, setCvv,
  loading, error, successMessage, handleSubmit, price
}) {
  return (
    <SharedCard
      title="معلومات بطاقة الدفع"
      subtitle="جميع البيانات يتم التحقق منها عبر الدالات غير المتزامنة لضمان محاكاة تأخير الشبكة."
      className="shadow-sm lg:col-span-7"
    >
      {/* Conditionally rendered feedback messages */}
      {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">⚠️ {error}</div>}
      {successMessage && <div className="mb-4 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">{successMessage}</div>}

      {/* Main interactive form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* Cardholder Name input field */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-[#164961]">اسم حامل البطاقة</label>
          <input type="text" required placeholder="Arwa Alherz" value={cardName} onChange={(e) => setCardName(e.target.value)} className="rounded-xl border border-[#C9D6DF] bg-[#F0F5F9] p-3 text-base text-[#343A60] transition outline-none focus:border-[#387B84] focus:bg-white" />
        </div>

        {/* Card Number input field */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-[#164961]">رقم البطاقة</label>
          <input type="text" required maxLength="19" placeholder="4000 1234 5678 9010" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="rounded-xl border border-[#C9D6DF] bg-[#F0F5F9] p-3 text-base text-[#343A60] transition outline-none focus:border-[#387B84] focus:bg-white" />
        </div>

        {/* Expiry Date and CVV grid inputs */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Expiry Date input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#164961]">تاريخ الانتهاء</label>
            <input type="text" required maxLength="5" placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} className="rounded-xl border border-[#C9D6DF] bg-[#F0F5F9] p-3 text-base text-[#343A60] transition outline-none focus:border-[#387B84] focus:bg-white" />
          </div>
          
          {/* CVV input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#164961]">الرمز السري (CVV)</label>
            <input type="password" required maxLength="3" placeholder="***" value={cvv} onChange={(e) => setCvv(e.target.value)} className="rounded-xl border border-[#C9D6DF] bg-[#F0F5F9] p-3 text-base text-[#343A60] transition outline-none focus:border-[#387B84] focus:bg-white" />
          </div>

        </div>

        {/* Dynamic submit action button */}
        <button type="submit" disabled={loading} className="mt-4 rounded-xl bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] py-3.5 text-lg font-bold text-white transition-all hover:opacity-95 active:scale-[0.99] disabled:opacity-60 disabled:pointer-events-none">
          {loading ? "جاري الاتصال والتحقق بالشبكة..." : `تأكيد وحجز المقعد `}
        </button>

      </form>
    </SharedCard>
  );
}