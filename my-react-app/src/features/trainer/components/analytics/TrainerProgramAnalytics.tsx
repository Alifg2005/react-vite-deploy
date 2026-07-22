import {
  Area, AreaChart, CartesianGrid, Cell, LabelList, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import {
  TRAINER_ATTENDANCE_DATA,
  TRAINER_COURSE_COMPLETION_DATA,
} from "../../../../mock";

// var(--c-brand-main) (not --c-brand-dark) so the line/donut stay visible in
// dark mode too — --c-brand-dark is nearly the same shade as the dark-mode
// card surface and disappears against it.
const COMPLETED_COLOR = "var(--c-brand-main)";
const NOT_COMPLETED_COLOR = "var(--c-brand-soft)";

// ─── Icons ────────────────────────────────────────────────────────────────────

function AttendanceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function PieChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21.2 15a9 9 0 1 1-9.2-9v9z" />
    </svg>
  );
}

// ─── Attendance area chart ────────────────────────────────────────────────────

function AttendanceChart() {
  const totalThisYear = TRAINER_ATTENDANCE_DATA[TRAINER_ATTENDANCE_DATA.length - 1].count;

  return (
    <article className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-start gap-2">
        <h3 className="text-lg font-bold text-brand-text">عدد الحضور</h3>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-light text-brand-main">
          <AttendanceIcon />
        </span>
      </div>

      <div dir="rtl" className="h-136 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={TRAINER_ATTENDANCE_DATA} margin={{ top: 24, right: 8, left: 0, bottom: 8 }}>
            <defs>
              <linearGradient id="attendanceFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--c-brand-main)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--c-brand-main)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--c-brand-border)" vertical={false} />
            <XAxis
              dataKey="label"
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
                value: "عدد الحضور",
                angle: -90,
                position: "insideLeft",
                fill: "var(--c-brand-muted)",
                fontSize: 12,
              }}
            />
            <Tooltip
              contentStyle={{ borderRadius: 12, borderColor: "var(--c-brand-border)", backgroundColor: "var(--c-brand-white)", fontSize: 12 }}
              labelStyle={{ color: "var(--c-brand-text)", fontWeight: 700 }}
              itemStyle={{ color: "var(--c-brand-main)" }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="var(--c-brand-main)"
              strokeWidth={3}
              fill="url(#attendanceFill)"
              dot={{ r: 4, fill: "var(--c-brand-main)", strokeWidth: 0 }}
              activeDot={{ r: 6 }}
              isAnimationActive={false}
            >
              <LabelList
                dataKey="count"
                position="top"
                style={{ fill: "var(--c-brand-text)", fontSize: 11, fontWeight: 700 }}
              />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 border-t border-brand-border pt-3 text-center text-sm font-bold text-brand-text">
        إجمالي الحضور هذا العام: {totalThisYear}
      </div>
    </article>
  );
}

// ─── Course completion donut chart ────────────────────────────────────────────

function CourseCompletionChart() {
  const { totalStudents, completed, notCompleted } = TRAINER_COURSE_COMPLETION_DATA;
  const data = [
    { key: "completed", ...completed, color: COMPLETED_COLOR },
    { key: "notCompleted", ...notCompleted, color: NOT_COMPLETED_COLOR },
  ];

  return (
    <article className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-start gap-2">
        <h3 className="text-lg font-bold text-brand-text">نسبة إكمال الدورات</h3>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-light text-brand-main">
          <PieChartIcon />
        </span>
      </div>

      <div className="flex flex-1 items-center justify-center gap-8">
        <ul className="flex flex-col gap-5">
          {data.map((slice) => (
            <li key={slice.key}>
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 font-bold text-brand-text">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: slice.color }} />
                  {slice.label}
                </span>
                <span className="font-bold text-brand-text">{slice.percent}%</span>
              </div>
              <p className="mt-1 text-xs text-brand-muted">{slice.count} طالب</p>
            </li>
          ))}
        </ul>

        <div className="relative h-80 w-80 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="percent"
                nameKey="label"
                innerRadius="72%"
                outerRadius="100%"
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                {data.map((slice) => <Cell key={slice.key} fill={slice.color} />)}
              </Pie>
              <Tooltip
                formatter={(value: number, _name, entry) => [`${entry.payload.count} طالب (${value}%)`, entry.payload.label]}
                contentStyle={{ borderRadius: 12, borderColor: "var(--c-brand-border)", backgroundColor: "var(--c-brand-white)", fontSize: 12 }}
                labelStyle={{ color: "var(--c-brand-text)", fontWeight: 700 }}
                itemStyle={{ color: "var(--c-brand-text)" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <strong className="text-3xl font-bold text-brand-text">{completed.percent}%</strong>
            <span className="text-xs text-brand-muted">معدل الإكمال</span>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-brand-border pt-3 text-center text-sm font-bold text-brand-text">
        إجمالي الطلاب: {totalStudents}
      </div>
    </article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

function TrainerProgramAnalytics() {
  return (
    <section dir="rtl" className="grid gap-4 lg:grid-cols-2">
      <CourseCompletionChart />
      <AttendanceChart />
    </section>
  );
}

export default TrainerProgramAnalytics;
