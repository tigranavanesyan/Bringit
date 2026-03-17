import { describe, it, expect } from "vitest";
import { filterAndSortProducts } from "./filterProducts";
import type { Product } from "../types/product";

const mockProducts: Product[] = [
  { id: 1, title: "Blue T-Shirt", price: 20, description: "", category: "men's clothing", image: "" },
  { id: 2, title: "Red Shirt", price: 15, description: "", category: "women's clothing", image: "" },
  { id: 3, title: "Laptop", price: 999, description: "", category: "electronics", image: "" },
  { id: 4, title: "Casual Shirt", price: 25, description: "", category: "men's clothing", image: "" },
];

describe("filterAndSortProducts", () => {
  it("filters by search query (title)", () => {
    const result = filterAndSortProducts(mockProducts, "shirt", "", "");
    expect(result).toHaveLength(3);
    expect(result.map((p) => p.title)).toContain("Blue T-Shirt");
    expect(result.map((p) => p.title)).toContain("Red Shirt");
    expect(result.map((p) => p.title)).toContain("Casual Shirt");
    expect(result.map((p) => p.title)).not.toContain("Laptop");
  });

  it("filters by category", () => {
    const result = filterAndSortProducts(mockProducts, "", "electronics", "");
    expect(result).toHaveLength(1);
    expect(result[0].category).toBe("electronics");
  });

  it("combines search and category filter", () => {
    const result = filterAndSortProducts(mockProducts, "shirt", "men's clothing", "");
    expect(result).toHaveLength(2);
    expect(result.every((p) => p.category === "men's clothing")).toBe(true);
    expect(result.every((p) => p.title.toLowerCase().includes("shirt"))).toBe(true);
  });

  it("sorts by price ascending", () => {
    const result = filterAndSortProducts(mockProducts, "", "", "price-asc");
    expect(result.map((p) => p.price)).toEqual([15, 20, 25, 999]);
  });

  it("sorts by price descending", () => {
    const result = filterAndSortProducts(mockProducts, "", "", "price-desc");
    expect(result.map((p) => p.price)).toEqual([999, 25, 20, 15]);
  });

  it("returns all products when no filters", () => {
    const result = filterAndSortProducts(mockProducts, "", "", "");
    expect(result).toHaveLength(4);
  });
});
