import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductCard } from "./ProductCard";
import type { Product } from "../types/product";

const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  price: 29.99,
  description: "A test product",
  category: "electronics",
  image: "https://example.com/image.jpg",
};

describe("ProductCard", () => {
  it("renders product image, title, price, and category", () => {
    render(<ProductCard product={mockProduct} onProductClick={() => {}} />);

    expect(screen.getByRole("img", { name: "Test Product" })).toBeInTheDocument();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$29.99")).toBeInTheDocument();
    expect(screen.getByText("electronics")).toBeInTheDocument();
  });

  it("calls onProductClick with product when clicked", () => {
    const onProductClick = vi.fn();
    render(<ProductCard product={mockProduct} onProductClick={onProductClick} />);

    fireEvent.click(screen.getByRole("button"));

    expect(onProductClick).toHaveBeenCalledTimes(1);
    expect(onProductClick).toHaveBeenCalledWith(mockProduct);
  });
});
