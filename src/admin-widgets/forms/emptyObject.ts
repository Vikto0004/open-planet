import { IWorkDirectionUpdateRequest } from "@/admin-shared/model/interfaces/workDirectionInterfaces";

export const emptyObject: IWorkDirectionUpdateRequest = {
  isPosted: false,
  cardTitle: "",
  mainImg: "",
  workDirectionsType: [""],
  images: [],
  budgetsCards: [
    {
      title: "",
      amount: 0,
    },
  ],
};
