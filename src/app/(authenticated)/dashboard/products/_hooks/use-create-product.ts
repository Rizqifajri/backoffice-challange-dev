import { createProduct } from "@/api/products";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
