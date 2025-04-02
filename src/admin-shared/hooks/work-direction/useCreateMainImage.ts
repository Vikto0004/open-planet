import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createWorkDirectionMainImage } from "@/admin-shared/api";

export const useCreateMainImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createMainImage"],
    mutationFn: async (req: { _id: string; formData: FormData }) => {
      console.log("Запит на створення основного зображення:", req);
      try {
        const response = await createWorkDirectionMainImage(req);
        console.log("Успішна відповідь від сервера:", response);
        return response;
      } catch (error) {
        console.error("Помилка при створенні основного зображення:", error);
        throw error;
      }
    },
    onSuccess: () => {
      console.log("Запит успішний! Оновлення кешу...");
      queryClient.invalidateQueries({ queryKey: ["directionData"] });
    },
    onError: (error) => {
      console.error("Помилка у мутації:", error);
    },
  });
};
