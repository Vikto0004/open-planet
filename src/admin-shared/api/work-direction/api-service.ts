import axios from "axios";

import {
  IWorkDirection,
  IWorkDirectionUpdateRequest,
  IWorkDirectionImages,
  IWorkDirectionCards, IGetWorkDirection,
} from "@/admin-shared/model/interfaces/workDirectionInterfaces";


export const createWorkDirection = async (
  language: "ua" | "en",
): Promise<IWorkDirection> => {
  const body = {
    language,
  };
  const response = await axios.post("/work-direction", body);
  return response.data;
};

export const updateWorkDirection = async (req: {
  id: string;
  data: IWorkDirectionUpdateRequest;
}): Promise<{ message: string }> => {
  const response = await axios.put(`/work-direction/${req.id}`, req.data);
  return response.data;
};

export const createWorkDirectionMainImage = async (req: {
  id: string;
  formData: FormData;
}): Promise<IWorkDirectionImages> => {
  const response = await axios.post(
    `/work-direction/img/${req.id}`,
    req.formData,
  );
  return response.data;
};

export const deleteWorkDirectionMainImage = async (
  id: string,
): Promise<IWorkDirectionImages> => {
  const response = await axios.delete(`/work-direction/img/${id}`);
  return response.data;
};

export const getWorkDirectionCard = async (
  id: string,
): Promise<IGetWorkDirection> => {
  const response = await axios.get(`/work-direction/${id}`);
  return response.data;
};

export const deleteWorkDirectionCard = async (id: string): Promise<{ message: string }> => {
  const response = await axios.delete(`/work-direction/${id}`);
  return response.data;
};

export const getWorkDirectionCards = async (req: {
  lang: "ua" | "en";
  page: number;
  limit: number;
  type?: string;
}): Promise<IWorkDirectionCards> => {
  const response = await axios.get(`/${req.lang}/work-direction`, { params: req });
  return response.data;
};
