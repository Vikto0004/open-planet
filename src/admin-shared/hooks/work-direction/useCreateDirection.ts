import { useMutation, useQueryClient } from "@tanstack/react-query";
import yup from "yup";

import { createWorkDirection } from "@/admin-shared/api";
import { firstFormSchema } from "@/admin-shared/model/schemas/workDirectionYupSchemas";

export const useCreateDirection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createDirection"],
    mutationFn: (payload: yup.InferType<typeof firstFormSchema>) =>
      createWorkDirection(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["directionCards"] });
    },
  });
};
