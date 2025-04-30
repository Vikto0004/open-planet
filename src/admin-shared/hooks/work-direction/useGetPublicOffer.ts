import { useQuery } from "@tanstack/react-query";

import { getPolicy } from "@/admin-shared/api";
import { LangType } from "@/i18n/routing";

export const useGetPolicy = (lang?: LangType) => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["privacyPolicy"],
    queryFn: () => getPolicy(lang),
    refetchOnMount: true,
    staleTime: 1000 * 60 * 5,
  });

  return { data: data?.policyRes?.[0], isPending, isError, error, refetch };
};
