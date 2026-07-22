import { useState } from "react";
import SharedCard from "../../../shared/components/SharedCard";
import { PROGRAM_DETAILS_DATA } from "../../../mock";
import type { Product } from "../../../mock";

const { capabilityForm: FORM_DATA } = PROGRAM_DETAILS_DATA;

interface CapabilityFormProps {
  product: Product;
  onClose: () => void;
}

function CapabilityForm({ product, onClose }: CapabilityFormProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!product.capabilityForm) return null;

  function updateAnswer(index: number, value: string) {
    setAnswers((current) => ({ ...current, [index]: value }));
  }

  if (submitted) {
    return (
      <SharedCard title={FORM_DATA.successTitle}>
        <p className="text-sm text-brand-muted">{FORM_DATA.successMessage}</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 rounded-lg bg-brand-main px-4 py-2 text-sm font-bold text-white hover:opacity-90"
        >
          {FORM_DATA.closeLabel}
        </button>
      </SharedCard>
    );
  }

  return (
    <SharedCard title={FORM_DATA.title}>
      <p className="mb-4 text-sm text-brand-muted">{product.capabilityForm.note}</p>
      <div className="flex flex-col gap-4">
        {product.capabilityForm.questions.map((question, index) => (
          <div key={question} className="flex flex-col gap-2">
            <label className="text-sm font-bold text-brand-text">{question}</label>
            <textarea
              rows={2}
              value={answers[index] ?? ""}
              onChange={(e) => updateAnswer(index, e.target.value)}
              className="rounded-lg border border-brand-border bg-brand-white px-3 py-2 text-sm"
              placeholder={FORM_DATA.placeholder}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="rounded-lg bg-brand-main px-4 py-2 text-sm font-bold text-white hover:opacity-90"
        >
          {FORM_DATA.submitLabel}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-brand-border px-4 py-2 text-sm font-bold text-brand-text hover:bg-brand-white"
        >
          {FORM_DATA.cancelLabel}
        </button>
      </div>
    </SharedCard>
  );
}

export default CapabilityForm;
