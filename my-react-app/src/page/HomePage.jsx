import { HOME_DATA } from "../data/homeData";
import GradientBanner from "../components/GradientBanner";
import SharedCard from "../components/SharedCard";
import StatsGrid from "../components/StatsGrid";
import FeatureCardGrid from "../components/FeatureCardGrid";
import { useNavigate } from "react-router-dom";
import heroPhoto from "../images/log.jpg";

function ProgramsSection({ programs }) {
  return (
    <SharedCard title={programs.title} subtitle={programs.subtitle}>
      <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {programs.items.map((program) => (
          <article
            key={program.title}
            className="flex h-full flex-col rounded-xl border border-brand-border bg-brand-white p-4"
          >
            <span className="mb-3 inline-block w-fit rounded-full bg-brand-main px-3 py-1 text-xs font-bold text-white">
              {program.badge}
            </span>
            <h4 className="mb-1 text-lg font-bold text-brand-text">{program.title}</h4>
            <p className="text-sm text-brand-muted">{program.description}</p>
          </article>
        ))}
      </div>
    </SharedCard>
  );
}


function NewsSection({ news }) {
  return (
    <SharedCard title={news.title} subtitle={news.subtitle}>
      <div className="grid items-stretch gap-3 md:grid-cols-2 lg:grid-cols-3">
        {news.items.map((item) => (
          <article
            key={item.title}
            className="flex h-full flex-col rounded-xl border border-brand-border bg-brand-white p-4"
          >
            <span className="mb-3 inline-block w-fit rounded-full bg-brand-main px-3 py-1 text-xs font-bold text-white">
              {item.tag}
            </span>
            <h4 className="mb-1 text-base font-bold text-brand-text">{item.title}</h4>
            <p className="mb-2 flex-1 text-sm text-brand-muted">{item.excerpt}</p>
            <p className="mt-auto text-xs text-brand-muted">{item.date}</p>
          </article>
        ))}
      </div>
    </SharedCard>
  );
}

function TestimonialsSection({ testimonials }) {
  return (
    <SharedCard title={testimonials.title} subtitle={testimonials.subtitle}>
      <div className="grid items-stretch gap-3 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.items.map((testimonial) => (
          <article
            key={testimonial.name}
            className="flex h-full flex-col rounded-xl border border-brand-border bg-brand-white p-4"
          >
            <p className="mb-4 flex-1 text-sm text-brand-muted">“{testimonial.quote}”</p>
            <h4 className="text-sm font-bold text-brand-text">{testimonial.name}</h4>
            <p className="text-xs text-brand-muted">{testimonial.role}</p>
          </article>
        ))}
      </div>
    </SharedCard>
  );
}

function PartnersSection({ partners }) {
  return (
    <SharedCard title={partners.title} subtitle={partners.subtitle}>
      <div className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-4">
        {partners.items.map((partner) => (
          <article
            key={partner.name}
            className="flex h-full items-center justify-center rounded-xl border border-dashed border-brand-border bg-brand-white p-6 text-center text-sm font-bold text-brand-muted"
          >
            {partner.name}
          </article>
        ))}
      </div>
    </SharedCard>
  );
}

function HomePage() {
  const navigate = useNavigate();

  const { hero, programs, highlights, stats, news, testimonials, partners, cta } = HOME_DATA;

  return (
    <div className="flex flex-col gap-5">
      <section className="flex flex-col gap-5">
        <GradientBanner title={hero.title} subtitle={hero.subtitle} image={heroPhoto}>
          <button
            type="button"
            className="rounded-full bg-brand-sky px-6 py-3 text-sm font-bold text-brand-earth transition hover:opacity-90"
            onClick={() => navigate("/course-catalogue")}
          >
            {hero.primaryLabel}
          </button>
          <button
            type="button"
            className="rounded-full border border-white/60 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/20"
            onClick={() => navigate("/register")}
          >
            {hero.secondaryLabel}
          </button>
        </GradientBanner>

        <ProgramsSection programs={programs} />

        <SharedCard title={highlights.title}>
          <FeatureCardGrid items={highlights.items} />
        </SharedCard>

        <StatsGrid stats={stats} />

        <NewsSection news={news} />

        <TestimonialsSection testimonials={testimonials} />

        <PartnersSection partners={partners} />

        <GradientBanner title={cta.title} subtitle={cta.subtitle} layout="row">
          <button
            type="button"
            className="rounded-lg bg-brand-main px-4 py-2 text-sm font-bold text-white transition hover:opacity-90"
            onClick={() => navigate("/register")}
          >
            {cta.primaryLabel}
          </button>
          <button
            type="button"
            className="rounded-lg border border-white/40 bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/20"
            onClick={() => navigate("/contact")}
          >
            {cta.secondaryLabel}
          </button>
        </GradientBanner>
      </section>
    </div>
  );
}

export default HomePage;