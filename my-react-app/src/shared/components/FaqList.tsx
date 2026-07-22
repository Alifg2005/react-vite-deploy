import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FaqItem({ question, answer, isOpen, onToggle }: FaqItemProps) {
  return (
    <div className="rounded-xl border border-brand-border bg-brand-light">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 p-4 text-right"
      >
        <span className="text-sm font-bold text-brand-text sm:text-base">{question}</span>
        <span className="shrink-0 text-brand-main">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen ? (
        <p className="px-4 pb-4 text-sm leading-6 text-brand-muted">{answer}</p>
      ) : null}
    </div>
  );
}

interface FaqListProps {
  items?: FaqItem[];
}

function FaqList({ items = [] }: FaqListProps) {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <FaqItem
          key={item.question}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}

export default FaqList;
