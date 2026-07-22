import { COURSE_CATALOGUE_DATA } from "../../../mock";

const { title, subtitle } = COURSE_CATALOGUE_DATA.banner;

function CatalogueBanner() {
  return (
    <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
      <h2 className="mb-2 text-3xl font-bold text-white md:text-4xl">{title}</h2>
      <p className="text-lg text-white/85">{subtitle}</p>
    </div>
  );
}

export default CatalogueBanner;
