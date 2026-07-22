// Shared building blocks for the admin list pages (ApprovalRequests,
// ProgramManagement, UserManagement, Reports, ComplaintsReplies) — pulled out
// once the same pill/button/filter markup started getting copy-pasted across
// each page.
import { useState, type ReactNode } from "react";
import AdminIcon from "./AdminIcons";
import { useRole } from "../../../shared/context/RoleContext";
import { ADMIN_LABELS, adminTranslations } from "../../../mock";

// Tone props are typed as a broad `string` (not a literal union) since many
// call sites look up the tone dynamically from data (e.g.
// `PROGRAM_STATUS_TONES[item.status]`); the CLASS maps below are indexed
// permissively to match.
const PILL_TONE_CLASSES: Record<string, string> = {
  rose: "bg-rose-100 text-rose-700",
  amber: "bg-amber-100 text-amber-700",
  emerald: "bg-emerald-100 text-emerald-700",
  sky: "bg-sky-100 text-sky-700",
  violet: "bg-violet-100 text-violet-700",
  teal: "bg-teal-100 text-teal-700",
  gray: "bg-brand-light text-brand-muted",
};

export interface AdminPillProps {
  tone?: string;
  icon?: string;
  dot?: boolean;
  className?: string;
  children?: ReactNode;
}

export function AdminPill({ tone = "rose", icon, dot = false, className = "", children }: AdminPillProps) {
  return (
    <span className={`inline-flex min-w-24 items-center justify-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${PILL_TONE_CLASSES[tone]} ${className}`}>
      {dot ? <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" /> : null}
      {icon ? <AdminIcon name={icon} className="h-3 w-3 shrink-0" /> : null}
      {children}
    </span>
  );
}

const OUTLINE_PILL_TONE_CLASSES: Record<string, string> = {
  rose: "border border-rose-300 text-rose-600",
  emerald: "border border-emerald-300 text-emerald-600",
  violet: "border border-violet-300 text-violet-600",
};

export interface AdminOutlinePillProps {
  tone?: string;
  className?: string;
  children?: ReactNode;
}

export function AdminOutlinePill({ tone = "rose", className = "", children }: AdminOutlinePillProps) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${OUTLINE_PILL_TONE_CLASSES[tone]} ${className}`}>
      {children}
    </span>
  );
}

const ACTION_BUTTON_TONE_CLASSES: Record<string, string> = {
  rose: "bg-rose-100 text-rose-600 hover:bg-rose-200",
  sky: "bg-sky-100 text-sky-600 hover:bg-sky-200",
  emerald: "bg-emerald-100 text-emerald-600 hover:bg-emerald-200",
  amber: "bg-amber-100 text-amber-600 hover:bg-amber-200",
};

export interface AdminRowActionButtonProps {
  icon: string;
  tone?: string;
  label: string;
  onClick: () => void;
}

// Small square icon button used for table row actions (view / edit / delete / …).
export function AdminRowActionButton({ icon, tone = "sky", label, onClick }: AdminRowActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${ACTION_BUTTON_TONE_CLASSES[tone]}`}
    >
      <AdminIcon name={icon} className="h-4 w-4" />
    </button>
  );
}

export interface AdminSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function AdminSearchInput({ value, onChange, placeholder }: AdminSearchInputProps) {
  const { t } = useRole();
  return (
    <div className="relative flex-1">
      <AdminIcon name="search" className="absolute inset-s-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder ?? t(adminTranslations.common.searchPlaceholder)}
        className="w-full rounded-lg border border-brand-border bg-brand-white py-2.5 ps-9 pe-3 text-sm"
      />
    </div>
  );
}

export interface AdminSelectOption {
  value: string;
  label: string;
}

export interface AdminSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: AdminSelectOption[];
}

export function AdminSelect({ value, onChange, options }: AdminSelectProps) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="rounded-lg border border-brand-border bg-brand-white px-3 py-2.5 text-sm font-bold text-brand-text"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
}

export interface AdminResetButtonProps {
  onClick: () => void;
  label?: string;
}

export function AdminResetButton({ onClick, label }: AdminResetButtonProps) {
  const { t } = useRole();
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-2 rounded-lg border border-brand-border bg-brand-white px-4 py-2.5 text-sm font-bold text-brand-text transition hover:bg-brand-light"
    >
      <AdminIcon name="refresh" className="h-4 w-4" />
      {label ?? t(adminTranslations.common.reset)}
    </button>
  );
}

// White-background, green-lined wrapper shared by every admin data table.
export function AdminTableShell({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-emerald-100 bg-brand-white p-2">
      <table className="w-full min-w-190 border-collapse text-sm">{children}</table>
    </div>
  );
}

