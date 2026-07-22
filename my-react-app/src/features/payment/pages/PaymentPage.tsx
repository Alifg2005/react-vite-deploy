// react
import { useState } from "react";
import { useParams } from "react-router-dom";

// mock data
import { PRODUCTS, PRODUCT_TYPE_LABELS, PAYMENT_DATA } from "../../../mock";

// payment page components
import BannerPayment from "../components/BannerPayment";
import FormPayment from "../components/FormPayment";
import SummaryPayment from "../components/SummaryPayment";

interface CardForm {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
}

const EMPTY_CARD_FORM: CardForm = {
  cardNumber: "",
  cardName: "",
  expiry: "",
  cvv: "",
};


interface MockPaymentResponse { success: boolean; message?: string; error?: string; }
async function submitMockPayment(cardForm: CardForm): Promise<MockPaymentResponse> {
  return { success: true, message: PAYMENT_DATA.form.mockSuccessMessage };
}

function buildProgramSummary(product: { pricing: { isFree: any; price: { toLocaleString: (arg0: string) => any; }; currency: any; }; title: any; type: string | number; }) {
  const priceLabel = product.pricing.isFree
    ? PAYMENT_DATA.program.freePriceLabel
    : `${product.pricing.price.toLocaleString("en-US")} ${product.pricing.currency}`;

  return {
    title: product.title,
    price: priceLabel,
    badge: PRODUCT_TYPE_LABELS[product.type as keyof typeof PRODUCT_TYPE_LABELS],
    note: PAYMENT_DATA.program.note,
  };
}

function NotFoundMessage() {
  const { title, description, backLabel } = PAYMENT_DATA.notFound;

  return (
    <section
      className="mx-auto flex max-w-2xl flex-col items-center gap-3 py-20 text-center"
      dir="rtl"
    >
      <h2 className="text-2xl font-bold text-brand-text">{title}</h2>
      <p className="text-sm text-brand-muted">{description}</p>
      <button
        type="button"
        onClick={() => window.history.back()}
        className="mt-2 rounded-lg bg-brand-main px-4 py-2 text-sm font-bold text-white hover:opacity-90"
      >
        {backLabel}
      </button>
    </section>
  );
}

export default function PaymentPage() {
  const { id } = useParams<{ id?: string }>();
  const product = id ? PRODUCTS[id] : undefined;

  const [cardForm, setCardForm] = useState(EMPTY_CARD_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  if (!product) return <NotFoundMessage />;

  const program = buildProgramSummary(product);

  function updateCardField(field: string) {
    return (value: any) => setCardForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handlePaymentSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const response = await submitMockPayment(cardForm);
      if (response.success) {
        setSuccessMessage(response.message || "");
        setCardForm(EMPTY_CARD_FORM);
      } else {
        setError(response.error || null);
      }
    } catch (_err) {
      setError(PAYMENT_DATA.form.networkErrorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-6 p-6 md:p-8" dir="rtl">
      <BannerPayment programTitle={program.title} />

      <div className="grid gap-6 lg:grid-cols-12">
        <FormPayment
          cardNumber={cardForm.cardNumber}
          setCardNumber={updateCardField("cardNumber")}
          cardName={cardForm.cardName}
          setCardName={updateCardField("cardName")}
          expiry={cardForm.expiry}
          setExpiry={updateCardField("expiry")}
          cvv={cardForm.cvv}
          setCvv={updateCardField("cvv")}
          loading={loading}
          error={error}
          successMessage={successMessage}
          handleSubmit={handlePaymentSubmit}
          price={program.price}
        />

        <SummaryPayment
          title={program.title}
          price={program.price}
          badge={program.badge}
          note={program.note}
        />
      </div>
    </section>
  );
}