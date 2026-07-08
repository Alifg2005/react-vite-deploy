import { ABOUT_DATA } from "../data/aboutData";
import GradientBanner from "../components/GradientBanner";
import SharedCard from "../components/SharedCard";

/**
 * DARK MODE FIX — root cause & approach
 * -------------------------------------
 * Root cause: every card in this file used hardcoded / static Tailwind
 * classes (bg-white, text-brand-text, text-brand-muted, border-brand-border,
 * bg-brand-white, bg-brand-light, bg-brand-main) with NO `dark:` variant.
 * Tailwind's class-based dark mode only swaps colors on classes that
 * explicitly define a `dark:` counterpart, so these elements stayed
 * light-mode regardless of the active theme.
 *
 * Fix applied here: added `dark:` utility classes to every background,
 * text, border, badge, and shadow so the section responds to the `.dark`
 * class on <html>. Layout, spacing, grid structure and responsiveness are
 * unchanged — only color-related classes were touched.
 *
 * IMPORTANT (outside this file):
 * 1. Confirm tailwind.config.js has `darkMode: 'class'` (not 'media').
 * 2. If brand-main / brand-text / brand-muted / brand-border / brand-light /
 *    brand-white are static hex values in tailwind.config.js, consider
 *    migrating them to CSS variables (--color-brand-text, etc.) defined in
 *    :root and overridden in .dark inside your global CSS. That way every
 *    component using brand-* tokens gets automatic dark mode support
 *    instead of needing manual dark: classes on every element.
 */

function OverviewSection({ overview }) {
  return (
    // Card shell: light bg -> dark slate bg, border/shadow adapted for dark contrast
    <div className="rounded-2xl border border-brand-border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:shadow-none">
      <h3 className="mb-4 text-xl font-bold text-brand-text dark:text-white">
        {overview.title}
      </h3>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="flex flex-col gap-3">
            {overview.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm text-brand-muted dark:text-slate-300"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {overview.image ? (
          <div className="h-40 overflow-hidden rounded-xl border border-brand-border bg-brand-light dark:border-slate-700 dark:bg-slate-700 md:h-48">
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
          className="flex h-full flex-col rounded-2xl border border-brand-border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:shadow-none"
        >
          {/* Badge: kept brand-main bg (it's already a strong accent color
              that reads fine on dark backgrounds), just ensured text stays white */}
          <span className="mb-3 inline-block w-fit rounded-full bg-brand-main px-3 py-1 text-xs font-bold text-white dark:bg-brand-main/90">
            {item.title}
          </span>
          <p className="text-sm text-brand-muted dark:text-slate-300">
            {item.text}
          </p>
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
            className="flex h-full items-start gap-3 rounded-xl border border-brand-border bg-brand-white p-4 dark:border-slate-700 dark:bg-slate-800"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-main text-sm font-bold text-white dark:bg-brand-main/90">
              {index + 1}
            </span>
            <p className="text-sm text-brand-muted dark:text-slate-300">
              {goal}
            </p>
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
            className="flex h-full flex-col rounded-xl border border-brand-border bg-brand-white p-4 dark:border-slate-700 dark:bg-slate-800"
          >
            <h4 className="mb-1 text-lg font-bold text-brand-text dark:text-white">
              {feature.title}
            </h4>
            <p className="text-sm text-brand-muted dark:text-slate-300">
              {feature.description}
            </p>
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
            className="flex h-full flex-col items-center rounded-xl border border-brand-border bg-brand-white p-4 text-center dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="mx-auto mb-3 h-14 w-14 rounded-full border border-dashed border-brand-border bg-brand-light dark:border-slate-600 dark:bg-slate-700" />
            <h4 className="text-base font-bold text-brand-text dark:text-white">
              {member.name}
            </h4>
            <p className="text-sm text-brand-muted dark:text-slate-300">
              {member.role}
            </p>
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
            className="rounded-xl border border-brand-border bg-brand-white p-4 dark:border-slate-700 dark:bg-slate-800"
          >
            <h4 className="mb-1 text-base font-bold text-brand-text dark:text-white">
              {item.question}
            </h4>
            <p className="text-sm text-brand-muted dark:text-slate-300">
              {item.answer}
            </p>
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
