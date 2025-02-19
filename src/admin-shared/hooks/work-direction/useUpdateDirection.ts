import { useMutation, useQueryClient } from "@tanstack/react-query";
import yup from "yup";

import { updateWorkDirection } from "@/admin-shared/api";
import { editFormSchema } from "@/admin-shared/model/schemas/workDirectionYupSchemas";

export const useUpdateDirection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateDirection"],
    mutationFn: ({ projectId, data }: { projectId: string; data: yup.InferType<typeof editFormSchema> }) => {
      console.log("Отримані дані для оновлення: ", data); // Додаємо лог для перевірки даних
      return updateWorkDirection(projectId, data);
    },
    onSuccess: () => {
      console.log("Оновлення секції успішне");
      queryClient.invalidateQueries({ queryKey: ["directionCards"] });
    },
    onError: (error) => {
      console.error("Помилка при оновленні секції: ", error); // Лог помилки
    },
  });
};
