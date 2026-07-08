import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { PRODUCTS, PRODUCT_TYPE_LABELS } from "../data/productData";
import ProductCard from "../components/ProductCard";
import CatalogueFilters from "../components/CatalogueFilters";
import { useRole } from "../context/RoleContext";

// Which product types each viewer is allowed to see in the catalogue.
// Students & guests: only courses / camps / competitions.
// Trainers & projects are NEVER listed standalone here — they're reached
// from inside a Program Details page instead.
const VISIBLE_TYPES_BY_ROLE = {
  guest: ["course", "camp", "competition"],
  student: ["course", "camp", "competition"],
  trainer: ["course", "camp", "competition"],
  company: ["course", "camp", "competition"],
  admin: ["course", "camp", "competition", "trainer", "project"],
};

// Statuses that count as "hidden" and should never appear in the catalogue.
const HIDDEN_STATUSES = ["closed"];

/* ---------- the page ---------- */

export default function CourseCatalogue() {
  const { role } = useRole();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState(searchParams.get("type") ?? "all");
  const [statusFilter, setStatusFilter] = useState("all");

  function handleTypeChange(nextType) {
    setTypeFilter(nextType);
    setSearchParams(nextType === "all" ? {} : { type: nextType });
  }

  const allowedTypes = VISIBLE_TYPES_BY_ROLE[role] ?? VISIBLE_TYPES_BY_ROLE.guest;

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
        onTypeChange={handleTypeChange}
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