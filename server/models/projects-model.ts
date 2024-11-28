import Joi from "joi";
import mongoose, { model, models, Schema } from "mongoose";

import handleSchemaValidationErrors from "@/errors/handleSchemaValidationErrors";

const sectionSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId, auto: true },
    sectionType: {
      type: String,
      enum: ["paragraph", "title", "subtitle", "budgetCards", "imageList"],
      required: true,
    },
    content: {
      type: Schema.Types.Mixed,
      required: true,
      set: function (this: { sectionType: string }, value: any) {
        if (this.sectionType === "budgetCards") {
          return Array.isArray(value)
            ? value.map((item) => ({
                id: item.id || new mongoose.Types.ObjectId(),
                ...item,
              }))
            : [];
        }
        return value;
      },
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

const projectSchema = new Schema(
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

projectSchema.post("save", handleSchemaValidationErrors);

export const ProjectsModel = models.Project || model("Project", projectSchema);

export const sectionJoiSchema = Joi.object({
  id: Joi.string(),
  sectionType: Joi.string()
    .valid("paragraph", "title", "subtitle", "budgetCards", "imageList")
    .required(),
  content: Joi.alternatives().conditional("sectionType", {
    switch: [
      { is: "title", then: Joi.string().required() },
      { is: "subtitle", then: Joi.string().required() },
      { is: "paragraph", then: Joi.array().items(Joi.string()).required() },
      {
        is: "budgetCards",
        then: Joi.array()
          .items(
            Joi.object({
              id: Joi.string(),
              title: Joi.string().allow(""),
              amount: Joi.string().allow(null),
            }),
          )
          .required(),
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

export const projectSchemaJoi = Joi.object({
  ua: languageJoiSchema.required(),
  en: languageJoiSchema.required(),
  workDirectionsType: Joi.array()
    .items(
      Joi.string().valid(
        "medicine",
        "electric",
        "education",
        "restoration",
        "culture",
      ),
    )
    .required(),
  isPosted: Joi.boolean().default(false),
});

export const updateLanguageJoiSchema = Joi.object({
  cardTitle: Joi.string().allow("").trim(),
  mainImg: Joi.string().allow(""),
  sections: Joi.array().items(sectionJoiSchema),
}).optional();

export const projectUpdateSchemaJoi = Joi.object({
  ua: updateLanguageJoiSchema,
  en: updateLanguageJoiSchema,
  workDirectionsType: Joi.array()
    .items(
      Joi.string().valid(
        "medicine",
        "electric",
        "education",
        "restoration",
        "culture",
      ),
    )
    .optional(),
  isPosted: Joi.boolean().optional(),
});
