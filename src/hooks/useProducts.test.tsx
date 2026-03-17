import type { ReactNode } from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useProducts } from "./useProducts";
import type { Product } from "../types/product";

const mockProducts: Product[] = [
  { id: 1, title: "Product 1", price: 10, description: "", category: "electronics", image: "" },
];

vi.mock("../api/products", () => ({
  fetchProducts: vi.fn(),
}));

const { fetchProducts } = await import("../api/products");

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

describe("useProducts", () => {
  beforeEach(() => {
    vi.mocked(fetchProducts).mockReset();
  });

  it("returns products after successful fetch", async () => {
    vi.mocked(fetchProducts).mockResolvedValue(mockProducts);
    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.error).toBeNull();
  });

  it("sets error when fetch fails", async () => {
    vi.mocked(fetchProducts).mockRejectedValue(new Error("Network error"));
    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual([]);
    expect(result.current.error).not.toBeNull();
  });
});
