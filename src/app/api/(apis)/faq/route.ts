import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { createFaqSchemaJoi, FaqModel } from "@/models/faq-model";
import { getDatafromToken } from "@/services/tokenServices";

connect();

export async function POST(req: NextRequest) {
  try {
    const userData = getDatafromToken(req);
    if (userData?.role !== "admin")
      throw errorHandler("Forbidden is not admin or not authorized", 403);

    const reqBody = await req.json();

    const language = reqBody.language;

    const validation = createFaqSchemaJoi.validate(reqBody);

    if (validation.error) {
      throw errorHandler(validation.error.message, 400);
    }

    const res = await FaqModel.create({ language: language });

    return NextResponse.json({ res }, { status: 201 });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
