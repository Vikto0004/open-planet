"use server";
import { cookies } from "next/headers";
import * as yup from "yup";

import {
  LoginSchema,
  RegisterSchema,
} from "@/admin-shared/model/schemas/authYupSchemas";

const domain = process.env.NEXT_PUBLIC_DOMAIN;

export const login = async (user: yup.InferType<typeof LoginSchema>) => {
  try {
    console.log(user)
    const response = await fetch(`${domain}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.status === 401) {
      const errorData = await response.json();
      const serverMessage = errorData?.message || "Невірний логін або пароль";
      throw new Error(serverMessage);
    }

    console.log(response)

    const parsed = await response.json();
    console.log(parsed);
    const cookieStore = cookies();
    cookieStore.set("token", parsed.userData.token, { httpOnly: true });
    return parsed.user;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(String(error));
  }
};

export const register = async (user: yup.InferType<typeof RegisterSchema>) => {
  try {
    const response = await fetch(`${domain}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      if (response.status === 403) {
        const errorData = await response.json();
        const serverMessage =
          errorData?.message || "Така почта вже використовується";
        throw new Error(serverMessage);
      }
      throw new Error("Помилка при спробі зареєструватись");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw Error(String(error));
  }
};

export const logout = async () => {
  const cookieStore = cookies();
  if (cookieStore.has("token")) {
    cookieStore.delete("token");
  }
  await fetch(`${domain}/api/auth/logout`, {
    method: "POST",
    body: JSON.stringify({}),
  });
};

export const getUser = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { error: "No token" };
  }

  const response = await fetch(`${domain}/api/auth/user`, {
    method: "GET",
    headers: { Cookie: `token=${token}` },
  });
  return await response.json();
};
