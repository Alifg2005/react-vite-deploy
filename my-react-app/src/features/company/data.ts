// Activities

export const activityTabs = [
  { key: "current", label: "الأنشطة الحالية" },
  { key: "completed", label: "الأنشطة المكتملة" },
  { key: "review", label: "الأنشطة قيد المراجعة" },
];

export const activityCategoryFilters = [
  { value: "all", label: "الكل" },
  { value: "course", label: "دورة" },
  { value: "camp", label: "معسكر" },
  { value: "competition", label: "مسابقة" },
];

export const activitiesSeed = [
  {
    id: 1,
    title: "برنامج الإرشاد القيادي",
    description: "جلسات تدريبية أسبوعية مع متابعة أداء المشاركين وتقييمات دورية.",
    category: "course",
    status: "current",
    progress: 61,
    dueDate: "2026-07-24",
    companyName: "أكاديمية كابسول",
    participants: 18,
    highlight: "تنفيذ مستمر خلال الأسبوع الحالي",
  },
  {
    id: 2,
    title: "معسكر الاستعداد لخريجي الجامعة",
    description: "مراجعة خطط التدريب ومتابعة التحضير النهائي.",
    category: "camp",
    status: "current",
    progress: 46,
    dueDate: "2026-07-22",
    companyName: "أكاديمية كابسول",
    participants: 15,
    highlight: "قيد التحضير للمحطة القادمة",
  },
  {
    id: 3,
    title: "مسابقة حل المشكلات",
    description: "مسابقة موجهة لفريق محترفين مع تقييم فني جاهز.",
    category: "competition",
    status: "completed",
    progress: 100,
    dueDate: "2026-07-09",
    companyName: "أكاديمية كابسول",
    participants: 27,
    highlight: "تم إصدار النتائج والإشعارات",
  },
  {
    id: 4,
    title: "أسبوع التوعية بالقياس",
    description: "تدريب قصير يركز على أدوات التقييم والتقارير.",
    category: "course",
    status: "review",
    progress: 91,
    dueDate: "2026-07-19",
    companyName: "أكاديمية كابسول",
    participants: 11,
    highlight: "في انتظار مراجعة الإدارة",
  },
];

// Notifications

