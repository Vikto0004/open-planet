import { Node } from "./public-offer";

export type TendersData = {
  title: string;
  relevant: string;
  description: Node[];
};

export type Tenders = {
  _id: string;
  ua: TendersData;
  en: TendersData;
  createdAt: string;
  updatedAt: string;
};

export type TendersPaginated = {
  tenders: Tenders[];
  totalTenders: number;
};
