"use server";
import yup from "yup";
import * as Yup from "yup";

import { getToken } from "@/admin-shared/lib/getToken";
import {
  allowedSections,
  WorkDirection,
  DirectionCard,
  IWorkDirectionCards,
} from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import {
  editFormSchema,
  firstFormSchema,
} from "@/admin-shared/model/schemas/workDirectionYupSchemas";

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

export const updateBudgetCard = async (
  projectId: string,
  sectionId: string,
  budgetCardId: string,
  updatedData: object,
): Promise<{ message: string }> => {
  const token = getToken();

  const response = await fetch(
    `${domain}/api/projects/${projectId}/sections/${sectionId}/budget-cards/${budgetCardId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
      body: JSON.stringify(updatedData),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update budget card");
  }

  return response.json();
};

export const updateWorkDirection = async (
  req: Yup.InferType<typeof editFormSchema>,
): Promise<DirectionCard> => {
  const token = getToken();
  const response = await fetch(`${domain}/api/projects/${req._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token}`,
    },
    body: JSON.stringify(req),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Помилка при оновленні: ", errorData);
    throw new Error("Не вдалося оновити");
  }

  return await response.json();
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
}): Promise<WorkDirection> => {
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
): Promise<WorkDirection> => {
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
}): Promise<IWorkDirectionCards> => {
  const token = getToken();
  const queryParams = new URLSearchParams({
    page: req.page.toString(),
    limit: req.limit.toString(),
    ...(req.type ? { type: req.type } : { type: "all" }),
  });

  const response = await fetch(`${domain}/api/ua/projects?${queryParams}`, {
    method: "GET",
    headers: {
      Cookie: `token=${token}`,
    },
  });

  return response.json();
};

export const createWorkDirectionSection = async (req: {
  projectId: string;
  type: allowedSections;
}): Promise<WorkDirection> => {
  const getTokenFromLib = getToken();

  try {
    const response = await fetch(
      `${domain}/api/projects/sections/${req.projectId}`,
      {
        method: "POST",
        headers: {
          Cookie: `token=${getTokenFromLib}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: req.type,
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Сервер повернув помилку: ${response.status} - ${errorText}`,
      );
    }

    return await response.json();
  } catch (error) {
    throw new Error("Не вдалося створити секцію. Будь ласка, перевірте дані.");
  }
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

export const createTextSection = async (req: {
  projectId: string;
  sectionId: string;
  text: string;
}): Promise<Yup.InferType<typeof editFormSchema>> => {
  const token = getToken();
  const response = await fetch(
    `${domain}/api/projects/sections/${req.projectId}/${req.sectionId}/text`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
      body: JSON.stringify({ text: req.text }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to create text section.");
  }

  return response.json();
};

export const deleteTextSection = async (req: {
  projectId: string;
  sectionId: string;
}): Promise<{ success: boolean; message: string }> => {
  const token = getToken();
  const url = `${domain}/api/projects/sections/${req.projectId}/${req.sectionId}/text`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete text section.");
  }

  const responseData = await response.json();

  return responseData;
};

export const addBudgetCard = async (req: {
  projectId: string;
  sectionId: string;
}): Promise<Yup.InferType<typeof editFormSchema>> => {
  const token = getToken();
  const response = await fetch(
    `${domain}/api/projects/sections/${req.projectId}/${req.sectionId}`,
    {
      method: "POST",
      headers: {
        Cookie: `token=${token}`,
      },
      body: JSON.stringify(req),
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to add budget card: ${response.statusText}`);
  }

  return response.json();
};

export const deleteBudgetCard = async (req: { budgetCardId: string }) => {
  try {
    const token = getToken();
    const response = await fetch(
      `${domain}/api/projects/sections/${req.budgetCardId}`,
      {
        method: "DELETE",
        headers: {
          Cookie: `token=${token}`,
        },
      },
    );

    // Перевіряємо, чи статус успішний (2xx)
    if (!response.ok) {
      throw new Error(
        `Помилка видалення: ${response.status} ${response.statusText}`,
      );
    }

    return await response.json(); // Повертаємо розпарсений JSON
  } catch (error) {
    console.error("Помилка при видаленні бюджетної картки:", error);
    throw error; // Проброс помилки для подальшої обробки
  }
};
