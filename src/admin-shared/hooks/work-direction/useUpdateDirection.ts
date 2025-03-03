import { useMutation, useQueryClient } from "@tanstack/react-query";
import yup from "yup";

import { updateWorkDirection } from "@/admin-shared/api";
import { editFormSchema } from "@/admin-shared/model/schemas/workDirectionYupSchemas";

export const useUpdateDirection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateDirection"],
    mutationFn: (req: yup.InferType<typeof editFormSchema>) => {
      console.log("Отримані дані для оновлення: ", req);

      const fixedReq = {
        ...req,
        ua: {
          ...req.ua,
          sections:
            req.ua?.sections?.map((section) => ({
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
          ...req.en,
          sections:
            req.en?.sections?.map((section) => ({
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

      console.log("Виправлені дані для оновлення: ", fixedReq);
      return updateWorkDirection(fixedReq);
    },
    onSuccess: () => {
      console.log("Оновлення секції успішне");
      queryClient.invalidateQueries({ queryKey: ["directionCards"] });
    },
    onError: (error) => {
      console.error("Помилка при оновленні секції: ", error);
    },
  });
};
