import Joi from "joi";
import { Schema, model, models } from "mongoose";

import handleSchemaValidationErrors from "@/errors/handleSchemaValidationErrors";

import { nodeSchemaJoi } from "./vacancy-model";

const nodeSchema = new Schema({
  tag: { type: String, required: true },
  className: { type: String },
  style: { type: Object },
  href: { type: String },
  content: { type: String },
  children: [{ type: Schema.Types.Mixed, default: [] }],
});

const localizedDataSchema = new Schema(
  {
    title: { type: String, required: true },
    relevant: { type: String, required: true },
    description: { type: [nodeSchema], required: true },
  },
  { _id: false },
);

const tendersSchema = new Schema(
  {
    ua: { type: localizedDataSchema, required: true },
    en: { type: localizedDataSchema, required: true },
    isPosted: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  },
);

tendersSchema.post("save", handleSchemaValidationErrors);

export const TendersModel = models.Tenders || model("Tenders", tendersSchema);

export const localizedDataSchemaJoi = Joi.object({
  title: Joi.string().required(),
  relevant: Joi.string().required(),
  description: nodeSchemaJoi.required(),
});

export const updateLocalizedTendersSchemaJoi = Joi.object({
  title: Joi.string(),
  relevant: Joi.string(),
  description: Joi.array().items(nodeSchemaJoi),
});

export const tendersSchemaJoi = Joi.object({
  ua: localizedDataSchemaJoi.required(),
  en: localizedDataSchemaJoi.required(),
  isPosted: Joi.boolean().default(false),
});
