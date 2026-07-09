import React, { useState } from "react";
import { useParams } from "react-router-dom";
import BannerPayment from "../components/banner-payment";
import FormPayment from "../components/form-payment";
import SummaryPayment from "../components/summary-payment";
import { PRODUCTS, PRODUCT_TYPE_LABELS } from "../data/productData";

// Main orchestrator component for the simulated payment flow
export default function PaymentPage() {
  // Route param → the program this payment is for
  const { id } = useParams();
  const product = PRODUCTS[id];

  // State management for raw credit card input elements
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // Status and network simulation feedback states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Asynchronous API call simulation function
  const submitMockPayment = async (data) => {
    return { success: true, message: "تمت المحاكاة بنجاح!" };
  };

  // Real "not found" state — same pattern as ProgramDetails.jsx
  if (!product) {
    return (
      <section
        className="mx-auto flex max-w-2xl flex-col items-center gap-3 py-20 text-center"
        dir="rtl"
      >
        <h2 className="text-2xl font-bold text-brand-text">لم يتم العثور على البرنامج</h2>
        <p className="text-sm text-brand-muted">
          تحقق من الرابط، أو تصفّح البرامج المتاحة من صفحة البرامج.
        </p>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="mt-2 rounded-lg bg-brand-main px-4 py-2 text-sm font-bold text-white hover:opacity-90"
        >
          العودة
        </button>
      </section>
    );
  }

  // Price/badge derived from the actual product, same formatting as ActionCard in ProgramDetails.jsx
  const priceLabel = product.pricing.isFree
    ? "مجاني"
    : `${product.pricing.price.toLocaleString("en-US")} ${product.pricing.currency}`;

  const currentProgram = {
    title: product.title,
    price: priceLabel,
    badge: PRODUCT_TYPE_LABELS[product.type],
    note: "الوصول والمتابعة فوري بعد تأكيد الدفع المحاكي",
  };

  // Form submission orchestrator with handling blocks
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      // Executing the fake payment verification process
      const response = await submitMockPayment({ cardNumber, cardName, expiry, cvv });
      if (response.success) {
        setSuccessMessage(response.message);
        // Clearing inputs upon successful submission
        setCardNumber(""); setCardName(""); setExpiry(""); setCvv("");
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError("حدث خطأ غير متوقع أثناء الاتصال بالخادم المحاكي.");
    } finally {
      setLoading(false);
    }
  };

  return (
    /* Page main outer structural grid layout container wrapper */
    <section className="mx-auto max-w-7xl flex flex-col gap-6 p-6 md:p-8" dir="rtl">

      {/* 1. Renders the top graphical informative banner, now aware of the program */}
      <BannerPayment programTitle={currentProgram.title} />

      {/* Main functional split layout section grid wrapper */}
      <div className="grid gap-6 lg:grid-cols-12">

        {/* 2. Form interface panel forwarding state references */}
        <FormPayment
          cardNumber={cardNumber} setCardNumber={setCardNumber}
          cardName={cardName} setCardName={setCardName}
          expiry={expiry} setExpiry={setExpiry}
          cvv={cvv} setCvv={setCvv}
          loading={loading} error={error} successMessage={successMessage}
          handleSubmit={handlePaymentSubmit}
          price={currentProgram.price}
        />

        {/* 3. Invoice price presentation module panel */}
        <SummaryPayment
          title={currentProgram.title}
          price={currentProgram.price}
          badge={currentProgram.badge}
          note={currentProgram.note}
        />

      </div>
    </section>
  );
}