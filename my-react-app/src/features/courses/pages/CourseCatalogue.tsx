import { JSX, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PRODUCTS, VISIBLE_TYPES_BY_ROLE, HIDDEN_STATUSES } from "../../../mock";
import type { ProductType } from "../../../mock";
import { useRole } from "../../../shared/context/RoleContext";
import CatalogueFilters from "../components/CatalogueFilters";
import CatalogueBanner from "../components/CatalogueBanner";
import CatalogueGrid from "../components/CatalogueGrid";

function CourseCatalogue(): JSX.Element {
  const { role } = useRole();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>(searchParams.get("type") ?? "all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const allowedTypes: ProductType[] = VISIBLE_TYPES_BY_ROLE[role] ?? VISIBLE_TYPES_BY_ROLE.guest;

  function handleTypeChange(nextType: string): void {
    setTypeFilter(nextType);
    setSearchParams(nextType === "all" ? {} : { type: nextType });
  }

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return Object.values(PRODUCTS).filter((product) => {
      if (!allowedTypes.includes(product.type)) return false;
      if (HIDDEN_STATUSES.includes(product.status)) return false;
      if (typeFilter !== "all" && product.type !== typeFilter) return false;
      if (statusFilter !== "all" && product.status !== statusFilter) return false;

      if (query) {
        const haystack = [product.title, product.provider, product.instructor?.name ?? ""]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      return true;
    });
  }, [allowedTypes, typeFilter, statusFilter, search]);

  return (
    <section className="flex flex-col gap-5">
      <CatalogueBanner />
      <CatalogueFilters
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeChange={handleTypeChange}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />
      <CatalogueGrid products={visibleProducts} />
    </section>
  );
}

export default CourseCatalogue;
