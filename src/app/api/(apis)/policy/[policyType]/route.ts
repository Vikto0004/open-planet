import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { PoliciesModel, policyJoiSchema } from "@/models/policies-model";
import { getDataFromToken } from "@/services/tokenServices";

export async function GET(
  req: NextRequest,
  { params }: { params: { policyType: string } },
) {
  try {
    const { policyType } = params;

    if (!policyType) throw errorHandler("Bad request", 400);

    if (policyType && !["privacyPolicy", "publicOffer"].includes(policyType))
      throw errorHandler("Bad request wrong type", 400);

    const policyRes = await PoliciesModel.find({ type: policyType });

    if (!policyRes)
      throw errorHandler("Policy by this language is not found", 404);

    return NextResponse.json({
      policyRes,
    });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { policyType: string } },
) {
  try {
    const userData = getDataFromToken(req);
    if (userData?.role !== "admin") {
      throw errorHandler("Not authorized or not admin", 403);
    }

    const { policyType } = params;

    if (!policyType) throw errorHandler("Policy type is required", 400);

    const requestBody = await req.json();

    const { error } = policyJoiSchema.validate({
      type: policyType,
      ...requestBody,
    });
    if (error) {
      return NextResponse.json(
        {
          message: "Validation error",
          details: error.details,
        },
        { status: 400 },
      );
    }
    const policy = await PoliciesModel.findOne({ type: policyType });

    if (!policy) {
      throw errorHandler(`Policy with type '${policyType}' not found`, 404);
    }
    policy.ua = requestBody.ua;
    policy.en = requestBody.en;

    await policy.save();

    return NextResponse.json(
      {
        message: "Policy updated successfully",
      },
      { status: 200 },
    );
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

    const { policyType } = params;

    if (!policyType) throw errorHandler("Block ID is required", 400);

    const newBlockId = String(new mongoose.Types.ObjectId());

    const policy = await PoliciesModel.findOne({ type: policyType });

    if (!policy) {
      throw errorHandler("Policy not found", 404);
    }

    if (policy.ua && policy.en) {
      if (Array.isArray(policy.ua.blocks) && Array.isArray(policy.en.blocks)) {
        policy.ua.blocks.push({
          id: newBlockId,
          children: [],
        });
        policy.en.blocks.push({
          id: newBlockId,
          children: [],
        });
      } else {
        policy.ua.blocks = [
          {
            id: newBlockId,
            children: [],
          },
        ];
        policy.en.blocks = [
          {
            id: newBlockId,
            children: [],
          },
        ];
      }
    }

    await policy.save();

    return NextResponse.json(
      {
        message: "Block added successfully",
        nodeId: newBlockId,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
