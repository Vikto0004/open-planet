import Joi from "joi";
import { model, models, Schema } from "mongoose";

import handleSchemaValidationErrors from "@/errors/handleSchemaValidationErrors";

const sectionSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId, auto: true },
    sectionType: {
      type: String,
      enum: ["paragraph", "title", "subtitle", "imageList"],
      required: true,
    },
    content: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { _id: false },
);

const languageSchema = new Schema(
  {
    cardTitle: { type: String, default: "" },
    mainImg: { type: String, default: "" },
    sections: {
      type: [sectionSchema],
      default: [],
    },
  },
  { _id: false },
);

const newsSchema = new Schema(
  {
    ua: { type: languageSchema, required: true },
    en: { type: languageSchema, required: true },
    isPosted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

newsSchema.post("save", handleSchemaValidationErrors);

export const NewsModel = models.News || model("News", newsSchema);


export const sectionJoiSchema = Joi.object({
  id: Joi.string(),
  sectionType: Joi.string()
    .valid("paragraph", "title", "subtitle", "imageList")
    .required(),
  content: Joi.alternatives().conditional("sectionType", {
    switch: [
      { is: "title", then: Joi.string().default("").required() },
      { is: "subtitle", then: Joi.string().default("").required() },
      { is: "paragraph", then: Joi.array().items(Joi.string()).default([]).required() },
      { is: "imageList", then: Joi.array().items(Joi.string()).default([]).required() },
    ],
    otherwise: Joi.any().forbidden(),
  }),
});

const languageJoiSchema = Joi.object({
  cardTitle: Joi.string().trim().required(),
  mainImg: Joi.string().allow(""),
  sections: Joi.array().items(sectionJoiSchema),
});

export const newsSchemaJoi = Joi.object({
  ua: languageJoiSchema.required(),
  en: languageJoiSchema.required(),
  isPosted: Joi.boolean().default(false),
});

export const updateLanguageJoiSchema = Joi.object({
  cardTitle: Joi.string().allow("").trim(),
  mainImg: Joi.string().allow(""),
  sections: Joi.array().items(sectionJoiSchema),
}).optional();

export const newUpdateSchemaJoi = Joi.object({
  ua: updateLanguageJoiSchema,
  en: updateLanguageJoiSchema,
  isPosted: Joi.boolean().optional(),
});
