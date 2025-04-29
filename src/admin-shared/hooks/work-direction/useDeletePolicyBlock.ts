import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deletePolicyBlock } from "@/admin-shared/api";
import { polycyType } from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import { Notification } from "@/admin-widgets/Notification/notification";

export const useDeletePolicyBlock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deletePolicyBlock"],
    mutationFn: (req: { blockId: string; type: polycyType }) =>
      deletePolicyBlock(req),
    onSuccess: async (data: { message: string }) => {
      await queryClient.invalidateQueries({ queryKey: ["policy"] });
      Notification({ message: data.message, type: "success" });
    },
  });
};
