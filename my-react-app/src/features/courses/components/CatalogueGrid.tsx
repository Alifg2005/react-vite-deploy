import ProductCard from "./ProductCard";
import { COURSE_CATALOGUE_DATA } from "../../../mock";
import type { Product } from "../../../mock";

const { countLabel, emptyMessage } = COURSE_CATALOGUE_DATA.results;

interface CatalogueGridProps {
  products: Product[];
}

function CatalogueGrid({ products }: CatalogueGridProps) {
  return (
    <>
      <p className="text-sm text-brand-muted">
        {products.length} {countLabel}
      </p>

      {products.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} showRating={false} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-brand-border bg-brand-white p-10 text-center">
          <p className="text-sm text-brand-muted">{emptyMessage}</p>
        </div>
      )}
    </>
  );
}

export default CatalogueGrid;
