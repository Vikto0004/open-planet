import { AxiosError, AxiosResponse } from "axios";

export type IFormSignUp = {
  name: string;
  email: string;
  password: string;
};

export type IFormSignIn = Omit<IFormSignUp, "name">;

interface ErrorResponse {
  message?: string;
}

export interface AxiosErrorWithResponse extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}
