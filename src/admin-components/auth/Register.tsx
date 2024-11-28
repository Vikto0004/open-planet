import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";

import { useRegister } from "@/admin-shared/hooks/auth/useRegister";
import { RegisterSchema } from "@/admin-shared/model/schemas/authYupSchemas";
import FormError from "@/admin-widgets/forms/formError/FormError";
import { Notification } from "@/admin-widgets/Notification/notification";

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
            <TextField
              type="text"
              id="username"
              {...register("username")}
              variant="outlined"
              label="Введіть Ваше імя"
              disabled={isPending}
            />
            {errors.username?.message && (
              <FormError>{errors.username.message}</FormError>
            )}
          </div>
          <div className={css.element}>
            <TextField
              type="email"
              id="email"
              {...register("email")}
              variant="outlined"
              label="Введіть Вашу електронну адресу"
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
              {...register("password")}
              variant="outlined"
              label="Придумайте пароль"
              disabled={isPending}
            />
            {errors.password?.message && (
              <FormError>{errors.password.message}</FormError>
            )}
          </div>
          <div className={css.element}>
            <TextField
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
              label="Підтвердьте придуманий пароль"
              variant="outlined"
              disabled={isPending}
            />
            {errors.confirmPassword?.message && (
              <FormError>{errors.confirmPassword.message}</FormError>
            )}
          </div>
          <Button variant="contained" type="submit" disabled={isPending}>
            Зареєструватись
          </Button>
        </div>
        <Link href="/admin/login" className={css.link}>
          Вже є акаунт? Увійти
        </Link>
      </form>
    </div>
  );
};

export default Register;
