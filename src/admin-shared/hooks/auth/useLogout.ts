import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { logout } from "../../api";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: () => logout(),
    onSuccess: async () => {
      queryClient.resetQueries({ queryKey: ["user"], exact: true });
      await router.push("/admin/login");
      window.location.reload();
    },
  });
};
