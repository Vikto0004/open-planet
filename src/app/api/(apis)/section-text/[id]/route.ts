import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import {
  SectionTextModel,
  sectionTextSchemaJoi,
} from "@/models/sectionText-model";
import { getDataFromToken } from "@/services/tokenServices";

connect();

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userData = getDataFromToken(req);
    if (userData?.role !== "admin")
      throw errorHandler("Not authorized or not admin", 403);

    const { id } = params;
    if (!id) throw errorHandler("Bad request", 400);

    const data = await req.json();

    const validation = sectionTextSchemaJoi.validate(data);

    if (validation.error) {
      throw errorHandler(validation.error.message, 400);
    }

    const result = await SectionTextModel.findByIdAndUpdate({ _id: id }, data);

    if (!result) {
      throw errorHandler("Text field not found", 404);
    }

    return NextResponse.json({ response: result });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
