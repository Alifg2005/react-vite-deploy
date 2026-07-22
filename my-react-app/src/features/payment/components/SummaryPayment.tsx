import { PAYMENT_DATA } from "../../../mock";
import SharedCard from "../../../shared/components/SharedCard";

const { title, tuitionLabel, totalLabel } = PAYMENT_DATA.summary;

interface SummaryPaymentProps {
  title: string;
  price: string;
  badge: string;
  note: string;
}

function SummaryPayment({ title: programTitle, price, badge, note }: SummaryPaymentProps) {
  return (
    <SharedCard
      title={title}
      headerBottom="mb-4"
      className="flex h-full flex-col lg:col-span-5"
    >
      <article className="rounded-xl border border-brand-border bg-brand-white p-4">
        <span className="mb-1 inline-block rounded-full bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] px-3 py-1 text-xs font-bold text-white">
          {badge}
        </span>
        <h4 className="mt-2 text-lg font-bold text-brand-text">{programTitle}</h4>
        <p className="mt-1 text-xs text-brand-muted">{note}</p>
      </article>

      <div className="mt-auto border-t border-brand-border pt-4">
        <div className="mb-2 flex items-center justify-between text-base text-brand-muted">
          <span>{tuitionLabel}</span>
          <span className="font-semibold text-brand-text">{price}</span>
        </div>

        <hr className="my-2 border-dashed border-brand-border" />

        <div className="flex items-center justify-between text-xl font-bold text-brand-text">
          <span>{totalLabel}</span>
          <span className="text-2xl font-bold text-brand-main">{price}</span>
        </div>
      </div>
    </SharedCard>
  );
}

export default SummaryPayment;
