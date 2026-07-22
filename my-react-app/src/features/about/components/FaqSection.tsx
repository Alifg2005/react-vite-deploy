import SharedCard from "../../../shared/components/SharedCard";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionData {
  title: string;
  items: FaqItem[];
}

interface FaqSectionProps {
  faq: FaqSectionData;
}

function FaqSection({ faq }: FaqSectionProps) {
  return (
    <SharedCard
      title={faq.title}
      headerGap="gap-2"
      headerBottom="mb-4"
      className="h-full"
    >
      <div className="flex flex-col gap-3">
        {faq.items.map((item) => (
          <article
            key={item.question}
            className="rounded-xl border border-brand-border bg-brand-white p-4"
          >
            <h4 className="mb-1 text-base font-bold text-brand-text">
              {item.question}
            </h4>

            <p className="text-sm text-brand-muted">
              {item.answer}
            </p>
          </article>
        ))}
      </div>
    </SharedCard>
  );
}

export default FaqSection;
