import type { ReactNode } from "react";

// ChartCard — generic wrapper for a chart section: a title, optional header
// controls (filter pills, a period/mode select, ...) on the same row, and a
// body that holds the actual chart. The body only sets `dir` + `flex-1`;
// sizing (h-96, a centered square box for a radar chart, etc.) is the
// caller's responsibility via `children`, since different chart shapes need
// different body layouts. Used by the student and company dashboards'
// analytics sections so the header/title layout is written once.

interface ChartCardProps {
  title: string;
  direction: "rtl" | "ltr";
  actions?: ReactNode;
  className?: string;
  children: ReactNode;
}

function ChartCard({ title, direction, actions, className = "", children }: ChartCardProps) {
  return (
    <div className={className}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-brand-text">{title}</h3>
        {actions}
      </div>

      <div dir={direction} className="flex-1">
        {children}
      </div>
    </div>
  );
}

export default ChartCard;
