import { useState, useMemo, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useProducts } from "./hooks/useProducts";
import { useDebouncedValue } from "./hooks/useDebouncedValue";
import { filterAndSortProducts, type SortOption } from "./utils/filterProducts";
import { HeaderControls } from "./components/HeaderControls";
import { ProductMainContent } from "./components/ProductMainContent";
import { ProductDetailModal } from "./components/ProductDetailModal";
import { SelectedProductProvider } from "./contexts/SelectedProductContext";

const PAGE_SIZE = 8;
const SEARCH_DEBOUNCE_MS = 200;

function App() {
  const { products, loading, error, refetch } = useProducts();
  const { enqueueSnackbar } = useSnackbar();

  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchQuery = useDebouncedValue(searchInput, SEARCH_DEBOUNCE_MS);

  const [selectedCategory, setSelectedCategory] = useState("");
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
  }, [debouncedSearchQuery, selectedCategory]);

  const filteredProducts = useMemo(
    () =>
      filterAndSortProducts(
        products,
        debouncedSearchQuery,
        selectedCategory,
        sortBy
      ),
    [products, debouncedSearchQuery, selectedCategory, sortBy]
  );

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, currentPage]);

  return (
    <div className="min-h-screen">
      <HeaderControls
        searchQuery={searchInput}
        setSearchQuery={setSearchInput}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <SelectedProductProvider>
        <ProductMainContent
          loading={loading}
          error={error}
          refetch={refetch}
          paginatedProducts={paginatedProducts}
          searchQuery={debouncedSearchQuery}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
        <ProductDetailModal />
      </SelectedProductProvider>
    </div>
  );
}

export default App;
