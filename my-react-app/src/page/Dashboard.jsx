import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useRole } from "../context/RoleContext";
import { DASHBOARD_DATA } from "../data/dashboardData";

import { useNavigate } from "react-router";

const completedItems = [
  { type: "دورة", title: "أساسيات تطوير الواجهات", date: "2026-04-18" },
  { type: "دورة", title: "مقدمة في React", date: "2026-05-02" },
  { type: "معسكر", title: "معسكر بناء المواقع", date: "2026-05-20" },
  { type: "شهادة", title: "شهادة إنجاز HTML و CSS", date: "2026-06-01" },
];

function ChartCard({ chart }) {
  return (
    <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-6 text-white">
      <h3 className="mb-4 text-xl font-bold text-white">{chart.title}</h3>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={chart.data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.35)" />
          <XAxis dataKey="label" stroke="rgba(255,255,255,0.85)" fontSize={12} />
          <YAxis stroke="rgba(255,255,255,0.85)" fontSize={12} />
          <Tooltip />
          <Bar dataKey="value" fill="#ffffff" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function CompletedList() {
  const navigate = useNavigate();
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-white p-6">
      <h3 className="mb-4 text-xl font-bold text-brand-text">
        الدورات والمعسكرات والشهادات المكتملة
      </h3>

      <div className="grid gap-3 md:grid-cols-2">
        {completedItems.map((item) => (
          <article
            key={item.title}
            className="flex items-center justify-between gap-4 rounded-xl border border-brand-border bg-brand-light p-4"
          >
            <div>
              <span className="mb-1 inline-block rounded-full bg-brand-main px-3 py-1 text-xs font-bold text-white">
                {item.type}
              </span>
              <h4 className="text-base font-bold text-brand-text">{item.title}</h4>
              <p className="text-sm text-brand-muted">تاريخ الإكمال: {item.date}</p>
            </div>

            <button
              type="button"
              className="rounded-lg bg-brand-main px-4 py-2 text-sm font-bold text-white transition hover:opacity-90"
              onClick={() => navigate("/about")}
            >
              تحميل PDF
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProjectsSection({ projects }) {
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-white p-6">
      <h3 className="mb-4 text-xl font-bold text-brand-text">مشاريعي المرفوعة</h3>

      <div className="flex flex-col gap-3">
        {projects.map((project) => (
          <article
            key={project.title}
            className="flex items-center justify-between rounded-xl border border-brand-border bg-brand-light p-4"
          >
            <div>
              <h4 className="font-bold text-brand-text">{project.title}</h4>
              <p className="text-sm text-brand-muted">تاريخ الرفع: {project.date}</p>
            </div>

            <span className="rounded-full bg-brand-main px-3 py-1 text-xs font-bold text-white">
              {project.status}
            </span>
          </article>
        ))}
      </div>
    </div>
  );
}

function Dashboard() {

  const { role, section, typeFilter } = useRole();

  const dashboard = DASHBOARD_DATA[role];

  const showProjects = role === "student" && section === "projects";

  const visibleSections =
    role === "student" && typeFilter !== "all"
      ? dashboard.sections.filter((item) => item.type === typeFilter)
      : dashboard.sections;

  return (
    <section className="flex flex-col gap-5">
      <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
        <h2 className="mb-2 text-4xl font-bold text-white">{dashboard.title}</h2>
        <p className="text-lg text-white/85">{dashboard.subtitle}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {dashboard.stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-xl border border-brand-border bg-brand-white px-4 py-3 shadow-sm"
          >
            <span className="mb-1 block text-sm text-brand-muted">{stat.label}</span>
            <strong className="text-2xl text-brand-text">{stat.value}</strong>
          </article>
        ))}

        {role === "student" ? (
          <article className="rounded-xl border border-brand-border bg-brand-white px-4 py-3 shadow-sm">
            <span className="mb-1 block text-sm text-brand-muted">
              المشاركين بالمنصة
            </span>
            <strong className="text-2xl text-brand-text">
              {dashboard.participants}
            </strong>
          </article>
        ) : null}
      </div>

      {showProjects ? (
        <ProjectsSection projects={dashboard.projects} />
      ) : dashboard.chart ? (
        <ChartCard chart={dashboard.chart} />
      ) : null}

      {role === "student" ? <CompletedList /> : null}

      <div className="rounded-2xl border border-brand-border bg-brand-white p-6">
        <h3 className="mb-4 text-xl font-bold text-brand-text">الخدمات المتاحة</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          {visibleSections.map((item) => (
            <article
              key={item.key}
              className="rounded-xl border border-brand-border bg-brand-light p-4"
            >
              <h4 className="mb-1 text-lg font-bold text-brand-text">{item.label}</h4>
              <p className="text-sm text-brand-muted">
                إدارة ومتابعة {item.label} من خلال لوحة التحكم.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;