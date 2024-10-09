import Joi from "joi";
import { Schema, model, models } from "mongoose";

import handleSchemaValidationErrors from "@/errors/handleSchemaValidationErrors";

const emailRegexp = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "admin",
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post("save", handleSchemaValidationErrors);

export const registrationSchema = Joi.object({
  username: Joi.string().trim().required().empty("").min(3).max(45).messages({
    "any.required": "Username is required.",
    "string.min": "Username must be at least 3 characters long.",
    "string.max": "Username must be at most 45 characters long.",
    "string.base": "Username must be a string.",
  }),
  email: Joi.string().trim().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Please provide a valid email address.",
    "any.required": "Email is required.",
  }),
  password: Joi.string().trim().min(6).required().messages({
    "any.required": "Password is required.",
  }),
  confirmPassword: Joi.valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match.",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const UserModel = models.User || model("User", userSchema);

export default userSchema;
