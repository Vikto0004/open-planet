import Joi from "joi";
import mongoose, { model, models, Schema } from "mongoose";

import handleSchemaValidationErrors from "@/errors/handleSchemaValidationErrors";

const nodeSchema = new Schema(
    {
        tag: { type: String, required: true },
        className: { type: String },
        style: { type: Map, of: String },
        href: { type: String },
        content: { type: String },
        children: [{ type: Schema.Types.ObjectId, ref: "Node" }],
    },
    { timestamps: true }
);


export const NodeModel = models.Node || model("Node", nodeSchema);


export const nodeJoiSchema = Joi.object({
    tag: Joi.string().required(),
    className: Joi.string().allow(""),
    style: Joi.object().pattern(Joi.string(), Joi.string()).allow(null),
    href: Joi.string().uri().allow(""),
    content: Joi.string().allow(""),
    children: Joi.array().items(Joi.string().optional()),
});


const policyBlockSchema = new Schema(
    {
        tag: { type: String, required: true },
        className: { type: String },
        children: [{ type: Schema.Types.ObjectId, ref: "Node" }],
    },
    { _id: false }
);

const policyLocalizationSchema = new Schema(
    {
        title: { type: String, required: true },
        subtitle: { type: String },
        blocks: [policyBlockSchema],
    },
    { _id: false }
);

const policySchema = new Schema(
    {
        type: { type: String, enum: ["privacyPolicy", "publicOffer"], required: true, unique: true },
        ua: { type: policyLocalizationSchema, required: true },
        en: { type: policyLocalizationSchema, required: true },
    },
    { timestamps: true }
);

export const PoliciesModel = models.Policy || model("Policy", policySchema);

policySchema.post("save", handleSchemaValidationErrors);
nodeSchema.post("save", handleSchemaValidationErrors);

export const policyBlockJoiSchema = Joi.object({
    tag: Joi.string().required(),
    className: Joi.string().allow(""),
    children: Joi.array().items(Joi.string().optional()),
});

export const policyLocalizationJoiSchema = Joi.object({
    title: Joi.string().required(),
    subtitle: Joi.string().allow(""),
    blocks: Joi.array().items(policyBlockJoiSchema).required(),
});


export const policyJoiSchema = Joi.object({
    type: Joi.string().valid("privacyPolicy", "publicOffer").required(),
    ua: policyLocalizationJoiSchema.required(),
    en: policyLocalizationJoiSchema.required(),
});
