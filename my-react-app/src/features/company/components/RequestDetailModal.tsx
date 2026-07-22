import DetailModal from "./DetailModal";
import DetailRow from "./DetailRow";
import { requestStatusStyles, type Request } from "../data";

function RequestDetailModal({ request, onClose }: { request: Request; onClose: () => void }) {
  const style = requestStatusStyles[request.status] ?? { bg: "bg-gray-50", text: "text-gray-700", dot: "bg-gray-400" };

  return (
    <DetailModal eyebrow="تفاصيل الطلب" title={request.title} onClose={onClose}>
      {/* Status badge */}
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${style.bg} ${style.text}`}
        >
          <span className={`h-2 w-2 rounded-full ${style.dot}`} />
          {request.priority}
        </span>
      </div>

      {/* Detail rows */}
      <div className="divide-y divide-gray-100 rounded-xl border border-gray-100">
        <DetailRow label="ملخص الطلب" value={request.summary} />
        <DetailRow label="مقدم الطلب" value={request.submittedBy} />
        <DetailRow label="القسم" value={request.department} />
        <DetailRow label="تاريخ التقديم" value={request.date} />
      </div>

      {/* Notes */}
      <div className="rounded-xl bg-gray-50 p-4">
        <p className="mb-1 text-xs font-semibold text-gray-500">ملاحظات</p>
        <p className="text-sm text-gray-700">{request.notes}</p>
      </div>
    </DetailModal>
  );
}

export default RequestDetailModal;
