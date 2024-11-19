import { editProduct } from "@/api/products";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function editProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
