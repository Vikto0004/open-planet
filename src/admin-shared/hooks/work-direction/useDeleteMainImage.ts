import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteWorkDirectionMainImage } from "@/admin-shared/api";

export const useDeleteMainImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteMainImage"],
    mutationFn: ({
      projectId,
      sectionId,
    }: {
      projectId: string;
      sectionId: string;
    }) => deleteWorkDirectionMainImage(projectId, sectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["directionData"] });
    },
  });
};
