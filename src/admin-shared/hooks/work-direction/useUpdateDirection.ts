import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateWorkDirection } from "@/admin-shared/api";
import { IWorkDirectionUpdateRequest } from "@/admin-shared/model/interfaces/workDirectionInterfaces";

export const useUpdateDirection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateDirection"],
    mutationFn: (req: { id: string; data: IWorkDirectionUpdateRequest }) =>
      updateWorkDirection(req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["directionCards"] });
    },
  });
};
