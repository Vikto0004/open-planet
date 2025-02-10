import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteWorkDirectionImage } from "@/admin-shared/api";

export const useDeleteImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteImage"],
    mutationFn: (req: { id: string; imageUrl: string }) =>
      deleteWorkDirectionImage(req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["directionData"] });
    },
  });
};
