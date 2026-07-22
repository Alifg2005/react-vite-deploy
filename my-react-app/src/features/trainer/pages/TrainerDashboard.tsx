import Sidebar from "../../../shared/components/DashboardSidebar";
import Card from "../../../shared/components/ui/Card";
import TrainerProgramAnalytics from "../components/analytics/TrainerProgramAnalytics";
import TrainerOverview from "../components/TrainerOverview";
import {
  TRAINER_DASHBOARD_TEXT as DASHBOARD_TEXT,
  TRAINER_STATS,
  TONE_ICON_CIRCLE_CLASSES,
} from "../../../mock";

// ─── Icons ────────────────────────────────────────────────────────────────────

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h7v7H4V4Z M13 4h7v7h-7V4Z M4 13h7v7H4v-7Z M13 13h7v7h-7v-7Z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 20V10M10 20V4M16 20v-7M4 20h16" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function HourglassIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 3h12M6 21h12M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9" />
    </svg>
  );
}

const STAT_ICONS: Record<string, React.FC> = {
  grid: GridIcon,
  chart: ChartIcon,
  check: CheckIcon,
  hourglass: HourglassIcon,
};

// ─── Sub-components ───────────────────────────────────────────────────────────

interface StatCardProps { label: string; value: string; icon: string; tone: string; }
function StatCard({ label, value, icon, tone }: StatCardProps) {
  const Icon = STAT_ICONS[icon];
  return (
    <Card as="article" radius="2xl" shadow className="flex items-center gap-3 px-4 py-3">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${TONE_ICON_CIRCLE_CLASSES[tone]}`}>
        <Icon />
      </span>
      <div>
        <strong className="block text-xl text-brand-text">{value}</strong>
        <span className="text-xs text-brand-muted">{label}</span>
      </div>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function TrainerDashboard() {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-start">
      <Sidebar />
      <section className="flex min-w-0 flex-1 flex-col gap-5">
        <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
          <h2 className="mb-2 text-4xl font-bold text-white">{DASHBOARD_TEXT.heroTitle}</h2>
          <p className="text-lg text-white/85">{DASHBOARD_TEXT.heroSubtitle}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TRAINER_STATS.map((stat) => <StatCard key={stat.label} {...stat} />)}
        </div>

        <TrainerProgramAnalytics />

        <TrainerOverview />
      </section>
    </div>
  );
}

export default TrainerDashboard;
