import { useState } from "react";
import {
  Bar, BarChart, CartesianGrid, Legend, Line, LineChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import type { TooltipContentProps } from "recharts";
import { useRole } from "../../../../shared/context/RoleContext";
import ChartCard from "../../../../shared/components/ChartCard";
import {
  COMPANY_ENROLLMENT_COMPLETION_DATA,
  COMPANY_PROGRAM_GROWTH_DATA,
  COMPANY_PROGRAM_GROWTH_VIEW_MODE_OPTIONS,
  COMPANY_PROGRAM_TYPE_LINE_NAMES,
  COMPANY_TOTAL_PROGRAMS_LINE_NAME,
  PROGRAM_TYPE_COLORS,
  type CompanyProgramGrowthViewMode,
} from "../../../../mock";

interface AnalyticsCardProps {
  language: "ar" | "en";
  direction: "rtl" | "ltr";
}

const TOTAL_LINE_COLOR = "var(--c-brand-dark)";
const SELECT_CLASS =
  "rounded-lg border border-brand-border bg-brand-white px-3 py-2.5 text-sm font-bold text-brand-text " +
  "focus:outline-none focus:ring-2 focus:ring-brand-main/40";

const PROGRAM_TYPE_KEYS = ["course", "camp", "competition"] as const;

// ── Cumulative program achievement line chart ───────────────────────────────

function ProgramGrowthChart({ language, direction }: AnalyticsCardProps) {
  const [mode, setMode] = useState<CompanyProgramGrowthViewMode>("byType");

  const xAxisKey = language === "ar" ? "label" : "labelEn";
  const title = language === "ar" ? "الإنجاز التراكمي للبرامج" : "Cumulative Program Achievement";
  const yAxisLabel = language === "ar" ? "العدد التراكمي للبرامج" : "Cumulative Number of Programs";
  const comboLabel = language === "ar" ? "طريقة العرض" : "Display mode";
  const totalName = language === "ar" ? COMPANY_TOTAL_PROGRAMS_LINE_NAME.label : COMPANY_TOTAL_PROGRAMS_LINE_NAME.labelEn;

  return (
    <ChartCard
      title={title}
      direction={direction}
      actions={
        <label className="flex items-center gap-2">
          <span className="sr-only">{comboLabel}</span>
          <select
            value={mode}
            onChange={(event) => setMode(event.target.value as CompanyProgramGrowthViewMode)}
            aria-label={comboLabel}
            className={SELECT_CLASS}
          >
            {COMPANY_PROGRAM_GROWTH_VIEW_MODE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {language === "ar" ? option.label : option.labelEn}
              </option>
            ))}
          </select>
        </label>
      }
    >
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={COMPANY_PROGRAM_GROWTH_DATA} margin={{ top: 8, right: 16, left: 4, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--c-brand-border)" />
            <XAxis
              dataKey={xAxisKey}
              interval={0}
              fontSize={11}
              tick={{ fill: "var(--c-brand-muted)" }}
              stroke="var(--c-brand-border)"
            />
            <YAxis
              allowDecimals={false}
              fontSize={12}
              tick={{ fill: "var(--c-brand-muted)" }}
              stroke="var(--c-brand-border)"
              label={{
                value: yAxisLabel,
                angle: -90,
                position: "insideLeft",
                fill: "var(--c-brand-muted)",
                fontSize: 12,
              }}
            />
            <Tooltip contentStyle={{ borderRadius: 12, borderColor: "var(--c-brand-border)", fontSize: 12 }} />
            <Legend wrapperStyle={{ fontWeight: 700, fontSize: 13 }} />
            {mode === "byType" ? (
              PROGRAM_TYPE_KEYS.map((key) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  name={language === "ar" ? COMPANY_PROGRAM_TYPE_LINE_NAMES[key].label : COMPANY_PROGRAM_TYPE_LINE_NAMES[key].labelEn}
                  stroke={PROGRAM_TYPE_COLORS[key]}
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  isAnimationActive={false}
                />
              ))
            ) : (
              <Line
                type="monotone"
                dataKey="all"
                name={totalName}
                stroke={TOTAL_LINE_COLOR}
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                isAnimationActive={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

// ── Program effectiveness bar chart ─────────────────────────────────────────

function EffectivenessChart({ language, direction }: AnalyticsCardProps) {
  const xAxisKey = language === "ar" ? "label" : "labelEn";
  const title = language === "ar" ? "فعالية البرامج: التسجيل مقابل الإكمال" : "Program Effectiveness: Enrollment vs Completion";
  const registeredLabel = language === "ar" ? "المسجلون" : "Registered";
  const completedLabel = language === "ar" ? "المكملون" : "Completed";
  const rateLabel = language === "ar" ? "نسبة الإكمال" : "Completion Rate";

  function renderTooltip({ active, payload, label }: TooltipContentProps<number, string>) {
    if (!active || !payload || payload.length === 0) return null;

    const registered = Number(payload.find((entry) => entry.dataKey === "registered")?.value ?? 0);
    const completed = Number(payload.find((entry) => entry.dataKey === "completed")?.value ?? 0);
    const rate = registered > 0 ? ((completed / registered) * 100).toFixed(1) : "0.0";

    return (
      <div
        dir={direction}
        className="rounded-xl border border-brand-border bg-brand-white px-3 py-2 text-xs shadow-sm"
      >
        <p className="mb-1 font-bold text-brand-text">{label}</p>
        <p className="text-brand-muted">{registeredLabel}: {registered}</p>
        <p className="text-brand-muted">{completedLabel}: {completed}</p>
        <p className="font-bold text-brand-main">{rateLabel}: {rate}%</p>
      </div>
    );
  }

  return (
    <ChartCard title={title} direction={direction}>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={COMPANY_ENROLLMENT_COMPLETION_DATA} margin={{ top: 8, right: 16, left: 4, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--c-brand-border)" />
            <XAxis
              dataKey={xAxisKey}
              fontSize={12}
              tick={{ fill: "var(--c-brand-muted)" }}
              stroke="var(--c-brand-border)"
            />
            <YAxis
              allowDecimals={false}
              fontSize={12}
              tick={{ fill: "var(--c-brand-muted)" }}
              stroke="var(--c-brand-border)"
            />
            <Tooltip content={renderTooltip} />
            <Legend wrapperStyle={{ fontWeight: 700, fontSize: 13 }} />
            <Bar dataKey="registered" name={registeredLabel} fill="var(--c-brand-soft)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="completed" name={completedLabel} fill="var(--c-brand-main)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────

function CompanyProgramAnalytics() {
  const { language, direction } = useRole();

  return (
    <section dir={direction} className="flex flex-col gap-5">
      {/* Equal-width columns, no card background — charts sit directly on
          the dashboard surface. Column order is written in inline-start →
          inline-end order, which flips with `dir`, so the DOM order below
          still renders the line chart on the visual left and the bar chart
          on the right regardless of RTL/LTR. */}
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        {direction === "rtl" ? (
          <>
            <EffectivenessChart language={language} direction={direction} />
            <ProgramGrowthChart language={language} direction={direction} />
          </>
        ) : (
          <>
            <ProgramGrowthChart language={language} direction={direction} />
            <EffectivenessChart language={language} direction={direction} />
          </>
        )}
      </div>
    </section>
  );
}

export default CompanyProgramAnalytics;
