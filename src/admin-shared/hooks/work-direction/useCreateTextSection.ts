import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTextSection } from "@/admin-shared/api/work-direction/api-service";

export const useCreateTextSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createSection"],
    mutationFn: async (req: {
      projectId: string;
      sectionId: string;
      text: string;
    }) => {
      try {
        const response = await createTextSection(req);
        return response;
      } catch (error) {
        throw new Error("Failed to create section. Please try again.");
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
