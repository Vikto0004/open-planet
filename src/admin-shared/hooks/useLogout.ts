import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["user"], exact: true });
      router.push("/admin/login");
    },
  });
};

