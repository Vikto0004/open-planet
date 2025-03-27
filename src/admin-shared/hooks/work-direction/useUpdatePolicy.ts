import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";

import { updatePolicy } from "@/admin-shared/api";
import { policySchema } from "@/admin-shared/model/schemas/workDirectionYupSchemas";

export const useUpdatePolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updatePolicy"],
    mutationFn: ({ req }: { req: Yup.InferType<typeof policySchema> }) =>
      updatePolicy(req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["policy"] });
    },
  });
};
