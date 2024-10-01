import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

import { IFormRegistration } from "@/admin-components/auth/authInterfaces";
import { RegisterSchema } from "@/admin-components/auth/authYupSchemas";

import css from "./auth.module.css";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormRegistration>({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit: SubmitHandler<IFormRegistration> = (data) => {
    console.log(data);
  };
  return (
    <div className={css.container}>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <p className={css.title}>Реєстрація</p>
        <div className={css.elementsWrapper}>
          <div className={css.element}>
            <label htmlFor="username" className={css.label}>Введіть Ваше імя:</label>
            <input
              type="text"
              id="username"
              {...register("username")}
              className={css.input}
              placeholder="Юрій Іванов"
            />
            <div className={css.error}>{errors.username?.message}</div>
          </div>
          <div className={css.element}>
            <label htmlFor="email" className={css.label}>Введіть Вашу електронну адресу:</label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className={css.input}
              placeholder="example@gmail.com"
            />
            <div className={css.error}>{errors.email?.message}</div>
          </div>
          <div className={css.element}>
            <label htmlFor="password" className={css.label}>Придумайте пароль:</label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className={css.input}
              placeholder="qwerty123"
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
              placeholder="qwerty123"
            />
            <div className={css.error}>{errors.confirmPassword?.message}</div>
          </div>
        </div>
        <button className={css.button} type="submit">
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
