import type { FormEvent } from "react";
import { PAYMENT_DATA } from "../../../mock";
import SharedCard from "../../../shared/components/SharedCard";

const INPUT_CLASS =
  "rounded-xl border border-brand-border bg-brand-white p-3 text-base text-brand-text transition outline-none focus:border-brand-main focus:ring-2 focus:ring-brand-main/40";

const { title, subtitle, fields, submitLabel, loadingLabel } = PAYMENT_DATA.form;

interface FormPaymentProps {
  cardNumber: string;
  setCardNumber: (value: string) => void;
  cardName: string;
  setCardName: (value: string) => void;
  expiry: string;
  setExpiry: (value: string) => void;
  cvv: string;
  setCvv: (value: string) => void;
  loading: boolean;
  error: string | null;
  successMessage: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  price: string;
}

function FormPayment({
  cardNumber, setCardNumber,
  cardName, setCardName,
  expiry, setExpiry,
  cvv, setCvv,
  loading, error, successMessage,
  handleSubmit,
  price,
}: FormPaymentProps) {
  return (
    <SharedCard
      title={title}
      subtitle={subtitle}
      headerGap="gap-2"
      headerBottom="mb-6"
      className="lg:col-span-7"
    >
      {error ? (
        <div className="mb-4 rounded-xl border border-rose-200 bg-rose-100 p-4 text-sm font-semibold text-rose-700">
          ⚠️ {error}
        </div>
      ) : null}

      {successMessage ? (
        <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-100 p-4 text-sm font-semibold text-emerald-700">
          {successMessage}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-brand-earth">{fields.cardName.label}</label>
          <input
            type="text"
            required
            placeholder={fields.cardName.placeholder}
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            className={INPUT_CLASS}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-brand-earth">{fields.cardNumber.label}</label>
          <input
            type="text"
            required
            maxLength={19}
            placeholder={fields.cardNumber.placeholder}
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className={INPUT_CLASS}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-brand-earth">{fields.expiry.label}</label>
            <input
              type="text"
              required
              maxLength={5}
              placeholder={fields.expiry.placeholder}
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-brand-earth">{fields.cvv.label}</label>
            <input
              type="password"
              required
              maxLength={3}
              placeholder={fields.cvv.placeholder}
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className={INPUT_CLASS}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 rounded-xl bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] py-3.5 text-lg font-bold text-white transition-all hover:opacity-95 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60"
        >
          {loading ? loadingLabel : `${submitLabel}${price ? ` — ${price}` : ""}`}
        </button>
      </form>
    </SharedCard>
  );
}

export default FormPayment;
