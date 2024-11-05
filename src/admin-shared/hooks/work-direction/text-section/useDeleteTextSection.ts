import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteTextSection } from "@/admin-shared/api/work-direction/text-section/api-service";

export const useDeleteTextSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteTextSection"],
    mutationFn: (req: { cardId: string; sectionId: string }) =>
      deleteTextSection(req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["directionData"] });
    },
  });
};
