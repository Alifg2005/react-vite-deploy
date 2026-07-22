import DetailModal from "./DetailModal";
import DetailRow from "./DetailRow";
import { getProgramStatusBadgeClass, getProgramStatusLabel, getProgramTypeLabel } from "../utils/programUtils";
import type { Program } from "../data";

function ProgramDetailModal({ program, onClose }: { program: Program; onClose: () => void }) {
  return (
    <DetailModal eyebrow="تفاصيل البرنامج" title={program.title} onClose={onClose}>
      <div className="flex items-center gap-2">
        <span className={`rounded-full border px-3 py-1 text-sm font-bold ${getProgramStatusBadgeClass(program.status)}`}>
          {getProgramStatusLabel(program.status)}
        </span>
        <span className="rounded-full bg-brand-light px-3 py-1 text-sm font-bold text-brand-text">{getProgramTypeLabel(program.type)}</span>
      </div>

      <p className="text-sm text-brand-muted">{program.description}</p>

      {program.status !== 'draft' && (
        <div>
          <div className="mb-1 h-2 overflow-hidden rounded-full bg-brand-light">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-end))]"
              style={{ width: `${program.progress}%` }}
            />
          </div>
          <p className="text-xs text-brand-muted">{program.progress}% مكتمل</p>
        </div>
      )}

      <div className="divide-y divide-gray-100 rounded-xl border border-gray-100">
        <DetailRow label="عدد المشاركين" value={String(program.participants)} />
        <DetailRow label="تاريخ البداية" value={program.startDate} />
        <DetailRow label="تاريخ النهاية" value={program.endDate} />
      </div>
    </DetailModal>
  );
}

export default ProgramDetailModal;
