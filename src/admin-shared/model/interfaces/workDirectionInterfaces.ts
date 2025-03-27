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
export interface SectionType {
  id: string;
  sectionType: allowedSections;
  budgetCardId: string;
  content?:
    | string
    | { title: string; _id: string; amount: number }[]
    | string[]
    | null;
  amount: number;
}

export interface WorkDirection {
  projectId: string;
  cardTitle: string;
  mainImg: string;
  response: IWorkDirectionCard;
  sections: SectionType[];
  type: allowedSections;
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
  title: string;
  projectId: string;
  sectionId: string;
  budgetCardId: string;
  amount: number;
  sectionType: allowedSections;
  workDirectionsType: allowedTypes[];
  isPosted: boolean;
  createdAt: string;
  updatedAt: string;
  ua: WorkDirection;
  en: WorkDirection;
}

export interface ITexts {
  title: string;
  text: string;
  _id: string;
}

export interface IWorkDirectionImages {
  id: string;
  result: {
    images: string[];
  };
  url: string;
}

export interface IWorkDirectionCards {
  totalWorkDirections: number;
  workDirections: IWorkDirectionCard[];
}

/* policy */

export interface IPolicyBlock {
  id?: string;
  tag: string;
  className?: string;
  style?: string;
  content?: string;
  href?: string;
  children?: IPolicyBlock[];
}

export interface IPolicyInfo {
  id?: string;
  tag: string;
  className?: string;
  children: IPolicyBlock[];
}

export interface IPolicyByLang {
  title: string;
  subtitle?: string;
  blocks: IPolicyInfo[];
}

export interface IPolicy {
  _id?: string;
  type: string;
  ua: IPolicyByLang;
  en: IPolicyByLang;
}

export interface IPolices {
  policyRes: IPolicy[];
}
