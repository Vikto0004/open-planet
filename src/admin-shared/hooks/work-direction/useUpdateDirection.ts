import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateWorkDirection } from "@/admin-shared/api";
import yup from "yup";
import { editFormSchema } from "@/admin-shared/model/schemas/workDirectionYupSchemas";

export const useUpdateDirection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateDirection"],
    mutationFn: (req: yup.InferType<typeof editFormSchema>) =>
      updateWorkDirection(req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["directionCards"] });
    },
  });
};
