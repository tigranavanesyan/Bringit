import { memo } from "react";
import { ProductGrid } from "./ProductGrid";
import { Pagination } from "./Pagination";
import { SkeletonCard } from "./SkeletonCard";
import { ErrorMessage } from "./ErrorMessage";
import { useSetSelectedProduct } from "../contexts/SelectedProductContext";
import type { Product } from "../types/product";

const SKELETON_COUNT = 8;

export const ProductMainContent = memo(function ProductMainContent({
  loading,
  error,
  refetch,
  paginatedProducts,
  searchQuery,
  currentPage,
  totalPages,
  setCurrentPage,
}: {
  loading: boolean;
  error: Error | null;
  refetch: () => void;
  paginatedProducts: Product[];
  searchQuery: string;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}) {
  const setSelectedProduct = useSetSelectedProduct();

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {!loading && error && (
        <ErrorMessage onRetry={refetch} />
      )}

      {!loading && !error && (
        <>
          <ProductGrid
            products={paginatedProducts}
            onProductClick={setSelectedProduct}
            highlightQuery={searchQuery}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </main>
  );
});
