import Joi from "joi";
import { Schema, model, models } from "mongoose";

import handleSchemaValidationErrors from "@/errors/handleSchemaValidationErrors";

const nodeSchema = new Schema(
  {
    tag: { type: String, required: true },
    className: { type: String, default: "" },
    style: { type: Object, default: {} },
    href: { type: String, default: "" },
    content: { type: String, default: "" },
    children: [{ type: Object }],
  },
  { _id: false },
);

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

const nodeSchemaJoi = Joi.object({
  tag: Joi.string().required(),
  className: Joi.string().optional().allow(""),
  style: Joi.object().pattern(
    Joi.string(),
    Joi.alternatives(Joi.string(), Joi.number()),
  ),
  href: Joi.string().uri().optional().allow(""),
  content: Joi.string().optional().allow(""),
  children: Joi.array().items(Joi.link("#nodeSchemaJoi")).optional(),
}).id("nodeSchemaJoi");

const localizedDataSchemaJoi = Joi.object({
  title: Joi.string().required(),
  employment: Joi.string().required(),
  region: Joi.string().required(),
  description: Joi.array().items(nodeSchemaJoi).required(),
});

export const updateLocalizedSchemaJoi = Joi.object({
  title: Joi.string(),
  employment: Joi.string(),
  region: Joi.string(),
  description: Joi.array().items(nodeSchemaJoi),
});

export const vacancySchemaJoi = Joi.object({
  ua: localizedDataSchemaJoi.required(),
  en: localizedDataSchemaJoi.required(),
  isPosted: Joi.boolean().default(false),
});
