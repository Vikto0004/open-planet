import Joi from "joi";
import mongoose, { model, models, Schema } from "mongoose";

import handleSchemaValidationErrors from "@/errors/handleSchemaValidationErrors";

const faqSchema = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: "home" },
  language: { type: String, require: true, immutable: true },
  question: { type: String, require: true, default: "" },
  answer: { type: String, require: true, default: "" },
});

faqSchema.post("save", handleSchemaValidationErrors);

export const faqSchemaJoi = Joi.object({
  question: Joi.string().required(),
  answer: Joi.string().required(),
});

export const createFaqSchemaJoi = Joi.object({
  language: Joi.string().valid("uk", "en").required(),
});

export const FaqModel = models.Faq || model("Faq", faqSchema);
