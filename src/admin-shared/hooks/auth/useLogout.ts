import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { logout } from "../../api";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: () => logout(),
    onSuccess: async () => {
      router.push("admin/login");
      await queryClient.resetQueries({ queryKey: ["user"], exact: true });
    },
  });
};
