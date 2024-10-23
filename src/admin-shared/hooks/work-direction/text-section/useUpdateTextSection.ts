import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTextSecton } from "@/admin-shared/api/work-direction/text-section/api-service";
import { ITexts } from "@/admin-shared/model/interfaces/workDirectionInterfaces";

export const useUpdateTextSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateTextSection"],
    mutationFn: (req: { sectionId: string; data: Omit<ITexts, "_id"> }) =>
      updateTextSecton(req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["directionData"] });
    },
  });
};
