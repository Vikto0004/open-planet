import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addBudgetCard } from "@/admin-shared/api";

export const useAddBudgetCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addBudgetCard"],
    mutationFn: (updatedData: { projectId: string; sectionId: string }) =>
      addBudgetCard(updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["directionData"] });
    },
  });
};
