import axios from "axios";

import { LangType } from "@/i18n/routing";

import { Project, SectionType } from "../types/projects";

const domain = process.env.NEXT_PUBLIC_DOMAIN;

export async function getLatestProjects(
  limit: number = 6,
  lang: LangType,
): Promise<Project[]> {
  const response = await axios.get(
    `${domain}/api/${lang}/projects?page=1&limit=${limit}&type=education`,
  );
  return response.data;
}

export async function getProjectsPaginated(
  page: number,
  limit: number = 3,
  lang: LangType,
  type: SectionType,
): Promise<Project[]> {
  const response = await axios.get(
    `${domain}/api/${lang}/projects?page=${page}&limit=${limit}&type=${type}`,
  );
  return response.data;
}

export async function getProjectById(projectId: string): Promise<Project> {
  const response = await axios.get(`${domain}/api/projects/${projectId}`);
  return response.data;
}
