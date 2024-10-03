import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as yup from "yup";

import { IUser } from "@/admin-shared/model/interfaces";
import { LoginSchema } from "@/admin-shared/model/schemas/authYupSchemas";

import { login } from "../api";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: (user: yup.InferType<typeof LoginSchema>) => login(user),
    onSuccess: async (user: IUser) => {
      queryClient.setQueryData(["user"], user);
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/admin");
    },
  });
};
