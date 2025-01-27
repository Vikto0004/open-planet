export type allowedSections =
  | "title"
  | "paragraph"
  | "subtitle"
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

export type DirectionCard = {
  _id: string;
  cardTitle: string;
  workDirectionsType: string[];
};

export interface IWorkDirectionUpdateRequest {
  isPosted: boolean;
  cardTitle: string;
  mainImg: string;
  workDirectionsType: string[];
  images: string[];
  budgetsCards: {
    title: string;
    amount: number;
  }[];
}

export interface IWorkDirectionCard {
  _id: string;
  projectId?: string;
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
