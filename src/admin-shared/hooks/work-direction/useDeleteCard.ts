import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteWorkDirectionCard } from "@/admin-shared/api";
import { Notification } from "@/admin-widgets/Notification/notification";

export const useDeleteCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteCard"],
    mutationFn: (id: string) => deleteWorkDirectionCard(id),
    onSuccess: async (data: { message: string }) => {
      await queryClient.invalidateQueries({ queryKey: ["directionCards"] });
      Notification({ message: data.message, type: "success" });
    },
  });
};
