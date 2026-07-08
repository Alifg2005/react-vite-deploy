// Sample records shown on the dashboard while there's no backend yet.
// Kept separate from Dashboard.jsx so the page component only holds UI logic.

export const COMPLETED_ITEMS = [
  { type: "دورة", title: "أساسيات تطوير الواجهات", date: "2026-04-18" },
  { type: "دورة", title: "مقدمة في React", date: "2026-05-02" },
  { type: "معسكر", title: "معسكر بناء المواقع", date: "2026-05-20" },
  { type: "شهادة", title: "شهادة إنجاز HTML و CSS", date: "2026-06-01" },
];

// The student's in-progress enrollments — pulled from the shared catalogue
// so the activity cards stay in sync with the program details pages.
export const CURRENT_ACTIVITIES = [
  { id: "react-course", progress: 100 },
  { id: "ui-design-course", progress: 45 },
  { id: "html-css-course", progress: 100 },
  { id: "react-beginners-course", progress: 20 },
  { id: "js-fundamentals-course", progress: 70 },
  { id: "frontend-camp", progress: 30 },
  { id: "ai-apps-camp", progress: 100 },
  { id: "mobile-camp", progress: 55 },
  { id: "web-competition", progress: 60 },
  { id: "problem-solving-competition", progress: 100 },
];

export const PENDING_PROGRAM_REQUESTS = [
  { id: "p1", title: "دورة تصميم واجهات المستخدم المتقدم", type: "دورة", submittedBy: "الأستاذ خالد المطيري", date: "2026-07-01" },
  { id: "p2", title: "معسكر الأمن السيبراني", type: "معسكر", submittedBy: "كبسولة تحول", date: "2026-07-03" },
  { id: "p3", title: "تحدي الذكاء الاصطناعي", type: "مسابقة", submittedBy: "شركة النخبة للتقنية", date: "2026-07-05" },
];

export const PENDING_USER_REQUESTS = [
  { id: "u1", name: "أحمد الشهري", role: "مدرب", date: "2026-07-01" },
  { id: "u2", name: "شركة رواد المستقبل", role: "شركة", date: "2026-07-02" },
  { id: "u3", name: "سلمى القحطاني", role: "مدرب", date: "2026-07-04" },
  { id: "u4", name: "خالد الزهراني", role: "طالب", date: "2026-07-06" },
];

export const COMPLAINTS_SEED = [
  { id: "c1", name: "عبدالعزيز الحربي", userType: "طالب", text: "لم أتمكن من الوصول لمحتوى الدورة بعد إتمام الدفع.", status: "جديدة" },
  { id: "c2", name: "شركة الرواد التقنية", userType: "شركة", text: "نواجه تأخيراً في اعتماد حساب الشركة على المنصة.", status: "تم الرد" },
  { id: "c3", name: "الأستاذة هند العتيبي", userType: "مدرب", text: "أرغب في تحديث بيانات ملفي التعريفي كمدربة.", status: "جديدة" },
];

// Ascending mock trend — final month matches the admin stats snapshot
// (18 شركات / 24 مدربين / 120 طلاب) so the two stay visually consistent.
// Labels are kept in English inside the chart itself — Arabic text doesn't
// shape cleanly in recharts' SVG text nodes, English reads far more crisply.
export const USER_GROWTH_DATA = [
  { label: "Jan", Students: 40, Companies: 4, Trainers: 6 },
  { label: "Feb", Students: 58, Companies: 7, Trainers: 9 },
  { label: "Mar", Students: 75, Companies: 10, Trainers: 13 },
  { label: "Apr", Students: 92, Companies: 13, Trainers: 17 },
  { label: "May", Students: 108, Companies: 16, Trainers: 21 },
  { label: "Jun", Students: 120, Companies: 18, Trainers: 24 },
];

export const REPORT_ITEMS = [
  { id: "r1", tag: "تقرير", title: "تقرير الأداء الشهري", date: "2026-04-30" },
  { id: "r2", tag: "طلب", title: "اعتماد شركة النخبة للتقنية", date: "2026-05-12" },
  { id: "r3", tag: "تقرير", title: "تقرير رضا المستخدمين", date: "2026-05-27" },
  { id: "r4", tag: "طلب", title: "اعتماد مدرب جديد", date: "2026-06-10" },
];
