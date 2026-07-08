export const ROLE_LABELS = {
  student: "طالب",
  company: "شركة",
  trainer: "مدرب",
  admin: "إدارة",
};

export const CONTENT_TYPE_FILTERS = [
  { value: "all", label: "كل الأنواع" },
  { value: "دورة", label: "دورات" },
  { value: "معسكر", label: "معسكرات" },
  { value: "مسابقة", label: "مسابقات" },
  { value: "مشروع", label: "مشاريع" },
];

export const DASHBOARD_DATA = {
  student: {
    title: "لوحة الطالب",
    subtitle: "تابع برامجك، شهاداتك، والأنشطة الحالية.",
    user: { name: "سارة العتيبي" },
    sections: [
      { key: "courses", label: "الدورات", type: "دورة" },
      { key: "camps", label: "المعسكرات", type: "معسكر" },
      { key: "contests", label: "المسابقات", type: "مسابقة" },
      { key: "projects", label: "المشاريع", type: "مشروع" },
      { key: "certificates", label: "الشهادات", type: null },
      { key: "settings", label: "الإعدادات", type: null },
    ],
    stats: [
      { label: "برامجي", value: "4" },
      { label: "شهاداتي", value: "2" },
      { label: "الأنشطة الحالية", value: "3" },
    ],
    chart: null,
    participants: 1280,
    
  },
  company: {
    title: "لوحة الشركة",
    subtitle: "إدارة الفرص، المتقدمين، وطلبات الشركة.",
    user: { name: "شركة النخبة للتقنية" },
    sections: [
      { key: "opportunities", label: "الفرص المنشورة" },
      { key: "applicants", label: "المتقدمون" },
      { key: "profile", label: "الملف التعريفي" },
      { key: "payments", label: "المدفوعات والفواتير" },
      { key: "requests", label: "حالة الطلبات" },
    ],
    stats: [
      { label: "برامج مكتملة على المنصة", value: "34" },
      { label: "متدربون تخرجوا", value: "612" },
      { label: "معدل الإنجاز", value: "87%" },
    ],
    chart: {
      title: "إنجاز المنصة خلال الأشهر الماضية",
      data: [
        { label: "يناير", value: 5 },
        { label: "فبراير", value: 7 },
        { label: "مارس", value: 6 },
        { label: "أبريل", value: 9 },
        { label: "مايو", value: 8 },
        { label: "يونيو", value: 11 },
      ],
    },
  },
  trainer: {
    title: "لوحة المدرب",
    subtitle: "إدارة الجلسات التدريبية، الطلاب، والحضور.",
    user: { name: "الأستاذ خالد المطيري" },
    sections: [
      { key: "sessions", label: "جلساتي التدريبية" },
      { key: "students", label: "قائمة الطلاب" },
      { key: "materials", label: "المواد التدريبية" },
      { key: "attendance", label: "الحضور" },
      { key: "activities", label: "الأنشطة الحالية" },
    ],
    stats: [
      { label: "الجلسات", value: "5" },
      { label: "الطلاب", value: "42" },
      { label: "المواد", value: "8" },
      { label: "متدربين على المنصة", value: "1280" },
    ],
    chart: {
      title: "عدد الطلاب في كل جلسة",
      data: [
        { label: "الجلسة 1", value: 12 },
        { label: "الجلسة 2", value: 9 },
        { label: "الجلسة 3", value: 15 },
        { label: "الجلسة 4", value: 6 },
        { label: "الجلسة 5", value: 18 },
      ],
    },
  },
  admin: {
    title: "لوحة الإدارة",
    subtitle: "إدارة المستخدمين، البرامج، التقارير، والمدفوعات.",
    user: { name: "إدارة المنصة" },
    sections: [
      { key: "users", label: "إدارة المستخدمين" },
      { key: "programs", label: "إدارة البرامج" },
      { key: "trainers", label: "إدارة المدربين" },
      { key: "companies", label: "إدارة الشركات" },
      { key: "reports", label: "التقارير" },
      { key: "payments", label: "المدفوعات" },
    ],
    stats: [
      { label: "الشركات", value: "18" },
      { label: "المدربين", value: "24" },
      { label: "الطلاب", value: "120" },
      { label: "زوار المنصة", value: "3400" },
    ],
    chart: {
      title: "توزيع المستخدمين حسب الفئة",
      data: [
        { label: "شركات", value: 18 },
        { label: "مدربين", value: 24 },
        { label: "طلاب", value: 120 },
      ],
    },
  },
};
