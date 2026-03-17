import { Select } from "./ui/Select";

const CATEGORY_OPTIONS = [
  { value: "", label: "All categories" },
  { value: "electronics", label: "Electronics" },
  { value: "jewelery", label: "Jewelery" },
  { value: "men's clothing", label: "Men's clothing" },
  { value: "women's clothing", label: "Women's clothing" },
];

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <Select
      value={value}
      onChange={onChange}
      options={CATEGORY_OPTIONS}
      aria-label="Filter by category"
    />
  );
}
