import { Schema, model, models } from "mongoose";

import handleSchemaValidationErrors from "@/helpers/handleSchemaValidationErrors";

const tokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  token: { type: String, require: true },
});

tokenSchema.post("save", handleSchemaValidationErrors);

const TokenModel = models?.Token || model("Token", tokenSchema);

export default TokenModel;
