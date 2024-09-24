import Joi from "joi";
import { model, models, Schema } from "mongoose";

import handleSchemaValidationErrors from "@/errors/handleSchemaValidationErrors";

const defaultBudgetCards = [
  { title: "", emount: "" },
  { title: "", emount: "" },
  { title: "", emount: "" },
];

const workDirectionSchema = new Schema({
  language: { type: String, require: true },
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

  images: [{ type: String, default: "" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

workDirectionSchema.post("save", handleSchemaValidationErrors);

export const workDirectionSchemaJoi = Joi.object({
  language: Joi.string()
    .valid("uk", "en")
    .messages({
      language: "Language is required",
    })
    .required(),
});

export const WorkDirectionsModel =
  models.WorkDirection || model("WorkDirection", workDirectionSchema);
