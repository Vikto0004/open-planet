import { Node } from "./public-offer";

type LocalizedData = {
  title: string;
  employment: string;
  region: string;
  description: Node[];
};

export type Vacancy = {
  id: string;
  ua: LocalizedData;
  en: LocalizedData;
  createdAt: string;
  updatedAt: string;
};
