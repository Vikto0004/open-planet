import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { SectionTextModel } from "@/models/sectionText-model";
import { WorkDirectionsModel } from "@/models/workDirections-model";
import { getDataFromToken } from "@/services/tokenServices";

connect();

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; textSectionId: string } },
) {
  try {
    const userData = getDataFromToken(req);
    if (userData?.role !== "admin")
      throw errorHandler("Not authorized or not admin", 403);

    const { id, textSectionId } = params;

    if (!id || !textSectionId) throw errorHandler("Bad request", 400);

    const result = await SectionTextModel.deleteOne({ _id: textSectionId });

    if (!result.deletedCount) {
      throw errorHandler("Text field not found", 404);
    }

    const res = await WorkDirectionsModel.findByIdAndUpdate(
      { _id: id },
      { $pull: { sectionText: textSectionId } },
      { new: true },
    );

    if (!res) {
      throw errorHandler("Text field not found", 404);
    }

    return NextResponse.json({ message: "Text field deleted", result: res });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
