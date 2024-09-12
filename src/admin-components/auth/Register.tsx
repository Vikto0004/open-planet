"use client";

import axios from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";

import AuthInput from "../../core/inputs/AuthInput";
import { Notification, INotify } from "../ui/notification";

import { AxiosErrorWithResponse, IFormRegistration } from "./authInterfaces";
import { RegisterSchema } from "./authYupSchemas";

const initialState: IFormRegistration = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const router = useRouter();

  const onSubmit = async (
    values: IFormRegistration,
    actions: FormikHelpers<IFormRegistration>,
  ) => {
    try {
      const res = await axios.post("/api/auth/register", values);

      if (res.status === 201) {
        router.push("/login"); // Перенаправлення на сторінку логіну
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
              <button type="submit">Register</button>
            </Form>
          );
        }}
      </Formik>
      <div className="mt-4 flex flex-col items-center">
        <div className="flex gap-2">
          <p>Already have an account?</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
