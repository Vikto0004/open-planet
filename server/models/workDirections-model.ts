import Joi from "joi";
import { model, models, Schema } from "mongoose";

import handleSchemaValidationErrors from "@/errors/handleSchemaValidationErrors";

const defaultBudgetCards = [
  { title: "", emount: "" },
  { title: "", emount: "" },
  { title: "", emount: "" },
];

const workDirectionSchema = new Schema(
  {
    language: { type: String, require: true, immutable: true },
    cardTitle: { type: String, default: "" },
    mainImg: { type: String, default: "" },

    firstTitle: { type: String, default: "" },
    firstDescription: { type: String, default: "" },
    secondTitle: { type: String, default: "" },
    secondDescription: { type: String, default: "" },
    subtitleFirst: { type: String, default: "" },
    porpuseText: { type: String, default: "" },
    subtitleSecond: { type: String, default: "" },
    workDirectionsType: {
      type: [String],
      default: [],
      enum: ["medecine", "electric", "education", "restoration", "culture"],
      require: true,
    },
    budjetsCards: {
      type: [
        {
          title: {
            type: String,
            default: "",
          },
          emount: {
            type: Number,
            default: "",
          },
        },
      ],
      default: defaultBudgetCards,
    },
    images: [{ type: String, default: null }],
  },
  { timestamps: true },
);

workDirectionSchema.post("save", handleSchemaValidationErrors);

export const workDirectionSchemaJoi = Joi.object({
  cardTitle: Joi.string().allow(""),
  mainImg: Joi.string().allow(""),
  firstTitle: Joi.string().allow(""),
  firstDescription: Joi.string().allow(""),
  secondTitle: Joi.string().allow(""),
  secondDescription: Joi.string().allow(""),
  subtitleFirst: Joi.string().allow(""),
  porpuseText: Joi.string().allow(""),
  subtitleSecond: Joi.string().allow(""),
  workDirectionsType: Joi.array().items(
    Joi.string()
      .valid("medecine", "electric", "education", "restoration", "culture")
      .messages({
        language: "Type is not valid",
      }),
  ),
  budjetsCards: Joi.array().items(
    Joi.object({
      _id: Joi.string(),
      title: Joi.string().allow(""),
      emount: Joi.number().allow(null),
    }),
  ),
  images: Joi.array().items(Joi.string()),
});

export const createWorkDirectionSchemaJoi = Joi.object({
  language: Joi.string()
    .valid("uk", "en")
    .messages({
      language: "Language is required",
    })
    .required(),
});

export const WorkDirectionsModel =
  models.WorkDirection || model("WorkDirection", workDirectionSchema);
