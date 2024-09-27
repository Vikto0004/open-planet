import Joi from "joi";
import mongoose, { Schema, model, models } from "mongoose";

import handleSchemaValidationErrors from "@/errors/handleSchemaValidationErrors";

const homeSchema = new Schema({
  language: { type: String, require: true, unique: true },
  news: [{ type: mongoose.Schema.Types.ObjectId, ref: "News" }],
  faq: [{ type: mongoose.Schema.Types.ObjectId, ref: "Faq" }],
});

homeSchema.post("save", handleSchemaValidationErrors);

export const homeJoiSchema = Joi.object({
  language: Joi.string().required(),
});

export const HomeModel = models.Home || model("Home", homeSchema);
