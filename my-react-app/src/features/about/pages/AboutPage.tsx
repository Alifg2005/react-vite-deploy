import { ABOUT_DATA } from "../../../mock";
import GradientBanner from "../../../shared/components/GradientBanner";
import OverviewSection from "../components/OverviewSection";
import MissionVisionSection from "../components/MissionVisionSection";
import GoalsSection from "../components/GoalsSection";
import FeaturesSection from "../components/FeaturesSection";
import TeamSection from "../components/TeamSection";
import type { JSX } from "react/jsx-runtime";

function AboutPage(): JSX.Element {
  const { hero, overview, missionVision, goals, features, team } = ABOUT_DATA;

  return (
    <section className="flex flex-col gap-5">
      <GradientBanner title={hero.title} subtitle={hero.subtitle} />
      <OverviewSection overview={overview} />
      <MissionVisionSection items={missionVision} />
      <GoalsSection goals={goals} />
      <FeaturesSection features={features} />
      <TeamSection team={team} />
    </section>
  );
}

export default AboutPage;
