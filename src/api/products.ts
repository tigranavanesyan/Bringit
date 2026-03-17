import axios from "axios";
import type { Product } from "../types/product";

const BASE_URL = "https://fakestoreapi.com";

export async function fetchProducts(): Promise<Product[]> {
  const { data } = await axios.get<Product[]>(`${BASE_URL}/products`);
  return data;
}
