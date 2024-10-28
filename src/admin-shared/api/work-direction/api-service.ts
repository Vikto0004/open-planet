"use server";
import { getToken } from "@/admin-shared/lib/getToken";
import {
  IWorkDirection,
  IWorkDirectionUpdateRequest,
  IWorkDirectionImages,
  IWorkDirectionCards,
} from "@/admin-shared/model/interfaces/workDirectionInterfaces";

const domain = process.env.NEXT_PUBLIC_DOMAIN;

export const createWorkDirection = async (
  language: "uk" | "en",
): Promise<IWorkDirection> => {
  const body = {
    language,
  };
  const token = getToken();
  const response = await fetch(`${domain}/api/work-direction`, {
    method: "POST",
    headers: {
      Cookie: `token=${token}`,
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

export const updateWorkDirection = async (req: {
  id: string;
  data: IWorkDirectionUpdateRequest;
}): Promise<{ message: string }> => {
  const token = getToken();
  const response = await fetch(`${domain}/api/work-direction/${req.id}`, {
    method: "PUT",
    headers: {
      ContentType: "application/json",
      Cookie: `token=${token}`,
    },
    body: JSON.stringify(req.data),
  });
  return response.json();
};

export const createWorkDirectionMainImage = async (req: {
  id: string;
  formData: FormData;
}): Promise<IWorkDirectionImages> => {
  const token = getToken();
  console.log(req.formData);
  const response = await fetch(`${domain}/api/work-direction/img/${req.id}`, {
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
): Promise<IWorkDirectionImages> => {
  const token = getToken();
  const response = await fetch(`${domain}/api/work-direction/img/${id}`, {
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
}): Promise<IWorkDirectionImages> => {
  const token = getToken();
  const response = await fetch(
    `${domain}/api/work-direction/images/${req.id}`,
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
}): Promise<IWorkDirectionImages> => {
  const token = getToken();
  const response = await fetch(
    `${domain}/api/work-direction/images/${req.id}`,
    {
      method: "DELETE",
      headers: {
        Cookie: `token=${token}`,
      },
      body: JSON.stringify({ imageUrl: req.imageUrl }),
    },
  );
  return response.json();
};

export const getWorkDirectionCard = async (
  id: string,
): Promise<IWorkDirection> => {
  const token = getToken();
  const response = await fetch(`${domain}/api/work-direction/${id}`, {
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
  const response = await fetch(`${domain}/api/work-direction/${id}`, {
    method: "DELETE",
  });

  return response.json();
};

export const getWorkDirectionCards = async (req: {
  lang: "uk" | "en";
  page: number;
  limit: number;
  type?: string;
}): Promise<IWorkDirectionCards> => {
  const token = getToken();
  const queryParams = new URLSearchParams({
    page: req.page.toString(),
    limit: req.limit.toString(),
    ...(req.type ? { type: req.type } : {}),
  });

  const response = await fetch(
    `${domain}/api/${req.lang}/work-direction?${queryParams}`,
    {
      method: "GET",
      headers: {
        Cookie: `token=${token}`,
      },
    },
  );

  return response.json();
};
