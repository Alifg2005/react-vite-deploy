import type { Program } from "../data";

export const getProgramStatusBadgeClass = (status: Program['status']) => {
  switch (status) {
    case 'active':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'draft':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'archived':
      return 'bg-gray-50 text-gray-700 border-gray-200';
    default:
      return 'bg-blue-50 text-blue-700 border-blue-200';
  }
};

export const getProgramStatusLabel = (status: Program['status']) => {
  switch (status) {
    case 'active':
      return 'نشط';
    case 'draft':
      return 'مسودة';
    case 'archived':
      return 'مؤرشف';
    default:
      return status;
  }
};

export const getProgramTypeLabel = (type: Program['type']) => {
  switch (type) {
    case 'course':
      return 'دورة';
    case 'camp':
      return 'معسكر';
    case 'competition':
      return 'مسابقة';
    default:
      return type;
  }
};
