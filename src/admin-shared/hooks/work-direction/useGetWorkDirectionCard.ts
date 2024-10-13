import { useQuery } from "@tanstack/react-query";

import { getWorkDirectionCard } from "@/admin-shared/api/work-direction/api-service";

export const useGetWorkDirectionCard = (id: string, enabled = false) => {
  const { data, isPending, isError, error, isSuccess } = useQuery({
    queryKey: ["directionData"],
    queryFn: () => getWorkDirectionCard(id),
    enabled: enabled,
    refetchOnMount: true,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isPending, isError, error, isSuccess };
};
