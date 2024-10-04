import { AxiosError, AxiosResponse } from "axios";

interface ErrorResponse {
  message?: string;
}

export interface AxiosErrorWithResponse extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export interface IUser {
  id: string;
  email: string;
  password: string;
  role: "user" | "admin" | "moderator";
}
