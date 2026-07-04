import { useMemo, useState } from "react";

import { PRODUCTS, PRODUCT_TYPE_LABELS } from "../data/productData";
import ProductCard from "../components/ProductCard";
import CatalogueFilters from "../components/CatalogueFilters";

// Which product types each viewer is allowed to see in the catalogue.
// Students & guests: only courses / camps / competitions.
// Trainers & projects are NEVER listed standalone here — they're reached
// from inside a Program Details page instead.
const VISIBLE_TYPES_BY_ROLE = {
  guest: ["course", "camp", "competition"],
  student: ["course", "camp", "competition"],
  couch: ["course", "camp", "competition"],
  company: ["course", "camp", "competition"],
  admin: ["course", "camp", "competition", "trainer", "project"],
};

// Statuses that count as "hidden" and should never appear in the catalogue.
const HIDDEN_STATUSES = ["closed"];

/* ---------- user display tester (same scaffold as Program Details) ---------- */

function DisplayTester({ viewerRole, onChangeRole }) {
  const roles = ["guest", "student", "couch", "company", "admin"];
  const roleLabels = {
    guest: "زائر",
    student: "طالب",
    couch: "مدرب",
    company: "شركة",
    admin: "إدارة",
  };

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-dashed border-brand-border bg-brand-white p-4">
      <span className="text-xs font-bold text-brand-muted">عرض بصفة:</span>
      {roles.map((r) => (
        <button
          key={r}
          type="button"
          onClick={() => onChangeRole(r)}
          className={`rounded-full px-3 py-1 text-xs font-bold transition ${
            r === viewerRole ? "bg-brand-dark text-white" : "bg-brand-light text-brand-muted"
          }`}
        >
          {roleLabels[r]}
        </button>
      ))}
    </div>
  );
}

/* ---------- the page ---------- */

export default function CourseCatalogue() {
  // Remove viewerRole + <DisplayTester /> once real auth is wired.
  const [viewerRole, setViewerRole] = useState("guest");

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const allowedTypes = VISIBLE_TYPES_BY_ROLE[viewerRole] ?? VISIBLE_TYPES_BY_ROLE.guest;

  // Derive the visible list. useMemo so we don't re-filter on every unrelated render.
  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return Object.values(PRODUCTS).filter((product) => {
      // 1. role visibility
      if (!allowedTypes.includes(product.type)) return false;

      // 2. hidden statuses never show
      if (HIDDEN_STATUSES.includes(product.status)) return false;

      // 3. type filter
      if (typeFilter !== "all" && product.type !== typeFilter) return false;

      // 4. status filter
      if (statusFilter !== "all" && product.status !== statusFilter) return false;

      // 5. text search: title, provider, or teacher
      if (query) {
        const haystack = [
          product.title,
          product.provider,
          product.instructor?.name ?? "",
        ]
          .join(" ")
          .toLowerCase();

        if (!haystack.includes(query)) return false;
      }

      return true;
    });
  }, [allowedTypes, typeFilter, statusFilter, search]);

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-5">
      {/* Remove <DisplayTester /> once real auth is wired */}
      <DisplayTester viewerRole={viewerRole} onChangeRole={setViewerRole} />

      {/* hero */}
      <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
        <h2 className="mb-2 text-3xl font-bold text-white md:text-4xl">استكشف البرامج</h2>
        <p className="text-lg text-white/85">
          تصفّح الدورات، المعسكرات، والمسابقات المتاحة وابدأ رحلتك التعليمية.
        </p>
      </div>

      <CatalogueFilters
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {/* result count */}
      <p className="text-sm text-brand-muted">
        {visibleProducts.length} برنامج متاح
      </p>

      {/* grid */}
      {visibleProducts.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-brand-border bg-brand-white p-10 text-center">
          <p className="text-sm text-brand-muted">
            لا توجد برامج مطابقة لبحثك. جرّب تعديل عوامل التصفية.
          </p>
        </div>
      )}
    </section>
  );
}