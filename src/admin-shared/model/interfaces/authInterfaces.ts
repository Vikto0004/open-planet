import { AxiosError, AxiosResponse } from "axios";

interface ErrorResponse {
  message?: string;
}

export interface AxiosErrorWithResponse extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export interface IUser {
  user: {
    id: string;
    username: string;
    email: string;
    password: string;
    role: "user" | "admin" | "moderator";
  };
}
