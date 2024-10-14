import { useQuery } from "@tanstack/react-query";

import { getWorkDirectionCards } from "@/admin-shared/api/work-direction/api-service";

interface IUseGetCards {
  lang: "uk" | "en";
  type?: string;
  page: number;
  limit: number;
}

export const useGetCards = (req: IUseGetCards, enabled = false) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["directionCards"],
    queryFn: () => getWorkDirectionCards(req),
    enabled: enabled,
    refetchOnMount: true,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isPending, isError, error };
};
