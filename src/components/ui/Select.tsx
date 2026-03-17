import { type SelectHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  "aria-label"?: string;
}

export function Select({
  value,
  onChange,
  options,
  "aria-label": ariaLabel,
  className = "",
  id,
  ...props
}: SelectProps) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={ariaLabel}
      className={cn(
      "w-full min-w-30 px-3 py-2 rounded-md border border-(--color-border) bg-(--color-bg-card) text-base text-(--color-text) focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-transparent",
      className
    )}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
