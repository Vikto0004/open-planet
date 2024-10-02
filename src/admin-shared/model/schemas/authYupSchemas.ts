import * as Yup from "yup";

const nameSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, (e) => e.value === "" ? "Name is required" : "Too Short!")
    .max(50, "Too Long!")
    .required("User name is required"),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, (e) => e.value === "" ? "Password is required" : "Password too short!").required("Required"),
});

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, (e) => e.value === "" ? "Password is required" : "Password too short!")
    .max(50, "Too Long!")
    .required("Password is required")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("This field is required"),
});
export const RegisterSchema = nameSchema.concat(SignInSchema);
