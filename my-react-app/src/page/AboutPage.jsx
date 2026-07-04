import { ABOUT_DATA } from "../data/aboutData";

function OverviewSection({ overview }) {
  return (
    <div className="grid gap-6 rounded-2xl border border-brand-border bg-brand-white p-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <h3 className="mb-4 text-xl font-bold text-brand-text">{overview.title}</h3>

        <div className="flex flex-col gap-3">
          {overview.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-sm text-brand-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {overview.image ? (
        <div className="h-40 overflow-hidden rounded-2xl border border-brand-border bg-brand-light md:h-48">
          <img
            src={overview.image.src}
            alt={overview.image.alt}
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}
    </div>
  );
}

function MissionVisionSection({ items }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <article
          key={item.title}
          className="rounded-2xl border border-brand-border bg-brand-white p-6"
        >
          <span className="mb-3 inline-block rounded-full bg-brand-main px-3 py-1 text-xs font-bold text-white">
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
    <div className="rounded-2xl border border-brand-border bg-brand-white p-6">
      <h3 className="mb-4 text-xl font-bold text-brand-text">أهداف المنصة</h3>

      <div className="grid gap-3 sm:grid-cols-2">
        {goals.map((goal, index) => (
          <article
            key={goal}
            className="flex items-start gap-3 rounded-xl border border-brand-border bg-brand-light p-4"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-main text-sm font-bold text-white">
              {index + 1}
            </span>
            <p className="text-sm text-brand-muted">{goal}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function FeaturesSection({ features }) {
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-white p-6">
      <h3 className="mb-4 text-xl font-bold text-brand-text">أبرز المزايا</h3>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-xl border border-brand-border bg-brand-light p-4"
          >
            <h4 className="mb-1 text-lg font-bold text-brand-text">{feature.title}</h4>
            <p className="text-sm text-brand-muted">{feature.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function StatsSection({ stats }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="rounded-xl border border-brand-border bg-brand-white px-4 py-3 shadow-sm"
        >
          <span className="mb-1 block text-sm text-brand-muted">{stat.label}</span>
          <strong className="text-2xl text-brand-text">{stat.value}</strong>
        </article>
      ))}
    </div>
  );
}

function TeamSection({ team }) {
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-white p-6">
      <h3 className="mb-1 text-xl font-bold text-brand-text">{team.title}</h3>
      <p className="mb-4 text-sm text-brand-muted">{team.subtitle}</p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {team.members.map((member, index) => (
          <article
            key={`${member.name}-${index}`}
            className="rounded-xl border border-brand-border bg-brand-light p-4 text-center"
          >
            <div className="mx-auto mb-3 h-14 w-14 rounded-full border border-dashed border-brand-border bg-brand-white" />
            <h4 className="text-base font-bold text-brand-text">{member.name}</h4>
            <p className="text-sm text-brand-muted">{member.role}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function FaqSection({ faq }) {
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-white p-6">
      <h3 className="mb-4 text-xl font-bold text-brand-text">{faq.title}</h3>

      <div className="flex flex-col gap-3">
        {faq.items.map((item) => (
          <article
            key={item.question}
            className="rounded-xl border border-brand-border bg-brand-light p-4"
          >
            <h4 className="mb-1 text-base font-bold text-brand-text">{item.question}</h4>
            <p className="text-sm text-brand-muted">{item.answer}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function ContactCta({ cta }) {
  return (
    <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
      <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-right">
        <div>
          <h3 className="text-xl font-bold text-white">{cta.title}</h3>
          <p className="text-white/85">{cta.subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-lg bg-brand-main px-4 py-2 text-sm font-bold text-white transition hover:opacity-90"
          >
            {cta.primaryLabel}
          </button>
          <button
            type="button"
            className="rounded-lg border border-white/40 bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/20"
          >
            {cta.secondaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function About() {
  const { hero, overview, missionVision, goals, features, stats, team, faq, cta } =
    ABOUT_DATA;

  return (
    <section className="flex flex-col gap-5">
      <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
        <h2 className="mb-2 text-4xl font-bold text-white">{hero.title}</h2>
        <p className="text-lg text-white/85">{hero.subtitle}</p>
      </div>

      <OverviewSection overview={overview} />
      <MissionVisionSection items={missionVision} />
      <GoalsSection goals={goals} />
      <FeaturesSection features={features} />
      <StatsSection stats={stats} />
      <TeamSection team={team} />
      <FaqSection faq={faq} />
      <ContactCta cta={cta} />
    </section>
  );
}

export default About;
