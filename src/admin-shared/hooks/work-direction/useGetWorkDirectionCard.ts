import { useQuery } from "@tanstack/react-query";

import { getWorkDirectionCard } from "@/admin-shared/api";

export const useGetWorkDirectionCard = (id: string, enabled = false) => {
  const { data, isPending, isError, error, isSuccess, refetch, isFetching } =
    useQuery({
      queryKey: ["directionData"],
      queryFn: () => getWorkDirectionCard(id),
      enabled: enabled,
      refetchOnMount: true,
      staleTime: 1000 * 60 * 5,
    });

  return { data, isPending, isError, error, isSuccess, refetch, isFetching };
};
