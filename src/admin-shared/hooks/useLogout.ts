import { useQuery } from "@tanstack/react-query";
import { logout } from "../api";

export const useLogout = (
  enabled = false,
) => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["logout"],
    queryFn: () => logout(),
    enabled: enabled,
  });

  return { data, isLoading, error, isError };
};

