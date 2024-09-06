import { AxiosError, AxiosResponse } from "axios";

export type IFormRegistration = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type IFormLogin = Omit<
  IFormRegistration,
  "username" | "confirmPassword"
>;

interface ErrorResponse {
  message?: string;
}

export interface AxiosErrorWithResponse extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}
