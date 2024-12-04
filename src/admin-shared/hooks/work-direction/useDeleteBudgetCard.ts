import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteBudgetCard } from "@/admin-shared/api/work-direction/api-service";

export const useDeleteBudgetCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteBudgetCard"],
    mutationFn: (req: {
      projectId: string;
      sectionId: string;
      budgetCardId: string;
    }) => deleteBudgetCard(req),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["directionData"] });
    },
  });
};
