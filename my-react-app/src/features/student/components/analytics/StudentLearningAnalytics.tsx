import { useMemo, useState } from "react";
import {
  CartesianGrid, Legend, Line, LineChart,
  PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { useRole } from "../../../../shared/context/RoleContext";
import ChartCard from "../../../../shared/components/ChartCard";
import {
  ACTIVITY_PROGRESS_DATA,
  ANALYTICS_PERIOD_OPTIONS,
  LEARNING_INTEREST_DATA,
  PROGRAM_TYPE_COLORS,
  type AnalyticsPeriod,
} from "../../../../mock";

// ── Line series config (reuses the existing program-type color palette) ────

const LINE_SERIES = [
  { key: "courses",      color: PROGRAM_TYPE_COLORS.course,      label: "الدورات",   labelEn: "Courses" },
  { key: "bootcamps",    color: PROGRAM_TYPE_COLORS.camp,        label: "المعسكرات", labelEn: "Bootcamps" },
  { key: "competitions", color: PROGRAM_TYPE_COLORS.competition, label: "المسابقات", labelEn: "Competitions" },
] as const;

// ── Period filter (dropdown above the line chart) ───────────────────────────

interface PeriodFilterProps {
  value: AnalyticsPeriod;
  onChange: (period: AnalyticsPeriod) => void;
  language: "ar" | "en";
}

function PeriodFilter({ value, onChange, language }: PeriodFilterProps) {
  const labelText = language === "ar" ? "الفترة الزمنية" : "Time period";

  return (
    <label className="flex items-center gap-2">
      <span className="sr-only">{labelText}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as AnalyticsPeriod)}
        aria-label={labelText}
        className="rounded-lg border border-brand-border bg-brand-white px-3 py-2.5 text-sm font-bold text-brand-text"
      >
        {ANALYTICS_PERIOD_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {language === "ar" ? option.label : option.labelEn}
          </option>
        ))}
      </select>
    </label>
  );
}

// ── Cumulative activities line chart card ───────────────────────────────────

interface AnalyticsCardProps {
  language: "ar" | "en";
  direction: "rtl" | "ltr";
}

function CumulativeActivitiesCard({ language, direction }: AnalyticsCardProps) {
  const [period, setPeriod] = useState<AnalyticsPeriod>("6m");

  const data = useMemo(() => ACTIVITY_PROGRESS_DATA[period], [period]);
  const xAxisKey = language === "ar" ? "label" : "labelEn";
  const title = language === "ar" ? "تطور الأنشطة" : "Activities Progress";

  // Y-axis ticks: 2, 4, 6, 8… up to (and covering) the period's max value.
  const yTicks = useMemo(() => {
    const maxValue = Math.max(...data.flatMap((row) => [row.courses, row.bootcamps, row.competitions]));
    const ticks: number[] = [];
    let value = 2;
    while (value < maxValue) {
      ticks.push(value);
      value += 2;
    }
    ticks.push(value);
    return ticks;
  }, [data]);

  return (
    <ChartCard
      title={title}
      direction={direction}
      actions={<PeriodFilter value={period} onChange={setPeriod} language={language} />}
      className="flex h-full flex-col"
    >
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, left: 4, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--c-brand-border)" />
            <XAxis
              dataKey="year"
              fontSize={12}
              tick={{ fill: "var(--c-brand-muted)" }}
              stroke="var(--c-brand-border)"
            />
            <YAxis
              allowDecimals={false}
              domain={[0, yTicks[yTicks.length - 1]]}
              ticks={yTicks}
              fontSize={12}
              tick={{ fill: "var(--c-brand-muted)" }}
              stroke="var(--c-brand-border)"
            />
            <Tooltip
              labelFormatter={(_, payload) => payload?.[0]?.payload?.[xAxisKey]}
              contentStyle={{ borderRadius: 12, borderColor: "var(--c-brand-border)", fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontWeight: 700, fontSize: 13 }} />
            {LINE_SERIES.map((series) => (
              <Line
                key={series.key}
                type="monotone"
                dataKey={series.key}
                name={language === "ar" ? series.label : series.labelEn}
                stroke={series.color}
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

// ── Learning interests radar chart card ─────────────────────────────────────

function LearningInterestsCard({ language, direction }: AnalyticsCardProps) {
  const angleKey = language === "ar" ? "category" : "categoryEn";
  const title = language === "ar" ? "توزيع الاهتمامات التعليمية" : "Learning Interests Distribution";
  const seriesName = language === "ar" ? "مستوى النشاط" : "Activity level";

  return (
    <ChartCard title={title} direction={direction} className="flex h-full flex-col">
      <div className="flex h-full items-center justify-center">
        <div className="h-80 w-80 shrink-0 sm:h-104 sm:w-104">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={LEARNING_INTEREST_DATA} outerRadius="72%">
              <PolarGrid stroke="var(--c-brand-soft)" strokeWidth={1.25} />
              <PolarAngleAxis dataKey={angleKey} tick={{ fill: "var(--c-brand-text)", fontSize: 12, fontWeight: 700 }} />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} tickCount={5} />
              <Tooltip
                formatter={(value: number) => [`${value}%`, seriesName]}
                contentStyle={{ borderRadius: 12, borderColor: "var(--c-brand-border)", fontSize: 12 }}
              />
              <Radar
                name={seriesName}
                dataKey="value"
                stroke="var(--c-brand-dark)"
                fill="var(--c-brand-main)"
                fillOpacity={0.55}
                strokeWidth={2.5}
                dot={{ r: 4, fill: "var(--c-brand-dark)", strokeWidth: 0 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ChartCard>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────

function StudentLearningAnalytics() {
  const { language, direction } = useRole();

  return (
    <section dir={direction}>
      {/* Equal-width columns, matching the admin dashboard's chart grid
          exactly (grid gap-4 lg:grid-cols-2). Column order is written in
          inline-start → inline-end order, which flips with `dir`, so the
          DOM order below still renders the line chart on the visual left
          and the radar on the right regardless of RTL/LTR. */}
      <div className="grid gap-4 lg:grid-cols-2 lg:items-stretch">
        {direction === "rtl" ? (
          <>
            <LearningInterestsCard language={language} direction={direction} />
            <CumulativeActivitiesCard language={language} direction={direction} />
          </>
        ) : (
          <>
            <CumulativeActivitiesCard language={language} direction={direction} />
            <LearningInterestsCard language={language} direction={direction} />
          </>
        )}
      </div>
    </section>
  );
}

export default StudentLearningAnalytics;
