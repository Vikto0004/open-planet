import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";

import { Notification } from "@/admin-components/ui/notification";
import { useRegister } from "@/admin-shared/hooks/auth/useRegister";
import { RegisterSchema } from "@/admin-shared/model/schemas/authYupSchemas";

import css from "./auth.module.css";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<yup.InferType<typeof RegisterSchema>>({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending, error, isError, isSuccess } = useRegister();

  const onSubmit: SubmitHandler<yup.InferType<typeof RegisterSchema>> = (
    user,
  ) => {
    mutate(user);
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
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <p className={css.title}>Реєстрація</p>
        <div className={css.elementsWrapper}>
          <div className={css.element}>
            <label htmlFor="username" className={css.label}>
              Введіть Ваше імя:
            </label>
            <input
              type="text"
              id="username"
              {...register("username")}
              className={css.input}
              placeholder="Юрій Іванов"
              disabled={isPending}
            />
            <div className={css.error}>{errors.username?.message}</div>
          </div>
          <div className={css.element}>
            <label htmlFor="email" className={css.label}>
              Введіть Вашу електронну адресу:
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className={css.input}
              placeholder="example@gmail.com"
              disabled={isPending}
            />
            <div className={css.error}>{errors.email?.message}</div>
          </div>
          <div className={css.element}>
            <label htmlFor="password" className={css.label}>
              Придумайте пароль:
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className={css.input}
              placeholder="******"
              disabled={isPending}
            />
            <div className={css.error}>{errors.password?.message}</div>
          </div>
          <div className={css.element}>
            <label htmlFor="confirmPassword" className={css.label}>
              Підтвердьте придуманий пароль:
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
              className={css.input}
              placeholder="******"
              disabled={isPending}
            />
            <div className={css.error}>{errors.confirmPassword?.message}</div>
          </div>
        </div>
        <button className={css.button} type="submit" disabled={isPending}>
          Зареєструватись
        </button>
        <Link href="/admin/login" className={css.link}>
          Вже є акаунт? Увійти
        </Link>
      </form>
    </div>
  );
};

export default Register;
