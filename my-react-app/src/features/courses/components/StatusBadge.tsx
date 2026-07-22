import { STATUS_LABELS, PROGRAM_DETAILS_DATA } from "../../../mock";
import type { ProductStatus } from "../../../mock";

const { status: STATUS_STYLES } = PROGRAM_DETAILS_DATA;

interface StatusBadgeProps {
  status: ProductStatus;
}

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${STATUS_STYLES[status] ?? STATUS_STYLES.closed}`}>
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

export default StatusBadge;
