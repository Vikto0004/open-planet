import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createWorkDirectionSection } from "@/admin-shared/api";
import { allowedSections } from "@/admin-shared/model/interfaces/workDirectionInterfaces";

export const useCreateSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createSection"],
    mutationFn: async (req: { projectId: string; type: allowedSections }) => {
      // Перевірка наявності projectId
      if (!req.projectId) {
        throw new Error("Не передано projectId для створення секції!");
      }

      // Перевірка, чи type є допустимим
      if (!req.type) {
        throw new Error("Не передано тип секції!");
      }

      console.log("Відправлення запиту на створення секції:", req);

      try {
        const response = await createWorkDirectionSection(req);
        console.log("Секція успішно створена:", response);
        return response;
      } catch (error) {
        console.error("Помилка при створенні секції:", error);
        throw error;
      }
    },
    onSuccess: async (data) => {
      console.log("Оновлення кешу після створення секції...");
      await queryClient.invalidateQueries({ queryKey: ["directionData"] });
    },
    onError: (error) => {
      console.error("Помилка у useCreateSection:", error);
    },
  });
};
