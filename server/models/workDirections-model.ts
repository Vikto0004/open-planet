import Joi from "joi";
import { model, models, Schema } from "mongoose";
import handleSchemaValidationErrors from "@/errors/handleSchemaValidationErrors";

const sectionSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId, auto: true },
    type: {
      type: String,
      enum: ["paragraph", "title", "subtitle", "list", "budgetCards", "imageList"],
      required: true,
    },
    content: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { _id: false }
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
  { _id: false }
);

const workDirectionSchema = new Schema(
  {
    ua: { type: languageSchema, required: true },
    en: { type: languageSchema, required: true },
    isPosted: { type: Boolean, required: true, default: false },
    workDirectionsType: {
      type: [String],
      enum: ["medicine", "electric", "education", "restoration", "culture"],
      required: true,
    },
  },
  { timestamps: true },
);

workDirectionSchema.post("save", handleSchemaValidationErrors);

export const WorkDirectionsModel =
  models.WorkDirection || model("WorkDirection", workDirectionSchema);

export const sectionJoiSchema = Joi.object({
  id: Joi.string(),
  type: Joi.string()
    .valid("paragraph", "title", "subtitle", "list", "budgetCards", "imageList")
    .required(),
  content: Joi.alternatives().conditional("type", {
    switch: [
      { is: "paragraph", then: Joi.string().required() },
      { is: "title", then: Joi.string().required() },
      { is: "subtitle", then: Joi.string().required() },
      { is: "list", then: Joi.array().items(Joi.string()).required() },
      {
        is: "budgetCards", then: Joi.array().items(
          Joi.object({
            title: Joi.string().allow(""),
            amount: Joi.number().allow(null),
          })
        ).required()
      },
      { is: "imageList", then: Joi.array().items(Joi.string()).required() },
    ],
    otherwise: Joi.any().forbidden(),
  }),
});

const languageJoiSchema = Joi.object({
  cardTitle: Joi.string().trim().required(),
  mainImg: Joi.string().allow(""),
  sections: Joi.array().items(sectionJoiSchema),
});

export const workDirectionSchemaJoi = Joi.object({
  ua: languageJoiSchema.required(),
  en: languageJoiSchema.required(),
  workDirectionsType: Joi.array().items(
    Joi.string()
      .valid("medicine", "electric", "education", "restoration", "culture")
  ).required(),
  isPosted: Joi.boolean().default(false),
});

export const updateLanguageJoiSchema = Joi.object({
  cardTitle: Joi.string().allow("").trim(),
  mainImg: Joi.string().allow(""),
  sections: Joi.array().items(sectionJoiSchema),
}).optional();

export const workDirectionUpdateSchemaJoi = Joi.object({
  ua: updateLanguageJoiSchema,
  en: updateLanguageJoiSchema,
  workDirectionsType: Joi.array().items(
    Joi.string()
      .valid("medicine", "electric", "education", "restoration", "culture")
  ).optional(),
  isPosted: Joi.boolean().optional(),
});