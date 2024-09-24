import mongoose, { model, models, Schema } from "mongoose";

import handleSchemaValidationErrors from "@/errors/handleSchemaValidationErrors";

const newsSchema = new Schema(
  {
    language: { type: mongoose.Schema.Types.ObjectId, ref: "home" },
    header: { type: String, default: "" },
    description: { type: String, default: "" },
    url: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

newsSchema.post("save", handleSchemaValidationErrors);

export const NewsModel = models.News || model("News", newsSchema);
