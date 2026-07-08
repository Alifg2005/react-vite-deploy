import { ABOUT_DATA } from "../data/aboutData";
import GradientBanner from "../components/GradientBanner";
import SharedCard from "../components/SharedCard";

function OverviewSection({ overview }) {
  return (
    // Single unified card wrapping title + image + text, matching the
    // Vision/Mission card shell below (white bg, rounded-2xl, border, shadow, p-6).
    <div className="rounded-2xl border border-brand-border bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-bold text-brand-text">{overview.title}</h3>

      {/* Fixed layout: title stays on top, image + text directly beneath it. */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="flex flex-col gap-3">
            {overview.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm text-brand-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {overview.image ? (
          <div className="h-40 overflow-hidden rounded-xl border border-brand-border bg-brand-light md:h-48">
            <img
              src={overview.image.src}
              alt={overview.image.alt}
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function MissionVisionSection({ items }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <article
          key={item.title}
          className="flex h-full flex-col rounded-2xl border border-brand-border bg-white p-6 shadow-sm"
        >
          <span className="mb-3 inline-block w-fit rounded-full bg-brand-main px-3 py-1 text-xs font-bold text-white">
            {item.title}
          </span>
          <p className="text-sm text-brand-muted">{item.text}</p>
        </article>
      ))}
    </div>
  );
}

function GoalsSection({ goals }) {
  return (
    <SharedCard title="أهداف المنصة">
      <div className="grid items-stretch gap-4 sm:grid-cols-2">
        {goals.map((goal, index) => (
          <article
            key={goal}
            className="flex h-full items-start gap-3 rounded-xl border border-brand-border bg-brand-white p-4"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-main text-sm font-bold text-white">
              {index + 1}
            </span>
            <p className="text-sm text-brand-muted">{goal}</p>
          </article>
        ))}
      </div>
    </SharedCard>
  );
}

function FeaturesSection({ features }) {
  return (
    <SharedCard title="أبرز المزايا">
      <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="flex h-full flex-col rounded-xl border border-brand-border bg-brand-white p-4"
          >
            <h4 className="mb-1 text-lg font-bold text-brand-text">{feature.title}</h4>
            <p className="text-sm text-brand-muted">{feature.description}</p>
          </article>
        ))}
      </div>
    </SharedCard>
  );
}

function TeamSection({ team }) {
  return (
    <SharedCard title={team.title} subtitle={team.subtitle}>
      <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {team.members.map((member, index) => (
          <article
            key={`${member.name}-${index}`}
            className="flex h-full flex-col items-center rounded-xl border border-brand-border bg-brand-white p-4 text-center"
          >
            <div className="mx-auto mb-3 h-14 w-14 rounded-full border border-dashed border-brand-border bg-brand-light" />
            <h4 className="text-base font-bold text-brand-text">{member.name}</h4>
            <p className="text-sm text-brand-muted">{member.role}</p>
          </article>
        ))}
      </div>
    </SharedCard>
  );
}

function FaqSection({ faq }) {
  return (
    <SharedCard title={faq.title}>
      <div className="flex flex-col gap-3">
        {faq.items.map((item) => (
          <article
            key={item.question}
            className="rounded-xl border border-brand-border bg-brand-white p-4"
          >
            <h4 className="mb-1 text-base font-bold text-brand-text">{item.question}</h4>
            <p className="text-sm text-brand-muted">{item.answer}</p>
          </article>
        ))}
      </div>
    </SharedCard>
  );
}

function About() {
  const { hero, overview, missionVision, goals, features, team, faq } = ABOUT_DATA;

  return (
    <section className="flex flex-col gap-5">
      <GradientBanner title={hero.title} subtitle={hero.subtitle} />

      <OverviewSection overview={overview} />
      <MissionVisionSection items={missionVision} />
      <GoalsSection goals={goals} />
      <FeaturesSection features={features} />
      <TeamSection team={team} />
      <FaqSection faq={faq} />
    </section>
  );
}

export default About;
