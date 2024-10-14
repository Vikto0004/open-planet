import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteWorkDirectionMainImage } from "@/admin-shared/api";
import { IWorkDirectionImages } from "@/admin-shared/model/interfaces/workDirectionInterfaces";

export const useDeleteMainImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteMainImage"],
    mutationFn: (id: string) => deleteWorkDirectionMainImage(id),
    onSuccess: (data: IWorkDirectionImages) => {
      queryClient.setQueryData(["directionData"], data);
    },
  });
};
