import Joi from "joi";
import { model, models, Schema } from "mongoose";

import handleSchemaValidationErrors from "@/errors/handleSchemaValidationErrors";

const contactsSchema = new Schema({
  language: { type: String, require: true, immutable: true },
  address: { type: String, require: true, default: "" },
  phoneNumber: { type: String, require: true, default: "" },
  email: { type: String, require: true, default: "" },
  facebookLink: { type: String, default: "" },
  instagramLink: { type: String, default: "" },
});

contactsSchema.post("save", handleSchemaValidationErrors);

export const contactsSchemaJoi = Joi.object({
  address: Joi.string().required().trim(),
  phoneNumber: Joi.string().required().trim(),
  email: Joi.string().required().trim(),
  facebookLink: Joi.string().trim(),
  instagramLink: Joi.string().trim(),
});

export const createContactsSchemaJoi = Joi.object({
  language: Joi.string().valid("uk", "en").required(),
});

export const FaqModel = models.Contacts || model("Contacts", contactsSchema);
