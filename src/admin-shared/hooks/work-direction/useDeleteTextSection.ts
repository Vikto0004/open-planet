import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteTextSection } from "@/admin-shared/api/work-direction/api-service";

export const useDeleteTextSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteSection"],
    mutationFn: async (req: { projectId: string; sectionId: string }) => {
      try {
        const response = await deleteTextSection(req);
        return response;
      } catch (error) {
        throw new Error("Failed to delete section. Please try again.");
      }
    },
    onSuccess: async () => {
      try {
        await queryClient.invalidateQueries({ queryKey: ["directionData"] });
      } catch (error) {
        console.error("Error invalidating query:", error);
      }
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
    },
  });
};
