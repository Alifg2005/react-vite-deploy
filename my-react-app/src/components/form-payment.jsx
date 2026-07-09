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
      className=" lg:col-span-7"
    >
      {/* Conditionally rendered feedback messages */}
      {error && (
        <div className="mb-4 rounded-xl border border-rose-200 bg-rose-100 p-4 text-sm font-semibold text-rose-700">
          ⚠️ {error}
        </div>
      )}
      {successMessage && (
        <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-100 p-4 text-sm font-semibold text-emerald-700">
          {successMessage}
        </div>
      )}

      {/* Main interactive form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Cardholder Name input field */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-brand-earth">اسم حامل البطاقة</label>
          <input
            type="text" required placeholder="Arwa Alherz"
            value={cardName} onChange={(e) => setCardName(e.target.value)}
            className="rounded-xl border border-brand-border bg-brand-white p-3 text-base text-brand-text transition outline-none focus:border-brand-main focus:ring-2 focus:ring-brand-main/40"
          />
        </div>

        {/* Card Number input field */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-brand-earth">رقم البطاقة</label>
          <input
            type="text" required maxLength="19" placeholder="4000 1234 5678 9010"
            value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}
            className="rounded-xl border border-brand-border bg-brand-white p-3 text-base text-brand-text transition outline-none focus:border-brand-main focus:ring-2 focus:ring-brand-main/40"
          />
        </div>

        {/* Expiry Date and CVV grid inputs */}
        <div className="grid grid-cols-2 gap-4">

          {/* Expiry Date input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-brand-earth">تاريخ الانتهاء</label>
            <input
              type="text" required maxLength="5" placeholder="MM/YY"
              value={expiry} onChange={(e) => setExpiry(e.target.value)}
              className="rounded-xl border border-brand-border bg-brand-white p-3 text-base text-brand-text transition outline-none focus:border-brand-main focus:ring-2 focus:ring-brand-main/40"
            />
          </div>

          {/* CVV input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-brand-earth">الرمز السري (CVV)</label>
            <input
              type="password" required maxLength="3" placeholder="***"
              value={cvv} onChange={(e) => setCvv(e.target.value)}
              className="rounded-xl border border-brand-border bg-brand-white p-3 text-base text-brand-text transition outline-none focus:border-brand-main focus:ring-2 focus:ring-brand-main/40"
            />
          </div>

        </div>

        {/* Dynamic submit action button, now shows the actual price */}
        <button
          type="submit" disabled={loading}
          className="mt-4 rounded-xl bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] py-3.5 text-lg font-bold text-white transition-all hover:opacity-95 active:scale-[0.99] disabled:opacity-60 disabled:pointer-events-none"
        >
          {loading ? "جاري الاتصال والتحقق بالشبكة..." : `تأكيد الدفع${price ? ` — ${price}` : ""}`}
        </button>

      </form>
    </SharedCard>
  );
}