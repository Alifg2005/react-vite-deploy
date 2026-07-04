export const PRODUCT_TYPE_LABELS = {
  course: "دورة",
  camp: "معسكر",
  competition: "مسابقة",
  trainer: "مدرب",
  project: "مشروع",
};

export const STATUS_LABELS = {
  open: "التسجيل مفتوح",
  soon: "قريباً",
  full: "مكتمل",
  closed: "مغلق",
};

// Each product lists the sections it wants rendered, in order.
// The page renders whatever sections it finds — nothing is hard-coded per type.
export const PRODUCTS = {
  "react-course": {
    id: "react-course",
    type: "course",
    title: "تطوير واجهات المستخدم باستخدام React",
    provider: "شركة النخبة للتقنية",
    image: null,
    tagline: "من الصفر إلى بناء تطبيقات تفاعلية احترافية بمكتبة React.",
    description:
      "دورة عملية مكثفة تأخذك من أساسيات React إلى بناء تطبيقات حقيقية. تركّز على المكوّنات، الحالة، الـ Hooks، والتعامل مع البيانات، مع مشاريع تطبيقية في كل وحدة.",
    instructor: { name: "الأستاذ خالد المطيري", role: "مهندس واجهات أول" },
    pricing: { isFree: false, price: 499, currency: "ريال" },
    status: "open",
    deadline: "2026-07-25",
    seats: { total: 40, remaining: 12 },
    rating: { average: 4.6, count: 128 },
    hasCapabilityForm: true,
    capabilityForm: {
      note: "هذه الدورة تتطلب اجتياز نموذج قبول قصير لتقييم مستواك.",
      questions: [
        "ما مستوى خبرتك الحالي في HTML و CSS؟",
        "هل سبق أن كتبت JavaScript من قبل؟ صف تجربتك.",
        "ما الهدف الذي تريد تحقيقه من هذه الدورة؟",
      ],
    },
    facts: [
      { label: "المستوى", value: "متوسط" },
      { label: "نمط التقديم", value: "عن بعد" },
      { label: "اللغة", value: "العربية" },
      { label: "المدة", value: "6 أسابيع" },
      { label: "تاريخ البدء", value: "2026-08-01" },
    ],
    tags: ["React", "الواجهات الأمامية", "JavaScript"],
    outcomes: {
      certificate: true,
      certificateName: "شهادة إتمام دورة React المعتمدة",
      skills: [
        "بناء المكوّنات وإعادة استخدامها",
        "إدارة الحالة باستخدام useState",
        "التعامل مع التأثيرات الجانبية عبر useEffect",
        "ربط التطبيق بمصادر بيانات خارجية",
      ],
    },
    curriculum: [
      { title: "الوحدة 1: أساسيات React", meta: "5 دروس • 1.5 ساعة" },
      { title: "الوحدة 2: الحالة والـ Props", meta: "6 دروس • 2 ساعة" },
      { title: "الوحدة 3: الـ Hooks المتقدمة", meta: "4 دروس • 1.5 ساعة" },
      { title: "الوحدة 4: مشروع تطبيقي متكامل", meta: "مشروع • 3 ساعات" },
    ],
    reviews: [
      { name: "سارة العتيبي", rating: 5, date: "2026-06-10", comment: "شرح واضح ومشاريع عملية ممتازة. أنصح بها بشدة." },
      { name: "محمد الدوسري", rating: 4, date: "2026-06-02", comment: "محتوى قوي، كنت أتمنى أمثلة إضافية في الوحدة الأخيرة." },
    ],
    related: ["frontend-camp", "web-competition"],
    sections: ["overview", "outcomes", "curriculum", "instructor", "reviews", "related"],
  },

  "frontend-camp": {
    id: "frontend-camp",
    type: "camp",
    title: "معسكر بناء المواقع المكثّف",
    provider: "كبسولة تحول",
    image: null,
    tagline: "أسبوعان من التدريب المكثّف لبناء موقع كامل من البداية للنهاية.",
    description:
      "معسكر تدريبي مكثّف يجمع بين التعلّم التطبيقي والإرشاد المباشر. تعمل ضمن فريق على مشروع واقعي بإشراف مدربين محترفين.",
    instructor: { name: "خولة المعلم", role: "مدربة تطوير ويب" },
    pricing: { isFree: true, price: 0, currency: "ريال" },
    status: "soon",
    deadline: "2026-08-15",
    seats: { total: 25, remaining: 25 },
    rating: { average: 4.8, count: 46 },
    hasCapabilityForm: false,
    facts: [
      { label: "المستوى", value: "مبتدئ - متوسط" },
      { label: "نمط التقديم", value: "حضوري" },
      { label: "المدة", value: "أسبوعان" },
      { label: "المقاعد", value: "25 مقعد" },
      { label: "تاريخ البدء", value: "2026-09-01" },
    ],
    tags: ["تطوير ويب", "عمل جماعي", "مشروع واقعي"],
    outcomes: {
      certificate: true,
      certificateName: "شهادة إتمام المعسكر",
      skills: ["العمل ضمن فريق تقني", "بناء موقع متكامل", "إدارة مشروع صغير"],
    },
    schedule: [
      { title: "الأسبوع 1: الأساسيات والتخطيط", meta: "5 أيام • جلسات صباحية" },
      { title: "الأسبوع 2: البناء والإطلاق", meta: "5 أيام • عمل على المشروع" },
    ],
    includes: ["مواد تدريبية", "إرشاد مباشر من مدرب", "شهادة إتمام", "بيئة عمل مجهّزة"],
    reviews: [
      { name: "أروى الحرز", rating: 5, date: "2026-05-22", comment: "تجربة مكثّفة ومفيدة جداً، تعلّمت أكثر من أي دورة نظرية." },
    ],
    related: ["react-course"],
    sections: ["overview", "outcomes", "schedule", "includes", "instructor", "reviews", "related"],
  },

  "web-competition": {
    id: "web-competition",
    type: "competition",
    title: "تحدي بناء أفضل واجهة ويب",
    provider: "شركة النخبة للتقنية",
    image: null,
    tagline: "نافس أفضل المطوّرين وابنِ واجهة استثنائية خلال 48 ساعة.",
    description:
      "مسابقة تقنية يتنافس فيها المشاركون على بناء أفضل واجهة ويب وفق معايير محددة. فرصة لإثبات مهاراتك والفوز بجوائز قيّمة.",
    pricing: { isFree: true, price: 0, currency: "ريال" },
    status: "open",
    deadline: "2026-07-30",
    seats: { total: 100, remaining: 34 },
    rating: { average: 4.5, count: 61 },
    hasCapabilityForm: false,
    facts: [
      { label: "نوع المشاركة", value: "فردي أو فريق (حتى 3)" },
      { label: "المدة", value: "48 ساعة" },
      { label: "نمط التقديم", value: "عن بعد" },
      { label: "آخر موعد للتسجيل", value: "2026-07-30" },
    ],
    tags: ["مسابقة", "تصميم", "تحدي"],
    prizes: [
      { place: "المركز الأول", reward: "10,000 ريال + شهادة تميّز" },
      { place: "المركز الثاني", reward: "5,000 ريال + شهادة" },
      { place: "المركز الثالث", reward: "2,500 ريال + شهادة" },
    ],
    timeline: [
      { phase: "فتح التسجيل", date: "2026-07-10" },
      { phase: "بداية التحدي", date: "2026-08-01" },
      { phase: "تسليم المشاريع", date: "2026-08-03" },
      { phase: "إعلان النتائج", date: "2026-08-10" },
    ],
    rules: [
      "يجب تسليم المشروع قبل انتهاء المهلة المحددة.",
      "يُسمح باستخدام أي مكتبة مفتوحة المصدر.",
      "التقييم يعتمد على التصميم، الأداء، والإبداع.",
    ],
    reviews: [
      { name: "علي الغانم", rating: 5, date: "2026-04-18", comment: "تنظيم رائع ومنافسة قوية. تجربة لا تُنسى." },
    ],
    related: ["react-course", "frontend-camp"],
    sections: ["overview", "prizes", "timeline", "rules", "reviews", "related"],
  },

  "expert-trainer": {
    id: "expert-trainer",
    type: "trainer",
    title: "الأستاذ خالد المطيري",
    provider: "مدرب معتمد",
    image: null,
    tagline: "مهندس واجهات أول وخبير تدريب بخبرة تتجاوز 8 سنوات.",
    description:
      "مدرب متخصص في تطوير الواجهات الأمامية وتجربة المستخدم. قدّم برامج تدريبية للعديد من الشركات والفرق التقنية.",
    pricing: { isFree: false, price: 1200, currency: "ريال / يوم تدريبي" },
    status: "open",
    seats: { total: 0, remaining: 0 },
    rating: { average: 4.9, count: 37 },
    hasCapabilityForm: false,
    facts: [
      { label: "التخصص", value: "تطوير الواجهات" },
      { label: "سنوات الخبرة", value: "8+ سنوات" },
      { label: "نمط التدريب", value: "حضوري / عن بعد" },
      { label: "اللغات", value: "العربية، الإنجليزية" },
    ],
    tags: ["React", "UX", "تدريب مؤسسي"],
    bio: "مهندس برمجيات ومدرب معتمد، عمل مع فرق تطوير في عدة شركات وأشرف على تأهيل أكثر من 300 متدرب في مجال الواجهات الأمامية.",
    skills: ["React", "TypeScript", "تصميم واجهات", "تدريب الفرق", "مراجعة الكود"],
    coursesTaught: ["تطوير واجهات المستخدم باستخدام React", "أساسيات JavaScript الحديثة"],
    reviews: [
      { name: "شركة النخبة للتقنية", rating: 5, date: "2026-03-30", comment: "مدرب محترف، رفع مستوى فريقنا بشكل ملحوظ." },
    ],
    related: ["react-course"],
    sections: ["overview", "bio", "skills", "coursesTaught", "reviews", "related"],
  },

  "ecommerce-project": {
    id: "ecommerce-project",
    type: "project",
    title: "بناء متجر إلكتروني متكامل",
    provider: "متاح للشركات",
    image: null,
    tagline: "فريق خبراء جاهز لبناء متجرك الإلكتروني وتسليمه جاهزاً للإطلاق.",
    description:
      "خدمة بناء مشروع عبر فريق خبراء تديره المنصة. تطلب الشركة المشروع، ونجهّز فريقاً من المدربين والخبراء لتنفيذه ضمن مدة محددة.",
    pricing: { isFree: false, price: 0, currency: "حسب نطاق العمل" },
    status: "open",
    seats: { total: 0, remaining: 0 },
    rating: { average: 4.7, count: 12 },
    hasCapabilityForm: false,
    facts: [
      { label: "المدة التقديرية", value: "8 - 12 أسبوع" },
      { label: "حجم الفريق", value: "4 - 6 خبراء" },
      { label: "نمط العمل", value: "عن بعد" },
    ],
    tags: ["تجارة إلكترونية", "فريق مشروع", "تنفيذ"],
    projectBrief:
      "يشمل المشروع تصميم وبناء متجر إلكتروني كامل يتضمّن كتالوج المنتجات، سلة الشراء، بوابة الدفع، ولوحة تحكم للإدارة.",
    requiredRoles: ["مطوّر واجهات", "مطوّر خلفية", "مصمم UX", "مدير مشروع"],
    reviews: [
      { name: "شركة النخبة للتقنية", rating: 5, date: "2026-02-14", comment: "تسليم في الوقت المحدد وجودة عالية." },
    ],
    related: ["expert-trainer"],
    sections: ["overview", "projectBrief", "requiredRoles", "reviews", "related"],
  },
};