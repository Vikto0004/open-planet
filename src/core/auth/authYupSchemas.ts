import * as Yup from "yup";

const nameSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("User name is required"),
});

export const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Password is required")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

export const SignUpSchema = nameSchema.concat(SignInSchema);
