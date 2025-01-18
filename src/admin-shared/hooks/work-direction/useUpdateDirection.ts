import { useMutation, useQueryClient } from "@tanstack/react-query";
import yup from "yup";

import { updateWorkDirection } from "@/admin-shared/api";
import { editFormSchema } from "@/admin-shared/model/schemas/workDirectionYupSchemas";

export const useUpdateDirection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateDirection"],
    mutationFn: (req: yup.InferType<typeof editFormSchema>) => {
      console.log("Отримані дані для оновлення: ", req); // Додаємо лог для перевірки даних
      return updateWorkDirection(req);
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
