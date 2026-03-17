import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";

const PRODUCTS_QUERY_KEY = ["products"] as const;

export function useProducts() {
  const { data: products = [], isLoading, error, refetch } = useQuery({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: fetchProducts,
  });

  return {
    products,
    loading: isLoading,
    error: error ?? null,
    refetch,
  };
}
