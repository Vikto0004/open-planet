import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createWorkDirectionSection } from "@/admin-shared/api";
import { allowedSections } from "@/admin-shared/model/interfaces/workDirectionInterfaces";

export const useCreateSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createSection"],
    mutationFn: (req: {
      projectId: string;
      type: allowedSections;
      content: any;
    }) => createWorkDirectionSection(req),
    onSuccess: async (data) => {
      console.log("Секція успішно створена:", data);
      await queryClient.invalidateQueries({ queryKey: ["directionData"] });
    },
    onError: (error: unknown) => {
      console.error("Помилка створення секції:", error);
    },
  });
};
