import axios, { AxiosError } from "axios";

import { IUser } from "../model/interfaces";

axios.defaults.baseURL = "http://localhost:3000/api/auth";
import * as yup from "yup";

import {
  LoginSchema,
  RegisterSchema,
} from "@/admin-shared/model/schemas/authYupSchemas";

export const login = async (
  user: yup.InferType<typeof LoginSchema>,
): Promise<IUser> => {
  try {
    const response = await axios.post<IUser>("/login", user);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response && error.response.status === 401) {
        const serverMessage = error.response.data?.message;

        throw Error(serverMessage);
      }
      throw Error("Ошибка при логине");
    }
    throw Error(String(error));
  }
};

export const register = async (
  user: yup.InferType<typeof RegisterSchema>,
): Promise<IUser> => {
  try {
    const response = await axios.post<IUser>("/register", user);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response && error.response.status === 403) {
        const serverMessage = error.response.data?.message;

        throw Error(serverMessage);
      }

      throw Error("Ошибка при регистрации");
    }

    throw Error(String(error));
  }
};

export const logout = async () => {
  const response = await axios.post("/logout");
  return response.data;
};

export const getUser = async (): Promise<IUser> => {
  try {
    const response = await axios.get<IUser>("/user");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response && error.response.status === 401) {
        throw Error("User unauthorized");
      }
    }

    throw Error(String(error));
  }
};
