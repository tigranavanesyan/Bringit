import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  "aria-label"?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      onChange,
      placeholder,
      type = "text",
      className = "",
      id,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className={cn(
          "w-full px-3 py-2 rounded-md border border-(--color-border) bg-(--color-bg-card) text-base text-(--color-text) placeholder:text-(--color-text-muted) focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-transparent",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
