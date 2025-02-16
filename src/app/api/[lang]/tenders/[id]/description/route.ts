import { NextRequest, NextResponse } from "next/server";

import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import getLanguage from "@/helpers/getLanguage";
import { TendersModel } from "@/models/tenders-model";
import { nodeSchemaJoi } from "@/models/vacancy-model";
import { getDataFromToken } from "@/services/tokenServices";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const language = await getLanguage(req);
    const userData = getDataFromToken(req);
    if (userData?.role !== "admin") {
      throw errorHandler("Not authorized or not admin", 403);
    }

    const { id } = params;
    if (!id) throw errorHandler("Bad request", 400);
    if (!language) throw errorHandler("Bad request", 400);

    const data = await req.json();
    const validation = nodeSchemaJoi.validate(data);

    if (validation.error) {
      throw errorHandler(validation.error.message, 400);
    }
    const updatedTender = await TendersModel.findByIdAndUpdate(
      id,
      { $set: { [`${language}.description`]: data } },
      { new: true, runValidators: true },
    );

    if (!updatedTender) {
      throw errorHandler("Tender not found", 404);
    }

    return NextResponse.json({
      message: "Tender description has been successfully updated",
      response: updatedTender,
    });
  } catch (error) {
    return handleRoutesError(error);
  }
}
