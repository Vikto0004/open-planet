export interface ICard {
  _id: string;
  title: string;
  amount: number;
}

export interface ITexts {
  _id: string;
  title: string;
  text: string;
}

export interface IMutateProps {
  id: string;
  formData: FormData;
}

export interface IWorkDirection {
  response: {
    language: "uk" | "en";
    isPosted: boolean;
    cardTitle: string;
    mainImg: string;
    sectionText: [] | ITexts[];
    workDirectionsType: string[];
    images: [] | string[];
    _id: string;
    budgetsCards: ICard[];
    createdAt: string;
    updatedAt: string;
  };
}

export type IWorkDirectionUpdateRequest = Omit<
  IWorkDirection["response"],
  | "createdAt"
  | "updatedAt"
  | "_id"
  | "language"
  | "budgetsCards"
  | "sectionText"
> & {
  budgetsCards: Omit<ICard, "_id">[];
};

export type IWorkDirectionCard = {
  cardTitle: string;
} & Pick<
  IWorkDirection["response"],
  "language" | "mainImg" | "createdAt" | "updatedAt" | "_id"
>;

export interface IWorkDirectionCards {
  totalWorkDirections: number;
  workDirections: IWorkDirectionCard[];
}

export interface IWorkDirectionImages {
  result: IWorkDirection["response"];
}
