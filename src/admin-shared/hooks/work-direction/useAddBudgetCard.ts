import { useMutation, useQueryClient } from "@tanstack/react-query";


import { addBudgetCard } from "@/admin-shared/api";

export const useAddBudgetCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addBudgetCard"],
    mutationFn: (req: { projectId: string; sectionId: string; }) => addBudgetCard(req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["directionData"] });
    },
  });
};
