import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createWorkDirection } from "@/admin-shared/api";
import { ICreateWorkDirection } from "@/admin-shared/model/interfaces/workDirectionInterfaces";

export const useCreateDirection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createDirection"],
    mutationFn: (payload: ICreateWorkDirection) => createWorkDirection(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["directionCards"] });
    },
  });
};
