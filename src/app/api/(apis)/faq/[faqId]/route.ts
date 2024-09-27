import { NextRequest, NextResponse } from "next/server";

import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { FaqModel, faqSchemaJoi } from "@/models/faq-model";

export async function PUT(
  req: NextRequest,
  { params }: { params: { faqId: string } },
) {
  try {
    const reqBody = await req.json();

    const { faqId } = params;

    if (!faqId) throw errorHandler("Bad request", 400);

    const validation = faqSchemaJoi.validate(reqBody);

    if (validation.error) {
      throw errorHandler(validation.error.message, 400);
    }

    const res = await FaqModel.findByIdAndUpdate(
      { _id: faqId },
      {
        $set: {
          ...reqBody,
        },
      },
      { new: true },
    );

    return NextResponse.json({ res });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
