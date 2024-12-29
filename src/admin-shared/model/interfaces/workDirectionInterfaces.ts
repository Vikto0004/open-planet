export interface Section {
  id: string;
  type: "title" | "paragraph" | "list" | "budgetCards" | "imageList";
  content: string | string[] | BudgetCard[];
}

export interface BudgetCard {
  id: string;
  title: string;
  amount: number;
}

export interface WorkDirection {
  cardTitle: string;
  mainImg: string;
  sections: Section[];
}

export interface IWorkDirection {
  id: string;
  ua: WorkDirection;
  en: WorkDirection;
  workDirectionsType: "medicine" | "electric" | "education" | "restoration";
  isPosted: boolean;
  response?: string;
}

export interface IWorkDirectionImages {
  id: string;
  url: string;
  altText?: string;
  title?: string;
}

export type allowedSections =
  | "title"
  | "subtitle"
  | "paragraph"
  | "budgetCards"
  | "imageList";

export type allowedTypes =
  | "medicine"
  | "electric"
  | "education"
  | "restoration"
  | "culture";

export interface ICreateWorkDirection {
  ua: {
    cardTitle: string;
  };
  en: {
    cardTitle: string;
  };
  workDirectionsType: allowedTypes[];
}

export interface IMutateProps {
  id: string;
  formData: FormData;
}

export interface ITexts {
  title: string;
  text: string;
  _id: string;
}

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
export interface IWorkDirections {
  workDirections: IWorkDirection[];
}

export interface CardsListProps {
  data: IWorkDirectionCards;
}

export interface IWorkDirectionCard {
  updatedAt: string;
  workDirectionsType: allowedTypes[];
  createdAt: string;
  _id: string;
  ua: {
    cardTitle: string;
  };
  en: {
    cardTitle: string;
  };
}

export interface IWorkDirectionCards {
  workDirections: IWorkDirectionCard[];
}
