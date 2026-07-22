import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  Bar, BarChart, CartesianGrid, Cell, LabelList, Legend, Line, LineChart, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import AdminSidebar from "../components/AdminSidebar";
import { AdminSelect, AdminToneIcon } from "../components/AdminUI";
import Card from "../../../shared/components/ui/Card";
import GradientBanner from "../../../shared/components/GradientBanner";
import SharedCard from "../../../shared/components/SharedCard";
import { useRole } from "../../../shared/context/RoleContext";
import {
  ADMIN_STAT_CARDS, ADMIN_QUICK_STATS,
  QUICK_ACTION_STYLES, CHART_SERIES, PROGRAM_TYPE_COLORS,
  GROWTH_RANGE_DATA, GROWTH_RANGE_OPTIONS, formatDashboardNumber, getProgramDistribution, calculatePercentage,
  COMPANY_EFFORTS_RANGE_OPTIONS, getCompanyEffortsData,
  ADMIN_PLATFORM_PROGRESS_DATA, ADMIN_PROGRAM_TYPE_PLURAL_LABELS,
  type AdminStatCard, type GrowthRange, type CompanyEffortsRange,
} from "../../../mock";
import { ADMIN_LABELS, adminTranslations } from "../../../mock";

const PLATFORM_PROGRESS_TYPES = ["course", "camp", "competition"] as const;

function StatCard({ stat }: { stat: AdminStatCard }) {
  const { t } = useRole();
  return (
    <Card as="article" radius="2xl" shadow className="flex items-center gap-3 px-4 py-3">
      <AdminToneIcon tone={stat.tone} icon={stat.icon} />
      <div>
        <strong className="block text-xl text-brand-text">{stat.value}</strong>
        <span className="text-xs text-brand-muted">{t(stat.label)}</span>
      </div>
    </Card>
  );
}

