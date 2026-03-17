import { Select } from "./ui/Select";

export type SortOption = "" | "price-asc" | "price-desc";

const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

interface SortControlProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortControl({ value, onChange }: SortControlProps) {
  return (
    <Select
      value={value}
      onChange={(v) => onChange(v as SortOption)}
      options={SORT_OPTIONS}
      aria-label="Sort by price"
    />
  );
}
