import handleSchemaValidationErrors from "@/helpers/handleSchemaValidationErrors";
import Joi from "joi";
import { Schema, model, models } from "mongoose";

const emailRegexp = /^[\w.]+@[\w]+.[\w]+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
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
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordTokenExp: {
      type: Date,
    },
    verifyToken: {
      type: String,
    },
    verifyTokenExp: {
      type: Date,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post("save", handleSchemaValidationErrors);

export const registrationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  repeat_password: Joi.ref("password"),
});

export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const User = models.User || model("User", userSchema);

export default userSchema;
