import SharedCard from "../../../shared/components/SharedCard";

interface ProgramItem {
  badge: string;
  title: string;
  description: string;
}

interface ProgramsSectionData {
  title: string;
  subtitle: string;
  items: ProgramItem[];
}

interface ProgramsSectionProps {
  programs: ProgramsSectionData;
}

function ProgramsSection({ programs }: ProgramsSectionProps) {
  return (
    <SharedCard title={programs.title} subtitle={programs.subtitle}>
      <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {programs.items.map((program) => (
          <article
            key={program.title}
            className="flex h-full flex-col rounded-xl border border-brand-border bg-brand-white p-4"
          >
            <span className="mb-3 inline-block w-fit rounded-full bg-brand-main px-3 py-1 text-xs font-bold text-white">
              {program.badge}
            </span>
            <h4 className="mb-1 text-lg font-bold text-brand-text">{program.title}</h4>
            <p className="text-sm text-brand-muted">{program.description}</p>
          </article>
        ))}
      </div>
    </SharedCard>
  );
}

export default ProgramsSection;
