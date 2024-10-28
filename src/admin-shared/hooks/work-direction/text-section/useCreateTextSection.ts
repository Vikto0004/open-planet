import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTextSection } from "@/admin-shared/api/work-direction/text-section/api-service";

export const useCreateTextSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createTextSection"],
    mutationFn: (cardId: string) => createTextSection(cardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["directionData"] });
    },
  });
};
