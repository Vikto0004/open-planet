import { NextRequest, NextResponse } from "next/server";

import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import getLanguage from "@/helpers/getLanguage";
import { VacancyModel } from "@/models/vacancy-model";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string; blockId: string } },
) {
  try {
    const language = await getLanguage(req);
    const { id, blockId } = params;
    if (!id) throw errorHandler("Bad request", 400);
    if (!blockId) throw errorHandler("Bad request", 400);
    if (!language) throw errorHandler("Bad request", 400);

    const data = await req.json();

    const updatedVacancy = await VacancyModel.findOneAndUpdate(
      { _id: id, "ua.description._id": blockId },
      { $set: { "ua.description.$.children": data } },
      { new: true, runValidators: true },
    );
    if (!updatedVacancy) throw errorHandler("News not found", 404);

    return NextResponse.json({ response: updatedVacancy });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; blockId: string } },
) {
  try {
    const { id, blockId } = params;
    if (!id) throw errorHandler("Bad request", 400);
    if (!blockId) throw errorHandler("Bad request", 400);

    const updatedVacancy = await VacancyModel.findOneAndUpdate(
      { _id: id },
      { $pull: { "ua.description": { _id: blockId } } },
      { new: true },
    );
    if (!updatedVacancy) throw errorHandler("News not found", 404);

    return NextResponse.json({ response: updatedVacancy });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
