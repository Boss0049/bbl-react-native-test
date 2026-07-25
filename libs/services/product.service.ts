import { Product } from "../types";
import { axiosInstance } from "./axios-instance";

export async function getProductList(): Promise<Product[]> {
  const response = await axiosInstance.get<Product[]>("/products");
  return response.data;
}

export async function getProductById(id: string): Promise<Product> {
  const response = await axiosInstance.get<Product>(`/products/${id}`);
  return response.data;
}
