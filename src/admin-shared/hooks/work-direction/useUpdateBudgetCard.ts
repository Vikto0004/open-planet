import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";

import { updateBudgetCard } from "@/admin-shared/api";
import { editFormSchema } from "@/admin-shared/model/schemas/workDirectionYupSchemas";

export const useUpdateBudgetCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateBudgetCard"],
    mutationFn: ({
      projectId,
      sectionId,
      budgetCardId,
      updatedData,
    }: {
      projectId: string;
      sectionId: string;
      budgetCardId: string;
      updatedData: Yup.InferType<typeof editFormSchema>;
    }) => updateBudgetCard(projectId, sectionId, budgetCardId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgetCards"] });
    },
  });
};
