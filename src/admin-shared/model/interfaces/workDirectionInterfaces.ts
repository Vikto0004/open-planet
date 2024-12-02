// export interface ICard {
//   _id: string;
//   title: string;
//   amount: number;
// }

import * as Yup from "yup";

export interface Section {
  id: string;
  type: "title" | "paragraph" | "list" | "budgetCards" | "imageList";
  content: string | string[] | BudgetCard[];
}

export interface BudgetCard {
  _id: string;
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
  workDirectionsType:
    | "medicine"
    | "electric"
    | "education"
    | "restoration"
    | "culture";
  isPosted: boolean;
}


export type allowedSections = "title" | "subtitle" | "paragraph" | "budgetCards" | "imageList"

export type allowedTypes = "medicine" | "electric" | "education" | "restoration";

export interface ICreateWorkDirection {
  ua: {
    cardTitle: string;
  };
  en: {
    cardTitle: string;
  };
  workDirectionsType: allowedTypes[];
}

// export interface ITexts {
//   _id: string;
//   title: string;
//   text: string;
// }

export interface IMutateProps {
  id: string;
  formData: FormData;
}

// export type IWorkDirectionUpdateRequest = Omit<
//   IWorkDirection["response"],
//   | "createdAt"
//   | "updatedAt"
//   | "_id"
//   | "language"
//   | "budgetsCards"
//   | "sectionText"
// > & {
//   budgetsCards: Omit<ICard, "_id">[];
// };
//
// export type IWorkDirectionCard = {
//   cardTitle: string;
// } & Pick<
//   IWorkDirection["response"],
//   "language" | "mainImg" | "createdAt" | "updatedAt" | "_id"
// >;
//
// export interface IWorkDirectionCards {
//   totalWorkDirections: number;
//   workDirections: IWorkDirectionCard[];
// }
//
// export interface IWorkDirectionImages {
//   result: IWorkDirection["response"];
// }
