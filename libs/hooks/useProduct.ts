import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductList, getProductById } from "../services/product.service";
import { Product } from "../types";

export function useProductList() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProductList,
  });
}

export function useProduct(id: string) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    placeholderData: () =>
      queryClient
        .getQueryData<Product[]>(["products"])
        ?.find((product) => product.id === Number(id)),
  });
}
