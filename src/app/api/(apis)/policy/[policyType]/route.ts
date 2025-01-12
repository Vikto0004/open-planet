import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { PoliciesModel, policyJoiSchema } from "@/models/policies-model";

export async function GET(req: NextRequest,
  { params }: { params: { policyType: string } }) {
  try {
    const { policyType } = params

    if (!policyType) throw errorHandler("Bad request", 400);

    if (
      policyType &&
      ![
        "privacyPolicy", "publicOffer"
      ].includes(policyType)
    ) throw errorHandler("Bad request wrong type", 400);



    const policyRes = await PoliciesModel.find({ type: policyType })

    if (!policyRes)
      throw errorHandler("Policy by this language is not found", 404);

    return NextResponse.json({
      policyRes
    });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
