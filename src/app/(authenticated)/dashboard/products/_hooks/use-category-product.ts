import { getProductCategories } from "@/api/products";
import { useQuery } from "@tanstack/react-query";

export function getProductCategoriesQuery() {
  return useQuery({
    queryKey: ["product-categories"],
    queryFn: getProductCategories,
    staleTime: 60000,
  });
}
