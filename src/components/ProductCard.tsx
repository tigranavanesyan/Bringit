import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left rounded-lg border border-(--color-border) bg-(--color-bg-card) overflow-hidden shadow-(--shadow-sm) hover:shadow-(--shadow-md) transition-shadow focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
    >
      <div className="aspect-square w-full overflow-hidden bg-(--color-border)">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-4">
        <span className="text-sm text-(--color-text-muted) uppercase tracking-wide">
          {product.category}
        </span>
        <h3 className="mt-1 font-semibold text-base line-clamp-2">
          {product.title}
        </h3>
        <p className="mt-2 text-lg font-semibold text-(--color-primary)">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </button>
  );
}
