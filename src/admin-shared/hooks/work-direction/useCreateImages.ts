import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createWorkDirectionImages } from "@/admin-shared/api";

export const useCreateImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createImages"],
    mutationFn: (req: { _id: string; id: string; formData: FormData }) =>
      createWorkDirectionImages(req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["directionData"] });
    },
    onError: (error) => {
      console.error("Image upload failed:", error);
    },
  });
};
