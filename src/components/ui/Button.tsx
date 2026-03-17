import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-(--color-primary) text-white hover:bg-(--color-primary-hover) disabled:opacity-50 disabled:cursor-not-allowed",
  secondary:
    "bg-(--color-bg-card) border border-(--color-border) text-(--color-text) hover:bg-(--color-border) disabled:opacity-50 disabled:cursor-not-allowed",
  ghost:
    "bg-transparent text-(--color-text) hover:bg-(--color-border) disabled:opacity-50 disabled:cursor-not-allowed",
};

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center px-4 py-2 rounded-md font-medium text-base transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
