import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteBudgetCard } from "@/admin-shared/api";

export const useDeleteBudgetCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteBudgetCard"],
    mutationFn: (req: { budgetCardId: string }) => deleteBudgetCard(req),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["directionData"] });
    },
  });
};
