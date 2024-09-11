import handleSchemaValidationErrors from "@/errors/handleSchemaValidationErrors";
import Joi from "joi";
import mongoose, { model, models, Schema } from "mongoose";



const workDirectionSchema = new Schema({
  language: { type: mongoose.Schema.Types.ObjectId, ref: "home" },
  header: { type: String, require: true },
  description: { type: String, require: true },
  url: { type: String, require: true },
});

workDirectionSchema.post("save", handleSchemaValidationErrors);

export const workDirectionSchemaJoi = Joi.object({
  header: Joi.string().required(),
  description: Joi.string().required(),
  url: Joi.string().uri().required(),
});

export const workDirectionsModel =
  models.workDirection || model("workDirection", workDirectionSchema);
