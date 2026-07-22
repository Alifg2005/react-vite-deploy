import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRole } from "../../../shared/context/RoleContext";
import { PRODUCTS, PRODUCT_TYPE_LABELS, PROGRAM_DETAILS_DATA, PROGRAM_PROVIDER_WEBSITES } from "../../../mock";
import StarRating from "../../../shared/components/StarRating";
import DemoBar from "../components/DemoBar";
import ActionCard from "../components/ActionCard";
import CapabilityForm from "../components/CapabilityForm";
import { renderSection } from "../components/ProgramSections";

const { notFound: NOT_FOUND, hero: HERO } = PROGRAM_DETAILS_DATA;

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.5 14.5 14.5 9.5 M8 12a3 3 0 0 1 0-4.2l2-2a3 3 0 0 1 4.2 4.2M16 12a3 3 0 0 1 0 4.2l-2 2a3 3 0 0 1-4.2-4.2" />
    </svg>
  );
}

function NotFoundMessage() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center gap-3 py-20 text-center">
      <h2 className="text-2xl font-bold text-brand-text">{NOT_FOUND.title}</h2>
      <p className="text-sm text-brand-muted">{NOT_FOUND.description}</p>
      <button
        type="button"
        onClick={() => window.history.back()}
        className="mt-2 rounded-lg bg-brand-main px-4 py-2 text-sm font-bold text-white hover:opacity-90"
      >
        {NOT_FOUND.backLabel}
      </button>
    </section>
  );
}

export default function ProgramDetails() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { role: viewerRole } = useRole();
  const product = id ? PRODUCTS[id] : undefined;

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  if (!product) return <NotFoundMessage />;

  const providerWebsite = PROGRAM_PROVIDER_WEBSITES[product.provider];

  return (
    <section key={product.id} className="mx-auto flex max-w-6xl flex-col gap-5">
      <DemoBar product={product} />

      <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white">
            {PRODUCT_TYPE_LABELS[product.type]}
          </span>
          {providerWebsite ? (
            <a
              href={providerWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-base font-bold text-white hover:underline"
            >
              {product.provider}
              <LinkIcon />
            </a>
          ) : (
            <span className="text-base font-bold text-white">{product.provider}</span>
          )}
        </div>
        <h2 className="mb-2 text-3xl font-bold text-white md:text-4xl">{product.title}</h2>
        <p className="mb-4 text-lg text-white/85">{product.tagline}</p>
        <div className={HERO.ratingWrapperClass}>
          <StarRating value={product.rating.average} count={product.rating.count} onDark />
        </div>
      </div>

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
