"use client";

import axios from "axios";
import { Formik, Field, Form, FormikHelpers } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

import { Notification } from "../ui/notification";

import css from "./auth.module.css";
import { IFormLogin, AxiosErrorWithResponse } from "./authInterfaces";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Password is too short").required("Required"),
});

const Login = () => {
  const router = useRouter();

  const onLogin = async (
    values: IFormLogin,
    actions: FormikHelpers<IFormLogin>,
  ) => {
    try {
      const res = await axios.post("/api/auth/login", values);

      if (res.status === 200) {
        actions.resetForm();
        router.push("/admin");
        Notification({ type: "success", message: res.statusText });
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorWithResponse;
      console.log(axiosError.response?.data);

      const notifyError = {
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
    <div className={css.container}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={onLogin}
      >
        {({ errors, touched }) => (
          <Form className={css.form}>
            <p className={css.title}>Вхід в систему</p>
            <div className={css.elementsWrapper}>
              <div className={css.element}>
                <label htmlFor="email" className={css.label}>
                  Введіть Вашу електронну адресу:
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className={css.input}
                  placeholder="example@gmail.com"
                />
                {errors.email && touched.email ? (
                  <div className={css.error}>{errors.email}</div>
                ) : null}
              </div>
              <div className={css.element}>
                <label htmlFor="password" className={css.label}>
                  Введіть Ваш пароль:
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className={css.input}
                  placeholder="qwerty123"
                />
                {errors.password && touched.password ? (
                  <div className={css.error}>{errors.password}</div>
                ) : null}
              </div>
            </div>
            <button className={css.button} type="submit">
              Увійти
            </button>
            <Link href="/admin/register" className={css.link}>
              Ще немає акаунта? Зареєструватись
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
