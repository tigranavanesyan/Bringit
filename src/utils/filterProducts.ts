import type { Product } from "../types/product";

export type SortOption = "" | "price-asc" | "price-desc";

export function filterAndSortProducts(
  products: Product[],
  searchQuery: string,
  selectedCategory: string,
  sortBy: SortOption
): Product[] {
  let result = products;

  const q = searchQuery.trim().toLowerCase();
  if (q) {
    result = result.filter((p) => p.title.toLowerCase().includes(q));
  }
  if (selectedCategory) {
    result = result.filter((p) => p.category === selectedCategory);
  }
  if (sortBy === "price-asc") {
    result = [...result].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    result = [...result].sort((a, b) => b.price - a.price);
  }
  return result;
}
