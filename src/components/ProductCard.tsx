import { memo } from "react";
import type { Product } from "../types/product";
import { HighlightedText } from "./HighlightedText";

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  highlightQuery?: string;
}

export const ProductCard = memo(function ProductCard({
  product,
  onProductClick,
  highlightQuery,
}: ProductCardProps) {
  return (
    <button
      type="button"
      onClick={() => onProductClick(product)}
      className="w-full flex flex-col justify-between text-left rounded-lg border border-(--color-border) bg-(--color-bg-card) overflow-hidden shadow-(--shadow-sm) hover:shadow-(--shadow-md) transition-shadow focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
    >
      <div className="aspect-square w-full overflow-hidden bg-(--color-border)">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-4 flex flex-col flex-1 min-h-0">
        <div className="flex-1 min-h-0">
          <span className="text-sm text-(--color-text-muted) uppercase tracking-wide">
            {product.category}
          </span>
          <h3 className="mt-1 font-semibold text-base line-clamp-2">
            {highlightQuery ? (
              <HighlightedText
                text={product.title}
                highlight={highlightQuery}
              />
            ) : (
              product.title
            )}
          </h3>
        </div>
        <p className="mt-2 text-lg font-semibold text-(--color-primary)">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </button>
  );
});
