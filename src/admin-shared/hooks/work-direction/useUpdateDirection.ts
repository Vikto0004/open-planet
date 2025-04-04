import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";

import { updateWorkDirection } from "@/admin-shared/api";
import { editFormSchema } from "@/admin-shared/model/schemas/workDirectionYupSchemas";

export const useUpdateDirection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateDirection"],
    mutationFn: (
      req: { lang: "ua" | "en" } & Partial<
        Yup.InferType<typeof editFormSchema>
      >,
    ) => updateWorkDirection(req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["directionCards"] });
    },
    onError: (error) => {
      console.error("❌ Помилка при оновленні секції:", error);
    },
  });
};
