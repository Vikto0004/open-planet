export type SectionType =
  | "title"
  | "subtitle"
  | "paragraph"
  | "budgetCards"
  | "imageList";

export type Content =
  | string
  | string[]
  | {
      title: string;
      amount: string;
    };

export type LocalizedData = {
  cardTitle: string;
  mainImg: string;
  sections: {
    sectionType: SectionType;
    content: Content;
  }[];
};

export type Project = {
  _id: string;
  ua: LocalizedData;
  en: LocalizedData;
  createdAt: string;
  updatedAt: string;
};

export type ProjectById = {
  response: Project;
};

export type ProjectsPaginated = {
  data: { workDirections: Project[]; totalWorkDirections: number };
};
