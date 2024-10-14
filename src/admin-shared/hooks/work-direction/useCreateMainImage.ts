import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createWorkDirectionMainImage } from "@/admin-shared/api";
import { IWorkDirectionImages } from "@/admin-shared/model/interfaces/workDirectionInterfaces";

export const useCreateMainImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createMainImage"],
    mutationFn: (req: { id: string; formData: FormData }) =>
      createWorkDirectionMainImage(req),
    onSuccess: (data: IWorkDirectionImages) => {
      queryClient.setQueryData(["directionData"], data);
    },
  });
};
