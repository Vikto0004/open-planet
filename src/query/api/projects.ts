import axios from "axios";

import { LangType } from "@/i18n/routing";

import { Project, ProjectsPaginated } from "../types/projects";

const domain = process.env.NEXT_PUBLIC_DOMAIN || "https://openplanetua.org/";

export async function getLatestProjects(
  limit: number = 6,
  lang: LangType,
): Promise<Project[]> {
  console.log("Domain:", domain);
  const response = await axios.get(
    `${domain}/api/${lang}/projects?page=1&limit=${limit}&type=all`,
  );
  return response.data.workDirections;
}

export async function getProjectsPaginated(
  page: number,
  limit: number = 3,
  lang: LangType,
  type: string,
): Promise<ProjectsPaginated> {
  return axios.get(
    `${domain}/api/${lang}/projects?page=${page}&limit=${limit}&type=${type}`,
  );
}

export async function getProjectById(projectId: string): Promise<Project> {
  return (
    await axios.get(`${domain}/api/projects/${projectId}`, {
      headers: { "Cache-Control": "max-age=0, s-maxage=60" },
    })
  ).data.response;
}
