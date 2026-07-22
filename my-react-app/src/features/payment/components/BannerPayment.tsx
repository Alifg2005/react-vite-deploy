import { PAYMENT_DATA } from "../../../mock";
import SharedCard from "../../../shared/components/SharedCard";

const { title, subtitle, programLabel } = PAYMENT_DATA.banner;

interface BannerPaymentProps {
  programTitle: string;
}

function BannerPayment({ programTitle }: BannerPaymentProps) {
  return (
    <SharedCard
      hero
      title={title}
      subtitle={subtitle}
      padding="p-8"
      headerBottom={programTitle ? "mb-4" : "mb-0"}
      headerGap="gap-2"
    >
      {programTitle ? (
        <p className="flex items-center gap-2 text-sm font-bold text-white/90">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white">
            {programLabel}
          </span>
          {programTitle}
        </p>
      ) : null}
    </SharedCard>
  );
}

export default BannerPayment;