export interface Notification {
  id: string;
  title: string;
  description: string;
  type: 'activity' | 'request' | 'system' | 'approval';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

export const notificationTypeFilters: Array<{ value: 'all' | Notification['type']; label: string }> = [
  { value: 'all', label: 'الكل' },
  { value: 'activity', label: 'الأنشطة' },
  { value: 'request', label: 'الطلبات' },
  { value: 'system', label: 'النظام' },
  { value: 'approval', label: 'الموافقات' },
];

// Badge colors per notification type — same bg-*-100/text-*-700 formula as
// the student notifications page's category pills, so both roles read as
// one consistent system (light and dark).
export const notificationTypeStyles: Record<Notification['type'], string> = {
  activity: 'bg-sky-100 text-sky-700',
  request: 'bg-emerald-100 text-emerald-700',
  system: 'bg-violet-100 text-violet-700',
  approval: 'bg-amber-100 text-amber-700',
};

export const notificationsSeed: Notification[] = [
  {
    id: 'notif-1',
    title: 'نشاط جديد تم إنشاؤه',
    description: 'تم إنشاء نشاط "ورشة تطوير المهارات" بنجاح. يمكنك الآن دعوة المشاركين.',
    type: 'activity',
    timestamp: '2026-07-14T10:30:00Z',
    read: false,
    actionUrl: '/company/activities',
    actionLabel: 'عرض النشاط',
  },
  {
    id: 'notif-2',
    title: 'طلب جديد من شريك',
    description: 'استقبلت شركة التطوير طلب جديد لتنظيم معسكر تدريبي خلال الشهر القادم.',
    type: 'request',
    timestamp: '2026-07-14T09:15:00Z',
    read: false,
    actionUrl: '/company/requests',
    actionLabel: 'عرض الطلب',
  },
  {
    id: 'notif-3',
    title: 'تحديث نظام جديد',
    description: 'تم تحديث النظام بميزات جديدة لتحسين تجربة إدارة الأنشطة.',
    type: 'system',
    timestamp: '2026-07-13T16:45:00Z',
    read: true,
  },
  {
    id: 'notif-4',
    title: 'موافقة على النشاط',
    description: 'تمت الموافقة على نشاط "معسكر الابتكار" من قبل الإدارة.',
    type: 'approval',
    timestamp: '2026-07-13T14:20:00Z',
    read: true,
    actionUrl: '/company/activities',
    actionLabel: 'عرض التفاصيل',
  },
  {
    id: 'notif-5',
    title: 'تذكير: جدول قريب الانتهاء',
    description: 'الجدول الزمني للنشاط "ورشة القيادة" سينتهي خلال 3 أيام.',
    type: 'activity',
    timestamp: '2026-07-12T11:00:00Z',
    read: true,
  },
  {
    id: 'notif-6',
    title: 'طلب جديد من عميل',
    description: 'عميل جديد يطلب تنظيم برنامج تدريبي مخصص لفريقه.',
    type: 'request',
    timestamp: '2026-07-12T08:30:00Z',
    read: true,
    actionUrl: '/company/requests',
    actionLabel: 'الرد على الطلب',
  },
];

// Programs

export interface Program {
  id: string;
  title: string;
  description: string;
  type: 'course' | 'camp' | 'competition';
  status: 'active' | 'draft' | 'archived';
  participants: number;
  startDate: string;
  endDate: string;
  progress: number;
}

export type ProgramTab = 'all' | 'active' | 'draft' | 'archived';
export type ProgramType = 'all' | 'course' | 'camp' | 'competition';

export const programTabs: Array<{ key: ProgramTab; label: string }> = [
  { key: 'all', label: 'جميع البرامج' },
  { key: 'active', label: 'البرامج النشطة' },
  { key: 'draft', label: 'المسودات' },
  { key: 'archived', label: 'المؤرشفة' },
];

export const programTypeFilters: Array<{ value: ProgramType; label: string }> = [
  { value: 'all', label: 'الكل' },
  { value: 'course', label: 'دورة' },
  { value: 'camp', label: 'معسكر' },
  { value: 'competition', label: 'مسابقة' },
];

export const programsSeed: Program[] = [
  {
    id: 'prog-1',
    title: 'دورة تطوير القيادات',
    description: 'برنامج شامل لتطوير مهارات القيادة والإدارة مع جلسات عملية.',
    type: 'course',
    status: 'active',
    participants: 24,
    startDate: '2026-07-01',
    endDate: '2026-08-30',
    progress: 65,
  },
  {
    id: 'prog-2',
    title: 'معسكر الابتكار والتكنولوجيا',
    description: 'معسكر مكثف لتطوير حلول تقنية مبتكرة مع فريق متخصص.',
    type: 'camp',
    status: 'active',
    participants: 18,
    startDate: '2026-07-15',
    endDate: '2026-08-15',
    progress: 45,
  },
  {
    id: 'prog-3',
    title: 'مسابقة حل المشكلات',
    description: 'مسابقة سنوية لتحفيز الموظفين على ابتكار حلول إبداعية.',
    type: 'competition',
    status: 'active',
    participants: 32,
    startDate: '2026-07-20',
    endDate: '2026-09-10',
    progress: 30,
  },
  {
    id: 'prog-4',
    title: 'برنامج تدريب المبتدئين',
    description: 'برنامج تأسيسي للموظفين الجدد يشمل الأساسيات والسياسات.',
    type: 'course',
    status: 'draft',
    participants: 0,
    startDate: '2026-08-01',
    endDate: '2026-08-31',
    progress: 0,
  },
  {
    id: 'prog-5',
    title: 'دورة إدارة المشاريع المتقدمة',
    description: 'دورة متقدمة في إدارة المشاريع باستخدام أحدث المنهجيات.',
    type: 'course',
    status: 'archived',
    participants: 20,
    startDate: '2026-05-01',
    endDate: '2026-06-30',
    progress: 100,
  },
  {
    id: 'prog-6',
    title: 'معسكر تطوير المهارات الناعمة',
    description: 'معسكر لتطوير مهارات التواصل والعمل الجماعي والقيادة.',
    type: 'camp',
    status: 'archived',
    participants: 22,
    startDate: '2026-04-01',
    endDate: '2026-05-31',
    progress: 100,
  },
];

// Requests

export const requestTabs = [
  { key: "company", label: "طلبات الشركة" },
  { key: "project", label: "طلبات المشاريع" },
  { key: "training", label: "طلبات التدريب" },
];

export const requestStatusFilters = [
  { value: "all", label: "الكل" },
  { value: "rejected", label: "مرفوض" },
  { value: "pending review", label: "قيد المراجعة" },
  { value: "approved", label: "مقبولة" },
];

export const requestsSeed = {
  company: [
    {
      id: 1,
      title: "تحديث ملف الشراكة",
      summary: "مراجعة بيانات الشركة وتحديث معلومات التواصل.",
      status: "approved",
      priority: "مقبولة",
      date: "2025-04-10",
      submittedBy: "أحمد العمري",
      department: "إدارة الشراكات",
      notes: "تم رفع المستندات المطلوبة وجارٍ مراجعتها من قِبل الفريق المختص.",
    },
    {
      id: 2,
      title: "طلب توفير مساحات",
      summary: "تأمين أماكن إضافية لورش العمل القادمة.",
      status: "rejected",
      priority: "مرفوض",
      date: "2025-03-22",
      submittedBy: "سارة الزهراني",
      department: "إدارة الفعاليات",
      notes: "تم رفض الطلب بسبب عدم توفر مساحات مناسبة في الفترة المطلوبة.",
    },
  ],
  project: [
    {
      id: 3,
      title: "تصميم مشروع قابل للتوسعة",
      summary: "إعداد خطة تنفيذ مع أعضاء الفريق الفني.",
      status: "pending review",
      priority: "قيد المراجعة",
      date: "2025-04-18",
      submittedBy: "خالد المطيري",
      department: "الفريق التقني",
      notes: "الطلب قيد المراجعة من قِبل مدير المشاريع، ومتوقع الرد خلال 3 أيام عمل.",
    },
  ],
  training: [
    {
      id: 4,
      title: "طلب تدريب قيادي",
      summary: "تجهيز مجموعة من الدورات المتقدمة للموظفين.",
      status: "pending review",
      priority: "قيد المراجعة",
      date: "2025-04-20",
      submittedBy: "نورة العتيبي",
      department: "الموارد البشرية",
      notes: "سيتم تحديد المدرب المختص وجدول الدورات بعد اعتماد الطلب.",
    },
  ],
};

export const requestStatusStyles: Record<string, { bg: string; text: string; dot: string }> = {
  approved: { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  rejected: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
  "pending review": { bg: "bg-yellow-50", text: "text-yellow-700", dot: "bg-yellow-500" },
};

export type Request = (typeof requestsSeed)["company"][number];

// Schedule

export interface ScheduleMeeting {
  id: number;
  title: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  type: string;
}

export interface ScheduleDeadline {
  id: number;
  title: string;
  date: string;
  type: string;
  time?: string;
  endTime?: string;
}

export const scheduleMeetings: ScheduleMeeting[] = [
  { id: 1, title: "اجتماع متابعة النشاط", date: "2026-07-14", time: "09:30", endTime: "10:30", location: "أونلاين", type: "meeting" },
  { id: 2, title: "مراجعة تقارير المعسكر", date: "2026-07-16", time: "13:00", endTime: "14:00", location: "المكتب", type: "meeting" },
  { id: 3, title: "تدريب فريق الإدارة", date: "2026-07-15", time: "14:30", endTime: "15:30", location: "قاعة التدريب", type: "training" },
];

export const scheduleDeadlines: ScheduleDeadline[] = [
  { id: 1, title: "إرسال تقرير الأداء", date: "2026-07-15", type: "deadline" },
  { id: 2, title: "مراجعة الطلبات الجديدة", date: "2026-07-17", type: "deadline" },
  { id: 3, title: "ورشة عمل المشاريع", date: "2026-07-14", time: "11:00", endTime: "12:00", type: "workshop" },
];

// Support

export const supportStatusFilters = [
  { value: "all", label: "الكل" },
  { value: "open", label: "مفتوح" },
  { value: "pending", label: "قيد الانتظار" },
  { value: "resolved", label: "محلول" },
];

export const ticketsSeed = [
  { id: 1, title: "تعثّر في تسجيل الدخول", summary: "لا يمكن الدخول إلى لوحة الأنشطة من الهاتف.", status: "open", priority: "عالية", createdAt: "قبل 2 ساعة" },
  { id: 2, title: "طلب تعديل بيانات النشاط", summary: "تحتاج إلى تحديث معلومات المشاركين والموعد.", status: "pending", priority: "متوسطة", createdAt: "قبل 6 ساعات" },
  { id: 3, title: "مشكلة في رفع الوثائق", summary: "لم يتم استلام الملفات المرفوعة عبر النموذج.", status: "resolved", priority: "منخفضة", createdAt: "قبل يوم" },
];
