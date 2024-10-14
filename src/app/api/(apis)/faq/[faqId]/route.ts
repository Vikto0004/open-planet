import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { FaqModel, faqSchemaJoi } from "@/models/faq-model";
import { getDataFromToken } from "@/services/tokenServices";

connect();

export async function PUT(
  req: NextRequest,
  { params }: { params: { faqId: string } },
) {
  try {
    const userData = getDataFromToken(req);
    if (userData?.role !== "admin")
      throw errorHandler("Not authorized or not admin", 403);

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

    return NextResponse.json({ response: res });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { faqId: string } },
) {
  try {
    const userData = getDataFromToken(req);
    if (userData?.role !== "admin")
      throw errorHandler("Not authorized or not admin", 403);

    const { faqId } = params;

    if (!faqId) throw errorHandler("Bad request", 400);

    const result = await FaqModel.findOne({ _id: faqId });

    if (!result) throw errorHandler("Faq not found", 404);

    return NextResponse.json({ message: "Faq deleted" });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
