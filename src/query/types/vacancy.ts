import { Node } from "./public-offer";

export type VacancyData = {
  title: string;
  employment: string;
  region: string;
  description: Node[];
};

export type Vacancy = {
  id: string;
  ua: VacancyData;
  en: VacancyData;
  createdAt: string;
  updatedAt: string;
};

export type VacancyPut = {
  id: string;
  ua?: VacancyData;
  en?: VacancyData;
  isPosted: boolean;
  createdAt: string;
  updatedAt: string;
};
