import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import * as yup from "yup";

import { RegisterSchema } from "@/admin-shared/model/schemas/authYupSchemas";

import { register } from "../api";

export const useRegister = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["register"],
    mutationFn: (user: yup.InferType<typeof RegisterSchema>) => register(user),
    onSuccess: async () => {
      router.push("/admin/login");
    },
  });
};
