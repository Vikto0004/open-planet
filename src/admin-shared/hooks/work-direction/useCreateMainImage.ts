import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createWorkDirectionMainImage } from "@/admin-shared/api";

export const useCreateMainImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createMainImage"],
    mutationFn: (req: { id: string; formData: FormData }) =>
      createWorkDirectionMainImage(req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["directionData"] });
    },
  });
};
