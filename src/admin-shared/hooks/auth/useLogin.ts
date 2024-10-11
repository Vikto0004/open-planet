import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import * as yup from "yup";

import { LoginSchema } from "@/admin-shared/model/schemas/authYupSchemas";

import { login } from "../../api";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: (user: yup.InferType<typeof LoginSchema>) => login(user),
    onSuccess: async () => {
      router.push("/admin");
    },
  });
};
