"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import css from "@/admin-components/auth/auth.module.css";
import { LoginSchema } from "@/admin-components/auth/authYupSchemas";

import { IFormLogin } from "@/admin-components/auth/authInterfaces";


const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLogin>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<IFormLogin> = (data) => {
    console.log(data);
  };

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
                   placeholder="example@gmail.com" />
            <div className={css.error}>{errors.email?.message}</div>
          </div>
          <div className={css.element}>
            <label htmlFor="password" className={css.label}>
              Введіть Ваш пароль:
            </label>
            <input type="password" id="password" {...register("password")} className={css.input}
                   placeholder="qwerty123" />
            <div className={css.error}>{errors.password?.message}</div>
            <button className={css.button} type="submit">
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
