"use server";
import { getToken } from "@/admin-shared/lib/getToken";
import {
  ICreateWorkDirection,
  IWorkDirection,
  // IWorkDirectionUpdateRequest,
  // IWorkDirectionImages,
  // IWorkDirectionCards,
} from "@/admin-shared/model/interfaces/workDirectionInterfaces";

const domain = process.env.NEXT_PUBLIC_DOMAIN;

export const createWorkDirection = async (
  payload: ICreateWorkDirection
): Promise<IWorkDirection> => {
  const body = {
    payload,
  };
  const token = getToken();
  const response = await fetch(`${domain}/api/projects`, {
    method: "POST",
    headers: {
      Cookie: `token=${token}`,
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

export const updateWorkDirection = async (req: {
  payload: IWorkDirection;
}): Promise<{ message: string }> => {
  const token = getToken();
  const response = await fetch(`${domain}/api/projects/${req.payload.id}`, {
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
}): Promise<IWorkDirection> => {
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
): Promise<IWorkDirection> => {
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
}): Promise<IWorkDirection> => {
  const token = getToken();
  const response = await fetch(
    `${domain}/api/projects/images/${req.id}`,
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
}): Promise<IWorkDirection> => {
  const token = getToken();
  const response = await fetch(
    `${domain}/api/projects/images/${req.id}`,
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
