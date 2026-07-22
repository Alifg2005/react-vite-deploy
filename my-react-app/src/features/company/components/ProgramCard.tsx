import { getProgramStatusBadgeClass, getProgramStatusLabel, getProgramTypeLabel } from "../utils/programUtils";
import type { Program } from "../data";

function ProgramCard({ program, onViewDetails }: { program: Program; onViewDetails: (program: Program) => void }) {
  return (
    <article className="rounded-2xl border border-brand-border bg-brand-white p-4 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <h4 className="text-base font-bold text-brand-text">{program.title}</h4>
          <p className="mt-1 text-xs text-brand-muted">{getProgramTypeLabel(program.type)}</p>
        </div>
        <span className={`rounded-full border px-2.5 py-1 text-xs font-bold whitespace-nowrap ${getProgramStatusBadgeClass(program.status)}`}>
          {getProgramStatusLabel(program.status)}
        </span>
      </div>

      <p className="mb-3 text-sm text-brand-muted line-clamp-2">{program.description}</p>

      {program.status !== 'draft' && (
        <div className="mb-3">
          <div className="mb-1 h-2 overflow-hidden rounded-full bg-brand-light">
            <div className="h-full rounded-full bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-end))]" style={{ width: `${program.progress}%` }} />
          </div>
          <p className="text-xs text-brand-muted">{program.progress}% مكتمل</p>
        </div>
      )}

      <div className="mb-3 border-t border-brand-border pt-3">
        <p className="text-xs text-brand-muted">
          <strong>{program.participants}</strong> متشارك
        </p>
        <p className="mt-1 text-xs text-brand-muted">
          من {program.startDate} إلى {program.endDate}
        </p>
      </div>

      <button
        onClick={() => onViewDetails(program)}
        className="w-full rounded-lg bg-brand-main px-3 py-2 text-sm font-bold text-white transition hover:opacity-90"
      >
        عرض التفاصيل
      </button>
    </article>
  );
}

export default ProgramCard;
