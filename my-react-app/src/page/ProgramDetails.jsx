import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // ✅ added useParams
import { useRole } from "../context/RoleContext";
import StarRating from "../components/StarRating";
import SharedCard from "../components/SharedCard";
import {
  PRODUCTS,
  PRODUCT_TYPE_LABELS,
  STATUS_LABELS,
} from "../data/productData";

/* ---------- small shared helpers ---------- */
function StatusBadge({ status }) {
  const styles = {
    open: "bg-emerald-100 text-emerald-700",
    soon: "bg-amber-100 text-amber-700",
    full: "bg-rose-100 text-rose-700",
    closed: "bg-brand-white text-brand-muted",
  };
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${styles[status] ?? styles.closed}`}>
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

/* ---------- section components (data-driven, like About.jsx) ---------- */
function OverviewSection({ product }) {
  return (
    <SharedCard title="نبذة عن البرنامج">
      <p className="text-sm leading-7 text-brand-muted">{product.description}</p>
      {product.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-brand-white px-3 py-1 text-xs font-bold text-brand-text"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </SharedCard>
  );
}

function OutcomesSection({ product }) {
  const { outcomes } = product;
  if (!outcomes) return null;
  return (
    <SharedCard title="ماذا ستحقق؟">
      {outcomes.certificate ? (
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-brand-border bg-brand-white p-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-main text-white">
            ✓
          </span>
          <div>
            <p className="text-sm font-bold text-brand-text">{outcomes.certificateName}</p>
            <p className="text-xs text-brand-muted">شهادة معتمدة عند الإتمام</p>
          </div>
        </div>
      ) : null}
      <div className="grid gap-3 sm:grid-cols-2">
        {outcomes.skills.map((skill) => (
          <div
            key={skill}
            className="flex items-start gap-2 rounded-xl border border-brand-border bg-brand-white p-3"
          >
            <span className="mt-0.5 text-brand-main">◆</span>
            <p className="text-sm text-brand-muted">{skill}</p>
          </div>
        ))}
      </div>
    </SharedCard>
  );
}

function ModulesSection({ product, title, items }) {
  if (!items?.length) return null;
  return (
    <SharedCard title={title}>
      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <article
            key={item.title}
            className="flex items-center justify-between gap-4 rounded-xl border border-brand-border bg-brand-white p-4"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-main text-sm font-bold text-white">
                {index + 1}
              </span>
              <h4 className="text-base font-bold text-brand-text">{item.title}</h4>
            </div>
            {item.meta ? <span className="text-xs text-brand-muted">{item.meta}</span> : null}
          </article>
        ))}
      </div>
    </SharedCard>
  );
}

function IncludesSection({ product }) {
  if (!product.includes?.length) return null;
  return (
    <SharedCard title="ماذا يشمل المعسكر؟">
      <div className="grid gap-3 sm:grid-cols-2">
        {product.includes.map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 rounded-xl border border-brand-border bg-brand-white p-3"
          >
            <span className="text-brand-main">✓</span>
            <p className="text-sm text-brand-muted">{item}</p>
          </div>
        ))}
      </div>
    </SharedCard>
  );
}

function InstructorSection({ product }) {
  const { instructor } = product;
  if (!instructor) return null;
  return (
    <SharedCard title="المدرب">
      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-main text-xl font-bold text-white">
          {instructor.name.trim().charAt(0)}
        </span>
        <div>
          <p className="text-base font-bold text-brand-text">{instructor.name}</p>
          <p className="text-sm text-brand-muted">{instructor.role}</p>
        </div>
      </div>
    </SharedCard>
  );
}

function PrizesSection({ product }) {
  if (!product.prizes?.length) return null;
  return (
    <SharedCard title="الجوائز">
      <div className="grid gap-3 sm:grid-cols-3">
        {product.prizes.map((prize) => (
          <article
            key={prize.place}
            className="rounded-xl border border-brand-border bg-brand-white p-4 text-center"
          >
            <p className="mb-1 text-sm font-bold text-brand-main">{prize.place}</p>
            <p className="text-sm text-brand-text">{prize.reward}</p>
          </article>
        ))}
      </div>
    </SharedCard>
  );
}

function TimelineSection({ product }) {
  if (!product.timeline?.length) return null;
  return (
    <SharedCard title="الجدول الزمني">
      <div className="flex flex-col gap-3">
        {product.timeline.map((step) => (
          <div
            key={step.phase}
            className="flex items-center justify-between rounded-xl border border-brand-border bg-brand-white p-4"
          >
            <span className="text-sm font-bold text-brand-text">{step.phase}</span>
            <span className="text-sm text-brand-muted">{step.date}</span>
          </div>
        ))}
      </div>
    </SharedCard>
  );
}

function RulesSection({ product }) {
  if (!product.rules?.length) return null;
  return (
    <SharedCard title="الشروط والأحكام">
      <ul className="flex flex-col gap-2">
        {product.rules.map((rule) => (
          <li key={rule} className="flex items-start gap-2 text-sm text-brand-muted">
            <span className="mt-0.5 text-brand-main">•</span>
            {rule}
          </li>
        ))}
      </ul>
    </SharedCard>
  );
}

function BioSection({ product }) {
  if (!product.bio) return null;
  return (
    <SharedCard title="نبذة عن المدرب">
      <p className="text-sm leading-7 text-brand-muted">{product.bio}</p>
    </SharedCard>
  );
}

function SkillsSection({ product }) {
  if (!product.skills?.length) return null;
  return (
    <SharedCard title="المهارات والتخصصات">
      <div className="flex flex-wrap gap-2">
        {product.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-brand-white px-4 py-2 text-sm font-bold text-brand-text"
          >
            {skill}
          </span>
        ))}
      </div>
    </SharedCard>
  );
}

function CoursesTaughtSection({ product }) {
  if (!product.coursesTaught?.length) return null;
  return (
    <SharedCard title="الدورات التي يقدّمها">
      <div className="flex flex-col gap-3">
        {product.coursesTaught.map((course) => (
          <div
            key={course}
            className="rounded-xl border border-brand-border bg-brand-white p-4 text-sm font-bold text-brand-text"
          >
            {course}
          </div>
        ))}
      </div>
    </SharedCard>
  );
}

function ProjectBriefSection({ product }) {
  if (!product.projectBrief) return null;
  return (
    <SharedCard title="وصف المشروع">
      <p className="text-sm leading-7 text-brand-muted">{product.projectBrief}</p>
    </SharedCard>
  );
}

function RequiredRolesSection({ product }) {
  if (!product.requiredRoles?.length) return null;
  return (
    <SharedCard title="الأدوار المطلوبة في الفريق">
      <div className="grid gap-3 sm:grid-cols-2">
        {product.requiredRoles.map((roleName) => (
          <div
            key={roleName}
            className="flex items-center gap-2 rounded-xl border border-brand-border bg-brand-white p-3"
          >
            <span className="text-brand-main">◆</span>
            <p className="text-sm font-bold text-brand-text">{roleName}</p>
          </div>
        ))}
      </div>
    </SharedCard>
  );
}

function ReviewsSection({ product }) {
  if (!product.reviews?.length) return null;
  return (
    <SharedCard title="التقييمات والآراء">
      <div className="mb-4 flex items-center gap-3">
        <StarRating value={product.rating.average} count={product.rating.count} size="lg" />
      </div>
      <div className="flex flex-col gap-3">
        {product.reviews.map((review) => (
          <article
            key={`${review.name}-${review.date}`}
            className="rounded-xl border border-brand-border bg-brand-white p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-bold text-brand-text">{review.name}</p>
              <StarRating value={review.rating} />
            </div>
            <p className="text-sm text-brand-muted">{review.comment}</p>
            <p className="mt-2 text-xs text-brand-muted">{review.date}</p>
          </article>
        ))}
      </div>
    </SharedCard>
  );
}

function RelatedSection({ product }) {
  const navigate = useNavigate();
  const related = (product.related ?? [])
    .map((id) => PRODUCTS[id])
    .filter(Boolean);
  if (!related.length) return null;
  return (
    <SharedCard title="برامج ذات صلة">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => navigate(`/program/${item.id}`)}
            className="rounded-xl border border-brand-border bg-brand-white p-4 text-right transition hover:bg-brand-white"
          >
            <span className="mb-2 inline-block rounded-full bg-brand-main px-3 py-1 text-xs font-bold text-white">
              {PRODUCT_TYPE_LABELS[item.type]}
            </span>
            <h4 className="text-sm font-bold text-brand-text">{item.title}</h4>
          </button>
        ))}
      </div>
    </SharedCard>
  );
}

/* ---------- section registry: page renders whatever the product lists ---------- */
function renderSection(key, product) {
  switch (key) {
    case "overview":
      return <OverviewSection product={product} />;
    case "outcomes":
      return <OutcomesSection product={product} />;
    case "curriculum":
      return <ModulesSection product={product} title="محتوى الدورة" items={product.curriculum} />;
    case "schedule":
      return <ModulesSection product={product} title="جدول المعسكر" items={product.schedule} />;
    case "includes":
      return <IncludesSection product={product} />;
    case "instructor":
      return <InstructorSection product={product} />;
    case "prizes":
      return <PrizesSection product={product} />;
    case "timeline":
      return <TimelineSection product={product} />;
    case "rules":
      return <RulesSection product={product} />;
    case "bio":
      return <BioSection product={product} />;
    case "skills":
      return <SkillsSection product={product} />;
    case "coursesTaught":
      return <CoursesTaughtSection product={product} />;
    case "projectBrief":
      return <ProjectBriefSection product={product} />;
    case "requiredRoles":
      return <RequiredRolesSection product={product} />;
    case "reviews":
      return <ReviewsSection product={product} />;
    case "related":
      return <RelatedSection product={product} />;
    default:
      return null;
  }
}

/* ---------- role-aware action logic (the 3 dimensions: type × role × state) ---------- */
function getActionConfig({ product, role, isEnrolled }) {
  if (product.type === "trainer") {
    if (role === "company") return { label: "طلب هذا المدرب", enabled: true };
    if (role === "admin") return { label: "إدارة ملف المدرب", enabled: true, dark: true };
    if (role === "guest") return { label: "سجّل الدخول للتواصل", enabled: true, needsAuth: true };
    return { label: "طلب المدربين متاح للشركات", enabled: false };
  }
  if (product.type === "project") {
    if (role === "company") return { label: "طلب فريق لهذا المشروع", enabled: true };
    if (role === "trainer") return { label: "انضمّ كخبير للفريق", enabled: true };
    if (role === "admin") return { label: "إدارة المشروع", enabled: true, dark: true };
    if (role === "guest") return { label: "سجّل الدخول", enabled: true, needsAuth: true };
    return { label: "الطلب متاح للشركات", enabled: false };
  }
  // course / camp / competition
  if (product.status === "full") return { label: "القائمة ممتلئة", enabled: false };
  if (product.status === "closed") return { label: "التسجيل مغلق", enabled: false };
  if (role === "admin") return { label: "إدارة البرنامج", enabled: true, dark: true };
  if (role === "guest") return { label: "سجّل الدخول للتسجيل", enabled: true, needsAuth: true };
  if (isEnrolled) return { label: "أنت مسجّل ✔", enabled: false };
  if (product.hasCapabilityForm) return { label: "التقديم لنموذج القبول", enabled: true, opensForm: true };
  if (product.type === "competition") return { label: "سجّل الآن", enabled: true };
  return { label: "سجّل الآن", enabled: true };
}

/* ---------- the action / price card (sticky sidebar) ---------- */

function ActionCard({
  product,
  viewerRole,
  isEnrolled,
  isWishlisted,
  onEnroll,
  onOpenForm,
  onToggleWishlist,
  onNavigateToPayment,
}) {
  const action = getActionConfig({ product, role: viewerRole, isEnrolled });

  const priceLabel = product.pricing.isFree
    ? "مجاني"
    : `${product.pricing.price.toLocaleString("en-US")} ${product.pricing.currency}`;

  function handleClick() {
    if (!action.enabled) return;
    if (action.opensForm) return onOpenForm();

    if (!product.pricing.isFree) {
      return onNavigateToPayment();
    }

    return onEnroll();
  }

  // ... باقي كود الـ JSX داخل المكون يظل كما هو دون تغيير

  const showSeats = ["course", "camp", "competition"].includes(product.type);
  const showWishlist =
    viewerRole === "student" && product.type !== "project" && product.type !== "trainer";

  return (
    <div className="rounded-2xl border border-brand-border bg-brand-white p-6 lg:sticky lg:top-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-2xl font-bold text-brand-text">{priceLabel}</span>
        <StatusBadge status={product.status} />
      </div>
      <div className="mb-4 flex flex-col gap-2">
        {product.facts.map((fact) => (
          <div key={fact.label} className="flex items-center justify-between text-sm">
            <span className="text-brand-muted">{fact.label}</span>
            <span className="font-bold text-brand-text">{fact.value}</span>
          </div>
        ))}
      </div>
      {showSeats && product.seats.total > 0 ? (
        <div className="mb-4 rounded-xl bg-brand-white p-3 text-center text-sm font-bold text-brand-text">
          المقاعد المتبقية: {product.seats.remaining} من {product.seats.total}
        </div>
      ) : null}
      <button
        type="button"
        onClick={handleClick}
        disabled={!action.enabled}
        className={`w-full rounded-lg px-4 py-3 text-sm font-bold transition ${
          !action.enabled
            ? "cursor-not-allowed bg-brand-white text-brand-muted"
            : action.dark
            ? "bg-brand-dark text-white hover:opacity-90"
            : "bg-brand-main text-white hover:opacity-90"
        }`}
      >
        {action.label}
      </button>
      {showWishlist ? (
        <button
          type="button"
          onClick={onToggleWishlist}
          className={`mt-3 w-full rounded-lg border px-4 py-3 text-sm font-bold transition ${
            isWishlisted
              ? "border-brand-main bg-brand-white text-brand-main"
              : "border-brand-border text-brand-text hover:bg-brand-white"
          }`}
        >
          {isWishlisted ? "♥ في قائمة الرغبات" : "♡ أضف لقائمة الرغبات"}
        </button>
      ) : null}
    </div>
  );
}

/* ---------- capability form (state + conditional render) ---------- */
function CapabilityForm({ product, onClose }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

    if (!product.capabilityForm) return null; // safety net

  function updateAnswer(index, value) {
    setAnswers((current) => ({ ...current, [index]: value }));
  }

  if (submitted) {
    return (
      <SharedCard title="تم إرسال طلبك">
        <p className="text-sm text-brand-muted">
          شكراً لك، تم استلام نموذج القبول وسيتم مراجعته والرد عليك قريباً.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 rounded-lg bg-brand-main px-4 py-2 text-sm font-bold text-white hover:opacity-90"
        >
          إغلاق
        </button>
      </SharedCard>
    );
  }

  return (
    <SharedCard title="نموذج القبول">
      <p className="mb-4 text-sm text-brand-muted">{product.capabilityForm.note}</p>
      <div className="flex flex-col gap-4">
        {product.capabilityForm.questions.map((question, index) => (
          <div key={question} className="flex flex-col gap-2">
            <label className="text-sm font-bold text-brand-text">{question}</label>
            <textarea
              rows={2}
              value={answers[index] ?? ""}
              onChange={(event) => updateAnswer(index, event.target.value)}
              className="rounded-lg border border-brand-border bg-brand-white px-3 py-2 text-sm"
              placeholder="اكتب إجابتك هنا..."
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="rounded-lg bg-brand-main px-4 py-2 text-sm font-bold text-white hover:opacity-90"
        >
          إرسال الطلب
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-brand-border px-4 py-2 text-sm font-bold text-brand-text hover:bg-brand-white"
        >
          إلغاء
        </button>
      </div>
    </SharedCard>
  );
}

/* ---------- demo bar: quick-jump between sample products of each type ---------- */
const DEMO_PRODUCT_TYPES = ["course", "camp", "competition", "trainer"];
function DemoBar({ product }) {
  const navigate = useNavigate();
  function goToType(type) {
    const item = Object.values(PRODUCTS).find((entry) => entry.type === type);
    if (item) navigate(`/program/${item.id}`);
  }
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-brand-border bg-brand-white p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-brand-muted">المنتج:</span>
        {DEMO_PRODUCT_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => goToType(type)}
            className={`rounded-full px-3 py-1 text-xs font-bold transition ${
              type === product.type ? "bg-brand-main text-white" : "bg-brand-white text-brand-muted"
            }`}
          >
            {PRODUCT_TYPE_LABELS[type]}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- the page ---------- */
export default function ProgramDetails() {
  const { id } = useParams(); // ✅ now imported correctly
  const navigate = useNavigate();
  const product = PRODUCTS[id]; // ✅ no more silent fallback to "react-course"
  const { role: viewerRole } = useRole();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  // ✅ real "not found" state instead of quietly showing an unrelated product
  if (!product) {
    return (
      <section className="mx-auto flex max-w-2xl flex-col items-center gap-3 py-20 text-center">
        <h2 className="text-2xl font-bold text-brand-text">لم يتم العثور على البرنامج</h2>
        <p className="text-sm text-brand-muted">
          تحقق من الرابط، أو تصفّح البرامج المتاحة من صفحة البرامج.
        </p>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="mt-2 rounded-lg bg-brand-main px-4 py-2 text-sm font-bold text-white hover:opacity-90"
        >
          العودة
        </button>
      </section>
    );
  }

  return (
    <section key={product.id} className="mx-auto flex max-w-6xl flex-col gap-5">
      <DemoBar product={product} />
      {/* hero */}
      <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white">
            {PRODUCT_TYPE_LABELS[product.type]}
          </span>
          <span className="text-sm text-white/85">{product.provider}</span>
        </div>
        <h2 className="mb-2 text-3xl font-bold text-white md:text-4xl">{product.title}</h2>
        <p className="mb-4 text-lg text-white/85">{product.tagline}</p>
        <div className="flex items-center gap-3 rounded-full bg-white/15 px-3 py-1 w-fit">
          <StarRating value={product.rating.average} count={product.rating.count} />
        </div>
      </div>

      {/* body: content + sticky action card */}
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="flex flex-col gap-5 lg:col-span-2">
          {formOpen ? (
            <CapabilityForm product={product} onClose={() => setFormOpen(false)} />
          ) : null}
          {product.sections.map((key) => (
            <div key={key}>{renderSection(key, product)}</div>
          ))}
        </div>
<div className="lg:col-span-1">
          <ActionCard
            product={product}
            viewerRole={viewerRole}
            isEnrolled={isEnrolled}
            isWishlisted={isWishlisted}
            onEnroll={() => setIsEnrolled(true)}
            onOpenForm={() => setFormOpen(true)}
            onToggleWishlist={() => setIsWishlisted((current) => !current)}
            onNavigateToPayment={() => navigate(`/payment/${product.id}`)}
          />
        </div>
      </div>
    </section>
  );
}