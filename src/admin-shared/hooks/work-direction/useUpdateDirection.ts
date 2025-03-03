import { useMutation, useQueryClient } from "@tanstack/react-query";
import yup from "yup";

import { updateWorkDirection } from "@/admin-shared/api";
import { editFormSchema } from "@/admin-shared/model/schemas/workDirectionYupSchemas";

export const useUpdateDirection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateDirection"],
    mutationFn: ({
      projectId,
      data,
    }: {
      projectId: string;
      data: yup.InferType<typeof editFormSchema>;
    }) => {
      console.log("Отримані дані для оновлення: ", data);

      const fixedData = {
        ...data,
        ua: {
          ...data.ua,
          sections:
            data.ua?.sections?.map((section) => ({
              ...section,
              content:
                section.sectionType === "paragraph"
                  ? Array.isArray(section.content)
                    ? section.content
                    : section.content !== undefined && section.content !== null
                      ? [section.content]
                      : []
                  : section.content,
            })) || [],
        },
        en: {
          ...data.en,
          sections:
            data.en?.sections?.map((section) => ({
              ...section,
              content:
                section.sectionType === "paragraph"
                  ? Array.isArray(section.content)
                    ? section.content
                    : section.content !== undefined && section.content !== null
                      ? [section.content]
                      : []
                  : section.content,
            })) || [],
        },
      };

      console.log("Виправлені дані для оновлення: ", fixedData);
      return updateWorkDirection(projectId, fixedData);
    },
    onSuccess: () => {
      console.log("✅ Оновлення секції успішне");
      queryClient.invalidateQueries({ queryKey: ["directionCards"] });
    },
    onError: (error) => {
      console.error("❌ Помилка при оновленні секції: ", error);
    },
  });
};
