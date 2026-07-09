import { useMemo, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useRole } from "../context/RoleContext";
import { DASHBOARD_DATA } from "../data/dashboardData";
import { PRODUCTS } from "../data/productData";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/dashboard-Sidebar";
import SharedCard from "../components/SharedCard";
import {
  COMPLETED_ITEMS,
  CURRENT_ACTIVITIES,
  PENDING_PROGRAM_REQUESTS,
  PENDING_USER_REQUESTS,
  COMPLAINTS_SEED,
  USER_GROWTH_DATA,
  REPORT_ITEMS,
} from "../data/dashboardMockData";

import { useNavigate, Navigate } from "react-router-dom";

const COMPLETED_TYPE_FILTERS = [
  { value: "all", label: "الكل" },
  { value: "دورة", label: "دورة" },
  { value: "معسكر", label: "معسكر" },
  { value: "مسابقة", label: "مسابقة" },
];

const ACTIVITY_TYPE_FILTERS = [
  { value: "all", label: "الكل" },
  { value: "course", label: "دورة" },
  { value: "camp", label: "معسكر" },
  { value: "competition", label: "مسابقة" },
];

const ACTIVITY_GROUPS = [
  { type: "course", label: "الدورات", countLabel: "دورات" },
  { type: "camp", label: "المعسكرات", countLabel: "معسكرات" },
  { type: "competition", label: "المسابقات", countLabel: "مسابقات" },
];

const ACTIVITY_STATUS_FILTERS = [
  { value: "all", label: "فلترة: الكل" },
  { value: "in-progress", label: "قيد التقدم" },
  { value: "completed", label: "مكتمل" },
];

const USER_REQUEST_ROLE_FILTERS = [
  { value: "all", label: "الكل" },
  { value: "طالب", label: "طالب" },
  { value: "شركة", label: "شركة" },
  { value: "مدرب", label: "مدرب" },
];

const COMPLAINT_STATUS_STYLES = {
  "جديدة": "bg-amber-100 text-amber-700",
  "تم الرد": "bg-emerald-100 text-emerald-700",
};

const REPORT_TYPE_FILTERS = [
  { value: "all", label: "الكل" },
  { value: "تقرير", label: "تقرير" },
  { value: "طلب", label: "طلب" },
];

// All-green family per request, validated for CVD-safe separation and
// contrast against a white chart surface (dataviz skill) — darkest carries
// the dominant series, lightest sits closest to the page background.
const CHART_SERIES_COLORS = {
  Students: "#047857",
  Companies: "#0d9488",
  Trainers: "#14b8a6",
};

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

