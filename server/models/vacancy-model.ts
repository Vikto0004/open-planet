import Joi from "joi";
import { Schema, model, models } from "mongoose";

import handleSchemaValidationErrors from "@/errors/handleSchemaValidationErrors";

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
    employment: { type: String, required: true },
    region: { type: String, required: true },
    description: { type: [nodeSchema], required: true },
  },
  { _id: false },
);

const vacancySchema = new Schema(
  {
    ua: { type: localizedDataSchema, required: true },
    en: { type: localizedDataSchema, required: true },
    isPosted: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  },
);

vacancySchema.post("save", handleSchemaValidationErrors);

export const VacancyModel = models.Vacancy || model("Vacancy", vacancySchema);

export const nodeSchemaJoi = Joi.array().items(
  Joi.object({
    tag: Joi.string().required(),
    className: Joi.string().optional().allow(""),
    style: Joi.object().pattern(
      Joi.string(),
      Joi.alternatives(Joi.string(), Joi.number()),
    ),
    href: Joi.string().uri().optional().allow(""),
    content: Joi.string().optional().allow(""),
    children: Joi.array().items(Joi.link("#nodeSchemaJoi")).optional(),
  }).id("nodeSchemaJoi"),
);

export const localizedDataSchemaJoi = Joi.object({
  title: Joi.string().required(),
  employment: Joi.string().required(),
  region: Joi.string().required(),
  description: nodeSchemaJoi.required(),
});

export const updateLocalizedSchemaJoi = Joi.object({
  title: Joi.string(),
  employment: Joi.string(),
  region: Joi.string(),
  description: nodeSchemaJoi,
});

export const vacancySchemaJoi = Joi.object({
  ua: localizedDataSchemaJoi.required(),
  en: localizedDataSchemaJoi.required(),
  isPosted: Joi.boolean().default(false),
});
