"use server";

import { getToken } from "@/admin-shared/lib/getToken";

const domain = process.env.NEXT_PUBLIC_DOMAIN;

import {
  ITexts,
  IWorkDirection,
} from "@/admin-shared/model/interfaces/workDirectionInterfaces";

export const createTextSection = async (
  cardId: string,
): Promise<IWorkDirection> => {
  const token = getToken();
  const response = await fetch(`${domain}/api/work-direction/${cardId}`, {
    method: "POST",
    headers: {
      Cookie: `token=${token}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to create text section");
  }

  return response.json();
};

export const updateTextSection = async (req: {
  sectionId: string;
  data: Omit<ITexts, "_id">;
}): Promise<ITexts> => {
  const token = getToken();
  const response = await fetch(`${domain}/api/textSection/${req.sectionId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token}`,
    },
    credentials: "include",
    body: JSON.stringify(req.data),
  });

  if (!response.ok) {
    throw new Error("Failed to update text section");
  }

  return response.json();
};

export const deleteTextSection = async (req: {
  cardId: string;
  sectionId: string;
}): Promise<IWorkDirection> => {
  const token = getToken();
  const response = await fetch(
    `${domain}/api/work-direction/${req.cardId}/${req.sectionId}`,
    {
      method: "DELETE",
      headers: {
        Cookie: `token=${token}`,
      },
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete text section");
  }

  return response.json();
};