import handleSchemaValidationErrors from "@/errors/handleSchemaValidationErrors";
import Joi from "joi";
import mongoose, { model, models, Schema } from "mongoose";



const questionSchema = new Schema({
  language: { type: mongoose.Schema.Types.ObjectId, ref: "home" },
  question: { type: String, require: true, default: '' },
  answer: { type: String, require: true, default: '' },

});

questionSchema.post("save", handleSchemaValidationErrors);

export const questionSchemaJoi = Joi.object({
  question: Joi.string().required(),
  answer: Joi.string().required(),
});

export const QuestionModel =
  models.Question || model("Question", questionSchema);
