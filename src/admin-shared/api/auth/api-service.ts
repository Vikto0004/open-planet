import axios, { AxiosError } from "axios";
import * as yup from "yup";

// eslint-disable-next-line import/order
import { IUser } from "@/admin-shared/model/interfaces";

const domain = process.env.NEXT_PUBLIC_DOMAIN;
axios.defaults.baseURL = `${domain}/api`;

import {
  LoginSchema,
  RegisterSchema,
} from "@/admin-shared/model/schemas/authYupSchemas";

export const login = async (
  user: yup.InferType<typeof LoginSchema>,
): Promise<IUser> => {
  try {
    const response = await axios.post<IUser>("/auth/login", user);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response && error.response.status === 401) {
        const serverMessage = error.response.data?.message;

        throw Error(serverMessage);
      }
      throw Error("Помилка при спробі увійти в аккаунт");
    }
    throw Error(String(error));
  }
};

export const register = async (
  user: yup.InferType<typeof RegisterSchema>,
): Promise<IUser> => {
  try {
    const response = await axios.post<IUser>("/auth/register", user);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response && error.response.status === 403) {
        const serverMessage = error.response.data?.message;

        throw Error(serverMessage);
      }

      throw Error("Помилка при спробі зареєструватись");
    }

    throw Error(String(error));
  }
};

export const logout = async () => {
  const response = await axios.post("/auth/logout");
  return response.data;
};

export const getUser = async (): Promise<IUser> => {
  const response = await fetch(`${domain}/api/auth/user`);
  return response.json();
};
