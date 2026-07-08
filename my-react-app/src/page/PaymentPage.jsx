import React, { useState } from "react";
import BannerPayment from "../components/banner-payment";
import FormPayment from "../components/form-payment";
import SummaryPayment from "../components/summary-payment";

// Main orchestrator component for the simulated payment flow
export default function PaymentPage() {
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
  
  // Mock data representing the selected educational path
  const currentProgram = {
    title: "معسكر هندسة البرمجيات المتكاملة 2026",
    price: "2999 ر.س",
    badge: "المعسكرات الحالية",
    note: "الوصول والمتابعة فوري بعد تأكيد الدفع المحاكي"
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
     
      {/* 1. Renders the top graphical informative banner */}
      <BannerPayment />

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