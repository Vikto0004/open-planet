import mongoose, { model, models, Schema } from "mongoose";

import handleSchemaValidationErrors from "@/errors/handleSchemaValidationErrors";

const newsSchema = new Schema(
  {
    language: { type: mongoose.Schema.Types.ObjectId, ref: "home" },
    cardHeader: { type: String, default: "" },
    cardSubtitle: { type: String, default: "" },
    mainImg: { type: String, default: null },

    firstTitle: { type: String, default: "" },
    firstDescription: { type: String, default: "" },
    secondTitle: { type: String, default: "" },
    secondDescription: { type: String, default: "" },

    images: [{ type: String, default: null }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

newsSchema.post("save", handleSchemaValidationErrors);

export const NewsModel = models.News || model("News", newsSchema);
