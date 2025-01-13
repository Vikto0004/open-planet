import Joi from "joi";
import { model, models, Schema, Document, Model } from "mongoose";

import handleSchemaValidationErrors from "@/errors/handleSchemaValidationErrors";

const nodeSchema = new Schema(
    {
        id: { type: Schema.Types.ObjectId },
        tag: { type: String },
        className: { type: String },
        style: { type: Map, of: String },
        href: { type: String },
        content: { type: String },
        children: [{ type: Schema.Types.Mixed }],
    },
    { _id: false }
);


export const nodeJoiSchema = Joi.object({
    id: Joi.string().required(),
    tag: Joi.string(),
    className: Joi.string().allow(""),
    style: Joi.object().pattern(Joi.string(), Joi.string()).allow(null),
    href: Joi.string().uri().allow(""),
    content: Joi.string().allow(""),
    children: Joi.array(),
});


const policyBlockSchema = new Schema(
    {
        id: { type: Schema.Types.ObjectId },
        tag: { type: String },
        className: { type: String },
        children: [nodeSchema],
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
    { _id: false, timestamps: true }
);

export interface Node {
    id: string,
    tag?: string,
    className?: string,
    style?: Record<string, string>,
    href?: string,
    content?: string,
    children: Node[],
}
export interface Block {
    id: string,
    tag?: string,
    className?: string,
    children: Node[],
}
export interface Policy {
    type: "privacyPolicy" | "publicOffer";
    ua: {
        title: string;
        subtitle: string;
        blocks: Block[];
    };
    en: {
        title: string;
        subtitle: string;
        blocks: Block[];
    };
}
policySchema.statics.ensureDefaults = async function () {
    const defaults = [
        {
            type: "privacyPolicy",
            ua: {
                title: "Політика конфіденційності",
                subtitle: "Захист даних користувачів",
                blocks: [],
            },
            en: {
                title: "Privacy Policy",
                subtitle: "User Data Protection",
                blocks: [],
            },
        },
        {
            type: "publicOffer",
            ua: {
                title: "Публічна оферта",
                subtitle: "Умови угоди",
                blocks: [],
            },
            en: {
                title: "Public Offer",
                subtitle: "Terms of Agreement",
                blocks: [],
            },
        },
    ];
    for (const policy of defaults) {
        const exists = await this.findOne({ type: policy.type });
        if (!exists) {
            await this.create(policy);
        }
    }
};

interface PolicyModel extends Model<Policy & Document> {
    ensureDefaults: () => Promise<void>;
}


export const PoliciesModel: PolicyModel = models.Policy as PolicyModel || model<Policy & Document>("Policy", policySchema);


PoliciesModel.ensureDefaults();

policySchema.post("save", handleSchemaValidationErrors);

export const policyBlockJoiSchema = Joi.object({
    id: Joi.string().required(),
    tag: Joi.string(),
    className: Joi.string().allow(""),
    children: Joi.array().items(nodeJoiSchema).required(),
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