function GrowthChartCard() {
  const { t } = useRole();
  const [range, setRange] = useState<GrowthRange>("6m");

  const data = useMemo(
    () => GROWTH_RANGE_DATA[range].map((row) => ({ ...row, label: t(row.label) })),
    [range, t],
  );

  return (
    <SharedCard
      title={t(adminTranslations.dashboard.growthChartTitle)}
      actions={
        <AdminSelect
          value={range}
          onChange={(value) => setRange(value as GrowthRange)}
          options={GROWTH_RANGE_OPTIONS.map((option) => ({ value: option.value, label: t(option.label) }))}
        />
      }
      className="flex h-full flex-col"
    >
      <div className="mt-4 min-h-96 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--c-brand-border)" />
            <XAxis dataKey="label" fontSize={12} tick={{ fill: "var(--c-brand-text)" }} stroke="var(--c-brand-border)" />
            <YAxis fontSize={12} tick={{ fill: "var(--c-brand-text)" }} stroke="var(--c-brand-border)" tickFormatter={formatDashboardNumber} />
            <Tooltip formatter={formatDashboardNumber} />
            <Legend wrapperStyle={{ fontWeight: 700, fontSize: 13 }} />
            {CHART_SERIES.map((series) => (
              <Line
                key={series.key}
                type="monotone"
                dataKey={series.key}
                name={t(series.label)}
                stroke={series.color}
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </SharedCard>
  );
}

function ProgramDistributionCard() {
  const { t } = useRole();

  const data = useMemo(
    () => getProgramDistribution().map((row) => ({ ...row, name: t(ADMIN_LABELS[row.type]) })),
    [t],
  );

  const total = data.reduce((sum, row) => sum + row.value, 0);

  return (
    <SharedCard title={t(adminTranslations.dashboard.programDistributionTitle)} className="flex h-full flex-col">
      <div className="mt-4 flex flex-1 flex-col items-center justify-center gap-6">
        <div className="h-80 w-80 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" innerRadius="65%" outerRadius="100%" paddingAngle={2} stroke="none">
                {data.map((row) => (
                  <Cell key={row.type} fill={PROGRAM_TYPE_COLORS[row.type]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value} (${calculatePercentage(value, total)}%)`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="flex w-full max-w-xs flex-col gap-2">
          {data.map((row) => (
            <li key={row.type} className="flex items-center justify-between gap-2 text-sm">
              <span className="flex items-center gap-2 font-bold text-brand-text">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: PROGRAM_TYPE_COLORS[row.type] }} />
                {row.name}
              </span>
              <span className="text-brand-muted">{calculatePercentage(row.value, total)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </SharedCard>
  );
}

function CompanyEffortsCard() {
  const { t } = useRole();
  const [range, setRange] = useState<CompanyEffortsRange>("6m");

  const data = useMemo(
    () => getCompanyEffortsData(range).map((row) => ({ ...row, name: t(row.company) })),
    [range, t],
  );

  const maxPrograms = Math.max(...data.map((row) => row.programs));

  return (
    <SharedCard
      title={t(adminTranslations.dashboard.companyEffortsTitle)}
      subtitle={t(adminTranslations.dashboard.companyEffortsSubtitle)}
      actions={
        <AdminSelect
          value={range}
          onChange={(value) => setRange(value as CompanyEffortsRange)}
          options={COMPANY_EFFORTS_RANGE_OPTIONS.map((option) => ({ value: option.value, label: t(option.label) }))}
        />
      }
      className="flex h-full flex-col"
    >
      <div className="mt-4 min-h-96 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 24, right: 12, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--c-brand-border)" />
            <XAxis
              dataKey="name"
              fontSize={11}
              tick={{ fill: "var(--c-brand-text)" }}
              stroke="var(--c-brand-border)"
              label={{
                value: t(adminTranslations.dashboard.companyEffortsXAxisLabel),
                position: "insideBottom",
                offset: -14,
                fill: "var(--c-brand-muted)",
                fontSize: 12,
              }}
            />
            <YAxis
              fontSize={12}
              tick={{ fill: "var(--c-brand-text)" }}
              stroke="var(--c-brand-border)"
              tickFormatter={formatDashboardNumber}
              label={{
                value: t(adminTranslations.dashboard.companyEffortsYAxisLabel),
                angle: -90,
                position: "insideLeft",
                fill: "var(--c-brand-muted)",
                fontSize: 12,
              }}
            />
            <Tooltip
              formatter={formatDashboardNumber}
              labelFormatter={(_, payload) => payload?.[0]?.payload?.name}
            />
            <Bar dataKey="programs" name={t(adminTranslations.dashboard.companyEffortsYAxisLabel)} radius={[6, 6, 0, 0]}>
              {data.map((row) => (
                <Cell key={row.name} fill={row.programs === maxPrograms ? "var(--c-brand-main)" : "var(--c-brand-soft)"} />
              ))}
              <LabelList dataKey="programs" position="top" fill="var(--c-brand-text)" fontSize={12} fontWeight={700} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SharedCard>
  );
}

function PlatformProgressCard() {
  const { t } = useRole();

  const data = useMemo(
    () => ADMIN_PLATFORM_PROGRESS_DATA.map((row) => ({ ...row, label: t(row.label) })),
    [t],
  );

  return (
    <SharedCard title={t(adminTranslations.dashboard.platformProgressTitle)} className="flex h-full flex-col">
      <div className="mt-4 min-h-96 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--c-brand-border)" />
            <XAxis dataKey="label" fontSize={12} tick={{ fill: "var(--c-brand-text)" }} stroke="var(--c-brand-border)" />
            <YAxis fontSize={12} tick={{ fill: "var(--c-brand-text)" }} stroke="var(--c-brand-border)" tickFormatter={formatDashboardNumber} />
            <Tooltip formatter={formatDashboardNumber} />
            <Legend wrapperStyle={{ fontWeight: 700, fontSize: 13 }} />
            {PLATFORM_PROGRESS_TYPES.map((key) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                name={t(ADMIN_PROGRAM_TYPE_PLURAL_LABELS[key])}
                stroke={PROGRAM_TYPE_COLORS[key]}
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </SharedCard>
  );
}

function QuickFollowUpCard() {
  const { t } = useRole();
  return (
    <SharedCard title={t(adminTranslations.dashboard.quickFollowUpTitle)}>
      <div className="grid gap-3 sm:grid-cols-3">
        {ADMIN_QUICK_STATS.map((item) => (
          <Card key={item.key} as="article" radius="2xl" className="flex flex-col items-center gap-3 p-4 text-center">
            <AdminToneIcon tone={item.tone} icon={item.icon} />
            <div>
              <strong className="block text-2xl text-brand-text">{item.value}</strong>
              <span className="text-xs text-brand-muted">{t(item.label)}</span>
            </div>
            <button
              type="button"
              className={`w-full rounded-lg px-3 py-1.5 text-xs font-bold transition ${QUICK_ACTION_STYLES[item.tone]}`}
            >
              {t(ADMIN_LABELS[item.action])}
            </button>
          </Card>
        ))}
      </div>
    </SharedCard>
  );
}

function AdminDashboard() {
  const { role, t } = useRole();

  if (role !== "admin") return <Navigate to="/dashboard" replace />;

  return (
    <div className="admin-scale flex flex-col gap-5 md:flex-row md:items-start">
      <AdminSidebar />

      <section className="flex min-w-0 flex-1 flex-col gap-5">
        <GradientBanner
          title={t(adminTranslations.dashboard.pageTitle)}
          subtitle={t(adminTranslations.dashboard.pageSubtitle)}
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ADMIN_STAT_CARDS.map((stat) => (
            <StatCard key={stat.key} stat={stat} />
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <ProgramDistributionCard />
          <GrowthChartCard />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <CompanyEffortsCard />
          <PlatformProgressCard />
        </div>

        <QuickFollowUpCard />
      </section>
    </div>
  );
}

export default AdminDashboard;
