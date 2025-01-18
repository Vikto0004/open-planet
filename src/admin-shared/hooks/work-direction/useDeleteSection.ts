import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteWorkDirectionSection } from "@/admin-shared/api";

export const useDeleteSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteSection"],
    mutationFn: (req: { projectId: string; sectionId: string }) =>
      deleteWorkDirectionSection(req),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["directionData"] });
    },
  });
};
