import {
  BudgetCard,
  IWorkDirection,
  WorkDirection,
} from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import { langs } from "@/i18n/routing";

const isWorkDirectionLangValid = (workDirection: WorkDirection): boolean => {
  if (!workDirection.cardTitle || workDirection.cardTitle.length === 0) {
    return false;
  }
  if (!workDirection.mainImg || workDirection.mainImg.length === 0) {
    return false;
  }

  return workDirection.sections.every((el) => {
    if (el.type === "title" || el.type === "paragraph") {
      return el.content && el.content.length > 0;
    }

    if (el.type === "budgetCards") {
      const content = el.content as BudgetCard[];
      return content.every((card) => card.title.length > 0 && !Number.isNaN(Number(card.amount)));
    }
    if (el.type === "imageList") {
      const content = el.content as string[];
      return content.every((image) => image.length > 0);
    }
    return false;
  });
};

export const isWorkDirectionsValid = (workDirections: IWorkDirection) => {
  return langs.every((lang) => {
    return isWorkDirectionLangValid(workDirections[lang]);
  });
};
