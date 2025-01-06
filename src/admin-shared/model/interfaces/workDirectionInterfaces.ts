export type allowedSections =
  | "title"
  | "paragraph"
  | "list"
  | "budgetCards"
  | "imageList";

export type allowedTypes =
  | "medicine"
  | "electric"
  | "education"
  | "restoration"
  | "culture";

export interface BudgetCard {
  id: string;
  title: string;
  amount: number;
}

export interface Section {
  id: string;
  sectionType: NonNullable<allowedSections>;
  type: allowedSections;
  content: string | string[] | BudgetCard[];
}

export interface WorkDirection {
  cardTitle: string;
  mainImg: string;
  sections: Section[];
}

export interface IWorkDirectionCard {
  _id: string;
  workDirectionsType: allowedTypes[];
  isPosted: boolean;
  createdAt: string;
  updatedAt: string;
  ua: WorkDirection;
  en: WorkDirection;
}

export interface IWorkDirectionCards {
  workDirections: IWorkDirectionCard[];
}
