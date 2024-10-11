import { IWorkDirectionUpdateRequest } from "@/admin-shared/model/interfaces/workDirectionInterfaces";
// need for first form

export const emptyObject: IWorkDirectionUpdateRequest = {
  isPosted: false,
  cardTitle: "",
  mainImg: "",
  firstTitle: "",
  firstDescription: "",
  secondTitle: "",
  secondDescription: "",
  subtitleFirst: "",
  thirdTitle: "",
  thirdDescription: "",
  fourthTitle: "",
  fourthDescription: "",
  fifthTitle: "",
  fifthDescription: "",
  sixthTitle: "",
  sixthDescription: "",
  seventhTitle: "",
  seventhDescription: "",
  eighthTitle: "",
  eighthDescription: "",
  ninthTitle: "",
  ninthDescription: "",
  tenthTitle: "",
  proposeText: "",
  subtitleSecond: "",
  workDirectionsType: [""],
  images: [],
  budgetsCards: [
    {
      title: "",
      amount: 0,
    },
  ],
};