interface ICard {
  _id: {
    _id: string;
  };
  title: string;
  amount: number;
}

export interface IWorkDirection {
  response: {
    language: "uk" | "en";
    isPosted: boolean;
    cardTitle: string;
    mainImg: string;
    firstTitle: string;
    firstDescription: string;
    secondTitle: string;
    secondDescription: string;
    subtitleFirst: string;
    thirdTitle: string;
    thirdDescription: string;
    fourthTitle: string;
    fourthDescription: string;
    fifthTitle: string;
    fifthDescription: string;
    sixthTitle: string;
    sixthDescription: string;
    seventhTitle: string;
    seventhDescription: string;
    eighthTitle: string;
    eighthDescription: string;
    ninthTitle: string;
    ninthDescription: string;
    tenthTitle: string;
    proposeText: string;
    subtitleSecond: string;
    workDirectionsType: string[];
    images: string[];
    _id: string;
    budgetsCards: ICard[];
    createdAt: string;
    updatedAt: string;
  };
}

export type IGetWorkDirection = {
  workDirection: IWorkDirection["response"];
};

export type IWorkDirectionUpdateRequest = Omit<
  IWorkDirection["response"],
  "createdAt" | "updatedAt" | "_id" | "language" | "budgetsCards"
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
