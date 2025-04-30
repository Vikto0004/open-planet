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
export type polycyType = "publicOffer" | "privacyPolicy";

export interface IPolicyBlock {
  id: string;
  tag: string;
  className?: string;
  style?: string;
  content?: string;
  href?: string;
  children?: IPolicyBlock[];
}

export interface IPolicyInfo {
  id: string;
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
  _id: string;
  type: polycyType;
  ua: IPolicyByLang;
  en: IPolicyByLang;
}

export interface IPolices {
  policyRes: IPolicy[];
}

//

export enum TagsClasses {
  a = "editor-link",
  p = "editor-paragraph",
  h1 = "editor-heading-primary",
  h2 = "editor-heading-secondary",
  h3 = "editor-heading-tertiary",
  ul = "editor-unnumbered-list",
  ol = "editor-numbered-list",
  linkN = "editor-numbered-item",
  linkUN = "editor-unnumbered-item",
  bold = "editor-text-bold",
  i = "editor-text-italic",
  under = "editor-text-underline",
  upper = "editor-text-uppercase",
}
