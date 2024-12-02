import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateWorkDirection } from "@/admin-shared/api";
import { IWorkDirection } from "@/admin-shared/model/interfaces/workDirectionInterfaces";

export const useUpdateDirection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateDirection"],
    mutationFn: (req: IWorkDirection) =>
      updateWorkDirection({payload: req}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["directionCards"] });
    },
  });
};
