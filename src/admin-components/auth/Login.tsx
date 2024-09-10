"use client";

import axios from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AuthLinks } from "@/constants/Links";

import AuthInput from "../../core/inputs/AuthInput";
import { INotify, Notification } from "../ui/notification";

import { AxiosErrorWithResponse, IFormLogin } from "./authInterfaces";
import { SignInSchema } from "./authYupSchemas";

const initialState: IFormLogin = { email: "", password: "" };

const Login = () => {
  const link = AuthLinks;
  const router = useRouter();

  const registrationLink = link.auth.find((i) => i.label === "registration");

  const onLogin = async (
    values: IFormLogin,
    actions: FormikHelpers<IFormLogin>,
  ) => {
    try {
      const res = await axios.post("/api/auth/login", values);

      if (res.status === 200) {
        actions.resetForm();
        router.push("/"); // Перенаправлення на головну сторінку
        Notification({ type: "success", message: res.statusText });
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorWithResponse;
      console.log(axiosError.response?.data);

      const notifyError: INotify = {
        type: "error",
        message:
          typeof axiosError.response?.data === "string"
            ? axiosError.response?.data
            : "Unknown error",
      };

      Notification(notifyError);
    }
  };

  return (
    <div className="">
      <div className="">
        <Formik
          initialValues={initialState}
          validationSchema={SignInSchema}
          onSubmit={(values, actions) => {
            onLogin(values, actions);
          }}
        >
          {(formik) => {
            const { errors, handleChange, values } = formik;

            return (
              <Form className="">
                <AuthInput
                  name="email"
                  placeholder="Enter email"
                  onChange={handleChange("email")}
                  value={values.email}
                  error={errors.email}
                  type="email"
                />
                <AuthInput
                  name="password"
                  placeholder="Enter password"
                  onChange={handleChange("password")}
                  value={values.password}
                  error={errors.password}
                  type="password"
                />
                <button type="submit">Login</button>
              </Form>
            );
          }}
        </Formik>
        <div className="mt-4 flex flex-col items-center">
          <div className="flex gap-2">
            <p>Don't have an account?</p>
            <Link href={registrationLink?.path || "/register"}>
              <span className="underline">Register</span>
            </Link>
          </div>
          <Link href={link.forgotPassword.path}>
            <span className="underline">Forgot Password?</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
