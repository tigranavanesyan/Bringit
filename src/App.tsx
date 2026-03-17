import { useState, useMemo, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useProducts } from "./hooks/useProducts";
import { filterAndSortProducts, type SortOption } from "./utils/filterProducts";
import { SearchBar } from "./components/SearchBar";
import { CategoryFilter } from "./components/CategoryFilter";
import { SortControl } from "./components/SortControl";
import { ProductGrid } from "./components/ProductGrid";
import { ProductDetailModal } from "./components/ProductDetailModal";
import { Pagination } from "./components/Pagination";
import { SkeletonCard } from "./components/SkeletonCard";
import { ErrorMessage } from "./components/ErrorMessage";
import type { Product } from "./types/product";

const PAGE_SIZE = 8;
const SKELETON_COUNT = 8;

function App() {
  const { products, loading, error, refetch } = useProducts();
  const { enqueueSnackbar } = useSnackbar();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (error) {
      enqueueSnackbar("Unable to load products. Please try again.", {
        variant: "error",
      });
    }
  }, [error, enqueueSnackbar]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const filteredProducts = useMemo(
    () => filterAndSortProducts(products, searchQuery, selectedCategory, sortBy),
    [products, searchQuery, selectedCategory, sortBy]
  );

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, currentPage]);

  return (
    <div className="min-h-screen">
      <header className="border-b border-(--color-border) bg-(--color-bg-card)">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-semibold mb-4">Bringit</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
            <div className="flex gap-2 sm:gap-4">
              <CategoryFilter value={selectedCategory} onChange={setSelectedCategory} />
              <SortControl value={sortBy} onChange={setSortBy} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {!loading && error && (
          <ErrorMessage onRetry={() => refetch()} />
        )}

        {!loading && !error && (
          <>
            <ProductGrid
              products={paginatedProducts}
              onProductClick={setSelectedProduct}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </main>

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default App;
