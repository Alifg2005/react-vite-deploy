import React from "react";
import { useMemo, useState } from "react";
import Sidebar from "../../../shared/components/DashboardSidebar";
import SharedCard from "../../../shared/components/SharedCard";
import {
  TRAINER_PROGRAMS_TEXT as PROGRAMS_TEXT,
  formatTrainerProgramsCardTitle as formatProgramsCardTitle,
  TRAINER_PROGRAM_STATUS as PROGRAM_STATUS,
  TRAINER_PROGRAM_TYPE_FILTERS as PROGRAM_TYPE_FILTERS,
  TRAINER_PROGRAM_STATUS_FILTERS as PROGRAM_STATUS_FILTERS,
  TRAINER_PROGRAMS as PROGRAMS,
  type TrainerProgramItem as ProgramItem,
} from "../../../mock";

interface FilterOption { value: string; label: string; }
function FilterBar({ label, filters, value, onChange }: { label: string; filters: FilterOption[]; value: string; onChange: (value: string) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-bold text-brand-muted">{label}</span>
      {filters.map((f) => (
        <button
          key={f.value}
          type="button"
          onClick={() => onChange(f.value)}
          className={`rounded-full px-3 py-1 text-xs font-bold transition ${
            value === f.value
              ? "bg-brand-main text-white"
              : "border border-brand-border bg-brand-white text-brand-muted hover:bg-brand-light"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

function ProgramCard({ program }: { program: ProgramItem }) {
  const status  = PROGRAM_STATUS[program.status];
  const isEnded = program.status === "ended";

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-brand-border bg-brand-white p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <span className="mb-1 inline-block rounded-full bg-brand-main px-2.5 py-0.5 text-[11px] font-bold text-white">
            {program.type}
          </span>
          <h4 className="text-sm font-bold text-brand-text">{program.title}</h4>
          <p className="text-xs text-brand-muted">{PROGRAMS_TEXT.startDateLabel} {program.startDate}</p>
          {isEnded && program.endDate && (
            <p className="text-xs text-brand-muted">{PROGRAMS_TEXT.endDateLabel} {program.endDate}</p>
          )}
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${status.style}`}>
          {status.label}
        </span>
      </div>

      <div className="flex gap-4 text-xs text-brand-muted">
        <span>👥 {program.students} {PROGRAMS_TEXT.studentsUnit}</span>
        <span>📅 {program.sessions} {PROGRAMS_TEXT.sessionsUnit}</span>
      </div>

      <button
        type="button"
        className="w-full rounded-lg bg-brand-main px-3 py-1.5 text-xs font-bold text-white transition hover:opacity-90"
      >
        {PROGRAMS_TEXT.viewDetailsButton}
      </button>
    </article>
  );
}

function TrainerPrograms() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPrograms = useMemo(() => {
    const query = search.trim().toLowerCase();
    return PROGRAMS.filter((p) => {
      if (typeFilter !== "all" && p.type !== typeFilter) return false;
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (query && !p.title.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [search, typeFilter, statusFilter]);

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-start">
      <Sidebar />
      <section className="flex min-w-0 flex-1 flex-col gap-5">
        <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
          <h2 className="mb-2 text-4xl font-bold text-white">{PROGRAMS_TEXT.heroTitle}</h2>
          <p className="text-lg text-white/85">{PROGRAMS_TEXT.heroSubtitle}</p>
        </div>

        <SharedCard title={formatProgramsCardTitle(filteredPrograms.length)} boxed>
          <div className="mb-5 flex flex-col gap-3">
            <input
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              placeholder={PROGRAMS_TEXT.searchPlaceholder}
              className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
            />
            <FilterBar label={PROGRAMS_TEXT.typeFilterLabel}   filters={PROGRAM_TYPE_FILTERS}   value={typeFilter}   onChange={setTypeFilter}   />
            <FilterBar label={PROGRAMS_TEXT.statusFilterLabel} filters={PROGRAM_STATUS_FILTERS} value={statusFilter} onChange={setStatusFilter} />
          </div>

          {filteredPrograms.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPrograms.map((p) => <ProgramCard key={p.id} program={p} />)}
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-brand-border p-4 text-center text-sm text-brand-muted">
              {PROGRAMS_TEXT.emptyMessage}
            </p>
          )}
        </SharedCard>

        <div className="rounded-2xl border border-dashed border-brand-border bg-brand-white p-8 text-center">
          <p className="mb-4 text-sm text-brand-muted">{PROGRAMS_TEXT.addProgramPrompt}</p>
          <button type="button" className="rounded-full bg-brand-main px-6 py-2.5 text-sm font-bold text-white transition hover:opacity-90">
            {PROGRAMS_TEXT.addProgramButton}
          </button>
        </div>
      </section>
    </div>
  );
}

export default TrainerPrograms;
