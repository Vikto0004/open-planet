import Joi from "joi";
import { model, models, Schema } from "mongoose";

import handleSchemaValidationErrors from "@/errors/handleSchemaValidationErrors";

const sectionTextSchema = new Schema({
  id: { type: Schema.Types.ObjectId, ref: "workDirection" },
  title: { type: String, default: "" },
  text: { type: String, default: "" },
});

sectionTextSchema.post("save", handleSchemaValidationErrors);

export const sectionTextSchemaJoi = Joi.object({
  title: Joi.string().allow(""),
  text: Joi.string().allow(""),
});

export const createSectionTextSchemaJoi = Joi.object({});

export const SectionTextModel =
  models.SectionText || model("SectionText", sectionTextSchema);

export default sectionTextSchema;
