"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { FC, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";

import css from "@/admin-components/auth/auth.module.css";
import { Notification } from "@/admin-widgets/Notification/notification";
import { useLogin } from "@/admin-shared/hooks/auth/useLogin";
import { LoginSchema } from "@/admin-shared/model/schemas/authYupSchemas";
import FormError from "@/admin-widgets/forms/formError/FormError";

const Login: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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
    if (isError) {
      Notification({ message: error.message });
    }

    if (isSuccess) {
      Notification({ message: "Success!", type: "success" });
      reset();
    }
  }, [reset, isError, isSuccess, error?.message]);

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <p className={css.title}>Вхід в систему</p>
        <div className={css.elementsWrapper}>
          <div className={css.element}>
            <TextField
              type="email"
              id="email"
              label="Введіть Вашу електронну адресу"
              {...register("email")}
              disabled={isPending}
            />
            {errors.email?.message && (
              <FormError>{errors.email.message}</FormError>
            )}
          </div>
          <div className={css.element}>
            <TextField
              type="password"
              id="password"
              label="Введіть Ваш пароль"
              {...register("password")}
              disabled={isPending}
            />
            {errors.password?.message && (
              <FormError>{errors.password.message}</FormError>
            )}
          </div>
          <Button variant="contained" type="submit" disabled={isPending}>
            Увійти
          </Button>
          <Link href="/admin/register" className={css.link}>
            Ще немає акаунта? Зареєструватись
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
