import { deleteProduct } from "@/api/products";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function deleteProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
