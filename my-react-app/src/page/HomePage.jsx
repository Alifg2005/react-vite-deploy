import { HOME_DATA } from "../data/homeData";
import CatalogueFilterBar from "../components/CatalogueFilterBar";
import GradientBanner from "../components/GradientBanner";
import SectionCard from "../components/SectionCard";
import StatsGrid from "../components/StatsGrid";
import FaqList from "../components/FaqList";
import FeatureCardGrid from "../components/FeatureCardGrid";
import { useNavigate } from "react-router-dom";

function ProgramsSection({ programs }) {
  return (
    <SectionCard title={programs.title} subtitle={programs.subtitle}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {programs.items.map((program) => (
          <article
            key={program.title}
            className="rounded-xl border border-brand-border bg-brand-light p-4"
          >
            <span className="mb-3 inline-block rounded-full bg-brand-main px-3 py-1 text-xs font-bold text-white">
              {program.badge}
            </span>
            <h4 className="mb-1 text-lg font-bold text-brand-text">{program.title}</h4>
            <p className="text-sm text-brand-muted">{program.description}</p>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}

function NewsSection({ news }) {
  return (
    <SectionCard title={news.title} subtitle={news.subtitle}>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {news.items.map((item) => (
          <article
            key={item.title}
            className="rounded-xl border border-brand-border bg-brand-light p-4"
          >
            <span className="mb-3 inline-block rounded-full bg-brand-main px-3 py-1 text-xs font-bold text-white">
              {item.tag}
            </span>
            <h4 className="mb-1 text-base font-bold text-brand-text">{item.title}</h4>
            <p className="mb-2 text-sm text-brand-muted">{item.excerpt}</p>
            <p className="text-xs text-brand-muted">{item.date}</p>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}

function TestimonialsSection({ testimonials }) {
  return (
    <SectionCard title={testimonials.title} subtitle={testimonials.subtitle}>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.items.map((testimonial) => (
          <article
            key={testimonial.name}
            className="rounded-xl border border-brand-border bg-brand-light p-4"
          >
            <p className="mb-4 text-sm text-brand-muted">“{testimonial.quote}”</p>
            <h4 className="text-sm font-bold text-brand-text">{testimonial.name}</h4>
            <p className="text-xs text-brand-muted">{testimonial.role}</p>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}

function PartnersSection({ partners }) {
  return (
    <SectionCard title={partners.title} subtitle={partners.subtitle}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {partners.items.map((partner) => (
          <article
            key={partner.name}
            className="flex items-center justify-center rounded-xl border border-dashed border-brand-border bg-brand-light p-6 text-center text-sm font-bold text-brand-muted"
          >
            {partner.name}
          </article>
        ))}
      </div>
    </SectionCard>
  );
}

function HomePage() {
  const navigate = useNavigate();

  const { hero, programs, highlights, stats, news, testimonials, partners, faqPreview, cta } =
    HOME_DATA;

  return (
    <div className="flex flex-col gap-5">
      

      <CatalogueFilterBar />

      <section className="flex flex-col gap-5">
        <GradientBanner title={hero.title} subtitle={hero.subtitle}>
          <button
            type="button"
            className="rounded-lg bg-brand-main px-4 py-2 text-sm font-bold text-white transition hover:opacity-90"
            onClick={() => navigate("/course-catalogue") }
          >
            {hero.primaryLabel}
          </button>
          <button
            type="button"
            className="rounded-lg border border-white/40 bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/20"
            onClick={() => navigate("/register") }
          >
            {hero.secondaryLabel}
          </button>
        </GradientBanner>

        <ProgramsSection programs={programs} />

        <SectionCard title={highlights.title}>
          <FeatureCardGrid items={highlights.items} />
        </SectionCard>

        <StatsGrid stats={stats} />

        <NewsSection news={news} />

        <TestimonialsSection testimonials={testimonials} />

        <PartnersSection partners={partners} />

        <SectionCard title={faqPreview.title}>
          <FaqList items={faqPreview.items} />
        </SectionCard>

        <GradientBanner title={cta.title} subtitle={cta.subtitle} layout="row">
          <button
            type="button"
            className="rounded-lg bg-brand-main px-4 py-2 text-sm font-bold text-white transition hover:opacity-90"
            onClick={() => navigate("/register") }
          >
            {cta.primaryLabel}
          </button>
          <button
            type="button"
            className="rounded-lg border border-white/40 bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/20"
            onClick={() => navigate("/contact") }
          >
            {cta.secondaryLabel}
          </button>
        </GradientBanner>
      </section>
    </div>
  );
}

export default HomePage;