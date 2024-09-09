"use client";

import axios from "axios";
import { Form, Formik, FormikHelpers } from "formik";
// import Links from "next/link";
// import { useRouter } from "next/navigation";

// import { AuthLinks } from "@/constants/Links";
// import { AuthNav } from "@/dictionaries/types";

// import MainButton from "../buttons/MainButton";
import AuthInput from "../inputs/AuthInput";
import { Notification, INotify } from "../Notification";

import { AxiosErrorWithResponse, IFormRegistration } from "./authInterfaces";
import { RegisterSchema } from "./authYupSchemas";

const initialState: IFormRegistration = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// const Register = ({ lang, labels }: { lang: string; labels: AuthNav }) => {
const Register = () => {
  // const link = AuthLinks;
  // const router = useRouter();

  // const loginLink = link.auth.find((i) => i.label === "login");

  // const currentLanguage = lang === "en" ? "" : `/${lang}/`;

  const onSubmit = async (
    values: IFormRegistration,
    actions: FormikHelpers<IFormRegistration>,
  ) => {
    try {
      const res = await axios.post("/api/auth/register", values);

      if (res.status === 201) {
        // router.push(`${currentLanguage}login`);
        actions.resetForm();
        Notification({ type: "success", message: res.statusText });
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorWithResponse;

      const notifyError: INotify = {
        type: "error",
        message:
          typeof axiosError.response?.data?.message === "string"
            ? axiosError.response?.data.message
            : "Unknown error",
      };

      Notification(notifyError);
    }
  };

  return (
    <div className="">
      <Formik
        initialValues={initialState}
        validationSchema={RegisterSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          const { errors, handleChange, values } = formik;

          return (
            <Form className="">
              <AuthInput
                name="username"
                placeholder="Enter user name"
                onChange={handleChange("username")}
                value={values.username}
                error={errors.username}
              />
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

              <AuthInput
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange("confirmPassword")}
                value={values.confirmPassword}
                error={errors.confirmPassword}
                type="password"
              />
              {/* <MainButton type="submit">{labels["registration"]}</MainButton> */}
            </Form>
          );
        }}
      </Formik>
      <div className="mt-4 flex flex-col items-center">
        <div className="flex gap-2">
          {/* <p>{labels["auth-text-login"]}</p> */}
          {/* <Link href={`${currentLanguage}${loginLink!.path}`}> */}
          {/* <span className="underline"> {labels[loginLink!.label]}</span> */}
          {/* </Link> */}
        </div>
        {/* <Link href={`${currentLanguage}${link.forgotPassword.path}`}> */}
        {/* <span className="underline">{labels[link.forgotPassword.label]}</span> */}
        {/* </Link> */}
      </div>
    </div>
  );
};

export default Register;
