import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createWorkDirection } from "@/admin-shared/api";
import { IWorkDirection } from "@/admin-shared/model/interfaces/workDirectionInterfaces";

export const useCreateDirection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createDirection"],
    mutationFn: (language: "ua" | "en") => createWorkDirection(language),
    onSuccess: (data: IWorkDirection) => {
      queryClient.invalidateQueries({ queryKey: ["directionCards"] });
    },
  });
};
