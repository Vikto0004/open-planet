import { useGetUser } from "@/admin-shared/hooks/useGetUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { QueryClient } from "@tanstack/react-query";

const useCheckAuth = () => {
  const { isPending, isSuccess, isError, data } = useGetUser(true);
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      router.push("/admin");
    }

    if (isError) {
      router.push("/admin/login");
    }
  }, [isSuccess, isError, router]);

  return { isPending, data, isError };
};

export { useCheckAuth };
