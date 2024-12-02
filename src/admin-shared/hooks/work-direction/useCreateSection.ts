import { useUpdateDirection } from "@/admin-shared/hooks";
import { IWorkDirection } from "@/admin-shared/model/interfaces/workDirectionInterfaces";
export const useCreateSection = (type: "paragraph" | "title" | "subtitle" | "budgetCards" | "imageList", data: IWorkDirection) => {
  const section = {
    sectionType: type,
    content: type === "imageList" ? [""] : type === "budgetCards" ? [{}] : ""
  };
}