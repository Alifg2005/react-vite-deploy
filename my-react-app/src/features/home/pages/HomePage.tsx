import { useNavigate } from "react-router-dom";
import { HOME_DATA } from "../../../mock";
import GradientBanner from "../../../shared/components/GradientBanner";
import SharedCard from "../../../shared/components/SharedCard";
import StatsGrid from "../../../shared/components/StatsGrid";
import FeatureCardGrid from "../../../shared/components/FeatureCardGrid";
import heroPhoto from "../../../images/log.jpg";
import promoImage from "../../../images/ai-workshop-promo.png";
import ProgramsSection from "../components/ProgramsSection";
import NewsSection from "../components/NewsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import PartnersSection from "../components/PartnersSection";
import PromoPopup from "../components/PromoPopup";
import { JSX } from "react/jsx-runtime";

function HomePage(): JSX.Element {
  const navigate = useNavigate();
  const { promo, hero, programs, highlights, stats, news, testimonials, partners, cta } = HOME_DATA;

  return (
    <div className="flex flex-col gap-5">
      <PromoPopup promo={promo} image={promoImage} />

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
