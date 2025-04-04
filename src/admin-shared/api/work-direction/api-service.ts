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
  req: { lang: "ua" | "en" } & Partial<Yup.InferType<typeof editFormSchema>>,
): Promise<DirectionCard> => {
  console.log("🔍 Запит на оновлення:", req);

  const token = getToken();

  const lang = req.lang;

  const projectId = req.projectId;

  const url = `${domain}/api/${lang}/projects/${projectId}`;

  const {
    ua,
    en,
    lang: _,
    projectId: _projectId,
    workDirectionsType,

    ...rest
  } = req;

  const localizedData = lang === "ua" ? ua : en;

  if (!localizedData) {
    throw new Error(`❌ Немає даних для мови "${lang}"`);
  }

  const formattedRequest = {
    ...rest,
    ...localizedData,
    sections:
      localizedData.sections?.map((section) => ({
        ...section,
        content: section.content ?? [],
      })) || [],
  };

  const { data, ...cleanedRequest } = formattedRequest;

  console.log("📤 Чистий запит:", JSON.stringify(cleanedRequest, null, 2));

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
      body: JSON.stringify(cleanedRequest),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ Сервер повернув помилку:", response.status, errorData);
      throw new Error(
        `Помилка ${response.status}: ${errorData.error || response.statusText}`,
      );
    }

    const responseData = await response.json();
    console.log("✅ Сервер відповів:", responseData);

    return responseData;
  } catch (error) {
    console.error("🔥 Критична помилка під час запиту:", error);
    throw new Error("🚨 Неможливо оновити секцію");
  }
};

export const createWorkDirectionMainImage = async (req: {
  _id: string;
  formData: FormData;
}): Promise<Yup.InferType<typeof editFormSchema>> => {
  const token = getToken();

  const url = `${domain}/api/projects/img/${req._id}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Cookie: `token=${token}`,
      },
      body: req.formData,
    });

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      console.log("Дані від сервера:", data);
      return data;
    } else {
      throw new Error("❌ Сервер повернув не JSON-відповідь");
    }
  } catch (error) {
    console.error("Помилка при відправленні запиту:", error);
    throw error;
  }
};

export const deleteWorkDirectionMainImage = async (fileId: string) => {
  const token = getToken();
  const response = await fetch(`${domain}/api/projects/img/${fileId}`, {
    method: "DELETE",
    headers: {
      Cookie: `token=${token}`,
    },
  });

  return response.json();
};

export const createWorkDirectionImages = async (req: {
  _id: string;
  id: string;
  formData: FormData;
}): Promise<Yup.InferType<typeof editFormSchema>> => {
  const token = getToken();
  const response = await fetch(
    `${domain}/api/projects/images/${req._id}/${req.id}`,
    {
      method: "POST",
      headers: {
        Cookie: `token=${token}`,
      },
      body: req.formData,
    },
  );

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
  content?: any;
}): Promise<WorkDirection> => {
  if (!req.projectId) {
    throw new Error("Project ID is required!");
  }

  if (!req.type) {
    throw new Error("Section type is required!");
  }

  const token = getToken();
  if (!token) {
    throw new Error("Unable to retrieve authentication token!");
  }

  // Якщо контент відсутній або порожній, підставляємо запасний варіант
  const content =
    req.content && Array.isArray(req.content) && req.content.length > 0
      ? req.content
      : ["https://example.com/placeholder.jpg"]; // Запасне значення

  const url = `${domain}/api/projects/sections/${req.projectId}`;

  try {
    console.log("Sending section creation request:", {
      url,
      projectId: req.projectId,
      type: req.type,
      content, // Гарантовано не порожній масив
    });

    const bodyData = {
      type: req.type,
      content,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error: ${response.status}. Message: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during section creation:", error);
    throw error;
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