function CardCarousel({ items, keyFn, renderItem }) {
  const scrollRef = useRef(null);

  function scroll(direction) {
    scrollRef.current?.scrollBy({ left: direction * 280, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto scroll-smooth pb-1">
        {items.map((item) => (
          <div key={keyFn(item)} className="w-64 shrink-0">
            {renderItem(item)}
          </div>
        ))}
      </div>

      {items.length > 1 ? (
        <>
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="السابق"
            className="absolute -right-1.5 top-1/2 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-brand-white text-brand-text shadow-md ring-1 ring-brand-border sm:flex"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="التالي"
            className="absolute -left-1.5 top-1/2 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-brand-white text-brand-text shadow-md ring-1 ring-brand-border sm:flex"
          >
            ›
          </button>
        </>
      ) : null}
    </div>
  );
}

function ActivityRow({ label, countLabel, items }) {
  const [statusFilter, setStatusFilter] = useState("all");

  const visibleItems = items.filter((item) => {
    if (statusFilter === "completed") return item.progress >= 100;
    if (statusFilter === "in-progress") return item.progress < 100;
    return true;
  });

  if (items.length === 0) return null;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h4 className="text-base font-bold text-brand-text">{label}</h4>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
            {visibleItems.length} {countLabel}
          </span>
        </div>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-full border border-brand-border bg-brand-white px-3 py-1 text-xs font-bold text-brand-muted"
        >
          {ACTIVITY_STATUS_FILTERS.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </select>
      </div>

      <CardCarousel
        items={visibleItems}
        keyFn={(item) => item.product.id}
        renderItem={(item) => <ProductCard product={item.product} progress={item.progress} />}
      />
    </div>
  );
}

function CurrentActivitiesSection() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const activityItems = useMemo(
    () =>
      CURRENT_ACTIVITIES.map((activity) => ({
        product: PRODUCTS[activity.id],
        progress: activity.progress,
      })).filter((item) => Boolean(item.product)),
    []
  );

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return activityItems.filter((item) => {
      if (typeFilter !== "all" && item.product.type !== typeFilter) return false;
      if (query && !item.product.title.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [activityItems, search, typeFilter]);

  const groups = ACTIVITY_GROUPS.map((group) => ({
    ...group,
    items: filteredItems.filter((item) => item.product.type === group.type),
  }));

  return (
    <SharedCard title="الأنشطة الحالية">
      <div className="mb-5 flex flex-col gap-3">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="ابحث في أنشطتك الحالية..."
          className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
        />

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-brand-muted">فلترة:</span>
          {ACTIVITY_TYPE_FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setTypeFilter(filter.value)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                typeFilter === filter.value
                  ? "bg-brand-main text-white"
                  : "bg-brand-white text-brand-muted"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className="flex flex-col gap-6">
          {groups.map((group) => (
            <ActivityRow
              key={group.type}
              label={group.label}
              countLabel={group.countLabel}
              items={group.items}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-brand-border bg-brand-white p-4 text-center text-sm text-brand-muted">
          لا توجد أنشطة مطابقة لبحثك.
        </p>
      )}
    </SharedCard>
  );
}

function CompletedList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return COMPLETED_ITEMS.filter((item) => {
      if (typeFilter !== "all" && item.type !== typeFilter) return false;
      if (query && !item.title.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [search, typeFilter]);

  return (
    <SharedCard title="الشهادات المكتملة">
      <div className="mb-4 flex flex-col gap-3">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="ابحث عن شهادتك باسم الدورة أو المعسكر أو المسابقة..."
          className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
        />

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-brand-muted">فلترة:</span>
          {COMPLETED_TYPE_FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setTypeFilter(filter.value)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                typeFilter === filter.value
                  ? "bg-brand-main text-white"
                  : "bg-brand-white text-brand-muted"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid gap-2.5 md:grid-cols-2">
          {filteredItems.map((item) => (
            <article
              key={item.title}
              className="flex items-center justify-between gap-3 rounded-lg border border-brand-border bg-brand-white p-3"
            >
              <div>
                <span className="mb-1 inline-block rounded-full bg-brand-main px-2.5 py-0.5 text-[11px] font-bold text-white">
                  {item.type}
                </span>
                <h4 className="text-sm font-bold text-brand-text">{item.title}</h4>
                <p className="text-xs text-brand-muted">تاريخ الإكمال: {item.date}</p>
              </div>

              <button
                type="button"
                className="rounded-lg bg-brand-main px-3 py-1.5 text-xs font-bold text-white transition hover:opacity-90"
                onClick={() => navigate("/about")}
              >
                تحميل PDF
              </button>
            </article>
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-brand-border bg-brand-white p-4 text-center text-sm text-brand-muted">
          لا توجد نتائج مطابقة لبحثك.
        </p>
      )}
    </SharedCard>
  );
}

function UserGrowthChart() {
  return (
    <SharedCard title="توزيع المستخدمين حسب الفئة" className="flex flex-col self-start">
      {/* self-start above opts this card out of the grid row's default
          stretch, and this fixed height keeps it constant — filtering
          the neighboring ReportsPanel down (or up) never resizes it. */}
      <div className="h-120">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={USER_GROWTH_DATA} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--c-brand-border)" />
            <XAxis dataKey="label" fontSize={13} tick={{ fill: "var(--c-brand-text)" }} stroke="var(--c-brand-border)" />
            <YAxis fontSize={13} tick={{ fill: "var(--c-brand-text)" }} stroke="var(--c-brand-border)" />
            <Tooltip />
            <Legend wrapperStyle={{ fontWeight: 700 }} />
            <Line type="monotone" dataKey="Students" stroke={CHART_SERIES_COLORS.Students} strokeWidth={4} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="Companies" stroke={CHART_SERIES_COLORS.Companies} strokeWidth={4} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="Trainers" stroke={CHART_SERIES_COLORS.Trainers} strokeWidth={4} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </SharedCard>
  );
}

function ReportsPanel() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("all");

  const filteredReports = REPORT_ITEMS.filter((item) => {
    if (tagFilter !== "all" && item.tag !== tagFilter) return false;
    if (search.trim() && !item.title.toLowerCase().includes(search.trim().toLowerCase())) return false;
    return true;
  });

  return (
    <SharedCard title="التقارير">
      <div className="mb-4 flex flex-col gap-3">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="ابحث في التقارير..."
          className="w-full rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm"
        />

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-brand-muted">فلترة:</span>
          {REPORT_TYPE_FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setTagFilter(filter.value)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                tagFilter === filter.value
                  ? "bg-brand-main text-white"
                  : "bg-brand-white text-brand-muted"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {filteredReports.length > 0 ? (
        <div className="flex flex-col gap-2.5">
          {filteredReports.map((item) => (
            <article
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-brand-border bg-brand-white p-3"
            >
              <div>
                <span className="mb-1 inline-block rounded-full bg-brand-main px-2.5 py-0.5 text-[11px] font-bold text-white">
                  {item.tag}
                </span>
                <h5 className="text-sm font-bold text-brand-text">{item.title}</h5>
                <p className="text-xs text-brand-muted">تاريخ الإكمال: {item.date}</p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/about")}
                className="rounded-lg bg-brand-main px-3 py-1.5 text-xs font-bold text-white transition hover:opacity-90"
              >
                تحميل PDF
              </button>
            </article>
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-brand-border bg-brand-white p-4 text-center text-sm text-brand-muted">
          لا توجد تقارير مطابقة.
        </p>
      )}
    </SharedCard>
  );
}

function AdminReportsSection({ stats }) {
  return (
    <>
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

      <div className="grid gap-4 lg:grid-cols-2">
        <ReportsPanel />
        <UserGrowthChart />
      </div>
    </>
  );
}

function ApprovalActions({ onApprove, onReject }) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={onApprove}
        className="flex-1 rounded-lg bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-200"
      >
        قبول
      </button>
      <button
        type="button"
        onClick={onReject}
        className="flex-1 rounded-lg bg-rose-100 px-3 py-1.5 text-xs font-bold text-rose-700 transition hover:bg-rose-200"
      >
        رفض
      </button>
    </div>
  );
}

function ApprovalProgramCard({ item, onApprove, onReject }) {
  return (
    <article className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-brand-border bg-brand-white">
      <div className="relative flex h-20 shrink-0 items-center justify-center bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))]">
        <span className="text-2xl font-bold text-white/80">{item.title.trim().charAt(0)}</span>
        <span className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-bold text-brand-main">
          {item.type}
        </span>
      </div>

      <div className="flex flex-col gap-2 p-3">
        <h5 className="line-clamp-2 text-sm font-bold text-brand-text">{item.title}</h5>
        <p className="text-xs text-brand-muted">{item.submittedBy} · {item.date}</p>

        <ApprovalActions onApprove={onApprove} onReject={onReject} />
      </div>
    </article>
  );
}

function ApprovalUserCard({ item, onApprove, onReject }) {
  return (
    <article className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-brand-border bg-brand-white">
      <div className="relative flex h-20 shrink-0 items-center justify-center bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))]">
        <span className="text-2xl font-bold text-white/80">{item.name.trim().charAt(0)}</span>
        <span className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-bold text-brand-main">
          {item.role}
        </span>
      </div>

      <div className="flex flex-col gap-2 p-3">
        <h5 className="line-clamp-2 text-sm font-bold text-brand-text">{item.name}</h5>
        <p className="text-xs text-brand-muted">{item.date}</p>

        <ApprovalActions onApprove={onApprove} onReject={onReject} />
      </div>
    </article>
  );
}

function AdminApprovalRequestsSection() {
  const [programRequests, setProgramRequests] = useState(PENDING_PROGRAM_REQUESTS);
  const [userRequests, setUserRequests] = useState(PENDING_USER_REQUESTS);
  const [roleFilter, setRoleFilter] = useState("all");

  const visibleUserRequests = userRequests.filter(
    (item) => roleFilter === "all" || item.role === roleFilter
  );

  function removeProgramRequest(id) {
    setProgramRequests((current) => current.filter((item) => item.id !== id));
  }

  function removeUserRequest(id) {
    setUserRequests((current) => current.filter((item) => item.id !== id));
  }

  return (
    <SharedCard title="طلبات الموافقة">
      <div className="mb-6">
        <h4 className="mb-3 text-base font-bold text-brand-text">طلبات البرامج</h4>

        {programRequests.length > 0 ? (
          <CardCarousel
            items={programRequests}
            keyFn={(item) => item.id}
            renderItem={(item) => (
              <ApprovalProgramCard
                item={item}
                onApprove={() => removeProgramRequest(item.id)}
                onReject={() => removeProgramRequest(item.id)}
              />
            )}
          />
        ) : (
          <p className="rounded-lg border border-dashed border-brand-border bg-brand-white p-4 text-center text-sm text-brand-muted">
            لا توجد طلبات برامج معلّقة.
          </p>
        )}
      </div>

      <div>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-base font-bold text-brand-text">طلبات المستخدمين</h4>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-brand-muted">فلترة:</span>
            {USER_REQUEST_ROLE_FILTERS.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setRoleFilter(filter.value)}
                className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                  roleFilter === filter.value
                    ? "bg-brand-main text-white"
                    : "bg-brand-white text-brand-muted"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {visibleUserRequests.length > 0 ? (
          <CardCarousel
            items={visibleUserRequests}
            keyFn={(item) => item.id}
            renderItem={(item) => (
              <ApprovalUserCard
                item={item}
                onApprove={() => removeUserRequest(item.id)}
                onReject={() => removeUserRequest(item.id)}
              />
            )}
          />
        ) : (
          <p className="rounded-lg border border-dashed border-brand-border bg-brand-white p-4 text-center text-sm text-brand-muted">
            لا توجد طلبات مستخدمين معلّقة.
          </p>
        )}
      </div>
    </SharedCard>
  );
}

function ComplaintsSection() {
  const [complaints, setComplaints] = useState(COMPLAINTS_SEED);
  const [replyingId, setReplyingId] = useState(null);
  const [replyText, setReplyText] = useState("");

  function startReply(id) {
    setReplyingId(id);
    setReplyText("");
  }

  function cancelReply() {
    setReplyingId(null);
    setReplyText("");
  }

  function submitReply(id) {
    setComplaints((current) =>
      current.map((item) => (item.id === id ? { ...item, status: "تم الرد" } : item))
    );
    cancelReply();
  }

  return (
    <SharedCard title="الشكاوى والرد عليها">
      <div className="flex flex-col gap-3">
        {complaints.map((item) => (
          <article key={item.id} className="rounded-xl border border-brand-border bg-brand-white p-4">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-brand-text">{item.name}</span>
                <span className="rounded-full bg-brand-main px-2.5 py-0.5 text-[11px] font-bold text-white">
                  {item.userType}
                </span>
              </div>

              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${COMPLAINT_STATUS_STYLES[item.status]}`}
              >
                {item.status}
              </span>
            </div>

            <p className="mb-3 text-sm text-brand-muted">{item.text}</p>

            {replyingId === item.id ? (
              <div className="flex flex-col gap-2">
                <textarea
                  value={replyText}
                  onChange={(event) => setReplyText(event.target.value)}
                  rows={2}
                  placeholder="اكتب ردك هنا..."
                  className="rounded-lg border border-brand-border bg-brand-white px-3 py-2 text-sm"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => submitReply(item.id)}
                    className="rounded-lg bg-brand-main px-3 py-1.5 text-xs font-bold text-white transition hover:opacity-90"
                  >
                    إرسال الرد
                  </button>
                  <button
                    type="button"
                    onClick={cancelReply}
                    className="rounded-lg border border-brand-border px-3 py-1.5 text-xs font-bold text-brand-text transition hover:bg-brand-white"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => startReply(item.id)}
                className="rounded-lg bg-brand-main px-3 py-1.5 text-xs font-bold text-white transition hover:opacity-90"
              >
                رد
              </button>
            )}
          </article>
        ))}
      </div>
    </SharedCard>
  );
}

function Dashboard() {
  const { role } = useRole();

  if (role === "guest") return <Navigate to="/login" replace />;

  const dashboard = DASHBOARD_DATA[role];

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-start">
      <Sidebar />

      <section className="flex min-w-0 flex-1 flex-col gap-5">
        <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
          <h2 className="mb-2 text-4xl font-bold text-white">{dashboard.title}</h2>
          <p className="text-lg text-white/85">{dashboard.subtitle}</p>
        </div>

        {role === "admin" ? (
          <AdminReportsSection stats={dashboard.stats} />
        ) : (
          <>
            {role !== "student" ? (
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
              </div>
            ) : null}

            {dashboard.chart ? <ChartCard chart={dashboard.chart} /> : null}
          </>
        )}

        {role === "admin" ? <AdminApprovalRequestsSection /> : null}

        {role === "admin" ? <ComplaintsSection /> : null}

        {role === "student" ? <CompletedList /> : null}

        {role === "student" ? <CurrentActivitiesSection /> : null}
      </section>
    </div>
  );
}

export default Dashboard;
