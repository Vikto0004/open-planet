import handleSchemaValidationErrors from "@/errors/handleSchemaValidationErrors";
import Joi from "joi";
import mongoose, { Schema, model, models } from "mongoose";



const homeSchema = new Schema({
  language: { type: String, require: true, unique: true },
  hero: {
    type: String,
    require: true,
  },
  aboutFond: {
    title: { type: String, require: true },
    description: { type: String, require: true },
  },
  workDirections: [
    { type: mongoose.Schema.Types.ObjectId, ref: "WorkDirection" },
  ],
});

homeSchema.post("save", handleSchemaValidationErrors);

export const homeJoiSchema = Joi.object({
  language: Joi.string().required(),
  hero: Joi.string().required(),
  aboutFond: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
  }),
});

export const HomeModel = models.Home || model("Home", homeSchema);
