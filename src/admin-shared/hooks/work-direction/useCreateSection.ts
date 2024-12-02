import { useMutation } from "@tanstack/react-query";

import { createWorkDirectionSection } from "@/admin-shared/api/work-direction/api-service";
import { allowedSections } from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import { useQueryClient } from "@tanstack/react-query";
export const useCreateSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createSection"],
    mutationFn: (req: { projectId: string; type: allowedSections }) =>
      createWorkDirectionSection(req),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["directionData"] });
    }
  });
};
