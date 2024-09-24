import handleSchemaValidationErrors from "@/errors/handleSchemaValidationErrors";
import Joi from "joi";
import mongoose, { Schema, model, models } from "mongoose";



const homeSchema = new Schema({
  language: { type: String, require: true, unique: true },
  news: [
    { type: mongoose.Schema.Types.ObjectId, ref: "News" },
  ],

});

homeSchema.post("save", handleSchemaValidationErrors);

export const homeJoiSchema = Joi.object({
  language: Joi.string().required(),
});

export const HomeModel = models.Home || model("Home", homeSchema);
