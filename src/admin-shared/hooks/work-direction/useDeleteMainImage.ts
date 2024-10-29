import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteWorkDirectionMainImage } from "@/admin-shared/api";
export const useDeleteMainImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteMainImage"],
    mutationFn: (id: string) => deleteWorkDirectionMainImage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["directionData"] });
    },
  });
};
