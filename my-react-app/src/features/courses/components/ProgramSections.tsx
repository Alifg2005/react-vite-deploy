import type { JSX } from "react";
import { useNavigate } from "react-router-dom";
import SharedCard from "../../../shared/components/SharedCard";
import StarRating from "../../../shared/components/StarRating";
import { PRODUCTS, PRODUCT_TYPE_LABELS, PROGRAM_DETAILS_DATA } from "../../../mock";
import type { Product } from "../../../mock";

const { sections: SECTION_LABELS } = PROGRAM_DETAILS_DATA;

function OverviewSection({ product }: { product: Product }) {
  return (
    <SharedCard title={SECTION_LABELS.overview}>
      <p className="text-sm leading-7 text-brand-muted">{product.description}</p>
      {product.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-brand-white px-3 py-1 text-xs font-bold text-brand-text">
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </SharedCard>
  );
}

// Turns a YouTube watch/short/embed URL into an embeddable player URL.
function getYouTubeEmbedUrl(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/);
  const videoId = match?.[1];
  if (!videoId) return null;

  const params = new URLSearchParams({ modestbranding: "1", rel: "0" });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

function IntroVideoSection({ product }: { product: Product }) {
  if (!product.introVideoUrl) return null;
  const embedUrl = getYouTubeEmbedUrl(product.introVideoUrl);
  if (!embedUrl) return null;

  return (
    <SharedCard title={SECTION_LABELS.introVideo}>
      <div className="aspect-video w-full overflow-hidden rounded-xl">
        <iframe
          src={embedUrl}
          title={product.title}
          allow="autoplay; encrypted-media"
          className="h-full w-full"
        />
      </div>
    </SharedCard>
  );
}

function OutcomesSection({ product }: { product: Product }) {
  const { outcomes } = product;
  if (!outcomes) return null;
  return (
    <SharedCard title={SECTION_LABELS.outcomes}>
      {outcomes.certificate ? (
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-brand-border bg-brand-white p-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-main text-white">✓</span>
          <div>
            <p className="text-sm font-bold text-brand-text">{outcomes.certificateName}</p>
            <p className="text-xs text-brand-muted">{SECTION_LABELS.certificateLabel}</p>
          </div>
        </div>
      ) : null}
      <div className="flex flex-col gap-3">
        {outcomes.skills.map((skill) => (
          <div key={skill} className="flex items-start gap-2 rounded-xl border border-brand-border bg-brand-white p-3">
            <span className="mt-0.5 text-brand-main">◆</span>
            <p className="text-sm text-brand-muted">{skill}</p>
          </div>
        ))}
      </div>
    </SharedCard>
  );
}

interface ModulesSectionProps {
  title: string;
  items?: Array<{ title: string; meta?: string }>;
}

function ModulesSection({ title, items }: ModulesSectionProps) {
  if (!items?.length) return null;
  return (
    <SharedCard title={title}>
      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <article key={item.title} className="flex items-center justify-between gap-4 rounded-xl border border-brand-border bg-brand-white p-4">
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

function IncludesSection({ product }: { product: Product }) {
  if (!product.includes?.length) return null;
  return (
    <SharedCard title={SECTION_LABELS.includes}>
      <div className="grid gap-3 sm:grid-cols-2">
        {product.includes.map((item) => (
          <div key={item} className="flex items-center gap-2 rounded-xl border border-brand-border bg-brand-white p-3">
            <span className="text-brand-main">✓</span>
            <p className="text-sm text-brand-muted">{item}</p>
          </div>
        ))}
      </div>
    </SharedCard>
  );
}

function InstructorSection({ product }: { product: Product }) {
  const { instructor } = product;
  if (!instructor) return null;
  return (
    <SharedCard title={SECTION_LABELS.instructor}>
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

function PrizesSection({ product }: { product: Product }) {
  if (!product.prizes?.length) return null;
  return (
    <SharedCard title={SECTION_LABELS.prizes}>
      <div className="grid gap-3 sm:grid-cols-3">
        {product.prizes.map((prize) => (
          <article key={prize.place} className="rounded-xl border border-brand-border bg-brand-white p-4 text-center">
            <p className="mb-1 text-sm font-bold text-brand-main">{prize.place}</p>
            <p className="text-sm text-brand-text">{prize.reward}</p>
          </article>
        ))}
      </div>
    </SharedCard>
  );
}

function TimelineSection({ product }: { product: Product }) {
  if (!product.timeline?.length) return null;
  return (
    <SharedCard title={SECTION_LABELS.timeline}>
      <div className="flex flex-col gap-3">
        {product.timeline.map((step) => (
          <div key={step.phase} className="flex items-center justify-between rounded-xl border border-brand-border bg-brand-white p-4">
            <span className="text-sm font-bold text-brand-text">{step.phase}</span>
            <span className="text-sm text-brand-muted">{step.date}</span>
          </div>
        ))}
      </div>
    </SharedCard>
  );
}

function RulesSection({ product }: { product: Product }) {
  if (!product.rules?.length) return null;
  return (
    <SharedCard title={SECTION_LABELS.rules}>
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

function BioSection({ product }: { product: Product }) {
  if (!product.bio) return null;
  return (
    <SharedCard title={SECTION_LABELS.bio}>
      <p className="text-sm leading-7 text-brand-muted">{product.bio}</p>
    </SharedCard>
  );
}

function SkillsSection({ product }: { product: Product }) {
  if (!product.skills?.length) return null;
  return (
    <SharedCard title={SECTION_LABELS.skills}>
      <div className="flex flex-wrap gap-2">
        {product.skills.map((skill) => (
          <span key={skill} className="rounded-full bg-brand-white px-4 py-2 text-sm font-bold text-brand-text">
            {skill}
          </span>
        ))}
      </div>
    </SharedCard>
  );
}

function CoursesTaughtSection({ product }: { product: Product }) {
  if (!product.coursesTaught?.length) return null;
  return (
    <SharedCard title={SECTION_LABELS.coursesTaught}>
      <div className="flex flex-col gap-3">
        {product.coursesTaught.map((course) => (
          <div key={course} className="rounded-xl border border-brand-border bg-brand-white p-4 text-sm font-bold text-brand-text">
            {course}
          </div>
        ))}
      </div>
    </SharedCard>
  );
}

function ProjectBriefSection({ product }: { product: Product }) {
  if (!product.projectBrief) return null;
  return (
    <SharedCard title={SECTION_LABELS.projectBrief}>
      <p className="text-sm leading-7 text-brand-muted">{product.projectBrief}</p>
    </SharedCard>
  );
}

function RequiredRolesSection({ product }: { product: Product }) {
  if (!product.requiredRoles?.length) return null;
  return (
    <SharedCard title={SECTION_LABELS.requiredRoles}>
      <div className="grid gap-3 sm:grid-cols-2">
        {product.requiredRoles.map((roleName) => (
          <div key={roleName} className="flex items-center gap-2 rounded-xl border border-brand-border bg-brand-white p-3">
            <span className="text-brand-main">◆</span>
            <p className="text-sm font-bold text-brand-text">{roleName}</p>
          </div>
        ))}
      </div>
    </SharedCard>
  );
}

function ReviewsSection({ product }: { product: Product }) {
  if (!product.reviews?.length) return null;
  return (
    <SharedCard title={SECTION_LABELS.reviews}>
      <div className="mb-4 flex items-center gap-3">
        <StarRating value={product.rating.average} count={product.rating.count} size="lg" />
      </div>
      <div className="flex flex-col gap-3">
        {product.reviews.map((review) => (
          <article key={`${review.name}-${review.date}`} className="rounded-xl border border-brand-border bg-brand-white p-4">
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

function RelatedSection({ product }: { product: Product }) {
  const navigate = useNavigate();
  const related = (product.related ?? []).map((id) => PRODUCTS[id]).filter(Boolean);
  if (!related.length) return null;
  return (
    <SharedCard title={SECTION_LABELS.related}>
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

function renderSection(key: string, product: Product): JSX.Element | null {
  switch (key) {
    case "overview": return <OverviewSection product={product} />;
    case "introVideo": return <IntroVideoSection product={product} />;
    case "outcomes": return <OutcomesSection product={product} />;
    case "curriculum": return <ModulesSection title={SECTION_LABELS.curriculum} items={product.curriculum} />;
    case "schedule": return <ModulesSection title={SECTION_LABELS.schedule} items={product.schedule} />;
    case "includes": return <IncludesSection product={product} />;
    case "instructor": return <InstructorSection product={product} />;
    case "prizes": return <PrizesSection product={product} />;
    case "timeline": return <TimelineSection product={product} />;
    case "rules": return <RulesSection product={product} />;
    case "bio": return <BioSection product={product} />;
    case "skills": return <SkillsSection product={product} />;
    case "coursesTaught": return <CoursesTaughtSection product={product} />;
    case "projectBrief": return <ProjectBriefSection product={product} />;
    case "requiredRoles": return <RequiredRolesSection product={product} />;
    case "reviews": return <ReviewsSection product={product} />;
    case "related": return <RelatedSection product={product} />;
    default: return null;
  }
}

export { renderSection };
