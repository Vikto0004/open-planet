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

export interface IMutateProps {
  id: string;
  formData: FormData;
}
