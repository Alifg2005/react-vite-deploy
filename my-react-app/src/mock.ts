// mock.ts — single mock-data source for the entire project. Every page,
// context, and component that needs seed/sample content imports it from
// here instead of declaring its own or reaching into a per-feature data
// file. Organized by feature/page, with unique constant names throughout.
// All exports are collected in one block at the end of the file.

/* images */
import ctImage from "./images/ct.png";
import reactImage from "./images/react.jpg";
import htmlCssJsImage from "./images/html-css-js.jpg";
import htmlCssImage from "./images/html css.jpg";

// ── courses: product catalogue ──────────────────────────────────────────────
// The full course/camp/competition/trainer/project catalogue shared by the
// public catalogue pages, the student pages, the payment page, and the
// admin program-management pages (which derive their program list from it).

type ProductType = "course" | "camp" | "competition" | "trainer" | "project";
type ProductStatus = "open" | "soon" | "full" | "closed";

interface Pricing {
  isFree: boolean;
  price: number;
  currency: string;
}

interface Instructor {
  name: string;
  role: string;
}

interface Rating {
  average: number;
  count: number;
}

interface Seats {
  total: number;
  remaining: number;
}

interface Fact {
  label: string;
  value: string;
}

interface Outcomes {
  certificate: boolean;
  certificateName?: string;
  skills: string[];
}

interface CurriculumItem {
  title: string;
  meta: string;
}

interface Review {
  name: string;
  rating: number;
  date: string;
  comment: string;
}

interface Prize {
  place: string;
  reward: string;
}

interface TimelineStep {
  phase: string;
  date: string;
}

interface CapabilityFormData {
  note: string;
  questions: string[];
}

interface Product {
  id: string;
  type: ProductType;
  title: string;
  provider: string;
  image: string | null;
  introVideoUrl?: string;
  tagline: string;
  description: string;
  instructor?: Instructor;
  pricing: Pricing;
  status: ProductStatus;
  deadline?: string;
  seats: Seats;
  rating: Rating;
  hasCapabilityForm: boolean;
  capabilityForm?: CapabilityFormData;
  facts: Fact[];
  tags: string[];
  category?: string;
  mode?: string;
  outcomes?: Outcomes;
  curriculum?: CurriculumItem[];
  schedule?: CurriculumItem[];
  includes?: string[];
  prizes?: Prize[];
  timeline?: TimelineStep[];
  rules?: string[];
  bio?: string;
  skills?: string[];
  coursesTaught?: string[];
  projectBrief?: string;
  requiredRoles?: string[];
  reviews?: Review[];
  related?: string[];
  sections: string[];
}

type ProductsMap = Record<string, Product>;

// Arabic display label per product type.
const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
  course: "دورة",
  camp: "معسكر",
  competition: "مسابقة",
  trainer: "مدرب",
  project: "مشروع",
};

// Arabic display label per product lifecycle status.
const STATUS_LABELS: Record<ProductStatus, string> = {
  open: "التسجيل مفتوح",
  soon: "قريباً",
  full: "مكتمل",
  closed: "مغلق",
};

// External website per named provider, keyed by `Product.provider` — only
// real organizations get an entry (generic placeholders like "مدرب معتمد" or
// "متاح للشركات" aren't a distinct company, so they stay plain text on the
// program details hero instead of rendering as a link).
const PROGRAM_PROVIDER_WEBSITES: Record<string, string> = {
  "شركة النخبة للتقنية": "https://example.com",
  "كبسولة تحول": "https://example.com",
};

