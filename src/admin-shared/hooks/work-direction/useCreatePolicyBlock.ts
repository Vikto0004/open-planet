import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createPolicyBlock } from "@/admin-shared/api";
import { polycyType } from "@/admin-shared/model/interfaces/workDirectionInterfaces";

export const useCreatePolicyBlock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createPolicyBlock"],
    mutationFn: (req: { blockId: string; type: polycyType }) =>
      createPolicyBlock(req),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["policy"] });
    },
    onError: (error: unknown) => {
      console.error("Помилка створення секції:", error);
    },
  });
};
