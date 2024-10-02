"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { FC, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import css from "@/admin-components/auth/auth.module.css";
import { LoginSchema } from "@/admin-shared/model/schemas/authYupSchemas";

import * as yup from "yup";
import { useLogin } from "@/admin-shared/hooks/useLogin";
import { Notification } from "@/admin-components/ui/notification";

const Login: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<yup.InferType<typeof LoginSchema>>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending, error, isError, isSuccess } = useLogin();
  const onSubmit: SubmitHandler<yup.InferType<typeof LoginSchema>> = (data) => {
    mutate(data);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }

    if (isError) {
      Notification({ message: error.message });
    }

    if (isSuccess) {
      Notification({ message: "Success!", type: "success" });
    }
  }, [isSubmitSuccessful, reset, isError, isSuccess]);

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <p className={css.title}>Вхід в систему</p>
        <div className={css.elementsWrapper}>
          <div className={css.element}>
            <label htmlFor="email" className={css.label}>
              Введіть Вашу електронну адресу:
            </label>
            <input type="email" id="email" {...register("email")} className={css.input}
                   placeholder="example@gmail.com" disabled={isPending} />
            <div className={css.error}>{errors.email?.message}</div>
          </div>
          <div className={css.element}>
            <label htmlFor="password" className={css.label}>
              Введіть Ваш пароль:
            </label>
            <input type="password" id="password" {...register("password")} className={css.input}
                   placeholder="******" disabled={isPending} />
            <div className={css.error}>{errors.password?.message}</div>
            <button className={css.button} type="submit" disabled={isPending}>
              Увійти
            </button>
            <Link href="/admin/register" className={css.link}>
              Ще немає акаунта? Зареєструватись
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
