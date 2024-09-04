import { AxiosError, AxiosResponse } from "axios";

export type IFormSignUp = {
  username: string;
  email: string;
  password: string;
  confimPassword: string;
};

export type IFormSignIn = Omit<IFormSignUp, "username" | "confimPassword">;

interface ErrorResponse {
  message?: string;
}

export interface AxiosErrorWithResponse extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}
