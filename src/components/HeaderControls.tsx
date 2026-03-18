import { memo } from "react";
import { SearchBar } from "./SearchBar";
import { CategoryFilter } from "./CategoryFilter";
import { SortControl } from "./SortControl";
import type { SortOption } from "../utils/filterProducts";

export const HeaderControls = memo(function HeaderControls({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
}: {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;
}) {
  return (
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
  );
});
