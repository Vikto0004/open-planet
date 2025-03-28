import * as Yup from "yup";

import { BudgetCard } from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import { editFormSchema } from "@/admin-shared/model/schemas/workDirectionYupSchemas";
import { langs } from "@/i18n/routing";

const isWorkDirectionLangValid = (
  workDirection: Yup.InferType<typeof editFormSchema>["en" | "ua"],
): boolean => {
  if (!workDirection.cardTitle || workDirection.cardTitle.length === 0) {
    return false;
  }
  if (!workDirection.mainImg || workDirection.mainImg.length === 0) {
    return false;
  }

  if (workDirection.sections) {
    return workDirection.sections.every((el) => {
      if (el.sectionType === "title" || el.sectionType === "paragraph") {
        return typeof el.content === "string" && el.content.length > 0;
      }

      if (el.sectionType === "budgetCards") {
        const content = el.content as BudgetCard[];
        return content.every(
          (card) => card.title.length > 0 && !Number.isNaN(Number(card.amount)),
        );
      }

      if (el.sectionType === "imageList") {
        const content = el.content as string[];
        return content.every((image) => image.length > 0);
      }

      return false;
    });
  }

  return false;
};

export const isWorkDirectionsValid = (
  workDirections: Yup.InferType<typeof editFormSchema>,
) => {
  return langs.every((lang) => {
    return isWorkDirectionLangValid(workDirections[lang]);
  });
};

export const checkFormIsValid = (values: (string | undefined)[]): boolean => {
  return values.every((value) => value !== undefined && value.trim() !== "");
};
