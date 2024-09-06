import Joi from "joi";
import { Schema, model, models } from "mongoose";

import handleSchemaValidationErrors from "@/helpers/handleSchemaValidationErrors";

const emailRegexp = /^[\w.]+@[\w]+.[\w]+$/;

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: [true, "Username is required"],
    },
    email: {
      type: String,
      require: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["mainAdmin", "admin"],
      default: "admin",
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post("save", handleSchemaValidationErrors);

export const registrationSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.ref("password"),
});

export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const UserModel = models.User || model("User", userSchema);

export default userSchema;