export interface AdminKebabMenuItem {
  label: string;
  icon: string;
  onClick: () => void;
}

export interface AdminKebabMenuProps {
  items: AdminKebabMenuItem[];
  triggerIcon?: string;
  tone?: string;
  label?: string;
  // Which side the dropdown opens toward. Default "end" grows away from the
  // trigger's start edge (fine for a standalone toolbar button); pass "start"
  // when the trigger sits at a container's trailing edge (e.g. a table's
  // last/Actions column) so the menu opens back into the content instead of
  // clipping off the edge.
  align?: "start" | "end";
}

// Small button that reveals a dropdown of extra actions (e.g. تحميل PDF /
// مشاركة رابط) without cluttering the row with more icons. Defaults to a
// plain "⋮" trigger; pass triggerIcon/tone/label to reuse it as a normal
// colored row-action button that happens to open a choice menu.
export function AdminKebabMenu({ items, triggerIcon = "kebab", tone, label, align = "end" }: AdminKebabMenuProps) {
  const { t } = useRole();
  const [open, setOpen] = useState(false);
  const resolvedLabel = label ?? t(adminTranslations.common.more);

  const triggerClass = tone
    ? `flex h-8 w-8 items-center justify-center rounded-lg transition ${ACTION_BUTTON_TONE_CLASSES[tone]}`
    : "flex h-8 w-8 items-center justify-center rounded-lg text-brand-muted transition hover:bg-brand-light";

  const dropdownAlignClass = align === "start" ? "inset-e-0" : "inset-s-0";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={resolvedLabel}
        title={resolvedLabel}
        className={triggerClass}
      >
        <AdminIcon name={triggerIcon} className="h-4 w-4" />
      </button>

      {open ? (
        <div className={`absolute ${dropdownAlignClass} top-full z-10 mt-1 w-44 rounded-xl border border-brand-border bg-brand-white p-1.5 text-start shadow-lg`}>
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                setOpen(false);
                item.onClick();
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-brand-text hover:bg-brand-light"
            >
              <AdminIcon name={item.icon} className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

const TONE_ICON_CIRCLE_CLASSES: Record<string, string> = {
  rose: "bg-rose-100 text-rose-600",
  blue: "bg-sky-100 text-sky-600",
  teal: "bg-teal-100 text-teal-600",
  purple: "bg-violet-100 text-violet-600",
  green: "bg-emerald-100 text-emerald-600",
  amber: "bg-amber-100 text-amber-600",
};

export interface AdminToneIconProps {
  tone?: string;
  icon: string;
  className?: string;
}

// Colored circular icon badge used on stat cards (admin dashboard, user
// management, …) — shares the same tone vocabulary as ADMIN_STAT_CARDS.
export function AdminToneIcon({ tone = "rose", icon, className = "h-11 w-11" }: AdminToneIconProps) {
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full ${className} ${TONE_ICON_CIRCLE_CLASSES[tone]}`}>
      <AdminIcon name={icon} className="h-5 w-5" />
    </span>
  );
}

export function AdminTableHeadRow({ columns }: { columns: string[] }) {
  return (
    <tr className="border-b border-emerald-200 text-center text-xs font-bold text-brand-muted">
      {columns.map((column) => (
        <th key={column} className="px-3 py-2">{column}</th>
      ))}
    </tr>
  );
}

export interface AdminShowMoreButtonProps {
  onClick: () => void;
  expanded?: boolean;
}

// "Load more" / "Show less" toggle for paginated admin lists/tables — replaces
// an inner scroll container so the page scrolls instead of a cramped nested
// area. Once every row is visible, it flips to a collapse trigger.
export function AdminShowMoreButton({ onClick, expanded = false }: AdminShowMoreButtonProps) {
  const { t } = useRole();
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg py-2 text-sm font-bold text-brand-main transition hover:bg-brand-light"
    >
      {expanded ? t(adminTranslations.common.showLess) : t(adminTranslations.common.showMore)}
      <AdminIcon name="chevron" className={`h-4 w-4 ${expanded ? "-rotate-90" : "rotate-90"}`} />
    </button>
  );
}

// Status pill for a pending approval request — shared between the Approval
// Requests list and its detail page.
export function PendingStatusPill() {
  const { t } = useRole();
  return (
    <AdminPill tone="amber" className="inline-flex items-center gap-1">
      <AdminIcon name="calendar" className="h-3 w-3" />
      {t(ADMIN_LABELS.pendingApproval)}
    </AdminPill>
  );
}
