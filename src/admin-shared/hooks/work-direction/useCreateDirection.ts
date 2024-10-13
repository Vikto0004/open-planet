import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createWorkDirection } from "@/admin-shared/api";

export const useCreateDirection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createDirection"],
    mutationFn: (language: "uk" | "en") => createWorkDirection(language),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["directionCards"] });
    },
  });
};
