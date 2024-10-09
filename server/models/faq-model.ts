import Joi from "joi";
import { model, models, Schema } from "mongoose";

import handleSchemaValidationErrors from "@/errors/handleSchemaValidationErrors";

const faqSchema = new Schema({
  language: { type: String, require: true, immutable: true },
  isPosted: { type: Boolean, require: true, default: false },
  question: { type: String, require: true, default: "" },
  answer: { type: String, require: true, default: "" },
});

faqSchema.post("save", handleSchemaValidationErrors);

export const faqSchemaJoi = Joi.object({
  question: Joi.string().required().trim(),
  answer: Joi.string().required().trim(),
  isPosted: Joi.boolean().required(),
});

export const createFaqSchemaJoi = Joi.object({
  language: Joi.string().valid("uk", "en").required(),
});

export const FaqModel = models.Faq || model("Faq", faqSchema);
