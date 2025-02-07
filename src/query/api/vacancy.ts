import axios from "axios";

import { LangType } from "@/i18n/routing";

import { Project, ProjectsPaginated } from "../types/projects";
import { Node } from "../types/public-offer";
import { Vacancy, VacancyPut } from "../types/vacancy";

const domain = process.env.NEXT_PUBLIC_DOMAIN || "https://openplanetua.org/";

export async function getLatestVacancy(
  limit: number = 6,
  lang: LangType,
): Promise<Project[]> {
  const response = await axios.get(
    `${domain}/api/${lang}/vacancy?page=1&limit=${limit}`,
  );
  return response.data;
}

export async function getVacancyPaginated(
  page: number,
  limit: number = 3,
  lang: LangType,
): Promise<ProjectsPaginated> {
  return axios.get(`${domain}/api/${lang}/vacancy?page=${page}&limit=${limit}`);
}

export async function getVacancyById(vacancyId: string): Promise<Vacancy> {
  return (
    await axios.get(`${domain}/api/ua/vacancy/${vacancyId}`, {
      headers: { "Cache-Control": "max-age=0, s-maxage=60" },
    })
  ).data.response;
}

export async function putVacancyBlock(
  vacancyId: string,
  blockId: string,
  data: Node[],
): Promise<VacancyPut> {
  return axios.put(`${domain}/api/ua/vacancy/${vacancyId}/${blockId}`, data);
}

export async function postVacancyBlock(vacancyId: string) {
  return axios.post(`${domain}/api/ua/vacancy/${vacancyId}`);
}

export async function deleteVacancyBlock(vacancyId: string, blockId: string) {
  return axios.delete(`${domain}/api/ua/vacancy/${vacancyId}/${blockId}`);
}
