import handleSchemaValidationErrors from "@/errors/handleSchemaValidationErrors";

import mongoose, { model, models, Schema } from "mongoose";



const newsSchema = new Schema({
  language: { type: mongoose.Schema.Types.ObjectId, ref: "home" },
  header: { type: String, default: '' },
  description: { type: String, default: '' },
  url: { type: String, default: '' },
});

newsSchema.post("save", handleSchemaValidationErrors);



export const NewsModel =
  models.News || model("News", newsSchema);