// Every course/camp/competition/trainer/project on the platform. Each product
// lists the sections it wants rendered, in order — the page renders whatever
// sections it finds, nothing is hard-coded per type.
const PRODUCTS: ProductsMap = {
  "react-course": {
    id: "react-course",
    type: "course",
    title: "تطوير واجهات المستخدم باستخدام React",
    provider: "شركة النخبة للتقنية",
    image: reactImage,
    introVideoUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
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
    sections: ["overview", "introVideo", "outcomes", "curriculum", "instructor", "reviews", "related"],
  },

  "frontend-camp": {
    id: "frontend-camp",
    type: "camp",
    title: "معسكر بناء المواقع المكثّف",
    provider: "كبسولة تحول",
    image: htmlCssJsImage,
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
    image: htmlCssImage,
    tagline: "نافس أفضل المطوّرين وابنِ واجهة استثنائية خلال 48 ساعة.",
    description:
      "مسابقة تقنية يتنافس فيها المشاركون على بناء أفضل واجهة ويب وفق معايير محددة. فرصة لإثبات مهاراتك والفوز بجوائز قيّمة.",
    instructor: { name: "الأستاذ تركي العصيمي", role: "مشرف المسابقة" },
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
    sections: ["overview", "instructor", "prizes", "timeline", "rules", "reviews", "related"],
  },

  "ui-design-course": {
    id: "ui-design-course",
    type: "course",
    title: "تصميم واجهات المستخدم",
    provider: "شركة النخبة للتقنية",
    image: null,
    tagline: "تعلّم أسس تصميم واجهات مستخدم جذابة وسهلة الاستخدام.",
    description: "دورة تغطي مبادئ تجربة المستخدم وتصميم الواجهات، من البحث والتخطيط إلى بناء نماذج أولية جاهزة للتنفيذ.",
    instructor: { name: "الأستاذة منى الحربي", role: "مصممة واجهات مستخدم" },
    pricing: { isFree: false, price: 349, currency: "ريال" },
    status: "open",
    deadline: "2026-07-20",
    seats: { total: 30, remaining: 9 },
    rating: { average: 4.5, count: 52 },
    hasCapabilityForm: false,
    facts: [
      { label: "المستوى", value: "مبتدئ" },
      { label: "نمط التقديم", value: "عن بعد" },
      { label: "المدة", value: "4 أسابيع" },
      { label: "تاريخ البدء", value: "2026-07-20" },
    ],
    tags: ["تصميم", "UX", "UI"],
    sections: ["overview"],
  },

  "html-css-course": {
    id: "html-css-course",
    type: "course",
    title: "دورة CSS و HTML",
    provider: "شركة النخبة للتقنية",
    image: null,
    tagline: "أساسيات بناء صفحات الويب من الصفر.",
    description: "دورة تأسيسية تشرح HTML و CSS خطوة بخطوة لبناء صفحات ويب متجاوبة ومنسّقة بشكل احترافي.",
    instructor: { name: "الأستاذ فهد العتيبي", role: "مطوّر واجهات أمامية" },
    pricing: { isFree: false, price: 199, currency: "ريال" },
    status: "open",
    deadline: "2026-07-15",
    seats: { total: 40, remaining: 20 },
    rating: { average: 4.4, count: 88 },
    hasCapabilityForm: false,
    facts: [
      { label: "المستوى", value: "مبتدئ" },
      { label: "نمط التقديم", value: "عن بعد" },
      { label: "المدة", value: "3 أسابيع" },
      { label: "تاريخ البدء", value: "2026-07-15" },
    ],
    tags: ["برمجة", "الواجهات الأمامية"],
    sections: ["overview"],
  },

  "react-beginners-course": {
    id: "react-beginners-course",
    type: "course",
    title: "React للمبتدئين",
    provider: "شركة النخبة للتقنية",
    image: null,
    tagline: "خطواتك الأولى في بناء تطبيقات React بسيطة.",
    description: "مقدمة عملية لمكتبة React موجّهة لمن لا يملك أي خبرة سابقة بها، تغطي المكوّنات والحالة الأساسية.",
    instructor: { name: "الأستاذة ريم الشمري", role: "مطوّرة React" },
    pricing: { isFree: false, price: 299, currency: "ريال" },
    status: "open",
    deadline: "2026-07-10",
    seats: { total: 35, remaining: 15 },
    rating: { average: 4.3, count: 40 },
    hasCapabilityForm: false,
    facts: [
      { label: "المستوى", value: "مبتدئ" },
      { label: "نمط التقديم", value: "عن بعد" },
      { label: "المدة", value: "4 أسابيع" },
      { label: "تاريخ البدء", value: "2026-07-10" },
    ],
    tags: ["برمجة", "React"],
    sections: ["overview"],
  },

  "js-fundamentals-course": {
    id: "js-fundamentals-course",
    type: "course",
    title: "أساسيات جافاسكريبت الحديثة",
    provider: "كبسولة تحول",
    image: null,
    tagline: "بناء أساس قوي في JavaScript قبل الانتقال لأي إطار عمل.",
    description: "دورة تغطي أساسيات JavaScript الحديثة: المتغيرات، الدوال، المصفوفات، والبرمجة غير المتزامنة.",
    instructor: { name: "الأستاذ ياسر القحطاني", role: "مطوّر برمجيات" },
    pricing: { isFree: false, price: 259, currency: "ريال" },
    status: "open",
    deadline: "2026-08-05",
    seats: { total: 30, remaining: 12 },
    rating: { average: 4.6, count: 64 },
    hasCapabilityForm: false,
    facts: [
      { label: "المستوى", value: "مبتدئ - متوسط" },
      { label: "نمط التقديم", value: "عن بعد" },
      { label: "المدة", value: "5 أسابيع" },
      { label: "تاريخ البدء", value: "2026-08-05" },
    ],
    tags: ["برمجة", "JavaScript"],
    sections: ["overview"],
  },

  "project-management-course": {
    id: "project-management-course",
    type: "course",
    title: "إدارة المشاريع التقنية",
    provider: "شركة النخبة للتقنية",
    image: null,
    tagline: "أدر مشاريعك التقنية بثقة من التخطيط إلى التسليم.",
    description: "دورة تعرّفك على أساليب إدارة المشاريع التقنية الحديثة، تخطيط المهام، وإدارة الفرق والمخاطر.",
    instructor: { name: "الأستاذة نورة الدوسري", role: "مديرة مشاريع تقنية" },
    pricing: { isFree: false, price: 399, currency: "ريال" },
    status: "open",
    deadline: "2026-08-12",
    seats: { total: 25, remaining: 25 },
    rating: { average: 4.5, count: 21 },
    hasCapabilityForm: false,
    facts: [
      { label: "المستوى", value: "متوسط" },
      { label: "نمط التقديم", value: "عن بعد" },
      { label: "المدة", value: "6 أسابيع" },
      { label: "تاريخ البدء", value: "2026-08-12" },
    ],
    tags: ["إدارة مشاريع"],
    sections: ["overview"],
  },

  "cybersecurity-course": {
    id: "cybersecurity-course",
    type: "course",
    title: "الأمن السيبراني للمبتدئين",
    provider: "كبسولة تحول",
    image: null,
    tagline: "مدخل عملي لعالم الأمن السيبراني وحماية الأنظمة.",
    description: "دورة تمهيدية تغطي أساسيات الأمن السيبراني، أنواع الهجمات الشائعة، وطرق الحماية الأساسية.",
    instructor: { name: "الأستاذ سعود الغامدي", role: "مختص أمن سيبراني" },
    pricing: { isFree: true, price: 0, currency: "ريال" },
    status: "open",
    deadline: "2026-08-20",
    seats: { total: 50, remaining: 30 },
    rating: { average: 4.7, count: 33 },
    hasCapabilityForm: false,
    facts: [
      { label: "المستوى", value: "مبتدئ" },
      { label: "نمط التقديم", value: "عن بعد" },
      { label: "المدة", value: "3 أسابيع" },
      { label: "تاريخ البدء", value: "2026-08-20" },
    ],
    tags: ["أمن سيبراني"],
    sections: ["overview"],
  },

  "ai-apps-camp": {
    id: "ai-apps-camp",
    type: "camp",
    title: "معسكر تطبيقات الذكاء الاصطناعي",
    provider: "كبسولة تحول",
    image: null,
    tagline: "ابنِ تطبيقاً حقيقياً مستخدماً نماذج الذكاء الاصطناعي خلال أسبوعين.",
    description: "معسكر تطبيقي يقدّم أساسيات دمج نماذج الذكاء الاصطناعي داخل تطبيقات حقيقية، بإشراف مدربين متخصصين.",
    instructor: { name: "الأستاذ عبدالله المالكي", role: "مهندس ذكاء اصطناعي" },
    pricing: { isFree: true, price: 0, currency: "ريال" },
    status: "open",
    deadline: "2026-08-12",
    seats: { total: 25, remaining: 10 },
    rating: { average: 4.8, count: 29 },
    hasCapabilityForm: false,
    facts: [
      { label: "المستوى", value: "متوسط" },
      { label: "نمط التقديم", value: "حضوري" },
      { label: "المدة", value: "أسبوعان" },
      { label: "تاريخ البدء", value: "2026-08-12" },
    ],
    tags: ["ذكاء اصطناعي"],
    sections: ["overview"],
  },

  "mobile-camp": {
    id: "mobile-camp",
    type: "camp",
    title: "معسكر تطوير تطبيقات الجوال",
    provider: "شركة النخبة للتقنية",
    image: null,
    tagline: "بناء تطبيق جوال متكامل ضمن فريق خلال أسبوعين.",
    description: "معسكر مكثّف لبناء تطبيق جوال من الصفر، يغطي التصميم والبرمجة والاختبار ضمن فريق عمل صغير.",
    instructor: { name: "الأستاذة لمى العنزي", role: "مطوّرة تطبيقات جوال" },
    pricing: { isFree: true, price: 0, currency: "ريال" },
    status: "open",
    deadline: "2026-09-01",
    seats: { total: 20, remaining: 8 },
    rating: { average: 4.6, count: 18 },
    hasCapabilityForm: false,
    facts: [
      { label: "المستوى", value: "متوسط" },
      { label: "نمط التقديم", value: "حضوري" },
      { label: "المدة", value: "أسبوعان" },
      { label: "تاريخ البدء", value: "2026-09-01" },
    ],
    tags: ["تطوير تطبيقات", "جوال"],
    sections: ["overview"],
  },

  "problem-solving-competition": {
    id: "problem-solving-competition",
    type: "competition",
    title: "تحدي حل المشكلات البرمجية",
    provider: "شركة النخبة للتقنية",
    image: null,
    tagline: "نافس في حل تحديات برمجية ضمن وقت محدد.",
    description: "مسابقة برمجية يتنافس فيها المشاركون على حل مجموعة من المسائل الخوارزمية خلال مهلة زمنية محددة.",
    instructor: { name: "الأستاذة هند الزهراني", role: "مشرفة المسابقة" },
    pricing: { isFree: true, price: 0, currency: "ريال" },
    status: "open",
    deadline: "2026-08-18",
    seats: { total: 80, remaining: 40 },
    rating: { average: 4.4, count: 27 },
    hasCapabilityForm: false,
    facts: [
      { label: "نوع المشاركة", value: "فردي" },
      { label: "المدة", value: "24 ساعة" },
      { label: "نمط التقديم", value: "عن بعد" },
      { label: "آخر موعد للتسجيل", value: "2026-08-18" },
    ],
    tags: ["مسابقة", "برمجة"],
    sections: ["overview"],
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

// Domain/field tags used to filter the catalogue by category.
const CATEGORY_LABELS: Record<string, string> = {
  webdev: "تطوير مواقع الويب",
  appdev: "تطوير التطبيقات",
  uiux: "تعلم UI/UX",
  drones: "الدرونز",
  gamedesign: "تصميم الألعاب",
  automation: "الأتمتة",
  ai: "الذكاء الاصطناعي",
  security: "الأمن السيبراني",
};

// Icon key (see ACTIVITIES_CATEGORY_ICON_PATHS below) per category.
const CATEGORY_ICONS: Record<string, string> = {
  webdev: "webdev",
  appdev: "appdev",
  uiux: "uiux",
  drones: "drone",
  gamedesign: "game",
  automation: "automation",
  ai: "ai",
  security: "security",
};

// ── courses: catalogue page ──────────────────────────────────────────────────

interface FilterOption {
  value: string;
  label: string;
}

const COURSE_CATALOGUE_DATA = {
  banner: {
    title: "استكشف البرامج",
    subtitle: "تصفّح الدورات، المعسكرات، والمسابقات المتاحة وابدأ رحلتك التعليمية.",
  },

  results: {
    countLabel: "برنامج متاح",
    emptyMessage: "لا توجد برامج مطابقة لبحثك. جرّب تعديل عوامل التصفية.",
  },

  filters: {
    searchPlaceholder: "ابحث باسم البرنامج أو المدرب...",
    typeLabel: "النوع:",
    statusLabel: "الحالة:",
    typeFilters: [
      { value: "all", label: "كل الأنواع" },
      { value: "course", label: "دورات" },
      { value: "camp", label: "معسكرات" },
      { value: "competition", label: "مسابقات" },
    ] as FilterOption[],
    statusFilters: [
      { value: "all", label: "كل الحالات" },
      { value: "open", label: "متاح الآن" },
      { value: "soon", label: "قريباً" },
    ] as FilterOption[],
  },
};

// Which product types each role is allowed to see in the catalogue.
const VISIBLE_TYPES_BY_ROLE: Record<UserRole, ProductType[]> = {
  guest:   ["course", "camp", "competition"],
  student: ["course", "camp", "competition"],
  trainer: ["course", "camp", "competition"],
  company: ["course", "camp", "competition"],
  admin:   ["course", "camp", "competition", "trainer", "project"],
};

// Lifecycle statuses hidden from the public catalogue.
const HIDDEN_STATUSES: ProductStatus[] = ["closed"];

// ── courses: program details page ───────────────────────────────────────────

const PROGRAM_DETAILS_DATA = {
  notFound: {
    title: "لم يتم العثور على البرنامج",
    description: "تحقق من الرابط، أو تصفّح البرامج المتاحة من صفحة البرامج.",
    backLabel: "العودة",
  },

  hero: {
    ratingWrapperClass: "flex items-center gap-3 rounded-full bg-white/15 px-3 py-1 w-fit",
  },

  status: {
    open: "bg-emerald-100 text-emerald-700",
    soon: "bg-amber-100 text-amber-700",
    full: "bg-rose-100 text-rose-700",
    closed: "bg-brand-white text-brand-muted",
  } as Record<string, string>,

  sections: {
    overview: "نبذة عن البرنامج",
    introVideo: "المقطع التعريفي",
    outcomes: "ماذا ستحقق؟",
    certificateLabel: "شهادة معتمدة عند الإتمام",
    curriculum: "محتوى الدورة",
    schedule: "جدول المعسكر",
    includes: "ماذا يشمل المعسكر؟",
    instructor: "المدرب",
    prizes: "الجوائز",
    timeline: "الجدول الزمني",
    rules: "الشروط والأحكام",
    bio: "نبذة عن المدرب",
    skills: "المهارات والتخصصات",
    coursesTaught: "الدورات التي يقدّمها",
    projectBrief: "وصف المشروع",
    requiredRoles: "الأدوار المطلوبة في الفريق",
    reviews: "التقييمات والآراء",
    related: "برامج ذات صلة",
  },

  actionCard: {
    seatsLabel: "المقاعد المتبقية",
    seatsOf: "من",
    wishlistAdd: "♡ أضف لقائمة الرغبات",
    wishlistRemove: "♥ في قائمة الرغبات",
    actions: {
      trainerCompany: "طلب هذا المدرب",
      trainerAdmin: "إدارة ملف المدرب",
      trainerGuest: "سجّل الدخول للتواصل",
      trainerDisabled: "طلب المدربين متاح للشركات",
      projectCompany: "طلب فريق لهذا المشروع",
      projectTrainer: "انضمّ كخبير للفريق",
      projectAdmin: "إدارة المشروع",
      projectGuest: "سجّل الدخول",
      projectDisabled: "الطلب متاح للشركات",
      statusFull: "القائمة ممتلئة",
      statusClosed: "التسجيل مغلق",
      adminManage: "إدارة البرنامج",
      guestLogin: "سجّل الدخول للتسجيل",
      alreadyEnrolled: "أنت مسجّل ✔",
      applyForm: "التقديم لنموذج القبول",
      registerNow: "سجّل الآن",
    },
  },

  capabilityForm: {
    title: "نموذج القبول",
    placeholder: "اكتب إجابتك هنا...",
    submitLabel: "إرسال الطلب",
    cancelLabel: "إلغاء",
    successTitle: "تم إرسال طلبك",
    successMessage: "شكراً لك، تم استلام نموذج القبول وسيتم مراجعته والرد عليك قريباً.",
    closeLabel: "إغلاق",
  },

  demoBar: {
    label: "المنتج:",
    types: ["course", "camp", "competition", "trainer"],
  },
} as const;

// ── shared dashboard/role config ─────────────────────────────────────────────
// Cross-role config (UserRole, DASHBOARD_DATA, ROLE_LABELS) depended on by
// auth, profile, and several shared layout components.

type UserRole = "student" | "company" | "trainer" | "admin" | "guest";

interface DashboardSection {
  key: string;
  label: string;
  type?: string | null;
}

interface DashboardStat {
  label: string;
  value: string;
}

interface ChartDataPoint {
  label: string;
  value: number;
}

interface DashboardChart {
  title: string;
  data: ChartDataPoint[];
}

interface DashboardUser {
  name: string;
}

interface DashboardConfig {
  title: string;
  subtitle: string;
  user: DashboardUser;
  sections: DashboardSection[];
  stats: DashboardStat[];
  chart: DashboardChart | null;
  participants?: number;
}

// Arabic display label per role.
const ROLE_LABELS: Record<UserRole, string> = {
  student: "طالب",
  company: "شركة",
  trainer: "مدرب",
  admin: "إدارة",
  guest: "زائر",
};

const CONTENT_TYPE_FILTERS: { value: string; label: string }[] = [
  { value: "all", label: "كل الأنواع" },
  { value: "دورة", label: "دورات" },
  { value: "معسكر", label: "معسكرات" },
  { value: "مسابقة", label: "مسابقات" },
  { value: "مشروع", label: "مشاريع" },
];

// Per-role dashboard config for the generic (non-admin/non-student) Dashboard
// page — company/trainer still render through it; student/admin have their
// own dedicated dashboards now.
const DASHBOARD_DATA: Record<string, DashboardConfig> = {
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

// ── admin: translation layer ─────────────────────────────────────────────────
// Every Arabic/English string shown by the Admin module lives here (or, for
// vocab also used as a data-driven lookup key, in ADMIN_LABELS). Components
// render `t(...)` over a value pulled from this section.

interface AdminLabel {
  ar: string;
  en: string;
}
type Translatable = AdminLabel | string;

// Every status/type/role/category/priority/action value reused as a lookup
// key elsewhere (tone maps, icon maps, filters), resolved to display text
// via `t(ADMIN_LABELS[key])`. Free-text fields (titles, messages, names,
// notes, ...) live in the seed data below instead, as { ar, en } pairs.
const ADMIN_LABELS: Record<string, AdminLabel> = {
  review: { ar: "مراجعة", en: "Review" },
  view: { ar: "عرض", en: "View" },
  reply: { ar: "رد", en: "Reply" },

  request: { ar: "طلب", en: "Request" },
  complaint: { ar: "شكوى", en: "Complaint" },
  program: { ar: "برنامج", en: "Program" },
  system: { ar: "نظام", en: "System" },
  inquiry: { ar: "استفسار", en: "Inquiry" },

  course: { ar: "دورة", en: "Course" },
  camp: { ar: "معسكر", en: "Camp" },
  competition: { ar: "مسابقة", en: "Competition" },

  pendingApproval: { ar: "بانتظار الموافقة", en: "Pending Approval" },
  published: { ar: "منشور", en: "Published" },
  completed: { ar: "مكتمل", en: "Completed" },
  rejected: { ar: "مرفوض", en: "Rejected" },

  student: { ar: "متدرب", en: "Trainee" },
  trainer: { ar: "مدرب", en: "Trainer" },
  company: { ar: "منظمة", en: "Organization" },

  active: { ar: "نشط", en: "Active" },
  onHold: { ar: "معلق", en: "On Hold" },
  blocked: { ar: "محظور", en: "Blocked" },

  underReview: { ar: "قيد المراجعة", en: "Under Review" },

  sectionTrainers: { ar: "المدربين", en: "Trainers" },
  sectionCompanies: { ar: "المنظمات", en: "Organizations" },

  reportPerformance: { ar: "تقرير أداء المنظمة", en: "Organization Performance Report" },
  reportTrainer: { ar: "تقرير المدرب", en: "Trainer Report" },
  reportFinal: { ar: "التقرير الختامي", en: "Final Report" },

  catCamps: { ar: "المعسكرات", en: "Camps" },
  catPrograms: { ar: "البرامج", en: "Programs" },
  catCourses: { ar: "الدورات", en: "Courses" },
  catCertificates: { ar: "الشهادات", en: "Certificates" },
  catPartnerships: { ar: "الشراكات", en: "Partnerships" },
  catUsers: { ar: "المستخدمين", en: "Users" },

  priorityHigh: { ar: "عالية", en: "High" },
  priorityMedium: { ar: "متوسطة", en: "Medium" },
  priorityLow: { ar: "منخفضة", en: "Low" },

  awaitingReply: { ar: "في انتظار الرد", en: "Awaiting Reply" },
  replied: { ar: "تم الرد", en: "Replied" },
  closed: { ar: "مغلقة", en: "Closed" },
  reopened: { ar: "تمت إعادة فتحها", en: "Reopened" },

  news: { ar: "خبر", en: "News" },
  event: { ar: "فعالية", en: "Event" },
  draft: { ar: "مسودة", en: "Draft" },

  departmentManagement: { ar: "قسم الإدارة", en: "Management Department" },
  departmentSupport: { ar: "قسم الدعم الفني", en: "Technical Support Department" },
  departmentDesign: { ar: "قسم التصميم", en: "Design Department" },
  departmentMedia: { ar: "قسم الإعلام", en: "Media Department" },
  departmentHr: { ar: "قسم الموارد البشرية", en: "Human Resources Department" },

  pendingRegistration: { ar: "بانتظار التفعيل", en: "Pending Activation" },
};

// Every other piece of Admin UI text — page titles/subtitles, form labels,
// placeholders, table columns, button labels, empty states, confirm/alert
// copy — grouped by page/component so call sites stay easy to trace back
// here. Entries that take arguments are small functions returning a pair.
const adminTranslations = {
  common: {
    cancel: { ar: "إلغاء", en: "Cancel" } as AdminLabel,
    close: { ar: "إغلاق", en: "Close" } as AdminLabel,
    edit: { ar: "تعديل", en: "Edit" } as AdminLabel,
    delete: { ar: "حذف", en: "Delete" } as AdminLabel,
    save: { ar: "حفظ", en: "Save" } as AdminLabel,
    saveChanges: { ar: "حفظ التعديلات", en: "Save Changes" } as AdminLabel,
    reset: { ar: "إعادة ضبط", en: "Reset" } as AdminLabel,
    more: { ar: "المزيد", en: "More" } as AdminLabel,
    showMore: { ar: "عرض المزيد", en: "Show More" } as AdminLabel,
    showLess: { ar: "إظهار أقل", en: "Show Less" } as AdminLabel,
    searchPlaceholder: { ar: "ابحث...", en: "Search..." } as AdminLabel,
    actions: { ar: "الإجراءات", en: "Actions" } as AdminLabel,
    status: { ar: "الحالة", en: "Status" } as AdminLabel,
    date: { ar: "التاريخ", en: "Date" } as AdminLabel,
    email: { ar: "البريد الإلكتروني", en: "Email" } as AdminLabel,
    accountType: { ar: "نوع الحساب", en: "Account Type" } as AdminLabel,
    imageColumn: { ar: "الصورة", en: "Image" } as AdminLabel,
    allTypes: { ar: "جميع الأنواع", en: "All Types" } as AdminLabel,
    allStatuses: { ar: "جميع الحالات", en: "All Statuses" } as AdminLabel,
    programNameLabel: { ar: "اسم البرنامج", en: "Program Name" } as AdminLabel,
    programTypeLabel: { ar: "نوع البرنامج", en: "Program Type" } as AdminLabel,
    submittedByLabel: { ar: "الجهة المقدمة", en: "Submitted By" } as AdminLabel,
    requestDateLabel: { ar: "تاريخ الطلب", en: "Request Date" } as AdminLabel,
    registrationDateLabel: { ar: "تاريخ التسجيل", en: "Registration Date" } as AdminLabel,
  },

  ui: {
    unreadAria: { ar: "غير مقروء", en: "Unread" } as AdminLabel,
  },

  sidebar: {
    platformManagement: { ar: "إدارة المنصة", en: "Platform Management" } as AdminLabel,
    adminFallbackName: { ar: "مسؤول", en: "Admin" } as AdminLabel,
    logOut: { ar: "تسجيل الخروج", en: "Log Out" } as AdminLabel,
    collapseMenu: { ar: "طي القائمة", en: "Collapse Menu" } as AdminLabel,
  },

  dashboard: {
    pageTitle: { ar: "لوحة الإدارة", en: "Admin Dashboard" } as AdminLabel,
    pageSubtitle: { ar: "تابع المستخدمين، الطلبات، البرامج، والتحديثات من مكان واحد.", en: "Track users, requests, programs, and updates in one place." } as AdminLabel,
    growthChartTitle: { ar: "نمو المستخدمين خلال الأشهر الأخيرة", en: "User Growth Over Recent Months" } as AdminLabel,
    programDistributionTitle: { ar: "توزيع البرامج", en: "Program Distribution" } as AdminLabel,
    quickFollowUpTitle: { ar: "المتابعة السريعة", en: "Quick Follow-up" } as AdminLabel,
    companyEffortsTitle: { ar: "مقارنة الشركات", en: "Company Comparison" } as AdminLabel,
    companyEffortsSubtitle: { ar: "مقارنة أداء وتقدم الشركات عبر الوقت", en: "Comparing company performance and progress over time" } as AdminLabel,
    companyEffortsXAxisLabel: { ar: "الشركات", en: "Companies" } as AdminLabel,
    companyEffortsYAxisLabel: { ar: "عدد الفعاليات", en: "Number of Activities" } as AdminLabel,
    platformProgressTitle: { ar: "الإنجاز التراكمي للمنصة", en: "Cumulative Platform Achievement" } as AdminLabel,
  },

  notifications: {
    allStatus: { ar: "الكل", en: "All" } as AdminLabel,
    unreadFilter: { ar: "غير مقروءة", en: "Unread" } as AdminLabel,
    readFilter: { ar: "مقروءة", en: "Read" } as AdminLabel,
    pageTitle: { ar: "الإشعارات", en: "Notifications" } as AdminLabel,
    unreadSubtitle: (count: number): AdminLabel => ({ ar: `لديك ${count} إشعارات غير مقروءة.`, en: `You have ${count} unread notifications.` }),
    noNewSubtitle: { ar: "لا توجد إشعارات جديدة.", en: "No new notifications." } as AdminLabel,
    markAllRead: { ar: "تحديد الكل كمقروء", en: "Mark All as Read" } as AdminLabel,
    deleteAll: { ar: "حذف الكل", en: "Delete All" } as AdminLabel,
    searchPlaceholder: { ar: "ابحث في الإشعارات...", en: "Search notifications..." } as AdminLabel,
    markedRead: { ar: "مقروء", en: "Read" } as AdminLabel,
    markAsRead: { ar: "تحديد كمقروء", en: "Mark as Read" } as AdminLabel,
    emptyState: { ar: "لا توجد إشعارات مطابقة.", en: "No matching notifications." } as AdminLabel,
    typeFilterLabel: { ar: "النوع", en: "Type" } as AdminLabel,
    enableTypeTitle: { ar: "تفعيل نوع الإشعار", en: "Enable notification type" } as AdminLabel,
    enableStatusTitle: { ar: "تفعيل حالة الإشعار", en: "Enable notification status" } as AdminLabel,
  },

  schedule: {
    duration30: { ar: "30 دقيقة", en: "30 min" } as AdminLabel,
    duration60: { ar: "ساعة", en: "1 hour" } as AdminLabel,
    duration90: { ar: "ساعة ونصف", en: "1.5 hours" } as AdminLabel,
    duration120: { ar: "ساعتان", en: "2 hours" } as AdminLabel,
    duration180: { ar: "3 ساعات", en: "3 hours" } as AdminLabel,
    addTask: { ar: "إضافة مهمة", en: "Add Task" } as AdminLabel,
    addTaskSubtitle: { ar: "حدّد عنوان المهمة، تاريخها ووقتها، وهل تتكرر يومياً، أسبوعياً، شهرياً، أو سنوياً.", en: "Set the task title, date, and time, and whether it repeats daily, weekly, monthly, or yearly." } as AdminLabel,
    taskTitleLabel: { ar: "عنوان المهمة", en: "Task Title" } as AdminLabel,
    taskTitlePlaceholder: { ar: "مثال: اجتماع فريق الإدارة", en: "e.g. Admin team meeting" } as AdminLabel,
    recurrenceLabel: { ar: "التكرار", en: "Recurrence" } as AdminLabel,
    startTimeLabel: { ar: "وقت البدء (اختياري)", en: "Start Time (optional)" } as AdminLabel,
    durationLabel: { ar: "المدة", en: "Duration" } as AdminLabel,
    notesLabel: { ar: "ملاحظات", en: "Notes" } as AdminLabel,
    notesPlaceholder: { ar: "تفاصيل إضافية عن المهمة...", en: "Additional details about the task..." } as AdminLabel,
    saveTask: { ar: "حفظ المهمة", en: "Save Task" } as AdminLabel,
    moreCount: (count: number): AdminLabel => ({ ar: `+${count} أخرى`, en: `+${count} more` }),
    allDay: { ar: "طوال اليوم", en: "All day" } as AdminLabel,
    clickToDelete: { ar: "اضغط للحذف", en: "Click to delete" } as AdminLabel,
    pageTitle: { ar: "جدول الإدارة", en: "Admin Schedule" } as AdminLabel,
    pageSubtitle: { ar: "أضف وتابع المهام الإدارية اليومية، الأسبوعية، الشهرية، والسنوية.", en: "Add and track daily, weekly, monthly, and yearly admin tasks." } as AdminLabel,
    day: { ar: "اليوم", en: "Day" } as AdminLabel,
    week: { ar: "الأسبوع", en: "Week" } as AdminLabel,
    month: { ar: "الشهر", en: "Month" } as AdminLabel,
    previous: { ar: "السابق", en: "Previous" } as AdminLabel,
    next: { ar: "التالي", en: "Next" } as AdminLabel,
  },

  approvalRequestDetail: {
    accept: { ar: "قبول", en: "Accept" } as AdminLabel,
    reject: { ar: "رفض", en: "Reject" } as AdminLabel,
    back: { ar: "رجوع", en: "Back" } as AdminLabel,
    aboutProgram: { ar: "نبذة عن البرنامج", en: "About the Program" } as AdminLabel,
    outcomes: { ar: "ماذا ستحقق؟", en: "What You'll Achieve" } as AdminLabel,
    curriculum: { ar: "محتوى الدورة", en: "Course Content" } as AdminLabel,
    programDetailsTitle: { ar: "تفاصيل البرنامج", en: "Program Details" } as AdminLabel,
    programDetailsSubtitle: { ar: "راجع تفاصيل الطلب قبل اتخاذ القرار.", en: "Review the request details before deciding." } as AdminLabel,
    requestDetailsTitle: { ar: "تفاصيل الطلب", en: "Request Details" } as AdminLabel,
    requestDetailsSubtitle: { ar: "راجع تفاصيل طلب الانضمام قبل اتخاذ القرار.", en: "Review the join request details before deciding." } as AdminLabel,
    userOrgNameLabel: { ar: "اسم المستخدم / المنظمة", en: "User / Organization Name" } as AdminLabel,
  },

  approvalRequests: {
    viewMore: { ar: "عرض المزيد", en: "View More" } as AdminLabel,
    reviewRequest: { ar: "مراجعة الطلب", en: "Review Request" } as AdminLabel,
    searchPlaceholder: { ar: "ابحث باسم البرنامج، المستخدم، أو البريد الإلكتروني...", en: "Search by program, user, or email..." } as AdminLabel,
    noProgramRequests: { ar: "لا توجد طلبات برامج مطابقة.", en: "No matching program requests." } as AdminLabel,
    noJoinRequests: { ar: "لا توجد طلبات انضمام مطابقة.", en: "No matching join requests." } as AdminLabel,
    pageTitle: { ar: "طلبات الموافقة", en: "Approval Requests" } as AdminLabel,
    pageSubtitle: { ar: "عرض وإدارة جميع الطلبات التي تحتاج إلى موافقة", en: "View and manage all requests that need approval" } as AdminLabel,
    programRequestsTitle: (count: number): AdminLabel => ({ ar: `طلبات البرامج (${count})`, en: `Program Requests (${count})` }),
    joinRequestsTitle: (count: number): AdminLabel => ({ ar: `طلبات الانضمام (${count})`, en: `Join Requests (${count})` }),
  },

  users: {
    userNameColumn: { ar: "اسم المستخدم", en: "User Name" } as AdminLabel,
    joinDateColumn: { ar: "تاريخ التسجيل", en: "Join Date" } as AdminLabel,
    totalUsersLabel: { ar: "إجمالي المستخدمين", en: "Total Users" } as AdminLabel,
    editUserTitle: { ar: "تعديل المستخدم", en: "Edit User" } as AdminLabel,
    userDetailsTitle: { ar: "بيانات المستخدم", en: "User Details" } as AdminLabel,
    nameLabel: { ar: "الاسم", en: "Name" } as AdminLabel,
    namePlaceholder: { ar: "اسم المستخدم أو المنظمة", en: "User or organization name" } as AdminLabel,
    saveUser: { ar: "حفظ المستخدم", en: "Save User" } as AdminLabel,
    pageTitle: { ar: "إدارة المستخدمين", en: "User Management" } as AdminLabel,
    pageSubtitle: { ar: "تابع حسابات المتدربين، المدربين، والمنظمات، وتحكّم بحالتها.", en: "Track trainee, trainer, and organization accounts, and control their status." } as AdminLabel,
    searchPlaceholder: { ar: "ابحث باسم المستخدم أو البريد الإلكتروني...", en: "Search by user name or email..." } as AdminLabel,
    emptyState: { ar: "لا يوجد مستخدمون مطابقون.", en: "No matching users." } as AdminLabel,
  },

  programs: {
    sortNewest: { ar: "ترتيب: الأحدث", en: "Sort: Newest" } as AdminLabel,
    sortOldest: { ar: "ترتيب: الأقدم", en: "Sort: Oldest" } as AdminLabel,
    registeredColumn: { ar: "عدد المسجلين", en: "Registered" } as AdminLabel,
    dateAddedColumn: { ar: "تاريخ الإضافة", en: "Date Added" } as AdminLabel,
    pageTitle: { ar: "إدارة البرامج", en: "Program Management" } as AdminLabel,
    pageSubtitle: { ar: "إدارة ومتابعة جميع البرامج: الدورات، والمعسكرات، والمسابقات في المنصة.", en: "Manage and track all programs: courses, camps, and competitions on the platform." } as AdminLabel,
    addNewProgram: { ar: "إضافة برنامج جديد", en: "Add New Program" } as AdminLabel,
    allProgramsTitle: (count: number): AdminLabel => ({ ar: `جميع البرامج (${count})`, en: `All Programs (${count})` }),
    searchPlaceholder: { ar: "ابحث باسم البرنامج أو الجهة...", en: "Search by program name or provider..." } as AdminLabel,
    emptyState: { ar: "لا توجد برامج مطابقة.", en: "No matching programs." } as AdminLabel,
    editProgramTitle: { ar: "تعديل البرنامج", en: "Edit Program" } as AdminLabel,
    editProgramSubtitle: { ar: "حدّث بيانات البرنامج ثم احفظ التغييرات.", en: "Update the program details, then save your changes." } as AdminLabel,
    addProgramSubtitle: { ar: "عبّئ بيانات البرنامج ثم احفظه ليظهر في قائمة البرامج.", en: "Fill in the program details, then save it to show it in the program list." } as AdminLabel,
  },

  complaints: {
    allCategories: { ar: "جميع التصنيفات", en: "All Categories" } as AdminLabel,
    complaintNumberColumn: { ar: "رقم الشكوى", en: "Complaint #" } as AdminLabel,
    titleColumn: { ar: "العنوان", en: "Title" } as AdminLabel,
    userColumn: { ar: "المستخدم", en: "User" } as AdminLabel,
    categoryColumn: { ar: "التصنيف", en: "Category" } as AdminLabel,
    sentDateColumn: { ar: "تاريخ الإرسال", en: "Sent Date" } as AdminLabel,
    hasAttachment: { ar: "يوجد مرفق (صورة)", en: "Has attachment (image)" } as AdminLabel,
    noAttachment: { ar: "لا يوجد مرفق", en: "No attachment" } as AdminLabel,
    replyPlaceholder: (id: number): AdminLabel => ({ ar: `اكتب ردك على شكوى #${id}...`, en: `Write your reply to complaint #${id}...` }),
    sendReply: { ar: "إرسال الرد", en: "Send Reply" } as AdminLabel,
    pageTitle: { ar: "الشكاوى والاستفسارات", en: "Complaints & Inquiries" } as AdminLabel,
    pageSubtitle: { ar: "تابع شكاوى المستخدمين ومقترحاتهم، وأرسل الردود المناسبة.", en: "Track user complaints and suggestions, and send appropriate replies." } as AdminLabel,
    allComplaintsTitle: (count: number): AdminLabel => ({ ar: `جميع الشكاوى (${count})`, en: `All Complaints (${count})` }),
    searchPlaceholder: { ar: "ابحث برقم الشكوى أو العنوان أو اسم المستخدم...", en: "Search by complaint #, title, or user name..." } as AdminLabel,
    replyAction: { ar: "الرد", en: "Reply" } as AdminLabel,
    reopenComplaint: { ar: "إعادة فتح الشكوى", en: "Reopen Complaint" } as AdminLabel,
    closeComplaint: { ar: "إغلاق الشكوى", en: "Close Complaint" } as AdminLabel,
    emptyState: { ar: "لا توجد شكاوى مطابقة.", en: "No matching complaints." } as AdminLabel,
  },

  newsEvents: {
    editTitle: { ar: "تعديل الخبر / الفعالية", en: "Edit News / Event" } as AdminLabel,
    addTitle: { ar: "إضافة خبر أو فعالية", en: "Add News or Event" } as AdminLabel,
    editorSubtitle: { ar: "أضف صورة، ثم اكتب العنوان والتاريخ والنوع — ستظهر فوق الصورة كمعاينة مباشرة.", en: "Add an image, then write the title, date, and type — they'll appear over the image as a live preview." } as AdminLabel,
    clickToAddImage: { ar: "اضغط لإضافة صورة", en: "Click to add an image" } as AdminLabel,
    titlePlaceholderPreview: { ar: "عنوان الخبر أو الفعالية", en: "News or event title" } as AdminLabel,
    removeImage: { ar: "إزالة الصورة", en: "Remove image" } as AdminLabel,
    nameLabel: { ar: "اسم الخبر أو الفعالية", en: "News/Event Name" } as AdminLabel,
    namePlaceholder: { ar: "مثال: انطلاق معسكر الصيف", en: "e.g. Summer camp kicks off" } as AdminLabel,
    typeLabel: { ar: "النوع", en: "Type" } as AdminLabel,
    excerptLabel: { ar: "ملخص مختصر", en: "Short Excerpt" } as AdminLabel,
    excerptPlaceholder: { ar: "جملة مختصرة تظهر في القائمة...", en: "A short line shown in the list..." } as AdminLabel,
    titleColumn: { ar: "العنوان", en: "Title" } as AdminLabel,
    pageTitle: { ar: "الأخبار والفعاليات", en: "News & Events" } as AdminLabel,
    pageSubtitle: { ar: "أضف وأدر أخبار وفعاليات المنصة التي تظهر للمستخدمين.", en: "Add and manage the platform's news and events shown to users." } as AdminLabel,
    addButton: { ar: "إضافة خبر / فعالية جديد", en: "Add News / Event" } as AdminLabel,
    allItemsTitle: (count: number): AdminLabel => ({ ar: `جميع العناصر (${count})`, en: `All Items (${count})` }),
    searchPlaceholder: { ar: "ابحث بالعنوان...", en: "Search by title..." } as AdminLabel,
    emptyState: { ar: "لا توجد عناصر مطابقة.", en: "No matching items." } as AdminLabel,
  },

  reports: {
    reportTypesAll: { ar: "أنواع التقارير", en: "Report Types" } as AdminLabel,
    reportTitleColumn: { ar: "عنوان التقرير", en: "Report Title" } as AdminLabel,
    sectionColumn: { ar: "القسم", en: "Section" } as AdminLabel,
    reportTypeColumn: { ar: "نوع التقرير", en: "Report Type" } as AdminLabel,
    createdDateColumn: { ar: "تاريخ الإنشاء", en: "Created Date" } as AdminLabel,
    pageTitle: { ar: "التقارير", en: "Reports" } as AdminLabel,
    pageSubtitle: { ar: "تابع، وشارك جميع تقارير المنصة من مكان واحد.", en: "Track and share all platform reports in one place." } as AdminLabel,
    allReportsTitle: (count: number): AdminLabel => ({ ar: `جميع التقارير (${count})`, en: `All Reports (${count})` }),
    searchPlaceholder: { ar: "ابحث بعنوان التقرير أو كلمة مفتاحية...", en: "Search by report title or keyword..." } as AdminLabel,
    downloadPdf: { ar: "تحميل PDF", en: "Download PDF" } as AdminLabel,
    shareLink: { ar: "مشاركة رابط", en: "Share Link" } as AdminLabel,
    downloadAlert: (title: string): AdminLabel => ({ ar: `سيتم تنزيل "${title}" بصيغة PDF.`, en: `"${title}" will be downloaded as PDF.` }),
    shareCopiedAlert: (url: string): AdminLabel => ({ ar: `تم نسخ رابط المشاركة:\n${url}`, en: `Share link copied:\n${url}` }),
    shareLinkAlert: (url: string): AdminLabel => ({ ar: `رابط المشاركة:\n${url}`, en: `Share link:\n${url}` }),
    emptyState: { ar: "لا توجد تقارير مطابقة.", en: "No matching reports." } as AdminLabel,
  },

  team: {
    departmentLabel: { ar: "القسم", en: "Department" } as AdminLabel,
    jobTitleLabel: { ar: "المسمى الوظيفي", en: "Job Title" } as AdminLabel,
    accountStatusColumn: { ar: "حالة الحساب", en: "Account Status" } as AdminLabel,
    confirmDelete: (name: string): AdminLabel => ({ ar: `هل تريد حذف ${name} من فريق الإدارة؟`, en: `Delete ${name} from the admin team?` }),
    pageTitle: { ar: "فريق الإدارة", en: "Admin Team" } as AdminLabel,
    pageSubtitle: { ar: "إدارة أعضاء الفريق الإداري وإرسال الدعوات لهم.", en: "Manage admin team members and send them invites." } as AdminLabel,
    addEmployee: { ar: "إضافة موظف", en: "Add Employee" } as AdminLabel,
    teamMembersTitle: (count: number): AdminLabel => ({ ar: `أعضاء الفريق (${count})`, en: `Team Members (${count})` }),
    emptyState: { ar: "لا يوجد أعضاء فريق بعد.", en: "No team members yet." } as AdminLabel,
    emailDomainError: (domain: string): AdminLabel => ({ ar: "يجب استخدام البريد الوظيفي التابع لدومين الشركة.", en: `The email must use the company's official domain (@${domain}).` }),
    editEmployeeTitle: { ar: "تعديل بيانات الموظف", en: "Edit Employee" } as AdminLabel,
    addEmployeeTitle: { ar: "إضافة موظف إداري جديد", en: "Add a New Admin Employee" } as AdminLabel,
    editEmployeeSubtitle: { ar: "حدّث بيانات العضو ثم احفظ التغييرات.", en: "Update the member's details, then save your changes." } as AdminLabel,
    addEmployeeSubtitle: { ar: "أضف الموظفين الإداريين المعتمدين مسبقاً داخل الشركة باستخدام بريدهم الوظيفي. سيتم إرسال دعوة لإنشاء كلمة المرور وتفعيل الحساب.", en: "Add administrative staff who are already approved within the company using their work email. An invite to create a password and activate the account will be sent." } as AdminLabel,
    fullNameLabel: { ar: "الاسم الكامل", en: "Full Name" } as AdminLabel,
    namePlaceholder: { ar: "اسم الموظف", en: "Employee name" } as AdminLabel,
    workEmailLabel: { ar: "البريد الإلكتروني الوظيفي", en: "Work Email" } as AdminLabel,
    jobTitlePlaceholder: { ar: "مثال: مدير إعلام، نائب إعلام...", en: "e.g. Media Manager, Media Deputy…" } as AdminLabel,
    sendInvite: { ar: "إرسال الدعوة", en: "Send Invite" } as AdminLabel,
  },

  // features/auth/pages/SetPassword.tsx (admin team invite flow).
  setPassword: {
    passwordTooShort: { ar: "كلمة المرور يجب أن تكون 8 أحرف على الأقل.", en: "Password must be at least 8 characters." } as AdminLabel,
    passwordMismatch: { ar: "كلمتا المرور غير متطابقتين.", en: "Passwords do not match." } as AdminLabel,
    invalidToken: { ar: "رابط الدعوة غير صالح أو تم استخدامه من قبل.", en: "This invite link is invalid or has already been used." } as AdminLabel,
    panelTitle: { ar: "أهلاً بك في فريق كبسولة تحول", en: "Welcome to the Capsule Tahawul team" } as AdminLabel,
    panelSubtitle: { ar: "خطوة أخيرة لإكمال انضمامك إلى فريق الإدارة.", en: "One last step to complete joining the admin team." } as AdminLabel,
    heading: { ar: "تعيين كلمة المرور", en: "Set Password" } as AdminLabel,
    subheading: { ar: "أنشئ كلمة مرور لحسابك الجديد لإكمال التسجيل.", en: "Create a password for your new account to complete registration." } as AdminLabel,
    successMessage: { ar: "تم تعيين كلمة المرور بنجاح، وتم إشعار الإدارة بانضمامك.", en: "Your password has been set successfully, and the admin team has been notified of your joining." } as AdminLabel,
    goToLogin: { ar: "الذهاب لتسجيل الدخول", en: "Go to Login" } as AdminLabel,
    newPasswordLabel: { ar: "كلمة المرور الجديدة", en: "New Password" } as AdminLabel,
    confirmPasswordLabel: { ar: "تأكيد كلمة المرور", en: "Confirm Password" } as AdminLabel,
  },
};

// ── admin: shared program types ──────────────────────────────────────────────

interface AdminProgramModule {
  title: string;
  meta: string;
  // The individual lessons inside this module/week — shown as a nested list
  // under the module both in the admin curriculum editor and on the public
  // program page's "محتوى الدورة" section.
  lessons?: string[];
}

interface AdminProgram {
  id: string;
  // title/submittedBy/typeLabel/description come from the shared
  // (Arabic-only) product catalogue above, which is out of scope for
  // translation — they stay plain strings, unlike the Translatable fields
  // used elsewhere in the admin data layer.
  title: string;
  type: string;
  // Only set on catalog-derived programs; display now goes through
  // `t(ADMIN_LABELS[item.type])` instead, so admin-form programs don't
  // need to populate this.
  typeLabel?: string;
  submittedBy: string;
  dateAdded: string;
  registeredCount: number;
  status: string;
  // Numeric on catalog-derived programs; admin-added/edited ones store the
  // raw <input type="number"> string value as-is.
  price: number | string;
  seats: number | string;
  description: string;
  image: string | null;
  // Only present on programs created/edited through ProgramManagement's form.
  startDate?: string;
  endDate?: string;
  about?: string;
  outcomes?: string[];
  curriculum?: AdminProgramModule[];
  introVideoUrl?: string;
}

// ── admin: dashboard shell ────────────────────────────────────────────────────
// Sidebar nav, stat cards, growth chart, and quick-stats data for the admin
// dashboard shell (AdminSidebar + AdminDashboard).

interface AdminSidebarLink {
  key: string;
  label: AdminLabel;
  icon: string;
  path: string;
  badgeKey?: string;
}

const ADMIN_SIDEBAR_LINKS: AdminSidebarLink[] = [
  { key: "home", label: { ar: "الرئيسية", en: "Home" }, icon: "home", path: "/admin" },
  { key: "notifications", label: { ar: "الإشعارات", en: "Notifications" }, icon: "bell", path: "/admin/notifications", badgeKey: "unreadNotifications" },
  { key: "users", label: { ar: "إدارة المستخدمين", en: "User Management" }, icon: "users", path: "/admin/users", badgeKey: "pendingUserRequests" },
  { key: "programs", label: { ar: "إدارة البرامج", en: "Program Management" }, icon: "grid", path: "/admin/programs", badgeKey: "pendingProgramRequests" },
  { key: "news", label: { ar: "الأخبار والفعاليات", en: "News & Events" }, icon: "doc", path: "/admin/news-events" },
  { key: "complaints", label: { ar: "الشكاوى والاستفسارات", en: "Complaints & Inquiries" }, icon: "chat", path: "/admin/complaints" },
  { key: "reports", label: { ar: "التقارير", en: "Reports" }, icon: "chart", path: "/admin/reports" },
  { key: "team", label: { ar: "فريق الإدارة", en: "Admin Team" }, icon: "userPlus", path: "/admin/team" },
  { key: "schedule", label: { ar: "جدول الإدارة", en: "Admin Schedule" }, icon: "calendar", path: "/admin/schedule" },
];

interface AdminStatCard {
  key: string;
  label: AdminLabel;
  value: number;
  icon: string;
  tone: string;
}

// Ordered right-to-left in the RTL grid: زوار المنصة، المتدربين، المدربين،
// المنظمات. Pending-approval count is intentionally not repeated here — it's
// already surfaced via the sidebar badge and the Quick Follow-up card below.
const ADMIN_STAT_CARDS: AdminStatCard[] = [
  { key: "visitors", label: { ar: "زوار المنصة", en: "Platform Visitors" }, value: 3400, icon: "eye", tone: "teal" },
  { key: "students", label: { ar: "المتدربين", en: "Trainees" }, value: 1156, icon: "graduation", tone: "green" },
  { key: "trainers", label: { ar: "المدربين", en: "Trainers" }, value: 24, icon: "user", tone: "teal" },
  { key: "companies", label: { ar: "المنظمات", en: "Organizations" }, value: 18, icon: "building", tone: "green" },
];

interface AdminGrowthRow {
  label: AdminLabel;
  الزوار: number;
  الطلاب: number;
  المدربين: number;
  الشركات: number;
}

// Growth trend feeding the admin dashboard line chart, seeded at three
// granularities so the chart's range dropdown (7 days / month / 6 months) has
// something real to switch between. dataKeys stay Arabic internally (recharts
// needs a stable key); the chart legend translates them via CHART_SERIES.
const ADMIN_USER_GROWTH_DATA_6M: AdminGrowthRow[] = [
  { label: { ar: "يناير", en: "Jan" }, الزوار: 1600, الطلاب: 420, المدربين: 120, الشركات: 12 },
  { label: { ar: "فبراير", en: "Feb" }, الزوار: 2000, الطلاب: 560, المدربين: 150, الشركات: 14 },
  { label: { ar: "مارس", en: "Mar" }, الزوار: 2450, الطلاب: 720, المدربين: 180, الشركات: 15 },
  { label: { ar: "أبريل", en: "Apr" }, الزوار: 2850, الطلاب: 900, المدربين: 210, الشركات: 16 },
  { label: { ar: "مايو", en: "May" }, الزوار: 3150, الطلاب: 1050, المدربين: 230, الشركات: 17 },
  { label: { ar: "يونيو", en: "Jun" }, الزوار: 3400, الطلاب: 1200, المدربين: 250, الشركات: 18 },
];

const ADMIN_USER_GROWTH_DATA_1M: AdminGrowthRow[] = [
  { label: { ar: "الأسبوع 1", en: "Week 1" }, الزوار: 3100, الطلاب: 1120, المدربين: 235, الشركات: 17 },
  { label: { ar: "الأسبوع 2", en: "Week 2" }, الزوار: 3200, الطلاب: 1145, المدربين: 240, الشركات: 17 },
  { label: { ar: "الأسبوع 3", en: "Week 3" }, الزوار: 3290, الطلاب: 1170, المدربين: 245, الشركات: 18 },
  { label: { ar: "الأسبوع 4", en: "Week 4" }, الزوار: 3400, الطلاب: 1200, المدربين: 250, الشركات: 18 },
];

const ADMIN_USER_GROWTH_DATA_7D: AdminGrowthRow[] = [
  { label: { ar: "السبت", en: "Sat" }, الزوار: 3250, الطلاب: 1180, المدربين: 246, الشركات: 18 },
  { label: { ar: "الأحد", en: "Sun" }, الزوار: 3290, الطلاب: 1185, المدربين: 247, الشركات: 18 },
  { label: { ar: "الاثنين", en: "Mon" }, الزوار: 3310, الطلاب: 1189, المدربين: 247, الشركات: 18 },
  { label: { ar: "الثلاثاء", en: "Tue" }, الزوار: 3335, الطلاب: 1193, المدربين: 248, الشركات: 18 },
  { label: { ar: "الأربعاء", en: "Wed" }, الزوار: 3355, الطلاب: 1196, المدربين: 248, الشركات: 18 },
  { label: { ar: "الخميس", en: "Thu" }, الزوار: 3380, الطلاب: 1198, المدربين: 249, الشركات: 18 },
  { label: { ar: "الجمعة", en: "Fri" }, الزوار: 3400, الطلاب: 1200, المدربين: 250, الشركات: 18 },
];

interface AdminQuickStat {
  key: string;
  label: AdminLabel;
  value: number;
  icon: string;
  tone: string;
  action: string;
}

// Same right-to-left seeding as ADMIN_STAT_CARDS above.
const ADMIN_QUICK_STATS: AdminQuickStat[] = [
  { key: "new-complaints", label: { ar: "شكاوى جديدة", en: "New complaints" }, value: 3, icon: "chat", tone: "teal", action: "reply" },
  { key: "pending-programs", label: { ar: "برامج بانتظار الموافقة", en: "Programs awaiting approval" }, value: 7, icon: "grid", tone: "green", action: "review" },
  { key: "pending-requests", label: { ar: "طلبات المستخدمين", en: "User Requests" }, value: 12, icon: "hourglass", tone: "teal", action: "review" },
];

const QUICK_ACTION_STYLES: Record<string, string> = {
  teal: "bg-teal-100 text-teal-700 hover:bg-teal-200",
  green: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
};

// Icon-circle background/text color per tone — pairs with QUICK_ACTION_STYLES
// (same tone keys) wherever a stat card shows an icon badge next to its number.
const TONE_ICON_CIRCLE_CLASSES: Record<string, string> = {
  teal: "bg-teal-100 text-teal-600",
  green: "bg-emerald-100 text-emerald-600",
};

const CHART_SERIES = [
  { key: "الزوار", label: { ar: "الزوار", en: "Visitors" }, color: "#076b7c" },
  { key: "الطلاب", label: { ar: "المتدربين", en: "Trainees" }, color: "#088a98" },
  { key: "المدربين", label: { ar: "المدربين", en: "Trainers" }, color: "#0d9488" },
  { key: "الشركات", label: { ar: "المنظمات", en: "Organizations" }, color: "#34d399" },
];

const PROGRAM_TYPE_COLORS: Record<string, string> = {
  course: "#076b7c",
  camp: "#0d9488",
  competition: "#7fb8b8",
};

type GrowthRange = "7d" | "1m" | "6m";

const GROWTH_RANGE_DATA: Record<GrowthRange, AdminGrowthRow[]> = {
  "7d": ADMIN_USER_GROWTH_DATA_7D,
  "1m": ADMIN_USER_GROWTH_DATA_1M,
  "6m": ADMIN_USER_GROWTH_DATA_6M,
};

const GROWTH_RANGE_OPTIONS: { value: GrowthRange; label: AdminLabel }[] = [
  { value: "7d", label: { ar: "آخر 7 أيام", en: "Last 7 days" } },
  { value: "1m", label: { ar: "آخر شهر", en: "Last month" } },
  { value: "6m", label: { ar: "آخر 6 أشهر", en: "Last 6 months" } },
];

// Company "effort" comparison for the admin dashboard's bar chart — number
// of programs each company has published on the platform, cumulative over
// the selected time range. Only the "last 6 months" baseline is authored by
// hand; the other ranges are derived by scaling that baseline, since a
// longer look-back window always accumulates more (and a shorter one less).
interface AdminCompanyEffortPoint {
  company: AdminLabel;
  programs6m: number;
}

type CompanyEffortsRange = "7d" | "1m" | "6m" | "1y";

const ADMIN_COMPANY_EFFORTS_BASE: AdminCompanyEffortPoint[] = [
  { company: { ar: "شركة التقدم", en: "Al-Taqadum Co." }, programs6m: 70 },
  { company: { ar: "شركة الإبداع", en: "Al-Ibda Co." }, programs6m: 55 },
  { company: { ar: "شركة الريادة", en: "Riyada Co." }, programs6m: 50 },
  { company: { ar: "شركة المستقبل", en: "Al-Mustaqbal Co." }, programs6m: 65 },
  { company: { ar: "شركة التميز", en: "Al-Tamayoz Co." }, programs6m: 90 },
  { company: { ar: "شركة الابتكار", en: "Al-Ibtikar Co." }, programs6m: 67 },
  { company: { ar: "شركة النمو", en: "Al-Numou Co." }, programs6m: 38 },
  { company: { ar: "شركة التنمية", en: "Al-Tanmiya Co." }, programs6m: 70 },
  { company: { ar: "شركة النجاح", en: "Al-Najah Co." }, programs6m: 54 },
  { company: { ar: "شركة التفوق", en: "Al-Tafawwuq Co." }, programs6m: 60 },
  { company: { ar: "شركة القصوى", en: "Al-Quswa Co." }, programs6m: 35 },
  { company: { ar: "شركة القمة", en: "Al-Qimma Co." }, programs6m: 20 },
];

const COMPANY_EFFORTS_RANGE_MULTIPLIERS: Record<CompanyEffortsRange, number> = {
  "7d": 0.18,
  "1m": 0.45,
  "6m": 1,
  "1y": 1.85,
};

const COMPANY_EFFORTS_RANGE_OPTIONS: { value: CompanyEffortsRange; label: AdminLabel }[] = [
  { value: "7d", label: { ar: "آخر 7 أيام", en: "Last 7 days" } },
  { value: "1m", label: { ar: "آخر شهر", en: "Last month" } },
  { value: "6m", label: { ar: "آخر 6 أشهر", en: "Last 6 months" } },
  { value: "1y", label: { ar: "آخر سنة", en: "Last year" } },
];

function getCompanyEffortsData(range: CompanyEffortsRange) {
  const multiplier = COMPANY_EFFORTS_RANGE_MULTIPLIERS[range];
  return ADMIN_COMPANY_EFFORTS_BASE.map((row) => ({
    company: row.company,
    programs: Math.round(row.programs6m * multiplier),
  }));
}

// Platform-wide cumulative program achievement (all companies + trainers
// combined) for the admin dashboard's 3-line chart — same shape/behavior as
// the student dashboard's cumulative activities chart, scaled to platform
// totals. Every value is >= the previous one, per type.
interface AdminPlatformProgressPoint {
  label: AdminLabel;
  course: number;
  camp: number;
  competition: number;
}

const ADMIN_PLATFORM_PROGRESS_DATA: AdminPlatformProgressPoint[] = [
  { label: { ar: "يناير", en: "Jan" }, course: 12, camp: 5, competition: 3 },
  { label: { ar: "فبراير", en: "Feb" }, course: 22, camp: 9, competition: 6 },
  { label: { ar: "مارس", en: "Mar" }, course: 34, camp: 14, competition: 9 },
  { label: { ar: "أبريل", en: "Apr" }, course: 48, camp: 20, competition: 13 },
  { label: { ar: "مايو", en: "May" }, course: 61, camp: 26, competition: 17 },
  { label: { ar: "يونيو", en: "Jun" }, course: 75, camp: 32, competition: 21 },
  { label: { ar: "يوليو", en: "Jul" }, course: 89, camp: 38, competition: 25 },
  { label: { ar: "أغسطس", en: "Aug" }, course: 103, camp: 44, competition: 29 },
  { label: { ar: "سبتمبر", en: "Sep" }, course: 118, camp: 51, competition: 34 },
  { label: { ar: "أكتوبر", en: "Oct" }, course: 132, camp: 57, competition: 38 },
  { label: { ar: "نوفمبر", en: "Nov" }, course: 145, camp: 63, competition: 42 },
  { label: { ar: "ديسمبر", en: "Dec" }, course: 160, camp: 70, competition: 47 },
];

// Plural line-legend names for the platform progress chart (ADMIN_LABELS'
// course/camp/competition are singular, used for single-item badges).
const ADMIN_PROGRAM_TYPE_PLURAL_LABELS: Record<"course" | "camp" | "competition", AdminLabel> = {
  course: { ar: "الدورات", en: "Courses" },
  camp: { ar: "المعسكرات", en: "Bootcamps" },
  competition: { ar: "المسابقات", en: "Competitions" },
};

function formatDashboardNumber(value: number) {
  return value.toLocaleString("en-US");
}

function calculatePercentage(value: number, total: number) {
  if (total <= 0) return 0;
  return Math.round((value / total) * 100);
}

// ── admin: program management ────────────────────────────────────────────────
// Program catalogue data for the "إدارة البرامج" management page, plus the
// program-type vocab (course/camp/competition) shared by the dashboard's
// distribution chart and every page that lists programs.

const PROGRAM_TYPES: string[] = ["course", "camp", "competition"];

const PROGRAM_MANAGEMENT_TYPES = ["course", "camp", "competition"];

// Product catalogue lifecycle status re-read as the admin publish workflow.
const ADMIN_PROGRAM_STATUS_BY_PRODUCT_STATUS: Record<string, string> = {
  open: "published",
  soon: "pendingApproval",
  full: "completed",
  closed: "rejected",
};

// Every course/camp/competition already on the platform, reshaped for the
// "إدارة البرامج" management table — derived from the real catalogue so it
// stays in sync instead of duplicating the data by hand.
const ADMIN_PROGRAMS: AdminProgram[] = Object.values(PRODUCTS)
  .filter((product) => PROGRAM_MANAGEMENT_TYPES.includes(product.type))
  .map((product) => ({
    id: product.id,
    title: product.title,
    type: product.type,
    typeLabel: PRODUCT_TYPE_LABELS[product.type],
    submittedBy: product.provider,
    dateAdded: product.deadline,
    registeredCount: product.seats.total - product.seats.remaining,
    status: ADMIN_PROGRAM_STATUS_BY_PRODUCT_STATUS[product.status] ?? "published",
    price: product.pricing.isFree ? 0 : product.pricing.price,
    seats: product.seats.total,
    description: product.tagline ?? "",
    image: product.image ?? null,
    about: product.description ?? "",
    outcomes: product.outcomes?.skills ?? [],
    curriculum: product.curriculum ?? product.schedule ?? [],
  }));

// Counts ADMIN_PROGRAMS by type for the pie chart — translation (`name`) is
// left to the caller via `t()` since it needs to stay reactive to language
// changes, unlike this plain count which doesn't.
function getProgramDistribution() {
  const counts: Record<string, number> = {};
  for (const program of ADMIN_PROGRAMS) {
    counts[program.type] = (counts[program.type] ?? 0) + 1;
  }
  return PROGRAM_TYPES
    .map((type) => ({ type, value: counts[type] ?? 0 }))
    .filter((row) => row.value > 0);
}

// Shared by every page that lists course/camp/competition programs
// (ProgramManagement, ApprovalRequests) so the type→tone mapping stays in
// one place instead of being redefined per page.
const PROGRAM_TYPE_TONES: Record<string, string> = { course: "sky", camp: "emerald", competition: "violet" };

const PROGRAM_STATUS_TONES: Record<string, string> = {
  published: "emerald",
  pendingApproval: "amber",
  completed: "sky",
  rejected: "rose",
};

const PROGRAM_SORT_OPTIONS = [
  { value: "newest", label: adminTranslations.programs.sortNewest },
  { value: "oldest", label: adminTranslations.programs.sortOldest },
];

const PROGRAM_STATUS_FILTER_OPTION_ALL = { value: "all", label: adminTranslations.common.allStatuses };

const PROGRAM_MANAGEMENT_COLUMNS = [
  adminTranslations.common.imageColumn,
  adminTranslations.common.programNameLabel,
  adminTranslations.common.programTypeLabel,
  adminTranslations.common.submittedByLabel,
  adminTranslations.common.status,
  adminTranslations.programs.registeredColumn,
  adminTranslations.programs.dateAddedColumn,
  adminTranslations.common.actions,
];

// ── admin: approval requests ──────────────────────────────────────────────────
// Seed rows + list config for the "طلبات الموافقة" (Approval Requests) page —
// program submissions and account join requests awaiting an admin decision.

interface ProgramApprovalRequest {
  id: string;
  name: Translatable;
  type: string;
  // Unlike other Translatable free-text fields, this page never creates new
  // requests with a plain-string submittedBy (only approves/rejects seeded
  // ones), so this stays a strict AdminLabel — ApprovalRequests.tsx reads
  // `.ar` off it directly to build a stable, language-independent filter key.
  submittedBy: AdminLabel;
  date: string;
  status: string;
  about?: Translatable;
  outcomes?: Translatable[];
  curriculum?: AdminProgramModule[];
}

const PROGRAM_APPROVAL_REQUESTS: ProgramApprovalRequest[] = [
  { id: "p1", name: { ar: "أساسيات الأمن السيبراني", en: "Cybersecurity Fundamentals" }, type: "course", submittedBy: { ar: "منظمة التقنية الحديثة", en: "Modern Tech Co." }, date: "2025-07-09", status: "pendingApproval",
    about: { ar: "دورة تأسيسية تغطي مبادئ الأمن السيبراني، أنواع التهديدات، وأساسيات حماية الأنظمة والشبكات.", en: "An introductory course covering cybersecurity fundamentals, threat types, and the basics of protecting systems and networks." },
    outcomes: [{ ar: "فهم المفاهيم الأساسية للأمن السيبراني", en: "Understand core cybersecurity concepts" }, { ar: "التعرف على أنواع الهجمات الشائعة", en: "Recognize common attack types" }, { ar: "تطبيق ممارسات الحماية الأساسية", en: "Apply basic protection practices" }],
    curriculum: [{ title: "مقدمة في الأمن السيبراني", meta: "3 دروس • 90 دقيقة" }, { title: "أنواع التهديدات والهجمات", meta: "4 دروس • ساعتان" }, { title: "أساسيات حماية الشبكات", meta: "3 دروس • ساعتان" }] },
  { id: "p2", name: { ar: "معسكر تطوير الويب", en: "Web Development Camp" }, type: "camp", submittedBy: { ar: "مركز الإبداع", en: "Creativity Center" }, date: "2025-07-08", status: "pendingApproval",
    about: { ar: "معسكر مكثف يجمع بين التعلّم التطبيقي وبناء مشروع ويب متكامل ضمن فريق.", en: "An intensive camp combining hands-on learning with building a complete web project as a team." },
    outcomes: [{ ar: "بناء موقع ويب متكامل", en: "Build a complete website" }, { ar: "العمل ضمن فريق تقني", en: "Work within a technical team" }, { ar: "إدارة مشروع صغير", en: "Manage a small project" }],
    curriculum: [{ title: "الأسبوع 1: الأساسيات والتخطيط", meta: "5 أيام • جلسات صباحية" }, { title: "الأسبوع 2: البناء والإطلاق", meta: "5 أيام • عمل على المشروع" }] },
  { id: "p3", name: { ar: "مسابقة الابتكار التقني", en: "Tech Innovation Competition" }, type: "competition", submittedBy: { ar: "جامعة المستقبل", en: "Future University" }, date: "2025-07-07", status: "pendingApproval",
    about: { ar: "مسابقة تنافسية للفرق التقنية لتقديم حلول مبتكرة لمشكلات حقيقية خلال فترة زمنية محددة.", en: "A competitive event for technical teams to pitch innovative solutions to real problems within a set timeframe." },
    outcomes: [{ ar: "تطوير حل تقني قابل للتطبيق", en: "Develop a viable technical solution" }, { ar: "تقديم عرض أمام لجنة تحكيم", en: "Present in front of a judging panel" }],
    curriculum: [{ title: "التسجيل وتشكيل الفرق", meta: "يوم واحد" }, { title: "مرحلة البناء والتطوير", meta: "يومان" }, { title: "العرض النهائي والتحكيم", meta: "يوم واحد" }] },
  { id: "p4", name: { ar: "تحليل البيانات باستخدام Excel", en: "Data Analysis Using Excel" }, type: "course", submittedBy: { ar: "أكاديمية Excel", en: "Excel Academy" }, date: "2025-07-06", status: "pendingApproval",
    about: { ar: "دورة عملية لتعلّم تحليل البيانات وبناء التقارير باستخدام أدوات Excel المتقدمة.", en: "A practical course on data analysis and report building using advanced Excel tools." },
    outcomes: [{ ar: "إتقان الدوال المتقدمة في Excel", en: "Master advanced Excel functions" }, { ar: "بناء لوحات تحكم تفاعلية", en: "Build interactive dashboards" }],
    curriculum: [{ title: "أساسيات تحليل البيانات", meta: "3 دروس • ساعتان" }, { title: "الجداول المحورية والدوال المتقدمة", meta: "4 دروس • 3 ساعات" }] },
  { id: "p5", name: { ar: "معسكر ريادة الأعمال", en: "Entrepreneurship Camp" }, type: "camp", submittedBy: { ar: "مؤسسة ريادة الأعمال", en: "Entrepreneurship Foundation" }, date: "2025-07-05", status: "pendingApproval",
    about: { ar: "معسكر يرافق المشاركين من فكرة المشروع حتى نموذج العمل الأولي وعرضه على مستثمرين.", en: "A camp that guides participants from an initial idea to an early business model and an investor pitch." },
    outcomes: [{ ar: "بناء نموذج عمل أولي", en: "Build an early business model" }, { ar: "تقديم عرض استثماري", en: "Deliver an investor pitch" }],
    curriculum: [{ title: "الأسبوع 1: الفكرة والتخطيط", meta: "5 أيام" }, { title: "الأسبوع 2: النموذج والعرض", meta: "5 أيام" }] },
  { id: "p6", name: { ar: "دورة تصميم واجهات المستخدم", en: "UI Design Course" }, type: "course", submittedBy: { ar: "الأستاذ خالد المطيري", en: "Mr. Khalid Al-Mutairi" }, date: "2025-07-04", status: "pendingApproval",
    about: { ar: "دورة تغطي أساسيات تصميم واجهات المستخدم وتجربة الاستخدام باستخدام أدوات التصميم الحديثة.", en: "A course covering UI/UX design fundamentals using modern design tools." },
    outcomes: [{ ar: "تصميم واجهات مستخدم احترافية", en: "Design professional user interfaces" }, { ar: "بناء نظام تصميم متكامل", en: "Build a complete design system" }],
    curriculum: [{ title: "مبادئ تجربة المستخدم", meta: "3 دروس • ساعتان" }, { title: "تصميم الواجهات باستخدام Figma", meta: "5 دروس • 4 ساعات" }] },
  { id: "p7", name: { ar: "مسابقة البرمجة السريعة", en: "Speed Coding Competition" }, type: "competition", submittedBy: { ar: "نادي الحاسب الآلي", en: "Computer Club" }, date: "2025-07-03", status: "pendingApproval",
    about: { ar: "مسابقة برمجية فردية لحل تحديات خوارزمية ضمن وقت محدد.", en: "An individual coding competition to solve algorithmic challenges within a time limit." },
    outcomes: [{ ar: "تحسين مهارات حل المشكلات", en: "Improve problem-solving skills" }, { ar: "التنافس في بيئة برمجية حقيقية", en: "Compete in a real coding environment" }],
    curriculum: [{ title: "الجولة التصفوية", meta: "ساعتان" }, { title: "الجولة النهائية", meta: "3 ساعات" }] },
  { id: "p8", name: { ar: "معسكر الذكاء الاصطناعي", en: "AI Camp" }, type: "camp", submittedBy: { ar: "منظمة النخبة للتقنية", en: "Elite Tech Co." }, date: "2025-07-02", status: "pendingApproval",
    about: { ar: "معسكر تطبيقي يقدّم أساسيات الذكاء الاصطناعي وتعلّم الآلة من خلال مشاريع عملية.", en: "A hands-on camp introducing AI and machine learning fundamentals through practical projects." },
    outcomes: [{ ar: "بناء نموذج تعلّم آلي بسيط", en: "Build a simple machine learning model" }, { ar: "فهم أساسيات الذكاء الاصطناعي", en: "Understand AI fundamentals" }],
    curriculum: [{ title: "مقدمة في الذكاء الاصطناعي", meta: "3 دروس • ساعتان" }, { title: "مشروع تعلّم آلي تطبيقي", meta: "4 أيام • عمل على مشروع" }] },
];

interface UserApprovalRequest {
  id: string;
  name: Translatable;
  email: string;
  accountType: string;
  date: string;
  status: string;
}

const USER_APPROVAL_REQUESTS: UserApprovalRequest[] = [
  { id: "r1", name: { ar: "منظمة حلول رقمية", en: "Digital Solutions Co." }, email: "info@digital-solutions.com", accountType: "company", date: "2025-07-09", status: "pendingApproval" },
  { id: "r2", name: { ar: "أحمد محمد", en: "Ahmed Mohammed" }, email: "ahmed@example.com", accountType: "trainer", date: "2025-07-08", status: "pendingApproval" },
  { id: "r3", name: { ar: "سارة خالد", en: "Sara Khalid" }, email: "sara@example.com", accountType: "trainer", date: "2025-07-07", status: "pendingApproval" },
  { id: "r4", name: { ar: "منصة الابتكار", en: "Innovation Platform" }, email: "contact@ebtikar.com", accountType: "company", date: "2025-07-06", status: "pendingApproval" },
  { id: "r5", name: { ar: "خالد الزهراني", en: "Khalid Al-Zahrani" }, email: "khalid.z@example.com", accountType: "trainer", date: "2025-07-05", status: "pendingApproval" },
  { id: "r6", name: { ar: "منظمة رواد المستقبل", en: "Future Pioneers Co." }, email: "hello@ruwad.com", accountType: "company", date: "2025-07-04", status: "pendingApproval" },
];

// Covers both request kinds so one search + one type dropdown can filter
// Program Requests (by course/camp/competition) and Join Requests (by
// trainer/organization) at the same time — each table only applies the
// values that are relevant to it.
const APPROVAL_TYPE_FILTERS = [
  { value: "all", label: adminTranslations.common.allTypes },
  { value: "course", label: ADMIN_LABELS.course },
  { value: "camp", label: ADMIN_LABELS.camp },
  { value: "competition", label: ADMIN_LABELS.competition },
  { value: "trainer", label: ADMIN_LABELS.trainer },
  { value: "company", label: ADMIN_LABELS.company },
];

const APPROVAL_PROGRAM_TYPE_VALUES: string[] = ["course", "camp", "competition"];
const APPROVAL_ACCOUNT_TYPE_VALUES: string[] = ["trainer", "company"];

const APPROVAL_PROGRAM_COLUMNS = [
  adminTranslations.common.programTypeLabel,
  adminTranslations.common.programNameLabel,
  adminTranslations.common.submittedByLabel,
  adminTranslations.common.requestDateLabel,
  adminTranslations.common.status,
  adminTranslations.common.actions,
];

const APPROVAL_USER_COLUMNS = [
  adminTranslations.common.accountType,
  adminTranslations.approvalRequestDetail.userOrgNameLabel,
  adminTranslations.common.email,
  adminTranslations.common.registrationDateLabel,
  adminTranslations.common.status,
  adminTranslations.common.actions,
];

// ── admin: user management ───────────────────────────────────────────────────
// Registered platform accounts + list config for the "إدارة المستخدمين" page.

interface AdminUserRecord {
  id: string;
  name: Translatable;
  email: string;
  role: string;
  joinDate: string;
  status: string;
}

const ADMIN_USERS: AdminUserRecord[] = [
  { id: "usr1", name: { ar: "سارة العتيبي", en: "Sara Al-Otaibi" }, email: "sara.alotaibi@example.com", role: "student", joinDate: "2026-02-14", status: "active" },
  { id: "usr2", name: { ar: "الأستاذ خالد المطيري", en: "Mr. Khalid Al-Mutairi" }, email: "khalid.mutairi@example.com", role: "trainer", joinDate: "2026-01-20", status: "active" },
  { id: "usr3", name: { ar: "منظمة النخبة للتقنية", en: "Elite Tech Co." }, email: "info@elite-tech.com", role: "company", joinDate: "2025-11-05", status: "active" },
  { id: "usr4", name: { ar: "خولة المعلم", en: "Khawla Al-Muallim" }, email: "khawla.muallim@example.com", role: "trainer", joinDate: "2026-03-02", status: "active" },
  { id: "usr5", name: { ar: "عبدالعزيز الحربي", en: "Abdulaziz Al-Harbi" }, email: "abdulaziz.harbi@example.com", role: "student", joinDate: "2026-04-18", status: "blocked" },
  { id: "usr6", name: { ar: "كبسولة تحول", en: "Capsule Tahawul" }, email: "partnerships@capsule.sa", role: "company", joinDate: "2025-09-30", status: "active" },
  { id: "usr7", name: { ar: "هند العتيبي", en: "Hind Al-Otaibi" }, email: "hind.alotaibi@example.com", role: "trainer", joinDate: "2026-05-11", status: "onHold" },
  { id: "usr8", name: { ar: "محمد الدوسري", en: "Mohammed Al-Dosari" }, email: "mohammed.dosari@example.com", role: "student", joinDate: "2026-06-01", status: "active" },
];

const USER_ROLE_OPTIONS = [
  { value: "student", label: ADMIN_LABELS.student },
  { value: "trainer", label: ADMIN_LABELS.trainer },
  { value: "company", label: ADMIN_LABELS.company },
];
const USER_STATUS_OPTIONS = [
  { value: "active", label: ADMIN_LABELS.active },
  { value: "onHold", label: ADMIN_LABELS.onHold },
  { value: "blocked", label: ADMIN_LABELS.blocked },
];

// Individual accounts (student/trainer) can only swap between each other when
// editing — an organization account is a different kind of entity entirely,
// so it can't be converted to/from an individual account via this form.
const USER_INDIVIDUAL_ROLES: string[] = ["student", "trainer"];

const USER_ROLE_TONES: Record<string, string> = { student: "teal", trainer: "violet", company: "emerald" };
const USER_ROLE_ICONS: Record<string, string> = { student: "graduation", trainer: "user", company: "building" };
const USER_STATUS_TONES: Record<string, string> = { active: "emerald", onHold: "amber", blocked: "rose" };

const USER_ROLE_FILTER_OPTIONS = [{ value: "all", label: adminTranslations.common.allTypes }, ...USER_ROLE_OPTIONS];
const USER_STATUS_FILTER_OPTIONS = [{ value: "all", label: adminTranslations.common.allStatuses }, ...USER_STATUS_OPTIONS];

const USER_COLUMNS = [
  adminTranslations.users.userNameColumn,
  adminTranslations.common.accountType,
  adminTranslations.common.email,
  adminTranslations.common.status,
  adminTranslations.users.joinDateColumn,
  adminTranslations.common.actions,
];

// Reuses the platform-wide counts already shown on the admin dashboard so the
// two pages never disagree on how many students/trainers/companies exist.
function statCardValue(key: string) {
  return ADMIN_STAT_CARDS.find((stat) => stat.key === key)?.value ?? 0;
}

const usersStudents = statCardValue("students");
const usersTrainers = statCardValue("trainers");
const usersCompanies = statCardValue("companies");

const USER_STAT_CARDS = [
  { key: "total", label: adminTranslations.users.totalUsersLabel, value: usersStudents + usersTrainers + usersCompanies, tone: "teal", icon: "users" },
  { key: "students", label: ADMIN_LABELS.student, value: usersStudents, tone: "green", icon: "graduation" },
  { key: "trainers", label: ADMIN_LABELS.trainer, value: usersTrainers, tone: "teal", icon: "user" },
  { key: "companies", label: ADMIN_LABELS.company, value: usersCompanies, tone: "green", icon: "building" },
];

// ── admin: reports / analytics ───────────────────────────────────────────────
// Section/type/status vocab + seed rows + list config for the "التقارير"
// (Reports/Analytics) page. Reports only ever come from trainers or
// companies — no other source submits them.

interface AdminReport {
  id: string;
  title: Translatable;
  subtitle: Translatable;
  section: string;
  type: string;
  createdDate: string;
  status: string;
  attachmentName?: string | null;
}

const ADMIN_REPORTS: AdminReport[] = [
  { id: "rep1", title: { ar: "تقرير أداء برنامج تطوير المهارات الرقمية", en: "Digital Skills Development Program Performance Report" }, subtitle: { ar: "الربع الثاني 2025", en: "Q2 2025" }, section: "sectionCompanies", type: "reportPerformance", createdDate: "2025-07-09", status: "completed" },
  { id: "rep2", title: { ar: "تقرير معسكر ريادة الأعمال", en: "Entrepreneurship Camp Report" }, subtitle: { ar: "معسكر الصيف 2025", en: "Summer 2025 Camp" }, section: "sectionTrainers", type: "reportFinal", createdDate: "2025-07-08", status: "underReview" },
  { id: "rep3", title: { ar: "تقرير مسابقة الإبتكار التقني", en: "Tech Innovation Competition Report" }, subtitle: { ar: "الدورة الأولى", en: "First Edition" }, section: "sectionCompanies", type: "reportPerformance", createdDate: "2025-07-07", status: "completed" },
  { id: "rep4", title: { ar: "تقرير جلسات التدريب الأسبوعية", en: "Weekly Training Sessions Report" }, subtitle: { ar: "شهر يونيو 2025", en: "June 2025" }, section: "sectionTrainers", type: "reportTrainer", createdDate: "2025-07-06", status: "underReview" },
  { id: "rep5", title: { ar: "تقرير المتدربين الجدد", en: "New Trainees Report" }, subtitle: { ar: "النصف الأول 2025", en: "First Half 2025" }, section: "sectionCompanies", type: "reportPerformance", createdDate: "2025-07-05", status: "completed" },
  { id: "rep6", title: { ar: "تقرير متابعة أداء المدربين", en: "Trainer Performance Follow-up Report" }, subtitle: { ar: "2025", en: "2025" }, section: "sectionTrainers", type: "reportTrainer", createdDate: "2025-07-04", status: "completed" },
];

const ADMIN_REPORT_SECTIONS: string[] = ["sectionTrainers", "sectionCompanies"];
const ADMIN_REPORT_TYPES: string[] = ["reportPerformance", "reportTrainer", "reportFinal"];
const ADMIN_REPORT_STATUSES: string[] = ["completed", "underReview"];

const REPORT_STATUS_TONES: Record<string, string> = {
  completed: "emerald",
  underReview: "amber",
};

const REPORT_TYPE_OPTIONS = [
  { value: "all", label: adminTranslations.reports.reportTypesAll },
  ...ADMIN_REPORT_TYPES.map((type) => ({ value: type, label: ADMIN_LABELS[type] })),
];
const REPORT_STATUS_OPTIONS = [
  { value: "all", label: adminTranslations.common.allStatuses },
  ...ADMIN_REPORT_STATUSES.map((status) => ({ value: status, label: ADMIN_LABELS[status] })),
];

const REPORT_COLUMNS = [
  adminTranslations.reports.reportTitleColumn,
  adminTranslations.reports.sectionColumn,
  adminTranslations.reports.reportTypeColumn,
  adminTranslations.reports.createdDateColumn,
  adminTranslations.common.status,
  adminTranslations.common.actions,
];

// ── admin: complaints ─────────────────────────────────────────────────────────
// Seed rows + list config for the "الشكاوى و الاستفسارات" page.

interface AdminComplaint {
  id: number;
  title: Translatable;
  excerpt: Translatable;
  details: Translatable;
  userName: Translatable;
  userRole: string;
  category: string;
  priority: string;
  sentDate: string;
  sentTime: Translatable;
  status: string;
  attachment: boolean;
  replyText?: string;
}

const ADMIN_COMPLAINTS: AdminComplaint[] = [
  { id: 56, title: { ar: "مشكلة في التسجيل في المعسكر", en: "Issue registering for the camp" }, excerpt: { ar: "لا أستطيع إكمال عملية التسجيل...", en: "I can't complete the registration process..." }, details: { ar: "لا أستطيع إكمال عملية التسجيل في المعسكر، تظهر لي رسالة خطأ عند الضغط على زر التأكيد في الخطوة الأخيرة.", en: "I can't complete registration for the camp — I get an error message when I click the confirm button on the last step." }, userName: { ar: "أحمد محمد", en: "Ahmed Mohammed" }, userRole: "student", category: "catCamps", priority: "priorityHigh", sentDate: "2025-07-09", sentTime: { ar: "10:30 ص", en: "10:30 AM" }, status: "awaitingReply", attachment: true },
  { id: 55, title: { ar: "اقتراح ميزة جديدة", en: "Suggestion for a new feature" }, excerpt: { ar: "أقترح إضافة خاصية التقييم بعد...", en: "I suggest adding a rating feature after..." }, details: { ar: "أقترح إضافة خاصية التقييم بعد انتهاء كل جلسة تدريبية مباشرة، بدلاً من الاكتفاء بتقييم واحد بعد إتمام البرنامج كاملاً.", en: "I suggest adding a rating feature right after each live training session, instead of a single rating after finishing the whole program." }, userName: { ar: "سارة خالد", en: "Sara Khalid" }, userRole: "trainer", category: "catPrograms", priority: "priorityMedium", sentDate: "2025-07-08", sentTime: { ar: "04:15 م", en: "4:15 PM" }, status: "replied", attachment: false },
  { id: 54, title: { ar: "لا يعمل رابط الدورة", en: "Course link doesn't work" }, excerpt: { ar: "عند الضغط على رابط الدورة لا...", en: "When I click the course link, nothing..." }, details: { ar: "عند الضغط على رابط الدورة لا يفتح شيء، جربت من أكثر من متصفح ونفس المشكلة تتكرر معي.", en: "When I click the course link nothing opens. I tried more than one browser and the same problem keeps happening." }, userName: { ar: "محمد عبدالله", en: "Mohammed Abdullah" }, userRole: "student", category: "catCourses", priority: "priorityHigh", sentDate: "2025-07-08", sentTime: { ar: "11:20 ص", en: "11:20 AM" }, status: "closed", attachment: true },
  { id: 53, title: { ar: "مشكلة في تحميل الشهادة", en: "Problem downloading the certificate" }, excerpt: { ar: "بعد إتمام البرنامج لا أستطيع...", en: "After finishing the program I can't..." }, details: { ar: "بعد إتمام البرنامج لا أستطيع تحميل الشهادة، الزر موجود لكن لا يحدث شيء عند الضغط عليه.", en: "After finishing the program I can't download the certificate. The button is there but nothing happens when I click it." }, userName: { ar: "نورة علي", en: "Noura Ali" }, userRole: "student", category: "catCertificates", priority: "priorityMedium", sentDate: "2025-07-07", sentTime: { ar: "09:45 ص", en: "9:45 AM" }, status: "replied", attachment: false },
  { id: 52, title: { ar: "اقتراح شراكة مع جهة تدريبية", en: "Suggestion to partner with a training provider" }, excerpt: { ar: "نقترح التعاون مع جهة تدريبية...", en: "We suggest partnering with a training provider..." }, details: { ar: "نقترح التعاون مع جهة تدريبية متخصصة في مجال ريادة الأعمال لتقديم برامج مشتركة على المنصة.", en: "We suggest partnering with a training provider specialized in entrepreneurship to offer joint programs on the platform." }, userName: { ar: "فهد العتيبي", en: "Fahad Al-Otaibi" }, userRole: "company", category: "catPartnerships", priority: "priorityLow", sentDate: "2025-07-06", sentTime: { ar: "02:30 م", en: "2:30 PM" }, status: "closed", attachment: false },
  { id: 51, title: { ar: "بيانات غير صحيحة في الملف", en: "Incorrect data in the profile" }, excerpt: { ar: "هناك خطأ في بيانات الملف الشخصي", en: "There's an error in the profile data" }, details: { ar: "هناك خطأ في بيانات الملف الشخصي، الاسم المعروض لا يطابق الاسم الذي سجّلت به، وأرفقت صورة توضح المشكلة.", en: "There's an error in the profile data — the displayed name doesn't match the name I registered with, and I attached a screenshot showing the issue." }, userName: { ar: "ريم عبدالله", en: "Reem Abdullah" }, userRole: "student", category: "catUsers", priority: "priorityMedium", sentDate: "2025-07-05", sentTime: { ar: "01:10 م", en: "1:10 PM" }, status: "reopened", attachment: true },
];

const ADMIN_COMPLAINT_CATEGORIES: string[] = ["catCamps", "catCourses", "catCertificates", "catPartnerships", "catUsers"];
const ADMIN_COMPLAINT_PRIORITIES: string[] = ["priorityHigh", "priorityMedium", "priorityLow"];
const ADMIN_COMPLAINT_STATUSES: string[] = ["awaitingReply", "replied", "closed", "reopened"];

const COMPLAINT_STATUS_TONES: Record<string, string> = {
  awaitingReply: "amber",
  replied: "emerald",
  closed: "gray",
  reopened: "sky",
};

const COMPLAINT_CATEGORY_OPTIONS = [
  { value: "all", label: adminTranslations.complaints.allCategories },
  ...ADMIN_COMPLAINT_CATEGORIES.map((category) => ({ value: category, label: ADMIN_LABELS[category] })),
];
const COMPLAINT_STATUS_OPTIONS = [
  { value: "all", label: adminTranslations.common.allStatuses },
  ...ADMIN_COMPLAINT_STATUSES.map((status) => ({ value: status, label: ADMIN_LABELS[status] })),
];

const COMPLAINT_COLUMNS = [
  adminTranslations.complaints.complaintNumberColumn,
  adminTranslations.complaints.titleColumn,
  adminTranslations.complaints.userColumn,
  adminTranslations.complaints.categoryColumn,
  adminTranslations.complaints.sentDateColumn,
  adminTranslations.common.status,
  adminTranslations.common.actions,
];

// ── admin: news & events ──────────────────────────────────────────────────────
// Seed rows + list config for the "الأخبار والفعاليات" page (management list
// + editor).

interface AdminNewsEvent {
  id: string;
  title: Translatable;
  type: "news" | "event";
  date: string;
  status: "published" | "draft";
  excerpt: Translatable;
  image: string | null;
}

// Shared by the news/event list filter and the add/edit editor's type select.
const NEWS_EVENT_TYPE_OPTIONS: { value: "news" | "event"; label: AdminLabel }[] = [
  { value: "news", label: ADMIN_LABELS.news },
  { value: "event", label: ADMIN_LABELS.event },
];

const ADMIN_NEWS_EVENTS: AdminNewsEvent[] = [
  { id: "ne1", title: { ar: "انطلاق النسخة الثانية من مسابقة الابتكار التقني", en: "Second edition of the Tech Innovation Competition kicks off" }, type: "event", date: "2026-08-10", status: "published", excerpt: { ar: "تسجيل المشاركين مفتوح الآن لجميع المتدربين.", en: "Registration is now open to all trainees." }, image: null },
  { id: "ne2", title: { ar: "شراكة جديدة مع أكاديمية Excel", en: "New partnership with Excel Academy" }, type: "news", date: "2026-07-02", status: "published", excerpt: { ar: "توسيع نطاق الدورات المتاحة على المنصة.", en: "Expanding the range of courses available on the platform." }, image: null },
  { id: "ne3", title: { ar: "معسكر الذكاء الاصطناعي الصيفي", en: "Summer AI Camp" }, type: "event", date: "2026-08-25", status: "published", excerpt: { ar: "تفاصيل المعسكر قيد الإعداد.", en: "Camp details are being finalized." }, image: null },
  { id: "ne4", title: { ar: "تحديث سياسة الشهادات المعتمدة", en: "Update to the accredited certificates policy" }, type: "news", date: "2026-06-18", status: "published", excerpt: { ar: "تغييرات على آلية إصدار الشهادات.", en: "Changes to how certificates are issued." }, image: null },
];

const NEWS_EVENTS_TYPE_FILTER_OPTIONS = [{ value: "all", label: adminTranslations.common.allTypes }, ...NEWS_EVENT_TYPE_OPTIONS];
const NEWS_EVENTS_TYPE_TONES: Record<string, string> = { news: "sky", event: "emerald" };
const NEWS_EVENTS_STATUS_TONES: Record<string, string> = { published: "emerald", draft: "amber" };

const NEWS_EVENTS_COLUMNS = [
  adminTranslations.common.imageColumn,
  adminTranslations.newsEvents.titleColumn,
  adminTranslations.newsEvents.typeLabel,
  adminTranslations.common.date,
  adminTranslations.common.status,
  adminTranslations.common.actions,
];

const NEWS_EVENT_EDITOR_TYPE_TONES: Record<string, string> = { news: "bg-sky-500", event: "bg-emerald-500" };

// ── admin: notifications ──────────────────────────────────────────────────────
// Seed rows + list config for the "الإشعارات" page.

const ADMIN_NOTIFICATION_TYPES: string[] = ["request", "complaint", "program", "system", "inquiry"];

interface AdminNotification {
  id: string;
  title: Translatable;
  message: Translatable;
  type: string;
  time: Translatable;
  read: boolean;
}

const ADMIN_NOTIFICATIONS: AdminNotification[] = [
  { id: "n1", title: { ar: "طلب منظمة جديد", en: "New organization request" }, message: { ar: "قدّمت منظمة حلول رقمية طلب انضمام جديد للمنصة.", en: "Digital Solutions Co. submitted a new request to join the platform." }, type: "request", time: { ar: "منذ 10 دقائق", en: "10 minutes ago" }, read: false },
  { id: "n2", title: { ar: "مدرب جديد سجل", en: "New trainer signed up" }, message: { ar: "انضم أحمد محمد كمدرب جديد وينتظر المراجعة.", en: "Ahmed Mohammed joined as a new trainer and is awaiting review." }, type: "request", time: { ar: "منذ 25 دقيقة", en: "25 minutes ago" }, read: false },
  { id: "n3", title: { ar: "شكوى جديدة من متدرب", en: "New complaint from a trainee" }, message: { ar: "أرسل أحمد محمد شكوى بخصوص مشكلة في التسجيل.", en: "Ahmed Mohammed sent a complaint about a registration issue." }, type: "complaint", time: { ar: "منذ ساعة", en: "1 hour ago" }, read: false },
  { id: "n4", title: { ar: "برنامج جديد تمت إضافته", en: "New program added" }, message: { ar: "تمت إضافة معسكر تطبيقات الذكاء الاصطناعي إلى المنصة.", en: "The AI Applications Camp was added to the platform." }, type: "program", time: { ar: "منذ ساعتين", en: "2 hours ago" }, read: true },
  { id: "n5", title: { ar: "طلب برنامج بانتظار الموافقة", en: "Program request awaiting approval" }, message: { ar: "دورة تصميم واجهات المستخدم المتقدم بانتظار موافقتك.", en: "The Advanced UI Design Course is awaiting your approval." }, type: "program", time: { ar: "منذ 3 ساعات", en: "3 hours ago" }, read: true },
  { id: "n6", title: { ar: "تحديث في النظام", en: "System update" }, message: { ar: "تم تحديث سياسة الخصوصية على المنصة.", en: "The platform's privacy policy has been updated." }, type: "system", time: { ar: "أمس", en: "Yesterday" }, read: true },
  { id: "n7", title: { ar: "شكوى تمت إعادة فتحها", en: "Complaint reopened" }, message: { ar: "أعاد ريم عبدالله فتح شكوى بيانات الملف الشخصي.", en: "Reem Abdullah reopened the profile data complaint." }, type: "complaint", time: { ar: "أمس", en: "Yesterday" }, read: true },
  { id: "n8", title: { ar: "نسخة احتياطية مكتملة", en: "Backup completed" }, message: { ar: "تم إنشاء نسخة احتياطية جديدة لقاعدة بيانات المنصة.", en: "A new backup of the platform database was created." }, type: "system", time: { ar: "منذ يومين", en: "2 days ago" }, read: true },
  { id: "n9", title: { ar: "استفسار جديد من مدرب", en: "New inquiry from a trainer" }, message: { ar: "استفسر خالد المطيري عن آلية احتساب ساعات التدريب.", en: "Khalid Al-Mutairi asked about how training hours are calculated." }, type: "inquiry", time: { ar: "منذ 4 ساعات", en: "4 hours ago" }, read: false },
];

const NOTIFICATION_TYPE_TONES: Record<string, string> = { request: "amber", complaint: "rose", program: "sky", system: "violet", inquiry: "emerald" };
const NOTIFICATION_TYPE_ICONS: Record<string, string> = { request: "clipboard", complaint: "chat", program: "grid", system: "bell", inquiry: "search" };

const NOTIFICATION_TYPE_FILTER_OPTIONS = [
  { value: "all", label: adminTranslations.common.allTypes },
  ...ADMIN_NOTIFICATION_TYPES.map((type) => ({ value: type, label: ADMIN_LABELS[type] })),
];
const NOTIFICATION_STATUS_FILTER_OPTIONS = [
  { value: "all", label: adminTranslations.notifications.allStatus },
  { value: "unread", label: adminTranslations.notifications.unreadFilter },
  { value: "read", label: adminTranslations.notifications.readFilter },
];

// ── admin: schedule ────────────────────────────────────────────────────────────
// Seed rows + list config for the "جدول الإدارة" calendar page.

interface AdminScheduleRecurrenceOption {
  value: string;
  label: AdminLabel;
}

const ADMIN_SCHEDULE_RECURRENCE_OPTIONS: AdminScheduleRecurrenceOption[] = [
  { value: "none", label: { ar: "لا يتكرر", en: "Does not repeat" } },
  { value: "daily", label: { ar: "يومي", en: "Daily" } },
  { value: "weekly", label: { ar: "أسبوعي", en: "Weekly" } },
  { value: "monthly", label: { ar: "شهري", en: "Monthly" } },
  { value: "yearly", label: { ar: "سنوي", en: "Yearly" } },
];

interface AdminScheduleTask {
  id: string;
  title: Translatable;
  date: string;
  recurrence: string;
  notes: Translatable;
  // Clock time ("HH:MM", 24h) the task starts at, plus its length — drive the
  // Day/Week hourly grid (Google Calendar–style). Tasks without a startTime
  // render in the grid's "طوال اليوم" (all-day) row instead of a timed block.
  startTime?: string;
  durationMinutes?: number;
}

const ADMIN_SCHEDULE_TASKS: AdminScheduleTask[] = [
  { id: "t1", title: { ar: "اجتماع فريق الإدارة", en: "Admin team meeting" }, date: "2026-07-05", recurrence: "weekly", notes: { ar: "متابعة أسبوعية لطلبات الموافقة.", en: "Weekly follow-up on approval requests." }, startTime: "10:00", durationMinutes: 60 },
  { id: "t2", title: { ar: "مراجعة التقارير الشهرية", en: "Monthly reports review" }, date: "2026-07-01", recurrence: "monthly", notes: { ar: "مراجعة تقارير الأداء الشهرية.", en: "Review of monthly performance reports." }, startTime: "13:00", durationMinutes: 90 },
  { id: "t3", title: { ar: "تذكير تجديد التراخيص", en: "License renewal reminder" }, date: "2026-01-15", recurrence: "yearly", notes: { ar: "تجديد ترخيص المنصة السنوي.", en: "Renew the platform's annual license." } },
  { id: "t4", title: { ar: "متابعة الشكاوى الأسبوعية", en: "Weekly complaints follow-up" }, date: "2026-07-02", recurrence: "weekly", notes: { ar: "مراجعة الشكاوى الجديدة والرد عليها كل خميس.", en: "Review new complaints and respond to them every Thursday." }, startTime: "09:00", durationMinutes: 30 },
  { id: "t5", title: { ar: "اجتماع مع منظمة النخبة للتقنية", en: "Meeting with Elite Tech Co." }, date: "2026-07-20", recurrence: "none", notes: { ar: "مناقشة شراكة برامج جديدة.", en: "Discuss a new program partnership." }, startTime: "11:30", durationMinutes: 60 },
];

const SCHEDULE_DURATION_OPTIONS = [
  { value: 30, label: adminTranslations.schedule.duration30 },
  { value: 60, label: adminTranslations.schedule.duration60 },
  { value: 90, label: adminTranslations.schedule.duration90 },
  { value: 120, label: adminTranslations.schedule.duration120 },
  { value: 180, label: adminTranslations.schedule.duration180 },
];

// ── admin: team ────────────────────────────────────────────────────────────────
// Seed rows + list config for the "فريق الإدارة" (Admin Team) page, plus
// TeamMemberForm's invite form.

const COMPANY_EMAIL_DOMAIN = "capsule.sa";

type AdminDepartment = "management" | "support" | "design" | "media" | "hr";

const DEPARTMENT_OPTIONS: { value: AdminDepartment; label: AdminLabel }[] = [
  { value: "management", label: ADMIN_LABELS.departmentManagement },
  { value: "support", label: ADMIN_LABELS.departmentSupport },
  { value: "design", label: ADMIN_LABELS.departmentDesign },
  { value: "media", label: ADMIN_LABELS.departmentMedia },
  { value: "hr", label: ADMIN_LABELS.departmentHr },
];

interface AdminTeamMember {
  id: string;
  name: string;
  email: string;
  department: AdminDepartment;
  jobTitle: string;
  status: "pending" | "active";
  invitedDate: string;
  inviteToken: string;
}

const ADMIN_TEAM_MEMBERS: AdminTeamMember[] = [
  { id: "team1", name: "منيرة القحطاني", email: "monira.qahtani@capsule.sa", department: "management", jobTitle: "مشرف عام", status: "active", invitedDate: "2026-04-02", inviteToken: "seed-team1" },
  { id: "team2", name: "عبدالله الشمري", email: "abdullah.shammari@capsule.sa", department: "media", jobTitle: "مدير إعلام", status: "active", invitedDate: "2026-05-14", inviteToken: "seed-team2" },
  { id: "team3", name: "سارة العتيبي", email: "sara.otaibi@capsule.sa", department: "support", jobTitle: "مسؤول الدعم الفني", status: "pending", invitedDate: "2026-06-20", inviteToken: "seed-team3" },
];

const TEAM_DEPARTMENT_TONES: Record<AdminDepartment, string> = {
  management: "teal", support: "amber", design: "violet", media: "sky", hr: "rose",
};

const TEAM_STATUS_TONES: Record<AdminTeamMember["status"], string> = { active: "emerald", pending: "amber" };

const TEAM_COLUMNS = [
  adminTranslations.users.nameLabel,
  adminTranslations.common.email,
  adminTranslations.team.departmentLabel,
  adminTranslations.team.jobTitleLabel,
  adminTranslations.team.accountStatusColumn,
  adminTranslations.common.actions,
];

// ── dashboard: sample records (Dashboard, company/trainer roles) ────────────
// Sample records shown on the generic Dashboard page and the student pages
// while there's no backend yet.

interface CompletedItem {
  type: string;
  title: string;
  date: string;
}

interface ActivityEntry {
  id: string;
  progress: number;
  applicationStatus?: "approved" | "pending";
}

const COMPLETED_ITEMS: CompletedItem[] = [
  { type: "دورة", title: "أساسيات تطوير الواجهات", date: "2026-04-18" },
  { type: "دورة", title: "مقدمة في React", date: "2026-05-02" },
  { type: "معسكر", title: "معسكر بناء المواقع", date: "2026-05-20" },
  { type: "شهادة", title: "شهادة إنجاز HTML و CSS", date: "2026-06-01" },
];

// The student's in-progress enrollments — pulled from the shared catalogue
// so the activity cards stay in sync with the program details pages.
const CURRENT_ACTIVITIES: ActivityEntry[] = [
  { id: "react-course",               progress: 100, applicationStatus: "approved" },
  { id: "ui-design-course",           progress: 45,  applicationStatus: "approved" },
  { id: "html-css-course",            progress: 100, applicationStatus: "approved" },
  { id: "react-beginners-course",     progress: 20,  applicationStatus: "approved" },
  { id: "js-fundamentals-course",     progress: 70,  applicationStatus: "approved" },
  { id: "project-management-course",  progress: 0,   applicationStatus: "pending"  },
  { id: "frontend-camp",              progress: 30,  applicationStatus: "approved" },
  { id: "ai-apps-camp",               progress: 100, applicationStatus: "approved" },
  { id: "mobile-camp",                progress: 55,  applicationStatus: "approved" },
  { id: "web-competition",            progress: 60,  applicationStatus: "approved" },
  { id: "problem-solving-competition",progress: 100, applicationStatus: "approved" },
];

// ── student dashboard: learning analytics (cumulative activity + interests) ──
// Mock data for the "Learning Analytics" section on the student dashboard —
// a cumulative line chart (completed courses/camps/competitions over time,
// per time-range filter) and a radar chart of interest distribution by
// learning category. Values are illustrative only, not derived from
// COMPLETED_ITEMS/CURRENT_ACTIVITIES above.

type AnalyticsPeriod = "7d" | "1m" | "6m";

interface ActivityProgressData {
  label: string;
  labelEn: string;
  year: number;
  courses: number;
  bootcamps: number;
  competitions: number;
}

interface LearningInterestData {
  category: string;
  categoryEn: string;
  value: number;
}

const ANALYTICS_PERIOD_OPTIONS: { value: AnalyticsPeriod; label: string; labelEn: string }[] = [
  { value: "7d", label: "آخر 7 أيام", labelEn: "Last 7 Days" },
  { value: "1m", label: "آخر شهر",   labelEn: "Last Month" },
  { value: "6m", label: "آخر 6 أشهر", labelEn: "Last 6 Months" },
];

const ACTIVITY_PROGRESS_DATA: Record<AnalyticsPeriod, ActivityProgressData[]> = {
  "7d": [
    { label: "السبت",   labelEn: "Sat", year: 2026, courses: 8,  bootcamps: 2, competitions: 1 },
    { label: "الأحد",    labelEn: "Sun", year: 2026, courses: 8,  bootcamps: 2, competitions: 1 },
    { label: "الاثنين",  labelEn: "Mon", year: 2026, courses: 9,  bootcamps: 2, competitions: 1 },
    { label: "الثلاثاء", labelEn: "Tue", year: 2026, courses: 9,  bootcamps: 3, competitions: 1 },
    { label: "الأربعاء", labelEn: "Wed", year: 2026, courses: 10, bootcamps: 3, competitions: 2 },
    { label: "الخميس",  labelEn: "Thu", year: 2026, courses: 10, bootcamps: 3, competitions: 2 },
    { label: "الجمعة",  labelEn: "Fri", year: 2026, courses: 11, bootcamps: 3, competitions: 2 },
  ],
  "1m": [
    { label: "الأسبوع 1", labelEn: "Week 1", year: 2026, courses: 6,  bootcamps: 1, competitions: 0 },
    { label: "الأسبوع 2", labelEn: "Week 2", year: 2026, courses: 7,  bootcamps: 2, competitions: 1 },
    { label: "الأسبوع 3", labelEn: "Week 3", year: 2026, courses: 9,  bootcamps: 2, competitions: 1 },
    { label: "الأسبوع 4", labelEn: "Week 4", year: 2026, courses: 11, bootcamps: 3, competitions: 2 },
  ],
  "6m": [
    { label: "يناير",  labelEn: "Jan", year: 2026, courses: 2,  bootcamps: 1, competitions: 0 },
    { label: "فبراير", labelEn: "Feb", year: 2026, courses: 5,  bootcamps: 1, competitions: 1 },
    { label: "مارس",   labelEn: "Mar", year: 2026, courses: 7,  bootcamps: 2, competitions: 2 },
    { label: "أبريل",  labelEn: "Apr", year: 2026, courses: 10, bootcamps: 3, competitions: 4 },
    { label: "مايو",   labelEn: "May", year: 2026, courses: 12, bootcamps: 3, competitions: 4 },
    { label: "يونيو",  labelEn: "Jun", year: 2026, courses: 14, bootcamps: 4, competitions: 5 },
  ],
};

const LEARNING_INTEREST_DATA: LearningInterestData[] = [
  { category: "البرمجة",           categoryEn: "Programming",          value: 90 },
  { category: "الذكاء الاصطناعي",   categoryEn: "Artificial Intelligence", value: 70 },
  { category: "علم البيانات",       categoryEn: "Data Science",          value: 60 },
  { category: "الأمن السيبراني",    categoryEn: "Cybersecurity",         value: 30 },
  { category: "تصميم UI/UX",        categoryEn: "UI/UX",                 value: 50 },
  { category: "الأعمال",            categoryEn: "Business",              value: 55 },
  { category: "الحوسبة السحابية",   categoryEn: "Cloud Computing",       value: 40 },
  { category: "المهارات الناعمة",   categoryEn: "Soft Skills",           value: 65 },
];

interface ProgramRequest {
  id: string;
  title: string;
  type: string;
  submittedBy: string;
  date: string;
}

interface UserRequest {
  id: string;
  name: string;
  role: string;
  date: string;
}

interface Complaint {
  id: string;
  name: string;
  userType: string;
  text: string;
  status: string;
}

interface UserGrowthDataPoint {
  label: string;
  Students: number;
  Companies: number;
  Trainers: number;
}

interface ReportItem {
  id: string;
  tag: string;
  title: string;
  date: string;
}

// Currently unused by any page (kept from the original dashboard mock file
// so no seed content is lost during consolidation).
const PENDING_PROGRAM_REQUESTS: ProgramRequest[] = [
  { id: "p1", title: "دورة تصميم واجهات المستخدم المتقدم", type: "دورة", submittedBy: "الأستاذ خالد المطيري", date: "2026-07-01" },
  { id: "p2", title: "معسكر الأمن السيبراني", type: "معسكر", submittedBy: "كبسولة تحول", date: "2026-07-03" },
  { id: "p3", title: "تحدي الذكاء الاصطناعي", type: "مسابقة", submittedBy: "شركة النخبة للتقنية", date: "2026-07-05" },
];

const PENDING_USER_REQUESTS: UserRequest[] = [
  { id: "u1", name: "أحمد الشهري", role: "مدرب", date: "2026-07-01" },
  { id: "u2", name: "شركة رواد المستقبل", role: "شركة", date: "2026-07-02" },
  { id: "u3", name: "سلمى القحطاني", role: "مدرب", date: "2026-07-04" },
  { id: "u4", name: "خالد الزهراني", role: "طالب", date: "2026-07-06" },
];

const COMPLAINTS_SEED: Complaint[] = [
  { id: "c1", name: "عبدالعزيز الحربي", userType: "طالب", text: "لم أتمكن من الوصول لمحتوى الدورة بعد إتمام الدفع.", status: "جديدة" },
  { id: "c2", name: "شركة الرواد التقنية", userType: "شركة", text: "نواجه تأخيراً في اعتماد حساب الشركة على المنصة.", status: "تم الرد" },
  { id: "c3", name: "الأستاذة هند العتيبي", userType: "مدرب", text: "أرغب في تحديث بيانات ملفي التعريفي كمدربة.", status: "جديدة" },
];

const USER_GROWTH_DATA: UserGrowthDataPoint[] = [
  { label: "Jan", Students: 40, Companies: 4, Trainers: 6 },
  { label: "Feb", Students: 58, Companies: 7, Trainers: 9 },
  { label: "Mar", Students: 75, Companies: 10, Trainers: 13 },
  { label: "Apr", Students: 92, Companies: 13, Trainers: 17 },
  { label: "May", Students: 108, Companies: 16, Trainers: 21 },
  { label: "Jun", Students: 120, Companies: 18, Trainers: 24 },
];

const REPORT_ITEMS: ReportItem[] = [
  { id: "r1", tag: "تقرير", title: "تقرير الأداء الشهري", date: "2026-04-30" },
  { id: "r2", tag: "طلب", title: "اعتماد شركة النخبة للتقنية", date: "2026-05-12" },
  { id: "r3", tag: "تقرير", title: "تقرير رضا المستخدمين", date: "2026-05-27" },
  { id: "r4", tag: "طلب", title: "اعتماد مدرب جديد", date: "2026-06-10" },
];

// ── company: dashboard analytics ─────────────────────────────────────────────
// Mock data for the company dashboard's stat cards and recent-activity feed,
// plus the two charts on CompanyProgramAnalytics — a cumulative program
// growth line chart and an enrollment-vs-completion bar chart. Values are
// illustrative only, not derived from company/data.ts's activitiesSeed or
// programsSeed.

interface CompanyDashboardActivity {
  id: number;
  title: string;
  description: string;
  progress: number;
  dueDate: string;
  status: string;
}

const COMPANY_DASHBOARD_STATS: { label: string; value: string }[] = [
  { label: "إجمالي الأنشطة", value: "24" },
  { label: "الأنشطة النشطة", value: "8" },
  { label: "الأنشطة المكتملة", value: "12" },
  { label: "قيد المراجعة", value: "4" },
];

const COMPANY_DASHBOARD_RECENT_ACTIVITIES: CompanyDashboardActivity[] = [
  {
    id: 1,
    title: "ورشة تطوير القيادات",
    description: "جلسة تدريبية أسبوعية مع متابعة الأداء وإصدار الملاحظات.",
    progress: 72,
    dueDate: "2026-07-20",
    status: "قيد التنفيذ",
  },
  {
    id: 2,
    title: "معسكر الابتكار",
    description: "برنامج عملي متكامل لفرق العمل مع تقارير أسبوعية.",
    progress: 100,
    dueDate: "2026-07-10",
    status: "مكتمل",
  },
  {
    id: 3,
    title: "مسابقة تحليل البيانات",
    description: "تقييم نهائي وإرسال النتائج للفائزين.",
    progress: 88,
    dueDate: "2026-07-18",
    status: "قيد المراجعة",
  },
];

// Line chart display mode: either three lines (one per program type) or a
// single combined line (courses + bootcamps + competitions summed).
type CompanyProgramGrowthViewMode = "byType" | "total";

const COMPANY_PROGRAM_GROWTH_VIEW_MODE_OPTIONS: Array<{ value: CompanyProgramGrowthViewMode; label: string; labelEn: string }> = [
  { value: "byType", label: "حسب نوع البرنامج", labelEn: "By Program Type" },
  { value: "total", label: "إجمالي الإنجاز", labelEn: "Overall Achievement" },
];

const COMPANY_PROGRAM_TYPE_LINE_NAMES: Record<"course" | "camp" | "competition", { label: string; labelEn: string }> = {
  course: { label: "الدورات", labelEn: "Courses" },
  camp: { label: "المعسكرات", labelEn: "Bootcamps" },
  competition: { label: "المسابقات", labelEn: "Competitions" },
};

const COMPANY_TOTAL_PROGRAMS_LINE_NAME = { label: "إجمالي البرامج", labelEn: "Total Programs" };

interface CompanyProgramGrowthPoint {
  label: string;
  labelEn: string;
  all: number;
  course: number;
  camp: number;
  competition: number;
}

// Number of PROGRAMS published by the company (courses/camps/competitions),
// cumulative across the full year. `all` = course + camp + competition at
// every point. Ends at 62 total published programs by December, which is
// this company's "Total Published Programs" KPI.
const COMPANY_PROGRAM_GROWTH_DATA: CompanyProgramGrowthPoint[] = [
  { label: "يناير", labelEn: "Jan", course: 2, camp: 1, competition: 0, all: 3 },
  { label: "فبراير", labelEn: "Feb", course: 5, camp: 2, competition: 1, all: 8 },
  { label: "مارس", labelEn: "Mar", course: 8, camp: 3, competition: 2, all: 13 },
  { label: "أبريل", labelEn: "Apr", course: 12, camp: 5, competition: 3, all: 20 },
  { label: "مايو", labelEn: "May", course: 15, camp: 6, competition: 4, all: 25 },
  { label: "يونيو", labelEn: "Jun", course: 18, camp: 8, competition: 5, all: 31 },
  { label: "يوليو", labelEn: "Jul", course: 21, camp: 9, competition: 6, all: 36 },
  { label: "أغسطس", labelEn: "Aug", course: 24, camp: 10, competition: 7, all: 41 },
  { label: "سبتمبر", labelEn: "Sep", course: 27, camp: 12, competition: 8, all: 47 },
  { label: "أكتوبر", labelEn: "Oct", course: 30, camp: 13, competition: 9, all: 52 },
  { label: "نوفمبر", labelEn: "Nov", course: 33, camp: 14, competition: 10, all: 57 },
  { label: "ديسمبر", labelEn: "Dec", course: 36, camp: 15, competition: 11, all: 62 },
];

// The year-end total COMPANY_PROGRAM_GROWTH_DATA converges to — also this
// company's "Total Published Programs" KPI. Currently unused by any page
// (kept from the original company data file so no seed content is lost).
const COMPANY_TOTAL_PUBLISHED_PROGRAMS = 62;

interface CompanyEnrollmentCompletionPoint {
  type: "course" | "camp" | "competition";
  label: string;
  labelEn: string;
  registered: number;
  completed: number;
}

const COMPANY_ENROLLMENT_COMPLETION_DATA: CompanyEnrollmentCompletionPoint[] = [
  { type: "course", label: "الدورات", labelEn: "Courses", registered: 120, completed: 92 },
  { type: "camp", label: "المعسكرات", labelEn: "Bootcamps", registered: 80, completed: 56 },
  { type: "competition", label: "المسابقات", labelEn: "Competitions", registered: 45, completed: 37 },
];

// ── auth: login / register ──────────────────────────────────────────────────

const FIELD_CLASS =
  "w-full rounded-2xl border border-brand-border bg-brand-white px-5 py-4 text-brand-text transition duration-300 outline-none focus:border-brand-main focus:ring-4 focus:ring-brand-light";

const SUBMIT_CLASS =
  "w-full rounded-2xl bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] py-4 text-lg font-bold text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl disabled:opacity-50";

// localStorage key remembering the last role used to log in.
const LAST_ROLE_KEY = "ct_last_role";

interface AccountType {
  value: string;
  label: string;
}

const ACCOUNT_TYPES: AccountType[] = [
  { value: "student", label: "طالب" },
  { value: "company", label: "شركة" },
  { value: "trainer", label: "مدرب" },
];

const LOGIN_DATA = {
  layout: {
    backTo: "/",
    panelTitle: "أهلاً بك في كبسولة تحول",
    panelSubtitle: "منصة متكاملة لإدارة التدريب والمسابقات التقنية مع تجربة حديثة وسهلة الاستخدام.",
    heading: "مرحبًا بك",
    subheading: "قم بتسجيل الدخول للوصول إلى حسابك.",
  },

  form: {
    emailLabel: "البريد الإلكتروني",
    emailPlaceholder: "example@email.com",
    passwordLabel: "كلمة المرور",
    passwordPlaceholder: "********",
    showPasswordLabel: "إظهار",
    hidePasswordLabel: "إخفاء",
    rememberLabel: "تذكرني",
    forgotPasswordLabel: "نسيت كلمة المرور؟",
    submitLabel: "تسجيل الدخول",
    noAccountText: "ليس لديك حساب؟",
    registerLabel: "إنشاء حساب",
    socialDividerText: "أو تابع باستخدام",
    invalidCredentialsError: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    genericError: "حدث خطأ ما، حاول مرة أخرى.",
  },
};

const REGISTER_DATA = {
  layout: {
    backTo: "/",
    panelTitle: "انضم إلى كبسولة تحول",
    panelSubtitle: "أنشئ حسابك وابدأ رحلتك في المسابقات، التدريب، والبرامج التقنية.",
    heading: "إنشاء حساب",
    subheading: "أدخل بياناتك لإنشاء حساب جديد.",
  },

  form: {
    fullNameLabel: "الاسم الكامل",
    emailLabel: "البريد الإلكتروني",
    emailPlaceholder: "example@email.com",
    phoneLabel: "رقم الجوال",
    passwordLabel: "كلمة المرور",
    passwordPlaceholder: "********",
    showPasswordLabel: "إظهار",
    hidePasswordLabel: "إخفاء",
    confirmPasswordLabel: "تأكيد كلمة المرور",
    accountTypeLabel: "نوع الحساب",
    agreeLabel: "أوافق على الشروط والأحكام.",
    submitLabel: "إنشاء الحساب",
    hasAccountText: "لديك حساب بالفعل؟",
    loginLabel: "تسجيل الدخول",
    passwordMismatchAlert: "كلمتا المرور غير متطابقتين",
    emailExistsError: "هذا البريد الإلكتروني مستخدم بالفعل.",
    genericError: "حدث خطأ ما، حاول مرة أخرى.",
  },
};

// ── auth: forgot password ────────────────────────────────────────────────────

const FORGOT_PASSWORD_DATA = {
  layout: {
    backTo: "/login",
    panelTitle: "استعادة كلمة المرور",
    panelSubtitle: "لا تقلق، سنساعدك على العودة إلى حسابك في كبسولة تحول خلال دقائق.",
    heading: "نسيت كلمة المرور؟",
    subheading: "أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور.",
  },

  form: {
    emailLabel: "البريد الإلكتروني",
    emailPlaceholder: "example@email.com",
    submitLabel: "إرسال رابط إعادة التعيين",
    loadingLabel: "جاري الإرسال...",
    backToLoginLabel: "العودة لتسجيل الدخول",
    rememberPasswordText: "تذكرت كلمة المرور؟",
  },

  success: {
    message: "تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني.",
    backToLoginLabel: "العودة لتسجيل الدخول",
  },
} as const;

// ── contact ──────────────────────────────────────────────────────────────────

interface MessageType {
  value: string;
  label: string;
}

interface ContactFormState {
  name: string;
  email: string;
  messageType: string;
  subject: string;
  message: string;
}

const CONTACT_DATA = {
  banner: {
    title: "تواصل معنا",
    subtitle: "يسعدنا استقبال استفساراتكم واقتراحاتكم. فريق كبسولة تحول هنا لمساعدتكم دائمًا.",
    supportHours: "أوقات الدعم: الأحد إلى الخميس، 9ص - 5م",
  },

  form: {
    sectionTitle: "إرسال رسالة مباشرة",
    successMessage: "✓ تم إرسال رسالتك بنجاح! سنقوم بالرد عليك في أقرب وقت ممكن.",
    authRequiredError: "يجب تسجيل الدخول لإرسال رسالة تواصل.",
    genericError: "تعذر إرسال رسالتك، حاول مرة أخرى.",
    submitLabel: "إرسال الرسالة",
    loadingLabel: "جاري الإرسال...",
    fields: {
      name: { label: "الاسم الكامل", placeholder: "اكتب اسمك الكامل" },
      email: { label: "البريد الإلكتروني", placeholder: "اكتب بريدك الإلكتروني" },
      subject: { label: "الموضوع", placeholder: "اكتب موضوع الرسالة" },
      messageType: { label: "نوع الرسالة", placeholder: "اختر نوع الرسالة" },
      message: { label: "نص الرسالة", placeholder: "اكتب استفسارك بالتفصيل هنا..." },
      attachment: { label: "إرفاق صورة", placeholder: "اختياري - PNG أو JPG" },
    },
    messageTypes: [
      { value: "دورات", label: "دورات" },
      { value: "مشكلة تقنية", label: "مشكلة تقنية" },
      { value: "شكوى", label: "شكوى" },
      { value: "اقتراح", label: "اقتراح" },
      { value: "دفع/فاتورة", label: "دفع/فاتورة" },
      { value: "أخرى", label: "أخرى" },
    ] as MessageType[],
  },

  guidelines: {
    sectionTitle: "إرشادات التواصل",
    items: [
      { id: "clock", title: "رد سريع", description: "يتم الرد عادة خلال 24 ساعة في أيام العمل." },
      { id: "academic", title: "استفسارات أكاديمية", description: "يرجى ذكر اسم الدورة أو البرنامج المعني." },
      { id: "wrench", title: "مشاكل تقنية", description: "يرجى توضيح الخطأ أو إرفاق صورة إن أمكن." },
    ],
  },
};

const INITIAL_CONTACT_FORM: ContactFormState = {
  name: "",
  email: "",
  messageType: "",
  subject: "",
  message: "",
};

// ── home ─────────────────────────────────────────────────────────────────────

const HOME_DATA = {
  promo: {
    alt: "ورشة عمل دليلك العملي للذكاء الاصطناعي - السبت 18 يوليو 2026",
    ctaLabel: "تواصل للتسجيل",
    ctaPath: "/contact",
  },

  hero: {
    title: "ابدأ رحلتك التقنية اليوم",
    subtitle:
      "منصة تدريبية تساعدك على تعلم مهارات جديدة، وبناء مشاريعك، والانطلاق في سوق العمل.",
    primaryLabel: "استعرض البرامج",
    secondaryLabel: "أنشئ حسابك",
  },

  programs: {
    title: "برامج رائجة الآن",
    subtitle: "أكثر الدورات والمعسكرات إقبالًا هذا الأسبوع.",
    items: [
      {
        badge: "دورة",
        title: "تطوير الواجهات الأمامية",
        description: "تعلّم React وTailwind CSS من الصفر حتى بناء مشاريع حقيقية.",
      },
      {
        badge: "معسكر",
        title: "معسكر الذكاء الاصطناعي",
        description: "أسبوعان مكثّفان لبناء نماذج تعلم آلي وتطبيقها عمليًا.",
      },
      {
        badge: "مسابقة",
        title: "هاكاثون الحلول الرقمية",
        description: "شارك ضمن فريق وابنِ حلًا تقنيًا خلال 48 ساعة واربح جوائز قيّمة.",
      },
    ],
  },

  highlights: {
    title: "لماذا كبسولة تحول؟",
    items: [
      {
        title: "مدربون معتمدون",
        description: "نخبة من الخبراء المعتمدين في مجالاتهم.",
        icon: "🎓",
      },
      {
        title: "مشاريع حقيقية",
        description: "تطبيق عملي على مشاريع شركات فعلية.",
        icon: "🛠️",
      },
      {
        title: "شهادات معتمدة",
        description: "احصل على شهادة إتمام معتمدة بعد كل برنامج.",
        icon: "📜",
      },
      {
        title: "مجتمع داعم",
        description: "تواصل مع متعلمين وخبراء من كل المجالات.",
        icon: "🤝",
      },
    ],
  },

  stats: [
    { label: "متدرب مسجّل", value: "12,500+" },
    { label: "دورة ومعسكر", value: "180+" },
    { label: "مدرب خبير", value: "90+" },
    { label: "شركة شريكة", value: "40+" },
  ],

  news: {
    title: "آخر الأخبار والمقالات",
    subtitle: "تابع كل جديد في عالم التدريب والتقنية.",
    items: [
      {
        tag: "إعلان",
        title: "انطلاق معسكر الصيف التقني",
        excerpt: "تسجيل مبكر متاح الآن لمعسكر الصيف المكثّف في تطوير الويب.",
        date: "٢ يوليو ٢٠٢٦",
      },
      {
        tag: "مقال",
        title: "كيف تختار دورتك التدريبية الأولى؟",
        excerpt: "دليل عملي لاختيار المسار الصحيح بناءً على أهدافك المهنية.",
        date: "٢٨ يونيو ٢٠٢٦",
      },
      {
        tag: "شراكة",
        title: "شراكة جديدة مع قطاع الشركات الناشئة",
        excerpt: "نوسّع برامج بناء الفرق التقنية للشركات الناشئة في المنطقة.",
        date: "٢٠ يونيو ٢٠٢٦",
      },
    ],
  },

  testimonials: {
    title: "قالوا عنّا",
    subtitle: "تجارب حقيقية من متدربينا.",
    items: [
      {
        quote: "غيّرت مساري المهني بالكامل خلال ثلاثة أشهر فقط.",
        name: "نورة الحربي",
        role: "مطورة واجهات أمامية",
      },
      {
        quote: "المعسكر منظم باحتراف والمدربون متمكنون جدًا.",
        name: "عبدالله القحطاني",
        role: "مهندس بيانات",
      },
      {
        quote: "فريق المشروع ساعدني على إطلاق منتجي الأول.",
        name: "ريم الزهراني",
        role: "مؤسسة شركة ناشئة",
      },
    ],
  },

  partners: {
    title: "شركاء النجاح",
    subtitle: "نفخر بشراكتنا مع جهات رائدة في القطاع.",
    items: [
      { name: "شركة نماء" },
      { name: "مجموعة رواد" },
      { name: "مؤسسة تمكين" },
      { name: "شركة إبداع" },
    ],
  },

  faqPreview: {
    title: "أسئلة شائعة",
    items: [
      {
        question: "هل يمكنني التسجيل في دورة مجانية بدون حساب؟",
        answer: "لا، يجب إنشاء حساب طالب أولًا للتسجيل في أي دورة، مجانية كانت أو مدفوعة.",
      },
      {
        question: "هل تقدّمون شهادات معتمدة؟",
        answer: "نعم، تحصل على شهادة إتمام معتمدة بعد إنهاء متطلبات البرنامج بنجاح.",
      },
      {
        question: "كيف يمكن لشركتي طلب فريق مشروع؟",
        answer: "من خلال لوحة تحكم الشركات يمكنكم إرسال طلب فريق مشروع مباشرة لفريقنا.",
      },
    ],
  },

  cta: {
    title: "جاهز لبدء رحلتك؟",
    subtitle: "انضم إلى آلاف المتدربين وابدأ التعلم اليوم.",
    primaryLabel: "أنشئ حسابك المجاني",
    secondaryLabel: "تواصل معنا",
  },
};

// ── payment ──────────────────────────────────────────────────────────────────

const PAYMENT_DATA = {
  notFound: {
    title: "لم يتم العثور على البرنامج",
    description: "تحقق من الرابط، أو تصفّح البرامج المتاحة من صفحة البرامج.",
    backLabel: "العودة",
  },

  program: {
    note: "الوصول والمتابعة فوري بعد تأكيد الدفع المحاكي",
    freePriceLabel: "مجاني",
  },

  banner: {
    title: "إتمام الحجز والدفع الإلكتروني",
    subtitle: "بوابة الدفع التجريبية الخاصة بمبادرة كبسولة تحول (بيئة محاكاة تفاعلية للأسبوع الأول)",
    programLabel: "البرنامج",
  },

  form: {
    title: "معلومات بطاقة الدفع",
    subtitle: "جميع البيانات يتم التحقق منها عبر الدالات غير المتزامنة لضمان محاكاة تأخير الشبكة.",
    fields: {
      cardName: { label: "اسم حامل البطاقة", placeholder: "Arwa Alherz" },
      cardNumber: { label: "رقم البطاقة", placeholder: "4000 1234 5678 9010" },
      expiry: { label: "تاريخ الانتهاء", placeholder: "MM/YY" },
      cvv: { label: "الرمز السري (CVV)", placeholder: "***" },
    },
    submitLabel: "تأكيد الدفع",
    loadingLabel: "جاري الاتصال والتحقق بالشبكة...",
    networkErrorMessage: "حدث خطأ غير متوقع أثناء الاتصال بالخادم المحاكي.",
    mockSuccessMessage: "تمت المحاكاة بنجاح!",
  },

  summary: {
    title: "ملخص حجز المقعد",
    tuitionLabel: "الرسوم الدراسية للمسار",
    totalLabel: "المجموع الكلي",
  },
} as const;

// ── profile: account settings ────────────────────────────────────────────────

const ACCOUNT_SETTINGS_DATA = {
  pageLabel: "الإعدادات",
  pageTitle: "إعدادات الحساب",

  actions: {
    cancelLabel: "إلغاء",
    saveLabel: "حفظ التغييرات",
  },

  accountDetails: {
    title: "بيانات الحساب",
    fields: {
      name: { label: "الاسم الكامل" },
      email: { label: "البريد الإلكتروني" },
      phone: { label: "رقم الجوال" },
      city: { label: "المدينة" },
    },
  },

  security: {
    title: "الأمان وتسجيل الدخول",
    fields: {
      currentPassword: { label: "كلمة المرور الحالية" },
      newPassword: { label: "كلمة المرور الجديدة" },
      twoFactor: { label: "تفعيل التحقق بخطوتين" },
    },
  },

  preferences: {
    title: "التنبيهات والإشعارات",
    fields: {
      language: {
        label: "اللغة",
        options: ["العربية", "English"],
      },
      dashboardView: {
        label: "طريقة عرض اللوحة",
        options: ["بسيط", "متقدم"],
      },
      emailNotifications: { label: "تفعيل إشعارات البريد" },
      activityNotifications: { label: "تفعيل إشعارات الأنشطة" },
    },
  },

  payment: {
    title: "الدفع والخصوصية",
    fields: {
      paymentMethod: {
        label: "طريقة الدفع",
        options: ["مدى", "Visa", "تحويل بنكي"],
      },
      cardNumber: { label: "رقم البطاقة" },
      offerNotifications: { label: "السماح بتنبيهات العروض الجديدة" },
      showAchievements: { label: "إظهار إنجازاتي في الملف" },
    },
  },
} as const;

// ── profile ──────────────────────────────────────────────────────────────────

const PROFILE_DATA = {
  pageLabel: "الحساب",
  pageTitle: "الملف الشخصي",

  avatar: {
    fallbackInitial: "؟",
    changeButtonLabel: "تغيير الصورة",
  },

  form: {
    title: "بيانات الحساب",
    fields: {
      name: { label: "الاسم" },
      email: { label: "البريد الإلكتروني" },
      phone: { label: "رقم الجوال" },
      accountType: { label: "نوع الحساب" },
    },
    saveLabel: "حفظ التغييرات",
  },
} as const;

// ── about ────────────────────────────────────────────────────────────────────

interface FaqItem {
  question: string;
  answer: string;
}

interface TeamMember {
  name: string;
  role: string;
  gender: "male" | "female";
  image?: string;
}

const ABOUT_DATA = {
  hero: {
    title: "من نحن",
    subtitle:
      "تعرف على منصتنا، رسالتنا، وكيف نساعدك على تطوير مهاراتك وتحقيق أهدافك التعليمية.",
  },

  overview: {
    title: "نبذة عن المنصة",
    paragraphs: [
      "منصة تعليمية متكاملة تهدف إلى تمكين الطلاب والمهتمين بالتقنية من اكتساب المهارات المطلوبة في سوق العمل من خلال محتوى تعليمي حديث وتجارب تعلم عملية.",
      "نوفر بيئة تعليمية تجمع بين الدورات المتخصصة، والمعسكرات التدريبية، والمشاريع التطبيقية، والشهادات المعتمدة لمساعدة المتعلم على بناء مسيرته بثقة.",
    ],
    image: {
      src: ctImage,
      alt: "صورة توضيحية عن المنصة",
    },
  },

  missionVision: [
    {
      title: "رسالتنا",
      text: "أن نكون المنصة الرائدة في تطوير المهارات التقنية، من خلال تقديم تعليم عالي الجودة يواكب التطور التقني ويؤهل الكفاءات للمستقبل.",
    },
    {
      title: "رؤيتنا",
      text: "تمكين المتعلمين من اكتساب المعرفة والخبرة العملية عبر برامج تدريبية مبتكرة، ومحتوى تفاعلي، وفرص تطبيق حقيقية تسهم في إعدادهم لسوق العمل وتحقيق طموحاتهم المهنية.",
    },
  ],

  goals: [
    "تمكين المتعلمين من اكتساب مهارات عملية ومعتمدة.",
    "توفير محتوى تدريبي محدّث يواكب سوق العمل.",
    "بناء مجتمع تفاعلي من الطلاب والمدربين.",
    "دعم المشاريع والمسابقات التقنية النوعية.",
  ],

  features: [
    {
      title: "دورات متخصصة",
      description:
        "تعلم من خلال دورات احترافية تغطي أحدث المهارات التقنية بإشراف خبراء ومحتوى عملي متجدد.",
    },
    {
      title: "معسكرات تدريبية",
      description:
        "انضم إلى معسكرات مكثفة تجمع بين التعلم التطبيقي والمشاريع الواقعية لتطوير مهاراتك بسرعة.",
    },
    {
      title: "شهادات معتمدة",
      description:
        "احصل على شهادات تثبت إنجازاتك وتدعم فرصك الأكاديمية والمهنية بعد إتمام البرامج.",
    },
    {
      title: "مشاريع تطبيقية",
      description:
        "طبّق ما تعلمته عبر مشاريع عملية تحاكي بيئات العمل الحقيقية وتبني معرض أعمال قوي.",
    },
    {
      title: "مسابقات وتحديات",
      description:
        "اختبر مهاراتك من خلال تحديات ومسابقات دورية، وتنافس مع المشاركين للفوز بجوائز مميزة.",
    },
    {
      title: "لوحة متابعة شخصية",
      description:
        "تابع تقدمك، راقب إنجازاتك، واستعرض الدورات والشهادات والمشاريع من خلال لوحة تحكم متكاملة.",
    },
  ],

  team: {
    title: "فريق العمل والشركاء",
    subtitle: "فريق التطوير:",
    members: [
      { name: "محمود العتيق", role: "مهندس برمجيات",  gender: "male"   },
      { name: "خولة المعلم",  role: "مهندسة برمجيات", gender: "female" },
      { name: "أروى الحرز",   role: "مهندسة برمجيات", gender: "female" },
      { name: "مرام الحازمي", role: "مهندسة برمجيات", gender: "female" },
      { name: "علي الخويلدي", role: "مهندس برمجيات",  gender: "male"   },
      { name: "علي الغانم",   role: "مهندس برمجيات",  gender: "male"   },
    ] as TeamMember[],
  },

  faq: {
    title: "الأسئلة الشائعة",
    items: [
      {
        question: "1. كيف يمكنني التسجيل في المنصة؟",
        answer:
          "يمكنك إنشاء حساب جديد بسهولة من خلال صفحة التسجيل باستخدام بريدك الإلكتروني، ثم تفعيل الحساب والبدء في استعراض الدورات والبرامج المتاحة.",
      },
      {
        question: "2. هل أحصل على شهادة بعد إكمال الدورة؟",
        answer:
          "نعم، يحصل المتدرب على شهادة إتمام معتمدة بعد إنهاء جميع متطلبات الدورة واجتياز التقييمات المطلوبة، وذلك بحسب سياسة كل برنامج.",
      },
      {
        question: "3. هل يمكنني متابعة تقدمي في التعلم؟",
        answer:
          "بالتأكيد، توفر المنصة لوحة متابعة شخصية تتيح لك الاطلاع على الدورات المكتملة، ونسبة الإنجاز، والشهادات، والمشاريع التي أنجزتها في مكان واحد.",
      },
    ] as FaqItem[],
  },
};

// ── student-activities ──────────────────────────────────────────────────────

// Status filter values used by the "My Courses" stat boxes and list filter.
type ActivityStatusFilter = "all" | "approved" | "pending" | "completed";

// The 3 clickable stat boxes (registered / pending / completed) above the list.
const ACTIVITIES_STAT_BOXES: { status: ActivityStatusFilter; label: string; icon: string }[] = [
  { status: "approved", label: "مسجّلة",       icon: "book"  },
  { status: "pending",  label: "قيد المعالجة", icon: "clock" },
  { status: "completed",label: "مكتملة",       icon: "check" },
];

// SVG path data for the stat-box icons and the "sort by deadline" pill icon.
const ACTIVITIES_ICON_PATHS: Record<string, string> = {
  book:  "M4 6.5A2.5 2.5 0 0 1 6.5 4H20v14H6.5A2.5 2.5 0 0 0 4 20.5V6.5Z M4 6.5V20.5",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-15v5l3.5 2",
  check: "M20 6 9 17l-5-5",
  sort:  "M6 9h12M8 13h8M10 17h4",
};

// SVG path data for the auto-scrolling domain-category filter pills.
const ACTIVITIES_CATEGORY_ICON_PATHS: Record<string, string> = {
  webdev:     "M8 9 4 12l4 3 M16 9l4 3-4 3 M13 6l-2 12",
  appdev:     "M8 2h8a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z M11 19h2",
  uiux:       "M12 19l7-7 3 3-7 7-3-3Z M18 13l-1.5-7.5L9 4 M2 2l7 7",
  drone:      "M4 4a2 2 0 1 0 .01 0Z M20 4a2 2 0 1 0 .01 0Z M4 20a2 2 0 1 0 .01 0Z M20 20a2 2 0 1 0 .01 0Z M6 6l4 4M18 6l-4 4M6 18l4-4M18 18l-4-4 M12 12h.01",
  game:       "M6 8h12a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h-1.5l-1.5-2h-6l-1.5 2H6a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3Z M7 10v4M5 12h4 M15.5 12h.01M18 10h.01",
  automation: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V21a2 2 0 0 1-4 0v-.09A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.04H3a2 2 0 0 1 0-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1.04-1.56V3a2 2 0 0 1 4 0v.09A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.56 1.04H21a2 2 0 0 1 0 4h-.09A1.7 1.7 0 0 0 19.4 15Z",
  ai:         "M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3 M7 7h10v10H7Z",
  security:   "M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3Z M9 12l2 2 4-4",
};

// ── student-dashboard ────────────────────────────────────────────────────────

// Type filter chips for the "completed certificates" list.
const DASHBOARD_COMPLETED_TYPE_FILTERS = [
  { value: "all", label: "الكل" },
  { value: "دورة", label: "دورة" },
  { value: "معسكر", label: "معسكر" },
  { value: "مسابقة", label: "مسابقة" },
];

// Type filter chips for the "current activities" search bar.
const DASHBOARD_ACTIVITY_TYPE_FILTERS = [
  { value: "all", label: "الكل" },
  { value: "course", label: "دورة" },
  { value: "camp", label: "معسكر" },
  { value: "competition", label: "مسابقة" },
];

// Grouping config (type key → row label + count label) for current activities.
const DASHBOARD_ACTIVITY_GROUPS = [
  { type: "course", label: "الدورات", countLabel: "دورات" },
  { type: "camp", label: "المعسكرات", countLabel: "معسكرات" },
  { type: "competition", label: "المسابقات", countLabel: "مسابقات" },
];

// Progress-based status filter used inside each activity row's dropdown.
const DASHBOARD_ACTIVITY_STATUS_FILTERS = [
  { value: "all", label: "فلترة: الكل" },
  { value: "in-progress", label: "قيد التقدم" },
  { value: "completed", label: "مكتمل" },
];

// ── student-notifications ────────────────────────────────────────────────────

// The three notification categories a student can receive.
type NotificationCategory = "course" | "camp" | "competition";

// A single student notification entry (bilingual title/body + read state).
interface NotificationItem {
  id: string;
  titleAr: string;
  titleEn: string;
  bodyAr: string;
  bodyEn: string;
  minutesAgo: number;
  read: boolean;
  category: NotificationCategory;
}

// Seed notification list shown on the notifications page.
const NOTIFICATIONS_SEED: NotificationItem[] = [
  {
    id: "n1",
    titleAr: "تمت الموافقة على طلبك",
    titleEn: "Your Application Was Approved",
    bodyAr: "تمت الموافقة على تسجيلك في دورة تطوير الويب المتقدم.",
    bodyEn: "Your registration for Advanced Web Development has been approved.",
    minutesAgo: 10,
    read: false,
    category: "course",
  },
  {
    id: "n2",
    titleAr: "موعد بدء المعسكر",
    titleEn: "Camp Start Date",
    bodyAr: "يبدأ معسكر الذكاء الاصطناعي في 15 أبريل. تأكد من التحضير.",
    bodyEn: "The AI Bootcamp starts on April 15. Please prepare accordingly.",
    minutesAgo: 25,
    read: false,
    category: "camp",
  },
  {
    id: "n3",
    titleAr: "نتائج المسابقة",
    titleEn: "Competition Results",
    bodyAr: "تهانينا! لقد حصلت على المركز الثالث في مسابقة البرمجة.",
    bodyEn: "Congratulations! You placed 3rd in the Programming Competition.",
    minutesAgo: 60,
    read: true,
    category: "competition",
  },
  {
    id: "n5",
    titleAr: "تذكير بجلسة اليوم",
    titleEn: "Reminder: Session Today",
    bodyAr: "لديك جلسة في دورة تصميم واجهات المستخدم بعد ساعة.",
    bodyEn: "You have a UI Design course session starting in an hour.",
    minutesAgo: 180,
    read: true,
    category: "course",
  },
  {
    id: "n6",
    titleAr: "مقعد جديد متاح",
    titleEn: "New Seat Available",
    bodyAr: "أُتيح مقعد إضافي في معسكر تطوير تطبيقات الجوال.",
    bodyEn: "An extra seat just opened up in the Mobile App Development camp.",
    minutesAgo: 1440,
    read: true,
    category: "camp",
  },
];

// How many notifications are visible before "Show more" is pressed.
const NOTIFICATIONS_INITIAL_VISIBLE_COUNT = 4;

// Badge colors per notification category.
const NOTIFICATION_CATEGORY_STYLES: Record<NotificationCategory, string> = {
  course:      "bg-sky-100 text-sky-700",
  camp:        "bg-violet-100 text-violet-700",
  competition: "bg-amber-100 text-amber-700",
};

// Bilingual labels per notification category.
const NOTIFICATION_CATEGORY_LABELS: Record<NotificationCategory, { ar: string; en: string }> = {
  course:      { ar: "دورة",    en: "Course"      },
  camp:        { ar: "معسكر",   en: "Camp"        },
  competition: { ar: "مسابقة",  en: "Competition" },
};

// SVG path data for the search/reset/trash/eye toolbar icons.
const NOTIFICATIONS_ICON_PATHS: Record<string, string> = {
  search: "M21 21l-4.35-4.35M18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z",
  reset:  "M3 12a9 9 0 1 1 3 6.7M3 12V6m0 6h6",
  trash:  "M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m-8 0v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V7",
  eye:    "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  check:  "M5 13l4 4L19 7",
};

// ── student-schedule ─────────────────────────────────────────────────────────

// The three session types a schedule entry can be.
type ScheduleSessionType = "دورة" | "معسكر" | "مسابقة";

// A single calendar session (course/camp/competition) shown on the schedule.
interface ScheduleSession {
  id: string;
  title: string;
  instructor: string;
  date: string;        // YYYY-MM-DD
  timeStart: string;   // "HH:MM"
  timeEnd: string;     // "HH:MM"
  type: ScheduleSessionType;
  platform: string;
  link: string;
  color: string;       // Tailwind bg class
}

// Solid event color per session type (day/week/month grid blocks).
const SCHEDULE_TYPE_COLOR: Record<ScheduleSessionType, string> = {
  "دورة":    "bg-sky-500",
  "معسكر":   "bg-violet-500",
  "مسابقة":  "bg-amber-500",
};

// Arabic weekday labels, Sunday-first.
const SCHEDULE_DAYS_AR = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

// Arabic month names for the calendar headline.
const SCHEDULE_MONTHS_AR = ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];

// Today's date (YYYY-MM-DD), used to highlight "today" across the calendar.
const SCHEDULE_TODAY_ISO = new Date().toISOString().slice(0, 10);

// Shifts an ISO date string by a number of days — used to build seed sessions
// relative to today so the calendar always shows upcoming events.
function scheduleDateOffset(base: string, days: number): string {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

// Seed calendar sessions shown across the day/week/month views.
const SCHEDULE_SESSIONS_SEED: ScheduleSession[] = [
  {
    id: "s1", title: "تطوير الويب — الوحدة 4", instructor: "خالد المطيري",
    date: SCHEDULE_TODAY_ISO, timeStart: "10:00", timeEnd: "12:00",
    type: "دورة", platform: "Zoom", link: "https://zoom.us/j/example",
    color: SCHEDULE_TYPE_COLOR["دورة"],
  },
  {
    id: "s2", title: "علم البيانات — المحاضرة 2", instructor: "نورة العمري",
    date: SCHEDULE_TODAY_ISO, timeStart: "14:00", timeEnd: "15:30",
    type: "دورة", platform: "Google Meet", link: "https://meet.google.com/example",
    color: SCHEDULE_TYPE_COLOR["دورة"],
  },
  {
    id: "s3", title: "معسكر الذكاء الاصطناعي — يوم 1", instructor: "فريق التدريب",
    date: scheduleDateOffset(SCHEDULE_TODAY_ISO, 2), timeStart: "09:00", timeEnd: "17:00",
    type: "معسكر", platform: "Zoom", link: "https://zoom.us/j/camp-example",
    color: SCHEDULE_TYPE_COLOR["معسكر"],
  },
  {
    id: "s4", title: "هاكاثون المستقبل — افتتاح", instructor: "اللجنة التنظيمية",
    date: scheduleDateOffset(SCHEDULE_TODAY_ISO, 5), timeStart: "10:00", timeEnd: "11:00",
    type: "مسابقة", platform: "Zoom", link: "https://zoom.us/j/hack-example",
    color: SCHEDULE_TYPE_COLOR["مسابقة"],
  },
  {
    id: "s5", title: "تطوير الويب — الوحدة 5", instructor: "خالد المطيري",
    date: scheduleDateOffset(SCHEDULE_TODAY_ISO, 14), timeStart: "10:00", timeEnd: "12:00",
    type: "دورة", platform: "Zoom", link: "https://zoom.us/j/example2",
    color: SCHEDULE_TYPE_COLOR["دورة"],
  },
];

// ── student-support ──────────────────────────────────────────────────────────

// Shape of the technical-support contact form.
interface SupportFormData {
  name: string;
  email: string;
  subject: string;
  messageType: string;
  message: string;
}

// Empty form used on mount and after a successful submit.
const SUPPORT_FORM_INITIAL: SupportFormData = {
  name: "",
  email: "",
  subject: "",
  messageType: "",
  message: "",
};

// Options for the "message type" select field.
const SUPPORT_MESSAGE_TYPES = [
  { value: "مشكلة تقنية",    label: "مشكلة تقنية" },
  { value: "شكوى",           label: "شكوى" },
  { value: "استفسار عام",    label: "استفسار عام" },
  { value: "دفع/فاتورة",     label: "دفع/فاتورة" },
  { value: "أخرى",           label: "أخرى" },
];

// Shared input styling — identical to Contact.tsx's INPUT_CLASS.
const SUPPORT_INPUT_CLASS =
  "rounded-xl border border-brand-border bg-brand-white p-3 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-main/40 transition";

// FAQ accordion items shown below the support form.
const SUPPORT_FAQ_ITEMS = [
  {
    q: "كيف أعيد تعيين كلمة المرور؟",
    a: "انتقل إلى صفحة تسجيل الدخول واضغط على 'نسيت كلمة المرور' وأدخل بريدك الإلكتروني.",
  },
  {
    q: "لماذا لا أستطيع الانضمام للجلسة؟",
    a: "تأكد من وجود رابط الجلسة في بريدك الإلكتروني أو في صفحة جدولك، وتحقق من اتصالك بالإنترنت.",
  },
  {
    q: "كيف أحصل على شهادتي؟",
    a: "بعد إكمال الدورة بنسبة 100٪ ستجد زر تحميل الشهادة في قسم الشهادات المكتملة.",
  },
];

// ── student-wishlist ─────────────────────────────────────────────────────────

// Sort modes available on the wishlist page.
type WishlistSortKey = "newest" | "ending" | "free";

// Sort toggle buttons shown in the wishlist search/sort bar.
const WISHLIST_SORT_OPTIONS: { value: WishlistSortKey; label: string }[] = [
  { value: "ending", label: "الأقرب انتهاءً" },
  { value: "newest", label: "جديد أولاً" },
  { value: "free",   label: "مجاني فقط" },
];

// Domain-category filter chips shown on the wishlist page.
const WISHLIST_CATEGORY_FILTERS = [
  "الكل",
  "تطوير مواقع الويب",
  "UI/UX تعلم",
  "الأمن السيبراني",
  "الذكاء الاصطناعي",
  "تصميم الألعاب",
];

// ── student-wishlist-context ─────────────────────────────────────────────────

// Arabic label for a wishlist item's program type.
type WishlistItemType = "دورة" | "معسكر" | "مسابقة";

// English label for a wishlist item's program type.
type WishlistItemTypeEn = "Course" | "Camp" | "Competition";

// Registration state of a wishlisted program.
type RegistrationStatus = "open" | "closed" | "soon" | "free";

// A single wishlisted program (course/camp/competition) with display fields.
interface WishlistItem {
  id: string;
  title: string;
  titleEn: string;
  type: WishlistItemType;
  typeEn: WishlistItemTypeEn;
  category: string;
  instructor: string;
  price: number;
  durationWeeks: number;
  registrationStatus: RegistrationStatus;
  startsInDays?: number;
  coverIcon: string;
  date: string;
}

// Per-registration-status label/badge/action styling shown on wishlist cards.
const WISHLIST_STATUS_CONFIG: Record<
  RegistrationStatus,
  { label: string; badge: string; actionLabel: string; actionStyle: string }
> = {
  open: {
    label: "التسجيل مفتوح",
    badge: "bg-emerald-100 text-emerald-700",
    actionLabel: "سجل الآن",
    actionStyle: "bg-brand-main text-white hover:opacity-90",
  },
  closed: {
    label: "انتهى التسجيل",
    badge: "bg-rose-100 text-rose-600",
    actionLabel: "انتهى التسجيل",
    actionStyle: "bg-rose-100 text-rose-500 cursor-default",
  },
  soon: {
    label: "يبدأ قريباً",
    badge: "bg-amber-100 text-amber-600",
    actionLabel: "يبدأ قريباً",
    actionStyle: "bg-amber-100 text-amber-600 cursor-default",
  },
  free: {
    label: "مجاني",
    badge: "bg-sky-100 text-sky-700",
    actionLabel: "سجل مجاناً",
    actionStyle: "bg-brand-main text-white hover:opacity-90",
  },
};

// Type badge styling per program type, shown on wishlist cards.
const WISHLIST_TYPE_BADGE_STYLES: Record<string, string> = {
  "دورة":   "bg-brand-main/10 text-brand-main",
  "معسكر":  "bg-violet-100 text-violet-700",
  "مسابقة": "bg-amber-100 text-amber-700",
};

// Seed wishlist items — the wishlist's initial state before any user action.
const WISHLIST_SEED_ITEMS: WishlistItem[] = [
  {
    id: "w1",
    title: "دورة CSS و HTML",
    titleEn: "HTML & CSS Course",
    type: "دورة",
    typeEn: "Course",
    category: "تطوير مواقع الويب",
    instructor: "الأستاذ فهد العتيبي",
    price: 199,
    durationWeeks: 6,
    registrationStatus: "closed",
    coverIcon: "🌐",
    date: "2025-03-15",
  },
  {
    id: "w2",
    title: "دورة تصميم واجهات المستخدم",
    titleEn: "UI/UX Design Course",
    type: "دورة",
    typeEn: "Course",
    category: "UI/UX تعلم",
    instructor: "الأستاذ منى الحربي",
    price: 349,
    durationWeeks: 8,
    registrationStatus: "soon",
    startsInDays: 5,
    coverIcon: "✦",
    date: "2025-04-10",
  },
  {
    id: "w3",
    title: "تطوير واجهات المستخدم باستخدام React",
    titleEn: "React UI Development",
    type: "دورة",
    typeEn: "Course",
    category: "تطوير مواقع الويب",
    instructor: "الأستاذ خالد المطيري",
    price: 499,
    durationWeeks: 6,
    registrationStatus: "open",
    coverIcon: "⚛",
    date: "2025-04-15",
  },
  {
    id: "w4",
    title: "مقدمة في الذكاء الاصطناعي",
    titleEn: "Intro to AI",
    type: "دورة",
    typeEn: "Course",
    category: "الذكاء الاصطناعي",
    instructor: "د. أحمد السبيعي",
    price: 799,
    durationWeeks: 6,
    registrationStatus: "open",
    coverIcon: "AI",
    date: "2025-05-01",
  },
  {
    id: "w5",
    title: "معسكر الذكاء الاصطناعي",
    titleEn: "AI Bootcamp",
    type: "معسكر",
    typeEn: "Camp",
    category: "الذكاء الاصطناعي",
    instructor: "فريق التدريب",
    price: 0,
    durationWeeks: 2,
    registrationStatus: "free",
    coverIcon: "🤖",
    date: "2025-06-01",
  },
  {
    id: "w6",
    title: "مسابقة البرمجة الإبداعية",
    titleEn: "Creative Coding Competition",
    type: "مسابقة",
    typeEn: "Competition",
    category: "الأمن السيبراني",
    instructor: "اللجنة التنظيمية",
    price: 0,
    durationWeeks: 1,
    registrationStatus: "soon",
    startsInDays: 12,
    coverIcon: "🏆",
    date: "2025-07-20",
  },
];

// ── trainer-dashboard ────────────────────────────────────────────────────────

// All static copy shown on the trainer dashboard page.
const TRAINER_DASHBOARD_TEXT = {
  heroTitle: "لوحة المدرب",
  heroSubtitle: "مرحباً، الأستاذ خالد — إدارة برامجك وجلساتك وطلابك من مكان واحد.",
  quickFollowupTitle: "المتابعة السريعة",
};

// `tone` reuses the same teal/green vocabulary as the admin dashboard's
// stat cards (ADMIN_STAT_CARDS) so both pages share one color language.
const TRAINER_STATS = [
  { label: "إجمالي الدورات",           value: "24", icon: "grid",      tone: "teal"  },
  { label: "الدورات الحالية",          value: "8",  icon: "chart",     tone: "green" },
  { label: "الدورات المكتملة",         value: "12", icon: "check",     tone: "teal"  },
  { label: "دورات بانتظار الموافقة",   value: "4",  icon: "hourglass", tone: "green" },
];

// `tone` reuses the same teal/green vocabulary as QUICK_ACTION_STYLES (and
// the admin dashboard's matching quick-stat cards) so the icon circle and
// action button share one color per card.
interface TrainerQuickFollowupItem {
  key: "newNotifications" | "joinRequests" | "upcomingAppointments";
  value: number;
  label: string;
  tone: "teal" | "green";
  action: string;
  to: string;
}

const TRAINER_QUICK_FOLLOWUP: TrainerQuickFollowupItem[] = [
  { key: "newNotifications",    value: 6, label: "إشعارات جديدة",           tone: "teal",  action: "عرض الإشعارات",  to: "/trainer/notifications" },
  { key: "joinRequests",        value: 9, label: "طلبات انضمام للدورات",    tone: "green", action: "مراجعة الطلبات", to: "/trainer/programs"      },
  { key: "upcomingAppointments", value: 5, label: "المواعيد القريبة",       tone: "teal",  action: "عرض المواعيد",   to: "/trainer/schedule"       },
];

// Monthly attendance count (cumulative-looking trend across the year) and
// the trainer's overall course-completion split — feed the two charts above
// the trainee metrics row on the trainer dashboard.
interface TrainerAttendancePoint {
  label: string;
  count: number;
}

const TRAINER_ATTENDANCE_DATA: TrainerAttendancePoint[] = [
  { label: "يناير",   count: 12  },
  { label: "فبراير",  count: 28  },
  { label: "مارس",    count: 45  },
  { label: "أبريل",   count: 62  },
  { label: "مايو",    count: 78  },
  { label: "يونيو",   count: 92  },
  { label: "يوليو",   count: 108 },
  { label: "أغسطس",   count: 121 },
  { label: "سبتمبر",  count: 130 },
  { label: "أكتوبر",  count: 142 },
  { label: "نوفمبر",  count: 155 },
  { label: "ديسمبر",  count: 168 },
];

const TRAINER_COURSE_COMPLETION_DATA = {
  totalStudents: 300,
  completed: { label: "أكملوا الدورة", count: 204, percent: 68 },
  notCompleted: { label: "لم يكملوا الدورة", count: 96, percent: 32 },
};

// ── trainer-notifications ────────────────────────────────────────────────────

// All static copy shown on the trainer notifications page.
const TRAINER_NOTIFICATIONS_TEXT = {
  heroTitle: "الإشعارات",
  allReadMessage: "جميع إشعاراتك مقروءة.",
  filterLabel: "تصفية:",
  markAllReadButton: "تحديد الكل كمقروء",
  emptyMessage: "لا توجد إشعارات.",
  settingsCardTitle: "إعدادات الإشعارات",
  settingsDescription: "اختر متى تريد أن تصلك التذكيرات والإشعارات.",
};

// Builds the hero subtitle for a given unread count (Arabic plural agreement).
function formatTrainerUnreadMessage(unreadCount: number): string {
  if (unreadCount === 0) return TRAINER_NOTIFICATIONS_TEXT.allReadMessage;
  return `لديك ${unreadCount} إشعار${unreadCount === 1 ? "" : "ات"} غير مقروءة.`;
}

type TrainerNotificationType = "reminder" | "approval" | "system";

const TRAINER_NOTIFICATION_TYPES: Record<TrainerNotificationType, { label: string; style: string }> = {
  reminder: { label: "تذكير",  style: "bg-amber-100 text-amber-700"     },
  approval: { label: "موافقة", style: "bg-emerald-100 text-emerald-700" },
  system:   { label: "نظام",   style: "bg-slate-100 text-slate-600"     },
};

const TRAINER_NOTIFICATION_TYPE_FILTERS = [
  { value: "all",      label: "الكل"    },
  { value: "reminder", label: "تذكير"   },
  { value: "approval", label: "موافقة"  },
  { value: "system",   label: "نظام"    },
];

const TRAINER_REMINDER_OPTIONS = [
  { key: "sessionDay",   label: "قبل يوم من الجلسة"       },
  { key: "sessionHour",  label: "قبل ساعة من الجلسة"      },
  { key: "newApproval",  label: "عند الموافقة على برنامج" },
  { key: "systemUpdate", label: "تحديثات النظام"           },
];

interface TrainerNotification {
  id: number;
  type: TrainerNotificationType;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const INITIAL_TRAINER_NOTIFICATIONS: TrainerNotification[] = [
  { id: 1, type: "reminder", title: "تذكير بجلسة غداً",        body: "لديك جلسة تدريبية غداً الاثنين من 14:00 إلى 16:00 في قاعة B2.",   time: "منذ ساعة",   read: false },
  { id: 2, type: "approval", title: "تمت الموافقة على برنامجك", body: "وافقت الإدارة على نشر ورشة تصميم UI/UX.",                         time: "أمس",         read: true  },
  { id: 3, type: "system",   title: "تحديث سياسة المنصة",       body: "تم تحديث شروط الاستخدام للمدربين. يرجى مراجعتها.",               time: "منذ يومين",   read: true  },
  { id: 4, type: "reminder", title: "تذكير بجلسة اليوم",        body: "لديك جلسة تدريبية اليوم الأربعاء من 13:00 إلى 15:00 في قاعة C3.", time: "منذ 3 أيام",  read: true  },
];

const INITIAL_TRAINER_REMINDER_SETTINGS = {
  sessionDay:   true,
  sessionHour:  true,
  newApproval:  true,
  systemUpdate: false,
};

type TrainerReminderKey = keyof typeof INITIAL_TRAINER_REMINDER_SETTINGS;

// ── trainer-programs ─────────────────────────────────────────────────────────

// All static copy shown on the trainer programs page.
const TRAINER_PROGRAMS_TEXT = {
  heroTitle: "إدارة البرامج",
  heroSubtitle: "استعرض وتحكم في جميع برامجك التدريبية من مكان واحد.",
  searchPlaceholder: "ابحث عن برنامج...",
  typeFilterLabel: "النوع:",
  statusFilterLabel: "الحالة:",
  startDateLabel: "تاريخ البدء:",
  endDateLabel: "تاريخ الانتهاء:",
  studentsUnit: "طالب",
  sessionsUnit: "جلسة",
  viewDetailsButton: "عرض التفاصيل",
  emptyMessage: "لا توجد برامج مطابقة لبحثك.",
  addProgramPrompt: "هل تريد إضافة برنامج جديد؟ أرسل طلبك للإدارة للمراجعة والنشر.",
  addProgramButton: "+ إضافة برنامج جديد",
};

// Builds the programs card title with the current result count, e.g. "البرامج (٣)".
function formatTrainerProgramsCardTitle(count: number): string {
  return `البرامج (${count})`;
}

const TRAINER_PROGRAM_STATUS: Record<string, { label: string; style: string }> = {
  active:  { label: "نشط",          style: "bg-emerald-100 text-emerald-700" },
  pending: { label: "قيد المراجعة", style: "bg-amber-100 text-amber-700"    },
  ended:   { label: "منتهي",        style: "bg-slate-100 text-slate-600"    },
};

const TRAINER_PROGRAM_TYPE_FILTERS = [
  { value: "all",      label: "الكل"    },
  { value: "دورة",    label: "دورة"    },
  { value: "معسكر",   label: "معسكر"   },
  { value: "مسابقة", label: "مسابقة" },
];

const TRAINER_PROGRAM_STATUS_FILTERS = [
  { value: "all",     label: "الكل"         },
  { value: "active",  label: "نشط"          },
  { value: "pending", label: "قيد المراجعة" },
  { value: "ended",   label: "منتهي"        },
];

interface TrainerProgramItem {
  id: number;
  title: string;
  type: string;
  students: number;
  sessions: number;
  status: string;
  startDate: string;
  endDate: string | null;
}

const TRAINER_PROGRAMS: TrainerProgramItem[] = [
  { id: 1, title: "دورة Python للمبتدئين",    type: "دورة",    students: 18, sessions: 12, status: "active",  startDate: "2025-03-01", endDate: null         },
  { id: 2, title: "معسكر تطوير الويب",        type: "معسكر",   students: 12, sessions: 8,  status: "active",  startDate: "2025-04-10", endDate: null         },
  { id: 3, title: "ورشة تصميم UI/UX",         type: "دورة",    students: 9,  sessions: 6,  status: "pending", startDate: "2025-05-15", endDate: null         },
  { id: 4, title: "مسابقة البرمجة الإبداعية", type: "مسابقة", students: 30, sessions: 3,  status: "ended",   startDate: "2025-01-20", endDate: "2025-02-10" },
  { id: 5, title: "دورة قواعد البيانات",      type: "دورة",    students: 14, sessions: 10, status: "active",  startDate: "2025-04-01", endDate: null         },
  { id: 6, title: "معسكر الذكاء الاصطناعي",  type: "معسكر",   students: 20, sessions: 5,  status: "ended",   startDate: "2024-11-01", endDate: "2024-12-15" },
];

// ── trainer-schedule ─────────────────────────────────────────────────────────

// All static copy shown on the trainer schedule page.
const TRAINER_SCHEDULE_TEXT = {
  heroTitle: "جدولي التدريبي",
  heroSubtitle: "استعرض جلساتك التدريبية للأسبوع الحالي والأسابيع القادمة.",
  scheduleCardTitle: "الجدول",
};

type TrainerWeekKey = "current" | "next" | "upcoming";

interface TrainerScheduleSession {
  id: number;
  day: string;
  startSlot: number;
  endSlot: number;
  program: string;
  type: string;
  room: string;
  week: TrainerWeekKey;
}

const TRAINER_WEEK_DAY_KEYS: string[] = [
  "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت",
];

const TRAINER_TIME_SLOTS: string[] = [
  "8:00 ص",  "9:00 ص",  "10:00 ص", "11:00 ص",
  "12:00 م", "1:00 م",  "2:00 م",  "3:00 م",
  "4:00 م",  "5:00 م",  "6:00 م",
];

const ALL_TRAINER_SESSIONS: TrainerScheduleSession[] = [
  { id: 1,  day: "الاثنين",  startSlot: 2, endSlot: 6,  program: "دورة Python للمبتدئين",    type: "دورة",    room: "قاعة A1", week: "current"  },
  { id: 2,  day: "الثلاثاء", startSlot: 2, endSlot: 6,  program: "دورة Python للمبتدئين",    type: "دورة",    room: "قاعة A1", week: "current"  },
  { id: 3,  day: "الأربعاء", startSlot: 2, endSlot: 6,  program: "معسكر تطوير الويب",        type: "معسكر",   room: "قاعة B2", week: "current"  },
  { id: 4,  day: "الأربعاء", startSlot: 7, endSlot: 10, program: "ورشة تصميم UI/UX",         type: "دورة",    room: "قاعة C3", week: "current"  },
  { id: 5,  day: "الخميس",   startSlot: 2, endSlot: 6,  program: "دورة Python للمبتدئين",    type: "دورة",    room: "قاعة A1", week: "current"  },
  { id: 6,  day: "الأحد",    startSlot: 2, endSlot: 6,  program: "معسكر تطوير الويب",        type: "معسكر",   room: "قاعة B2", week: "current"  },
  { id: 7,  day: "الاثنين",  startSlot: 2, endSlot: 6,  program: "دورة Python للمبتدئين",    type: "دورة",    room: "قاعة A1", week: "next"     },
  { id: 8,  day: "الثلاثاء", startSlot: 2, endSlot: 6,  program: "معسكر تطوير الويب",        type: "معسكر",   room: "قاعة B2", week: "next"     },
  { id: 9,  day: "الأربعاء", startSlot: 3, endSlot: 7,  program: "دورة قواعد البيانات",      type: "دورة",    room: "قاعة D4", week: "next"     },
  { id: 10, day: "الأحد",    startSlot: 2, endSlot: 5,  program: "مسابقة البرمجة الإبداعية", type: "مسابقة", room: "قاعة E5", week: "upcoming" },
];

// Which real calendar week each mock session bucket maps to.
const TRAINER_WEEK_BUCKET_OFFSETS: Record<TrainerWeekKey, number> = {
  current: 0,
  next: 1,
  upcoming: 2,
};

// ── trainer-support ──────────────────────────────────────────────────────────

// All static copy shown on the trainer support page.
const TRAINER_SUPPORT_TEXT = {
  heroTitle: "الدعم الفني",
  heroSubtitle: "واجهتَ مشكلة؟ فريق الدعم هنا لمساعدتك.",
  supportHours: "أوقات الدعم: الأحد إلى الخميس، 9ص – 5م",
  formCardTitle: "إرسال طلب دعم",
  successMessage: "✓ تم إرسال طلبك بنجاح! سنتواصل معك في أقرب وقت.",
  authRequiredError: "يجب تسجيل الدخول لإرسال طلب دعم.",
  genericError: "تعذر إرسال طلبك، حاول مرة أخرى.",
  subjectLabel: "الموضوع",
  subjectPlaceholder: "اكتب موضوع الطلب",
  issueTypeLabel: "نوع المشكلة",
  issueTypePlaceholder: "اختر نوع المشكلة",
  messageLabel: "وصف المشكلة",
  messagePlaceholder: "اشرح مشكلتك بالتفصيل هنا...",
  attachmentLabel: "إرفاق صورة",
  attachmentPlaceholder: "اختياري - PNG أو JPG",
  submitButton: "إرسال الطلب",
  submittingButton: "جاري الإرسال...",
  guidelinesTitle: "إرشادات الدعم",
};

const TRAINER_ISSUE_TYPES = [
  { value: "مشكلة تقنية", label: "مشكلة تقنية" },
  { value: "أخرى",        label: "أخرى"        },
];

// Guidelines are keyed so the page can attach the matching icon component.
const TRAINER_SUPPORT_GUIDELINES = [
  { key: "response",  title: "رد سريع",     description: "يتم الرد عادةً خلال 24 ساعة في أيام العمل."   },
  { key: "technical", title: "مشاكل تقنية", description: "يرجى توضيح الخطأ أو إرفاق صورة إن أمكن."      },
];

const INITIAL_TRAINER_SUPPORT_FORM = { subject: "", issueType: "", message: "" };

// ── terms-and-conditions ─────────────────────────────────────────────────────

// Terms & Conditions sections (Arabic).
const TERMS_SECTIONS_AR = [
  { heading: "١. قبول الشروط", body: "باستخدامك لمنصة كبسولة تحول فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء منها، يُرجى التوقف عن استخدام المنصة." },
  { heading: "٢. التسجيل والحساب", body: "يجب أن تكون المعلومات المقدمة عند التسجيل دقيقة وكاملة. أنت مسؤول عن الحفاظ على سرية بيانات حسابك وكلمة مرورك." },
  { heading: "٣. سياسة الاستخدام المقبول", body: "يُحظر استخدام المنصة لأي غرض غير قانوني أو ينتهك حقوق الآخرين. يشمل ذلك نشر محتوى مسيء أو انتهاك حقوق الملكية الفكرية." },
  { heading: "٤. المدفوعات والاسترداد", body: "تُعالج المدفوعات عبر بوابات آمنة. يمكن طلب استرداد الرسوم خلال ٧ أيام من تاريخ التسجيل وفق الشروط المحددة لكل برنامج." },
  { heading: "٥. الملكية الفكرية", body: "جميع المواد التعليمية والمحتوى المنشور على المنصة محمية بموجب حقوق الملكية الفكرية. لا يجوز إعادة توزيعها أو نسخها دون إذن مسبق." },
  { heading: "٦. حماية البيانات والخصوصية", body: "نلتزم بحماية بياناتك الشخصية وفق سياسة الخصوصية المعتمدة ومتطلبات نظام حماية البيانات الشخصية في المملكة العربية السعودية." },
  { heading: "٧. تعديل الشروط", body: "تحتفظ المنصة بحق تعديل هذه الشروط في أي وقت. سيتم إخطارك بأي تغييرات جوهرية عبر البريد الإلكتروني المسجل." },
  { heading: "٨. القانون المطبق", body: "تخضع هذه الشروط لأنظمة وقوانين المملكة العربية السعودية، وأي نزاع يُحسم أمام المحاكم المختصة في المملكة." },
];

// Terms & Conditions sections (English).
const TERMS_SECTIONS_EN = [
  { heading: "1. Acceptance of Terms", body: "By using the Capsule Transform platform you agree to be bound by these Terms & Conditions. If you do not agree with any part of them, please stop using the platform." },
  { heading: "2. Registration & Account", body: "Information provided at registration must be accurate and complete. You are responsible for maintaining the confidentiality of your account credentials." },
  { heading: "3. Acceptable Use Policy", body: "The platform may not be used for any unlawful purpose or in a way that infringes the rights of others, including posting offensive content or violating intellectual property rights." },
  { heading: "4. Payments & Refunds", body: "Payments are processed via secure gateways. Refunds may be requested within 7 days of registration, subject to the terms of each individual program." },
  { heading: "5. Intellectual Property", body: "All educational materials and content published on the platform are protected by intellectual property rights and may not be redistributed or copied without prior written permission." },
  { heading: "6. Data Protection & Privacy", body: "We are committed to protecting your personal data in accordance with our Privacy Policy and the Personal Data Protection Law of Saudi Arabia." },
  { heading: "7. Modification of Terms", body: "The platform reserves the right to amend these Terms at any time. You will be notified of material changes via your registered email address." },
  { heading: "8. Governing Law", body: "These Terms are governed by the laws and regulations of the Kingdom of Saudi Arabia. Any disputes shall be resolved before the competent courts of the Kingdom." },
];

// ── exports ──────────────────────────────────────────────────────────────────

export type { ProductType };
export type { ProductStatus };
export type { Pricing };
export type { Instructor };
export type { Rating };
export type { Seats };
export type { Fact };
export type { Outcomes };
export type { CurriculumItem };
export type { Review };
export type { Prize };
export type { TimelineStep };
export type { CapabilityFormData };
export type { Product };
export type { ProductsMap };
export type { FilterOption };
export type { UserRole };
export type { DashboardSection };
export type { DashboardStat };
export type { ChartDataPoint };
export type { DashboardChart };
export type { DashboardUser };
export type { DashboardConfig };
export type { AdminLabel };
export type { Translatable };
export type { AdminProgramModule };
export type { AdminProgram };
export type { AdminSidebarLink };
export type { AdminStatCard };
export type { AdminGrowthRow };
export type { AdminQuickStat };
export type { GrowthRange };
export type { ProgramApprovalRequest };
export type { UserApprovalRequest };
export type { AdminUserRecord };
export type { AdminReport };
export type { AdminComplaint };
export type { AdminNewsEvent };
export type { AdminNotification };
export type { AdminScheduleRecurrenceOption };
export type { AdminScheduleTask };
export type { AdminDepartment };
export type { AdminTeamMember };
export type { CompletedItem };
export type { ActivityEntry };
export type { ProgramRequest };
export type { UserRequest };
export type { Complaint };
export type { UserGrowthDataPoint };
export type { ReportItem };
export type { AccountType };
export type { MessageType };
export type { ContactFormState };
export type { FaqItem };
export type { TeamMember };
export type { ActivityStatusFilter };
export type { NotificationCategory };
export type { NotificationItem };
export type { ScheduleSessionType };
export type { ScheduleSession };
export type { SupportFormData };
export type { WishlistSortKey };
export type { WishlistItemType };
export type { WishlistItemTypeEn };
export type { RegistrationStatus };
export type { WishlistItem };
export type { TrainerNotificationType };
export type { TrainerNotification };
export type { TrainerReminderKey };
export type { TrainerProgramItem };
export type { TrainerWeekKey };
export type { TrainerScheduleSession };

export { PRODUCT_TYPE_LABELS };
export { STATUS_LABELS };
export { PRODUCTS };
export { PROGRAM_PROVIDER_WEBSITES };
export { CATEGORY_LABELS };
export { CATEGORY_ICONS };
export { COURSE_CATALOGUE_DATA };
export { VISIBLE_TYPES_BY_ROLE };
export { HIDDEN_STATUSES };
export { PROGRAM_DETAILS_DATA };
export { ROLE_LABELS };
export { CONTENT_TYPE_FILTERS };
export { DASHBOARD_DATA };
export { ADMIN_LABELS };
export { adminTranslations };
export { ADMIN_SIDEBAR_LINKS };
export { ADMIN_STAT_CARDS };
export { ADMIN_USER_GROWTH_DATA_6M };
export { ADMIN_USER_GROWTH_DATA_1M };
export { ADMIN_USER_GROWTH_DATA_7D };
export { ADMIN_QUICK_STATS };
export { QUICK_ACTION_STYLES };
export { TONE_ICON_CIRCLE_CLASSES };
export { CHART_SERIES };
export { PROGRAM_TYPE_COLORS };
export { GROWTH_RANGE_DATA };
export { GROWTH_RANGE_OPTIONS };
export { ADMIN_COMPANY_EFFORTS_BASE };
export { COMPANY_EFFORTS_RANGE_OPTIONS };
export { getCompanyEffortsData };
export type { CompanyEffortsRange };
export { ADMIN_PLATFORM_PROGRESS_DATA };
export { ADMIN_PROGRAM_TYPE_PLURAL_LABELS };
export { formatDashboardNumber };
export { calculatePercentage };
export { PROGRAM_TYPES };
export { ADMIN_PROGRAMS };
export { getProgramDistribution };
export { PROGRAM_TYPE_TONES };
export { PROGRAM_STATUS_TONES };
export { PROGRAM_SORT_OPTIONS };
export { PROGRAM_STATUS_FILTER_OPTION_ALL };
export { PROGRAM_MANAGEMENT_COLUMNS };
export { PROGRAM_APPROVAL_REQUESTS };
export { USER_APPROVAL_REQUESTS };
export { APPROVAL_TYPE_FILTERS };
export { APPROVAL_PROGRAM_TYPE_VALUES };
export { APPROVAL_ACCOUNT_TYPE_VALUES };
export { APPROVAL_PROGRAM_COLUMNS };
export { APPROVAL_USER_COLUMNS };
export { ADMIN_USERS };
export { USER_ROLE_OPTIONS };
export { USER_STATUS_OPTIONS };
export { USER_INDIVIDUAL_ROLES };
export { USER_ROLE_TONES };
export { USER_ROLE_ICONS };
export { USER_STATUS_TONES };
export { USER_ROLE_FILTER_OPTIONS };
export { USER_STATUS_FILTER_OPTIONS };
export { USER_COLUMNS };
export { USER_STAT_CARDS };
export { ADMIN_REPORTS };
export { ADMIN_REPORT_SECTIONS };
export { ADMIN_REPORT_TYPES };
export { ADMIN_REPORT_STATUSES };
export { REPORT_STATUS_TONES };
export { REPORT_TYPE_OPTIONS };
export { REPORT_STATUS_OPTIONS };
export { REPORT_COLUMNS };
export { ADMIN_COMPLAINTS };
export { ADMIN_COMPLAINT_CATEGORIES };
export { ADMIN_COMPLAINT_PRIORITIES };
export { ADMIN_COMPLAINT_STATUSES };
export { COMPLAINT_STATUS_TONES };
export { COMPLAINT_CATEGORY_OPTIONS };
export { COMPLAINT_STATUS_OPTIONS };
export { COMPLAINT_COLUMNS };
export { NEWS_EVENT_TYPE_OPTIONS };
export { ADMIN_NEWS_EVENTS };
export { NEWS_EVENTS_TYPE_FILTER_OPTIONS };
export { NEWS_EVENTS_TYPE_TONES };
export { NEWS_EVENTS_STATUS_TONES };
export { NEWS_EVENTS_COLUMNS };
export { NEWS_EVENT_EDITOR_TYPE_TONES };
export { ADMIN_NOTIFICATION_TYPES };
export { ADMIN_NOTIFICATIONS };
export { NOTIFICATION_TYPE_TONES };
export { NOTIFICATION_TYPE_ICONS };
export { NOTIFICATION_TYPE_FILTER_OPTIONS };
export { NOTIFICATION_STATUS_FILTER_OPTIONS };
export { ADMIN_SCHEDULE_RECURRENCE_OPTIONS };
export { ADMIN_SCHEDULE_TASKS };
export { SCHEDULE_DURATION_OPTIONS };
export { COMPANY_EMAIL_DOMAIN };
export { DEPARTMENT_OPTIONS };
export { ADMIN_TEAM_MEMBERS };
export { TEAM_DEPARTMENT_TONES };
export { TEAM_STATUS_TONES };
export { TEAM_COLUMNS };
export { COMPLETED_ITEMS };
export { CURRENT_ACTIVITIES };
export { ANALYTICS_PERIOD_OPTIONS };
export { ACTIVITY_PROGRESS_DATA };
export { LEARNING_INTEREST_DATA };
export type { AnalyticsPeriod };
export type { ActivityProgressData };
export type { LearningInterestData };
export { PENDING_PROGRAM_REQUESTS };
export { PENDING_USER_REQUESTS };
export { COMPLAINTS_SEED };
export { USER_GROWTH_DATA };
export { REPORT_ITEMS };
export { FIELD_CLASS };
export { SUBMIT_CLASS };
export { LAST_ROLE_KEY };
export { ACCOUNT_TYPES };
export { LOGIN_DATA };
export { REGISTER_DATA };
export { FORGOT_PASSWORD_DATA };
export { CONTACT_DATA };
export { INITIAL_CONTACT_FORM };
export { HOME_DATA };
export { PAYMENT_DATA };
export { ACCOUNT_SETTINGS_DATA };
export { PROFILE_DATA };
export { ABOUT_DATA };
export { ACTIVITIES_STAT_BOXES };
export { ACTIVITIES_ICON_PATHS };
export { ACTIVITIES_CATEGORY_ICON_PATHS };
export { DASHBOARD_COMPLETED_TYPE_FILTERS };
export { DASHBOARD_ACTIVITY_TYPE_FILTERS };
export { DASHBOARD_ACTIVITY_GROUPS };
export { DASHBOARD_ACTIVITY_STATUS_FILTERS };
export { NOTIFICATIONS_SEED };
export { NOTIFICATIONS_INITIAL_VISIBLE_COUNT };
export { NOTIFICATION_CATEGORY_STYLES };
export { NOTIFICATION_CATEGORY_LABELS };
export { NOTIFICATIONS_ICON_PATHS };
export { SCHEDULE_TYPE_COLOR };
export { SCHEDULE_DAYS_AR };
export { SCHEDULE_MONTHS_AR };
export { SCHEDULE_TODAY_ISO };
export { SCHEDULE_SESSIONS_SEED };
export { SUPPORT_FORM_INITIAL };
export type { CompanyDashboardActivity };
export { COMPANY_DASHBOARD_STATS };
export { COMPANY_DASHBOARD_RECENT_ACTIVITIES };
export type { CompanyProgramGrowthViewMode };
export { COMPANY_PROGRAM_GROWTH_VIEW_MODE_OPTIONS };
export { COMPANY_PROGRAM_TYPE_LINE_NAMES };
export { COMPANY_TOTAL_PROGRAMS_LINE_NAME };
export type { CompanyProgramGrowthPoint };
export { COMPANY_PROGRAM_GROWTH_DATA };
export { COMPANY_TOTAL_PUBLISHED_PROGRAMS };
export type { CompanyEnrollmentCompletionPoint };
export { COMPANY_ENROLLMENT_COMPLETION_DATA };
export { SUPPORT_MESSAGE_TYPES };
export { SUPPORT_INPUT_CLASS };
export { SUPPORT_FAQ_ITEMS };
export { WISHLIST_SORT_OPTIONS };
export { WISHLIST_CATEGORY_FILTERS };
export { WISHLIST_STATUS_CONFIG };
export { WISHLIST_TYPE_BADGE_STYLES };
export { WISHLIST_SEED_ITEMS };
export { TERMS_SECTIONS_AR };
export { TERMS_SECTIONS_EN };
export { TRAINER_DASHBOARD_TEXT };
export { TRAINER_STATS };
export { TRAINER_QUICK_FOLLOWUP };
export { TRAINER_ATTENDANCE_DATA };
export { TRAINER_COURSE_COMPLETION_DATA };
export { TRAINER_NOTIFICATIONS_TEXT };
export { formatTrainerUnreadMessage };
export { TRAINER_NOTIFICATION_TYPES };
export { TRAINER_NOTIFICATION_TYPE_FILTERS };
export { TRAINER_REMINDER_OPTIONS };
export { INITIAL_TRAINER_NOTIFICATIONS };
export { INITIAL_TRAINER_REMINDER_SETTINGS };
export { TRAINER_PROGRAMS_TEXT };
export { formatTrainerProgramsCardTitle };
export { TRAINER_PROGRAM_STATUS };
export { TRAINER_PROGRAM_TYPE_FILTERS };
export { TRAINER_PROGRAM_STATUS_FILTERS };
export { TRAINER_PROGRAMS };
export { TRAINER_SCHEDULE_TEXT };
export { TRAINER_WEEK_DAY_KEYS };
export { TRAINER_TIME_SLOTS };
export { ALL_TRAINER_SESSIONS };
export { TRAINER_WEEK_BUCKET_OFFSETS };
export { TRAINER_SUPPORT_TEXT };
export { TRAINER_ISSUE_TYPES };
export { TRAINER_SUPPORT_GUIDELINES };
export { INITIAL_TRAINER_SUPPORT_FORM };
