import { Input } from "./ui/Input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search products...",
}: SearchBarProps) {
  return (
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      aria-label="Search products by title"
    />
  );
}
