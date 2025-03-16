import { useQuery } from "@tanstack/react-query";

import { getPublicOffer } from "@/admin-shared/api";

export const useGetPublicOffer = () => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["publicOffer"],
    queryFn: () => getPublicOffer(),
    refetchOnMount: true,
    staleTime: 1000 * 60 * 5,
  });
  console.log(data);
  return { data, isPending, isError, error, refetch };
};
