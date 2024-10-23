import axios from "axios";

import {
  ITexts,
  IWorkDirection,
} from "@/admin-shared/model/interfaces/workDirectionInterfaces";

export const createTextSection = async (
  cardId: string,
): Promise<IWorkDirection> => {
  const response = await axios.post(`/work-direction/${cardId}`);
  return response.data;
};

export const updateTextSecton = async (req: {
  sectionId: string;
  data: Omit<ITexts, "_id">;
}): Promise<ITexts> => {
  const response = await axios.put(`/textSection/${req.sectionId}`);
  return response.data;
};

export const deleteTextSection = async (req: {
  cardId: string;
  sectionId: string;
}): Promise<IWorkDirection> => {
  const response = await axios.delete(
    `/work-direction/${req.cardId}/${req.sectionId}`,
  );
  return response.data;
};
