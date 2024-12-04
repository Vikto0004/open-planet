"use server";
import { getToken } from "@/admin-shared/lib/getToken";
import {
  allowedSections,
  allowedTypes,
  IWorkDirection,
  // IWorkDirectionUpdateRequest,
  // IWorkDirectionImages,
  // IWorkDirectionCards,
} from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import yup from "yup";
import { editFormSchema, firstFormSchema } from "@/admin-shared/model/schemas/workDirectionYupSchemas";
import * as Yup from "yup";

const domain = process.env.NEXT_PUBLIC_DOMAIN;

export const createWorkDirection = async (
  payload: yup.InferType<typeof firstFormSchema>,
): Promise<Yup.InferType<typeof editFormSchema>> => {

  const token = getToken();
  const response = await fetch(`${domain}/api/projects`, {
    method: "POST",
    headers: {
      Cookie: `token=${token}`,
    },
    body: JSON.stringify(payload),
  });
  return response.json();
};

export const updateWorkDirection = async (req: {
  payload: Yup.InferType<typeof editFormSchema>;
}): Promise<{ message: string }> => {
  const token = getToken();
  const response = await fetch(`${domain}/api/projects/${req.payload._id}`, {
    method: "PUT",
    headers: {
      ContentType: "application/json",
      Cookie: `token=${token}`,
    },
    body: JSON.stringify(req.payload),
  });
  return response.json();
};

export const createWorkDirectionMainImage = async (req: {
  id: string;
  formData: FormData;
}): Promise<Yup.InferType<typeof editFormSchema>> => {
  const token = getToken();
  const response = await fetch(`${domain}/api/projects/img/${req.id}`, {
    method: "POST",
    headers: {
      Cookie: `token=${token}`,
    },
    body: req.formData,
  });
  return response.json();
};

export const deleteWorkDirectionMainImage = async (
  id: string,
): Promise<Yup.InferType<typeof editFormSchema>> => {
  const token = getToken();
  const response = await fetch(`${domain}/api/projects/img/${id}`, {
    method: "DELETE",
    headers: {
      Cookie: `token=${token}`,
    },
  });
  return response.json();
};

export const createWorkDirectionImages = async (req: {
  id: string;
  formData: FormData;
}): Promise<Yup.InferType<typeof editFormSchema>> => {
  const token = getToken();
  const response = await fetch(`${domain}/api/projects/images/${req.id}`, {
    method: "POST",
    headers: {
      Cookie: `token=${token}`,
    },
    body: req.formData,
  });

  return response.json();
};

export const deleteWorkDirectionImage = async (req: {
  id: string;
  imageUrl: string;
  // Тип под вопросом
}): Promise<IWorkDirection> => {
  const token = getToken();
  const response = await fetch(`${domain}/api/projects/images/${req.id}`, {
    method: "DELETE",
    headers: {
      Cookie: `token=${token}`,
    },
    body: JSON.stringify({ imageUrl: req.imageUrl }),
  });
  return response.json();
};

export const getWorkDirectionCard = async (
  id: string,
): Promise<IWorkDirection> => {
  const token = getToken();
  const response = await fetch(`${domain}/api/projects/${id}`, {
    method: "GET",
    headers: {
      Cookie: `token=${token}`,
    },
  });

  return response.json();
};

export const deleteWorkDirectionCard = async (
  id: string,
): Promise<{ message: string }> => {
  const token = getToken();
  const response = await fetch(`${domain}/api/projects/${id}`, {
    method: "DELETE",
    headers: {
      Cookie: `token=${token}`,
    },
  });

  return response.json();
};

export const getWorkDirectionCards = async (req: {
  lang: "ua" | "en";
  page: number;
  limit: number;
  type?: string;
}): Promise<IWorkDirection> => {
  const token = getToken();
  const queryParams = new URLSearchParams({
    page: req.page.toString(),
    limit: req.limit.toString(),
    ...(req.type ? { type: req.type } : {}),
  });

  const response = await fetch(
    `${domain}/api/ua/projects?${queryParams}&type=education`,
    {
      method: "GET",
      headers: {
        Cookie: `token=${token}`,
      },
    },
  );

  return response.json();
};

export const createWorkDirectionSection = async (req: {
  projectId: string;
  type: allowedSections;
}): Promise<Yup.InferType<typeof editFormSchema>> => {
  const token = getToken();
  const response = await fetch(
    `${domain}/api/projects/sections/${req.projectId}`,
    {
      method: "POST",
      headers: {
        Cookie: `token=${token}`,
      },
      body: JSON.stringify({ type: req.type }),
    },
  );

  return response.json();
};

export const deleteWorkDirectionSection = async (req: {
  projectId: string;
  sectionId: string;
}): Promise<Yup.InferType<typeof editFormSchema>> => {
  const token = getToken();
  const response = await fetch(
    `${domain}/api/projects/sections/${req.projectId}/${req.sectionId}`,
    {
      method: "DELETE",
      headers: {
        Cookie: `token=${token}`,
      },
    },
  );

  return response.json();
};

export const addBudgetCard = async (req: {
  projectId: string;
  sectionId: string;
}): Promise<Yup.InferType<typeof editFormSchema>> => {
  const token = getToken();
  const response = await fetch(
    `${domain}/api/projects/${req.projectId}/${req.sectionId}`,
    {
      method: "POST",
      headers: {
        Cookie: `token=${token}`,
      },
    },
  );

  return response.json();
};

export const deleteBudgetCard = async (req: {
  projectId: string;
  sectionId: string;
  budgetCardId: string;
}): Promise<Yup.InferType<typeof editFormSchema>> => {
  const token = getToken();
  const response = await fetch(
    `${domain}/api/projects/${req.projectId}/${req.sectionId}/${req.budgetCardId}`,
    {
      method: "DELETE",
      headers: {
        Cookie: `token=${token}`,
      },
    },
  );

  return response.json();
};
