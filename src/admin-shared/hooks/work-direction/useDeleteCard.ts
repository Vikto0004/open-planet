import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteWorkDirectionCard } from "@/admin-shared/api";
import { Notification } from "@/admin-components/ui/notification";

export const useDeleteCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteCard"],
    mutationFn: (id: string) => deleteWorkDirectionCard(id),
    onSuccess: (data: { message: string }) => {
      queryClient.invalidateQueries({ queryKey: ["directionCards"] });
      Notification({ message: data.message, type: "success" });
    },
  });
};