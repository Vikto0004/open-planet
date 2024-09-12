"use client";

import { Formik, Field, Form, FormikHelpers } from "formik";
import { RegisterSchema } from "./authYupSchemas";
import css from "./auth.module.css";
import { useRouter } from "next/navigation";
import { INotify, Notification } from "../ui/notification";
import { AxiosErrorWithResponse, IFormRegistration } from "./authInterfaces";
import axios from "axios";
import Link from "next/link";

const Register = () => {
  const router = useRouter();

  const onSubmit = async (
    values: IFormRegistration,
    actions: FormikHelpers<IFormRegistration>,
  ) => {
    try {
      const res = await axios.post("/api/auth/register", values);

      if (res.status === 201) {
        router.push("/login");
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
    <div className={css.container}>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form className={css.form}>
            <p className={css.title}>Реєстрація</p>
            <div className={css.elementsWrapper}>
              <div className={css.element}>
                <label htmlFor="username" className={css.label}>
                  Введіть Ваше імя:
                </label>
                <Field
                  type="text"
                  name="username"
                  id="username"
                  className={css.input}
                  placeholder="Юрій Іванов"
                />
                {errors.username && touched.username ? (
                  <div className={css.error}>{errors.username}</div>
                ) : null}
              </div>
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
                  Придумайте пароль:
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
              <div className={css.element}>
                <label htmlFor="confirmPassword" className={css.label}>
                  Підтвердьте придуманий пароль:
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className={css.input}
                  placeholder="qwerty123"
                />
                {errors.password && touched.password ? (
                  <div className={css.error}>{errors.password}</div>
                ) : null}
              </div>
            </div>
            <button className={css.button} type="submit">
              Зареєструватись
            </button>
            <Link href="/admin/login" className={css.link}>
              Вже є акаунт? Увійти
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
