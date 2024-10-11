import { useQuery } from "@tanstack/react-query";

import { getUser } from "../../api";

export const useGetUser = (enabled = false) => {
  const { data, isPending: isLoading, error, isError, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
    enabled: enabled,
    refetchOnMount: true,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, error, isError, isSuccess };
};
