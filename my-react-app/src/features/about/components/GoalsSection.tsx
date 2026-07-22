import SharedCard from "../../../shared/components/SharedCard";

interface GoalsSectionProps {
  goals: string[];
}

function GoalsSection({ goals }: GoalsSectionProps) {
  return (
    <SharedCard
      title="أهداف المنصة"
      headerGap="gap-2"
      headerBottom="mb-4"
      className="h-full"
    >
      <div className="grid items-stretch gap-4 sm:grid-cols-2">
        {goals.map((goal, index) => (
          <article
            key={goal}
            className="flex h-full items-start gap-3 rounded-xl border border-brand-border bg-brand-white p-4"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-main text-sm font-bold text-white">
              {index + 1}
            </span>

            <p className="text-sm text-brand-muted">{goal}</p>
          </article>
        ))}
      </div>
    </SharedCard>
  );
}

export default GoalsSection;
