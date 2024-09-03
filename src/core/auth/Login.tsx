"use client";

import axios from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AuthLinks } from "@/constants/Links";
import { AuthNav } from "@/dictionaries/types";

import MainButton from "../buttons/MainButton";
import AuthInput from "../inputs/AuthInput";
import { INotify, Notification } from "../Notification";

import { AxiosErrorWithResponse, IFormSignIn } from "./authInterfaces";
import { SignInSchema } from "./authYupSchemas";

const initialState: IFormSignIn = { email: "", password: "" };

const Login = ({ lang, labels }: { lang: string; labels: AuthNav }) => {
  const link = AuthLinks;
  const router = useRouter();

  const registrationLink = link.auth.find((i) => i.label === "registration");
  const currentLanguage = lang === "en" ? "/" : `/${lang}/`;

  const onLogin = async (
    values: IFormSignIn,
    actions: FormikHelpers<IFormSignIn>,
  ) => {
    try {
      const res = await axios.post("/api/auth/signin", values);

      if (res.status === 200) {
        actions.resetForm();

        router.push(`${currentLanguage}`);
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
                <MainButton type="submit">{labels["login"]}</MainButton>
              </Form>
            );
          }}
        </Formik>
        <div className="mt-4 flex flex-col items-center">
          <div className="flex gap-2">
            <p>{labels["auth-text-registration"]}</p>
            <Link href={`${currentLanguage}${registrationLink!.path}`}>
              <span className="underline">
                {labels[registrationLink!.label]}
              </span>
            </Link>
          </div>
          <Link href={`${currentLanguage}${link.forgotPassword.path}`}>
            <span className="underline">
              {labels[link.forgotPassword.label]}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
