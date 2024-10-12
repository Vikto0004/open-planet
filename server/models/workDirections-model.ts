import Joi from "joi";
import { model, models, Schema } from "mongoose";

import handleSchemaValidationErrors from "@/errors/handleSchemaValidationErrors";

const defaultBudgetCards = [
  { title: "", amount: "" },
  { title: "", amount: "" },
  { title: "", amount: "" },
];

const workDirectionSchema = new Schema(
  {
    language: { type: String, require: true, immutable: true },
    cardTitle: { type: String, default: "" },
    mainImg: { type: String, default: "" },
    isPosted: { type: Boolean, require: true, default: false },
    workDirectionsTexts: [
      {
        type: Schema.Types.ObjectId,
        ref: "WorkDirectionText",
      },
    ],

    workDirectionsType: {
      type: [String],
      default: [],
      enum: ["medicine", "electric", "education", "restoration", "culture"],
      require: true,
    },
    budgetsCards: {
      type: [
        {
          title: {
            type: String,
            default: "",
          },
          amount: {
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
  cardTitle: Joi.string().allow("").trim(),
  mainImg: Joi.string().allow(""),
  workDirectionsTexts: Joi.array().items(Joi.string()),
  workDirectionsType: Joi.array().items(
    Joi.string()
      .valid("medicine", "electric", "education", "restoration", "culture")
      .messages({
        language: "Type is not valid",
      }),
  ),
  isPosted: Joi.boolean().default(false),
  budgetsCards: Joi.array().items(
    Joi.object({
      _id: Joi.string(),
      title: Joi.string().allow(""),
      amount: Joi.number().allow(null),
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
