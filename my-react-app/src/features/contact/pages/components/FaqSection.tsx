import { useState } from "react";
import SharedCard from "../../../../shared/components/SharedCard";
import { ABOUT_DATA } from "../../../../mock";

const { faq } = ABOUT_DATA;

// Number of FAQ items visible before "Show more" is clicked
const INITIAL_VISIBLE_COUNT = 2;

interface FaqItemProps {
  question: string;
  answer: string;
}

function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <article className="rounded-xl border border-brand-border bg-brand-white p-4">
      <h4 className="mb-1 text-base font-bold text-brand-text">{question}</h4>
      <p className="text-sm text-brand-muted">{answer}</p>
    </article>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function FaqSection() {
  const [expanded, setExpanded] = useState(false);

  const visibleItems = expanded
    ? faq.items
    : faq.items.slice(0, INITIAL_VISIBLE_COUNT);

  const hasMore = faq.items.length > INITIAL_VISIBLE_COUNT;

  return (
    <SharedCard title={faq.title} headerGap="gap-2" headerBottom="mb-4">
      <div className="flex flex-col gap-3">
        {visibleItems.map((item) => (
          <FaqItem
            key={item.question}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>

      {hasMore && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="flex items-center gap-1.5 text-sm font-bold text-brand-main transition hover:opacity-75"
          >
            {expanded ? "إظهار أقل" : "عرض المزيد"}
            <ChevronIcon expanded={expanded} />
          </button>
        </div>
      )}
    </SharedCard>
  );
}

export default FaqSection;
