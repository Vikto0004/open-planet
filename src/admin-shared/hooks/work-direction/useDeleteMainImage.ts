import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteWorkDirectionMainImage } from "@/admin-shared/api";

export const useDeleteMainImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteMainImage"],
    mutationFn: (fileId: string) => deleteWorkDirectionMainImage(fileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["directionData"] });
    },
  });
};
