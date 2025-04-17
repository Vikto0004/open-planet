import mongoose from "mongoose";

import { NextRequest, NextResponse } from "next/server";

import getLanguage from "@/helpers/getLanguage";

import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { getDataFromToken } from "@/services/tokenServices";

import { PoliciesModel, policyBlockJoiSchema } from "@/models/policies-model";


export async function GET(
  req: NextRequest,
  { params }: { params: { policyType: string } },
) {
  try {
    const language = await getLanguage(req);
    const { policyType } = params;

    if (!policyType) throw errorHandler("Bad request", 400);

    if (policyType && !["privacyPolicy", "publicOffer"].includes(policyType))
      throw errorHandler("Bad request wrong type", 400);

    const policyRes = await PoliciesModel.find({ type: policyType }).select(
      `type ${language}`,
    );

    if (!policyRes)
      throw errorHandler("Policy by this language is not found", 404);

    return NextResponse.json({
      policyRes,
    });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { policyType: string } },
) {
  try {
    const userData = getDataFromToken(req);
    if (userData?.role !== "admin") {
      throw errorHandler("Not authorized or not admin", 403);
    }

    const language = await getLanguage(req);

    const { policyType } = params;

    if (!policyType) throw errorHandler("Policy type is required", 400);

    const { tag } = await req.json();

    const newBlockId = String(new mongoose.Types.ObjectId());

    const policy = await PoliciesModel.findOne({ type: policyType }).select(
      `type ${language}`,
    );

    if (!policy) {
      throw errorHandler("Policy not found", 404);
    }

    const langData = policy[language];


    if (langData) {
      if (!Array.isArray(langData.blocks)) {
        langData.blocks = [];
      }

      const newBlock = {
        id: newBlockId,
        children: [],
        tag: tag,
      };

      const { value: validatedBlock, error } = policyBlockJoiSchema.validate(newBlock);

      if (error) {
        throw errorHandler("Invalid block data: " + error.message, 400);
      }

      langData.blocks.push(validatedBlock);

    }

    policy.set(language, langData);

    await policy.save();

    return NextResponse.json(
      {
        message: "Block added successfully",
        blockId: newBlockId,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}