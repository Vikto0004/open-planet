import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createWorkDirectionImages } from "@/admin-shared/api/work-direction/api-service";

export const useCreateImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createImages"],
    mutationFn: (req: { id: string; formData: FormData }) =>
      createWorkDirectionImages(req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["directionData"] });
    },
  });
};