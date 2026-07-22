import { useNavigate } from "react-router-dom";
import SharedCard from "../../../shared/components/SharedCard";
import Card from "../../../shared/components/ui/Card";
import {
  TRAINER_DASHBOARD_TEXT as TEXT,
  TRAINER_QUICK_FOLLOWUP,
  QUICK_ACTION_STYLES,
  TONE_ICON_CIRCLE_CLASSES,
} from "../../../mock";

// ─── Icons ────────────────────────────────────────────────────────────────────

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </svg>
  );
}

const QUICK_FOLLOWUP_ICONS: Record<string, React.FC> = {
  newNotifications: BellIcon,
  joinRequests: UsersIcon,
  upcomingAppointments: CalendarIcon,
};

// ─── Quick follow-up ──────────────────────────────────────────────────────────

function QuickFollowupCard({ item }: { item: (typeof TRAINER_QUICK_FOLLOWUP)[number] }) {
  const navigate = useNavigate();
  const Icon = QUICK_FOLLOWUP_ICONS[item.key];
  return (
    <Card as="article" radius="2xl" shadow className="flex flex-col items-center gap-3 p-4 text-center">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${TONE_ICON_CIRCLE_CLASSES[item.tone]}`}>
        <Icon />
      </span>
      <div>
        <strong className="block text-2xl text-brand-text">{item.value}</strong>
        <span className="text-xs text-brand-muted">{item.label}</span>
      </div>
      <button
        type="button"
        onClick={() => navigate(item.to)}
        className={`w-full rounded-lg px-3 py-1.5 text-xs font-bold transition ${QUICK_ACTION_STYLES[item.tone]}`}
      >
        {item.action}
      </button>
    </Card>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

function TrainerOverview() {
  return (
    <SharedCard title={TEXT.quickFollowupTitle}>
      <div className="grid gap-3 sm:grid-cols-3">
        {TRAINER_QUICK_FOLLOWUP.map((item) => <QuickFollowupCard key={item.key} item={item} />)}
      </div>
    </SharedCard>
  );
}

export default TrainerOverview;
