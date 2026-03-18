import { Modal } from "./Modal";
import { useSelectedProduct } from "../contexts/SelectedProductContext";

export function ProductDetailModal() {
  const { selectedProduct, setSelectedProduct } = useSelectedProduct();
  const product = selectedProduct;

  if (!product) return null;

  return (
    <Modal open={!!product} onClose={() => setSelectedProduct(null)}>
      <div className="space-y-4">
        <div className="aspect-square w-full max-w-sm mx-auto rounded-md overflow-hidden bg-(--color-border)">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <span className="text-sm text-(--color-text-muted) uppercase tracking-wide">
            {product.category}
          </span>
          <h3 className="mt-1 text-lg font-semibold">
            {product.title}
          </h3>
          <p className="mt-2 text-(--color-primary) font-semibold text-xl">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-3 text-base text-(--color-text)">
            {product.description}
          </p>
        </div>
      </div>
    </Modal>
  );
}
