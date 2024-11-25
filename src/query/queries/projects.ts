import { useQuery } from "@tanstack/react-query";

import { LangType } from "@/i18n/routing";

import { getProjectById, getProjectsPaginated } from "../api/projects";

type PaginatedOptions = {
  page: number;
  limit: number;
  lang: LangType;
  type: string;
};

export function useProjectsPaginated(options: PaginatedOptions) {
  const { page, limit, lang, type } = options;

  const query = useQuery({
    queryKey: ["projectsPaginated", page, limit, lang, type],
    queryFn: () => getProjectsPaginated(page, limit, lang, type),
    select: (data) => data.data,
  });

  return query;
}

// export function useProjectById(id: string) {
//   const query = useQuery({
//     queryKey: ["projectById"],
//     queryFn: () => getProjectById(id),
//     select: (data) => data.response,
//   });

//   return query;
// }

// export function useProjectTitle(id: string, lang: LangType) {
//   const query = useQuery({
//     queryKey: ["projectById"],
//     queryFn: () => getProjectById(id),
//     select: (data) => data.response[lang].cardTitle,
//   });

//   return query;
// }
